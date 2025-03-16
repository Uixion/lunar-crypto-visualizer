
import React from 'react';
import { BarChart3, Home, Layers, LineChart, PieChart, RefreshCw, Wallet } from 'lucide-react';
import NavItem from './NavItem';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block glass-card rounded-2xl p-4 w-64 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-xl font-bold px-4 mb-3">Navegação</h2>
        <NavItem icon={Home} label="Painel" active />
        <NavItem icon={BarChart3} label="Visão do Mercado" />
        <NavItem icon={LineChart} label="Visualização de Trading" />
        <NavItem icon={Wallet} label="Portfólio" />
        <NavItem icon={RefreshCw} label="Transações" />
      </div>
      
      <div>
        <h2 className="text-xl font-bold px-4 mb-3">Análises</h2>
        <NavItem icon={PieChart} label="Desempenho" />
        <NavItem icon={Layers} label="Histórico" />
      </div>
      
      <div className="mt-auto px-4 pt-8">
        <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-crypto-navy-light to-crypto-navy">
          <h3 className="text-lg font-medium mb-2">Análise Pro</h3>
          <p className="text-sm text-gray-400 mb-3">Obtenha insights avançados do mercado com nosso pacote premium</p>
          <button className="w-full py-2 px-4 bg-crypto-accent rounded-lg text-white font-medium hover:bg-opacity-90 transition-smooth">
            Atualizar Agora
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
