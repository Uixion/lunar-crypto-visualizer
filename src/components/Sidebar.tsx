
import React from 'react';
import { BarChart3, Home, Layers, LineChart, PieChart, RefreshCw, Wallet } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block glass-card rounded-2xl p-4 w-64 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-bold px-4 mb-3">Navigation</h2>
        <NavItem icon={Home} label="Dashboard" active />
        <NavItem icon={BarChart3} label="Market Overview" />
        <NavItem icon={LineChart} label="Trading View" />
        <NavItem icon={Wallet} label="Portfolio" />
        <NavItem icon={RefreshCw} label="Transactions" />
      </div>
      
      <div>
        <h2 className="text-xl font-bold px-4 mb-3">Analytics</h2>
        <NavItem icon={PieChart} label="Performance" />
        <NavItem icon={Layers} label="History" />
      </div>
      
      <div className="mt-auto px-4 pt-8">
        <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-crypto-navy-light to-crypto-navy">
          <h3 className="text-lg font-medium mb-2">Pro Analysis</h3>
          <p className="text-sm text-gray-400 mb-3">Get advanced market insights with our premium package</p>
          <button className="w-full py-2 px-4 bg-crypto-accent rounded-lg text-white font-medium hover:bg-opacity-90 transition-smooth">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
