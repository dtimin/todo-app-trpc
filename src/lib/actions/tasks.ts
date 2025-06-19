'use server';

import { PrismaClient } from '../../../prisma/generated';

import { Task } from '@/types';

const prisma = new PrismaClient();

// Get all tasks
export async function getAllTasks(): Promise<{ success: boolean; data?: Task[]; error?: string }> {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    
    return { success: true, data: tasks as Task[] };
  } catch (error) {
    console.error('Error fetching tasks:', error);

    return { success: false, error: 'Failed to fetch tasks' };
  }
}

// Create a new task
export async function createTask(
  data: { name: string; description?: string; categoryId?: number }
): Promise<{ success: boolean; data?: Task; error?: string }> {
  try {
    const task = await prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
      },
    });

    return { success: true, data: task as Task };
  } catch (error) {
    console.error('Error creating task:', error);

    return { success: false, error: 'Failed to create task' };
  }
}

// Update a task
export async function updateTask(
  id: number,
  data: { name?: string; description?: string; categoryId?: number | null }
): Promise<{ success: boolean; data?: Task; error?: string }> {
  try {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
      },
    });

    return { success: true, data: task as Task };
  } catch (error) {
    console.error('Error updating task:', error);

    return { success: false, error: 'Failed to update task' };
  }
}

// Delete a task
export async function deleteTask(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.task.delete({
      where: {
        id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);

    return { success: false, error: 'Failed to delete task' };
  }
}