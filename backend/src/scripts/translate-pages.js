/**
 * Production Translation Script for Pages
 * 
 * This script translates English pages (title and description) to 4 languages (fr, pt, es, ru)
 * and saves them in the translations Map object of each page.
 * 
 * Usage:
 * node src/scripts/translate-pages.js <command> [page-slug]
 * 
 * Commands:
 * - translate <page-slug>  # Translate specific page
 * - translate-all          # Translate all English pages
 * - list                   # List available pages
 * - status <page-slug>     # Check translation status for a page
 * - status-all             # Check translation status for all pages
 * 
 * Examples:
 * node src/scripts/translate-pages.js translate testing
 * node src/scripts/translate-pages.js translate-all
 * node src/scripts/translate-pages.js list
 * node src/scripts/translate-pages.js status testing
 */

const mongoose = require('mongoose');
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// Import models
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
 * Fetch all English pages
 * @returns {Promise<Array>} - Array of English pages
 */
async function fetchEnglishPages() {
  try {
    console.log('\nðŸ“‹ Fetching English pages');
    
    const pages = await Page.find({
      language: 'en',
      isActive: true
    }).sort({ pageNumber: 1, title: 1 });
    
    console.log(`âœ… Found ${pages.length} English pages`);
    
    if (pages.length === 0) {
      console.log('âš ï¸  No English pages found');
      return [];
    }
    
    // Display pages
    pages.forEach((page, index) => {
      console.log(`  ${index + 1}. ${page.title} (${page.slug})`);
    });
    
    return pages;
  } catch (error) {
    console.error('âŒ Error fetching pages:', error.message);
    throw error;
  }
}

/**
 * Fetch a specific English page by slug
 * @param {string} pageSlug - Page slug to fetch
 * @returns {Promise<Object>} - English page object
 */
