import React, { useState, useEffect } from 'react';
import styles from './CategoryForm.module.css';
import { Category } from '../../types';

interface CategoryFormProps {
  category?: Category; // Optional for edit mode
  onSubmit: (category: Partial<Category>) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
}) => {
  // Form state
  const [name, setName] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState<{
    name?: string;
  }>({});

  // Initialize form with category data if in edit mode
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: { name?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Category name is required';
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
      id: category?.id,
      name: name.trim(),
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {category ? 'Edit Category' : 'Add New Category'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="categoryName" className={styles.label}>
            Category Name*
          </label>
          <input
            id="categoryName"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "nameError" : undefined}
          />
          {errors.name && (
            <div id="nameError" className={styles.error}>
              {errors.name}
            </div>
          )}
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
            {category ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;