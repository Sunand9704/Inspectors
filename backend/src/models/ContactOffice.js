'use strict';

const mongoose = require('mongoose');

const ContactOfficeSchema = new mongoose.Schema(
  {
    region_name: { type: String, required: true, index: true },
    region: { type: String, required: true },
    country: { type: String, required: true },
    office_name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    emails: { type: [String], default: [] },
    is_lab_facility: { type: Boolean, default: false },
    notes: { type: String, default: '' },
    image_url: { type: String, default: '' },
    region_order: { type: Number, default: 0, index: true },
    office_order: { type: Number, default: 0, index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactOffice', ContactOfficeSchema);