async function fetchEnglishPage(pageSlug) {
  try {
    console.log(`\nðŸ“‹ Fetching English page: ${pageSlug}`);
    
    const page = await Page.findOne({
      slug: pageSlug,
      language: 'en',
      isActive: true
    });
    
    if (!page) {
      console.log('âš ï¸  No English page found with this slug');
      return null;
    }
    
    console.log(`âœ… Found page: ${page.title}`);
    return page;
  } catch (error) {
    console.error('âŒ Error fetching page:', error.message);
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
    if (!text || text.trim() === '') {
      return '';
    }
    
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
 * Translate a single page to all target languages
 * @param {Object} page - Page object from database
 * @param {Object} translateClient - Google Cloud Translation client
 * @returns {Promise<Object>} - Updated page with translations
 */
async function translatePage(page, translateClient) {
  try {
    console.log(`\nðŸ”„ Translating page: "${page.title}"`);
    
    const translations = {};
    
    // Translate to each target language
    for (const lang of TARGET_LANGUAGES) {
      console.log(`   ðŸ“ Translating to ${lang.toUpperCase()}...`);
      
      try {
        // Translate title and description
        const [translatedTitle, translatedDescription] = await Promise.all([
          translateText(translateClient, page.title, lang),
          translateText(translateClient, page.description || '', lang)
        ]);
        
        translations[lang] = {
          title: translatedTitle,
          description: translatedDescription
        };
        
        console.log(`   âœ… ${lang.toUpperCase()}: "${translatedTitle}"`);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`   âŒ Failed to translate to ${lang}:`, error.message);
        // Continue with other languages
      }
    }
    
    // Update the page with translations
    page.translations = translations;
    
    console.log(`âœ… Completed translations for page: "${page.title}"`);
    return page;
    
  } catch (error) {
    console.error('âŒ Error translating page:', error.message);
    throw error;
  }
}

/**
 * Save translated page to database
 * @param {Object} page - Page with translations
 * @returns {Promise<Object>} - Updated page from database
 */
async function saveTranslatedPage(page) {
  try {
    const updatedPage = await Page.findByIdAndUpdate(
      page._id,
      { 
        translations: page.translations,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    console.log(`ðŸ’¾ Saved translations for page: "${page.title}"`);
    return updatedPage;
    
  } catch (error) {
    console.error('âŒ Error saving page:', error.message);
    throw error;
  }
}

/**
 * Translate all pages
 */
async function translateAllPages() {
  console.log('\nðŸš€ Starting translation for all pages');
  console.log('=====================================');
  
  try {
    // Initialize translation client
    const translateClient = initializeTranslationClient();
    
    // Fetch English pages
    const pages = await fetchEnglishPages();
    
    if (pages.length === 0) {
      console.log('âš ï¸  No pages to translate');
      return;
    }
    
    // Translate each page
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      console.log(`\nðŸ“‹ Processing page ${i + 1}/${pages.length}: ${page.title}`);
      
      try {
        // Translate the page
        const translatedPage = await translatePage(page, translateClient);
        
        // Save to database
        await saveTranslatedPage(translatedPage);
        
        successCount++;
        
        // Add delay between pages to avoid rate limiting
        if (i < pages.length - 1) {
          console.log('â³ Waiting 2 seconds before next page...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        console.error(`âŒ Failed to process page "${page.title}":`, error.message);
        errorCount++;
        // Continue with other pages
      }
    }
    
    // Display summary
    console.log('\nðŸ“Š Translation Summary');
    console.log('======================');
    console.log(`âœ… Successfully translated: ${successCount} pages`);
    console.log(`âŒ Failed translations: ${errorCount} pages`);
    console.log(`ðŸ“„ Total pages processed: ${pages.length}`);
    
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
 * Translate a specific page by slug
 * @param {string} pageSlug - Page slug to translate
 */
async function translatePageBySlug(pageSlug) {
  console.log(`\nðŸš€ Starting translation for page: ${pageSlug}`);
  console.log('==========================================');
  
  try {
    // Initialize translation client
    const translateClient = initializeTranslationClient();
    
    // Fetch English page
    const page = await fetchEnglishPage(pageSlug);
    
    if (!page) {
      console.log('âš ï¸  No page to translate');
      return;
    }
    
    try {
      // Translate the page
      const translatedPage = await translatePage(page, translateClient);
      
      // Save to database
      await saveTranslatedPage(translatedPage);
      
      console.log('\nðŸŽ‰ Translation completed successfully!');
      console.log('ðŸ’¡ Translations are now available in the database');
      
    } catch (error) {
      console.error(`âŒ Failed to process page "${page.title}":`, error.message);
      throw error;
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
    }).select('title slug pageNumber').sort({ pageNumber: 1, title: 1 });
    
    if (pages.length === 0) {
      console.log('âš ï¸  No English pages found');
      return;
    }
    
    pages.forEach((page, index) => {
      console.log(`  ${index + 1}. ${page.title} (${page.slug}) - Page #${page.pageNumber || 'N/A'}`);
    });
    
    console.log(`\nâœ… Found ${pages.length} pages available for translation`);
    
  } catch (error) {
    console.error('âŒ Error listing pages:', error.message);
    throw error;
  }
}

/**
 * Check translation status for a specific page
 * @param {string} pageSlug - Page slug to check
 */
async function checkTranslationStatus(pageSlug) {
  console.log(`\nðŸ” Translation Status for Page: ${pageSlug}`);
  console.log('==========================================');
  
  try {
    const page = await Page.findOne({
      slug: pageSlug,
      language: 'en',
      isActive: true
    });
    
    if (!page) {
      console.log('âš ï¸  No English page found with this slug');
      return;
    }
    
    console.log(`\nðŸ“Š Translation Status for "${page.title}":`);
    
    const translationCount = Object.keys(page.translations || {}).length;
    const expectedCount = TARGET_LANGUAGES.length;
    
    let status;
    if (translationCount === expectedCount) {
      status = 'âœ… Fully translated';
    } else if (translationCount > 0) {
      status = 'âš ï¸  Partially translated';
    } else {
      status = 'âŒ Not translated';
    }
    
    console.log(`Status: ${status} (${translationCount}/${expectedCount})`);
    
    if (translationCount > 0) {
      console.log('\nAvailable translations:');
      Object.keys(page.translations).forEach(lang => {
        const translation = page.translations[lang];
        console.log(`  ${lang.toUpperCase()}: "${translation.title}"`);
      });
    }
    
    const missingLanguages = TARGET_LANGUAGES.filter(lang => !page.translations || !page.translations[lang]);
    if (missingLanguages.length > 0) {
      console.log(`\nMissing translations: ${missingLanguages.join(', ').toUpperCase()}`);
    }
    
  } catch (error) {
    console.error('âŒ Error checking translation status:', error.message);
    throw error;
  }
}

/**
 * Check translation status for all pages
 */
async function checkAllTranslationStatus() {
  console.log('\nðŸ” Translation Status for All Pages');
  console.log('===================================');
  
  try {
    const pages = await Page.find({
      language: 'en',
      isActive: true
    }).sort({ pageNumber: 1, title: 1 });
    
    if (pages.length === 0) {
      console.log('âš ï¸  No English pages found');
      return;
    }
    
    console.log(`\nðŸ“Š Translation Status:`);
    console.log(`Total pages: ${pages.length}`);
    
    const statusCounts = {
      fullyTranslated: 0,
      partiallyTranslated: 0,
      notTranslated: 0
    };
    
    pages.forEach((page, index) => {
      const translationCount = Object.keys(page.translations || {}).length;
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
      
      console.log(`  ${index + 1}. ${page.title} (${page.slug}) - ${status} (${translationCount}/${expectedCount})`);
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
          console.error('âŒ Please provide page slug. Usage: node translate-pages.js translate <page-slug>');
          process.exit(1);
        }
        await translatePageBySlug(pageSlug);
        break;
        
      case 'translate-all':
        await translateAllPages();
        break;
        
      case 'list':
        await listAvailablePages();
        break;
        
      case 'status':
        const statusPageSlug = args[1];
        if (!statusPageSlug) {
          console.error('âŒ Please provide page slug. Usage: node translate-pages.js status <page-slug>');
          process.exit(1);
        }
        await checkTranslationStatus(statusPageSlug);
        break;
        
      case 'status-all':
        await checkAllTranslationStatus();
        break;
        
      default:
        console.log('ðŸš€ Page Translation Script');
        console.log('==========================');
        console.log('\nUsage:');
        console.log('  node translate-pages.js translate <page-slug>    # Translate specific page');
        console.log('  node translate-pages.js translate-all            # Translate all pages');
        console.log('  node translate-pages.js list                     # List available pages');
        console.log('  node translate-pages.js status <page-slug>       # Check translation status for a page');
        console.log('  node translate-pages.js status-all               # Check translation status for all pages');
        console.log('\nExamples:');
        console.log('  node translate-pages.js translate testing');
        console.log('  node translate-pages.js translate-all');
        console.log('  node translate-pages.js list');
        console.log('  node translate-pages.js status testing');
        console.log('  node translate-pages.js status-all');
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
  translateAllPages,
  translatePageBySlug,
  listAvailablePages,
  checkTranslationStatus,
  checkAllTranslationStatus,
  fetchEnglishPages,
  fetchEnglishPage,
  translatePage,
  saveTranslatedPage
};


















