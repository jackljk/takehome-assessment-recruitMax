'use client';

import { type Sport } from '@/api/sports';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { 
  userSportSubscriptionsQueryOptions,
  currentSportQueryOptions,
  useSetCurrentSportMutation
} from '../queries';
import { useDeleteSport } from '@/hooks/use-delete-sport';
import { SportCard } from './sport-card';
import { AddSportCard } from './add-sport-card';
import { DeleteSportConfirmDialog } from './delete-sport-confirm-dialog';

const UserSportSection = () => {
  const { data: userSports = [] } = useQuery(userSportSubscriptionsQueryOptions());
  const { data: currentSport } = useQuery(currentSportQueryOptions());
  const setCurrentSportMutation = useSetCurrentSportMutation();
  
  const {
    deleteConfirmOpen,
    sportToDelete,
    isDeleting,
    handleDeleteSport,
    confirmDeleteSport,
    cancelDeleteSport,
    setDeleteConfirmOpen
  } = useDeleteSport();
  
  // Debug logging
  console.log('=== DEBUG INFO ===');
  console.log('Current Sport from API:', currentSport);
  console.log('All Subscribed Sports:', userSports);
  console.log('==================');
  
  const handleSportClick = (sport: Sport) => {
    console.log(`🎯 Attempting to set current sport to: ${sport}`);
    setCurrentSportMutation.mutate(sport);
  };
  
  return (
    <>
      <Card className="gap-1">
        <CardHeader>
          <Typography variant="h2">Sport Selected:</Typography>
        </CardHeader>
        <CardContent className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
          {/* Render all subscribed sports */}
          {userSports.map((sport) => (
            <SportCard 
              key={sport} 
              sport={sport} 
              isSelected={currentSport === sport}
              onClick={() => handleSportClick(sport)}
              onDelete={handleDeleteSport}
            />
          ))}
          
          {/* Add Sport card */}
          <AddSportCard />
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <DeleteSportConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        sportToDelete={sportToDelete}
        isDeleting={isDeleting}
        onConfirm={confirmDeleteSport}
        onCancel={cancelDeleteSport}
      />
    </>
  );
};

export default UserSportSection;
