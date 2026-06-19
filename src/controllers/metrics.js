/**
 * Metrics Controller
 * Provides application metrics for monitoring
 */

const logger = require('../utils/logger');

let requestCount = 0;
let responseTimes = [];

/**
 * Get all metrics
 */
exports.getAll = (req, res) => {
  logger.info('Fetching application metrics');
  
  const avgResponseTime = responseTimes.length > 0
    ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)
    : 0;
  
  res.json({
    success: true,
    data: {
      requests: {
        total: requestCount,
        averageResponseTime: `${avgResponseTime}ms`
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development'
    }
  });
};

/**
 * Get GitHub-like metrics (mock data for portfolio)
 */
exports.getGitHubMetrics = (req, res) => {
  logger.info('Fetching GitHub metrics');
  
  res.json({
    success: true,
    data: {
      totalCommits: 247,
      totalPRs: 42,
      totalIssues: 15,
      totalRepos: 12,
      contributions: {
        lastYear: {
          total: 156,
          languages: [
            { name: 'JavaScript', percentage: 45 },
            { name: 'Python', percentage: 25 },
            { name: 'YAML', percentage: 15 },
            { name: 'Dockerfile', percentage: 10 },
            { name: 'Other', percentage: 5 }
          ]
        }
      },
      streak: {
        current: 23,
        longest: 45
      },
      badges: [
        { name: 'GitHub Actions', earned: true },
        { name: 'Docker', earned: true },
        { name: 'AWS', earned: true },
        { name: 'Kubernetes', earned: true }
      ]
    }
  });
};

// Middleware to track requests (exported for use in app.js)
exports.trackRequest = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    requestCount++;
    const duration = Date.now() - start;
    responseTimes.push(duration);
    
    // Keep only last 1000 response times
    if (responseTimes.length > 1000) {
      responseTimes = responseTimes.slice(-1000);
    }
  });
  
  next();
};
