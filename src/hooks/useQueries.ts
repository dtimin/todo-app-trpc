'use client';

import { api } from '@/lib/trpc/client';

// Query hooks
export function useCategories() {
  return api.categories.getAll.useQuery(undefined, {
    select: (data) => data ?? [],
  });
}

export function useAllTasks() {
  return api.tasks.getAll.useQuery(undefined, {
    select: (data) => data ?? [],
  });
}

// Mutation hooks
export function useCreateCategory() {
  const utils = api.useUtils();

  return api.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      utils.tasks.getAll.invalidate(); // Also invalidating tasks since they include category data
    },
  });
}

export function useDeleteCategory() {
  const utils = api.useUtils();

  return api.categories.delete.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      utils.tasks.getAll.invalidate(); // Tasks might be affected
    },
  });
}

export function useCreateTask() {
  const utils = api.useUtils();

  return api.tasks.create.useMutation({
    onSuccess: () => {
      // Invalidate tasks list to refetch
      utils.tasks.getAll.invalidate();
    },
  });
}

export function useUpdateTask() {
  const utils = api.useUtils();

  return api.tasks.update.useMutation({
    onSuccess: () => {
      utils.tasks.getAll.invalidate();
    },
  });
}

export function useDeleteTask() {
  const utils = api.useUtils();

  return api.tasks.delete.useMutation({
    onSuccess: () => {
      utils.tasks.getAll.invalidate();
    },
  });
}
