import React from 'react';
import { Award, Zap, TrendingUp } from 'lucide-react';

const ProductivitySummary = ({
  total = 0,
  completed = 0,
  pending = 0,
  overdue = 0,
}) => {
  // Safe calculation preventing division by zero (Rule from roadmap)
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Productivity Summary
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time academic performance
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700 dark:text-slate-300">Completion Rate</span>
          <span className="text-indigo-600 dark:text-indigo-400">{completionRate}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Detailed metrics row */}
      <div className="mt-5 grid grid-cols-3 gap-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 text-center">
        <div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Done</p>
          <p className="mt-0.5 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {completed}
          </p>
        </div>
        <div className="border-x border-slate-200 dark:border-slate-700">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Pending</p>
          <p className="mt-0.5 text-base font-bold text-amber-600 dark:text-amber-400">
            {pending}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Overdue</p>
          <p className="mt-0.5 text-base font-bold text-rose-600 dark:text-rose-400">
            {overdue}
          </p>
        </div>
      </div>

      {/* Motivational Tip Card */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 text-xs text-indigo-900 dark:text-indigo-200">
        <Zap className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-semibold">Study Tip:</span> Break complex assignments into 25-minute Pomodoro sessions to maintain sharp focus.
        </p>
      </div>
    </div>
  );
};

export default ProductivitySummary;
