import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, GraduationCap, Target, BookMarked, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Student Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your academic details, preferences, and account settings
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white uppercase shadow-md shadow-indigo-200 dark:shadow-none">
            {user?.name ? user.name.charAt(0) : 'S'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {user?.name || 'Student'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              Active Student Account
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase">College</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {user?.profile?.college || 'Not set'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Target className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase">Goal</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {user?.profile?.academicGoal || 'Consistent Progress'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <BookMarked className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase">Preference</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              {user?.profile?.studyPreference || 'Pomodoro'}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Full profile editing arrives in Phase 6
          </span>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
