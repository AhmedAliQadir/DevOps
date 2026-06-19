/**
 * API Tests
 * Comprehensive test suite for the DevOps Portfolio API
 */

const request = require('supertest');
const app = require('../src/app');

describe('Health Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/health/detailed', () => {
    it('should return detailed health with system metrics', async () => {
      const response = await request(app)
        .get('/api/health/detailed')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('system');
      expect(response.body).toHaveProperty('process');
    });
  });

  describe('GET /api/health/live', () => {
    it('should return liveness status', async () => {
      const response = await request(app)
        .get('/api/health/live')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'alive');
    });
  });

  describe('GET /api/health/ready', () => {
    it('should return readiness status', async () => {
      const response = await request(app)
        .get('/api/health/ready')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'ready');
    });
  });
});

describe('API Endpoints', () => {
  describe('GET /api/devops', () => {
    it('should return DevOps information', async () => {
      const response = await request(app)
        .get('/api/devops')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('devopsFeatures');
      expect(response.body).toHaveProperty('technologies');
    });
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return a specific project', async () => {
      const response = await request(app)
        .get('/api/projects/1')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', '1');
    });

    it('should return 404 for non-existent project', async () => {
      const response = await request(app)
        .get('/api/projects/999')
        .expect('Content-Type', /json/)
        .expect(404);
      
      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const newProject = {
        name: 'Test Project',
        description: 'Test Description',
        technologies: ['Node.js', 'Docker'],
        category: 'DevOps'
      };

      const response = await request(app)
        .post('/api/projects')
        .send(newProject)
        .expect('Content-Type', /json/)
        .expect(201);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('name', 'Test Project');
    });

    it('should return 400 for invalid project data', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({ name: 'Only Name' })
        .expect('Content-Type', /json/)
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/skills', () => {
    it('should return all skills', async () => {
      const response = await request(app)
        .get('/api/skills')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/skills/categories', () => {
    it('should return skills grouped by category', async () => {
      const response = await request(app)
        .get('/api/skills/categories')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('Containerization');
    });
  });

  describe('GET /api/metrics', () => {
    it('should return application metrics', async () => {
      const response = await request(app)
        .get('/api/metrics')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('requests');
      expect(response.body.data).toHaveProperty('uptime');
    });
  });

  describe('GET /api/metrics/github', () => {
    it('should return GitHub metrics', async () => {
      const response = await request(app)
        .get('/api/metrics/github')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('totalCommits');
    });
  });
});

describe('Root Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect('Content-Type', /json/)
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});
