import { ProjectDetailSkeleton } from '@/components/skeleton-loader';

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Static placeholder */}
      <aside className="w-60 bg-[var(--color-background-secondary)] border-r border-[var(--color-border)] fixed h-screen" />

      {/* Main Content */}
      <main className="flex-1 ml-60 p-10">
        <ProjectDetailSkeleton />
      </main>
    </div>
  );
}
