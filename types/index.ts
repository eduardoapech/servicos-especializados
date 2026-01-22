
import React from 'react';

export enum ServiceCategory {
  MAINTENANCE = 'Manutenção',
  INSTALLATION = 'Instalação',
  CONSULTANCY = 'Consultoria',
  REPAIR = 'Reparo Geral',
  TECH_SUPPORT = 'Suporte Técnico'
}

export interface Ticket extends TicketFormData {
  id: string;
  timestamp: number;
  status: 'pending' | 'viewed' | 'completed';
  isNew?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ServiceCategory;
}

export interface TicketFormData {
  name: string;
  phone: string;
  serviceType: string;
  description: string;
}

export interface AdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  isVisible?: boolean;
}
