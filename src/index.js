/**
 * DevOps Portfolio API - Main Entry Point
 * This application demonstrates DevOps best practices including:
 * - RESTful API design
 * - Docker containerization
 * - CI/CD with GitHub Actions
 * - Logging and monitoring
 * - Error handling
 * - Configuration management
 */

const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const PORT = config.port || 3000;

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = () => {
  logger.info('Received shutdown signal. Closing server gracefully...');
  server.close(() => {
    logger.info('Server closed. Exiting process.');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 DevOps Portfolio API running on port ${PORT}`);
  logger.info(`Environment: ${config.env}`);
  logger.info(`API Health: http://localhost:${PORT}/api/health`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = server;
