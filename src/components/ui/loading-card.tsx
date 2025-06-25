import { Loader } from 'lucide-react';
import { Card } from './card';

const LoadingCard = () => {
  return (
    <Card className="flex justify-center items-center">
      <Loader className="animate-spin" />
    </Card>
  );
};

export default LoadingCard;
