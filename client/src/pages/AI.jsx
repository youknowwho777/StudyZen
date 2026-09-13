import React from 'react';
import { Bot, ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AI = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          StudyZen AI Assistant
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          AI-powered academic tutor, study plan generator, and text summarizer
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-8 sm:p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none">
          <Bot className="h-7 w-7" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" /> Scheduled for Phase 5
        </span>
        <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-slate-100">
          3 Powerful AI Features
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left text-xs">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">1. Topic Explainer</span>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Break down complex concepts into simple steps.</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">2. Study Planner</span>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Custom schedules based on your exam date.</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs">
            <span className="font-bold text-purple-600 dark:text-purple-400">3. Summarizer</span>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Convert long lecture notes into key bullet points.</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AI;
