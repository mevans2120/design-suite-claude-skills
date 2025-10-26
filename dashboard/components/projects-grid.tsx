'use client';

import { Project, ProjectStatus } from '@/types/project';
import { ProjectCard } from './project-card';
import { useState } from 'react';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.status === filter);

  return (
    <>
      {/* Filter Buttons - Hidden for now, will be enabled in Phase 3 with proper routing */}
      {/*
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('research')}>Research</button>
        <button onClick={() => setFilter('concepts')}>Concepts</button>
        <button onClick={() => setFilter('production')}>Production</button>
        <button onClick={() => setFilter('qa')}>QA</button>
      </div>
      */}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-tertiary)] text-lg">
            No projects found
          </p>
        </div>
      )}
    </>
  );
}
