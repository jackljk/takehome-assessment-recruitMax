import { getQueryClient } from '@/app/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import UserSportSection from './_components/user-sport-section';
import Providers from './providers';

const SportsAndColleges = async () => {
  const queryClient = getQueryClient();

  return (
    <Providers>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="max-w-screen-lg mx-auto my-4 px-4 flex flex-col gap-3">
          <UserSportSection />
        </div>
      </HydrationBoundary>
    </Providers>
  );
};

export default SportsAndColleges;
