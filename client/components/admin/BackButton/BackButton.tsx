import Link from 'next/link';
import { Icon } from '../Icon/Icon';

export const BackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="back-button" aria-label="Back">
      <Icon name="back" size={22} />
    </Link>
  );
};
