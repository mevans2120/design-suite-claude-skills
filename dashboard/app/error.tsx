'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  // Determine error type and message
  const getErrorInfo = () => {
    const message = error.message.toLowerCase();

    if (message.includes('fetch') || message.includes('network')) {
      return {
        title: 'Connection Error',
        description: 'Unable to load data. Please check your internet connection and try again.',
        icon: '🌐',
      };
    }

    if (message.includes('not found') || message.includes('404')) {
      return {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist or has been moved.',
        icon: '🔍',
      };
    }

    if (message.includes('timeout')) {
      return {
        title: 'Request Timeout',
        description: 'The request took too long to complete. Please try again.',
        icon: '⏱️',
      };
    }

    // Default error
    return {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred while loading the page.',
      icon: '⚠️',
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background-primary)] p-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="text-6xl mb-6">{errorInfo.icon}</div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
          {errorInfo.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          {errorInfo.description}
        </p>

        {/* Error details (in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] mb-2">
              Technical Details
            </summary>
            <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg p-4 text-sm text-[var(--color-text-primary)] font-mono overflow-auto max-h-40">
              <p className="mb-2">
                <strong>Error:</strong> {error.message}
              </p>
              {error.digest && (
                <p className="text-[var(--color-text-tertiary)]">
                  <strong>Digest:</strong> {error.digest}
                </p>
              )}
              {error.stack && (
                <pre className="mt-2 text-xs text-[var(--color-text-disabled)] whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[var(--color-brand)] text-white rounded-lg font-medium transition-all hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] active:scale-98 focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[var(--color-background-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium transition-all hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-border-hover)] focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2"
          >
            Go Home
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-tertiary)]">
            If this problem persists, please{' '}
            <a
              href="mailto:support@example.com"
              className="text-[var(--color-brand)] hover:underline focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2 rounded-sm"
            >
              contact support
            </a>
            {error.digest && ` with error ID: ${error.digest}`}
          </p>
        </div>
      </div>
    </div>
  );
}
