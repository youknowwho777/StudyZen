import React, { useState, useEffect, useMemo } from 'react';
import { taskService } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  CheckSquare,
  ListTodo,
  Tag,
  Sparkles,
} from 'lucide-react';

const filterTabs = [
  'All',
  'Pending',
  'In Progress',
  'Completed',
  'High Priority',
];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('created_desc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tasks on mount
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getTasks();
      if (data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Collect unique categories for dropdown
  const categories = useMemo(() => {
    const set = new Set();
    tasks.forEach((t) => {
      if (t.category && t.category.trim()) set.add(t.category.trim());
    });
    return ['All', ...Array.from(set)];
  }, [tasks]);

  // Create or Update task
  const handleSaveTask = async (taskFormData) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        // Update
        const res = await taskService.updateTask(editingTask._id || editingTask.id, taskFormData);
        if (res.success && res.task) {
          setTasks((prev) =>
            prev.map((t) => ((t._id || t.id) === (res.task._id || res.task.id) ? res.task : t))
          );
        }
      } else {
        // Create
        const res = await taskService.createTask(taskFormData);
        if (res.success && res.task) {
          setTasks((prev) => [res.task, ...prev]);
        }
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle complete / pending
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        (t._id || t.id) === (task._id || task.id) ? { ...t, status: newStatus } : t
      )
    );
    try {
      await taskService.updateTask(task._id || task.id, { status: newStatus });
    } catch (err) {
      // Revert if error
      loadTasks();
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== taskId));
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete task');
    }
  };

  // Open modal for editing
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Open modal for new task
  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Filter & Search & Sort logic
  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = task.title?.toLowerCase().includes(q);
          const matchesDesc = task.description?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc) return false;
        }

        // Status / Priority filter tabs
        if (selectedFilter === 'Pending' && task.status === 'Completed') return false;
        if (selectedFilter === 'In Progress' && task.status !== 'In Progress') return false;
        if (selectedFilter === 'Completed' && task.status !== 'Completed') return false;
        if (selectedFilter === 'High Priority' && task.priority !== 'High') return false;

        // Category filter
        if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline_asc') {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        }
        if (sortBy === 'deadline_desc') {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(b.deadline) - new Date(a.deadline);
        }
        if (sortBy === 'priority') {
          const pOrder = { High: 1, Medium: 2, Low: 3 };
          return (pOrder[a.priority] || 2) - (pOrder[b.priority] || 2);
        }
        // Default: created_desc
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [tasks, searchQuery, selectedFilter, selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Task Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Create, track, and filter your coursework assignments and study priorities
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Academic Task</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadTasks} />}

      {/* Filter, Search & Controls Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search & Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Keyword Search */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search tasks or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="created_desc">Sort: Newest First</option>
              <option value="deadline_asc">Sort: Nearest Deadline</option>
              <option value="deadline_desc">Sort: Furthest Deadline</option>
              <option value="priority">Sort: Priority (High First)</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Filter:
          </span>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedFilter(tab)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-indigo-600 text-white shadow-xs dark:bg-indigo-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Content Area */}
      {loading ? (
        <LoadingSpinner size="lg" message="Loading your academic tasks..." />
      ) : filteredAndSortedTasks.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Showing {filteredAndSortedTasks.length} tasks</span>
            <span>Click circle to toggle completed</span>
          </div>

          {filteredAndSortedTasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ListTodo}
          title={searchQuery ? 'No matching tasks found' : 'No tasks created yet'}
          description={
            searchQuery
              ? `No tasks match your search "${searchQuery}". Try different keywords or reset filters.`
              : 'Keep your academic semester organized by adding your first study task.'
          }
          actionText="Add New Task"
          onAction={handleOpenCreate}
        />
      )}

      {/* Task Creation & Edit Modal */}
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

export default Tasks;
