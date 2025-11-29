'use strict';

const express = require('express');
const multer = require('multer');
const { ApiError } = require('../utils/error');
const emailService = require('../services/email');

const router = express.Router();

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(400, 'Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG files are allowed.'));
    }
  }
});

// POST /api/verify-documents - send document verification request with attachments
router.post('/verify-documents', upload.array('documents', 5), async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      location,
      company,
      jobTitle,
      comments
    } = req.body || {};

    // Validate required fields
    if (!firstName || !lastName || !email || !location) {
      throw new ApiError(400, 'firstName, lastName, email, and location are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, 'Invalid email format');
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, 'At least one document file is required');
    }

    // Prepare file data for email service
    const files = req.files.map(file => ({
      filename: file.originalname,
      buffer: file.buffer
    }));

    // Send email with attachments
    await emailService.sendDocumentVerification({
      firstName,
      lastName,
      email,
      location,
      company: company || undefined,
      jobTitle: jobTitle || undefined,
      comments: comments || undefined
    }, files);

    res.status(200).json({ 
      success: true, 
      message: 'Document verification request sent successfully',
      filesCount: files.length
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
