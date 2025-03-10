import { User } from '../types';

export interface HeaderProps {
  user: User | null;
  isAdmin: boolean;
  showAdminDashboard: boolean;
  totalItems: number;
  isSideMenuOpen: boolean;
  onToggleSideMenu: () => void;
  onLogoClick: () => void;
  onToggleAdminDashboard: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
}