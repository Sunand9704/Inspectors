'use strict';

// Fix four specific service cover images using the generated results JSON

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env from project root or backend folder
const envRoot = path.resolve(process.cwd(), '.env');
const envBackend = path.resolve(__dirname, '../.env');
if (fs.existsSync(envRoot)) dotenv.config({ path: envRoot });
if (fs.existsSync(envBackend)) dotenv.config({ path: envBackend });

const Section = require('../src/models/Section');

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function connectDb() {
  const uri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/cbm';
  const dbName = process.env.MONGODB_DB || process.env.DB_NAME;
  await mongoose.connect(uri, dbName ? { dbName } : undefined);
}

function slugVariants(slug) {
  const variants = new Set([slug]);
  variants.add(slug.replace(/-and-/g, '-'));
  variants.add(slug.replace(/-\band\b-/g, '-'));
  variants.add(slug.replace(/&/g, 'and').replace(/-and-/g, '-'));
  return Array.from(variants);
}

async function updateSectionCover(serviceSlug, url) {
  // try matching by sectionId
  const variants = slugVariants(serviceSlug);
  let section = await Section.findOne({ page: 'services', sectionId: { $in: variants } });
  if (!section) {
    // match by slug(title)
    const all = await Section.find({ page: 'services', isActive: true });
    section = all.find((s) => variants.includes(slugify(s.title))) || null;
  }
  if (!section) {
    return { serviceSlug, updated: false, reason: 'Section not found' };
  }

  const images = Array.isArray(section.images) ? section.images : [];
  const merged = Array.from(new Set([url, ...images.filter(Boolean)]));
  section.images = merged;
  section.coverPhoto = url;
  await section.save();
  return { serviceSlug, updated: true, sectionId: section.sectionId || slugify(section.title) };
}

async function main() {
  await connectDb();
  const resultsPath = path.resolve(process.cwd(), 'cloudinary-inspectors-upload-results.json');
  if (!fs.existsSync(resultsPath)) throw new Error('cloudinary-inspectors-upload-results.json not found');
  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

  const targets = [
    'inspector-mobilization-and-logistics-support',
    'training-certification-support',
    'technical-staff-and-industrial-equipment-supply',
    'recruitment-and-selection'
  ];

  const output = [];
  for (const slug of targets) {
    const arr = results?.services?.[slug];
    const url = Array.isArray(arr) && arr.length > 0 ? arr[0].url : null;
    if (!url) {
      output.push({ serviceSlug: slug, updated: false, reason: 'No URL found in results JSON' });
      continue;
    }
    const res = await updateSectionCover(slug, url);
    output.push({ ...res, url });
  }

  const outFile = path.resolve(process.cwd(), 'cloudinary-inspectors-fix-log.json');
  fs.writeFileSync(outFile, JSON.stringify({ fixes: output }, null, 2), 'utf-8');
  // eslint-disable-next-line no-console
  console.log('Fix complete. See', outFile);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Fix failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});


