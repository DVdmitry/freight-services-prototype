import React from 'react';
import type { Filters } from '../hooks/useFilters'; // Предполагается, что хук здесь
import clsx from 'clsx';

interface SmartFiltersProps {
  filters: Filters; // Принимаем текущие фильтры
  onFilterChange: <K extends keyof Filters>(filterName: K, value: Filters[K]) => void; // Функция для обновления фильтра
  darkMode: boolean;
  // resetFilters?: () => void; // Опциональная функция сброса
}

export const SmartFilters: React.FC<SmartFiltersProps> = ({
  filters,
  onFilterChange,
  darkMode,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className={clsx('text-lg font-semibold', darkMode ? 'text-white' : 'text-gray-900')}>
          Smart Filters
        </h2>
        {/* Можно добавить кнопку сброса фильтров здесь, если resetFilters передан 
        {resetFilters && (
          <button onClick={resetFilters} className={clsx('text-sm', darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500')}>
            Reset Filters
          </button>
        )}
        */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Experience Filter */}
        <select
          value={filters.experience}
          onChange={(e) => onFilterChange('experience', e.target.value)}
          className={clsx(
            'px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500',
            darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
          )}
        >
          <option value="">Experience</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid-level</option>
          <option value="Senior">Senior</option>
        </select>

        {/* Language Filter */}
        <select
          value={filters.language}
          onChange={(e) => onFilterChange('language', e.target.value)}
          className={clsx(
            'px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500',
            darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
          )}
        >
          <option value="">Language</option>
          <option value="English">English</option>
          <option value="German">German</option>
          {/* Добавьте другие языки по необходимости */}
        </select>

        {/* Area Filter */}
        <select
          value={filters.area}
          onChange={(e) => onFilterChange('area', e.target.value)}
          className={clsx(
            'px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500',
            darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
          )}
        >
          <option value="">Field</option>
          <option value="IT">IT & Tech</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          {/* Добавьте другие области по необходимости */}
        </select>

        {/* Salary Filter */}
        <select
          value={filters.salary}
          onChange={(e) => onFilterChange('salary', e.target.value)}
          className={clsx(
            'px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500',
            darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'
          )}
        >
          <option value="">Salary Range</option>
          <option value="0-50">€0 - €50k</option>
          <option value="50-80">€50k - €80k</option>
          <option value="80+">€80k+</option>
        </select>

        {/* Remote Filter */}
        <label
          className={clsx(
            'flex items-center space-x-2 px-4 py-2 rounded-xl border cursor-pointer',
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          )}
        >
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={(e) => onFilterChange('remote', e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500" // Добавлен focus:ring
          />
          <span className={clsx(darkMode ? 'text-white' : 'text-gray-900')}>Remote</span>
        </label>
      </div>
    </div>
  );
}; 