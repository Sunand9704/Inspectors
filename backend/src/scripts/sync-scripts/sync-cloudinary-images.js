const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const vm = require('vm');
require('dotenv').config();

// Import models
const Section = require('../../models/Section');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure MongoDB connection
const MONGODB_URI = "mongodb+srv://INSPECTORS360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster" ||  process.env.MONGODB_URI || 'mongodb://localhost:27017/INSPECTORS';

/**
 * Get the page slug for a given section ID from database
 * @param {string} sectionId - The section ID
 * @returns {Promise<string>} The page slug (defaults to 'INSPECTORS')
 */
async function getPageSlugForSection(sectionId) {
  try {
    // Get the page from the database
    const section = await Section.findOne({ sectionId: sectionId }, 'page');
    if (section && section.page) {
      return section.page;
    }
    
    // If no page field is set, return default
    console.log(`âš ï¸  Section ${sectionId} has no page field set`);
    return 'INSPECTORS'; // Default fallback
  } catch (error) {
    console.error(`âŒ Error getting page slug for ${sectionId}:`, error.message);
    return 'INSPECTORS'; // Default fallback
  }
}

/**
 * Get all images from a specific Cloudinary folder
 * @param {string} sectionId - The section ID to match with Cloudinary folder
 * @param {string} pageSlug - The page slug (e.g., 'INSPECTORS', 'testing', 'inspection')
 * @returns {Promise<Array>} Array of image URLs
 */
async function getImagesFromSectionFolder(sectionId, pageSlug = 'INSPECTORS') {
  try {
    const folderPath = `INSPECTORS/${pageSlug}/${sectionId}`;
    console.log(`ðŸ” Searching for images in folder: ${folderPath}`);
    
    // Search for images in the nested folder structure: INSPECTORS/page-slug/section-id
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 300,
      resource_type: 'image'
    });

    if (result.resources && result.resources.length > 0) {
      const imageUrls = result.resources.map(resource => resource.secure_url);
      console.log(`âœ… Found ${imageUrls.length} images for section: ${sectionId} in ${folderPath}`);
      
      // Log detailed structure information
      console.log(`ðŸ“Š Structure: INSPECTORS/${pageSlug}/${sectionId} â†’ ${imageUrls.length} images`);
      
      return imageUrls;
    } else {
      console.log(`âš ï¸  No images found for section: ${sectionId} in ${folderPath}`);
      console.log(`ðŸ“Š Structure: INSPECTORS/${pageSlug}/${sectionId} â†’ 0 images`);
      return [];
    }
  } catch (error) {
    console.error(`âŒ Error fetching images for section ${sectionId}:`, error.message);
    return [];
  }
}

/**
 * Clean existing Cloudinary images from database to prevent duplicates
 * @param {string} sectionId - The section ID
 * @returns {Promise<boolean>} Success status
 */
