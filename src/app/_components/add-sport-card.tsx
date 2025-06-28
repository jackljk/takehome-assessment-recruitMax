import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { cn, getActiveStyles } from '@/lib/utils';
import { PlusCircleIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { 
  allSupportedSportsQueryOptions, 
  userSportSubscriptionsQueryOptions
} from '../queries';
import { useAddSport } from '@/hooks/use-add-sport';
import { AddSportDialog } from './add-sport-dialog';
import { toast } from 'sonner';


export const AddSportCard = () => {
  const { data: allSports = [] } = useQuery(allSupportedSportsQueryOptions());
  const { data: userSports = [] } = useQuery(userSportSubscriptionsQueryOptions());

  const {
    addDialogOpen,
    selectedSport,
    isAdding,
    setSelectedSport,
    handleAddSport,
    openAddDialog,
    setAddDialogOpen
  } = useAddSport();

  // Filter out sports that user is already subscribed to
  const availableSports = allSports.filter(sport => !userSports.includes(sport));
  const isAllSportsAdded = availableSports.length === 0;

  const toastAllSportsAdded = () => {
    if (isAllSportsAdded) {
        toast.error('You have already added all available sports.');
        }
    }

  return (
    <>
      <Card
        className={cn(
          getActiveStyles(false),
          'aspect-square justify-center hover:cursor-pointer transition-all relative',
          isAllSportsAdded && 'opacity-50 cursor-not-allowed'
        )}
        onClick={isAllSportsAdded ? toastAllSportsAdded : openAddDialog}
      >
        <CardContent className="flex flex-col items-center gap-1 md:gap-2">
          <PlusCircleIcon className="w-12 h-12 lg:w-16 lg:h-16" />
          <Typography variant="h3" as="p" className="capitalize">
            Add Sport
          </Typography>
        </CardContent>
      </Card>
      
      <AddSportDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        selectedSport={selectedSport}
        onSelectedSportChange={setSelectedSport}
        isAdding={isAdding}
        onAddSport={handleAddSport}
      />
    </>
  );
};

