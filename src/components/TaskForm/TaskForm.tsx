import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';
import { Task, Category, TaskFormProps } from '@/types';

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  categories,
  onSubmit,
  onCancel,
}) => {
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  // Validation state
  const [errors, setErrors] = useState<{
    name?: string;
  }>({});

  // Initialize form with task data if in edit mode
  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || '');
      setCategoryId(task.categoryId);
    }
  }, [task]);

  // Use all categories
  const activeCategories = categories;

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: { name?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Task name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      id: task?.id,
      name: name.trim(),
      description: description.trim() || undefined,
      categoryId: categoryId || undefined,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {task ? 'Edit Task' : 'Add New Task'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="taskName" className={styles.label}>
            Task Name*
          </label>
          <input
            id="taskName"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "nameError" : undefined}
          />
          {errors.name && (
            <div id="nameError" className={styles.error}>
              {errors.name}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="taskDescription" className={styles.label}>
            Description
          </label>
          <textarea
            id="taskDescription"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="taskCategory" className={styles.label}>
            Category
          </label>
          <select
            id="taskCategory"
            className={styles.select}
            value={categoryId || ''}
            onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">No Category</option>
            {activeCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
