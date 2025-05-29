export interface JobLocation {
  country: string;
  city: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string; // Например, "Vienna, Austria"
  salary: string; // Например, "€60,000 - €80,000 per year" или "Competitive"
  postedDate: string; // Дата публикации в формате YYYY-MM-DD
  matchScore: number; // Процент совпадения с профилем пользователя (0-100)
  
  experience: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Internship' | string; // Уровень опыта
  language: 'English' | 'German' | 'Bilingual' | string; // Требуемый язык
  area: 'IT' | 'Marketing' | 'Finance' | 'Design' | 'Sales' | 'HR' | 'Data Science' | string; // Область деятельности
  
  isNew?: boolean; // Флаг новой вакансии
  isRemote?: boolean; // Флаг удаленной работы
  trending?: boolean; // Флаг трендовой вакансии (если используется)
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'; // Тип занятости
  isActive?: boolean; // Флаг активной вакансии

  skills?: string[]; // Список требуемых навыков (например, ['React', 'Node.js', 'AWS'])
  
  shortDescription: string; // Краткое описание вакансии для карточки
  fullDescription: string; // Полное описание вакансии (может содержать HTML)
  
  perks?: string[]; // Список преимуществ и бонусов (например, ['Health insurance', 'Gym membership'])
  aiInsights?: string; // "Умные" подсказки от AI по вакансии
  originalUrl?: string; // Ссылка на оригинальное объявление о вакансии
} 