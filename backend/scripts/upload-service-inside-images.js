'use strict';

// Upload inside-images for each service and save URLs to Section.images

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const envRoot = path.resolve(process.cwd(), '.env');
const envBackend = path.resolve(__dirname, '../.env');
if (fs.existsSync(envRoot)) dotenv.config({ path: envRoot });
if (fs.existsSync(envBackend)) dotenv.config({ path: envBackend });

const cloudinaryService = require('../src/services/cloudinary');
const Section = require('../src/models/Section');

function slugify(text) {
  return String(text).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function variants(slug) {
  const set = new Set();
  set.add(slug);
  set.add(slug.replace(/-and-/g, '-'));
  set.add(slug.replace(/-/g, ' ').replace(/\band\b/g, '').trim().replace(/\s+/g, '-'));
  return Array.from(set);
}

async function connectDb() {
  const uri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/cbm';
  const dbName = process.env.MONGODB_DB || process.env.DB_NAME;
  await mongoose.connect(uri, dbName ? { dbName } : undefined);
}

async function findServiceSection(serviceSlug) {
  // Try exact match on sectionId
  let s = await Section.findOne({ page: 'services', sectionId: serviceSlug });
  if (s) return s;
  const all = await Section.find({ page: 'services', isActive: true });
  const slugs = variants(serviceSlug);
  // Match by slug(title) or slug(sectionId) with variants for '&' vs 'and'
  s = all.find((x) => slugs.includes(slugify(x.title)) || slugs.includes(slugify(x.sectionId || '')) ) || null;
  return s;
}

async function uploadInside(serviceSlug, folderPath) {
  const safeSlug = serviceSlug.replace(/[^a-z0-9-]/gi, '-');
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .map((f) => path.join(folderPath, f));
  const urls = [];
  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const up = await cloudinaryService.uploadImage(
      file,
      'services',
      `${safeSlug}/inside-images`,
      base
    );
    urls.push(up.url);
  }
  return urls;
}

async function main() {
  await connectDb();
  const root = path.resolve(process.cwd(), 'uploads', 'services');
  const services = fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'inside-images')));

  const summary = {};
  for (const slug of services) {
    const folder = path.join(root, slug, 'inside-images');
    const section = await findServiceSection(slug);
    if (!section) { summary[slug] = { updated: false, reason: 'Section not found' }; continue; }
    const urls = await uploadInside(slug, folder);
    section.images = urls; // Replace with new inside images
    await section.save();
    summary[slug] = { updated: true, count: urls.length };
  }

  const outFile = path.resolve(process.cwd(), 'cloudinary-inspectors-inside-images-results.json');
  fs.writeFileSync(outFile, JSON.stringify(summary, null, 2), 'utf-8');
  // eslint-disable-next-line no-console
  console.log('Inside images upload complete. See', outFile);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Inside upload failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});


