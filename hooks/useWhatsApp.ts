
import { useCallback } from 'react';
import { TicketFormData, Ticket } from '../types';
import { COMPANY_CONFIG } from '../constants';

export const useWhatsApp = () => {
  const playNotification = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
      audio.volume = 0.4;
      audio.play();
    } catch (e) {
      console.warn('Auto-play blocked or audio error');
    }
  };

  const sendDirectly = useCallback(async (data: TicketFormData): Promise<{ success: boolean; simulated?: boolean }> => {
    const newTicket: Ticket = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: 'pending',
      isNew: true
    };

    try {
      const existing = JSON.parse(localStorage.getItem('sc_tickets') || '[]');
      localStorage.setItem('sc_tickets', JSON.stringify([newTicket, ...existing]));

      window.dispatchEvent(new Event('new_ticket_received'));
      playNotification();
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const isSimulated = !COMPANY_CONFIG.whatsappApiUrl;
      
      return { success: true, simulated: isSimulated };
    } catch (error) {
      console.error('Erro ao processar chamado:', error);
      return { success: false };
    }
  }, []);

  const openDirectChat = useCallback((phone?: string | any, message?: string) => {
    // Pega o número da empresa se nenhum for passado (ou se for o evento do clique)
    const targetPhone = (typeof phone === 'string' && phone && phone.length > 5) ? phone : COMPANY_CONFIG.whatsappNumber;
    
    // Limpeza absoluta do número
    let cleanPhone = String(targetPhone).replace(/\D/g, '');
    
    // Se for Brasil (DDDs comuns) e não tiver DDI, coloca 55
    if (cleanPhone.length === 10 || cleanPhone.length === 11) {
      cleanPhone = '55' + cleanPhone;
    }

    // Usando wa.me que é mais curto e funciona melhor em mobile
    let url = `https://wa.me/${cleanPhone}`;
    
    if (message && typeof message === 'string') {
      url += `?text=${encodeURIComponent(message)}`;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return { sendDirectly, openDirectChat };
};
