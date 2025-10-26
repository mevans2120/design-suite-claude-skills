'use client';

import { Project } from '@/types/project';
import { StatusBadge } from './status-badge';
import { formatDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${project.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg p-6 cursor-pointer transition-all duration-200 hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] focus-within:outline focus-within:outline-2 focus-within:outline-[var(--color-brand)] focus-within:outline-offset-2"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
            {project.name}
          </h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Meta */}
      <div className="flex gap-6 pt-4 border-t border-[var(--color-border)] text-[13px] text-[var(--color-text-tertiary)]">
        <div className="flex items-center gap-1.5">
          <span>Deliverables:</span>
          <span className="text-[var(--color-text-primary)] font-medium">
            {project.deliverables?.length || 0}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Updated:</span>
          <span className="text-[var(--color-text-primary)] font-medium">
            {formatDate(project.lastUpdated)}
          </span>
        </div>
      </div>
    </div>
  );
}
