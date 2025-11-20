'use strict';

require('dotenv').config();
const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');

const SupportedLanguages = ['en', 'fr', 'pt', 'es', 'ru', 'zh'];

async function verifyUpdate() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    const sections = await Section.find({ page: 'about' });

    for (const section of sections) {
      logger.info(`\n=== Section: ${section.title || section.sectionId} ===`);
      logger.info(`Language: ${section.language || 'en'}`);
      
      // Check main bodyText
      if (section.bodyText) {
        if (section.bodyText.includes('18 Years of') || section.bodyText.includes('18 years of')) {
          logger.error('❌ Still contains "18 Years of" in bodyText');
        } else if (section.bodyText.includes('Global Experience in inspection workforce')) {
          logger.info('✅ Contains "Global Experience in inspection workforce" (without "18 Years of")');
          // Show the line
          const lines = section.bodyText.split('\n');
          const relevantLine = lines.find(line => line.includes('Global Experience'));
          if (relevantLine) {
            logger.info(`   Line: ${relevantLine.trim()}`);
          }
        }
      }

      // Check translations
      if (section.translations && section.translations instanceof Map) {
        for (const lang of SupportedLanguages) {
          const translation = section.translations.get(lang);
          if (translation && translation.bodyText) {
            if (translation.bodyText.includes('18 Years of') || translation.bodyText.includes('18 ans de') || 
                translation.bodyText.includes('18 anos de') || translation.bodyText.includes('18 años de') ||
                translation.bodyText.includes('18 лет') || translation.bodyText.includes('18年')) {
              logger.error(`❌ Still contains "18 Years of" in ${lang} translation`);
            } else if (translation.bodyText.includes('Global Experience') || 
                       translation.bodyText.includes('Expérience mondiale') ||
                       translation.bodyText.includes('Experiência Global') ||
                       translation.bodyText.includes('Experiencia Global') ||
                       translation.bodyText.includes('Глобальный опыт') ||
                       translation.bodyText.includes('全球经验')) {
              logger.info(`✅ ${lang} translation looks good`);
            }
          }
        }
      }
    }

    logger.info('\n✅ Verification complete!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Verification failed:', error.message);
    logger.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  verifyUpdate();
}

module.exports = { verifyUpdate };

