'use strict';

require('dotenv').config();

const { connectToDatabase } = require('../setup/database');
// Register models before use/populate
require('../models/Section');
const Page = require('../models/Page');

async function main() {
  try {
    await connectToDatabase();

    const expected = (process.env.EXPECTED_SERVICE_SLUGS || 'testing,cbm,inspection,auditing,verification-certification,innovation-rd')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const categoryQuery = { isActive: true, category: 'service' };
    const slugQuery = { isActive: true, slug: { $in: expected } };

    const byCategory = await Page.find(categoryQuery).populate({
      path: 'sections',
      select: 'title images pageNumber sectionId',
      options: { sort: { pageNumber: 1 } },
    });

    const bySlug = await Page.find(slugQuery).populate({
      path: 'sections',
      select: 'title images pageNumber sectionId',
      options: { sort: { pageNumber: 1 } },
    });

    const uniqueById = new Map();
    [...byCategory, ...bySlug].forEach((p) => uniqueById.set(String(p._id), p));
    const pages = Array.from(uniqueById.values());

    // Output summary
    // eslint-disable-next-line no-console
    console.log('--- Service Pages Summary ---');
    // eslint-disable-next-line no-console
    console.log('Total found:', pages.length);
    // eslint-disable-next-line no-console
    pages.forEach((p, i) => {
      const firstImage = p.sections && p.sections[0] && p.sections[0].images && p.sections[0].images[0];
      // eslint-disable-next-line no-console
      console.log(`${i + 1}. slug="${p.slug}", title="${p.title}", sections=${p.sections?.length || 0}, firstImage=${firstImage ? 'yes' : 'no'}`);
    });

    // Also print any expected slugs that are missing
    const presentSlugs = new Set(pages.map((p) => p.slug));
    const missing = expected.filter((s) => !presentSlugs.has(s));
    if (missing.length > 0) {
      // eslint-disable-next-line no-console
      console.log('Missing expected slugs:', missing.join(', '));
    }

    // Additionally, show sections under 'services' landing page
    const servicesLanding = await Page.findOne({ slug: 'services', isActive: true }).populate({
      path: 'sections',
      select: 'title sectionId images pageNumber',
      options: { sort: { pageNumber: 1 } },
    });
    if (servicesLanding) {
      // eslint-disable-next-line no-console
      console.log('\nServices landing sections:', servicesLanding.sections?.length || 0);
      servicesLanding.sections?.forEach((s, i) => {
        const firstImage = s.images && s.images[0];
        // eslint-disable-next-line no-console
        console.log(`  ${i + 1}. title="${s.title}", sectionId=${s.sectionId || 'n/a'}, firstImage=${firstImage ? 'yes' : 'no'}`);
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('\nNo services landing page found (slug="services").');
    }

    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('verify-services failed:', err?.message || err);
    process.exit(1);
  }

    // Additionally, show sections under 'industries' landing page
    const industriesLanding = await Page.findOne({ slug: 'industries', isActive: true }).populate({
      path: 'sections',
      select: 'title sectionId images pageNumber',
      options: { sort: { pageNumber: 1 } },
    });
    if (industriesLanding) {
      // eslint-disable-next-line no-console
      console.log('\nIndustries landing sections:', industriesLanding.sections?.length || 0);
      industriesLanding.sections?.forEach((s, i) => {
        const firstImage = s.images && s.images[0];
        // eslint-disable-next-line no-console
        console.log(`  ${i + 1}. title="${s.title}", sectionId=${s.sectionId || 'n/a'}, firstImage=${firstImage ? 'yes' : 'no'}`);
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('\nNo industries landing page found (slug="industries").');
    }
}

main();


