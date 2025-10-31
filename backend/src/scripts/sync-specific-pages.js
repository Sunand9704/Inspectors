const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Import models
const Section = require('./src/models/Section');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/INSPECTORS';

// Page mapping for Cloudinary folders
const PAGE_CLOUDINARY_MAPPING = {
  'auditing-services': 'auditing',
  'verification-certification-services': 'verification-certification'
};

/**
 * Get images from Cloudinary for a specific section and page
 * @param {string} sectionId - The section ID
 * @param {string} cloudinaryPageName - The Cloudinary page folder name
 * @returns {Promise<Array>} Array of image URLs
 */
async function getImagesFromSectionFolder(sectionId, cloudinaryPageName) {
  try {
    const folderPath = `INSPECTORS/${cloudinaryPageName}/${sectionId}`;
    console.log(`ðŸ” Searching for images in folder: ${folderPath}`);
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 300,
      resource_type: 'image'
    });

    if (result.resources && result.resources.length > 0) {
      const imageUrls = result.resources.map(resource => resource.secure_url);
      console.log(`âœ… Found ${imageUrls.length} images for section: ${sectionId} in ${folderPath}`);
      return imageUrls;
    } else {
      console.log(`âš ï¸  No images found for section: ${sectionId} in ${folderPath}`);
      return [];
    }
  } catch (error) {
    console.error(`âŒ Error fetching images for section ${sectionId}:`, error.message);
    return [];
  }
}

/**
 * Clean existing Cloudinary images from a section
 * @param {string} sectionId - The section ID
 * @returns {Promise<boolean>} Success status
 */
async function cleanExistingCloudinaryImages(sectionId) {
  try {
    const section = await Section.findOne({ sectionId: sectionId });
    if (!section) {
      console.log(`âš ï¸  Section ${sectionId} not found in database`);
      return false;
    }

    if (!section.images || section.images.length === 0) {
      console.log(`â„¹ï¸  Section ${sectionId} has no existing images to clean`);
      return true;
    }

    // Filter out Cloudinary images, keep only placeholder images
    const placeholderImages = section.images.filter(img => 
      !img.includes('cloudinary.com') && !img.includes('res.cloudinary.com')
    );

    if (placeholderImages.length === section.images.length) {
      console.log(`â„¹ï¸  Section ${sectionId} has no Cloudinary images to clean`);
      return true;
    }

    // Update with only placeholder images
    const result = await Section.updateOne(
      { sectionId: sectionId },
      { $set: { images: placeholderImages } }
    );

    if (result.modifiedCount > 0) {
      const removedCount = section.images.length - placeholderImages.length;
      console.log(`ðŸ§¹ Cleaned ${removedCount} existing Cloudinary images from ${sectionId}`);
      return true;
    } else {
      console.log(`â„¹ï¸  No changes needed for ${sectionId}`);
      return true;
    }
  } catch (error) {
    console.error(`âŒ Error cleaning images for section ${sectionId}:`, error.message);
    return false;
  }
}

/**
 * Update section images in database
 * @param {string} sectionId - The section ID
 * @param {Array} imageUrls - Array of image URLs to update
 * @returns {Promise<boolean>} Success status
 */
async function updateSectionImages(sectionId, imageUrls) {
  try {
    if (imageUrls.length === 0) {
      console.log(`âš ï¸  Skipping update for section ${sectionId} - no images found`);
      return false;
    }

    // First clean existing Cloudinary images to prevent duplicates
    await cleanExistingCloudinaryImages(sectionId);

    // Then add the new Cloudinary images
    const result = await Section.updateMany(
      { sectionId: sectionId },
      { $set: { images: imageUrls } }
    );

    if (result.modifiedCount > 0) {
      console.log(`âœ… Updated ${result.modifiedCount} sections for ${sectionId} with ${imageUrls.length} images`);
      return true;
    } else {
      console.log(`â„¹ï¸  No sections updated for ${sectionId}`);
      return false;
    }
  } catch (error) {
    console.error(`âŒ Error updating section ${sectionId}:`, error.message);
    return false;
  }
}

/**
 * Sync sections for a specific page
 * @param {string} pageSlug - The page slug from database
 */
