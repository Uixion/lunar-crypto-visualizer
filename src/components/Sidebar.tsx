
import React from 'react';
import { BarChart3, Home, Layers, LineChart, PieChart, RefreshCw, Wallet } from 'lucide-react';
import NavItem from './NavItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from './ui/use-toast';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleProUpgrade = () => {
    toast({
      title: "Acesso Premium",
      description: "Funcionalidade de upgrade para plano premium em desenvolvimento.",
      variant: "default",
    });
  };
  
  const handleNavigation = (path: string) => {
    if (path === '/') {
      navigate(path);
    } else {
      toast({
        title: "Página em Desenvolvimento",
        description: "Esta funcionalidade estará disponível em breve.",
      });
    }
  };
  
  return (
    <aside className="hidden lg:block glass-card rounded-2xl p-4 w-64 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-bold px-4 mb-3">Navegação</h2>
        <NavItem 
          icon={Home} 
          label="Painel" 
          active={location.pathname === '/'} 
          onClick={() => handleNavigation('/')}
        />
        <NavItem 
          icon={BarChart3} 
          label="Visão do Mercado" 
          onClick={() => handleNavigation('/market')}
        />
        <NavItem 
          icon={LineChart} 
          label="Visualização de Trading" 
          onClick={() => handleNavigation('/trading')}
        />
        <NavItem 
          icon={Wallet} 
          label="Portfólio" 
          onClick={() => handleNavigation('/portfolio')}
        />
        <NavItem 
          icon={RefreshCw} 
          label="Transações" 
          onClick={() => handleNavigation('/transactions')}
        />
      </div>
      
      <div>
        <h2 className="text-xl font-bold px-4 mb-3">Análises</h2>
        <NavItem 
          icon={PieChart} 
          label="Desempenho" 
          onClick={() => handleNavigation('/performance')}
        />
        <NavItem 
          icon={Layers} 
          label="Histórico" 
          onClick={() => handleNavigation('/history')}
        />
      </div>
      
      <div className="mt-auto px-4 pt-8">
        <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-crypto-navy-light to-crypto-navy">
          <h3 className="text-lg font-medium mb-2">Análise Pro</h3>
          <p className="text-sm text-gray-400 mb-3">Obtenha insights avançados do mercado com nosso pacote premium</p>
          <button 
            className="w-full py-2 px-4 bg-crypto-accent rounded-lg text-white font-medium hover:bg-opacity-90 transition-smooth"
            onClick={handleProUpgrade}
          >
            Atualizar Agora
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
