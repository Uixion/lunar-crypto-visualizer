
import React, { useRef, useEffect, useState } from 'react';
import { Bitcoin, ChevronDown, Menu, Moon, Search, Settings, SunMedium } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import SearchResults from './SearchResults';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm, isSearching, setIsSearching } = useCrypto();
  const searchRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light-theme');
    toast({
      title: `Tema ${newTheme === 'light' ? 'Claro' : 'Escuro'} Ativado`,
      description: `O tema foi alterado para o modo ${newTheme === 'light' ? 'claro' : 'escuro'}.`,
    });
  };

  const handleConnectWallet = () => {
    toast({
      title: "Conectando Carteira",
      description: "Funcionalidade de conexão com carteiras em desenvolvimento.",
    });
  };
  
  return (
    <header className="glass-card rounded-2xl px-6 py-4 mb-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-3">
        <Bitcoin className="h-8 w-8 text-crypto-accent" />
        <h1 className="text-2xl font-bold glow-text">CriptoVisão</h1>
      </div>
      
      {/* Desktop Search */}
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
      
      {/* Mobile Search - Toggle */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 p-4 flex flex-col items-center pt-16 md:hidden">
          <div className="w-full max-w-md">
            <div className="flex items-center glass-card rounded-full px-4 py-2 text-gray-400 w-full relative mb-4">
              <Search className="h-4 w-4 mr-2" />
              <input
                type="text"
                placeholder="Buscar criptomoedas..."
                className="bg-transparent border-none outline-none w-full text-white"
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>
            {searchTerm.trim() !== '' && (
              <div className="w-full max-h-[60vh] overflow-y-auto bg-white/10 backdrop-blur-lg rounded-lg">
                <SearchResults />
              </div>
            )}
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => setMobileSearchOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        <button 
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <SunMedium className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth">
          <Settings className="h-5 w-5" />
        </button>
        <button 
          className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-crypto-accent rounded-full hover:bg-opacity-90 transition-smooth"
          onClick={handleConnectWallet}
        >
          <span>Conectar Carteira</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {/* Mobile Search Button */}
        <button 
          className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth"
          onClick={() => setMobileSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-smooth"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 p-4 flex flex-col items-center pt-16">
          <div className="w-full max-w-md space-y-4">
            <button 
              className="w-full flex items-center space-x-2 px-4 py-3 text-sm font-medium bg-crypto-accent rounded-xl hover:bg-opacity-90 transition-smooth"
              onClick={handleConnectWallet}
            >
              <span>Conectar Carteira</span>
            </button>
            <button 
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium bg-white/10 rounded-xl hover:bg-white/20 transition-smooth"
              onClick={() => {
                setMobileMenuOpen(false);
                toast({
                  title: "Configurações",
                  description: "Página de configurações em desenvolvimento.",
                });
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span>Configurações</span>
            </button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