async function syncPageSections(pageSlug) {
  try {
    console.log(`ðŸš€ Starting sync for page: ${pageSlug}`);
    
    // Get the Cloudinary folder name
    const cloudinaryPageName = PAGE_CLOUDINARY_MAPPING[pageSlug];
    if (!cloudinaryPageName) {
      console.log(`âŒ No Cloudinary mapping found for page: ${pageSlug}`);
      return;
    }
    
    console.log(`ðŸ“ Cloudinary folder: ${cloudinaryPageName}`);
    
    // Find all sections for this page
    const sections = await Section.find({ page: pageSlug }, 'sectionId title');
    
    if (sections.length === 0) {
      console.log(`âš ï¸  No sections found for page: ${pageSlug}`);
      return;
    }
    
    console.log(`ðŸ“Š Found ${sections.length} sections for page: ${pageSlug}\n`);
    
    let successCount = 0;
    let errorCount = 0;
    let totalImages = 0;
    
    // Process each section
    for (const section of sections) {
      console.log(`\nðŸ”„ Processing section: ${section.sectionId}`);
      console.log(`   Title: ${section.title}`);
      
      try {
        // Get images from Cloudinary
        const imageUrls = await getImagesFromSectionFolder(section.sectionId, cloudinaryPageName);
        
        if (imageUrls.length > 0) {
          // Update database
          const success = await updateSectionImages(section.sectionId, imageUrls);
          
          if (success) {
            successCount++;
            totalImages += imageUrls.length;
          } else {
            errorCount++;
          }
        } else {
          console.log(`   â„¹ï¸  No images found in Cloudinary`);
        }
      } catch (error) {
        console.error(`   âŒ Error processing section ${section.sectionId}:`, error.message);
        errorCount++;
      }
    }
    
    // Page summary
    console.log(`\nðŸ“‹ PAGE SYNC SUMMARY: ${pageSlug.toUpperCase()}`);
    console.log('â”€'.repeat(60));
    console.log(`âœ… Successfully processed: ${successCount} sections`);
    console.log(`âŒ Errors encountered: ${errorCount} sections`);
    console.log(`ðŸ–¼ï¸  Total images synced: ${totalImages}`);
    console.log(`ðŸ“Š Total sections found: ${sections.length}`);
    console.log('â”€'.repeat(60));
    
  } catch (error) {
    console.error(`âŒ Error syncing page ${pageSlug}:`, error.message);
  }
}

/**
 * Sync both auditing and verification pages
 */
async function syncBothPages() {
  try {
    console.log('ðŸš€ Starting sync for auditing and verification pages...\n');
    
    // Sync auditing page
    await syncPageSections('auditing-services');
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Sync verification page
    await syncPageSections('verification-certification-services');
    
    console.log('\n' + '='.repeat(60));
    console.log('ðŸŽ‰ COMPLETE SYNC SUMMARY');
    console.log('='.repeat(60));
    console.log('âœ… Both pages have been processed');
    console.log('ðŸ“„ auditing-services â†’ Cloudinary: auditing');
    console.log('ðŸ“„ verification-certification-services â†’ Cloudinary: verification-certification');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('âŒ Fatal error during sync:', error.message);
  }
}

/**
 * Test Cloudinary structure for these specific pages
 */
async function testCloudinaryStructure() {
  try {
    console.log('ðŸ” Testing Cloudinary structure for auditing and verification pages...\n');
    
    for (const [dbPage, cloudinaryPage] of Object.entries(PAGE_CLOUDINARY_MAPPING)) {
      console.log(`ðŸ“„ DATABASE PAGE: ${dbPage.toUpperCase()}`);
      console.log(`ðŸ“ CLOUDINARY FOLDER: ${cloudinaryPage}`);
      console.log('â”€'.repeat(50));
      
      // List all resources in the specific page folder
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: `INSPECTORS/${cloudinaryPage}/`,
        max_results: 300,
        resource_type: 'image'
      });

      if (result.resources && result.resources.length > 0) {
        console.log(`âœ… Found ${result.resources.length} total images in INSPECTORS/${cloudinaryPage}/`);
        
        // Group by section
        const sections = {};
        result.resources.forEach(resource => {
          const pathParts = resource.public_id.split('/');
          if (pathParts.length >= 3) {
            const sectionId = pathParts[2];
            if (!sections[sectionId]) {
              sections[sectionId] = [];
            }
            sections[sectionId].push(resource.secure_url);
          }
        });

        // Display sections
        Object.keys(sections).forEach(sectionId => {
          const imageCount = sections[sectionId].length;
          console.log(`  ðŸ“ ${sectionId}: ${imageCount} images`);
          
          // Show first 2 image URLs as examples
          sections[sectionId].forEach((url, index) => {
            if (index < 2) {
              console.log(`     ${index + 1}. ${url}`);
            }
          });
          if (imageCount > 2) {
            console.log(`     ... and ${imageCount - 2} more images`);
          }
        });
        
        console.log(`  ðŸ“Š Total in ${cloudinaryPage}: ${result.resources.length} images`);
      } else {
        console.log(`âš ï¸  No images found in INSPECTORS/${cloudinaryPage}/`);
      }
      
      console.log('');
    }
    
  } catch (error) {
    console.error('âŒ Error testing Cloudinary structure:', error.message);
  }
}

