'use client';

import { Deliverable } from '@/types/project';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

interface FileViewerModalProps {
  deliverable: Deliverable;
  onClose: () => void;
}

export function FileViewerModal({ deliverable, onClose }: FileViewerModalProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fileExtension = deliverable.filePath.split('.').pop()?.toLowerCase();
  const isMarkdown = fileExtension === 'md';
  const isHtml = fileExtension === 'html';
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(fileExtension || '');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      setError(null);

      try {
        // Skip loading content for images - they'll be rendered directly
        if (isImage) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(deliverable.filePath);
        if (!response.ok) {
          throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error('Error loading file:', err);
        setError(err instanceof Error ? err.message : 'Failed to load file');
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, [deliverable.filePath, isImage]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewInNewTab = () => {
    window.open(deliverable.filePath, '_blank');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-[var(--color-text-tertiary)] animate-pulse">Loading file content...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-[var(--color-text-tertiary)]">Unable to load file preview</p>
          <p className="text-sm text-[var(--color-text-disabled)]">{error}</p>
          <button
            onClick={handleViewInNewTab}
            className="px-4 py-2 bg-[var(--color-brand)] text-white rounded-md text-sm font-medium transition-all hover:bg-[var(--color-brand-hover)] focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
          >
            Open in New Tab
          </button>
        </div>
      );
    }

    // Image preview
    if (isImage) {
      return (
        <div className="flex items-center justify-center bg-[var(--color-background-primary)] rounded-lg p-8">
          <img
            src={deliverable.filePath}
            alt={deliverable.title}
            className="max-w-full max-h-[70vh] object-contain rounded-md"
          />
        </div>
      );
    }

    // HTML content in iframe
    if (isHtml && content) {
      return (
        <div className="bg-[var(--color-background-primary)] rounded-lg overflow-hidden">
          <iframe
            srcDoc={content}
            title={deliverable.title}
            className="w-full h-[70vh] border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      );
    }

    // Markdown/text content with basic formatting
    if (isMarkdown && content) {
      return (
        <div className="prose prose-invert max-w-none">
          <div className="markdown-content text-[var(--color-text-primary)] leading-relaxed">
            {content.split('\n').map((line, index) => {
              // Headers
              if (line.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold mt-8 mb-4 pb-4 border-b border-[var(--color-border)]">
                    {line.substring(2)}
                  </h1>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-[var(--color-brand)]">
                    {line.substring(3)}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-5 mb-2">
                    {line.substring(4)}
                  </h3>
                );
              }

              // List items
              if (line.match(/^[\s]*[-*+]\s+/)) {
                return (
                  <li key={index} className="ml-6 my-2 text-[var(--color-text-secondary)] list-disc">
                    {line.replace(/^[\s]*[-*+]\s+/, '')}
                  </li>
                );
              }

              // Blockquotes
              if (line.startsWith('> ')) {
                return (
                  <blockquote key={index} className="border-l-4 border-[var(--color-brand)] pl-4 my-4 italic text-[var(--color-text-tertiary)]">
                    {line.substring(2)}
                  </blockquote>
                );
              }

              // Horizontal rules
              if (line.match(/^[\s]*[-*_]{3,}[\s]*$/)) {
                return <hr key={index} className="my-6 border-[var(--color-border)]" />;
              }

              // Empty lines
              if (line.trim() === '') {
                return <br key={index} />;
              }

              // Regular paragraphs
              return (
                <p key={index} className="my-3 text-[var(--color-text-primary)]">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      );
    }

    // Fallback: raw text
    if (content) {
      return (
        <pre className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap font-mono bg-[var(--color-background-primary)] p-6 rounded-lg overflow-auto">
          {content}
        </pre>
      );
    }

    return null;
  };

  const skillLabel = deliverable.skill.replace('design-', '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] bg-[var(--color-background-primary)] rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/20 rounded-lg flex items-center justify-center text-lg">
              📄
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {deliverable.title}
              </h2>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                <span className="capitalize">{skillLabel}</span> • Created {formatDate(deliverable.createdDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleViewInNewTab}
              className="px-3 py-1.5 bg-transparent border border-[var(--color-border)] rounded-md text-[var(--color-text-secondary)] text-sm transition-all hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-border-hover)] focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
            >
              Open in New Tab
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-transparent border border-[var(--color-border)] rounded-md text-[var(--color-text-tertiary)] text-xl transition-all hover:bg-[var(--color-background-tertiary)] hover:border-red-500 hover:text-red-500 focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
              title="Close (Esc)"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[var(--color-border)] bg-[var(--color-background-primary)] rounded-b-xl">
          <p className="text-sm text-[var(--color-text-tertiary)] font-mono">
            {deliverable.filePath}
          </p>
          <p className="text-sm text-[var(--color-text-disabled)]">
            Press <kbd className="px-2 py-0.5 bg-[var(--color-background-tertiary)] border border-[var(--color-border)] rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
