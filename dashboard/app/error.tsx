'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-text-secondary mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-md transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
