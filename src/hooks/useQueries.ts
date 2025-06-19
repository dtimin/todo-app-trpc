'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getCategories, 
  createCategory, 
  deleteCategory, 
  getAllTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '@/lib/actions';
import { Category, Task } from '@/types';

// Query keys
const QUERY_KEYS = {
  categories: 'categories',
  tasks: 'tasks',
};

// Query hooks
export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: async () => {
      const result = await getCategories();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch categories');
      }
      return result.data || [];
    },
  });
}

export function useAllTasks() {
  return useQuery({
    queryKey: [QUERY_KEYS.tasks],
    queryFn: async () => {
      const result = await getAllTasks();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch tasks');
      }
      return result.data || [];
    },
  });
}

// Mutation hooks
export function useCreateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { name: string }) => {
      const result = await createCategory(data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to create category');
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await deleteCategory(id);
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete category');
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { name: string; description?: string; categoryId?: number }) => {
      const result = await createTask(data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to create task');
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { name?: string; description?: string; categoryId?: number | null } }) => {
      const result = await updateTask(id, data);
      if (!result.success) {
        throw new Error(result.error || 'Failed to update task');
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await deleteTask(id);
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete task');
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });
}