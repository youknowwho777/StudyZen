import React from 'react';
import { BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Productivity Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Deep visual insights into your study habits, completion rates, and milestones
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 p-8 sm:p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-200 dark:shadow-none">
          <BarChart3 className="h-7 w-7" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-900/60 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
          <Sparkles className="h-3.5 w-3.5" /> Scheduled for Phase 4
        </span>
        <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-100">
          Interactive Study Charts & Trends
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Phase 4 converts all your completed coursework data into charts, trends, and milestone calculations.
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-purple-700 transition"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
