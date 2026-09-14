import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  Award,
  Zap,
  Tag,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getTaskStats();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load productivity analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" message="Calculating your academic analytics..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadStats} />;
  }

  const {
    totalTasks = 0,
    completedTasks = 0,
    inProgressTasks = 0,
    pendingTasks = 0,
    overdueTasks = 0,
    completionRate = 0,
    priorityBreakdown = { High: 0, Medium: 0, Low: 0 },
    categoryBreakdown = [],
  } = stats || {};

  // Status breakdown percentages
  const completedPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPct = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const pendingPct = totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0;

  // Academic standing grade based on completion rate
  const getProductivityGrade = () => {
    if (totalTasks === 0) return { grade: 'N/A', text: 'No task data yet' };
    if (completionRate >= 80) return { grade: 'A+', text: 'Exceptional Study Pace' };
    if (completionRate >= 60) return { grade: 'B', text: 'Solid Academic Progress' };
    if (completionRate >= 40) return { grade: 'C', text: 'Moderate Progress' };
    return { grade: 'Needs Focus', text: 'Action recommended' };
  };

  const standing = getProductivityGrade();

  return (
    <div className="space-y-6">
      {/* Page Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-indigo-800 p-6 sm:p-8 text-white shadow-lg shadow-indigo-900/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Award className="h-3.5 w-3.5 text-amber-300" />
                Phase 4 Productivity Engine
              </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Productivity Analytics
            </h1>

            <p className="mt-1.5 text-indigo-100 text-xs sm:text-sm max-w-xl">
              Real-time analytics and completion ratios computed directly from your active coursework tasks.
            </p>
          </div>

          {/* Academic Grade Badge */}
          <div className="flex items-center gap-3.5 rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/15">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-700 font-extrabold text-xl shadow-xs">
              {standing.grade}
            </div>
            <div>
              <p className="text-[11px] font-medium text-indigo-200 uppercase tracking-wider">
                Productivity Pace
              </p>
              <p className="text-sm font-bold text-white">{standing.text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Core 4-Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={BarChart3}
          color="indigo"
          subtext="All assignments & tests"
          badge="Total"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={CheckCircle2}
          color="emerald"
          subtext={`${completedTasks} of ${totalTasks} completed`}
          badge={completionRate >= 60 ? 'Healthy' : 'Needs attention'}
        />
        <StatCard
          title="Pending / In Progress"
          value={pendingTasks + inProgressTasks}
          icon={Clock}
          color="amber"
          subtext={`${inProgressTasks} in progress`}
          badge="Active"
        />
        <StatCard
          title="Overdue Tasks"
          value={overdueTasks}
          icon={AlertTriangle}
          color="rose"
          subtext={overdueTasks === 0 ? 'No overdue deadlines' : 'Past scheduled deadline'}
          badge={overdueTasks === 0 ? 'Clean' : 'Overdue'}
        />
      </div>

      {/* 2. Visual Analytics Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Task Status Distribution */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Task Status Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distribution across completion lifecycles
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {totalTasks} Total
            </span>
          </div>

          {totalTasks > 0 ? (
            <div className="mt-6 space-y-4">
              {/* Stacked multi-color progress bar */}
              <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 flex">
                <div
                  className="bg-emerald-500 transition-all duration-500"
                  style={{ width: `${completedPct}%` }}
                  title={`Completed: ${completedPct}%`}
                />
                <div
                  className="bg-indigo-500 transition-all duration-500"
                  style={{ width: `${inProgressPct}%` }}
                  title={`In Progress: ${inProgressPct}%`}
                />
                <div
                  className="bg-amber-400 transition-all duration-500"
                  style={{ width: `${pendingPct}%` }}
                  title={`Pending: ${pendingPct}%`}
                />
              </div>

              {/* Status items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Completed Tasks
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {completedTasks} ({completedPct}%)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    In Progress
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {inProgressTasks} ({inProgressPct}%)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    Pending
                  </span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {pendingTasks} ({pendingPct}%)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              No tasks available to calculate status breakdown.
            </p>
          )}
        </div>

        {/* Right Card: Priority Breakdown */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Priority Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Workload urgency breakdown
              </p>
            </div>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>

          <div className="mt-6 space-y-4">
            {/* High Priority Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> High Priority
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {priorityBreakdown.High} tasks
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks > 0 ? (priorityBreakdown.High / totalTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Medium Priority Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium Priority
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {priorityBreakdown.Medium} tasks
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks > 0 ? (priorityBreakdown.Medium / totalTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Low Priority Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Low Priority
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {priorityBreakdown.Low} tasks
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${totalTasks > 0 ? (priorityBreakdown.Low / totalTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category & Course Breakdown */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Workload by Subject / Category
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribution of academic tasks across courses
            </p>
          </div>
          <Tag className="h-4 w-4 text-indigo-500" />
        </div>

        {categoryBreakdown.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoryBreakdown.map((item) => (
              <div
                key={item.category}
                className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    {item.count}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400"
                    style={{
                      width: `${totalTasks > 0 ? (item.count / totalTasks) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
            No subjects assigned yet. Assign categories when creating tasks to see your distribution!
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Want to add more coursework tasks?
          </span>
          <Link
            to="/tasks"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            <span>Manage Tasks</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
