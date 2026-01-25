'use strict';

const { logger } = require('../setup/logger');
const { sendOtp, verifyOtp } = require('../services/otp');

async function requestOtp(req, res) {
	try {
		const email = process.env.ADMIN_EMAIL;
		if (!email) return res.status(500).json({ success: false, message: 'ADMIN_EMAIL is not configured' });
		await sendOtp(email);
		return res.json({ success: true, message: 'OTP sent', data: { email } });
	} catch (error) {
		logger.error('requestOtp error:', error);
		return res.status(500).json({ success: false, message: 'Failed to send OTP' });
	}
}

async function verifyOtpCode(req, res) {
	try {
		const { code } = req.body;
		const email = process.env.ADMIN_EMAIL;
		if (!email) return res.status(500).json({ success: false, message: 'ADMIN_EMAIL is not configured' });
		if (!code) return res.status(400).json({ success: false, message: 'Code is required' });
		const result = verifyOtp(email, code);
		if (!result.success) return res.status(400).json({ success: false, message: result.message });
		// Issue a simple stateless token (for demo). Consider JWT in production.
		const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
		return res.json({ success: true, data: { token } });
	} catch (error) {
		logger.error('verifyOtpCode error:', error);
		return res.status(500).json({ success: false, message: 'Verification failed' });
	}
}

async function loginWithPassword(req, res) {
	try {
		const { email, password } = req.body;
		const adminEmail = process.env.ADMIN_EMAIL;
		const adminPassword = process.env.ADMIN_PASSWORD;

		if (!adminEmail || !adminPassword) {
			return res.status(500).json({ success: false, message: 'Admin credentials not configured' });
		}

		if (email !== adminEmail || password !== adminPassword) {
			return res.status(401).json({ success: false, message: 'Invalid credentials' });
		}

		// Issue a simple stateless token (consistent with OTP login)
		const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
		return res.json({ success: true, data: { token } });
	} catch (error) {
		logger.error('loginWithPassword error:', error);
		return res.status(500).json({ success: false, message: 'Login failed' });
	}
}

module.exports = { requestOtp, verifyOtpCode, loginWithPassword };



