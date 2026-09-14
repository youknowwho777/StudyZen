import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import StatCard from '../components/StatCard';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import ProductivitySummary from '../components/ProductivitySummary';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Fetch real data from backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch tasks and stats in parallel
      const [tasksRes, statsRes] = await Promise.allSettled([
        taskService.getTasks(),
        taskService.getTaskStats(),
      ]);

      if (tasksRes.status === 'fulfilled' && tasksRes.value?.success) {
        setTasks(tasksRes.value.tasks || []);
      }

      if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
        setStats(statsRes.value.stats);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Toggle task completed state
  const handleToggleStatus = async (clickedTask) => {
    const newStatus = clickedTask.status === 'Completed' ? 'Pending' : 'Completed';
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        (t._id || t.id) === (clickedTask._id || clickedTask.id)
          ? { ...t, status: newStatus }
          : t
      )
    );

    try {
      await taskService.updateTask(clickedTask._id || clickedTask.id, { status: newStatus });
      // Refresh stats
      const statsRes = await taskService.getTaskStats();
      if (statsRes.success) setStats(statsRes.stats);
    } catch (err) {
      fetchDashboardData();
    }
  };

  // Create or Update task from modal
  const handleSaveTask = async (taskFormData) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        await taskService.updateTask(editingTask._id || editingTask.id, taskFormData);
      } else {
        await taskService.createTask(taskFormData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      await fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== taskId));
      const statsRes = await taskService.getTaskStats();
      if (statsRes.success) setStats(statsRes.stats);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete task');
    }
  };

  // Compute live metrics from real stats or local fallback
  const totalTasks = stats ? stats.totalTasks : tasks.length;
  const completedTasks = stats
    ? stats.completedTasks
    : tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = stats
    ? stats.pendingTasks + (stats.inProgressTasks || 0)
    : tasks.filter((t) => t.status !== 'Completed').length;
  const overdueTasks = stats
    ? stats.overdueTasks
    : tasks.filter(
      (t) =>
        t.deadline &&
        new Date(t.deadline) < new Date() &&
        t.status !== 'Completed'
    ).length;

  const completionRate =
    stats?.completionRate !== undefined
      ? stats.completionRate
      : totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

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
                Active Study Session
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/10">
                {user?.profile?.college || 'Student Workspace'}
              </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Student'}!
            </h1>

            <p className="mt-1.5 text-indigo-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              You have <span className="font-bold text-white">{pendingTasks} pending tasks</span> on your schedule. Track deadlines, study priorities, and academic metrics in real-time.
            </p>
          </div>

          {/* Quick CTA buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
            <Link
              to="/analytics"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>View Analytics</span>
            </Link>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchDashboardData} />}

      {/* 2. 4-Grid Statistics Cards with Real MongoDB Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={ListTodo}
          color="indigo"
          subtext="Total coursework items"
          badge="Live DB"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={CheckCircle2}
          color="emerald"
          subtext={`${completionRate}% completion rate`}
          badge="Progress"
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={Clock}
          color="amber"
          subtext="Requires attention"
          badge="Actionable"
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          icon={AlertTriangle}
          color="rose"
          subtext={overdueTasks === 0 ? 'All caught up' : 'Needs urgent review'}
          badge={overdueTasks === 0 ? 'Clean' : 'Overdue'}
        />
      </div>

      {/* 3. Main Split View: Left (Today's Tasks) & Right (Deadlines + Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tasks List */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
              <LoadingSpinner size="md" message="Loading your tasks from MongoDB..." />
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleStatus={handleToggleStatus}
              onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteTask}
              onAddTask={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
            />
          )}
        </div>

        {/* Right Column: Upcoming Deadlines & Productivity */}
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
                    key={task._id || task.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3 text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {task.title}
                      </p>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {task.category || 'General'}
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
                  No upcoming deadlines scheduled!
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

      {/* Task Creation / Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Dashboard;
