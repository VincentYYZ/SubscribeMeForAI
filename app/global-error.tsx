'use client';

import { useEffect } from 'react';

/**
 * Global error handler for Next.js 16
 * Catches errors in the root layout
 * Must include full HTML structure
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log critical error
    console.error('Global error:', error);

    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service with high priority
    }
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="w-full max-w-lg rounded-md border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="mt-6 text-center text-3xl font-bold text-foreground">
              Critical Error
            </h1>

            <p className="mt-4 text-center text-muted">
              A critical error occurred while loading the application.
              Our team has been notified and is working to resolve this issue.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 rounded bg-secondary p-4">
                <summary className="cursor-pointer font-semibold text-sm">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-3 whitespace-pre-wrap text-xs text-red-600 overflow-auto max-h-40">
                  {error.message}
                  {error.stack && `\n\nStack trace:\n${error.stack}`}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-xs text-gray-500">
                    Error Digest: {error.digest}
                  </p>
                )}
              </details>
            )}

            <div className="mt-8 space-y-3">
              <button
                onClick={reset}
                className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Try to Recover
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="w-full rounded-md border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Go to Homepage
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-md border border-border px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Reload Application
              </button>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-center text-xs text-muted">
                If this problem persists, please contact support or try again later.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
