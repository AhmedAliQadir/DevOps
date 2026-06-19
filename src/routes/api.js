/**
 * API Routes
 * Main API endpoints for the DevOps portfolio
 */

const express = require('express');
const router = express.Router();

// Import controllers
const projectsController = require('../controllers/projects');
const skillsController = require('../controllers/skills');
const metricsController = require('../controllers/metrics');

// Projects endpoints
router.get('/projects', projectsController.getAll);
router.get('/projects/:id', projectsController.getById);
router.post('/projects', projectsController.create);
router.put('/projects/:id', projectsController.update);
router.delete('/projects/:id', projectsController.delete);

// Skills endpoints
router.get('/skills', skillsController.getAll);
router.get('/skills/categories', skillsController.getCategories);

// Metrics endpoints
router.get('/metrics', metricsController.getAll);
router.get('/metrics/github', metricsController.getGitHubMetrics);

// DevOps info endpoint
router.get('/devops', (req, res) => {
  res.json({
    name: 'DevOps Portfolio API',
    version: '1.0.0',
    description: 'A demonstration of DevOps skills and practices',
    devopsFeatures: [
      'RESTful API with Express.js',
      'Docker containerization',
      'GitHub Actions CI/CD',
      'Kubernetes deployment configs',
      'Infrastructure as Code examples',
      'Comprehensive logging with Winston',
      'Health checks and monitoring',
      'Error handling and validation',
      'Environment-based configuration'
    ],
    technologies: {
      containerization: 'Docker',
      ciCd: 'GitHub Actions',
      orchestration: 'Kubernetes',
      iac: 'Terraform',
      logging: 'Winston',
      monitoring: 'Prometheus/Grafana ready'
    },
    endpoints: {
      health: '/api/health',
      healthDetailed: '/api/health/detailed',
      projects: '/api/projects',
      skills: '/api/skills',
      metrics: '/api/metrics'
    }
  });
});

module.exports = router;
