import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { AuthProvider, useAuthContext } from '@/features/auth/context/AuthContext';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { Navigation } from '@/widgets/navigation/Navigation';
import { JobsPage } from '@/pages/JobsPage';
import { JobDetailPage } from '@/pages/JobDetailPage';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { AdminPage } from '@/pages/AdminPage';

import type { User } from '@/shared/types/user';
import type { Job } from '@/shared/types/job';
import { mockJobs } from '@/shared/mocks/jobs';
import { mockUser, mockAdminUser } from '@/shared/mocks/user'; // Предполагается, что mockAdminUser тоже экспортируется

// Стили App.css можно удалить или очистить, если они не нужны
// import './App.css'; 

// Тип для отслеживаемых вакансий на странице профиля
interface TrackedJob extends Job {
  status: 'interested' | 'applied' | 'interview' | 'offer' | 'rejected';
}

const AppContent: React.FC = () => {
  const { user, isAdmin, login } = useAuthContext();
  const navigate = useNavigate();
  
  // Состояния приложения
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [aiMode, setAiMode] = useState<boolean>(false);
  const [jobStatuses, setJobStatuses] = useState<Record<number, string>>({}); // e.g. { 1: 'applied', 2: 'interested' }

  // Новое состояние для отклоненных вакансий
  const [rejectedJobIds, setRejectedJobIds] = useState<Set<number>>(() => {
    const savedRejected = localStorage.getItem('rejectedJobIds');
    return savedRejected ? new Set(JSON.parse(savedRejected)) : new Set();
  });

  // Моковые данные для AdminPage (замените на реальные, если необходимо)
  const mockStats = { totalUsers: 150, totalJobs: 75, activeJobs: 60, applications: 300 };
  const mockUsersForAdmin: User[] = [mockUser, { ...mockAdminUser, id: 'admin-temp-002', email: 'anotheradmin@example.com' }, { ...mockUser, id: 'user-temp-003', email: 'anotheruser@example.com', name: 'Jane Doe'} ];
  const mockJobsForAdmin: Job[] = mockJobs.slice(0,3);

  // Моковые отслеживаемые вакансии для UserProfilePage
  const mockTrackedJobs: TrackedJob[] = mockJobs.slice(0, 2).map((job, index) => ({
    ...job,
    status: index === 0 ? 'applied' : 'interested',
  }));

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Сохранение rejectedJobIds в localStorage
  useEffect(() => {
    localStorage.setItem('rejectedJobIds', JSON.stringify(Array.from(rejectedJobIds)));
  }, [rejectedJobIds]);

  const handleLogin = (email: string) => {
    login(email);
    navigate('/jobs');
  };

  const handleLogout = () => {
    const authContext = useAuthContext();
    authContext.logout();
    setSelectedJob(null);
    // Очищаем статусы и отклоненные при выходе (опционально, по желанию)
    // setJobStatuses({}); 
    // setRejectedJobIds(new Set());
    // localStorage.removeItem('rejectedJobIds');
  };
  
  const navigateToJobDetail = (job: Job) => {
    // Не даем перейти на детали, если вакансия отклонена
    if (rejectedJobIds.has(job.id)) return;
    setSelectedJob(job);
    navigate(`/job/${job.id}`);
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    navigate('/jobs');
  };
  
  // Оборачиваем updateJobStatus в useCallback
  const updateJobStatus = useCallback((jobId: number, status: string) => {
    if (status === 'rejected') {
      setRejectedJobIds(prevIds => {
        const newIds = new Set(prevIds);
        newIds.add(jobId);
        return newIds;
      });
      // Если мы на странице деталей этой вакансии, переходим на список
      if (selectedJob?.id === jobId) {
        handleBackToJobs();
      }
    } else {
      setJobStatuses(prev => ({ ...prev, [jobId]: status }));
    }
  }, [selectedJob, handleBackToJobs]);

  const handleUpdateProfile = (updatedUser: Partial<User>) => {
    console.log('Profile updated:', updatedUser);
  };

  // Фильтруем вакансии для JobsPage
  const availableJobs = mockJobs.filter(job => !rejectedJobIds.has(job.id));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className={clsx('flex flex-col min-h-screen', darkMode ? 'dark bg-gray-900' : 'bg-gray-100')}>
      <Navigation
        user={user}
        navigate={navigate}
        handleLogout={handleLogout}
        isAdmin={isAdmin}
        aiMode={aiMode}
        setAiMode={setAiMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route
            path="/jobs"
            element={(
              <JobsPage
                jobs={availableJobs} // <--- Передаем отфильтрованные вакансии
                darkMode={darkMode}
                aiMode={aiMode}
                navigateToJobDetail={navigateToJobDetail}
                jobStatuses={jobStatuses}
                // updateJobStatus={updateJobStatus} // Передаем, если нужно менять статусы прямо со страницы списка
              />
            )}
          />
          <Route
            path="/job/:jobId"
            element={
              selectedJob && !rejectedJobIds.has(selectedJob.id) ? ( // Доп. проверка на rejected
                <JobDetailPage
                  selectedJob={selectedJob}
                  darkMode={darkMode}
                  aiMode={aiMode}
                  jobStatuses={jobStatuses}
                  updateJobStatus={updateJobStatus}
                  onBackToJobs={handleBackToJobs}
                />
              ) : (
                <Navigate to="/jobs" replace />
              )
            }
          />
           <Route
            path="/profile"
            element={
              <UserProfilePage
                user={user}
                darkMode={darkMode}
                onUpdateProfile={handleUpdateProfile}
                trackedJobs={mockTrackedJobs}
              />
            }
          />
          {isAdmin && (
            <Route
              path="/admin"
              element={
                <AdminPage
                  darkMode={darkMode}
                  users={mockUsersForAdmin}
                  jobs={mockJobsForAdmin}
                  stats={mockStats}
                />
              }
            />
          )}
          {/* Можно добавить Route для /matched и /blog, если это отдельные страницы */}
          {/* <Route path="/matched" element={<AiMatchesPage ... />} /> */}
          {/* <Route path="/blog" element={<BlogPage ... />} /> */}

          {/* Заглушка для ненайденных роутов или редирект */}
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </main>
      {/* Здесь можно добавить футер, если он нужен */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
