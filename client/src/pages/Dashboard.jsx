import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  Sparkles,
  Server,
  GraduationCap,
  Target,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [apiStatus, setApiStatus] = useState({ loading: true, online: false, message: '' });

  // Get current greeting based on hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await authService.checkHealth();
        setApiStatus({
          loading: false,
          online: true,
          message: data.message || 'API is online',
        });
      } catch (err) {
        setApiStatus({
          loading: false,
          online: false,
          message: 'Backend disconnected / unreachable',
        });
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner & Greeting */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 sm:p-8 text-white shadow-lg shadow-indigo-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Phase 0 & 1 Operational
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="mt-1 text-indigo-100 text-sm max-w-xl">
              Welcome to your StudyZen workspace. Track your academic milestones, manage deadlines, and prepare with AI.
            </p>
          </div>

          {/* System Status Pill */}
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-medium backdrop-blur-md border border-white/10">
            <Server className="h-4 w-4 text-indigo-200" />
            <span className="text-indigo-100">API Status:</span>
            {apiStatus.loading ? (
              <span className="text-amber-200">Checking...</span>
            ) : apiStatus.online ? (
              <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-300 font-semibold">
                <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                Offline
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Student Profile & Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Institution</p>
              <p className="text-sm font-semibold text-slate-800">
                {user?.profile?.college || 'Not specified'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Academic Goal</p>
              <p className="text-sm font-semibold text-slate-800">
                {user?.profile?.academicGoal || 'Consistent Progress'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Study Method</p>
              <p className="text-sm font-semibold text-slate-800">
                {user?.profile?.studyPreference || 'Pomodoro'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Overview Cards for Phase 2 / Phase 3 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Tasks</span>
            <ListTodo className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-800">0</p>
          <span className="text-[11px] text-slate-400">Ready for Phase 3 (Tasks)</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600">0</p>
          <span className="text-[11px] text-emerald-600/70">100% completion goal</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-600">0</p>
          <span className="text-[11px] text-amber-600/70">Up to date</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Overdue</span>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-600">0</p>
          <span className="text-[11px] text-slate-400">No overdue deadlines</span>
        </div>
      </div>

      {/* Next Phases Roadmap Callout */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Current Phase Status</h3>
        <p className="mt-1 text-sm text-slate-500">
          Phase 0 (Project Foundation) and Phase 1 (JWT Authentication) have been scaffolded and connected.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
            <span className="font-semibold text-emerald-800">✓ Phase 0: Foundation</span>
            <p className="mt-0.5 text-emerald-700">Express + Vite + DB connection</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
            <span className="font-semibold text-emerald-800">✓ Phase 1: Authentication</span>
            <p className="mt-0.5 text-emerald-700">JWT, Bcrypt, Protected routes</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">
            <span className="font-semibold text-slate-700">Phase 2: Dashboard UI</span>
            <p className="mt-0.5 text-slate-500">Comprehensive layout & cards</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">
            <span className="font-semibold text-slate-700">Phase 3: Task Management</span>
            <p className="mt-0.5 text-slate-500">CRUD, filters, priority, search</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

