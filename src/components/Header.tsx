
import React, { useRef, useEffect } from 'react';
import { Bitcoin, ChevronDown, Menu, Moon, Search, Settings, SunMedium } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import SearchResults from './SearchResults';

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useCrypto();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSearching]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };
  
  return (
    <header className="glass-card rounded-2xl px-6 py-4 mb-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-3">
        <Bitcoin className="h-8 w-8 text-crypto-accent" />
        <h1 className="text-2xl font-bold glow-text">CriptoVisão</h1>
      </div>
      
      <div 
        ref={searchRef}
        className="hidden md:flex items-center glass-card rounded-full px-4 py-2 text-gray-400 w-72 relative"
      >
        <Search className="h-4 w-4 mr-2" />
        <input
          type="text"
          placeholder="Buscar criptomoedas..."
          className="bg-transparent border-none outline-none w-full text-white"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm.trim() !== '' && setIsSearching(true)}
        />
        {isSearching && <SearchResults />}
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
