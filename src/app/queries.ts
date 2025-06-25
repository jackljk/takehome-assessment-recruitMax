import { queryOptions } from '@tanstack/react-query';
import { getCurrentSportAPI, getUserSportSubscriptionAPI } from './api';

export const sportsKeys = {
  all: ['sports'] as const,
  subscriptions: () => [...sportsKeys.all, 'subscriptions'] as const,
  currentSport: () => [...sportsKeys.subscriptions(), 'me'] as const,
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
