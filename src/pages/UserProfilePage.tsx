import React, { useState } from 'react';
import type { User } from '@/shared/types/user';
import type { Job } from '@/shared/types/job'; // Предполагаем, что у вас есть тип Job
import { Edit3, Save, Briefcase, Settings, Shield } from 'lucide-react';
import clsx from 'clsx';

// Примерный тип для отслеживаемых вакансий (может быть расширен)
interface TrackedJob extends Job {
  status: 'interested' | 'applied' | 'interview' | 'offer' | 'rejected';
}

interface UserProfilePageProps {
  user: User; // Данные пользователя
  darkMode: boolean;
  onUpdateProfile: (updatedUser: Partial<User>) => void; // Функция для обновления профиля
  trackedJobs: TrackedJob[]; // Список отслеживаемых вакансий
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  user,
  darkMode,
  onUpdateProfile,
  trackedJobs,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // Для чекбоксов (например, isPremium, если бы он был редактируемым)
      const { checked } = e.target as HTMLInputElement;
      setEditableUser(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditableUser(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSave = () => {
    onUpdateProfile(editableUser);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className={clsx(
        "p-8 rounded-3xl shadow-xl mb-8 relative overflow-hidden",
        darkMode ? "bg-gray-800" : "bg-white"
      )}>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tl from-pink-500/30 to-orange-500/30 rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
          <img
            src={editableUser.avatar}
            alt={editableUser.name}
            className="w-32 h-32 rounded-full shadow-lg border-4"
            style={{ borderColor: darkMode ? '#4F46E5' : '#818CF8' }} // Tailwind JIT может не подхватить border-indigo-500/70
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className={clsx('text-3xl font-bold mb-1', darkMode ? 'text-white' : 'text-gray-900')}>
              {editableUser.name}
            </h1>
            <p className={clsx('text-lg mb-3', darkMode ? 'text-indigo-400' : 'text-indigo-600')}>
              {editableUser.email}
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3">
              <span className={clsx(
                "px-3 py-1 text-xs font-semibold rounded-full",
                editableUser.isPremium ? (darkMode ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700") 
                                      : (darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700")
              )}>
                {editableUser.isPremium ? 'Premium Member' : 'Standard Member'}
              </span>
              <span className={clsx("px-3 py-1 text-xs font-semibold rounded-full", darkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-700")}>
                Profile Score: {editableUser.profileScore}%
              </span>
            </div>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={clsx(
              "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-md",
              isEditing 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : (darkMode ? "bg-indigo-600 hover:bg-indigo-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white")
            )}
          >
            {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Profile Details & Settings Tabs */}
      <div className={clsx("rounded-3xl shadow-xl p-8", darkMode ? "bg-gray-800" : "bg-white")}>
        {/* Можно добавить систему вкладок здесь, если потребуется (например, "Profile", "Preferences", "Security") */}
        {isEditing ? (
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className={clsx("block text-sm font-medium mb-1", darkMode ? "text-gray-300" : "text-gray-700")}>Full Name</label>
              <input type="text" name="name" id="name" value={editableUser.name} onChange={handleChange} className={clsx("w-full px-4 py-2 rounded-lg border", darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")} />
            </div>
            <div>
              <label htmlFor="email" className={clsx("block text-sm font-medium mb-1", darkMode ? "text-gray-300" : "text-gray-700")}>Email Address</label>
              <input type="email" name="email" id="email" value={editableUser.email} onChange={handleChange} className={clsx("w-full px-4 py-2 rounded-lg border", darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")} />
            </div>
            <div>
              <label htmlFor="avatar" className={clsx("block text-sm font-medium mb-1", darkMode ? "text-gray-300" : "text-gray-700")}>Avatar URL</label>
              <input type="text" name="avatar" id="avatar" value={editableUser.avatar} onChange={handleChange} className={clsx("w-full px-4 py-2 rounded-lg border", darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")} />
            </div>
            {/* Добавьте другие редактируемые поля по аналогии: bio, resumeUrl, etc. */}
             <div>
              <label htmlFor="bio" className={clsx("block text-sm font-medium mb-1", darkMode ? "text-gray-300" : "text-gray-700")}>Bio</label>
              <textarea name="bio" id="bio" rows={4} value={editableUser.bio || ''} onChange={handleChange} className={clsx("w-full px-4 py-2 rounded-lg border", darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")} />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <InfoRow label="Full Name" value={user.name} darkMode={darkMode} />
            <InfoRow label="Email" value={user.email} darkMode={darkMode} />
            <InfoRow label="Bio" value={user.bio || 'Not set'} darkMode={darkMode} />
            <InfoRow label="Resume" value={user.resumeUrl ? <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer" className={clsx(darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500")}>View Resume</a> : 'Not uploaded'} darkMode={darkMode} />
            {/* Добавьте другие поля для отображения */}
          </div>
        )}
      </div>

      {/* Tracked Jobs Section */}
      <div className={clsx("mt-8 rounded-3xl shadow-xl p-8", darkMode ? "bg-gray-800" : "bg-white")}>
        <h2 className={clsx('text-2xl font-semibold mb-6 flex items-center', darkMode ? 'text-white' : 'text-gray-900')}>
          <Briefcase className="w-6 h-6 mr-3 text-indigo-500" />
          Tracked Applications
        </h2>
        {trackedJobs.length > 0 ? (
          <div className="space-y-4">
            {trackedJobs.map(job => (
              <TrackedJobCard key={job.id} job={job} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <p className={clsx(darkMode ? 'text-gray-400' : 'text-gray-600')}>
            You haven&apos;t tracked any job applications yet.
          </p>
        )}
      </div>

      {/* Settings & Privacy Section - Placeholder */}
      <div className={clsx("mt-8 rounded-3xl shadow-xl p-8", darkMode ? "bg-gray-800" : "bg-white")}>
        <h2 className={clsx('text-2xl font-semibold mb-6 flex items-center', darkMode ? 'text-white' : 'text-gray-900')}>
          <Settings className="w-6 h-6 mr-3 text-indigo-500" />
          Account Settings
        </h2>
        <div className="space-y-4">
            <button className={clsx("w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center", darkMode ? "hover:bg-gray-700/70" : "hover:bg-gray-100")}>
                <Shield className={clsx("w-5 h-5 mr-3", darkMode ? "text-red-400" : "text-red-600")} />
                <span className={clsx(darkMode ? "text-gray-300" : "text-gray-700")}>Change Password</span>
            </button>
            {/* Добавьте другие настройки */}
        </div>
      </div>
    </div>
  );
};

// Вспомогательный компонент для отображения информации в режиме просмотра
const InfoRow: React.FC<{ label: string; value: React.ReactNode; darkMode: boolean }> = ({ label, value, darkMode }) => (
  <div>
    <p className={clsx("text-sm font-medium", darkMode ? "text-gray-400" : "text-gray-500")}>{label}</p>
    <p className={clsx("text-lg", darkMode ? "text-white" : "text-gray-900")}>{value}</p>
  </div>
);

// Вспомогательный компонент для карточки отслеживаемой вакансии
const TrackedJobCard: React.FC<{ job: TrackedJob; darkMode: boolean }> = ({ job, darkMode }) => (
  <div className={clsx(
    "p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0",
    darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
  )}>
    <div>
      <h3 className={clsx("font-semibold text-lg", darkMode ? "text-white" : "text-gray-900")}>{job.title}</h3>
      <p className={clsx("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>{job.company} - {job.location}</p>
    </div>
    <div className="flex items-center space-x-3">
        <span className={clsx(
            "px-3 py-1 text-xs font-semibold rounded-full capitalize",
            job.status === 'applied' ? (darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700") :
            job.status === 'interested' ? (darkMode ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700") :
            job.status === 'interview' ? (darkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700") :
            (darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-500") // offer, rejected, etc.
        )}>
            {job.status}
        </span>
        <a 
            href={job.originalUrl || '#'} // Используйте реальную ссылку на детали вакансии, если есть
            target="_blank" 
            rel="noopener noreferrer"
            className={clsx("text-sm transition-colors", darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500")}
        >
            View Job
        </a>
    </div>
  </div>
); 