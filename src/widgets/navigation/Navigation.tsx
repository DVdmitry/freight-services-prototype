import React from 'react';
import { useLocation } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';
import { Briefcase, Sparkles, Brain, Settings, LogOut, Bot, Globe } from 'lucide-react';
import type { User } from '@/shared/types/user';
import clsx from 'clsx';

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  darkMode: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, darkMode }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
      active
        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
        : darkMode
        ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    )}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

interface NavigationProps {
  user: User | null;
  navigate: NavigateFunction;
  handleLogout: () => void;
  isAdmin: boolean;
  aiMode: boolean;
  setAiMode: (mode: boolean) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  user,
  navigate,
  handleLogout,
  isAdmin,
  aiMode,
  setAiMode,
  darkMode,
  setDarkMode,
}) => {
  const location = useLocation();
  if (!user) return null;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <nav
      className={clsx(
        'backdrop-blur-xl border-b sticky top-0 z-50',
        darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 mr-8">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h1 className={clsx('text-xl font-bold', darkMode ? 'text-white' : 'text-gray-900')}>
                ExpatsAustria
              </h1>
            </div>

            <div className="hidden md:flex space-x-1">
              <NavButton
                active={isActive('/jobs')}
                onClick={() => navigate('/jobs')}
                icon={<Briefcase className="w-4 h-4" />}
                label="Jobs"
                darkMode={darkMode}
              />
              {isAdmin && (
                <NavButton
                  active={isActive('/admin')}
                  onClick={() => navigate('/admin')}
                  icon={<Settings className="w-4 h-4" />}
                  label="Admin"
                  darkMode={darkMode}
                />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAiMode(!aiMode)}
              className={clsx(
                'p-2 rounded-lg hover:bg-indigo-500/30 transition-colors',
                aiMode ? 'bg-indigo-500/20 text-indigo-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
              )}
              title="AI Assistant"
            >
              <Bot className="w-5 h-5" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                darkMode ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-200/50'
              )}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>

            <button
              onClick={() => navigate('/profile')}
              className={clsx("flex items-center space-x-2 p-2 rounded-lg transition-colors", darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50")}
            >
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg" />
              <div className="hidden md:block text-left">
                <p className={clsx('text-sm font-medium', darkMode ? 'text-white' : 'text-gray-900')}>
                  {user.name}
                </p>
                <p className={clsx('text-xs', darkMode ? 'text-gray-400' : 'text-gray-600')}>
                  Score: {user.profileScore}%
                </p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              )}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 