import { type Sport } from '@/api/sports';
import {
  FaBaseballBall,
  FaBasketballBall,
  FaFootballBall,
} from 'react-icons/fa';
import { PiSoccerBall, PiTennisBall } from 'react-icons/pi';

export function getSportIcon(sport: Sport) {
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
