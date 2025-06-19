'use client';

import { useState } from 'react';

import CategorySidebar from '../components/CategorySidebar/CategorySidebar';
import TodoList from '../components/TodoList/TodoList';
import TaskForm from '../components/TaskForm/TaskForm';
import CategoryForm from '../components/CategoryForm/CategoryForm';
import mockData from '../data/mockData';

import { Task, Category } from '@/types';

import styles from './page.module.css';

export default function Home() {
  // State for categories and tasks
  const [categories, setCategories] = useState<Category[]>(mockData.categories);
  const [tasks, setTasks] = useState<Task[]>(mockData.tasks);

  // State for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // State for forms
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  // State for showing deleted categories
  const [showDeleted, setShowDeleted] = useState(false);

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
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handler for submitting a task form
  const handleTaskSubmit = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData, updatedAt: new Date() } 
          : task
      ));
    } else {
      // Add new task
      const newTask: Task = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1,
        name: taskData.name || '',
        description: taskData.description,
        categoryId: taskData.categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks([...tasks, newTask]);
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
    // Remove category reference from tasks (set to null/undefined)
    setTasks(tasks.map(task =>
      task.categoryId === categoryId
        ? { ...task, categoryId: undefined, updatedAt: new Date() }
        : task
    ));

    // Actually delete the category (not soft delete)
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  // Helper function for UI
  const getCategoryName = (task: Task): string => {
    if (!task.categoryId) return "No Category";
    const category = categories.find(c => c.id === task.categoryId);
    return category?.name || "Unknown Category";
  };

  // Handler for submitting a category form
  const handleCategorySubmit = (categoryData: Partial<Category>) => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(category => 
        category.id === editingCategory.id 
          ? { ...category, ...categoryData, updatedAt: new Date() } 
          : category
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.max(0, ...categories.map(c => c.id)) + 1,
        name: categoryData.name || '',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCategories([...categories, newCategory]);
    }
    setShowCategoryForm(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        <CategorySidebar 
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          showDeleted={showDeleted}
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
