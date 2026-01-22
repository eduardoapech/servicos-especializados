
import React, { useState } from 'react';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'site' | 'admin'>('site');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {view === 'site' ? (
        <>
          <Home />
          {/* Botão flutuante para acessar o Admin (apenas para você) */}
          <button 
            onClick={() => setView('admin')}
            className="fixed bottom-6 left-6 z-50 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
            title="Acessar Painel de Pedidos"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold uppercase tracking-widest">
              Painel do Gestor
            </span>
          </button>
        </>
      ) : (
        <AdminDashboard onBack={() => setView('site')} />
      )}
    </div>
  );
};

export default App;
