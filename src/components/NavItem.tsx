
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  active = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-4 py-3 mb-1 rounded-xl transition-smooth",
        active 
          ? "bg-crypto-accent text-white glow-effect" 
          : "text-gray-400 hover:bg-white/5"
      )}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span className="font-medium">{label}</span>
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
      )}
    </button>
  );
};

export default NavItem;
