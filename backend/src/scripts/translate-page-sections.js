/**
 * Production Translation Script for Page Sections
 * 
 * This script translates English sections to 4 languages (fr, pt, es, ru)
 * and saves them in the translations Map object of each section.
 * 
 * Usage:
 * node src/scripts/translate-page-sections.js <page-slug>
 * 
 * Example:
 * node src/scripts/translate-page-sections.js testing
 * node src/scripts/translate-page-sections.js inspection
 */

const mongoose = require('mongoose');
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// Import models
const Section = require('../models/Section');
const Page = require('../models/Page');

// Target languages for translation
const TARGET_LANGUAGES = ['fr', 'pt', 'es', 'ru'];

// Database connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://INSPECTORS360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster');
    console.log('âœ… Connected to MongoDB');
  } catch (error) {
    console.error('âŒ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

// Initialize Google Cloud Translation client
function initializeTranslationClient() {
  try {
    const config = {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'your-project-id',
    };
    
    if (process.env.GOOGLE_CLOUD_API_KEY) {
      config.key = process.env.GOOGLE_CLOUD_API_KEY;
      console.log('âœ… Using Google Cloud API Key for authentication');
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      config.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      console.log('âœ… Using Google Cloud service account key file');
    } else if (process.env.GOOGLE_CLOUD_PRIVATE_KEY) {
      config.credentials = {
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
      };
      console.log('âœ… Using Google Cloud service account credentials');
    } else {
      throw new Error('No Google Cloud credentials found');
    }
    
    return new Translate(config);
  } catch (error) {
    console.error('âŒ Error initializing Google Cloud Translation:', error.message);
    process.exit(1);
  }
}

/**
 * Fetch all English sections for a specific page
 * @param {string} pageSlug - Page slug to fetch sections for
 * @returns {Promise<Array>} - Array of English sections
 */
async function fetchEnglishSections(pageSlug) {
  try {
    console.log(`\nðŸ“‹ Fetching English sections for page: ${pageSlug}`);
    
    const sections = await Section.find({
      page: pageSlug,
      language: 'en',
      isActive: true
    }).sort({ pageNumber: 1, sectionId: 1 });
    
    console.log(`âœ… Found ${sections.length} English sections`);
    
    if (sections.length === 0) {
      console.log('âš ï¸  No English sections found for this page');
      return [];
    }
    
    // Display sections
    sections.forEach((section, index) => {
      console.log(`  ${index + 1}. ${section.title} (ID: ${section.sectionId})`);
    });
    
    return sections;
  } catch (error) {
    console.error('âŒ Error fetching sections:', error.message);
    throw error;
  }
}

/**
 * Translate text using Google Cloud Translation API
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language code
 * @param {string} sourceLanguage - Source language code (default: 'en')
 * @returns {Promise<string>} - Translated text
 */
async function translateText(translateClient, text, targetLanguage, sourceLanguage = 'en') {
  try {
    const [translation] = await translateClient.translate(text, {
      from: sourceLanguage,
      to: targetLanguage,
    });
    return translation;
  } catch (error) {
    console.error(`âŒ Translation error (${sourceLanguage} â†’ ${targetLanguage}):`, error.message);
    throw error;
  }
}

/**
 * Translate a single section to all target languages
 * @param {Object} section - Section object from database
 * @param {Object} translateClient - Google Cloud Translation client
 * @returns {Promise<Object>} - Updated section with translations
 */
async function translateSection(section, translateClient) {
  try {
    console.log(`\nðŸ”„ Translating section: "${section.title}"`);
    
    const translations = {};
    
    // Translate to each target language
    for (const lang of TARGET_LANGUAGES) {
      console.log(`   ðŸ“ Translating to ${lang.toUpperCase()}...`);
      
      try {
        // Translate title and bodyText
        const [translatedTitle, translatedBodyText] = await Promise.all([
          translateText(translateClient, section.title, lang),
          translateText(translateClient, section.bodyText, lang)
        ]);
        
        translations[lang] = {
          title: translatedTitle,
          bodyText: translatedBodyText
        };
        
        console.log(`   âœ… ${lang.toUpperCase()}: "${translatedTitle}"`);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`   âŒ Failed to translate to ${lang}:`, error.message);
        // Continue with other languages
      }
    }
    
    // Update the section with translations
    section.translations = translations;
    
    console.log(`âœ… Completed translations for section: "${section.title}"`);
    return section;
    
  } catch (error) {
    console.error('âŒ Error translating section:', error.message);
    throw error;
  }
}

/**
 * Save translated section to database
 * @param {Object} section - Section with translations
 * @returns {Promise<Object>} - Updated section from database
 */
async function saveTranslatedSection(section) {
  try {
    const updatedSection = await Section.findByIdAndUpdate(
      section._id,
      { 
        translations: section.translations,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    console.log(`ðŸ’¾ Saved translations for section: "${section.title}"`);
    return updatedSection;
    
  } catch (error) {
    console.error('âŒ Error saving section:', error.message);
    throw error;
  }
}

/**
 * Translate all sections for a page
 * @param {string} pageSlug - Page slug to translate
 */
async function translatePageSections(pageSlug) {
  console.log(`\nðŸš€ Starting translation for page: ${pageSlug}`);
  console.log('==========================================');
  
  try {
    // Initialize translation client
    const translateClient = initializeTranslationClient();
    
    // Fetch English sections
    const sections = await fetchEnglishSections(pageSlug);
    
    if (sections.length === 0) {
      console.log('âš ï¸  No sections to translate');
      return;
    }
    
    // Translate each section
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      console.log(`\nðŸ“‹ Processing section ${i + 1}/${sections.length}: ${section.title}`);
      
      try {
        // Translate the section
        const translatedSection = await translateSection(section, translateClient);
        
        // Save to database
        await saveTranslatedSection(translatedSection);
        
        successCount++;
        
        // Add delay between sections to avoid rate limiting
        if (i < sections.length - 1) {
          console.log('â³ Waiting 2 seconds before next section...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        console.error(`âŒ Failed to process section "${section.title}":`, error.message);
        errorCount++;
        // Continue with other sections
      }
    }
    
    // Display summary
    console.log('\nðŸ“Š Translation Summary');
    console.log('======================');
    console.log(`âœ… Successfully translated: ${successCount} sections`);
    console.log(`âŒ Failed translations: ${errorCount} sections`);
    console.log(`ðŸ“„ Total sections processed: ${sections.length}`);
    
    if (successCount > 0) {
      console.log('\nðŸŽ‰ Translation completed successfully!');
      console.log('ðŸ’¡ Translations are now available in the database');
    }
    
  } catch (error) {
    console.error('\nâŒ Translation process failed:', error.message);
    throw error;
  }
}

/**
 * List available pages for translation
 */
async function listAvailablePages() {
  console.log('\nðŸ“‹ Available Pages for Translation');
  console.log('==================================');
  
  try {
    const pages = await Page.find({ 
      isActive: true,
      language: 'en'
    }).select('title slug sectionsCount').sort({ title: 1 });
    
    if (pages.length === 0) {
      console.log('âš ï¸  No English pages found');
      return;
    }
    
    pages.forEach((page, index) => {
      console.log(`  ${index + 1}. ${page.title} (${page.slug}) - ${page.sectionsCount} sections`);
    });
    
    console.log(`\nâœ… Found ${pages.length} pages available for translation`);
    
  } catch (error) {
    console.error('âŒ Error listing pages:', error.message);
    throw error;
  }
}

/**
 * Check translation status for a page
 * @param {string} pageSlug - Page slug to check
 */
async function checkTranslationStatus(pageSlug) {
  console.log(`\nðŸ” Translation Status for Page: ${pageSlug}`);
  console.log('==========================================');
  
  try {
    const sections = await Section.find({
      page: pageSlug,
      language: 'en',
      isActive: true
    }).sort({ pageNumber: 1 });
    
    if (sections.length === 0) {
      console.log('âš ï¸  No English sections found for this page');
      return;
    }
    
    console.log(`\nðŸ“Š Translation Status:`);
    console.log(`Total sections: ${sections.length}`);
    
    const statusCounts = {
      fullyTranslated: 0,
      partiallyTranslated: 0,
      notTranslated: 0
    };
    
    sections.forEach((section, index) => {
      const translationCount = Object.keys(section.translations || {}).length;
      const expectedCount = TARGET_LANGUAGES.length;
      
      let status;
      if (translationCount === expectedCount) {
        status = 'âœ… Fully translated';
        statusCounts.fullyTranslated++;
      } else if (translationCount > 0) {
        status = 'âš ï¸  Partially translated';
        statusCounts.partiallyTranslated++;
      } else {
        status = 'âŒ Not translated';
        statusCounts.notTranslated++;
      }
      
      console.log(`  ${index + 1}. ${section.title} - ${status} (${translationCount}/${expectedCount})`);
    });
    
    console.log(`\nðŸ“ˆ Summary:`);
    console.log(`  âœ… Fully translated: ${statusCounts.fullyTranslated}`);
    console.log(`  âš ï¸  Partially translated: ${statusCounts.partiallyTranslated}`);
    console.log(`  âŒ Not translated: ${statusCounts.notTranslated}`);
    
  } catch (error) {
    console.error('âŒ Error checking translation status:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    // Connect to database
    await connectDB();
    
    switch (command) {
      case 'translate':
        const pageSlug = args[1];
        if (!pageSlug) {
          console.error('âŒ Please provide page slug. Usage: node translate-page-sections.js translate <page-slug>');
          process.exit(1);
        }
        await translatePageSections(pageSlug);
        break;
        
      case 'list':
        await listAvailablePages();
        break;
        
      case 'status':
        const statusPageSlug = args[1];
        if (!statusPageSlug) {
          console.error('âŒ Please provide page slug. Usage: node translate-page-sections.js status <page-slug>');
          process.exit(1);
        }
        await checkTranslationStatus(statusPageSlug);
        break;
        
      default:
        console.log('ðŸš€ Page Section Translation Script');
        console.log('==================================');
        console.log('\nUsage:');
        console.log('  node translate-page-sections.js translate <page-slug>  # Translate sections for a page');
        console.log('  node translate-page-sections.js list                   # List available pages');
        console.log('  node translate-page-sections.js status <page-slug>     # Check translation status');
        console.log('\nExamples:');
        console.log('  node translate-page-sections.js translate testing');
        console.log('  node translate-page-sections.js translate inspection');
        console.log('  node translate-page-sections.js list');
        console.log('  node translate-page-sections.js status testing');
        console.log('\nTarget Languages: fr, pt, es, ru');
        break;
    }
    
  } catch (error) {
    console.error('\nâŒ Script failed:', error.message);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('\nðŸ”Œ Database connection closed');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  translatePageSections,
  listAvailablePages,
  checkTranslationStatus,
  fetchEnglishSections,
  translateSection,
  saveTranslatedSection
};

