import { router } from './init';
import { tasksRouter } from './routers/tasks';
import { categoriesRouter } from './routers/categories';

// Combine all routers
export const appRouter = router({
  tasks: tasksRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;