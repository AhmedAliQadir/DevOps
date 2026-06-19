/**
 * Application Configuration
 * Uses environment variables with fallback defaults
 */

require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  
  // Logging configuration
  log: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json'
  },
  
  // API configuration
  api: {
    prefix: '/api',
    version: 'v1'
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  }
};
