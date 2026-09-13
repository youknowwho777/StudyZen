import React from 'react';
import { CheckSquare, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Task Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create, organize, and prioritize your academic coursework
          </p>
        </div>
      </div>

      {/* Phase 3 Teaser Card */}
      <div className="rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-8 sm:p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
          <CheckSquare className="h-7 w-7" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" /> Scheduled for Phase 3
        </span>
        <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-100">
          Full Task CRUD & Filters Coming Next
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Phase 3 will add task creation forms, category tags, priority tagging, live search, and MongoDB persistence.
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
