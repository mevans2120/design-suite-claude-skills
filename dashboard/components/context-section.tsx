'use client';

import { DesignPrinciple } from '@/types/project';
import { useState } from 'react';

interface ContextSectionProps {
  title: string;
  items: DesignPrinciple[] | string[];
  itemType: 'principles' | 'insights';
  previewCount?: number;
}

export function ContextSection({
  title,
  items,
  itemType,
  previewCount = 3,
}: ContextSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const displayItems = expanded ? items : items.slice(0, previewCount);
  const hasMore = items.length > previewCount;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderPrinciples = () => {
    const principles = displayItems as DesignPrinciple[];
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {principles.map((principle, index) => (
          <div
            key={index}
            className="p-5 bg-[var(--color-background-primary)] border border-[var(--color-border)] rounded-md"
          >
            <h4 className="text-[15px] font-semibold mb-2 text-[var(--color-brand)]">
              {principle.title}
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderInsights = () => {
    const insights = displayItems as string[];
    return (
      <div className="flex flex-col gap-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 bg-[var(--color-background-primary)] border border-[var(--color-border)] rounded-md"
          >
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[var(--color-brand)] text-white rounded-full text-xs font-semibold">
              {index + 1}
            </div>
            <div className="text-sm text-[var(--color-text-primary)]">{insight}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg p-8 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h3>
        {hasMore && (
          <button
            onClick={toggleExpand}
            className="px-3 py-1.5 bg-transparent border border-[var(--color-border)] rounded-md text-[var(--color-text-secondary)] text-[13px] transition-all hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-border-hover)] focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
          >
            {expanded ? 'Show Less' : `Show All (${items.length})`}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="overflow-hidden transition-all duration-300">
        {itemType === 'principles' ? renderPrinciples() : renderInsights()}
      </div>
    </div>
  );
}
