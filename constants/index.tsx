
import React from 'react';
import { Settings, Hammer, Wrench, ShieldCheck, Laptop } from 'lucide-react';
import { Service, ServiceCategory } from '../types';

export const COMPANY_CONFIG = {
  name: 'ServiceConnect',
  whatsappNumber: '5555991864238', // Seu número que receberá as mensagens
  
  // CONFIGURAÇÃO DE API (Para envio automático sem abrir o whats do cliente)
  // Se você usar um serviço como Z-API ou Evolution API, coloque os dados abaixo:
  whatsappApiUrl: '', // Ex: https://api.z-api.io/instances/SUA_INSTANCIA/token/SUA_CHAVE/send-text
  whatsappApiToken: '', // Seu Token de segurança da API
  
  email: 'contato@serviceconnect.com.br',
  address: 'Av. Paulista, 1000 - São Paulo, SP',
  premiumMode: false
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Manutenção Preventiva',
    description: 'Evite problemas futuros com nossa revisão técnica detalhada.',
    icon: <Settings className="w-6 h-6 text-blue-600" />,
    category: ServiceCategory.MAINTENANCE
  },
  {
    id: '2',
    title: 'Instalação Profissional',
    description: 'Instalação de equipamentos com garantia e conformidade técnica.',
    icon: <Hammer className="w-6 h-6 text-blue-600" />,
    category: ServiceCategory.INSTALLATION
  },
  {
    id: '3',
    title: 'Reparos Urgentes',
    description: 'Atendimento rápido para situações críticas do dia a dia.',
    icon: <Wrench className="w-6 h-6 text-blue-600" />,
    category: ServiceCategory.REPAIR
  },
  {
    id: '4',
    title: 'Suporte Remoto',
    description: 'Soluções rápidas via acesso remoto para problemas de software.',
    icon: <Laptop className="w-6 h-6 text-blue-600" />,
    category: ServiceCategory.TECH_SUPPORT
  }
];
