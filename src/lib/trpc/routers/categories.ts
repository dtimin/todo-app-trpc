import { router, publicProcedure } from '../init';
import { PrismaClient } from '../../../../prisma/generated';

import { createCategorySchema, deleteCategorySchema } from "@/lib/validations/categories";

const prisma = new PrismaClient();

export const categoriesRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.category.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }),

  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ input }) => {
      return await prisma.category.create({
        data: {
          name: input.name,
        },
      });
    }),

  delete: publicProcedure
    .input(deleteCategorySchema)
    .mutation(async ({ input }) => {
      // Using transaction for consistency
      return await prisma.$transaction(async (tx) => {
        await tx.task.updateMany({
          where: {
            categoryId: input.id,
          },
          data: {
            categoryId: null,
          },
        });

        return await tx.category.delete({
          where: {
            id: input.id,
          },
        });
      });
    }),
});