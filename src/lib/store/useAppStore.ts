'use client';

import { create } from 'zustand';
import { AppStore, ModalState, FilterState } from '@/types/store';
import { Task, Category } from '@/types/data';

// Initial state
const initialModalState: ModalState = {
  createTask: false,
  editTask: false,
  createCategory: false,
};

const initialFilterState: FilterState = {
  categoryId: null,
  showCompleted: true,
  searchQuery: '',
};

// Create the store
export const useAppStore = create<AppStore>((set) => ({
  // UI State
  modals: initialModalState,

  // Editing State
  editingTask: null,
  editingCategory: null,

  // Filter State
  filters: initialFilterState,

  // Actions
  actions: {
    // Modal actions
    openCreateTaskModal: () => set((state) => ({
      modals: { ...state.modals, createTask: true }
    })),
    closeCreateTaskModal: () => set((state) => ({
      modals: { ...state.modals, createTask: false }
    })),
    openEditTaskModal: () => set((state) => ({
      modals: { ...state.modals, editTask: true }
    })),
    closeEditTaskModal: () => set((state) => ({
      modals: { ...state.modals, editTask: false }
    })),
    openCreateCategoryModal: () => set((state) => ({
      modals: { ...state.modals, createCategory: true }
    })),
    closeCreateCategoryModal: () => set((state) => ({
      modals: { ...state.modals, createCategory: false }
    })),

    // Editing actions
    setEditingTask: (task: Task | null) => set(() => ({
      editingTask: task
    })),
    setEditingCategory: (category: Category | null) => set(() => ({
      editingCategory: category
    })),

    // Filter actions
    setCategoryFilter: (categoryId: number | null) => set((state) => ({
      filters: { ...state.filters, categoryId }
    })),
    setShowCompleted: (show: boolean) => set((state) => ({
      filters: { ...state.filters, showCompleted: show }
    })),
    setSearchQuery: (query: string) => set((state) => ({
      filters: { ...state.filters, searchQuery: query }
    })),
    resetFilters: () => set(() => ({
      filters: initialFilterState
    })),
  },
}));

// Convenience selectors
export const useModals = () => useAppStore((state) => state.modals);
export const useEditingTask = () => useAppStore((state) => state.editingTask);
export const useEditingCategory = () => useAppStore((state) => state.editingCategory);
export const useFilters = () => useAppStore((state) => state.filters);
export const useActions = () => useAppStore((state) => state.actions);
