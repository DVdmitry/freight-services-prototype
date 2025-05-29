import React from 'react';
import clsx from 'clsx';
import type { User } from '@/shared/types/user';
import type { Job } from '@/shared/types/job';

// TODO: Определить типы для `users` и `jobs` более конкретно, если это необходимо.
// Например, User[] и Job[] из ваших shared/types.
interface AdminPageProps {
  darkMode: boolean;
  users: User[]; // Замените any на User[] или соответствующий тип
  jobs: Job[];  // Замените any на Job[] или соответствующий тип
  stats: {
    totalUsers: number;
    totalJobs: number;
    activeJobs: number;
    applications: number;
  };
}

export const AdminPage: React.FC<AdminPageProps> = ({ darkMode, users, jobs, stats }) => {
  // Пример данных для графиков (в реальном приложении будут приходить из API или состояния)
  // const userActivityData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //   ],
  // };

  // const jobPostingsData = {
  //   labels: ['IT', 'Marketing', 'Sales', 'Finance', 'HR'],
  //   datasets: [
  //     {
  //   ],
  // };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className={clsx('text-3xl font-bold mb-8', darkMode ? 'text-white' : 'text-gray-900')}>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
          <h2 className={clsx('text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Total Users
          </h2>
          <p className={clsx('text-3xl font-bold', darkMode ? 'text-white' : 'text-gray-900')}>
            {stats.totalUsers}
          </p>
        </div>
        <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
          <h2 className={clsx('text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Total Jobs
          </h2>
          <p className={clsx('text-3xl font-bold', darkMode ? 'text-white' : 'text-gray-900')}>
            {stats.totalJobs}
          </p>
        </div>
        <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
          <h2 className={clsx('text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Active Jobs
          </h2>
          <p className={clsx('text-3xl font-bold', darkMode ? 'text-green-400' : 'text-green-600')}>
            {stats.activeJobs}
          </p>
        </div>
        <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
          <h2 className={clsx('text-sm font-medium mb-1', darkMode ? 'text-gray-400' : 'text-gray-600')}>
            Applications
          </h2>
          <p className={clsx('text-3xl font-bold', darkMode ? 'text-blue-400' : 'text-blue-600')}>
            {stats.applications}
          </p>
        </div>
      </div>

      {/* Charts - Placeholder for actual chart implementation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
          <h3 className={clsx('text-lg font-semibold mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
            User Activity
          </h3>
          {/* Замените это на реальный компонент графика (например, из Recharts или Chart.js) */}
          <div className={clsx('h-64 flex items-center justify-center', darkMode ? 'text-gray-500' : 'text-gray-400')}>
            Chart Placeholder (User Activity)
          </div>
        </div>
        <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
          <h3 className={clsx('text-lg font-semibold mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
            Job Postings
          </h3>
          {/* Замените это на реальный компонент графика */}
          <div className={clsx('h-64 flex items-center justify-center', darkMode ? 'text-gray-500' : 'text-gray-400')}>
            Chart Placeholder (Job Postings)
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={clsx('p-6 rounded-2xl shadow-lg mb-8', darkMode ? 'bg-gray-800' : 'bg-white')}>
        <h3 className={clsx('text-lg font-semibold mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
          Manage Users
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={clsx(darkMode ? 'bg-gray-700/50' : 'bg-gray-50')}>
              <tr>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Name</th>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Email</th>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Role</th>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Actions</th>
              </tr>
            </thead>
            <tbody className={clsx(darkMode ? 'divide-gray-700' : 'divide-gray-200')}>
              {users.map((user) => (
                <tr key={user.id} className={clsx(darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50')}>
                  <td className={clsx('px-6 py-4 whitespace-nowrap text-sm font-medium', darkMode ? 'text-white' : 'text-gray-900')}>{user.name}</td>
                  <td className={clsx('px-6 py-4 whitespace-nowrap text-sm', darkMode ? 'text-gray-300' : 'text-gray-500')}>{user.email}</td>
                  <td className={clsx('px-6 py-4 whitespace-nowrap text-sm', darkMode ? 'text-gray-300' : 'text-gray-500')}>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className={clsx('mr-2', darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900')}>Edit</button>
                    <button className={clsx(darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jobs Table */}
      <div className={clsx('p-6 rounded-2xl shadow-lg', darkMode ? 'bg-gray-800' : 'bg-white')}>
        <h3 className={clsx('text-lg font-semibold mb-4', darkMode ? 'text-white' : 'text-gray-900')}>
          Manage Jobs
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={clsx(darkMode ? 'bg-gray-700/50' : 'bg-gray-50')}>
              <tr>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Title</th>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Company</th>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Status</th>
                <th className={clsx('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', darkMode ? 'text-gray-300' : 'text-gray-500')}>Actions</th>
              </tr>
            </thead>
            <tbody className={clsx(darkMode ? 'divide-gray-700' : 'divide-gray-200')}>
              {jobs.map((job) => (
                <tr key={job.id} className={clsx(darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50')}>
                  <td className={clsx('px-6 py-4 whitespace-nowrap text-sm font-medium', darkMode ? 'text-white' : 'text-gray-900')}>{job.title}</td>
                  <td className={clsx('px-6 py-4 whitespace-nowrap text-sm', darkMode ? 'text-gray-300' : 'text-gray-500')}>{job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Пример отображения статуса */}
                    <span className={clsx(
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      job.isActive // Предполагаем, что у вакансии есть такой флаг
                        ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                        : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
                    )}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className={clsx('mr-2', darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900')}>Edit</button>
                    <button className={clsx(darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 