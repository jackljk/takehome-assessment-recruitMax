import { useState, useEffect } from 'react';
import { type Sport } from '@/api/sports';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { 
  userSportSubscriptionsQueryOptions,
  useDeleteSportMutation
} from '../app/queries';

export const useDeleteSport = () => {
  const { data: userSports = [] } = useQuery(userSportSubscriptionsQueryOptions());
  const deleteSportMutation = useDeleteSportMutation();
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [sportToDelete, setSportToDelete] = useState<Sport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Close dialog when sport is actually removed from the list
  useEffect(() => {
    if (deleteConfirmOpen && sportToDelete && !(userSports as Sport[]).includes(sportToDelete)) {
      toast.success(`${sportToDelete.charAt(0).toUpperCase() + sportToDelete.slice(1)} has been removed`);
      setDeleteConfirmOpen(false);
      setSportToDelete(null);
      setIsDeleting(false);
    }
  }, [userSports, deleteConfirmOpen, sportToDelete]);

  const handleDeleteSport = (sport: Sport) => {
    setSportToDelete(sport);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteSport = () => {
    if (sportToDelete) {
      console.log(`❌ Deleting sport: ${sportToDelete}`);
      setIsDeleting(true);
      
      deleteSportMutation.mutate(sportToDelete, {
        onError: () => {
          toast.error(`Failed to remove ${sportToDelete.charAt(0).toUpperCase() + sportToDelete.slice(1)}`, {
            description: 'Please try again later.',
          });
          setDeleteConfirmOpen(false);
          setSportToDelete(null);
          setIsDeleting(false);
        }
      });
    }
  };

  const cancelDeleteSport = () => {
    setDeleteConfirmOpen(false);
    setSportToDelete(null);
    setIsDeleting(false);
  };

  return {
    deleteConfirmOpen,
    sportToDelete,
    isDeleting,
    handleDeleteSport,
    confirmDeleteSport,
    cancelDeleteSport,
    setDeleteConfirmOpen
  };
};
