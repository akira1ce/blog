import { ReactNode } from 'react';

export interface ShowProps {
  when: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

const Show = (props: ShowProps) => {
  const { when, fallback = null, children } = props;

  return when ? children : fallback;
};

export default Show;
