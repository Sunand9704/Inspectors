'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envRoot = path.resolve(process.cwd(), '.env');
const envBackend = path.resolve(__dirname, '../.env');
if (fs.existsSync(envRoot)) dotenv.config({ path: envRoot });
if (fs.existsSync(envBackend)) dotenv.config({ path: envBackend });

const Section = require('../src/models/Section');

function slugify(text) {
  return String(text).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

async function connectDb() {
  const uri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/cbm';
  const dbName = process.env.MONGODB_DB || process.env.DB_NAME;
  await mongoose.connect(uri, dbName ? { dbName } : undefined);
}

async function main() {
  await connectDb();
  
  // Read the upload results JSON
  const resultsPath = path.resolve(process.cwd(), 'cloudinary-inspectors-upload-results.json');
  if (!fs.existsSync(resultsPath)) {
    throw new Error('cloudinary-inspectors-upload-results.json not found');
  }
  const uploadResults = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

  const allServices = await Section.find({ page: 'services', isActive: true });
  const fixes = [];

  for (const service of allServices) {
    const slugTitle = slugify(service.title);
    const slugId = slugify(service.sectionId || '');
    
    // Find matching cover image URL from upload results
    let coverUrl = null;
    for (const [folderSlug, data] of Object.entries(uploadResults.services || {})) {
      if (Array.isArray(data) && data.length > 0 && data[0].url) {
        const url = data[0].url;
        if (url.includes('/cover-images/')) {
          // Normalize folder slug for comparison (handle & vs and)
          const normalizedFolder = slugify(folderSlug.replace(/&/g, ' and '));
          const normalizedFolder2 = slugify(folderSlug.replace(/&/g, 'and'));
          // Check if this matches our service with multiple matching strategies
          if (slugTitle === folderSlug || slugId === folderSlug || 
              slugTitle === normalizedFolder || slugId === normalizedFolder ||
              slugTitle === normalizedFolder2 || slugId === normalizedFolder2 ||
              slugTitle.includes(normalizedFolder) || normalizedFolder.includes(slugTitle) ||
              slugTitle.includes(normalizedFolder2) || normalizedFolder2.includes(slugTitle)) {
            coverUrl = url;
            break;
          }
        }
      }
    }

    const before = { coverPhoto: service.coverPhoto, images0: service.images?.[0] };
    let updated = false;

    if (coverUrl) {
      // Set coverPhoto to the correct cover image
      if (service.coverPhoto !== coverUrl) {
        service.coverPhoto = coverUrl;
        // Remove cover image from images array if it exists there
        if (service.images) {
          service.images = service.images.filter((img) => img !== coverUrl && !img.includes('/cover-images/'));
        }
        await service.save();
        updated = true;
      }
    } else {
      // If no cover URL found, try to extract from existing images
      const coverInImages = service.images?.find((img) => img && img.includes('/cover-images/'));
      if (coverInImages && service.coverPhoto !== coverInImages) {
        service.coverPhoto = coverInImages;
        service.images = service.images.filter((img) => img !== coverInImages);
        await service.save();
        updated = true;
      }
    }

    fixes.push({
      title: service.title,
      sectionId: service.sectionId,
      before,
      after: { coverPhoto: service.coverPhoto, imagesCount: service.images?.length || 0 },
      updated,
      coverUrlFound: !!coverUrl
    });
  }

  const outFile = path.resolve(process.cwd(), 'fix-all-covers-results.json');
  fs.writeFileSync(outFile, JSON.stringify(fixes, null, 2), 'utf-8');
  // eslint-disable-next-line no-console
  console.log(`Fixed ${fixes.filter(f => f.updated).length} services. See ${outFile}`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Fix failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});

