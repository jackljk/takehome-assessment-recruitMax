import { type Sport } from '@/api/sports';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { cn, getActiveStyles } from '@/lib/utils';
import { PlusCircleIcon } from 'lucide-react';
import {
  FaBaseballBall,
  FaBasketballBall,
  FaFootballBall,
} from 'react-icons/fa';
import { PiSoccerBall, PiTennisBall } from 'react-icons/pi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMatchingSportsIcon(sport: Sport) {
  switch (sport) {
    case 'baseball':
      return FaBaseballBall;
    case 'basketball':
      return FaBasketballBall;
    case 'football':
      return FaFootballBall;
    case 'soccer':
      return PiSoccerBall;
    case 'tennis':
      return PiTennisBall;
    default:
      throw new Error(`No icon found for sport: ${sport}`);
  }
}

const AddSportCard = () => {
  return (
    <Card
      className={cn(
        getActiveStyles(false),
        'aspect-square justify-center hover:cursor-pointer transition-all relative'
      )}
    >
      <CardContent className="flex flex-col items-center gap-1 md:gap-2">
        <PlusCircleIcon className="w-12 h-12 lg:w-16 lg:h-16" />
        <Typography variant="h3" as="p" className="capitalize">
          Add Sport
        </Typography>
      </CardContent>
    </Card>
  );
};

const UserSportSection = () => {
  return (
    <Card className="gap-1">
      <CardHeader>
        <Typography variant="h2">Sport Selected:</Typography>
      </CardHeader>
      <CardContent className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
        <AddSportCard />
      </CardContent>
    </Card>
  );
};

export default UserSportSection;
