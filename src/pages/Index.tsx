
import React from 'react';
import { CryptoProvider } from '../context/CryptoContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MarketStats from '../components/MarketStats';
import CryptoList from '../components/CryptoList';
import DetailedChart from '../components/DetailedChart';

const Index: React.FC = () => {
  return (
    <CryptoProvider>
      <div className="min-h-screen navy-gradient-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <Header />
          
          <div className="flex space-x-6">
            <Sidebar />
            
            <main className="flex-1">
              <MarketStats />
              
              <div className="mb-6">
                <DetailedChart />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold">Principais Criptomoedas</h2>
                  <button className="text-crypto-accent hover:underline text-sm font-medium">
                    Ver Todas
                  </button>
                </div>
                <CryptoList />
              </div>
            </main>
          </div>
        </div>
      </div>
    </CryptoProvider>
  );
};

export default Index;
