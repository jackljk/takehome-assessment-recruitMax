import Link from 'next/link';
import { Typography } from './typography';


const Header = () => {
  return (
    <header className="bg-header flex justify-between px-4 py-4 shadow-md shadow-black/20 text-2xl md:px-12 sticky top-0 z-1">
      <Link href="/">
        <Typography
          variant={'header'}
          as="span"
          className="text-brand-primary-500 font-bold"
        >
          Recruit
        </Typography>
        <Typography
          variant={'header'}
          as="span"
          className="text-brand-secondary-900 font-bold"
        >
          Max
        </Typography>
      </Link>
    </header>
  );
};

export default Header;
