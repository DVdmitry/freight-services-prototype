import React from 'react';
import { ChevronRight, MapPin, Sparkles, Check, ArrowRight, Star, XOctagon } from 'lucide-react';
import type { Job } from '@/shared/types/job';
import clsx from 'clsx';

interface JobDetailPageProps {
  selectedJob: Job | null; // Выбранная вакансия
  darkMode: boolean;
  aiMode: boolean;
  // Предполагается, что jobStatuses и updateJobStatus будут приходить из контекста или App.tsx
  jobStatuses: Record<number, string>; 
  updateJobStatus: (jobId: number, status: 'interested' | 'applied' | 'rejected' | string) => void;
  onBackToJobs: () => void; // Функция для возврата к списку вакансий
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  selectedJob,
  darkMode,
  aiMode,
  jobStatuses,
  updateJobStatus,
  onBackToJobs,
}) => {
  if (!selectedJob) {
    // Можно отобразить заглушку или сообщение, если вакансия не выбрана,
    // или сделать редирект на страницу списка вакансий.
    // Пока просто возвращаем null, как в оригинальном коде.
    return null; 
  }

  return (
    <div className={clsx('min-h-screen py-8', darkMode ? 'bg-gray-900' : 'bg-gray-50')}>
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBackToJobs}
          className={clsx(
            'mb-6 flex items-center space-x-2 transition-colors',
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          )}
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Back to Jobs</span>
        </button>

        <div
          className={clsx(
            'backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden',
            darkMode ? 'bg-gray-800/50' : 'bg-white'
          )}
        >
          {/* Header с градиентом */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-600 to-purple-700 p-8">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedJob.companyLogo}
                  alt={selectedJob.company}
                  className="w-20 h-20 rounded-2xl shadow-lg"
                />
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{selectedJob.title}</h1>
                  <p className="text-xl opacity-90">{selectedJob.company}</p>
                </div>
              </div>

              {/* Match Score */}
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="white"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${(selectedJob.matchScore / 100) * 264} 264`} // 2 * PI * R (2 * 3.14159 * 42 approx 264)
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <span className="text-2xl font-bold text-white">{selectedJob.matchScore}%</span>
                      <p className="text-xs text-white/80">Match</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Основная информация */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className={clsx('p-4 rounded-2xl', darkMode ? 'bg-gray-900/50' : 'bg-gray-50')}>
                <p className={clsx('text-sm mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>Location</p>
                <p className={clsx('font-semibold flex items-center', darkMode ? 'text-white' : 'text-gray-900')}>
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  {selectedJob.location}
                </p>
              </div>
              <div className={clsx('p-4 rounded-2xl', darkMode ? 'bg-gray-900/50' : 'bg-gray-50')}>
                <p className={clsx('text-sm mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>Salary</p>
                <p className={clsx('font-semibold', darkMode ? 'text-green-400' : 'text-green-600')}>
                  {selectedJob.salary}
                </p>
              </div>
              <div className={clsx('p-4 rounded-2xl', darkMode ? 'bg-gray-900/50' : 'bg-gray-50')}>
                <p className={clsx('text-sm mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>Posted</p>
                <p className={clsx('font-semibold', darkMode ? 'text-white' : 'text-gray-900')}>
                  {new Date(selectedJob.postedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Теги */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-400 rounded-xl backdrop-blur-sm">
                {selectedJob.experience}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-xl backdrop-blur-sm">
                {selectedJob.language}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 rounded-xl backdrop-blur-sm">
                {selectedJob.area}
              </span>
            </div>

            {/* AI Insights */}
            {aiMode && selectedJob.aiInsights && (
              <div
                className={clsx(
                  'mb-8 p-6 rounded-2xl border',
                  darkMode
                    ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-800/50'
                    : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className={clsx('font-semibold mb-2', darkMode ? 'text-white' : 'text-gray-900')}>
                      AI Career Insights
                    </h3>
                    <p className={clsx(darkMode ? 'text-indigo-300' : 'text-indigo-700')}>
                      {selectedJob.aiInsights}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Описание */}
            <div className="mb-8">
              <h3 className={clsx('text-xl font-semibold mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
                About the Role
              </h3>
              <div 
                className={clsx('prose max-w-none', darkMode ? 'prose-invert' : '')}
                dangerouslySetInnerHTML={{ __html: selectedJob.fullDescription || '' }} 
              />
            </div>

            {/* Perks */}
            {selectedJob.perks && selectedJob.perks.length > 0 && (
              <div className="mb-8">
                <h3 className={clsx('text-xl font-semibold mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedJob.perks.map((perk, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'flex items-center space-x-3 p-3 rounded-xl',
                        darkMode ? 'bg-gray-900/50' : 'bg-gray-50'
                      )}
                    >
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={clsx(darkMode ? 'text-gray-300' : 'text-gray-700')}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Действия */}
            <div
              className={clsx(
                'flex flex-col pt-8 border-t',
                darkMode ? 'border-gray-700' : 'border-gray-200'
              )}
            >
              {/* Контейнер для кнопок статусов - всегда в строку, кнопки делят ширину */}
              <div className="flex flex-row items-center gap-3 mb-4 w-full">
                <button
                  onClick={() => updateJobStatus(selectedJob.id, 'interested')}
                  className={clsx(
                    'flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all', // Добавлен flex-1, justify-center
                    jobStatuses[selectedJob.id] === 'interested'
                      ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Star className="w-5 h-5" />
                  <span className="text-sm">Save for Later</span>
                </button>
                <button
                  onClick={() => updateJobStatus(selectedJob.id, 'applied')}
                  className={clsx(
                    'flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all', // Добавлен flex-1, justify-center
                    jobStatuses[selectedJob.id] === 'applied'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Check className="w-5 h-5" />
                  <span className="text-sm">Mark as Applied</span>
                </button>
                <button
                  onClick={() => updateJobStatus(selectedJob.id, 'rejected')}
                  className={clsx(
                    'flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all', // Добавлен flex-1, justify-center
                    jobStatuses[selectedJob.id] === 'rejected'
                      ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                      : darkMode
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  )}
                >
                  <XOctagon className="w-5 h-5" />
                  <span className="text-sm">Reject</span>
                </button>
              </div>

              {selectedJob.originalUrl && (
                <a
                  href={selectedJob.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Убраны hover-классы для цвета, добавлен hover:scale-105
                  className="w-full mt-4 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 hover:scale-105"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 