'use strict';

const express = require('express');
const router = express.Router();
const ClientImage = require('../models/ClientImage');

// GET /api/clients/images
router.get('/clients/images', async (req, res) => {
  try {
    const images = await ClientImage.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: images });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;


