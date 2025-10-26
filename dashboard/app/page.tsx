import { getProjects, getProjectCounts } from '@/lib/data/projects';
import { SidebarNav } from '@/components/sidebar-nav';
import { ProjectsGrid } from '@/components/projects-grid';

export default async function HomePage() {
  const projects = await getProjects();
  const projectCounts = await getProjectCounts();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarNav projectCounts={projectCounts} showBackButton={false} />

      {/* Main Content */}
      <main className="flex-1 ml-60 p-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              Design Projects
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Track design projects through research, concepts, production, and QA
            </p>
          </header>

          {/* Projects Grid with Client-side filtering */}
          <ProjectsGrid projects={projects} />
        </div>
      </main>
    </div>
  );
}
