'use client';

import { Deliverable } from '@/types/project';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

interface DeliverableCardProps {
  deliverable: Deliverable;
}

function getSkillBadgeClass(skill: string): string {
  const skillMap: Record<string, string> = {
    'design-research': 'bg-[rgba(124,58,237,0.125)] text-[#a78bfa]',
    'design-concepts': 'bg-[rgba(37,99,235,0.125)] text-[#60a5fa]',
    'design-production': 'bg-[rgba(245,158,11,0.125)] text-[#fbbf24]',
    'design-qa': 'bg-[rgba(16,185,129,0.125)] text-[#34d399]',
  };
  return skillMap[skill] || 'bg-[rgba(124,58,237,0.125)] text-[#a78bfa]';
}

export function DeliverableCard({ deliverable }: DeliverableCardProps) {
  const [textPreview, setTextPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadTextPreview() {
      const { filePath, visualAssets } = deliverable;

      // Skip if has visual assets or no file path
      if (visualAssets?.colorPalette || visualAssets?.preview || !filePath) {
        return;
      }

      // Only load for text/markdown files
      if (!filePath.match(/\.(md|txt)$/i)) {
        return;
      }

      setIsLoading(true);
      try {
        // Path is already correct for Next.js static files (starts with /deliverables/)
        const response = await fetch(filePath);
        if (!response.ok) {
          console.log('Failed to fetch preview for:', filePath, response.status);
          return;
        }

        const text = await response.text();

        // Clean markdown content thoroughly
        const content = text
          // Remove YAML frontmatter
          .replace(/^---[\s\S]*?---\n?/gm, '')
          // Remove markdown headers (# Header)
          .replace(/^#{1,6}\s+(.+)$/gm, '$1')
          // Remove markdown bold (**text** or __text__)
          .replace(/(\*\*|__)(.*?)\1/g, '$2')
          // Remove markdown italic (*text* or _text_)
          .replace(/(\*|_)(.*?)\1/g, '$2')
          // Remove markdown list markers (- item, * item, 1. item)
          .replace(/^[\s]*[-*+]\s+/gm, '')
          .replace(/^[\s]*\d+\.\s+/gm, '')
          // Remove markdown links [text](url)
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          // Remove markdown code blocks
          .replace(/```[\s\S]*?```/g, '')
          .replace(/`([^`]+)`/g, '$1')
          // Remove horizontal rules
          .replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')
          // Remove blockquotes
          .replace(/^>\s+/gm, '')
          // Collapse multiple newlines into single newlines
          .replace(/\n{3,}/g, '\n\n')
          // Remove extra whitespace
          .replace(/[ \t]+/g, ' ')
          .trim();

        // Get first 400 characters of clean text
        setTextPreview(content.substring(0, 400));
      } catch (error) {
        // Silently fail - will show placeholder
        console.log('Failed to load preview for:', filePath, error);
        setTextPreview(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadTextPreview();
  }, [deliverable]);

  const renderVisual = () => {
    const { visualAssets } = deliverable;

    // Color palette preview
    if (visualAssets?.colorPalette) {
      return (
        <div className="flex h-full">
          {visualAssets.colorPalette.map((color, index) => (
            <div
              key={index}
              className="flex-1 h-full"
              style={{ background: color }}
            />
          ))}
        </div>
      );
    }

    // Image preview
    if (visualAssets?.preview && typeof visualAssets.preview === 'string' && visualAssets.preview.startsWith('/')) {
      return (
        <img
          src={visualAssets.preview}
          alt={deliverable.title}
          className="w-full h-full object-cover"
        />
      );
    }

    // Text preview
    if (textPreview) {
      return (
        <div className="p-5 text-[13px] leading-relaxed text-[var(--color-text-secondary)] text-left overflow-hidden w-full h-full line-clamp-8 font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif]">
          {textPreview}...
        </div>
      );
    }

    // Loading state
    if (isLoading) {
      return (
        <span className="text-sm text-[var(--color-text-disabled)]">Loading preview...</span>
      );
    }

    // Placeholder
    return <span className="text-sm text-[var(--color-text-disabled)]">Text Document</span>;
  };

  const handleViewFile = () => {
    window.open(deliverable.filePath, '_blank');
  };

  const skillLabel = deliverable.skill.replace('design-', '');

  return (
    <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg overflow-hidden transition-all duration-200 hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
      {/* Visual Preview */}
      <div className="w-full h-60 bg-[var(--color-background-primary)] border-b border-[var(--color-border)] flex items-center justify-center overflow-hidden relative">
        {renderVisual()}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {deliverable.title}
          </h3>
          <span
            className={`px-2.5 py-1 rounded text-[11px] font-medium uppercase tracking-wide ${getSkillBadgeClass(deliverable.skill)}`}
          >
            {skillLabel}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
          {deliverable.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] text-[13px] text-[var(--color-text-tertiary)]">
          <span>Created {formatDate(deliverable.createdDate)}</span>
          <button
            onClick={handleViewFile}
            className="px-3 py-1.5 bg-[var(--color-brand)] text-white rounded-md text-[13px] font-medium transition-all hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] active:scale-98 focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
          >
            View File →
          </button>
        </div>
      </div>
    </div>
  );
}
