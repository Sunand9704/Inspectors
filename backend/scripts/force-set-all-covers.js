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

async function connectDb() {
  const uri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/cbm';
  const dbName = process.env.MONGODB_DB || process.env.DB_NAME;
  await mongoose.connect(uri, dbName ? { dbName } : undefined);
}

// Direct mapping from upload results JSON
const COVER_MAP = {
  'recruitment-and-selection': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354097/cbm/services/recruitment-and-selection/cover-images/cbm/services/recruitment-and-selection/cover-images/image10.jpg',
  'contract-staffing': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354091/cbm/services/contract-staffing/cover-images/cbm/services/contract-staffing/cover-images/image11.jpg',
  'technical-staff-and-industrial-equipment-supply': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354115/cbm/services/technical-staff-and-industrial-equipment-supply/cover-images/cbm/services/technical-staff-and-industrial-equipment-supply/cover-images/image12.jpg',
  'payroll-and-hr-administration': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354095/cbm/services/payroll-and-hr-administration/cover-images/cbm/services/payroll-and-hr-administration/cover-images/image13.jpg',
  'background-verification-bgv-services': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354080/cbm/services/background-verification-bgv-services/cover-images/cbm/services/background-verification-bgv-services/cover-images/image14.jpg',
  'inspector-mobilization-and-logistics-support': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354093/cbm/services/inspector-mobilization-and-logistics-support/cover-images/cbm/services/inspector-mobilization-and-logistics-support/cover-images/image15.jpg',
  'training-and-certification-support': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354203/cbm/services/training-certification-support/cover-images/cbm/services/training-certification-support/cover-images/image16.jpg',
  'training-certification-support': 'https://res.cloudinary.com/docyipoze/image/upload/v1762354203/cbm/services/training-certification-support/cover-images/cbm/services/training-certification-support/cover-images/image16.jpg'
};

function slugify(text) {
  return String(text).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

async function main() {
  await connectDb();
  const services = await Section.find({ page: 'services', isActive: true });
  const results = [];

  for (const service of services) {
    const slugTitle = slugify(service.title);
    const slugId = slugify(service.sectionId || '');
    
    // Find cover URL from direct map
    let coverUrl = COVER_MAP[slugTitle] || COVER_MAP[slugId] || null;
    
    const before = { coverPhoto: service.coverPhoto, images0: service.images?.[0] };
    let updated = false;

    if (coverUrl) {
      if (service.coverPhoto !== coverUrl) {
        service.coverPhoto = coverUrl;
        // Remove cover image from images array if it exists
        if (service.images) {
          service.images = service.images.filter((img) => img !== coverUrl && !img.includes('/cover-images/'));
        }
        await service.save();
        updated = true;
      }
    } else {
      // Try to find cover in existing images
      const coverInImages = service.images?.find((img) => img && img.includes('/cover-images/'));
      if (coverInImages && service.coverPhoto !== coverInImages) {
        service.coverPhoto = coverInImages;
        service.images = service.images.filter((img) => img !== coverInImages);
        await service.save();
        updated = true;
      }
    }

    results.push({
      title: service.title,
      sectionId: service.sectionId,
      slugTitle,
      slugId,
      before,
      after: { coverPhoto: service.coverPhoto, imagesCount: service.images?.length || 0 },
      updated,
      coverUrlSet: !!coverUrl
    });
  }

  const outFile = path.resolve(process.cwd(), 'force-set-covers-results.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf-8');
  // eslint-disable-next-line no-console
  console.log(`Updated ${results.filter(r => r.updated).length} services. See ${outFile}`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Fix failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});

