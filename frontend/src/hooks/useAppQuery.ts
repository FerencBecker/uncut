import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';

type UseAppQueryOptions<TQueryFnData, TError, TData> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData>,
  'queryKey' | 'queryFn'
> & {
  queryKey: string[];
  queryFn: () => Promise<TQueryFnData>;
};

export const useAppQuery = <TQueryFnData = unknown, TError = Error, TData = TQueryFnData>(
  options: UseAppQueryOptions<TQueryFnData, TError, TData>
) => {
  const { placeholderData, select } = options;
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error } = useQuery<TQueryFnData, TError, TData>(options);

  const reload = () => {
    queryClient.invalidateQueries({
      queryKey: options.queryKey,
      exact: true,
    });
  };

  const response = data ?? select?.(placeholderData as TQueryFnData) ?? (placeholderData as TData);

  return [response, isLoading || isFetching, error, reload] as const;
};
