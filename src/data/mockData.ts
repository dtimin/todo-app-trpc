import { Category, Task } from '../types';

// Current date for timestamps
const now = new Date();

// Sample categories
export const categories: Category[] = [
  {
    id: 1,
    name: 'Work',
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 2,
    name: 'Personal',
    createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    name: 'Shopping',
    isDeleted: false,
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: now, // Today
  },
  {
    id: 4,
    name: 'Health',
    createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 5,
    name: 'Archived',
    createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

// Sample tasks
export const tasks: Task[] = [
  {
    id: 1,
    name: 'Complete project proposal',
    description: 'Finish the draft and send it to the client for review',
    categoryId: 1, // Work
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 2,
    name: 'Schedule team meeting',
    description: 'Coordinate with team members for the weekly sync',
    categoryId: 1, // Work
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: now, // Today
  },
  {
    id: 3,
    name: 'Gym session',
    description: 'Cardio and strength training',
    categoryId: 2, // Personal
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 4,
    name: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables',
    categoryId: 3, // Shopping
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: now, // Today
  },
  {
    id: 5,
    name: 'Doctor appointment',
    description: 'Annual check-up at 2 PM',
    categoryId: 4, // Health
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 6,
    name: 'Read book',
    description: 'Finish the novel by the weekend',
    categoryId: 2, // Personal
    createdAt: now, // Today
    updatedAt: now, // Today
  },
  {
    id: 7,
    name: 'Pay bills',
    description: 'Electricity, water, internet',
    categoryId: 2, // Personal
    createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 8,
    name: 'Buy new shoes',
    description: 'Check the sale at the mall',
    categoryId: 3, // Shopping
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: now, // Today
  },
  {
    id: 9,
    name: 'Prepare presentation',
    description: 'Create slides for the client meeting',
    categoryId: 1, // Work
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: now, // Today
  },
  {
    id: 10,
    name: 'Meditation session',
    description: '15 minutes of mindfulness practice',
    categoryId: 4, // Health
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 11,
    name: 'Task without category',
    description: 'This task does not belong to any category',
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: now, // Today
  },
  {
    id: 12,
    name: 'Old archived task',
    description: 'This task belongs to a soft-deleted category',
    categoryId: 5,
    createdAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

// Add category references to tasks
export const tasksWithCategories: Task[] = tasks.map(task => {
  if (task.categoryId) {
    const category = categories.find(cat => cat.id === task.categoryId);
    return { ...task, category };
  }
  return task;
});

// Add task references to categories
export const categoriesWithTasks: Category[] = categories.map(category => {
  const categoryTasks = tasks.filter(task => task.categoryId === category.id);
  return { ...category, tasks: categoryTasks };
});

// Default export for convenience
export default {
  categories: categoriesWithTasks,
  tasks: tasksWithCategories,
};