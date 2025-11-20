'use strict';

require('dotenv').config();
const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');

async function showTranslations() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    const sections = await Section.find({ page: 'about' });

    for (const section of sections) {
      logger.info(`\n=== Section: ${section.title || section.sectionId} ===`);
      
      // Check translations
      if (section.translations && section.translations instanceof Map) {
        for (const [lang, translation] of section.translations.entries()) {
          if (translation && translation.bodyText) {
            logger.info(`\n--- ${lang.toUpperCase()} Translation ---`);
            
            // Find lines with "18" or year-related text
            const lines = translation.bodyText.split('\n');
            const relevantLines = lines.filter(line => 
              line.includes('18') || 
              line.toLowerCase().includes('ans') ||
              line.toLowerCase().includes('лет') ||
              line.toLowerCase().includes('année') ||
              line.toLowerCase().includes('années') ||
              line.toLowerCase().includes('года') ||
              line.toLowerCase().includes('годов') ||
              line.toLowerCase().includes('experience') ||
              line.toLowerCase().includes('опыт') ||
              line.toLowerCase().includes('expérience')
            );
            
            if (relevantLines.length > 0) {
              logger.info('Relevant lines:');
              relevantLines.forEach((line, idx) => {
                logger.info(`  ${idx + 1}. ${line.trim()}`);
              });
            } else {
              logger.info('No relevant lines found with "18" or year-related text');
            }
            
            // Show full bodyText for French and Russian
            if (lang === 'fr' || lang === 'ru') {
              logger.info(`\nFull ${lang.toUpperCase()} bodyText:`);
              logger.info(translation.bodyText);
            }
          }
        }
      }
    }

    logger.info('\n✅ Check complete!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Check failed:', error.message);
    logger.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  showTranslations();
}

module.exports = { showTranslations };

