'use client';

import { useCallback } from 'react';
import { Task, Category } from '@/types/data';
import { useActions } from '@/lib/store/useAppStore';

/**
 * Custom hook for task-related workflow operations
 */
export const useTaskWorkflow = () => {
  const { openCreateTaskModal, openEditTaskModal, closeCreateTaskModal, closeEditTaskModal, setEditingTask } = useActions();
  
  const startAddingTask = useCallback(() => {
    setEditingTask(null);
    openCreateTaskModal();
  }, [setEditingTask, openCreateTaskModal]);
  
  const startEditingTask = useCallback((task: Task) => {
    setEditingTask(task);
    openEditTaskModal();
  }, [setEditingTask, openEditTaskModal]);
  
  const finishTaskOperation = useCallback(() => {
    setEditingTask(null);
    closeCreateTaskModal();
    closeEditTaskModal();
  }, [setEditingTask, closeCreateTaskModal, closeEditTaskModal]);
  
  return { startAddingTask, startEditingTask, finishTaskOperation };
};

/**
 * Custom hook for category-related workflow operations
 */
export const useCategoryWorkflow = () => {
  const { openCreateCategoryModal, closeCreateCategoryModal, setEditingCategory } = useActions();
  
  const startAddingCategory = useCallback(() => {
    setEditingCategory(null);
    openCreateCategoryModal();
  }, [setEditingCategory, openCreateCategoryModal]);
  
  const finishCategoryOperation = useCallback(() => {
    setEditingCategory(null);
    closeCreateCategoryModal();
  }, [setEditingCategory, closeCreateCategoryModal]);
  
  return { startAddingCategory, finishCategoryOperation };
};