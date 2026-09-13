import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import TaskList from '../components/TaskList';
import ProductivitySummary from '../components/ProductivitySummary';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Sparkles,
  Plus,
  BookOpen,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const initialDemoTasks = [
  {
    _id: '1',
    title: 'Review Chapter 4 Algorithms & Data Structures',
    description: 'Solve practice problems on binary trees and graph traversals.',
    priority: 'High',
    status: 'Pending',
    deadline: new Date(Date.now() + 86400000).toISOString(),
    category: 'Computer Science',
  },
  {
    _id: '2',
    title: 'Complete Linear Algebra Assignment 3',
    description: 'Eigenvalues, eigenvectors, and matrix diagonalization questions.',
    priority: 'Medium',
    status: 'Pending',
    deadline: new Date(Date.now() + 172800000).toISOString(),
    category: 'Mathematics',
  },
  {
    _id: '3',
    title: 'Read Operating Systems Research Paper',
    description: 'Summarize memory management trade-offs for Monday discussion.',
    priority: 'Low',
    status: 'Completed',
    deadline: new Date(Date.now() - 3600000).toISOString(),
    category: 'Research',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialDemoTasks);

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Toggle task completed state locally in dashboard
  const handleToggleStatus = (clickedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === clickedTask._id
          ? {
              ...t,
              status: t.status === 'Completed' ? 'Pending' : 'Completed',
            }
          : t
      )
    );
  };

  // Calculate real-time stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
  const overdueTasks = tasks.filter(
    (t) =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== 'Completed'
  ).length;

  // Upcoming deadlines (next 3 pending tasks sorted by date)
  const upcomingDeadlines = tasks
    .filter((t) => t.status !== 'Completed' && t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. Hero Student Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-lg shadow-indigo-900/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-amber-300" />
                3-Day Study Streak
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/10">
                {user?.profile?.college || 'Computer Science'}
              </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Student'}!
            </h1>

            <p className="mt-1.5 text-indigo-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              You have <span className="font-bold text-white">{pendingTasks} pending tasks</span> on your study schedule today. Keep up the momentum!
            </p>
          </div>

          {/* Quick CTA button */}
          <div className="flex items-center gap-3">
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Create Task</span>
            </Link>
            <Link
              to="/ai"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Ask AI</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* 2. 4-Grid Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={ListTodo}
          color="indigo"
          subtext="Active in your semester"
          badge="Semester"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={CheckCircle2}
          color="emerald"
          subtext={`${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% completion`}
          badge="On track"
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={Clock}
          color="amber"
          subtext="Requires your attention"
          badge="Action needed"
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          icon={AlertTriangle}
          color="rose"
          subtext={overdueTasks === 0 ? 'All caught up' : 'Needs urgent review'}
          badge={overdueTasks === 0 ? 'Clean' : 'Urgent'}
        />
      </div>

      {/* 3. Main Split View: Left (Today's Tasks) & Right (Deadlines + Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Tasks List */}
        <div className="lg:col-span-2 space-y-6">
          <TaskList
            tasks={tasks}
            onToggleStatus={handleToggleStatus}
            onAddTask={() => navigate('/tasks')}
          />
        </div>

        {/* Right Column (1 Col wide on desktop): Upcoming Deadlines & Productivity */}
        <div className="space-y-6">
          {/* Upcoming Deadlines Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Upcoming Deadlines
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tasks due in the next few days
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Calendar className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3 text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {task.title}
                      </p>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {task.category}
                      </span>
                    </div>
                    <span className="shrink-0 rounded-lg bg-white dark:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {new Date(task.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                  No upcoming deadlines!
                </p>
              )}
            </div>
          </div>

          {/* Productivity Summary Card */}
          <ProductivitySummary
            total={totalTasks}
            completed={completedTasks}
            pending={pendingTasks}
            overdue={overdueTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
