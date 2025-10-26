import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-text-secondary mb-6">
          The project you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-md transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
