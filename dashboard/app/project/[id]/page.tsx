import { notFound } from 'next/navigation';
import { getProject, getProjects, getProjectCounts } from '@/lib/data/projects';
import { SidebarNav } from '@/components/sidebar-nav';
import { StatusBadge } from '@/components/status-badge';
import { DeliverableCard } from '@/components/deliverable-card';
import { ContextSection } from '@/components/context-section';

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

  const visibleDeliverables = project.deliverables.filter((d) => d.visible);

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

          {/* Design Goals */}
          {project.designGoals.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
                Design Goals
              </h2>
              <ul className="space-y-3">
                {project.designGoals.map((goal, index) => (
                  <li key={index} className="flex gap-3 text-[var(--color-text-primary)]">
                    <span className="text-[var(--color-brand)]">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Design Principles */}
          {project.designPrinciples.length > 0 && (
            <ContextSection
              title="Design Principles"
              items={project.designPrinciples}
              itemType="principles"
              previewCount={3}
            />
          )}

          {/* Key Insights */}
          {project.keyInsights.length > 0 && (
            <ContextSection
              title="Key Insights"
              items={project.keyInsights}
              itemType="insights"
              previewCount={3}
            />
          )}

          {/* Deliverables */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">
              Deliverables
            </h2>
            {visibleDeliverables.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {visibleDeliverables.map((deliverable) => (
                  <DeliverableCard key={deliverable.id} deliverable={deliverable} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg">
                <p className="text-[var(--color-text-tertiary)] text-lg">
                  No deliverables yet
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
