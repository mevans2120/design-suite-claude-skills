interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[var(--color-background-tertiary)] via-[var(--color-border)] to-[var(--color-background-tertiary)] bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: 'shimmer 2s ease-in-out infinite',
      }}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Meta */}
      <div className="flex gap-6 pt-4 border-t border-[var(--color-border)]">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function DeliverableCardSkeleton() {
  return (
    <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg overflow-hidden">
      {/* Visual Preview */}
      <Skeleton className="w-full h-60 rounded-none" />

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Summary */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <>
      {/* Filter buttons skeleton */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>

      {/* Project cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-2/3 mb-4" />
        <Skeleton className="h-6 w-full max-w-3xl" />
      </header>

      {/* Tabs */}
      <div className="border-b border-[var(--color-border)] mb-8">
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-24 mb-[-2px]" />
          ))}
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-10">
        {/* Goals section */}
        <section>
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4].map((i) => (
              <DeliverableCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Add shimmer animation styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;
  document.head.appendChild(style);
}
