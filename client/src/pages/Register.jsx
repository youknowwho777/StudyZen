import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { BookOpen, UserPlus, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    academicGoal: '',
    studyPreference: 'Pomodoro',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profile: {
          college: formData.college,
          academicGoal: formData.academicGoal,
          studyPreference: formData.studyPreference,
        },
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Top right theme toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/60 dark:shadow-black/40 border border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
            <BookOpen className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Create your Study<span className="text-indigo-600 dark:text-indigo-400">Zen</span> Account
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Start organizing your academic coursework with AI
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 p-3.5 text-sm text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Johnson"
              className="mt-1 block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@university.edu"
              className="mt-1 block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Password <span className="text-rose-500">*</span> (min. 6 chars)
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">College / Major</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Engineering"
                className="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Academic Goal</label>
              <input
                type="text"
                name="academicGoal"
                value={formData.academicGoal}
                onChange={handleChange}
                placeholder="e.g. 3.8 GPA"
                className="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 transition cursor-pointer"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Create Student Account</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
