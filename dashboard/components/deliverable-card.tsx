'use client';

import { Deliverable } from '@/types/project';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import { FileViewerModal } from './file-viewer-modal';
import { extractPrioritySection, ExtractedSection } from '@/lib/markdown-utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [extractedSection, setExtractedSection] = useState<ExtractedSection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHtmlFile, setIsHtmlFile] = useState(false);

  useEffect(() => {
    async function loadPreview() {
      const { filePath, visualAssets } = deliverable;

      // No file path means nothing to preview
      if (!filePath) {
        return;
      }

      // Check if it's an HTML file first (highest priority for visual deliverables)
      if (filePath.match(/\.html$/i)) {
        setIsHtmlFile(true);
        return;
      }

      // Skip markdown extraction if we have an actual image preview path
      if (visualAssets?.preview && typeof visualAssets.preview === 'string' && visualAssets.preview.startsWith('/')) {
        return;
      }

      // Skip markdown extraction if we have a color palette (design tokens)
      if (visualAssets?.colorPalette && !filePath.match(/\.html$/i)) {
        return;
      }

      // Only load for markdown files
      if (!filePath.match(/\.md$/i)) {
        return;
      }

      setIsLoading(true);
      try {
        // Path is already correct for Next.js static files (starts with /deliverables/)
        const response = await fetch(filePath);
        if (!response.ok) {
          console.error('Failed to fetch preview for:', filePath, response.status);
          setExtractedSection(null);
          return;
        }

        const text = await response.text();
        console.log('Loaded markdown for:', filePath, 'length:', text.length);

        // Extract priority section using new utility
        const section = extractPrioritySection(text);
        console.log('Extracted section for', filePath, ':', section);
        setExtractedSection(section);
      } catch (error) {
        // Silently fail - will show placeholder
        console.error('Failed to load preview for:', filePath, error);
        setExtractedSection(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadPreview();
  }, [deliverable]);

  const renderVisual = () => {
    const { visualAssets } = deliverable;

    // HTML file preview (highest priority for visual deliverables)
    if (isHtmlFile && deliverable.filePath) {
      return (
        <div className="w-full h-full relative bg-white overflow-hidden">
          <div className="w-full h-full overflow-hidden relative">
            <iframe
              src={deliverable.filePath}
              className="border-0 absolute top-0 left-0"
              style={{
                width: '400%',
                height: '400%',
                transform: 'scale(0.25)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}
              title={deliverable.title}
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-[10px] uppercase tracking-wide font-semibold">
            HTML Preview
          </div>
        </div>
      );
    }

    // Image preview (actual image file paths)
    if (visualAssets?.preview && typeof visualAssets.preview === 'string' && visualAssets.preview.startsWith('/')) {
      return (
        <img
          src={visualAssets.preview}
          alt={deliverable.title}
          className="w-full h-full object-cover"
        />
      );
    }

    // Color palette preview (design tokens)
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

    // Markdown preview with formatted content
    if (extractedSection) {
      return (
        <div className="p-5 text-left overflow-hidden w-full h-full">
          {/* Section label */}
          <div className="text-[10px] uppercase tracking-wide font-semibold text-[var(--color-text-tertiary)] mb-2">
            {extractedSection.sectionName}
          </div>
          {/* Formatted markdown content */}
          <div className="text-[13px] leading-relaxed text-[var(--color-text-secondary)] prose prose-sm prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h3 className="text-base font-semibold mb-2 text-[var(--color-text-primary)]" {...props} />,
                h2: ({ node, ...props }) => <h4 className="text-sm font-semibold mb-1.5 text-[var(--color-text-primary)]" {...props} />,
                h3: ({ node, ...props }) => <h5 className="text-sm font-medium mb-1 text-[var(--color-text-primary)]" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-0.5" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-0.5" {...props} />,
                li: ({ node, ...props }) => <li className="text-[13px]" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-[var(--color-text-primary)]" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                code: ({ node, ...props }) => <code className="bg-[var(--color-background-tertiary)] px-1 py-0.5 rounded text-[12px]" {...props} />,
              }}
            >
              {extractedSection.content}
            </ReactMarkdown>
          </div>
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
    setShowModal(true);
  };

  const skillLabel = deliverable.skill.replace('design-', '');

  return (
    <>
      {showModal && (
        <FileViewerModal
          deliverable={deliverable}
          onClose={() => setShowModal(false)}
        />
      )}
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
    </>
  );
}
