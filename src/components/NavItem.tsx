
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active = false, onClick }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10",
        active ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "text-gray-400"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", active ? "text-crypto-accent" : "")} />
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default NavItem;
