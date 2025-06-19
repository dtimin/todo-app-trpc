import React, { useState } from 'react';

import { Category, CategorySidebarProps } from '@/types';

import styles from './CategorySidebar.module.css';

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
}) => {

  // Handle category selection
  const handleCategoryClick = (categoryId: number) => {
    onSelectCategory(selectedCategoryId === categoryId ? null : categoryId);
  };

  // Handle "All Tasks" selection
  const handleAllTasksClick = () => {
    onSelectCategory(null);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <button 
          className={styles.addButton}
          onClick={onAddCategory}
          aria-label="Add category"
        >
          + Add
        </button>
      </div>

      <ul className={styles.categoryList}>
        {/* All Tasks option */}
        <li 
          className={`${styles.categoryItem} ${selectedCategoryId === null ? styles.active : ''}`}
          onClick={handleAllTasksClick}
        >
          <span className={styles.categoryName}>All Tasks</span>
        </li>

        {/* Category list */}
        {categories.map((category) => {
          const taskCount = category.tasks?.length || 0;

          return (
            <li 
              key={category.id}
              className={`
                ${styles.categoryItem} 
                ${selectedCategoryId === category.id ? styles.active : ''}
              `}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categoryCount}>{taskCount}</span>
              <button 
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCategory(category.id);
                }}
                aria-label={`Delete ${category.name} category`}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySidebar;
