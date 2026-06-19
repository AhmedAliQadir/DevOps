/**
 * Health Check Routes
 * Provides endpoints for monitoring and health checks
 */

const express = require('express');
const router = express.Router();
const os = require('os');

// Basic health check
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'devops-portfolio-api'
  });
});

// Detailed health check with system metrics
router.get('/detailed', (req, res) => {
  const memUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'devops-portfolio-api',
    system: {
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      loadAverage: os.loadavg()
    },
    process: {
      pid: process.pid,
      nodeVersion: process.version,
      memory: {
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`
      },
      uptime: process.uptime()
    }
  });
});

// Liveness probe for Kubernetes
router.get('/live', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

// Readiness probe for Kubernetes
router.get('/ready', (req, res) => {
  // Add readiness checks here (e.g., database connection)
  res.status(200).json({ status: 'ready' });
});

module.exports = router;
