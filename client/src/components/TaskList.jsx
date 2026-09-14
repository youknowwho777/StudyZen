import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { ArrowRight, ListTodo, Plus } from 'lucide-react';

const TaskList = ({ tasks = [], onToggleStatus, onEdit, onDelete, onAddTask }) => {
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return task.status !== 'Completed';
    if (filter === 'Completed') return task.status === 'Completed';
    return true;
  });

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
      {/* Header with Filters & Quick Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Today's Focus & Tasks
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your daily study priorities
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 text-xs">
            {['All', 'Pending', 'Completed'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-3 py-1 font-medium transition cursor-pointer ${
                  filter === tab
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {onAddTask && (
            <button
              type="button"
              onClick={onAddTask}
              className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Task List or Empty State */}
      <div className="mt-4 space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <EmptyState
            icon={ListTodo}
            title={filter === 'All' ? 'No tasks yet' : `No ${filter.toLowerCase()} tasks`}
            description="Organize your syllabus, assignments, and test preparation."
            actionText="Create New Task"
            onAction={onAddTask}
          />
        )}
      </div>

      {/* Footer Link to full Tasks page */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
        <Link
          to="/tasks"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
        >
          <span>View all task filters & search</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
