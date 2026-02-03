
import React from 'react';
import { Icons } from '../constants';
import { ViewState } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onProfileToggle: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle, onProfileToggle, onLogoClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-4 shadow-sm">
      <div 
        onClick={onLogoClick}
        className="text-2xl font-bold tracking-tighter text-rose-600 cursor-pointer hover:opacity-80 transition-opacity"
      >
        Oktavia<span className="text-gray-900">Store</span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onProfileToggle}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
        >
          <Icons.User />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Profile
          </span>
        </button>
        <button 
          onClick={onCartToggle}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
        >
          <Icons.Cart />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Cart
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
