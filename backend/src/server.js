'use strict';

const http = require('http');
const cors = require('cors');
const { connectToDatabase } = require('./setup/database');
const { createApp } = require('./setup/app');
const { logger } = require('./setup/logger');

const PORT = Number(process.env.PORT) || 8000;

async function start() {
  await connectToDatabase();
  const app = createApp();
  
  // Simple CORS configuration - allow admin panel and frontend
  app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:8080',
      'https://inspectors.onrender.com',
      'https://inspectors-admin-pannel.onrender.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));
  
  const server = http.createServer(app);
  server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE') {
      logger.error(`Port ${PORT} is already in use. Set a different PORT or free the port.`);
      process.exit(1);
    }
    throw error;
  });
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
  process.on('SIGINT', () => {
    logger.warn('Received SIGINT. Shutting down...');
    server.close(() => process.exit(0));
  });
  process.on('SIGTERM', () => {
    logger.warn('Received SIGTERM. Shutting down...');
    server.close(() => process.exit(0));
  });
}
start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error:', error);
  process.exit(1);
});