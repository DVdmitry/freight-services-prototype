import React from 'react';
import { MapPin, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import type { Job } from '../../../shared/types/job'; // Используем тип Job
import clsx from 'clsx'; // Для условных классов

// Пропсы компонента
interface JobCardProps {
  job: Job;
  jobStatuses: Record<number, string>; // Статусы вакансий (например, interested, applied)
  aiMode: boolean;
  darkMode: boolean;
  onViewDetails: (job: Job) => void; // Функция для перехода к деталям вакансии
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  jobStatuses,
  aiMode,
  darkMode,
  onViewDetails,
}) => {
  const status = jobStatuses[job.id];

  return (
    <div
      className={clsx(
        'group relative backdrop-blur-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border hover:border-indigo-500/50 hover:scale-[1.02]',
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-xl" />
            <div>
              <h3 className={clsx('text-xl font-semibold mb-1', darkMode ? 'text-white' : 'text-gray-900')}>
                {job.title}
              </h3>
              <p className={clsx('flex items-center', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                {job.company}
                {job.trending && (
                  <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs rounded-full flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke={darkMode ? '#374151' : '#e5e7eb'}
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#jobCardGradient)" // Уникальный ID для градиента
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(job.matchScore / 100) * 176} 176`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="jobCardGradient"> {/* Уникальный ID */}
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={clsx('text-sm font-bold', darkMode ? 'text-white' : 'text-gray-900')}>
                  {job.matchScore}%
                </span>
              </div>
            </div>
            <span className={clsx('text-xs mt-1', darkMode ? 'text-gray-500' : 'text-gray-600')}>AI Match</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-400 text-xs rounded-lg backdrop-blur-sm">
            {job.experience}
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs rounded-lg backdrop-blur-sm">
            {job.language}
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 text-xs rounded-lg backdrop-blur-sm">
            {job.area}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className={clsx('flex items-center text-sm', darkMode ? 'text-gray-400' : 'text-gray-600')}>
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </span>
            <span className={clsx('font-semibold', darkMode ? 'text-green-400' : 'text-green-600')}>
              {job.salary}
            </span>
          </div>
        </div>

        {aiMode && job.aiInsights && (
          <div
            className={clsx(
              'mb-4 p-3 rounded-lg border',
              darkMode ? 'bg-indigo-900/20 border-indigo-800' : 'bg-indigo-50 border-indigo-200'
            )}
          >
            <div className="flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5" />
              <p className={clsx('text-sm', darkMode ? 'text-indigo-300' : 'text-indigo-700')}>
                {job.aiInsights}
              </p>
            </div>
          </div>
        )}

        <div className={clsx('flex items-center justify-between pt-4 border-t', darkMode ? 'border-gray-700' : 'border-gray-200')}>
          <div className="flex gap-2">
            {status && (
              <span
                className={clsx('px-3 py-1 rounded-full text-sm font-medium', {
                  'bg-yellow-500/20 text-yellow-500': status === 'interested',
                  'bg-blue-500/20 text-blue-500': status === 'applied',
                  'bg-red-500/20 text-red-500': status !== 'interested' && status !== 'applied', // Для других статусов, если будут
                })}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            )}
          </div>

          <button
            onClick={() => onViewDetails(job)}
            className="group/btn flex items-center space-x-2 text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            <span className="text-sm font-medium">View Details</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}; 