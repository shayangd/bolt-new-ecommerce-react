import React from 'react';
import { ShoppingCart, UserCircle, LayoutDashboard, ShoppingBag, Menu, X } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
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

export function Header({
  user,
  isAdmin,
  showAdminDashboard,
  totalItems,
  isSideMenuOpen,
  onToggleSideMenu,
  onLogoClick,
  onToggleAdminDashboard,
  onOpenCart,
  onOpenAuth,
  onSignOut
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSideMenu}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSideMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            <ShoppingBag className="h-8 w-8" />
            Simple Shop
          </button>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <button
              onClick={onToggleAdminDashboard}
              className={`relative p-2 rounded-full transition-colors ${
                showAdminDashboard ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
              title="Admin Dashboard"
            >
              <LayoutDashboard size={24} />
            </button>
          )}
          <button
            onClick={onOpenCart}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <UserCircle size={24} />
              <span className="text-sm text-gray-600">{user.email}</span>
              {isAdmin && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Admin
                </span>
              )}
              <button
                onClick={onSignOut}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}