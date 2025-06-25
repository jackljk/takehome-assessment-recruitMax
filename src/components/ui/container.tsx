import { type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="2xl:max-w-6xl mx-auto py-6 px-8 md:px-12 2xl:px-0">
      {children}
    </div>
  );
};

export default Container;
