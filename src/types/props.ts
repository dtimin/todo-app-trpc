import {Category, Task} from "./data";

export interface TodoListProps {
  tasks: Task[];
  categories: Category[];
  selectedCategoryId: number | null;
  onAddTask: () => void;
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

export interface TaskFormProps {
  task?: Task | null;
  categories: Category[];
  onSubmit: (task: Partial<Task>) => void;
  onCancel: () => void;
}

export interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (category: Partial<Category>) => void;
  onCancel: () => void;
}

export interface CategorySidebarProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  onAddCategory: () => void;
  onDeleteCategory: (categoryId: number) => void;
}