/**
 * Show sections that belong to these pages
 */
async function showPageSections() {
  try {
    console.log('ðŸ“Š Sections in auditing and verification pages:\n');
    
    for (const pageSlug of Object.keys(PAGE_CLOUDINARY_MAPPING)) {
      console.log(`ðŸ“„ PAGE: ${pageSlug.toUpperCase()}`);
      console.log(`ðŸ“ Cloudinary folder: ${PAGE_CLOUDINARY_MAPPING[pageSlug]}`);
      console.log('â”€'.repeat(50));
      
      const sections = await Section.find({ page: pageSlug }, 'sectionId title images');
      
      if (sections.length === 0) {
        console.log('  âš ï¸  No sections found');
      } else {
        sections.forEach(section => {
          const imageCount = section.images ? section.images.length : 0;
          const hasCloudinaryImages = section.images && section.images.some(img => 
            img.includes('cloudinary.com') || img.includes('res.cloudinary.com')
          );
          
          console.log(`  ðŸ“ ${section.sectionId}`);
          console.log(`     Title: ${section.title}`);
          console.log(`     Images: ${imageCount} (${hasCloudinaryImages ? 'âœ… Cloudinary' : 'âŒ Placeholder'})`);
        });
        
        console.log(`  ðŸ“Š Total sections: ${sections.length}`);
      }
      
      console.log('');
    }
    
  } catch (error) {
    console.error('âŒ Error showing page sections:', error.message);
  }
}

// Main execution
async function main() {
  try {
    // Connect to MongoDB
    console.log('ðŸ”Œ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('âœ… Connected to MongoDB successfully\n');

    // Check command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      // No arguments - sync both pages
      await syncBothPages();
    } else if (args[0] === '--auditing' || args[0] === '-a') {
      // Sync only auditing page
      await syncPageSections('auditing-services');
    } else if (args[0] === '--verification' || args[0] === '-v') {
      // Sync only verification page
      await syncPageSections('verification-certification-services');
    } else if (args[0] === '--test' || args[0] === '-t') {
      // Test Cloudinary structure
      await testCloudinaryStructure();
    } else if (args[0] === '--show' || args[0] === '-s') {
      // Show sections in these pages
      await showPageSections();
    } else if (args[0] === '--help' || args[0] === '-h') {
      // Show help
      console.log('ðŸ†˜ Specific Pages Image Sync Script Help\n');
      console.log('This script syncs images for pages with different names in database vs Cloudinary:\n');
      console.log('ðŸ“„ Database: auditing-services â†’ Cloudinary: auditing');
      console.log('ðŸ“„ Database: verification-certification-services â†’ Cloudinary: verification-certification\n');
      console.log('Usage:');
      console.log('  node sync-specific-pages.js                    # Sync both pages');
      console.log('  node sync-specific-pages.js --auditing         # Sync only auditing page');
      console.log('  node sync-specific-pages.js --verification     # Sync only verification page');
      console.log('  node sync-specific-pages.js --test             # Test Cloudinary structure');
      console.log('  node sync-specific-pages.js --show             # Show sections in these pages');
      console.log('  node sync-specific-pages.js --help             # Show this help\n');
      console.log('Examples:');
      console.log('  node sync-specific-pages.js');
      console.log('  node sync-specific-pages.js --auditing');
      console.log('  node sync-specific-pages.js --verification');
      console.log('  node sync-specific-pages.js --test');
    } else {
      console.log('âŒ Unknown argument. Use --help for usage information.');
    }

  } catch (error) {
    console.error('âŒ Fatal error:', error.message);
  } finally {
    // Close MongoDB connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('ðŸ”Œ MongoDB connection closed');
    }
    process.exit(0);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  syncPageSections,
  syncBothPages,
  testCloudinaryStructure,
  showPageSections
};

