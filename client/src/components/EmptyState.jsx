import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

const EmptyState = ({
  icon: Icon = BookOpen,
  title = 'No items found',
  description = 'Get started by creating your first academic task.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-8 sm:p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-inner">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>
      {actionText && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
