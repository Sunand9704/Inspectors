'use strict';

require('dotenv').config();
const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');

const SupportedLanguages = ['en', 'fr', 'pt', 'es', 'ru', 'zh'];

/**
 * Remove "18 Years of" from the "Why Choose Inspectors" section
 * Updates all language versions
 */
async function updateWhyChooseSection() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    // Find the About page main section
    const page = 'about';

    // Get all sections for the About page
    const sections = await Section.find({ page });

    if (sections.length === 0) {
      logger.error(`❌ No sections found for page: ${page}`);
      process.exit(1);
    }

    logger.info(`📝 Found ${sections.length} section(s) to update`);

    let updatedCount = 0;

    for (const section of sections) {
      let updated = false;
      const originalBodyText = section.bodyText;

      // Update the main bodyText (for the section's language)
      if (section.bodyText && section.bodyText.includes('18 Years of')) {
        section.bodyText = section.bodyText.replace(/18 Years of\s+/gi, '');
        updated = true;
        logger.info(`✅ Updated bodyText for language: ${section.language || 'en'}`);
      }

      // Update translations
      if (section.translations && section.translations instanceof Map) {
        for (const lang of SupportedLanguages) {
          const translation = section.translations.get(lang);
          if (translation && translation.bodyText) {
            const original = translation.bodyText;
            let modified = translation.bodyText;
            
            // Remove various language versions of "18 Years of" and variations
            // English: "18 Years of", "18 years of", "18 Years Of"
            modified = modified.replace(/18\s*Years?\s+of\s+/gi, '');
            modified = modified.replace(/18\s*years?\s+of\s+/gi, '');
            
            // French: "18 ans d'expérience", "18 ans de", "18 ans d'", "18 années de"
            // Replace "18 ans d'expérience" with "Expérience" to keep the sentence intact
            modified = modified.replace(/18\s*ans?\s+d'expérience\s+/gi, 'Expérience ');
            modified = modified.replace(/18\s*ans?\s+(de|d')\s+/gi, '');
            modified = modified.replace(/18\s*années?\s+(de|d')\s+/gi, '');
            
            // Portuguese: "18 anos de"
            modified = modified.replace(/18\s*anos?\s+de\s+/gi, '');
            
            // Spanish: "18 años de"
            modified = modified.replace(/18\s*años?\s+de\s+/gi, '');
            
            // Russian: "18-летний", "18 лет", "18 года", "18 годов"
            modified = modified.replace(/18\s*[-–]\s*летний\s+/gi, '');
            modified = modified.replace(/18\s*летний\s+/gi, '');
            modified = modified.replace(/18\s*лет\s+/gi, '');
            modified = modified.replace(/18\s*года?\s+/gi, '');
            modified = modified.replace(/18\s*годов?\s+/gi, '');
            
            // Chinese: "18年", "18 年"
            modified = modified.replace(/18\s*年\s*/gi, '');
            modified = modified.replace(/18\s*年/g, '');
            
            if (modified !== original) {
              translation.bodyText = modified;
              section.translations.set(lang, translation);
              updated = true;
              logger.info(`✅ Updated translation for language: ${lang}`);
            }
          }
        }
      }

      if (updated) {
        await section.save();
        updatedCount++;
        logger.info(`💾 Saved section: ${section.title || sectionId}`);
      } else {
        logger.info(`⏭️  No changes needed for section: ${section.title || sectionId}`);
      }
    }

    // Also search for any bullet points with "18 Years of" in the bodyText
    const allAboutSections = await Section.find({ page: 'about' });
    
    for (const section of allAboutSections) {
      let updated = false;
      
      // Check main bodyText
      if (section.bodyText) {
        const newBodyText = section.bodyText.replace(/•\s*18 Years of\s+/gi, '• ');
        if (newBodyText !== section.bodyText) {
          section.bodyText = newBodyText;
          updated = true;
        }
        
        // Also handle other bullet formats
        section.bodyText = section.bodyText
          .replace(/-\s*18 Years of\s+/gi, '- ')
          .replace(/\*\s*18 Years of\s+/gi, '* ')
          .replace(/18 Years of\s+/gi, '');
      }

      // Check translations
      if (section.translations && section.translations instanceof Map) {
        for (const lang of SupportedLanguages) {
          const translation = section.translations.get(lang);
          if (translation && translation.bodyText) {
            const original = translation.bodyText;
            let modified = translation.bodyText;
            
            // Remove with bullet points and various formats
            // English
            modified = modified.replace(/[•\-\*]\s*18\s*Years?\s+of\s+/gi, (match) => match.replace(/18\s*Years?\s+of\s+/gi, ''));
            modified = modified.replace(/18\s*Years?\s+of\s+/gi, '');
            modified = modified.replace(/18\s*years?\s+of\s+/gi, '');
            
            // French
            // Replace "18 ans d'expérience" with "Expérience" to keep the sentence intact
            modified = modified.replace(/[•\-\*]\s*18\s*ans?\s+d'expérience\s+/gi, (match) => match.replace(/18\s*ans?\s+d'expérience\s+/gi, 'Expérience '));
            modified = modified.replace(/18\s*ans?\s+d'expérience\s+/gi, 'Expérience ');
            modified = modified.replace(/[•\-\*]\s*18\s*ans?\s+(de|d')\s+/gi, (match) => match.replace(/18\s*ans?\s+(de|d')\s+/gi, ''));
            modified = modified.replace(/18\s*ans?\s+(de|d')\s+/gi, '');
            modified = modified.replace(/18\s*années?\s+(de|d')\s+/gi, '');
            
            // Portuguese
            modified = modified.replace(/[•\-\*]\s*18\s*anos?\s+de\s+/gi, (match) => match.replace(/18\s*anos?\s+de\s+/gi, ''));
            modified = modified.replace(/18\s*anos?\s+de\s+/gi, '');
            
            // Spanish
            modified = modified.replace(/[•\-\*]\s*18\s*años?\s+de\s+/gi, (match) => match.replace(/18\s*años?\s+de\s+/gi, ''));
            modified = modified.replace(/18\s*años?\s+de\s+/gi, '');
            
            // Russian
            modified = modified.replace(/[•\-\*]\s*18\s*[-–]\s*летний\s+/gi, (match) => match.replace(/18\s*[-–]\s*летний\s+/gi, ''));
            modified = modified.replace(/18\s*[-–]\s*летний\s+/gi, '');
            modified = modified.replace(/18\s*летний\s+/gi, '');
            modified = modified.replace(/[•\-\*]\s*18\s*лет\s+/gi, (match) => match.replace(/18\s*лет\s+/gi, ''));
            modified = modified.replace(/18\s*лет\s+/gi, '');
            modified = modified.replace(/18\s*года?\s+/gi, '');
            modified = modified.replace(/18\s*годов?\s+/gi, '');
            
            // Chinese
            modified = modified.replace(/[•\-\*]\s*18\s*年\s*/gi, (match) => match.replace(/18\s*年\s*/gi, ''));
            modified = modified.replace(/18\s*年\s*/gi, '');
            modified = modified.replace(/18\s*年/g, '');
            
            if (modified !== original) {
              translation.bodyText = modified;
              section.translations.set(lang, translation);
              updated = true;
              logger.info(`✅ Updated translation for language: ${lang} (second pass)`);
            }
          }
        }
      }

      if (updated) {
        await section.save();
        updatedCount++;
        logger.info(`💾 Updated section: ${section.title || section.sectionId || 'unknown'}`);
      }
    }

    logger.info(`🎉 Update complete! Updated ${updatedCount} section(s)`);
    process.exit(0);
  } catch (error) {
    logger.error('❌ Update failed:', error.message);
    logger.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  logger.info('🔄 Updating "Why Choose Inspectors" section...');
  updateWhyChooseSection();
}

module.exports = { updateWhyChooseSection };

