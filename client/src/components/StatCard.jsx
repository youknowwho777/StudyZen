import React from 'react';

const colorThemes = {
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-100 dark:border-indigo-900/40',
    glow: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-800',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-900/40',
    glow: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-800',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-100 dark:border-amber-900/40',
    glow: 'group-hover:border-amber-300 dark:group-hover:border-amber-800',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/50',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-100 dark:border-rose-900/40',
    glow: 'group-hover:border-rose-300 dark:group-hover:border-rose-800',
  },
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = 'indigo',
  subtext,
  badge,
}) => {
  const theme = colorThemes[color] || colorThemes.indigo;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs transition duration-200 hover:shadow-md dark:hover:shadow-slate-950 ${theme.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${theme.border} ${theme.bg} ${theme.text}`}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>

      {(subtext || badge) && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2.5 text-xs text-slate-500 dark:text-slate-400">
          <span>{subtext}</span>
          {badge && (
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-medium text-slate-700 dark:text-slate-300">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
