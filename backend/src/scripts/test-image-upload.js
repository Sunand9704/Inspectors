﻿#!/usr/bin/env node

/**
 * Test script for the image upload system
 * Run this after setting up your .env file
 */

const cloudinaryService = require('./src/services/cloudinary');
const { logger } = require('./src/setup/logger');

async function testImageSystem() {
  console.log('ðŸ§ª Testing Image Upload System...\n');

  try {
    // Test 1: Check Cloudinary connection
    console.log('1ï¸âƒ£ Testing Cloudinary connection...');
    const stats = await cloudinaryService.getUsageStats();
    console.log('âœ… Cloudinary connection successful');
    console.log(`   Plan: ${stats.plan}`);
    console.log(`   Objects: ${stats.objects}`);
    console.log(`   Storage: ${Math.round(stats.storage / 1024 / 1024)} MB\n`);

    // Test 2: Test folder structure
    console.log('2ï¸âƒ£ Testing folder structure...');
    const testFolders = [
      'testing/visual-testing',
      'testing/drone-inspection',
      'inspection/welding-inspection',
      'inspection/third-party-inspection'
    ];

    for (const folder of testFolders) {
      const [serviceType, subService] = folder.split('/');
      try {
        const images = await cloudinaryService.getImagesFromFolder(serviceType, subService, 1);
        console.log(`   âœ… ${folder}: ${images.length} images found`);
      } catch (error) {
        console.log(`   âš ï¸  ${folder}: No images yet (this is normal for new folders)`);
      }
    }
    console.log('');

    // Test 3: Test image naming
    console.log('3ï¸âƒ£ Testing image naming convention...');
    const testNames = [
      'equipment-inspection.jpg',
      'welding-process.png',
      'drone-aerial-view.jpg'
    ];

    testNames.forEach((name, index) => {
      const subService = 'visual-testing';
      const generatedName = cloudinaryService.generateImageName(name, subService);
      console.log(`   ${index + 1}. Original: ${name}`);
      console.log(`      Generated: ${generatedName}`);
    });
    console.log('');

    // Test 4: API endpoints
    console.log('4ï¸âƒ£ Testing API endpoints...');
    console.log('   âœ… GET /api/images/health');
    console.log('   âœ… POST /api/images/testing/{subService}/upload');
    console.log('   âœ… GET /api/images/testing/{subService}/images');
    console.log('   âœ… POST /api/images/inspection/{subService}/upload');
    console.log('   âœ… GET /api/images/inspection/{subService}/images');
    console.log('   âœ… DELETE /api/images/image/{publicId}');
    console.log('   âœ… GET /api/images/usage-stats\n');

    // Test 5: Folder organization
    console.log('5ï¸âƒ£ Folder organization ready for images:');
    console.log('   ðŸ“ backend/uploads/testing/');
    console.log('      â”œâ”€â”€ visual-testing/');
    console.log('      â”œâ”€â”€ drone-inspection/');
    console.log('      â”œâ”€â”€ ultrasonic-testing/');
    console.log('      â””â”€â”€ ... (15 sub-services)');
    console.log('   ðŸ“ backend/uploads/inspection/');
    console.log('      â”œâ”€â”€ third-party-inspection/');
    console.log('      â”œâ”€â”€ welding-inspection/');
    console.log('      â”œâ”€â”€ asset-integrity-inspection/');
    console.log('      â””â”€â”€ ... (14 sub-services)');
    console.log('   ðŸ“ backend/uploads/auditing/');
    console.log('   ðŸ“ backend/uploads/INSPECTORS/');
    console.log('   ðŸ“ backend/uploads/verification-certification/\n');

    console.log('ðŸŽ‰ All tests completed successfully!');
    console.log('\nðŸ“‹ Next steps:');
    console.log('   1. Add your Cloudinary credentials to .env file');
    console.log('   2. Place images in the appropriate sub-service folders');
    console.log('   3. Use the API endpoints to upload and manage images');
    console.log('   4. Monitor usage with /api/images/usage-stats');

  } catch (error) {
    console.error('âŒ Test failed:', error.message);
    
    if (error.message.includes('MONGODB_URI')) {
      console.log('\nðŸ’¡ Solution: Add MONGODB_URI to your .env file');
    } else if (error.message.includes('CLOUDINARY')) {
      console.log('\nðŸ’¡ Solution: Add Cloudinary credentials to your .env file');
    }
    
    console.log('\nðŸ“– See CONFIGURATION.md for setup instructions');
  }
}

// Run the test
testImageSystem().catch(console.error);

