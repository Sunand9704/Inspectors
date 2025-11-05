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

async function main() {
  await connectDb();
  const services = await Section.find({ page: 'services' });
  let updated = 0;
  for (const s of services) {
    s.images = [];
    await s.save();
    updated += 1;
  }
  // eslint-disable-next-line no-console
  console.log(`Cleared images array for ${updated} service sections.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error('Clear failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});


