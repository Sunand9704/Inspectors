'use strict';

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
  return String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

async function connectDb() {
  const uri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/cbm';
  const dbName = process.env.MONGODB_DB || process.env.DB_NAME;
  await mongoose.connect(uri, dbName ? { dbName } : undefined);
}

async function buildSectionIndex() {
  // Fetch all sections to avoid mismatches on page casing or legacy data
  const all = await Section.find({ isActive: true });
  const index = new Map();
  for (const s of all) {
    index.set(slugify(s.title), s);
    if (s.sectionId) index.set(slugify(s.sectionId), s);
  }
  return index;
}

async function uploadInside(slug, folderPath) {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '-');
  const files = fs.readdirSync(folderPath).filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f));
  const urls = [];
  for (const f of files) {
    const up = await cloudinaryService.uploadImage(
      path.join(folderPath, f),
      'services',
      `${safeSlug}/inside-images`,
      path.basename(f, path.extname(f))
    );
    urls.push(up.url);
  }
  return urls;
}

async function main() {
  await connectDb();
  const targets = [
    'recruitment-and-selection',
    'technical-staff-and-industrial-equipment-supply',
    'payroll-and-hr-administration',
    'inspector-mobilization-and-logistics-support',
    'training-and-certification-support'
  ];

  const root = path.resolve(process.cwd(), 'uploads', 'services');
  const index = await buildSectionIndex();
  const results = {};

  for (const slug of targets) {
    const section = index.get(slug);
    if (!section) {
      results[slug] = { updated: false, reason: 'Section not found via index' };
      continue;
    }
    const folder = path.join(root, slug, 'inside-images');
    if (!fs.existsSync(folder)) { results[slug] = { updated: false, reason: 'inside-images folder missing' }; continue; }
    const urls = await uploadInside(slug, folder);
    section.images = urls;
    await section.save();
    results[slug] = { updated: true, count: urls.length };
  }

  const out = path.resolve(process.cwd(), 'force-upload-inside-results.json');
  fs.writeFileSync(out, JSON.stringify(results, null, 2), 'utf-8');
  // eslint-disable-next-line no-console
  console.log('Force upload complete. See', out);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Force upload failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});


