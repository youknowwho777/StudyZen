import React from 'react';
import { Calendar, Tag, AlertCircle, CheckCircle2, Circle } from 'lucide-react';

const priorityConfig = {
  High: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900',
    indicator: 'bg-rose-500',
  },
  Medium: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900',
    indicator: 'bg-amber-500',
  },
  Low: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900',
    indicator: 'bg-emerald-500',
  },
};

const TaskCard = ({ task, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';
  const priority = priorityConfig[task.priority] || priorityConfig.Medium;

  // Format deadline date
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formattedDate = formatDate(task.deadline);
  const isOverdue =
    task.deadline && new Date(task.deadline) < new Date() && !isCompleted;

  return (
    <div
      className={`group relative flex items-start justify-between gap-3.5 rounded-xl border p-4 transition-all duration-200 ${
        isCompleted
          ? 'border-slate-200/70 bg-slate-50/60 dark:border-slate-800/60 dark:bg-slate-900/40 opacity-75'
          : 'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900'
      }`}
    >
      {/* Left Column: Checkbox & Info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggleStatus && onToggleStatus(task)}
          className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400 transition cursor-pointer"
          title={isCompleted ? 'Mark pending' : 'Mark completed'}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm font-semibold truncate ${
              isCompleted
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {task.title}
          </h4>

          {task.description && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              {task.description}
            </p>
          )}

          {/* Meta badges: Category, Deadline */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
            {task.category && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300 font-medium">
                <Tag className="h-3 w-3" />
                {task.category}
              </span>
            )}

            {formattedDate && (
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-medium ${
                  isOverdue
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {isOverdue ? (
                  <AlertCircle className="h-3 w-3 text-rose-500" />
                ) : (
                  <Calendar className="h-3 w-3" />
                )}
                <span>{formattedDate}</span>
                {isOverdue && <span className="font-bold">(Overdue)</span>}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Priority Badge */}
      <span
        className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${priority.badge}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${priority.indicator}`} />
        {task.priority || 'Medium'}
      </span>
    </div>
  );
};

export default TaskCard;
