import React from 'react';

import { Task, Category, TodoListProps } from '@/types';

import styles from './TodoList.module.css';

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  categories,
  selectedCategoryId,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  // Filter tasks based on selected category
  const filteredTasks = selectedCategoryId
    ? tasks.filter(task => task.categoryId === selectedCategoryId)
    : tasks;

  // Sort tasks by updatedAt timestamp (newest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  // Get category name for the header
  const categoryName = selectedCategoryId
    ? categories.find(cat => cat.id === selectedCategoryId)?.name
    : 'All Tasks';

  // Get category name for a task
  const getCategoryName = (task: Task): string => {
    if (!task.categoryId) return "No Category";
    const category = categories.find(cat => cat.id === task.categoryId);
    return category?.name || "Unknown Category";
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <h1 className={styles.title}>{categoryName}</h1>
        <button
          className={styles.addButton}
          onClick={onAddTask}
          aria-label="Add task"
        >
          + Add Task
        </button>
      </div>

      {sortedTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No tasks found. Click "Add Task" to create one.</p>
        </div>
      ) : (
        <ul className={styles.taskList}>
          {sortedTasks.map(task => {
            return (
              <li key={task.id} className={styles.taskItem}>
                <div className={styles.taskHeader}>
                  <h3 className={styles.taskName}>{task.name}</h3>
                  <div className={styles.taskActions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => onEditTask(task.id)}
                      aria-label={`Edit ${task.name}`}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => onDeleteTask(task.id)}
                      aria-label={`Delete ${task.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p className={styles.taskDescription}>{task.description}</p>
                )}

                <div className={styles.taskMeta}>
                  <span className={styles.taskCategory}>
                    {getCategoryName(task)}
                  </span>
                  <span className={styles.taskDate}>
                    Updated {formatDate(task.updatedAt)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
