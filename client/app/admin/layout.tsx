import type { ReactNode } from 'react';
import { AdminState } from '@/contexts/admin/AdminState';
import './admin.css';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <AdminState>{children}</AdminState>;
};

export default AdminLayout;
