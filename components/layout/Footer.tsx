
import React from 'react';
import { COMPANY_CONFIG } from '../../constants';
import AdBanner from '../ads/AdBanner';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{COMPANY_CONFIG.name}</h3>
            <p className="text-gray-400">Excelência em prestação de serviços técnicos com agilidade e compromisso.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#servicos" className="hover:text-white transition">Nossos Serviços</a></li>
              <li><a href="#chamado" className="hover:text-white transition">Abrir Chamado</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p className="text-gray-400">{COMPANY_CONFIG.email}</p>
            <p className="text-gray-400">{COMPANY_CONFIG.address}</p>
          </div>
        </div>

        <AdBanner slot="footer-banner" className="mb-8" />

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_CONFIG.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
