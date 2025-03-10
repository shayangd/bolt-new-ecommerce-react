import React from 'react';
import { Home, Info } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  activeSection: 'home' | 'about';
  onSectionChange: (section: 'home' | 'about') => void;
  onClose: () => void;
}

export function SideMenu({ isOpen, activeSection, onSectionChange, onClose }: SideMenuProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 pt-20">
          <button
            onClick={() => {
              onSectionChange('home');
              onClose();
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg mb-2 ${
              activeSection === 'home'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home size={20} />
            Home
          </button>
          <button
            onClick={() => {
              onSectionChange('about');
              onClose();
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeSection === 'about'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Info size={20} />
            About Us
          </button>
        </div>
      </div>
    </>
  );
}