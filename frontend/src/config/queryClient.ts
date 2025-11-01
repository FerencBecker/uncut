import { QueryCache, QueryClient } from '@tanstack/react-query';

export const createQueryClient = (onError: (error: Error) => void) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // No retry for localhost backend
        refetchOnWindowFocus: false, // Kiosk mode doesn't need refetch
        staleTime: Infinity, // Data never goes stale in kiosk
      },
      mutations: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: error => {
        console.error('[React Query Error]', error);
        onError(error);
      },
    }),
  });
