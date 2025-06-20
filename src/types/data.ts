import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@/lib/trpc/root';

// Infer types from tRPC router
type RouterOutputs = inferRouterOutputs<AppRouter>;
type RouterInputs = inferRouterInputs<AppRouter>;

// Main entity types
export type Category = RouterOutputs['categories']['getAll'][number];
export type Task = RouterOutputs['tasks']['getAll'][number];
