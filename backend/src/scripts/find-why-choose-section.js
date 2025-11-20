'use strict';

require('dotenv').config();
const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { logger } = require('../setup/logger');

async function findWhyChooseSection() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    // Search for sections with "Why Choose" in title or bodyText
    const sections = await Section.find({ 
      page: 'about',
      $or: [
        { title: { $regex: /why choose/i } },
        { bodyText: { $regex: /why choose/i } }
      ]
    });

    logger.info(`📝 Found ${sections.length} section(s) with "Why Choose"`);

    for (const section of sections) {
      logger.info(`\nSection ID: ${section._id}`);
      logger.info(`Section ID (string): ${section.sectionId}`);
      logger.info(`Title: ${section.title}`);
      logger.info(`Language: ${section.language}`);
      logger.info(`BodyText preview: ${section.bodyText?.substring(0, 200)}...`);
      
      // Check for "18 Years of" in bodyText
      if (section.bodyText && section.bodyText.includes('18 Years of')) {
        logger.info('✅ Contains "18 Years of" in bodyText');
      }
    }

    // Also search all about sections
    const allAboutSections = await Section.find({ page: 'about' });
    logger.info(`\n📝 Total About sections: ${allAboutSections.length}`);
    
    for (const section of allAboutSections) {
      if (section.bodyText && (section.bodyText.includes('18 Years of') || section.bodyText.includes('18 years of'))) {
        logger.info(`\nFound "18 Years of" in section:`);
        logger.info(`Section ID: ${section._id}`);
        logger.info(`Section ID (string): ${section.sectionId}`);
        logger.info(`Title: ${section.title}`);
        logger.info(`Language: ${section.language}`);
        logger.info(`BodyText snippet: ${section.bodyText.substring(0, 300)}...`);
      }
    }

    process.exit(0);
  } catch (error) {
    logger.error('❌ Search failed:', error.message);
    logger.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  findWhyChooseSection();
}

module.exports = { findWhyChooseSection };

