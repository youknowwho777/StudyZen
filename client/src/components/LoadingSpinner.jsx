import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center" role="status">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} animate-spin rounded-full border-indigo-600 dark:border-indigo-400 border-t-transparent`}
      />
      {message && (
        <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          {message}
        </p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
