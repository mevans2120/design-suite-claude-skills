/**
 * Dashboard Update Helpers
 * Used by design skills to update the dashboard data store
 */

const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');

/**
 * Read projects data
 */
function readProjects() {
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects.json:', error);
    return { projects: [] };
  }
}

/**
 * Write projects data
 */
function writeProjects(data) {
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing projects.json:', error);
    return false;
  }
}

/**
 * Add or update a deliverable for a project
 */
function addDeliverable(projectId, deliverable) {
  const data = readProjects();
  const project = data.projects.find(p => p.id === projectId);

  if (!project) {
    console.error(`Project ${projectId} not found`);
    return false;
  }

  // Add metadata
  deliverable.id = `deliv-${Date.now()}`;
  deliverable.createdDate = new Date().toISOString().split('T')[0];
  deliverable.visible = deliverable.visible !== false; // default to true

  // Add to deliverables
  project.deliverables.push(deliverable);
  project.lastUpdated = new Date().toISOString().split('T')[0];

  return writeProjects(data);
}

/**
 * Update project metadata
 */
function updateProject(projectId, updates) {
  const data = readProjects();
  const project = data.projects.find(p => p.id === projectId);

  if (!project) {
    console.error(`Project ${projectId} not found`);
    return false;
  }

  // Merge updates
  Object.assign(project, updates);
  project.lastUpdated = new Date().toISOString().split('T')[0];

  return writeProjects(data);
}

/**
 * Create a new project
 */
function createProject(projectData) {
  const data = readProjects();

  // Generate ID if not provided
  if (!projectData.id) {
    projectData.id = projectData.name.toLowerCase().replace(/\s+/g, '-');
  }

  // Set defaults
  const project = {
    ...projectData,
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    status: projectData.status || 'research',
    designPrinciples: projectData.designPrinciples || [],
    deliverables: projectData.deliverables || [],
    keyInsights: projectData.keyInsights || []
  };

  data.projects.push(project);
  return writeProjects(data);
}

/**
 * Get project by ID
 */
function getProject(projectId) {
  const data = readProjects();
  return data.projects.find(p => p.id === projectId);
}

module.exports = {
  readProjects,
  writeProjects,
  addDeliverable,
  updateProject,
  createProject,
  getProject
};
