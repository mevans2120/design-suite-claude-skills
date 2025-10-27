import { SidebarNav } from '@/components/sidebar-nav';
import { ProjectsGridSkeleton } from '@/components/skeleton-loader';

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Static placeholder */}
      <aside className="w-60 bg-[var(--color-background-secondary)] border-r border-[var(--color-border)] fixed h-screen" />

      {/* Main Content */}
      <main className="flex-1 ml-60 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <header className="mb-10">
            <div className="h-10 w-64 bg-[var(--color-background-tertiary)] rounded animate-pulse mb-2" />
            <div className="h-6 w-96 bg-[var(--color-background-tertiary)] rounded animate-pulse" />
          </header>

          {/* Projects Grid Skeleton */}
          <ProjectsGridSkeleton />
        </div>
      </main>
    </div>
  );
}
