import { getProjects, getProjectCounts } from '@/lib/data/projects';
import { SidebarNav } from '@/components/sidebar-nav';
import { ContextSection } from '@/components/context-section';
import { DeliverableCard } from '@/components/deliverable-card';

export default async function HomePage() {
  const projects = await getProjects();
  const projectCounts = await getProjectCounts();

  // Get the first project (Design Dashboard)
  const project = projects[0];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarNav projectCounts={projectCounts} showBackButton={false} />

      {/* Main Content */}
      <main className="flex-1 ml-60 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              {project.name}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-6">
              {project.description}
            </p>
          </header>

          {/* Design Principles */}
          <ContextSection
            title="Design Principles"
            items={project.designPrinciples}
            itemType="principles"
            previewCount={100}
          />

          {/* Key Insights */}
          <ContextSection
            title="Key Insights"
            items={project.keyInsights}
            itemType="insights"
            previewCount={100}
          />

          {/* All Deliverables */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">
              All Deliverables ({project.deliverables.length})
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6">
              {project.deliverables.map((deliverable) => (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
