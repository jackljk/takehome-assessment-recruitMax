import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentSportAPI, getUserSportSubscriptionAPI, getAllSupportedSportsAPI, setCurrentSportAPI, addSportAPI, deleteSportAPI, type Sport } from '@/api/sports';


export const sportsKeys = {
  all: ['sports'] as const,
  subscriptions: () => [...sportsKeys.all, 'subscriptions'] as const,
  currentSport: () => [...sportsKeys.subscriptions(), 'me'] as const,
  supported: () => [...sportsKeys.all, 'supported'] as const,
};

export const userSportSubscriptionsQueryOptions = () =>
  queryOptions({
    queryKey: sportsKeys.subscriptions(),
    queryFn: getUserSportSubscriptionAPI,
  });

export const currentSportQueryOptions = () =>
  queryOptions({
    queryKey: sportsKeys.currentSport(),
    queryFn: getCurrentSportAPI,
  });

export const allSupportedSportsQueryOptions = () =>
  queryOptions({
    queryKey: sportsKeys.supported(),
    queryFn: getAllSupportedSportsAPI,
  });

// Mutation for setting current sport with optimistic updates
export const useSetCurrentSportMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sport: Sport) => setCurrentSportAPI(sport),
    
    // Optimistically update the cache before the API call
    onMutate: async (newSport: Sport) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: sportsKeys.currentSport() });

      // Snapshot the previous value
      const previousCurrentSport = queryClient.getQueryData(sportsKeys.currentSport());

      // Optimistically update to the new value
      queryClient.setQueryData(sportsKeys.currentSport(), newSport);

      // Return a context object with the snapshotted value
      return { previousCurrentSport };
    },
    
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newSport, context) => {
      if (context?.previousCurrentSport) {
        queryClient.setQueryData(sportsKeys.currentSport(), context.previousCurrentSport);
      }
    },
    
    // Always refetch after error or success to ensure cache is in sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: sportsKeys.currentSport() });
    },
  });
};

// Mutation for adding a sport without optimistic updates
export const useAddSportMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sport: Sport) => addSportAPI(sport),
    
    // Only invalidate queries after successful mutation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sportsKeys.subscriptions() });
    },
  });
};

// Mutation for deleting a sport
export const useDeleteSportMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sport: Sport) => deleteSportAPI(sport),
    onSuccess: () => {
      // Invalidate both subscriptions and current sport (in case deleted sport was current)
      queryClient.invalidateQueries({ queryKey: sportsKeys.subscriptions() });
      queryClient.invalidateQueries({ queryKey: sportsKeys.currentSport() });
    },
  });
};