'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { notFoundHandler, errorHandler } = require('../utils/error');
const { uploadsDir } = require('../utils/paths');
const sectionRoutes = require('../routes/section.routes');
const pageRoutes = require('../routes/page.routes');
const translateRoutes = require('../routes/translate.routes');
const imageRoutes = require('../routes/image.routes');
const careerRoutes = require('../routes/career.routes');
const contactRoutes = require('../routes/contact.routes');
const inquiryRoutes = require('../routes/inquiry.routes');
const adminAuthRoutes = require('../routes/admin-auth.routes');
const blogRoutes = require('../routes/blog.routes');
const clientRoutes = require('../routes/client.routes');


function createApp() {
  const app = express();

  // Config
  app.set('trust proxy', 1);

  // Global performance middleware
  app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      // eslint-disable-next-line no-console
      console.log(`${req.method} ${req.originalUrl} took ${duration}ms`);
    });
    next();
  });

      const allowedOrigins = [
      "http://localhost:8080",
      "http://localhost:8081",
      "http://localhost:3000",
      "http://localhost:5175",
      "https://inspectors-admin-pannel.onrender.com",
      "https://inspectors-1.onrender.com",
      "https://inspectors360.com",
      "https://www.inspectors360.com",
      "https://admin.inspectors360.com"
    ];
  // Middlewares
  app.use(helmet());
   app.use(compression());
  app.use(express.json({ limit: '100mb' })); // Increased for large PDF uploads
  app.use(express.urlencoded({ extended: true, limit: '100mb' })); // Increased for large file uploads
  app.use(cors({  origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
     console.log("Request Origin:", origin); // DEBUG LOG

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }));
 

  // Logging: METHOD PATH STATUS(response code colored) DURATION
  const colorizeStatus = (status) => {
    if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // red
    if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // yellow
    if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // cyan
    return `\x1b[32m${status}\x1b[0m`; // green
  };
  app.use(morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = Number(tokens.status(req, res)) || 0;
    const time = tokens['response-time'](req, res) || '0.0';
    return `${method} ${url} ${colorizeStatus(status)} ${time} ms`;
  }));

  // Rate limiting basic safe defaults
  const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
  app.use('/api', limiter);

  // Static: serve uploaded files (images, PDFs, and videos)
  app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      // Force download for PDF files
      if (filePath.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
      }
      // Set proper headers for video files
      if (filePath.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      }
    }
  }));

  // Routes
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/api/sections', sectionRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/translate', translateRoutes);
  app.use('/api/images', imageRoutes);
  app.use('/api/careers', careerRoutes);
  app.use('/api/contact-offices', contactRoutes);
  app.use('/api', inquiryRoutes);
  app.use('/api/admin/auth', adminAuthRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api', clientRoutes);


  // 404 and error handler
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };




module.exports = { createApp };


