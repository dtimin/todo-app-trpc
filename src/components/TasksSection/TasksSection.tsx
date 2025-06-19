'use client';

import { useMemo } from 'react';
import { Task, Category } from '@/types';
import TodoList from '../TodoList/TodoList';
import TaskForm from '../TaskForm/TaskForm';
import { 
  useCreateTask, 
  useUpdateTask, 
  useDeleteTask 
} from '@/hooks/useQueries';
import { 
  useModals, 
  useEditingTask, 
  useFilters
} from '@/lib/store/useAppStore';
import { useTaskWorkflow } from '@/hooks/useWorkflows';

interface TasksSectionProps {
  tasks: Task[];
  categories: Category[];
}

export default function TasksSection({ tasks, categories }: TasksSectionProps) {
  // Get store state and actions
  const filters = useFilters();

  // Filter and sort tasks using useMemo
  const filteredTasks = useMemo(() => {
    // Apply filters
    const filtered = tasks.filter(task => {
      // Filter by category
      if (filters.categoryId !== null && task.categoryId !== filters.categoryId) {
        return false;
      }

      // Filter by search query
      if (filters.searchQuery && !task.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Sort by updatedAt (newest first)
    return filtered.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [tasks, filters.categoryId, filters.searchQuery]);

  // Mutations
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Get store state and actions
  const modals = useModals();
  const editingTask = useEditingTask();
  const { startAddingTask, startEditingTask, finishTaskOperation } = useTaskWorkflow();

  // Handler for deleting a task
  const handleDeleteTask = (taskId: number) => {
    deleteTaskMutation.mutate({ id: taskId });
  };

  // Handler for submitting a task form
  const handleTaskSubmit = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      updateTaskMutation.mutate({
        id: editingTask.id,
        data: {
          name: taskData.name,
          description: taskData.description || undefined,
          categoryId: taskData.categoryId,
        }
      });
    } else {
      // Add new task
      createTaskMutation.mutate({
        name: taskData.name || '',
        description: taskData.description || undefined,
        categoryId: taskData.categoryId || undefined,
      });
    }
    finishTaskOperation();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' }}>
      {modals.createTask && (
        <TaskForm 
          task={undefined}
          categories={categories}
          onSubmit={handleTaskSubmit}
          onCancel={finishTaskOperation}
        />
      )}

      {modals.editTask && editingTask && (
        <TaskForm 
          task={editingTask}
          categories={categories}
          onSubmit={handleTaskSubmit}
          onCancel={finishTaskOperation}
        />
      )}

      <TodoList 
        tasks={filteredTasks}
        categories={categories}
        selectedCategoryId={filters.categoryId}
        onAddTask={startAddingTask}
        onEditTask={(taskId) => {
          const task = tasks.find(t => t.id === taskId);
          if (task) startEditingTask(task);
        }}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
