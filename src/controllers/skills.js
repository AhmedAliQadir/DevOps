/**
 * Skills Controller
 * Handles operations for DevOps skills
 */

const logger = require('../utils/logger');

const skills = [
  // Containerization
  { name: 'Docker', category: 'Containerization', level: 90, icon: '🐳' },
  { name: 'Kubernetes', category: 'Containerization', level: 75, icon: '☸️' },
  { name: 'Docker Compose', category: 'Containerization', level: 85, icon: '📦' },
  
  // CI/CD
  { name: 'GitHub Actions', category: 'CI/CD', level: 85, icon: '⚡' },
  { name: 'Jenkins', category: 'CI/CD', level: 70, icon: '🔧' },
  { name: 'GitLab CI', category: 'CI/CD', level: 65, icon: '🦊' },
  
  // Cloud Platforms
  { name: 'AWS', category: 'Cloud', level: 80, icon: '☁️' },
  { name: 'Azure', category: 'Cloud', level: 60, icon: '🎯' },
  { name: 'GCP', category: 'Cloud', level: 55, icon: '🌐' },
  
  // Infrastructure as Code
  { name: 'Terraform', category: 'IaC', level: 80, icon: '🏗️' },
  { name: 'Ansible', category: 'IaC', level: 75, icon: '🤖' },
  { name: 'CloudFormation', category: 'IaC', level: 65, icon: '📋' },
  
  // Monitoring
  { name: 'Prometheus', category: 'Monitoring', level: 70, icon: '📊' },
  { name: 'Grafana', category: 'Monitoring', level: 75, icon: '📈' },
  { name: 'ELK Stack', category: 'Monitoring', level: 65, icon: '🔍' },
  
  // Programming
  { name: 'JavaScript/Node.js', category: 'Programming', level: 85, icon: '💛' },
  { name: 'Python', category: 'Programming', level: 70, icon: '🐍' },
  { name: 'Bash', category: 'Programming', level: 80, icon: '🐚' },
  
  // Version Control
  { name: 'Git', category: 'Version Control', level: 90, icon: '📝' },
  { name: 'GitHub', category: 'Version Control', level: 85, icon: '🐙' },
  { name: 'GitLab', category: 'Version Control', level: 70, icon: '🦊' }
];

/**
 * Get all skills
 */
exports.getAll = (req, res) => {
  logger.info('Fetching all skills');
  res.json({
    success: true,
    count: skills.length,
    data: skills
  });
};

/**
 * Get skills grouped by category
 */
exports.getCategories = (req, res) => {
  logger.info('Fetching skills by category');
  
  const categories = {};
  skills.forEach(skill => {
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }
    categories[skill.category].push(skill);
  });
  
  res.json({
    success: true,
    data: categories
  });
};
