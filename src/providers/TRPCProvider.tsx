'use client';

import { QueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { api, getClientConfig } from '@/lib/trpc/client';

interface TRPCProviderProps {
  children: ReactNode;
}

export default function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: parseInt(process.env.NEXT_PUBLIC_QUERY_STALE_TIME || '60000'),
        refetchOnWindowFocus: process.env.NEXT_PUBLIC_QUERY_REFETCH_ON_WINDOW_FOCUS === 'true',
      },
    },
  }));

  const [trpcClient] = useState(() => api.createClient(getClientConfig()));

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </api.Provider>
  );
}