'use client';

import { useState } from 'react';

import CategorySidebar from '../components/CategorySidebar/CategorySidebar';
import TodoList from '../components/TodoList/TodoList';
import TaskForm from '../components/TaskForm/TaskForm';
import CategoryForm from '../components/CategoryForm/CategoryForm';

import { Task, Category } from '@/types';
import { 
  useCategories, 
  useAllTasks, 
  useCreateCategory, 
  useDeleteCategory, 
  useCreateTask, 
  useUpdateTask, 
  useDeleteTask 
} from '@/hooks/useQueries';

import styles from './page.module.css';

export default function Home() {
  // Fetch data using TanStack Query
  const { data: categories = [], isLoading: isLoadingCategories, error: categoriesError } = useCategories();
  const { data: tasks = [], isLoading: isLoadingTasks, error: tasksError } = useAllTasks();

  // Mutations
  const createCategoryMutation = useCreateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // State for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // State for forms
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  // Handler for adding a new task
  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowTaskForm(true);
  };

  // Handler for editing a task
  const handleEditTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowTaskForm(true);
    }
  };

  // Handler for deleting a task
  const handleDeleteTask = (taskId: number) => {
    deleteTaskMutation.mutate(taskId);
  };

  // Handler for submitting a task form
  const handleTaskSubmit = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      updateTaskMutation.mutate({
        id: editingTask.id,
        data: {
          name: taskData.name,
          description: taskData.description,
          categoryId: taskData.categoryId,
        }
      });
    } else {
      // Add new task
      createTaskMutation.mutate({
        name: taskData.name || '',
        description: taskData.description,
        categoryId: taskData.categoryId,
      });
    }
    setShowTaskForm(false);
  };

  // Handler for adding a new category
  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setShowCategoryForm(true);
  };

  // Handler for deleting a category
  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate(categoryId);
  };

  // Handler for submitting a category form
  const handleCategorySubmit = (categoryData: Partial<Category>) => {
    createCategoryMutation.mutate({
      name: categoryData.name || '',
    });
    setShowCategoryForm(false);
  };

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
            <p>Error: {(categoriesError as Error)?.message || (tasksError as Error)?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        <CategorySidebar 
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' }}>
          {showTaskForm && (
            <TaskForm 
              task={editingTask}
              categories={categories}
              onSubmit={handleTaskSubmit}
              onCancel={() => setShowTaskForm(false)}
            />
          )}

          {showCategoryForm && (
            <CategoryForm 
              category={editingCategory}
              onSubmit={handleCategorySubmit}
              onCancel={() => setShowCategoryForm(false)}
            />
          )}

          <TodoList 
            tasks={tasks}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}
