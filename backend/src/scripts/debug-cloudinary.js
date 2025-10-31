﻿#!/usr/bin/env node

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function debugCloudinary() {
  console.log('ðŸ” Debugging Cloudinary Images...\n');

  try {
    // Get all resources to see what's there
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 50
    });

    console.log(`ðŸ“Š Total images found: ${result.resources.length}\n`);

    if (result.resources.length > 0) {
      console.log('ðŸ“‹ All images in Cloudinary:');
      result.resources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.public_id}`);
        console.log(`   URL: ${resource.secure_url}`);
        console.log(`   Size: ${resource.width}x${resource.height}`);
        console.log(`   Format: ${resource.format}`);
        console.log(`   Created: ${resource.created_at}`);
        console.log('');
      });
    } else {
      console.log('âŒ No images found in Cloudinary');
    }

    // Try to get images with specific prefix
    console.log('ðŸ” Trying to get images with INSPECTORS prefix...');
    const INSPECTORSResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'INSPECTORS',
      max_results: 50
    });

    console.log(`ðŸ“Š Images with 'INSPECTORS' prefix: ${INSPECTORSResult.resources.length}\n`);

    if (INSPECTORSResult.resources.length > 0) {
      console.log('ðŸ“‹ Images with INSPECTORS prefix:');
      INSPECTORSResult.resources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.public_id}`);
        console.log(`   URL: ${resource.secure_url}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('âŒ Error:', error.message);
  }
}

debugCloudinary().catch(console.error);