async function cleanExistingCloudinaryImages(sectionId) {
  try {
    // Find the section and remove any existing Cloudinary images
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

    // Update with only placeholder images (removing Cloudinary images)
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
 * Clean all existing Cloudinary images from the entire database
 * @returns {Promise<Object>} Summary of cleaning operation
 */
async function cleanAllCloudinaryImages() {
  try {
    console.log('ðŸ” Scanning database for sections with Cloudinary images...\n');
    
    // Find all sections that have Cloudinary images
    const sectionsWithCloudinary = await Section.find({
      images: { 
        $elemMatch: { 
          $regex: /cloudinary\.com|res\.cloudinary\.com/ 
        } 
      }
    });

    if (sectionsWithCloudinary.length === 0) {
      console.log('âœ… No sections with Cloudinary images found in database');
      return { cleaned: 0, totalImages: 0, sectionsProcessed: 0 };
    }

    console.log(`ðŸ“Š Found ${sectionsWithCloudinary.length} sections with Cloudinary images\n`);

    let totalCleaned = 0;
    let totalImagesBefore = 0;
    let sectionsProcessed = 0;

    for (const section of sectionsWithCloudinary) {
      const imagesBefore = section.images ? section.images.length : 0;
      totalImagesBefore += imagesBefore;

      // Filter out Cloudinary images, keep only placeholder images
      const placeholderImages = section.images ? section.images.filter(img => 
        !img.includes('cloudinary.com') && !img.includes('res.cloudinary.com')
      ) : [];

      const cloudinaryImagesRemoved = imagesBefore - placeholderImages.length;
      
      if (cloudinaryImagesRemoved > 0) {
        // Update the section
        await Section.updateOne(
          { _id: section._id },
          { $set: { images: placeholderImages } }
        );
        
        totalCleaned += cloudinaryImagesRemoved;
        sectionsProcessed++;
        
        console.log(`ðŸ§¹ ${section.sectionId}: Removed ${cloudinaryImagesRemoved} Cloudinary images (${placeholderImages.length} placeholders kept)`);
      }
    }

    console.log('\nðŸ“‹ CLEANING SUMMARY:');
    console.log('='.repeat(60));
    console.log(`ðŸ“Š Sections processed: ${sectionsProcessed}`);
    console.log(`ðŸ–¼ï¸  Total images before: ${totalImagesBefore}`);
    console.log(`ðŸ§¹ Cloudinary images removed: ${totalCleaned}`);
    console.log(`ðŸ–¼ï¸  Placeholder images kept: ${totalImagesBefore - totalCleaned}`);
    console.log('='.repeat(60));

    return {
      cleaned: totalCleaned,
      totalImages: totalImagesBefore,
      sectionsProcessed: sectionsProcessed
    };

  } catch (error) {
    console.error('âŒ Error cleaning all Cloudinary images:', error.message);
    throw error;
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
 * Main function to sync all sections with Cloudinary images
 */
async function syncAllSections() {
  try {
    console.log('ðŸš€ Starting Cloudinary image sync for all sections...\n');

    // Get all unique section IDs from the database
    const sections = await Section.distinct('sectionId');
    console.log(`ðŸ“Š Found ${sections.length} unique section IDs in database:\n`);

    let successCount = 0;
    let errorCount = 0;
    let totalImages = 0;

    // Process each section
    for (const sectionId of sections) {
      console.log(`\nðŸ”„ Processing section: ${sectionId}`);
      
      try {
        // Get the page slug for this section
        const pageSlug = await getPageSlugForSection(sectionId);
        
        // Use fuzzy matching to find the correct Cloudinary path
        const cloudinaryResult = await findCorrectCloudinaryPath(sectionId, pageSlug);
        
        if (cloudinaryResult && cloudinaryResult.images.length > 0) {
          const imageUrls = cloudinaryResult.images;
          
          // Log the path correction if there was a mismatch
          if (cloudinaryResult.actualSectionId && cloudinaryResult.actualSectionId !== sectionId) {
            console.log(`ðŸ”„ Path corrected: ${sectionId} â†’ ${cloudinaryResult.actualSectionId}`);
          }
          // Update database with new images
          const success = await updateSectionImages(sectionId, imageUrls);
          
          if (success) {
            successCount++;
            totalImages += imageUrls.length;
          } else {
            errorCount++;
          }
        } else {
          console.log(`â„¹ï¸  Section ${sectionId} has no images in Cloudinary`);
        }
      } catch (error) {
        console.error(`âŒ Error processing section ${sectionId}:`, error.message);
        errorCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('ðŸ“‹ SYNC SUMMARY');
    console.log('='.repeat(60));
    console.log(`âœ… Successfully processed: ${successCount} sections`);
    console.log(`âŒ Errors encountered: ${errorCount} sections`);
    console.log(`ðŸ–¼ï¸  Total images synced: ${totalImages}`);
    console.log(`ðŸ“Š Total sections found: ${sections.length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('âŒ Fatal error during sync:', error.message);
    process.exit(1);
  }
}

/**
 * Sync sections for a specific page slug (e.g., 'industries')
 * @param {string} pageSlug - The page slug to filter sections by
 */
async function syncSectionsByPage(pageSlug) {
  try {
    console.log(`ðŸš€ Starting Cloudinary image sync for page: ${pageSlug}\n`);

    // Get all unique section IDs for the given page
    const sections = await Section.find({ page: pageSlug }).distinct('sectionId');
    console.log(`ðŸ“Š Found ${sections.length} unique section IDs for page '${pageSlug}':\n`);

    let successCount = 0;
    let errorCount = 0;
    let totalImages = 0;

    // Special handling for industries: pull URLs from frontend/src/images.js instead of Cloudinary
    if (pageSlug === 'industries') {
      const imagesFilePath = path.resolve(__dirname, '../../../../frontend/src/images.js');
      let industryMap = {};
      try {
        const fileContent = fs.readFileSync(imagesFilePath, 'utf8');
        // Transform ESM export to CommonJS for evaluation
        const transformed = fileContent
          .replace(/export\s+const\s+industryImages\s*=\s*/m, 'const industryImages = ')
          .replace(/export\s+default\s+industryImages\s*;?/m, 'module.exports = industryImages;');

        const sandbox = { module: { exports: {} } };
        vm.createContext(sandbox);
        vm.runInContext(transformed, sandbox, { filename: 'images.js' });
        industryMap = sandbox.module.exports || {};
      } catch (e) {
        console.error('âŒ Failed to read/parse frontend images file:', e.message);
      }

      for (const sectionId of sections) {
        console.log(`\nðŸ”„ Processing section: ${sectionId}`);
        try {
          let keyUsed = sectionId;
          let entry = industryMap[sectionId];

          if (!entry) {
            // Fuzzy match against available keys from images.js
            const keys = Object.keys(industryMap);
            let best = null;
            let bestScore = 0;
            for (const k of keys) {
              const score = calculateSimilarity(sectionId, k);
              if (score > bestScore) {
                best = k;
                bestScore = score;
              }
            }
            if (best && bestScore > 0.5) {
              console.log(`ðŸŽ¯ Images mapping: ${sectionId} â†’ ${best} (similarity ${(bestScore * 100).toFixed(1)}%)`);
              entry = industryMap[best];
              keyUsed = best;
            }
          }

          if (entry && Array.isArray(entry.images) && entry.images.length > 0) {
            const imageUrls = entry.images.map(img => img.url).filter(Boolean);
            if (imageUrls.length > 0) {
              const success = await updateSectionImages(sectionId, imageUrls);
              if (success) {
                successCount++;
                totalImages += imageUrls.length;
              } else {
                errorCount++;
              }
            } else {
              console.log(`â„¹ï¸  No valid URLs for section ${sectionId} (key '${keyUsed}') in images.js`);
            }
          } else {
            console.log(`â„¹ï¸  Section ${sectionId} not found in images.js or has no images`);
          }
        } catch (error) {
          console.error(`âŒ Error processing section ${sectionId}:`, error.message);
          errorCount++;
        }
      }
    } else {
      // Default behavior for other pages: search Cloudinary
      for (const sectionId of sections) {
        console.log(`\nðŸ”„ Processing section: ${sectionId}`);
        try {
          const cloudinaryResult = await findCorrectCloudinaryPath(sectionId, pageSlug);
          if (cloudinaryResult && cloudinaryResult.images.length > 0) {
            const imageUrls = cloudinaryResult.images;
            if (cloudinaryResult.actualSectionId && cloudinaryResult.actualSectionId !== sectionId) {
              console.log(`ðŸ”„ Path corrected: ${sectionId} â†’ ${cloudinaryResult.actualSectionId}`);
            }
            const success = await updateSectionImages(sectionId, imageUrls);
            if (success) {
              successCount++;
              totalImages += imageUrls.length;
            } else {
              errorCount++;
            }
          } else {
            console.log(`â„¹ï¸  Section ${sectionId} has no images in Cloudinary for page '${pageSlug}'`);
          }
        } catch (error) {
          console.error(`âŒ Error processing section ${sectionId}:`, error.message);
          errorCount++;
        }
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log(`ðŸ“‹ SYNC SUMMARY â€” page: ${pageSlug}`);
    console.log('='.repeat(60));
    console.log(`âœ… Successfully processed: ${successCount} sections`);
    console.log(`âŒ Errors encountered: ${errorCount} sections`);
    console.log(`ðŸ–¼ï¸  Total images synced: ${totalImages}`);
    console.log(`ðŸ“Š Total sections found: ${sections.length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('âŒ Fatal error during sync by page:', error.message);
    process.exit(1);
  }
}

/**
 * Sync a specific section by ID
 * @param {string} sectionId - The specific section ID to sync
 */
async function syncSpecificSection(sectionId) {
  try {
    console.log(`ðŸš€ Starting sync for specific section: ${sectionId}\n`);

    // Check if section exists in database
    const sectionExists = await Section.findOne({ sectionId: sectionId });
    if (!sectionExists) {
      console.log(`âŒ Section with ID '${sectionId}' not found in database`);
      return;
    }

    // Get the page slug for this section
    const pageSlug = await getPageSlugForSection(sectionId);
    
    // Get images from Cloudinary
    const imageUrls = await getImagesFromSectionFolder(sectionId, pageSlug);
    
    if (imageUrls.length > 0) {
      // Update database
      const success = await updateSectionImages(sectionId, imageUrls);
      
      if (success) {
        console.log(`\nâœ… Successfully synced section: ${sectionId}`);
        console.log(`ðŸ–¼ï¸  Images found: ${imageUrls.length}`);
        console.log(`ðŸ”— First image: ${imageUrls[0]}`);
      }
    } else {
      console.log(`\nâš ï¸  No images found in Cloudinary for section: ${sectionId}`);
    }

  } catch (error) {
    console.error(`âŒ Error syncing section ${sectionId}:`, error.message);
  }
}

/**
 * Test Cloudinary folder structure and list available folders
 */
async function testCloudinaryStructure() {
  try {
    console.log('ðŸ” Testing Cloudinary folder structure...\n');
    
    // List all resources in the INSPECTORS folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'INSPECTORS/',
      max_results: 300,
      resource_type: 'image'
    });

    if (result.resources && result.resources.length > 0) {
      console.log(`âœ… Found ${result.resources.length} total images in INSPECTORS folder:\n`);
      
      // Group by page and section structure
      const pageStructure = {};
      result.resources.forEach(resource => {
        const pathParts = resource.public_id.split('/');
        if (pathParts.length >= 3) {
          const pageSlug = pathParts[1];
          const sectionId = pathParts[2];
          
          if (!pageStructure[pageSlug]) {
            pageStructure[pageSlug] = {};
          }
          if (!pageStructure[pageSlug][sectionId]) {
            pageStructure[pageSlug][sectionId] = [];
          }
          pageStructure[pageSlug][sectionId].push(resource.secure_url);
        }
      });

      // Display organized structure
      Object.keys(pageStructure).forEach(pageSlug => {
        console.log(`ðŸ“„ PAGE: ${pageSlug.toUpperCase()}`);
        console.log('â”€'.repeat(50));
        
        const sections = pageStructure[pageSlug];
        const totalImagesInPage = Object.values(sections).reduce((sum, images) => sum + images.length, 0);
        
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
        
        console.log(`  ðŸ“Š Total in ${pageSlug}: ${totalImagesInPage} images`);
        console.log('');
      });

      // Summary
      console.log('ðŸ“‹ STRUCTURE SUMMARY:');
      console.log('='.repeat(60));
      Object.keys(pageStructure).forEach(pageSlug => {
        const sections = pageStructure[pageSlug];
        const totalImages = Object.values(sections).reduce((sum, images) => sum + images.length, 0);
        const sectionCount = Object.keys(sections).length;
        console.log(`ðŸ“„ ${pageSlug.toUpperCase()}: ${sectionCount} sections, ${totalImages} images`);
      });
      console.log('='.repeat(60));
      
    } else {
      console.log('âš ï¸  No images found in INSPECTORS folder');
    }

  } catch (error) {
    console.error('âŒ Error testing Cloudinary structure:', error.message);
  }
}

/**
 * Find the correct Cloudinary folder path for a section by fuzzy matching
 * @param {string} sectionId - The section ID to search for
 * @param {string} pageSlug - The page slug
 * @returns {Promise<{correctPath: string, imageCount: number, images: Array}>}
 */
async function findCorrectCloudinaryPath(sectionId, pageSlug = 'INSPECTORS') {
  try {
    console.log(`ðŸ” Fuzzy searching for section: ${sectionId}`);
    
    // First try exact match
    let exactResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: `INSPECTORS/${pageSlug}/${sectionId}`,
      max_results: 10,
      resource_type: 'image'
    });

    if (exactResult.resources && exactResult.resources.length > 0) {
      console.log(`âœ… Exact match found: INSPECTORS/${pageSlug}/${sectionId} (${exactResult.resources.length} images)`);
      return {
        correctPath: `INSPECTORS/${pageSlug}/${sectionId}`,
        imageCount: exactResult.resources.length,
        images: exactResult.resources.map(r => r.secure_url)
      };
    }

    // If no exact match, search more broadly
    console.log(`ðŸ” No exact match, searching broadly in INSPECTORS/${pageSlug}/...`);
    
    const broadResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: `INSPECTORS/${pageSlug}/`,
      max_results: 300,
      resource_type: 'image'
    });

    if (broadResult.resources && broadResult.resources.length > 0) {
      // Group by actual folder names
      const folders = {};
      broadResult.resources.forEach(resource => {
        const pathParts = resource.public_id.split('/');
        if (pathParts.length >= 3) {
          const actualSectionId = pathParts[2];
          if (!folders[actualSectionId]) {
            folders[actualSectionId] = [];
          }
          folders[actualSectionId].push(resource.secure_url);
        }
      });

      // Find the best match using fuzzy logic
      let bestMatch = null;
      let bestScore = 0;

      Object.keys(folders).forEach(actualSectionId => {
        const score = calculateSimilarity(sectionId, actualSectionId);
        if (score > bestScore && score > 0.7) { // 70% similarity threshold
          bestScore = score;
          bestMatch = actualSectionId;
        }
      });

      if (bestMatch) {
        console.log(`ðŸŽ¯ Best fuzzy match found: ${bestMatch} (similarity: ${(bestScore * 100).toFixed(1)}%)`);
        console.log(`   Original: ${sectionId}`);
        console.log(`   Found: ${bestMatch}`);
        console.log(`   Images: ${folders[bestMatch].length}`);
        
        return {
          correctPath: `INSPECTORS/${pageSlug}/${bestMatch}`,
          imageCount: folders[bestMatch].length,
          images: folders[bestMatch],
          originalSectionId: sectionId,
          actualSectionId: bestMatch,
          similarity: bestScore
        };
      }
    }

    console.log(`âŒ No match found for section: ${sectionId}`);
    return null;

  } catch (error) {
    console.error(`âŒ Error finding correct path for ${sectionId}:`, error.message);
    return null;
  }
}

/**
 * Calculate similarity between two strings using Levenshtein distance
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Similarity score (0-1)
 */
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} Distance
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * List all available sections and their current image status
 */
async function listSectionsStatus() {
  try {
    console.log('ðŸ“Š Current sections status in database:\n');
    
    const sections = await Section.find({}, 'sectionId title images language pageNumber');
    
    // Group sections by page
    const sectionsByPage = {};
    sections.forEach(section => {
      const pageSlug = section.page || 'unknown';
      if (!sectionsByPage[pageSlug]) {
        sectionsByPage[pageSlug] = [];
      }
      sectionsByPage[pageSlug].push(section);
    });

    // Display organized by page
    Object.keys(sectionsByPage).forEach(pageSlug => {
      console.log(`ðŸ“„ PAGE: ${pageSlug.toUpperCase()}`);
      console.log('â”€'.repeat(50));
      
      const pageSections = sectionsByPage[pageSlug];
      let totalImagesInPage = 0;
      let cloudinaryImagesInPage = 0;
      
      pageSections.forEach(section => {
        const imageCount = section.images ? section.images.length : 0;
        const hasCloudinaryImages = section.images && section.images.some(img => 
          img.includes('cloudinary.com') || img.includes('res.cloudinary.com')
        );
        const pageSlug = section.page || 'unknown';
        
        totalImagesInPage += imageCount;
        if (hasCloudinaryImages) cloudinaryImagesInPage += imageCount;
        
        console.log(`  ðŸ“ ${section.sectionId}`);
        console.log(`     Title: ${section.title}`);
        console.log(`     Language: ${section.language}`);
        console.log(`     Page: ${section.pageNumber}`);
        console.log(`     Page Slug: ${section.page || 'MISSING'}`);
        console.log(`     Cloudinary Path: INSPECTORS/${pageSlug}/${section.sectionId}`);
        console.log(`     Images: ${imageCount} (${hasCloudinaryImages ? 'âœ… Cloudinary' : 'âŒ Placeholder'})`);
        if (section.images && section.images.length > 0) {
          console.log(`     Sample: ${section.images[0]}`);
        }
        console.log('');
      });
      
      console.log(`  ðŸ“Š Page Summary: ${pageSections.length} sections, ${totalImagesInPage} total images, ${cloudinaryImagesInPage} Cloudinary images`);
      console.log('');
    });

    // Overall summary
    const totalSections = sections.length;
    const totalImages = sections.reduce((sum, section) => sum + (section.images ? section.images.length : 0), 0);
    const totalCloudinaryImages = sections.reduce((sum, section) => {
      if (section.images) {
        return sum + section.images.filter(img => 
          img.includes('cloudinary.com') || img.includes('res.cloudinary.com')
        ).length;
      }
      return sum;
    }, 0);

    console.log('ðŸ“‹ DATABASE SUMMARY:');
    console.log('='.repeat(60));
    console.log(`ðŸ“Š Total Sections: ${totalSections}`);
    console.log(`ðŸ–¼ï¸  Total Images: ${totalImages}`);
    console.log(`â˜ï¸  Cloudinary Images: ${totalCloudinaryImages}`);
    console.log(`âŒ Placeholder Images: ${totalImages - totalCloudinaryImages}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('âŒ Error listing sections:', error.message);
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
      // No arguments - sync all sections
      await syncAllSections();
    } else if (args[0] === '--industries') {
      // Convenience flag to sync only industries page
      await syncSectionsByPage('industries');
    } else if (args[0] === '--page' || args[0] === '-p') {
      // Sync sections by page slug
      if (args[1]) {
        await syncSectionsByPage(args[1]);
      } else {
        console.log('âŒ Please provide a page slug after --page flag');
        console.log('Usage: node sync-cloudinary-images.js --page <slug>');
      }
    } else if (args[0] === '--list' || args[0] === '-l') {
      // List sections status
      await listSectionsStatus();
    } else if (args[0] === '--section' || args[0] === '-s') {
      // Sync specific section
      if (args[1]) {
        await syncSpecificSection(args[1]);
      } else {
        console.log('âŒ Please provide a section ID after --section flag');
        console.log('Usage: node sync-cloudinary-images.js --section <sectionId>');
      }
    } else if (args[0] === '--test' || args[0] === '-t') {
      // Test Cloudinary structure
      await testCloudinaryStructure();
    } else if (args[0] === '--fuzzy' || args[0] === '-f') {
      // Test fuzzy matching for a specific section
      if (args[1]) {
        const pageSlug = await getPageSlugForSection(args[1]);
        console.log(`ðŸ” Testing fuzzy matching for section: ${args[1]}`);
        console.log(`ðŸ“„ Page slug: ${pageSlug}\n`);
        
        const result = await findCorrectCloudinaryPath(args[1], pageSlug);
        if (result) {
          console.log(`\nâœ… Result:`);
          console.log(`   Correct Path: ${result.correctPath}`);
          console.log(`   Images Found: ${result.imageCount}`);
          if (result.actualSectionId && result.actualSectionId !== args[1]) {
            console.log(`   Path Correction: ${args[1]} â†’ ${result.actualSectionId}`);
            console.log(`   Similarity: ${(result.similarity * 100).toFixed(1)}%`);
          }
        } else {
          console.log(`âŒ No match found for section: ${args[1]}`);
        }
      } else {
        console.log('âŒ Please provide a section ID after --fuzzy flag');
        console.log('Usage: node sync-cloudinary-images.js --fuzzy <sectionId>');
      }
    } else if (args[0] === '--clean' || args[0] === '-c') {
      // Clean all existing Cloudinary images from database
      if (args[1] === 'all') {
        console.log('ðŸ§¹ Cleaning all existing Cloudinary images from database...\n');
        await cleanAllCloudinaryImages();
      } else if (args[1]) {
        // Clean specific section
        console.log(`ðŸ§¹ Cleaning Cloudinary images for section: ${args[1]}\n`);
        await cleanExistingCloudinaryImages(args[1]);
      } else {
        console.log('âŒ Please specify what to clean');
        console.log('Usage: node sync-cloudinary-images.js --clean all');
        console.log('Usage: node sync-cloudinary-images.js --clean <sectionId>');
      }
    } else if (args[0] === '--help' || args[0] === '-h') {
      // Show help
      console.log('ðŸ†˜ Cloudinary Image Sync Script Help\n');
      console.log('Usage:');
      console.log('  node sync-cloudinary-images.js                    # Sync all sections');
      console.log('  node sync-cloudinary-images.js --industries       # Sync only industries page');
      console.log('  node sync-cloudinary-images.js --page <slug>      # Sync by page slug');
      console.log('  node sync-cloudinary-images.js --list            # List sections status');
      console.log('  node sync-cloudinary-images.js --section <id>    # Sync specific section');
      console.log('  node sync-cloudinary-images.js --test            # Test Cloudinary structure');
      console.log('  node sync-cloudinary-images.js --fuzzy <id>      # Test fuzzy matching for section');
      console.log('  node sync-cloudinary-images.js --clean all      # Clean all Cloudinary images from DB');
      console.log('  node sync-cloudinary-images.js --clean <id>     # Clean Cloudinary images for specific section');
      console.log('  node sync-cloudinary-images.js --help            # Show this help\n');
      console.log('Examples:');
      console.log('  node sync-cloudinary-images.js');
      console.log('  node sync-cloudinary-images.js --industries');
      console.log('  node sync-cloudinary-images.js --page industries');
      console.log('  node sync-cloudinary-images.js --list');
      console.log('  node sync-cloudinary-images.js --section vibration-analysis-balancing');
      console.log('  node sync-cloudinary-images.js --test');
      console.log('  node sync-cloudinary-images.js --fuzzy asset-integrity-fitness-verification-certification');
      console.log('  node sync-cloudinary-images.js --clean all');
      console.log('  node sync-cloudinary-images.js --clean vibration-analysis-balancing');
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
  syncAllSections,
  syncSectionsByPage,
  syncSpecificSection,
  listSectionsStatus,
  testCloudinaryStructure,
  findCorrectCloudinaryPath,
  cleanExistingCloudinaryImages,
  cleanAllCloudinaryImages,
  getImagesFromSectionFolder,
  updateSectionImages
};

