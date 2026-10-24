import type { ReactNode } from 'react';
import { BackButton } from '../BackButton/BackButton';
import { Avatar } from '../Avatar/Avatar';

interface PageHeaderProps {
  title: ReactNode;
  backHref: string;
}

export const PageHeader = ({ title, backHref }: PageHeaderProps) => {
  return (
    <header className="page-header">
      <div className="page-header__top">
        <BackButton href={backHref} />
        <Avatar />
      </div>
      <h1 className="page-title">{title}</h1>
    </header>
  );
};
