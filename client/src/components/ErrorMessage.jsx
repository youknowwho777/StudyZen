import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/40 p-4 text-rose-800 dark:text-rose-300 shadow-sm">
      <div className="flex items-center gap-2.5">
        <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 dark:border-rose-800 bg-white dark:bg-rose-900/40 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

