'use strict';

const mongoose = require('mongoose');

const ClientImageSchema = new mongoose.Schema(
  {
    fileName: { type: String, trim: true },
    url: { type: String, required: true, trim: true, index: true },
    public_id: { type: String, trim: true, index: true },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    size: { type: Number },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

ClientImageSchema.index({ isActive: 1 });

module.exports = mongoose.model('ClientImage', ClientImageSchema);


