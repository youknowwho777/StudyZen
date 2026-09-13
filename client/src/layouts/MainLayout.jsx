import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Responsive Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (Offset for desktop sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
          StudyZen &copy; {new Date().getFullYear()} &mdash; AI-Powered Student Productivity Platform
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
