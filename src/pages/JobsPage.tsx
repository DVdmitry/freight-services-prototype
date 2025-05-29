import React, { useState, useEffect } from 'react'; // Убрал useMemo отсюда, он в useFilters
import { Sparkles } from 'lucide-react';
import { JobCard } from '@/entities/job/ui/JobCard';
import { SmartFilters } from '@/features/filters/ui/SmartFilters';
import { useFilters } from '@/features/filters/hooks/useFilters';
import type { Job } from '@/shared/types/job';
import clsx from 'clsx';

export interface JobsPageProps { // Экспортируем интерфейс, если он может понадобиться где-то еще
  jobs: Job[]; // <--- Добавляем пропс jobs
  darkMode: boolean;
  aiMode: boolean;
  navigateToJobDetail: (job: Job) => void;
  jobStatuses: Record<number, string>;
  // updateJobStatus?: (jobId: number, status: string) => void; // Если нужен здесь
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobs, // <--- Получаем jobs как пропс
  darkMode,
  aiMode,
  navigateToJobDetail,
  jobStatuses,
}) => {
  // Используем useFilters, передавая ему актуальный список вакансий (отфильтрованных по rejectedId)
  const { filters, filteredJobs, updateFilter, resetFilters, setJobs } = useFilters(jobs);

  // Если список jobs (пропс) изменяется (например, после применения rejected), 
  // нужно обновить jobs внутри useFilters
  useEffect(() => {
    setJobs(jobs);
  }, [jobs, setJobs]);

  // Состояние для поля "умного" поиска AI (если это отдельная логика от useFilters)
  const [aiSearchTerm, setAiSearchTerm] = useState('');

  // Пример функции для "умного" поиска, если он не обрабатывается в useFilters
  const handleAiSearch = () => {
    console.log('AI Search for:', aiSearchTerm);
    // Здесь могла бы быть логика вызова API или дополнительной фильтрации
    // Если searchTerm из useFilters должен использоваться, то передавать его в updateFilter
  };

  return (
    <div className={clsx('transition-colors duration-300', darkMode ? 'text-gray-200' : 'text-gray-800')}>
      {/* "Умный" поиск AI */}
      {aiMode && (
        <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-semibold">AI Smart Search</h2>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={aiSearchTerm} // Используем отдельное состояние для AI поиска
              onChange={(e) => setAiSearchTerm(e.target.value)}
              placeholder="Describe your dream job or ask about market trends..."
              className={clsx(
                'flex-grow p-3 rounded-lg border transition-all',
                darkMode
                  ? 'bg-gray-800/50 border-gray-700 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                  : 'bg-white/50 border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
              )}
            />
            <button
              onClick={handleAiSearch} // Обработчик для AI поиска
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Filters Component - используем SmartFilters или ваш актуальный компонент фильтров */}
      {/* Убедитесь, что SmartFilters правильно работает с updateFilter и filters из useFilters */}
      <SmartFilters filters={filters} onFilterChange={updateFilter} darkMode={darkMode} />

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              darkMode={darkMode}
              onViewDetails={() => navigateToJobDetail(job)}
              jobStatuses={jobStatuses}
              aiMode={aiMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-3">No jobs found</h3>
          <p className={clsx(darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Try adjusting your filters or searching for something else.
          </p>
          <button 
            onClick={resetFilters} 
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}; 