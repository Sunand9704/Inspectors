'use strict';

require('dotenv').config();
const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');

async function fixFrenchRussian() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    const sections = await Section.find({ page: 'about' });

    for (const section of sections) {
      let updated = false;

      // Fix French translation
      if (section.translations && section.translations instanceof Map) {
        const frTranslation = section.translations.get('fr');
        if (frTranslation && frTranslation.bodyText) {
          const original = frTranslation.bodyText;
          let modified = original;
          
          // Fix broken French text: "- internationale dans" -> "- Expérience internationale dans"
          modified = modified.replace(/-\s*internationale\s+dans\s+les\s+solutions/gi, '- Expérience internationale dans les solutions');
          
          if (modified !== original) {
            frTranslation.bodyText = modified;
            section.translations.set('fr', frTranslation);
            updated = true;
            logger.info('✅ Fixed French translation');
          }
        }

        // Verify Russian is correct (it should already be fine)
        const ruTranslation = section.translations.get('ru');
        if (ruTranslation && ruTranslation.bodyText) {
          // Check if it still has "18-летний" or "18 летний"
          if (ruTranslation.bodyText.includes('18-летний') || ruTranslation.bodyText.includes('18 летний')) {
            const original = ruTranslation.bodyText;
            let modified = original;
            modified = modified.replace(/18\s*[-–]\s*летний\s+/gi, '');
            modified = modified.replace(/18\s*летний\s+/gi, '');
            
            if (modified !== original) {
              ruTranslation.bodyText = modified;
              section.translations.set('ru', ruTranslation);
              updated = true;
              logger.info('✅ Fixed Russian translation');
            }
          }
        }
      }

      if (updated) {
        await section.save();
        logger.info('💾 Saved section updates');
      }
    }

    logger.info('🎉 Fix complete!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Fix failed:', error.message);
    logger.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  fixFrenchRussian();
}

module.exports = { fixFrenchRussian };

