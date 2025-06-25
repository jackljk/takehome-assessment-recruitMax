export type Sport =
  | 'baseball'
  | 'basketball'
  | 'football'
  | 'soccer'
  | 'tennis';

let subscriptions: Sport[] = ['baseball', 'basketball', 'football'];
let currentSport: Sport | null = 'baseball';

export async function getAllSupportedSportsAPI(): Promise<Sport[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ['baseball', 'basketball', 'football', 'soccer', 'tennis'];
}

export async function getUserSportSubscriptionAPI(): Promise<Sport[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return subscriptions;
}

export async function getCurrentSportAPI(): Promise<Sport | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return currentSport;
}

export async function setCurrentSportAPI(sport: Sport): Promise<Sport> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  currentSport = sport;
  return currentSport;
}

export async function deleteSportAPI(sport: Sport) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  subscriptions = subscriptions.filter((s) => s !== sport);
  return { sport };
}

export async function addSportAPI(sport: Sport) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  subscriptions = [...subscriptions, sport];
  // alphabetically sort subscriptions
  subscriptions = subscriptions.sort((a, b) => a.localeCompare(b));
  return { sport };
}