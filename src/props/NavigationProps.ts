export interface SideMenuProps {
  isOpen: boolean;
  activeSection: 'home' | 'about';
  onSectionChange: (section: 'home' | 'about') => void;
  onClose: () => void;
}