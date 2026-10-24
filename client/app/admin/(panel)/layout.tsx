import type { ReactNode } from 'react';
import { BottomNav } from '@/components/admin/BottomNav/BottomNav';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page">
      <div className="page__scroll">{children}</div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
