import { Project, ProjectsData } from '@/types/project';
import projectsData from '@/public/data/projects.json';

/**
 * Get all projects from the data file
 * Server-side data fetching for Next.js
 */
export async function getProjects(): Promise<Project[]> {
  // In Phase 1: Return static data
  // In Phase 2+: Could fetch from API/database
  return (projectsData as ProjectsData).projects;
}

/**
 * Get a single project by ID
 */
export async function getProject(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

/**
 * Get projects filtered by status
 */
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.status === status);
}

/**
 * Get count of projects by status
 */
export async function getProjectCounts(): Promise<Record<string, number>> {
  const projects = await getProjects();

  return {
    all: projects.length,
    research: projects.filter((p) => p.status === 'research').length,
    concepts: projects.filter((p) => p.status === 'concepts').length,
    production: projects.filter((p) => p.status === 'production').length,
    qa: projects.filter((p) => p.status === 'qa').length,
    complete: projects.filter((p) => p.status === 'complete').length,
  };
}
