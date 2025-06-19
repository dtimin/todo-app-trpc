'use server';

import { PrismaClient } from '../../../prisma/generated';

import { Category } from '@/types';

const prisma = new PrismaClient();

// Get all categories
export async function getCategories(): Promise<{ success: boolean; data?: Category[]; error?: string }> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return { success: true, data: categories as Category[] };
  } catch (error) {
    console.error('Error fetching categories:', error);

    return { success: false, error: 'Failed to fetch categories' };
  }
}

// Create a new category
export async function createCategory(
  data: { name: string }
): Promise<{ success: boolean; data?: Category; error?: string }> {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    });

    return { success: true, data: category as Category };
  } catch (error) {
    console.error('Error creating category:', error);

    return { success: false, error: 'Failed to create category' };
  }
}

// Delete a category
export async function deleteCategory(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    // First, update all tasks that reference this category to remove the reference
    await prisma.task.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        categoryId: null,
      },
    });
    
    // Then delete the category
    await prisma.category.delete({
      where: {
        id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);

    return { success: false, error: 'Failed to delete category' };
  }
}