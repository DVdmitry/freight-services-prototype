import { useState, useCallback, useMemo } from 'react';
import type { Job } from '@/shared/types/job';

export interface Filters {
  experience: string;
  language: string;
  area: string;
  // status: string; // Этот фильтр не используется в useEffect в вашем OLD_CODE для фильтрации jobs
  salary: string;
  remote: boolean;
  // searchTerm: string; // Для текстового поиска, если потребуется
}

const initialFilters: Filters = {
  experience: '',
  language: '',
  area: '',
  // status: '',
  salary: '',
  remote: false,
  // searchTerm: '',
};

export const useFilters = (initialJobs: Job[]) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [allJobs, setAllJobs] = useState<Job[]>(initialJobs); // Сохраняем исходный список вакансий

  // Обновление фильтров
  const updateFilter = useCallback(<K extends keyof Filters>(filterName: K, value: Filters[K]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }, []);

  // Сброс всех фильтров
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  // Фильтрация вакансий
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      if (filters.experience && job.experience !== filters.experience) return false;
      if (filters.language && job.language !== filters.language) return false;
      if (filters.area && job.area !== filters.area) return false;
      // Добавить фильтрацию по зарплате и remote, если необходимо,
      // основываясь на том, как эти значения будут представлены (например, salary '50-80' -> min: 50000, max: 80000)
      // if (filters.remote && !job.isRemote) return false; // Предполагая, что у Job есть поле isRemote
      return true;
    });
  }, [allJobs, filters]);
  
  // Если вам нужно обновлять allJobs извне (например, при загрузке новых данных)
  const setJobs = useCallback((jobs: Job[]) => {
    setAllJobs(jobs);
  }, []);


  return {
    filters,
    filteredJobs,
    updateFilter,
    resetFilters,
    setJobs, // Если необходимо обновлять исходный список вакансий
  };
}; 