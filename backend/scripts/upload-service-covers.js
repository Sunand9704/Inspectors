'use strict';

// Upload service cover images from uploads/services/*/cover-images to Cloudinary
// and persist the resulting URLs into the corresponding Section documents (page: 'services').

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const envPathLocal = path.resolve(process.cwd(), '.env');
const envPathBackend = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPathLocal)) dotenv.config({ path: envPathLocal });
if (fs.existsSync(envPathBackend)) dotenv.config({ path: envPathBackend });

const cloudinaryService = require('../src/services/cloudinary');
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

async function uploadFolder(serviceSlug, folderPath) {
  const safeSlug = serviceSlug.replace(/[^a-z0-9-]/gi, '-');
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .map((f) => path.join(folderPath, f));

  const results = [];
  for (const filePath of files) {
    const base = path.basename(filePath, path.extname(filePath));
    const uploaded = await cloudinaryService.uploadImage(
      filePath,
      'services',
      `${safeSlug}/cover-images`,
      base
    );
    results.push(uploaded);
  }
  return results;
}

async function persistToSection(serviceSlug, uploads) {
  if (!uploads || uploads.length === 0) return null;

  // Find section by explicit sectionId or slug of title
  let section = await Section.findOne({ page: 'services', sectionId: serviceSlug });
  if (!section) {
    section = await Section.findOne({ page: 'services' });
    // If multiple sections, fallback: try matching by slugified title
    const all = await Section.find({ page: 'services', isActive: true });
    section = all.find((s) => slugify(s.title) === serviceSlug) || null;
  }

  if (!section) {
    return { serviceSlug, error: `Section not found for ${serviceSlug}` };
  }

  const urls = uploads.map((u) => u.url);

  // Ensure images array exists and prepend cover
  const existing = Array.isArray(section.images) ? section.images : [];
  const merged = Array.from(new Set([urls[0], ...existing, ...urls.slice(1)]));
  section.images = merged;
  section.coverPhoto = urls[0];
  await section.save();

  return { serviceSlug, sectionId: section.sectionId || slugify(section.title), urls };
}

async function main() {
  await connectDb();
  const root = path.resolve(process.cwd(), 'uploads', 'services');
  if (!fs.existsSync(root)) throw new Error(`Uploads folder not found: ${root}`);

  const services = fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'cover-images')));

  const output = { services: {} };
  for (const serviceSlug of services) {
    const folder = path.join(root, serviceSlug, 'cover-images');
    const uploads = await uploadFolder(serviceSlug, folder);
    const persisted = await persistToSection(serviceSlug, uploads);
    output.services[serviceSlug] = uploads.map((u) => ({
      fileName: path.basename(u.public_id),
      url: u.url,
      public_id: u.public_id,
      width: u.width,
      height: u.height,
      format: u.format,
      size: u.size
    }));
    if (persisted && persisted.error) {
      output.services[serviceSlug].error = persisted.error;
    }
  }

  const outPath = path.resolve(process.cwd(), 'cloudinary-inspectors-upload-results.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
  // eslint-disable-next-line no-console
  console.log(`\nSaved results to ${outPath}`);

  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Upload failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});


