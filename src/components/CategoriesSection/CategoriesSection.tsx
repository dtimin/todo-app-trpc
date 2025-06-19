'use client';

import { Category } from '@/types';
import CategorySidebar from '../CategorySidebar/CategorySidebar';
import CategoryForm from '../CategoryForm/CategoryForm';
import { 
  useCreateCategory, 
  useDeleteCategory 
} from '@/hooks/useQueries';
import { 
  useModals, 
  useEditingCategory, 
  useFilters, 
  useActions
} from '@/lib/store/useAppStore';
import { useCategoryWorkflow } from '@/hooks/useWorkflows';
import styles from './CategoriesSection.module.css';

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Mutations
  const createCategoryMutation = useCreateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Get store state and actions
  const modals = useModals();
  const editingCategory = useEditingCategory();
  const filters = useFilters();
  const { setCategoryFilter } = useActions();
  const { startAddingCategory, finishCategoryOperation } = useCategoryWorkflow();

  // Handler for deleting a category
  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate({ id: categoryId });
  };

  // Handler for submitting a category form
  const handleCategorySubmit = (categoryData: Partial<Category>) => {
    createCategoryMutation.mutate({
      name: categoryData.name || '',
    });
    finishCategoryOperation();
  };

  return (
    <div className={styles.categoriesContainer}>
      <CategorySidebar 
        categories={categories}
        selectedCategoryId={filters.categoryId}
        onSelectCategory={setCategoryFilter}
        onAddCategory={startAddingCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {modals.createCategory && (
        <div className={styles.formOverlay}>
          <CategoryForm 
            category={editingCategory}
            onSubmit={handleCategorySubmit}
            onCancel={finishCategoryOperation}
          />
        </div>
      )}
    </div>
  );
}
