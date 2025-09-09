'use strict';

const fs = require('fs');
const path = require('path');
const { connectToDatabase } = require('../setup/database');
const mongoose = require('mongoose');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');
const ClientImage = require('../models/ClientImage');

function toKey(value) {
  if (!value) return null;
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function sanitizeTitleToKey(value) {
  if (!value) return null;
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[m][n];
}

// Old direction: from JSON keys to DB. Replaced by DB-driven mapping below.
async function updateImagesForCategory_FromJson(categoryName, entries) {
  if (!entries || typeof entries !== 'object') return { updated: 0, missing: 0, errors: 0 };
  let updated = 0;
  let missing = 0;
  let errors = 0;

  for (const [slug, images] of Object.entries(entries)) {
    const urls = Array.isArray(images) ? images.map((i) => i.url).filter(Boolean) : [];
    if (urls.length === 0) continue;

    try {
      // Find all candidate sections in this category whose sectionId/title sanitize to slug
      const candidates = await Section.find({ page: categoryName });
      const matches = candidates.filter((s) => {
        const idKey = sanitizeTitleToKey(s.sectionId);
        const titleKey = sanitizeTitleToKey(s.title);
        return idKey === slug || titleKey === slug;
      });

      if (matches.length === 0) {
        // Fuzzy match: pick closest by Levenshtein distance on sanitized keys within threshold 2
        const withScores = candidates.map((s) => {
          const idKey = sanitizeTitleToKey(s.sectionId) || '';
          const titleKey = sanitizeTitleToKey(s.title) || '';
          const score = Math.min(levenshtein(idKey, slug), levenshtein(titleKey, slug));
          return { s, score, idKey, titleKey };
        });
        withScores.sort((a, b) => a.score - b.score);
        const best = withScores[0];
        if (!best || best.score > 2) {
          missing += 1;
          logger.warn(`⚠️  No section found for page='${categoryName}', slug='${slug}' (no fuzzy match)`);
          continue;
        }
        best.s.images = urls;
        await best.s.save();
        updated += 1;
        logger.info(`✅ Fuzzy-updated ${categoryName}/${slug} → sectionId='${best.s.sectionId}' (dist=${best.score}, ${urls.length} urls)`);
        continue;
      }

      for (const s of matches) {
        s.images = urls;
        await s.save();
        updated += 1;
        logger.info(`✅ Updated images for ${categoryName}/${slug} → sectionId='${s.sectionId}' (${urls.length} urls)`);
      }
    } catch (err) {
      errors += 1;
      logger.error(`❌ Failed updating ${categoryName}/${slug}: ${err.message}`);
    }
  }

  return { updated, missing, errors };
}

// New direction: iterate DB sections and pick matching JSON key based on DB sectionId/title
async function updateImagesForCategory(categoryName, entries) {
  if (!entries || typeof entries !== 'object') return { updated: 0, missing: 0, errors: 0 };
  let updated = 0;
  let missing = 0;
  let errors = 0;

  // Manual corrections: map JSON keys to actual DB sanitized keys when names differ
  const manualMap = categoryName === 'services'
    ? {
        // jsonKey : dbSanitizedKey
        'background-verification-bgv': 'background-verification-bgv-services',
        'inspector-mobilization-logistics': 'inspector-mobilization-logistics-support',
        'technical-staff-equipment-supply': 'technical-staff-industrial-equipment-supply',
      }
    : categoryName === 'industries'
    ? {
        'fpso-fso-vessels': 'fpso-fso-vessels-floating-production-storage-and-offloading',
      }
    : {};

  const jsonKeys = Object.keys(entries);
  const sections = await Section.find({ page: categoryName });
  for (const s of sections) {
    try {
      const dbKey = sanitizeTitleToKey(s.sectionId || s.title || '');
      if (!dbKey) {
        missing += 1;
        logger.warn(`⚠️  Section without usable key: ${categoryName} → _id=${s._id}`);
        continue;
      }

      // Prefer manual mapping
      let pickedKey = Object.entries(manualMap).find(([, mappedDbKey]) => mappedDbKey === dbKey)?.[0] || null;
      if (!pickedKey) {
        pickedKey = jsonKeys.find(k => k === dbKey) || null;
      }
      if (!pickedKey) {
        // fuzzy choose best json key
        const scored = jsonKeys.map(k => ({ k, score: levenshtein(k, dbKey) }));
        scored.sort((a,b)=>a.score-b.score);
        if (scored.length > 0 && scored[0].score <= 2) {
          pickedKey = scored[0].k;
        }
      }

      if (!pickedKey) {
        missing += 1;
        logger.warn(`⚠️  No JSON entry for section '${s.sectionId || s.title}' (key='${dbKey}') in ${categoryName}`);
        continue;
      }

      const urls = (entries[pickedKey] || []).map(e => e.url).filter(Boolean);
      if (urls.length === 0) {
        missing += 1;
        logger.warn(`⚠️  JSON entry '${pickedKey}' has no urls for ${categoryName}`);
        continue;
      }

      s.images = urls;
      await s.save();
      updated += 1;
      logger.info(`✅ Updated ${categoryName}/${dbKey} from JSON key '${pickedKey}' (${urls.length} urls)`);
    } catch (err) {
      errors += 1;
      logger.error(`❌ Failed updating ${categoryName} section '${s.sectionId || s.title}': ${err.message}`);
    }
  }

  return { updated, missing, errors };
}

async function main() {
  const jsonPathCandidates = [
    path.resolve(process.cwd(), 'cloudinary-inspectors-upload-results.json'),
    path.resolve(__dirname, '../../cloudinary-inspectors-upload-results.json')
  ];

  let jsonPath = null;
  for (const p of jsonPathCandidates) {
    if (fs.existsSync(p)) { jsonPath = p; break; }
  }
  if (!jsonPath) {
    console.error('cloudinary-inspectors-upload-results.json not found in project root');
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);

  await connectToDatabase();

  try {
    logger.info('🔄 Importing Cloudinary image URLs into Section.images ...');

    const servicesRes = await updateImagesForCategory('services', data.services);
    const industriesRes = await updateImagesForCategory('industries', data.industries);

    // Import clients into ClientImage collection (no de-dup to keep simple)
    let clientsCreated = 0;
    if (Array.isArray(data.clients)) {
      for (const c of data.clients) {
        try {
          // Upsert by public_id or url
          const filter = c.public_id ? { public_id: c.public_id } : { url: c.url };
          const update = {
            fileName: c.fileName || null,
            url: c.url,
            public_id: c.public_id || null,
            width: c.width || null,
            height: c.height || null,
            format: c.format || null,
            size: c.size || null,
            isActive: true
          };
          await ClientImage.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
          clientsCreated += 1;
        } catch (err) {
          logger.warn(`⚠️  Failed to upsert client image ${c.url}: ${err.message}`);
        }
      }
    }

    logger.info('📊 Import summary:');
    logger.info(`   Services - updated: ${servicesRes.updated}, missing: ${servicesRes.missing}, errors: ${servicesRes.errors}`);
    logger.info(`   Industries - updated: ${industriesRes.updated}, missing: ${industriesRes.missing}, errors: ${industriesRes.errors}`);
    logger.info(`   Clients - upserted: ${clientsCreated}`);

  } finally {
    await mongoose.connection.close().catch(() => {});
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { main };


