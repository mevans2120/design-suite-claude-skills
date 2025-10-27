import { notFound } from 'next/navigation';
import { getProject, getProjects, getProjectCounts } from '@/lib/data/projects';
import { SidebarNav } from '@/components/sidebar-nav';
import { StatusBadge } from '@/components/status-badge';
import { ProjectDetailContent } from '@/components/project-detail-content';

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  const projectCounts = await getProjectCounts();

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarNav projectCounts={projectCounts} showBackButton={true} />

      {/* Main Content */}
      <main className="flex-1 ml-60 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Project Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={project.status} />
              <span className="text-sm text-[var(--color-text-tertiary)]">
                Updated {project.lastUpdated}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              {project.name}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
              {project.description}
            </p>
          </header>

          {/* Project Content with Tabs */}
          <ProjectDetailContent project={project} />
        </div>
      </main>
    </div>
  );
}
