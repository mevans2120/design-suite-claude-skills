'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps {
  projectCounts: Record<string, number>;
  showBackButton?: boolean;
}

export function SidebarNav({ projectCounts, showBackButton = false }: SidebarNavProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[var(--color-background-secondary)] border-r border-[var(--color-border)] px-4 py-6 overflow-y-auto">
      {/* Logo */}
      <div className="text-lg font-semibold mb-8 px-2 text-[var(--color-text-primary)]">
        Design Suite
      </div>

      {/* Back Navigation */}
      {showBackButton && (
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-2 mb-6 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)] rounded-md transition-all"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </Link>
      )}

      {/* Navigation */}
      <nav>
        {/* Workspace Section */}
        <div className="mb-6">
          <div className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2 px-2">
            Workspace
          </div>
          <Link
            href="/"
            className={cn(
              'flex items-center justify-between px-2 py-2 rounded-md text-sm transition-all mb-1',
              isHome
                ? 'bg-[var(--color-brand)] text-white'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]'
            )}
          >
            <span>All Projects</span>
            <span
              className={cn(
                'text-xs',
                isHome ? 'text-white/70' : 'text-[var(--color-text-tertiary)]'
              )}
            >
              {projectCounts.all}
            </span>
          </Link>
        </div>

        {/* Phase Section */}
        <div className="mb-6">
          <div className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2 px-2">
            Phase
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 py-2 rounded-md text-sm text-[var(--color-text-tertiary)] opacity-60">
              <span>Research</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {projectCounts.research}
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-2 rounded-md text-sm text-[var(--color-text-tertiary)] opacity-60">
              <span>Concepts</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {projectCounts.concepts}
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-2 rounded-md text-sm text-[var(--color-text-tertiary)] opacity-60">
              <span>Production</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {projectCounts.production}
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-2 rounded-md text-sm text-[var(--color-text-tertiary)] opacity-60">
              <span>QA</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {projectCounts.qa}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
        <div className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide mb-3 px-2">
          Related Tools
        </div>
        <div className="block px-2 py-1.5 text-[13px] text-[var(--color-text-tertiary)] opacity-60 mb-1">
          PM Dashboard
        </div>
        <div className="block px-2 py-1.5 text-[13px] text-[var(--color-text-tertiary)] opacity-60">
          Engineering Dashboard
        </div>
      </div>
    </aside>
  );
}
