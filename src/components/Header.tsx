
import React from 'react';
import { Bitcoin, ChevronDown, Menu, Moon, Search, Settings, SunMedium } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="glass-card rounded-2xl px-6 py-4 mb-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-3">
        <Bitcoin className="h-8 w-8 text-crypto-accent" />
        <h1 className="text-2xl font-bold glow-text">CriptoVisão</h1>
      </div>
      
      <div className="hidden md:flex items-center glass-card rounded-full px-4 py-2 text-gray-400 w-72">
        <Search className="h-4 w-4 mr-2" />
        <input
          type="text"
          placeholder="Buscar criptomoedas..."
          className="bg-transparent border-none outline-none w-full text-white"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth">
          <SunMedium className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth">
          <Settings className="h-5 w-5" />
        </button>
        <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-crypto-accent rounded-full hover:bg-opacity-90 transition-smooth">
          <span>Conectar Carteira</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
