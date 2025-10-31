﻿const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Section = require('./src/models/Section');
const Page = require('./src/models/Page');

// Configure MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/INSPECTORS';

/**
 * Get all available pages and their sections from database
 * @returns {Promise<Object>} Object with page slugs as keys and section arrays as values
 */
async function getAllPagesAndSections() {
  try {
    const pages = {};
    
    // Get all active pages from database
    const dbPages = await Page.find({ isActive: true }).populate('sections');
    
    console.log(`ðŸ“Š Found ${dbPages.length} active pages in database`);
    
    // Process each page
    for (const page of dbPages) {
      const pageSlug = page.slug;
      const sectionIds = [];
      
      // Extract section IDs from the page
      if (page.sections && page.sections.length > 0) {
        // If sections are populated objects, get their sectionId
        if (typeof page.sections[0] === 'object' && page.sections[0].sectionId) {
          sectionIds.push(...page.sections.map(section => section.sectionId));
        } else {
          // If sections are just IDs, we'll need to fetch them
          console.log(`  âš ï¸  Page ${pageSlug} has section IDs but not populated`);
        }
      }
      
      pages[pageSlug] = sectionIds;
      console.log(`  ðŸ“„ ${pageSlug}: ${sectionIds.length} sections`);
    }
    
    return pages;
    
  } catch (error) {
    console.error('âŒ Error getting pages from database:', error.message);
    throw error;
  }
}

/**
 * Populate page field for all sections based on page data
 */
