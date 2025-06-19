import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

import type { AppRouter } from './root';

export const api = createTRPCReact<AppRouter>();

export const getClientConfig = () => ({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
});