'use strict';

require('dotenv').config();
const path = require('path');
const { connectToDatabase } = require('../setup/database');
const ContactOffice = require('../models/ContactOffice');

async function run() {
  try {
    // Connect to database
    await connectToDatabase();
    
    const frontendDataPath = path.join(__dirname, '../../../frontend/src/data/contact-offices.ts');
    const file = require('fs').readFileSync(frontendDataPath, 'utf8');

    // Extract the data array from the TypeScript file
    // Find the array content between export const contactOfficesData and the closing bracket
    const arrayMatch = file.match(/export const contactOfficesData[^=]*=\s*(\[[\s\S]*\]);?\s*$/);
    if (!arrayMatch) {
      throw new Error('Could not find contactOfficesData array in file');
    }

    // Transform: remove TypeScript-specific syntax but keep the data structure
    let transformed = arrayMatch[1]
      // Remove TypeScript interface references (they're just for type checking)
      .replace(/:\s*OfficeData\[\]/g, '')
      .replace(/:\s*RegionalOfficeGroup\[\]/g, '')
      // Ensure proper closing
      .trim();

    // Execute transformed code in isolated module scope
    const vm = require('vm');
    const sandbox = { module: { exports: {} }, exports: {} };
    const code = `module.exports = ${transformed};`;
    vm.runInNewContext(code, sandbox, { filename: 'contact-offices.js' });
    const data = sandbox.module.exports;

    if (!Array.isArray(data)) {
      throw new Error('Expected array of office groups');
    }

    // Clear existing offices
    const deleteResult = await ContactOffice.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing contact offices.`);

    // Insert new offices
    const docs = [];
    let regionIndex = 0;
    for (const group of data) {
      regionIndex++;
      let officeIndex = 0;
      for (const office of group.offices) {
        officeIndex++;
        docs.push({
          ...office,
          region_name: group.region_name,
          region_order: regionIndex,
          office_order: officeIndex
        });
      }
    }
    
    if (docs.length > 0) {
      await ContactOffice.insertMany(docs);
      console.log(`✅ Successfully seeded ${docs.length} contact offices.`);
    } else {
      console.log('⚠️  No offices to seed.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding contact offices:', err);
    process.exit(1);
  }
}

run();


