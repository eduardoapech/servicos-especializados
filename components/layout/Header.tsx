
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from '../../constants';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { openDirectChat } = useWhatsApp();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">S</div>
            <span className="text-lg font-bold text-gray-900">{COMPANY_CONFIG.name}</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#secao-formulario" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Novo Chamado</a>
          </nav>

          {/* Fix: Wrap openDirectChat in an arrow function to prevent the MouseEvent from being passed as the phone argument */}
          <Button variant="success" size="sm" onClick={() => openDirectChat()} className="gap-2 shadow-sm">
            <MessageSquare className="w-4 h-4" />
            Suporte WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
