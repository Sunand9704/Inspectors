'use strict';

require('dotenv').config();
const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');

async function checkTranslations() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    const sections = await Section.find({ page: 'about' });

    for (const section of sections) {
      logger.info(`\n=== Section: ${section.title || section.sectionId} ===`);
      logger.info(`Language: ${section.language || 'en'}`);
      
      // Check main bodyText
      if (section.bodyText) {
        const has18Years = section.bodyText.includes('18 Years of') || 
                          section.bodyText.includes('18 ans de') ||
                          section.bodyText.includes('18 anos de') ||
                          section.bodyText.includes('18 años de') ||
                          section.bodyText.includes('18 лет') ||
                          section.bodyText.includes('18年');
        
        if (has18Years) {
          logger.info('⚠️  Main bodyText contains "18 Years of" variant');
          // Show snippet
          const lines = section.bodyText.split('\n');
          const relevantLine = lines.find(line => 
            line.includes('18 Years of') || 
            line.includes('18 ans de') ||
            line.includes('18 anos de') ||
            line.includes('18 años de') ||
            line.includes('18 лет') ||
            line.includes('18年')
          );
          if (relevantLine) {
            logger.info(`   Line: ${relevantLine.trim()}`);
          }
        }
      }

      // Check translations
      if (section.translations && section.translations instanceof Map) {
        for (const [lang, translation] of section.translations.entries()) {
          if (translation && translation.bodyText) {
            const has18Years = translation.bodyText.includes('18 Years of') || 
                              translation.bodyText.includes('18 ans de') ||
                              translation.bodyText.includes('18 anos de') ||
                              translation.bodyText.includes('18 años de') ||
                              translation.bodyText.includes('18 лет') ||
                              translation.bodyText.includes('18年');
            
            if (has18Years) {
              logger.info(`⚠️  ${lang} translation contains "18 Years of" variant`);
              // Show snippet
              const lines = translation.bodyText.split('\n');
              const relevantLine = lines.find(line => 
                line.includes('18 Years of') || 
                line.includes('18 ans de') ||
                line.includes('18 anos de') ||
                line.includes('18 años de') ||
                line.includes('18 лет') ||
                line.includes('18年')
              );
              if (relevantLine) {
                logger.info(`   Line: ${relevantLine.trim()}`);
              }
            } else {
              logger.info(`✅ ${lang} translation looks good`);
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
  checkTranslations();
}

module.exports = { checkTranslations };

