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

  const filterButtons: Array<{ label: string; value: ProjectStatus | 'all' }> = [
    { label: 'All Projects', value: 'all' },
    { label: 'Research', value: 'research' },
    { label: 'Concepts', value: 'concepts' },
    { label: 'Production', value: 'production' },
    { label: 'QA', value: 'qa' },
  ];

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filterButtons.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2 ${
              filter === value
                ? 'bg-[var(--color-brand)] text-white shadow-md'
                : 'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-background-tertiary)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

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
