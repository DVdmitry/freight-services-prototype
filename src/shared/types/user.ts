// import { JobLocation } from '@/shared/types/job'; // Удаляем неиспользуемый импорт

// Для вложенных объектов в User, можно определить отдельные интерфейсы для лучшей организации
interface UserNotificationPreferences {
  newJobs: boolean;
  applicationUpdates: boolean;
  aiRecommendations: boolean;
  // ... другие типы уведомлений
}

interface UserJobSearchPreferences {
  defaultLocation: string;
  preferredRoles: string[];
  salaryExpectation: string; // Может быть диапазоном или конкретным числом
  // ... другие настройки поиска
}

interface UserPreferences {
  darkMode: boolean;
  notifications: UserNotificationPreferences;
  jobSearch: UserJobSearchPreferences;
  // ... другие общие предпочтения
}

interface UserExperienceEntry {
  title: string;
  company: string;
  period: string; // Например, "Jan 2020 - Dec 2022" или "2020 - Present"
  description?: string; // Описание обязанностей или достижений
}

interface UserEducationEntry {
  degree: string;
  institution: string;
  period: string;
  fieldOfStudy?: string;
}

export interface User {
  id: string; // Уникальный идентификатор пользователя
  email: string;
  name: string;
  avatar: string; // URL к аватару пользователя
  
  profileScore: number; // Процент заполненности/релевантности профиля (0-100)
  isPremium: boolean; // Флаг премиум-подписки
  isAdmin: boolean; // Флаг администратора

  preferences: UserPreferences; // Настройки пользователя

  // Опциональные поля, которые пользователь может заполнить для улучшения профиля
  bio?: string; // Краткое описание о себе
  resumeUrl?: string; // Ссылка на загруженное резюме
  linkedInProfile?: string; // Ссылка на профиль LinkedIn
  gitHubProfile?: string; // Ссылка на профиль GitHub
  
  skills?: string[]; // Список навыков пользователя
  experience?: UserExperienceEntry[]; // Опыт работы
  education?: UserEducationEntry[]; // Образование

  // Можно добавить поля, связанные с активностью пользователя:
  // lastLogin?: string; // Дата последнего входа
  // createdAt?: string; // Дата создания аккаунта
  // trackedJobIds?: number[]; // ID отслеживаемых вакансий
} 