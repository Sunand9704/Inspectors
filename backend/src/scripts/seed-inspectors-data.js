'use strict';

const mongoose = require('mongoose');
const DataSeeder = require('../utils/seeder');
const inspectorsSections = require('../data/inspectors-sections');
const inspectorsPages = require('../data/inspectors-pages');

// Connect to MongoDB with better error handling
const MONGODB_URI = 'mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

console.log('🔌 Attempting to connect to MongoDB...');
console.log(`📍 Connection string: ${MONGODB_URI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);

// Wait for connection before proceeding
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    console.log('✅ Successfully connected to MongoDB');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('  1. If using local MongoDB: Make sure MongoDB is running locally');
    console.log('  2. If using Atlas: Check your IP whitelist and credentials');
    console.log('  3. Try setting MONGODB_URI environment variable');
    console.log('\n🔧 To use local MongoDB:');
    console.log('  - Install MongoDB Community Server');
    console.log('  - Start MongoDB service');
    console.log('  - Run: npm run seed:inspectors');
    return false;
  }
}

const seeder = new DataSeeder();

async function seedInspectorsData() {
  try {
    // First, ensure MongoDB is connected
    const isConnected = await connectToMongoDB();
    if (!isConnected) {
      console.log('❌ Cannot proceed without database connection');
      process.exit(1);
    }

    console.log('🌱 Starting INSPECTORS Data Seeding...\n');

    // Step 1: Create all INSPECTORS sections first
    console.log('📋 Creating INSPECTORS Sections...');
    const sectionIds = [];
    
    for (const [category, sections] of Object.entries(inspectorsSections)) {
      console.log(`  Creating ${category} sections...`);
      const createdSections = await seeder.createSections(sections);
      sectionIds.push(...createdSections.map(s => s.sectionId));
      console.log(`  ✅ Created ${createdSections.length} ${category} sections`);
    }

    // Step 2: Create INSPECTORS pages that reference the sections
    console.log('\n📄 Creating INSPECTORS Pages...');
    const createdPages = await seeder.createPages(inspectorsPages);
    console.log(`  ✅ Created ${createdPages.length} INSPECTORS pages`);

    // Step 3: Get summary
    const summary = seeder.getSummary();
    console.log('\n📊 Seeding Summary:');
    console.log(`  Sections: ${summary.sections.count}`);
    console.log(`  Pages: ${summary.pages.count}`);

    console.log('\n🎉 INSPECTORS Data Seeding Completed Successfully!');
    console.log('\n📝 What was created:');
    console.log('  • 5 INSPECTORS Sections (Vibration Analysis, Laser Alignment, IoT Monitoring, etc.)');
    console.log('  • 1 INSPECTORS Page with all sections');
    console.log('\n🔗 You can now access:');
    console.log('  • GET /api/sections - All sections');
    console.log('  • GET /api/pages - All pages');
    console.log('  • GET /api/pages/slug/inspectors - INSPECTORS page with sections');
    console.log('  • GET /api/pages/search/inspectors - Search INSPECTORS page');

  } catch (error) {
    console.error('❌ Error seeding INSPECTORS data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

// Function to clear INSPECTORS data
async function clearInspectorsData() {
  try {
    // First, ensure MongoDB is connected
    const isConnected = await connectToMongoDB();
    if (!isConnected) {
      console.log('❌ Cannot proceed without database connection');
      process.exit(1);
    }

    console.log('🧹 Clearing INSPECTORS Data...');
    
    // Clear sections that match INSPECTORS sectionIds
    const inspectorsSectionIds = [
      'vibration-analysis-balancing',
      'laser-shaft-alignment',
      'remote-inspectors-iot-cloud',
      'infrared-thermography',
      'lubrication-oil-analysis'
    ];
    
    await seeder.clearSectionsBySectionIds(inspectorsSectionIds);
    
    // Clear pages with INSPECTORS slug
    await seeder.clearPagesBySlug('inspectors');
    
    console.log('✅ INSPECTORS data cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing INSPECTORS data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Export functions for use in other scripts
module.exports = {
  seedCBMData,
  clearCBMData
};

// Run if called directly
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'clear') {
    clearInspectorsData();
  } else {
    seedInspectorsData();
  }
}
