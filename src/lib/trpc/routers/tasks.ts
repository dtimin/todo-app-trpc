import { router, publicProcedure } from '../init';
import { PrismaClient } from '../../../../prisma/generated';

import { createTaskSchema, updateTaskSchema, deleteTaskSchema  } from "@/lib/validations/tasks";

const prisma = new PrismaClient();

export const tasksRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.task.findMany({
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }),

  create: publicProcedure
    .input(createTaskSchema)
    .mutation(async ({ input }) => {
      return await prisma.task.create({
        data: {
          name: input.name,
          description: input.description,
          categoryId: input.categoryId,
        },
        include: {
          category: true,
        },
      });
    }),

  update: publicProcedure
    .input(updateTaskSchema)
    .mutation(async ({ input }) => {
      return await prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.data.name,
          description: input.data.description,
          categoryId: input.data.categoryId,
        },
        include: {
          category: true,
        },
      });
    }),

  delete: publicProcedure
    .input(deleteTaskSchema)
    .mutation(async ({ input }) => {
      return await prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});