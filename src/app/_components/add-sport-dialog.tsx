import { type Sport } from '@/api/sports';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Typography } from '@/components/ui/typography';
import { getSportIcon } from '@/lib/sport-icons';
import { useQuery } from '@tanstack/react-query';
import {
  allSupportedSportsQueryOptions,
  userSportSubscriptionsQueryOptions,
} from '../queries';

interface AddSportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSport: Sport | '';
  onSelectedSportChange: (sport: Sport | '') => void;
  isAdding: boolean;
  onAddSport: () => void;
}

export const AddSportDialog = ({
  open,
  onOpenChange,
  selectedSport,
  onSelectedSportChange,
  isAdding,
  onAddSport,
}: AddSportDialogProps) => {
  const { data: allSports = [] } = useQuery(allSupportedSportsQueryOptions());
  const { data: userSports = [] } = useQuery(
    userSportSubscriptionsQueryOptions()
  );

  // Filter out sports that user is already subscribed to
  const availableSports = allSports.filter(
    (sport) => !userSports.includes(sport)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Sport</DialogTitle>
          <DialogDescription>
            Add the sport you're applying to here and start filling out
            schools' questionaires with RecruitMax
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          { (
            <div className="space-y-4">
              <Select
                value={selectedSport}
                onValueChange={(value) =>
                  onSelectedSportChange(value as Sport)
                }
                disabled={isAdding}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sport to add" />
                </SelectTrigger>
                <SelectContent>
                  {availableSports.map((sport) => {
                    const IconComponent = getSportIcon(sport);
                    return (
                      <SelectItem key={sport} value={sport} className='cursor-pointer hover:bg-gray-100'>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="capitalize">{sport}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Button
                onClick={onAddSport}
                disabled={!selectedSport || isAdding}
                className="w-full"
              >
                {isAdding ? 'Adding...' : 'Add Sport'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
