export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  categoryId?: number; // foreign key to Category
  createdAt: Date;
  updatedAt: Date;
}

// Extended interfaces
export interface TaskWithCategory extends Task {
  category?: Category;
}

export interface CategoryWithTasks extends Category {
  tasks?: Task[];
}
