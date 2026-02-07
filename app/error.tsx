'use client';

import { useEffect } from 'react';

/**
 * App-level error page for Next.js 16
 * Catches errors in app directory routes
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error('App error:', error);

    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
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

        <h1 className="mt-6 text-2xl font-bold text-center text-gray-900">
          Oops! Something went wrong
        </h1>

        <p className="mt-4 text-center text-gray-600">
          We encountered an unexpected error. Please try again.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 p-4 bg-gray-100 rounded">
            <summary className="cursor-pointer font-semibold text-sm">
              Error Details (Development Only)
            </summary>
            <pre className="mt-3 whitespace-pre-wrap text-xs text-red-600 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500">
                Error Digest: {error.digest}
              </p>
            )}
          </details>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
