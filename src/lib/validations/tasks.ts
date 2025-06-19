import { z } from 'zod';

// Zod validation schemas
export const createTaskSchema = z.object({
	name: z.string().min(1, 'Task name is required'),
	description: z.string().optional(),
	categoryId: z.number().optional(),
});

export const updateTaskSchema = z.object({
	id: z.number(),
	data: z.object({
		name: z.string().min(1, 'Task name is required').optional(),
		description: z.string().optional(),
		categoryId: z.number().nullable().optional(),
	}),
});

export const deleteTaskSchema = z.object({
	id: z.number(),
});