async function populatePageFields() {
  try {
    console.log('ðŸš€ Starting page field population for all sections...\n');
    
    const pages = await getAllPagesAndSections();
    console.log('ðŸ“„ Available pages and their sections:');
    Object.keys(pages).forEach(pageSlug => {
      console.log(`  ðŸ“ ${pageSlug}: ${pages[pageSlug].length} sections`);
      pages[pageSlug].forEach(sectionId => {
        console.log(`    - ${sectionId}`);
      });
    });
    console.log('');

    let totalSections = 0;
    let updatedSections = 0;
    let skippedSections = 0;
    let errorSections = 0;

    // Process each page
    for (const [pageSlug, sectionIds] of Object.entries(pages)) {
      console.log(`ðŸ”„ Processing page: ${pageSlug}`);
      
      for (const sectionId of sectionIds) {
        try {
          // Find sections with this sectionId
          const sections = await Section.find({ sectionId: sectionId });
          
          if (sections.length === 0) {
            console.log(`  âš ï¸  No sections found with sectionId: ${sectionId}`);
            continue;
          }

          totalSections += sections.length;
          
          for (const section of sections) {
            try {
              // Check if page field already exists and is correct
              if (section.page === pageSlug) {
                console.log(`  âœ… ${sectionId}: Already has correct page field (${pageSlug})`);
                skippedSections++;
                continue;
              }

              // Update the page field
              const result = await Section.updateOne(
                { _id: section._id },
                { $set: { page: pageSlug } }
              );

              if (result.modifiedCount > 0) {
                console.log(`  ðŸ”„ ${sectionId}: Updated page field to ${pageSlug}`);
                updatedSections++;
              } else {
                console.log(`  â„¹ï¸  ${sectionId}: No changes needed`);
                skippedSections++;
              }

            } catch (error) {
              console.error(`  âŒ Error updating section ${sectionId}:`, error.message);
              errorSections++;
            }
          }

        } catch (error) {
          console.error(`  âŒ Error processing sectionId ${sectionId}:`, error.message);
          errorSections++;
        }
      }
      console.log('');
    }

    // Summary
    console.log('ðŸ“‹ POPULATION SUMMARY:');
    console.log('='.repeat(60));
    console.log(`ðŸ“Š Total sections processed: ${totalSections}`);
    console.log(`âœ… Updated sections: ${updatedSections}`);
    console.log(`â­ï¸  Skipped sections: ${skippedSections}`);
    console.log(`âŒ Errors: ${errorSections}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('âŒ Fatal error during population:', error.message);
    process.exit(1);
  }
}

/**
 * Show all pages in the database
 */
async function showDatabasePages() {
  try {
    console.log('ðŸ“Š All pages in database:\n');
    
    const pages = await Page.find({}, 'title slug language isActive pageNumber sections');
    
    if (pages.length === 0) {
      console.log('âŒ No pages found in database');
      return;
    }

    pages.forEach(page => {
      console.log(`ðŸ“„ ${page.title} (${page.slug})`);
      console.log(`   Language: ${page.language}`);
      console.log(`   Page Number: ${page.pageNumber}`);
      console.log(`   Active: ${page.isActive ? 'âœ…' : 'âŒ'}`);
      console.log(`   Sections: ${page.sections ? page.sections.length : 0}`);
      console.log('');
    });

    // Summary
    console.log('ðŸ“‹ PAGE SUMMARY:');
    console.log('='.repeat(60));
    console.log(`ðŸ“Š Total pages: ${pages.length}`);
    console.log(`âœ… Active pages: ${pages.filter(p => p.isActive).length}`);
    console.log(`âŒ Inactive pages: ${pages.filter(p => !p.isActive).length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('âŒ Error showing database pages:', error.message);
  }
}

/**
 * Show current page field status for all sections
 */
async function showPageFieldStatus() {
  try {
    console.log('ðŸ“Š Current page field status for all sections:\n');
    
    const sections = await Section.find({}, 'sectionId title page language pageNumber');
    
    // Group by page
    const sectionsByPage = {};
    const sectionsWithoutPage = [];
    
    sections.forEach(section => {
      if (section.page) {
        if (!sectionsByPage[section.page]) {
          sectionsByPage[section.page] = [];
        }
        sectionsByPage[section.page].push(section);
      } else {
        sectionsWithoutPage.push(section);
      }
    });

    // Show sections with page field
    Object.keys(sectionsByPage).forEach(pageSlug => {
      console.log(`ðŸ“„ PAGE: ${pageSlug.toUpperCase()}`);
      console.log('â”€'.repeat(50));
      
      sectionsByPage[pageSlug].forEach(section => {
        console.log(`  ðŸ“ ${section.sectionId}`);
        console.log(`     Title: ${section.title}`);
        console.log(`     Language: ${section.language}`);
        console.log(`     Page Number: ${section.pageNumber}`);
        console.log(`     Page: ${section.page}`);
        console.log('');
      });
    });

    // Show sections without page field
    if (sectionsWithoutPage.length > 0) {
      console.log('âŒ SECTIONS WITHOUT PAGE FIELD:');
      console.log('â”€'.repeat(50));
      
      sectionsWithoutPage.forEach(section => {
        console.log(`  ðŸ“ ${section.sectionId}`);
        console.log(`     Title: ${section.title}`);
        console.log(`     Language: ${section.language}`);
        console.log(`     Page Number: ${section.pageNumber}`);
        console.log(`     Page: MISSING`);
        console.log('');
      });
    }

    // Summary
    console.log('ðŸ“‹ STATUS SUMMARY:');
    console.log('='.repeat(60));
    console.log(`ðŸ“Š Total sections: ${sections.length}`);
    console.log(`âœ… With page field: ${sections.length - sectionsWithoutPage.length}`);
    console.log(`âŒ Without page field: ${sectionsWithoutPage.length}`);
    
    Object.keys(sectionsByPage).forEach(pageSlug => {
      console.log(`ðŸ“„ ${pageSlug.toUpperCase()}: ${sectionsByPage[pageSlug].length} sections`);
    });
    console.log('='.repeat(60));

  } catch (error) {
    console.error('âŒ Error showing page field status:', error.message);
  }
}

/**
 * Reset all page fields to null (for testing)
 */
async function resetPageFields() {
  try {
    console.log('ðŸ”„ Resetting all page fields to null...\n');
    
    const result = await Section.updateMany(
      {},
      { $unset: { page: "" } }
    );

    console.log(`âœ… Reset ${result.modifiedCount} sections`);
    console.log('ðŸ“Š All page fields have been cleared');

  } catch (error) {
    console.error('âŒ Error resetting page fields:', error.message);
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
      // No arguments - populate page fields
      await populatePageFields();
    } else if (args[0] === '--pages' || args[0] === '-p') {
      // Show all pages in database
      await showDatabasePages();
    } else if (args[0] === '--status' || args[0] === '-s') {
      // Show current status
      await showPageFieldStatus();
    } else if (args[0] === '--reset' || args[0] === '-r') {
      // Reset page fields
      await resetPageFields();
    } else if (args[0] === '--help' || args[0] === '-h') {
      // Show help
      console.log('ðŸ†˜ Page Field Population Script Help\n');
      console.log('Usage:');
      console.log('  node populate-page-fields.js                    # Populate page fields for all sections');
      console.log('  node populate-page-fields.js --pages           # Show all pages in database');
      console.log('  node populate-page-fields.js --status          # Show current page field status');
      console.log('  node populate-page-fields.js --reset           # Reset all page fields to null');
      console.log('  node populate-page-fields.js --help            # Show this help\n');
      console.log('Examples:');
      console.log('  node populate-page-fields.js');
      console.log('  node populate-page-fields.js --pages');
      console.log('  node populate-page-fields.js --status');
      console.log('  node populate-page-fields.js --reset');
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
  populatePageFields,
  showPageFieldStatus,
  resetPageFields,
  showDatabasePages,
  getAllPagesAndSections
};

