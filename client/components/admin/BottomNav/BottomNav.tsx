'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';

const items: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin/overview', label: 'Overview', icon: 'overview' },
  { href: '/admin/events', label: 'Events', icon: 'calendar' },
  { href: '/admin/live', label: 'Live', icon: 'live' },
  { href: '/admin/map', label: 'Map', icon: 'map' },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname.startsWith(item.href)
              ? 'bottom-nav__item bottom-nav__item--active'
              : 'bottom-nav__item'
          }
        >
          <Icon name={item.icon} size={22} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
