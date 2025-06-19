'use client';

import TasksSection from '../components/TasksSection/TasksSection';
import CategoriesSection from '../components/CategoriesSection/CategoriesSection';

import { 
  useCategories, 
  useAllTasks
} from '@/hooks/useQueries';

import styles from './page.module.css';

export default function Home() {
  // Fetch Categories and Tasks
  const { data: categories = [], isLoading: isLoadingCategories, error: categoriesError } = useCategories();
  const { data: tasks = [], isLoading: isLoadingTasks, error: tasksError } = useAllTasks();

  // Loading state
  if (isLoadingCategories || isLoadingTasks) {
    return (
      <div className={styles.page}>
        <div className={styles.mainContainer}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (categoriesError || tasksError) {
    return (
      <div className={styles.page}>
        <div className={styles.mainContainer}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Error: {(categoriesError?.message || tasksError?.message)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        {/* Categories section */}
        <CategoriesSection categories={categories} />

        {/* Tasks section */}
        <TasksSection 
          tasks={tasks} 
          categories={categories} 
        />
      </div>
    </div>
  );
}
