import { z } from 'zod';

export const createCategorySchema = z.object({
	name: z.string().min(1, 'Category name is required'),
});

export const deleteCategorySchema = z.object({
	id: z.number(),
});