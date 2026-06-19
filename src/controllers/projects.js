/**
 * Projects Controller
 * Handles CRUD operations for portfolio projects
 */

const logger = require('../utils/logger');

// In-memory storage (replace with database in production)
let projects = [
  {
    id: '1',
    name: 'CI/CD Pipeline Setup',
    description: 'Implemented automated CI/CD pipelines using GitHub Actions',
    technologies: ['GitHub Actions', 'Docker', 'AWS'],
    category: 'DevOps',
    url: 'https://github.com/yourusername/pipeline-repo',
    featured: true
  },
  {
    id: '2',
    name: 'Kubernetes Cluster',
    description: 'Deployed and managed Kubernetes cluster on AWS EKS',
    technologies: ['Kubernetes', 'AWS EKS', 'Terraform'],
    category: 'DevOps',
    url: 'https://github.com/yourusername/k8s-config',
    featured: true
  },
  {
    id: '3',
    name: 'Infrastructure as Code',
    description: 'Created Terraform modules for reusable infrastructure',
    technologies: ['Terraform', 'AWS', 'Ansible'],
    category: 'DevOps',
    url: 'https://github.com/yourusername/terraform-modules',
    featured: false
  }
];

let nextId = 4;

/**
 * Get all projects
 */
exports.getAll = (req, res) => {
  logger.info('Fetching all projects');
  res.json({
    success: true,
    count: projects.length,
    data: projects
  });
};

/**
 * Get project by ID
 */
exports.getById = (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
  
  logger.info(`Fetching project with ID: ${id}`);
  res.json({
    success: true,
    data: project
  });
};

/**
 * Create new project
 */
exports.create = (req, res) => {
  const { name, description, technologies, category, url, featured } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: 'Name and description are required'
    });
  }
  
  const newProject = {
    id: String(nextId++),
    name,
    description,
    technologies: technologies || [],
    category: category || 'DevOps',
    url: url || '',
    featured: featured || false
  };
  
  projects.push(newProject);
  logger.info(`Created new project: ${newProject.name}`);
  
  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: newProject
  });
};

/**
 * Update project
 */
exports.update = (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
  
  const updatedProject = {
    ...projects[projectIndex],
    ...req.body,
    id // Ensure ID is not changed
  };
  
  projects[projectIndex] = updatedProject;
  logger.info(`Updated project: ${updatedProject.name}`);
  
  res.json({
    success: true,
    message: 'Project updated successfully',
    data: updatedProject
  });
};

/**
 * Delete project
 */
exports.delete = (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
  
  const deletedProject = projects.splice(projectIndex, 1)[0];
  logger.info(`Deleted project: ${deletedProject.name}`);
  
  res.json({
    success: true,
    message: 'Project deleted successfully',
    data: deletedProject
  });
};
