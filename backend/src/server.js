'use strict';

const http = require('http');
const { connectToDatabase } = require('./setup/database');
const { createApp } = require('./setup/app');
const { logger } = require('./setup/logger');

const PORT = Number(process.env.PORT) || 8000;

async function start() {
  await connectToDatabase();
  const app = createApp();
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