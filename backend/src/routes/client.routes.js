'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const ClientImage = require('../models/ClientImage');
const cloudinaryService = require('../services/cloudinary');
const { logger } = require('../setup/logger');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// GET /api/clients/images
router.get('/clients/images', async (req, res) => {
  try {
    const images = await ClientImage.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: images });
  } catch (err) {
    logger.error('Error fetching client images:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/clients/images - Upload new client image
router.post('/clients/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }

    const { fileName } = req.body;
    
    // Upload to Cloudinary
    const uploadResult = await cloudinaryService.uploadFromBuffer(req.file.buffer, {
      folder: 'INSPECTORS/clients',
      tags: ['clients', 'INSPECTORS'],
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    // Save to database
    const clientImage = new ClientImage({
      fileName: fileName || req.file.originalname,
      url: uploadResult.url,
      public_id: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      size: uploadResult.size,
      tags: ['clients', 'INSPECTORS'],
      isActive: true
    });

    await clientImage.save();

    logger.info(`Client image uploaded successfully: ${uploadResult.url}`);
    res.json({ 
      success: true, 
      message: 'Image uploaded successfully',
      data: clientImage 
    });

  } catch (err) {
    logger.error('Error uploading client image:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/clients/images/:id - Delete client image
router.delete('/clients/images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the image in database
    const clientImage = await ClientImage.findById(id);
    if (!clientImage) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    // Delete from Cloudinary
    if (clientImage.public_id) {
      try {
        await cloudinaryService.deleteImage(clientImage.public_id);
        logger.info(`Image deleted from Cloudinary: ${clientImage.public_id}`);
      } catch (cloudinaryErr) {
        logger.warn(`Failed to delete from Cloudinary: ${cloudinaryErr.message}`);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }

    // Delete from database
    await ClientImage.findByIdAndDelete(id);

    logger.info(`Client image deleted successfully: ${clientImage._id}`);
    res.json({ 
      success: true, 
      message: 'Image deleted successfully' 
    });

  } catch (err) {
    logger.error('Error deleting client image:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;



