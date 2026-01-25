'use strict';

const express = require('express');
const { requestOtp, verifyOtpCode, loginWithPassword } = require('../controllers/adminAuth.controller');

const router = express.Router();

/**
 * @route POST /api/admin/auth/login-password
 */
router.post('/login-password', loginWithPassword);

/**
 * @route POST /api/admin/auth/request-otp
 */
router.post('/request-otp', requestOtp);

/**
 * @route POST /api/admin/auth/verify-otp
 */
router.post('/verify-otp', verifyOtpCode);

module.exports = router;



