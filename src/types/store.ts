import { Task, Category } from './data';

// UI State types
export interface ModalState {
  createTask: boolean;
  editTask: boolean;
  createCategory: boolean;
}

// Filter State types
export interface FilterState {
  categoryId: number | null;
  showCompleted: boolean;
  searchQuery: string;
}

// Store State
export interface AppStore {
  // UI State
  modals: ModalState;
  
  // Editing State  
  editingTask: Task | null;
  editingCategory: Category | null;
  
  // Filter State
  filters: FilterState;
  
  // Actions
  actions: {
    // Modal actions
    openCreateTaskModal: () => void;
    closeCreateTaskModal: () => void;
    openEditTaskModal: () => void;
    closeEditTaskModal: () => void;
    openCreateCategoryModal: () => void;
    closeCreateCategoryModal: () => void;
    
    // Editing actions
    setEditingTask: (task: Task | null) => void;
    setEditingCategory: (category: Category | null) => void;
    
    // Filter actions
    setCategoryFilter: (categoryId: number | null) => void;
    setShowCompleted: (show: boolean) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
  };
}
