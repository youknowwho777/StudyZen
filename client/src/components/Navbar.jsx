import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import ThemeToggle from './ThemeToggle';
import { Menu, BookOpen, Server, User, LogOut } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [apiOnline, setApiOnline] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkApi = async () => {
      try {
        await authService.checkHealth();
        if (isMounted) setApiOnline(true);
      } catch {
        if (isMounted) setApiOnline(false);
      }
    };
    checkApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left: Mobile Toggle & Mobile Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Study<span className="text-indigo-600 dark:text-indigo-400">Zen</span>
          </span>
        </div>

        {/* Desktop Greeting pill */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Student Productivity Workspace</span>
        </div>
      </div>

      {/* Right: API Status, Theme Toggle, User Avatar */}
      <div className="flex items-center gap-3">
        {/* Live API Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-3 py-1 text-xs font-medium">
          <span
            className={`h-2 w-2 rounded-full ${
              apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span className="text-slate-600 dark:text-slate-300">
            API: {apiOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* User Pill / Logout */}
        {user && (
          <div className="flex items-center gap-2.5 border-l border-slate-200 dark:border-slate-800 pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white uppercase shadow-xs">
              {user.name ? user.name.charAt(0) : <User className="h-4 w-4" />}
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200">
              {user.name}
            </span>
            <button
              onClick={logout}
              title="Sign Out"
              className="hidden sm:inline-flex rounded-lg p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
