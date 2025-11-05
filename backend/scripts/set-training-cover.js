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
  return String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

async function connectDb() {
  const uri = process.env.MONGODB_URI || process.env.DB_URI || 'mongodb://127.0.0.1:27017/cbm';
  const dbName = process.env.MONGODB_DB || process.env.DB_NAME;
  await mongoose.connect(uri, dbName ? { dbName } : undefined);
}

async function main() {
  const url = process.argv[2];
  if (!url) throw new Error('Usage: node backend/scripts/set-training-cover.js <CLOUDINARY_URL>');
  await connectDb();

  const slug = 'training-certification-support';

  let section = await Section.findOne({ page: 'services', sectionId: slug });
  if (!section) {
    const all = await Section.find({ page: 'services', isActive: true });
    section = all.find((s) => slugify(s.title) === slug) || null;
  }
  if (!section) throw new Error('Training & Certification Support section not found');

  const images = Array.isArray(section.images) ? section.images : [];
  const merged = Array.from(new Set([url, ...images.filter(Boolean)]));
  section.images = merged;
  section.coverPhoto = url;
  await section.save();

  // eslint-disable-next-line no-console
  console.log('Updated section:', { id: section._id.toString(), sectionId: section.sectionId, coverPhoto: section.coverPhoto, imagesCount: section.images.length });
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Update failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
