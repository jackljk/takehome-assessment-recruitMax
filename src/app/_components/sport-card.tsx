import { type Sport } from '@/api/sports';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import IconButton from '@/components/ui/icon-button';
import { cn, getActiveStyles } from '@/lib/utils';
import { getSportIcon } from '@/lib/sport-icons';
import { X } from 'lucide-react';

interface SportCardProps {
  sport: Sport;
  onClick?: () => void;
  isSelected?: boolean;
  onDelete?: (sport: Sport) => void;
}

export const SportCard = ({ 
  sport, 
  onClick, 
  isSelected = false, 
  onDelete 
}: SportCardProps) => {
  const IconComponent = getSportIcon(sport);

  return (
    <Card
      className={cn(
        getActiveStyles(isSelected),
        'aspect-square justify-center hover:cursor-pointer transition-all relative'
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center gap-1 md:gap-2">
        {/* Delete button on the top right with an X */}
        {onDelete && (
          <IconButton 
            icon={X}
            variant="destructive"
            size="sm"
            iconSize="sm"
            iconFill="destructive"
            className="absolute top-2 right-2 bg-white shadow-sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onDelete(sport);
            }}
          />
        )}
        <IconComponent className="w-12 h-12 lg:w-16 lg:h-16" />
        <Typography variant="h3" as="p" className="capitalize">
          {sport}
        </Typography>
      </CardContent>
    </Card>
  );
};
