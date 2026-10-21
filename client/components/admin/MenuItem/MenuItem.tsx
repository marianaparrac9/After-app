import Link from 'next/link';
import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';

interface MenuItemProps {
  icon: IconName;
  title: string;
  subtitle: string;
  href?: string;
}

// Fila del menú de Profile. Si trae href es un enlace, si no es solo visual
export const MenuItem = ({ icon, title, subtitle, href }: MenuItemProps) => {
  const content = (
    <>
      <span className="menu-item__icon">
        <Icon name={icon} size={20} />
      </span>
      <span className="menu-item__text">
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <Icon name="chevron" size={18} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className="menu-item">
        {content}
      </Link>
    );
  }

  return <div className="menu-item">{content}</div>;
};
