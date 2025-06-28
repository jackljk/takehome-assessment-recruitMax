import { useState, useEffect } from 'react';
import { type Sport } from '@/api/sports';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { 
  userSportSubscriptionsQueryOptions,
  useAddSportMutation
} from '../app/queries';

export const useAddSport = () => {
  const { data: userSports = [] } = useQuery(userSportSubscriptionsQueryOptions());
  const addSportMutation = useAddSportMutation();
  
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | ''>('');
  const [isAdding, setIsAdding] = useState(false);
  const [sportBeingAdded, setSportBeingAdded] = useState<Sport | null>(null);
  
  // Close dialog when sport is actually added to the list
  useEffect(() => {
    if (addDialogOpen && sportBeingAdded && (userSports as Sport[]).includes(sportBeingAdded)) {
    toast.success(`${sportBeingAdded.charAt(0).toUpperCase() + sportBeingAdded.slice(1)} has been successfully added`);
      setAddDialogOpen(false);
      setSelectedSport('');
      setIsAdding(false);
      setSportBeingAdded(null);
    }
  }, [userSports, addDialogOpen, sportBeingAdded]);

  const handleAddSport = () => {
    if (selectedSport) {
      console.log(`➕ Adding sport: ${selectedSport}`);
      console.log('Sports before adding:', userSports);
      setIsAdding(true);
      setSportBeingAdded(selectedSport as Sport);
      
      addSportMutation.mutate(selectedSport as Sport, {
        onError: () => {
          toast.error('Failed to add sport', {
            description: 'Please try again later.',
          });
          setAddDialogOpen(false);
          setSelectedSport('');
          setIsAdding(false);
          setSportBeingAdded(null);
        }
      });
    }
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const cancelAddSport = () => {
    setAddDialogOpen(false);
    setSelectedSport('');
    setIsAdding(false);
    setSportBeingAdded(null);
  };

  return {
    addDialogOpen,
    selectedSport,
    isAdding,
    setSelectedSport,
    handleAddSport,
    openAddDialog,
    cancelAddSport,
    setAddDialogOpen
  };
};
