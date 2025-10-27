'use client';

import { Project } from '@/types/project';
import { useState } from 'react';
import { TabNavigation } from './tab-navigation';
import { DeliverableCard } from './deliverable-card';
import { ContextSection } from './context-section';

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const visibleDeliverables = project.deliverables.filter((d) => d.visible);
  const featuredDeliverables = visibleDeliverables.slice(0, 4);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deliverables', label: 'All Deliverables' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <>
      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div role="tabpanel" id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
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

            {/* Featured Deliverables */}
            {featuredDeliverables.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    Featured Deliverables
                  </h2>
                  {visibleDeliverables.length > featuredDeliverables.length && (
                    <button
                      onClick={() => setActiveTab('deliverables')}
                      className="px-3 py-1.5 text-sm text-[var(--color-brand)] hover:underline focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2 rounded-sm"
                    >
                      View all {visibleDeliverables.length} deliverables →
                    </button>
                  )}
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {featuredDeliverables.map((deliverable) => (
                    <DeliverableCard key={deliverable.id} deliverable={deliverable} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* All Deliverables Tab */}
        {activeTab === 'deliverables' && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">
              All Deliverables ({visibleDeliverables.length})
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
        )}

        {/* Activity Tab (Placeholder) */}
        {activeTab === 'activity' && (
          <div className="text-center py-20 bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Activity Timeline
              </h3>
              <p className="text-[var(--color-text-tertiary)]">
                Coming soon! This section will show project activity, updates, and version history.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
