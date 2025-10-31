﻿'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');
const Page = require('../models/Page');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/INSPECTORS';

const PAGE_SLUG = 'testing';
const SECTION_ID = 'drone-inspection';

const DATA = {
  service: 'Drone Inspection',
  sections: [
    {
      heading: 'Drone Inspection',
      content:
        'From INSPECTORS 360 TIV - Known as Condition Based Monitoring 360Â° Technical Industrial Verification â€“ Deliver advanced aerial and confined-space inspection services for Mining and Metal Plants, Oil & Gas Facilities, FPSO/FSO Vessels, Industrial Plants, and Power & Utility Infrastructure.\n\nDrone inspection provides a safe, cost-effective, and efficient way to visually examine hard-to-reach or hazardous areas without scaffolding, rope access, or shutdowns.'
    },
    {
      heading: 'Why Choose Drone Inspection from INSPECTORS 360 TIV?',
      content: [
        'Safe access to confined, elevated, or hazardous environments',
        'Reduces need for scaffolding, cranes, or rope access',
        'High-resolution imaging and real-time video feed',
        'Faster inspections with minimal downtime',
        'Data integration with INSPECTORS 360 TIVâ€™s digital reporting systems'
      ]
    },
    {
      heading: 'Trusted Drone Inspection by Industry Experts',
      content:
        'Our certified drone pilots and inspectors use cutting-edge UAV technology equipped with HD, thermal, and zoom cameras to perform detailed asset inspections onshore and offshore.'
    },
    {
      heading: 'Applications Across Industries',
      content: [
        'Mining & Metal Plants â€“ Conveyor belts, stockpiles, crushers',
        'Industrial Plants â€“ Roofs, chimneys, structural steel, pipelines',
        'Oil & Gas â€“ Offshore rigs, flare stacks, tanks, risers',
        'FPSO/FSO Vessels â€“ Hulls, flare booms, cargo tanks',
        'Power & Utilities â€“ Transmission lines, wind turbines, boilers'
      ]
    },
    {
      heading: 'We Can Help You With:',
      content: [
        'Structural inspections of chimneys, flare stacks, tanks, boilers, and roofs',
        'Confined space inspections of tanks, vessels, silos, and cargo holds',
        'Thermal inspections for heat loss, insulation, and leaks',
        'Corrosion monitoring of pipelines, risers, and offshore structures',
        'Emergency response inspections in hazardous or disaster environments'
      ]
    },
    {
      heading: 'Standards We Follow:',
      content: [
        'CAA/FAA Drone Regulations',
        'ISO 21384-3:2019 â€“ Unmanned aircraft systems',
        'API & ASME asset inspection guidelines'
      ]
    },
    {
      heading: 'Ready to Inspect with Drones?',
      content:
        'Trust INSPECTORS 360 TIVâ€™s Drone Inspection Services to enhance safety, reduce costs, and deliver detailed inspection insights.\n\nContact INSPECTORS 360 TIV today to schedule a drone inspection for your facilities.'
    }
  ]
};

function toMarkdown(data) {
  const lines = [];
  lines.push(`# ${data.service}`);
  for (const section of data.sections) {
    if (section.heading) lines.push(`\n## ${section.heading}`);
    if (Array.isArray(section.content)) {
      for (const bullet of section.content) {
        lines.push(`- ${bullet}`);
      }
    } else if (typeof section.content === 'string') {
      lines.push(section.content);
    }
  }
  return lines.join('\n\n');
}

async function ensurePage() {
  let page = await Page.findOne({ slug: PAGE_SLUG });
  if (!page) {
    page = await Page.create({ title: 'Testing & Inspection', slug: PAGE_SLUG, language: 'en', isActive: true });
  }
  return page;
}

async function upsertSection() {
  await ensurePage();
  const existing = await Section.findOne({ sectionId: SECTION_ID, language: 'en' });
  const update = {
    title: DATA.service,
    bodyText: toMarkdown(DATA),
    page: PAGE_SLUG,
    isActive: true
  };
  if (existing) {
    await Section.updateOne({ _id: existing._id }, { $set: update });
    return existing._id;
  }
  const created = await Section.create({ ...update, sectionId: SECTION_ID, language: 'en' });
  return created._id;
}

async function linkSectionToPage(sectionId) {
  const page = await Page.findOne({ slug: PAGE_SLUG }).populate('sections');
  const already = (page.sections || []).some((s) => String(s._id) === String(sectionId));
  if (!already) {
    page.sections = [...(page.sections || []).map((s) => s._id), sectionId];
    await page.save();
  }
}

async function main() {
  console.log('ðŸ”Œ Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('âœ… Connected');
  try {
    const sectionId = await upsertSection();
    await linkSectionToPage(sectionId);
    console.log('âœ… Drone inspection section upserted');
  } catch (e) {
    console.error('âŒ Error:', e.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('ðŸ”Œ Disconnected');
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };



