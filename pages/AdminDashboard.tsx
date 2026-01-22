
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  MessageSquare, 
  CheckCheck, 
  User, 
  Phone, 
  Wrench, 
  ArrowLeft, 
  Send,
  Paperclip,
  Smile,
  Mic,
  LayoutDashboard
} from 'lucide-react';
import { Ticket } from '../types';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { COMPANY_CONFIG } from '../constants';

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { openDirectChat } = useWhatsApp();
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadTickets = () => {
    const data = JSON.parse(localStorage.getItem('sc_tickets') || '[]');
    setTickets(data);
  };

  useEffect(() => {
    loadTickets();
    window.addEventListener('new_ticket_received', loadTickets);
    return () => window.removeEventListener('new_ticket_received', loadTickets);
  }, []);

  const handleSelectTicket = (id: string) => {
    setSelectedTicketId(id);
    const updated = tickets.map(t => 
      t.id === id ? { ...t, status: 'viewed' as const, isNew: false } : t
    );
    setTickets(updated);
    localStorage.setItem('sc_tickets', JSON.stringify(updated));
  };

  const handleResponse = () => {
    if (!selectedTicket) return;

    const firstName = selectedTicket.name.split(' ')[0];

    // Criamos a mensagem usando um array e join para garantir quebras de linha (\n) interpretadas corretamente
    const messageParts = [
      `*DETALHES DO SEU PEDIDO*`,
      `----------------------------------`,
      `*Serviço:* ${selectedTicket.serviceType}`,
      `*Descrição:* ${selectedTicket.description}`,
      ``,
      `Olá, *${firstName}*! 👋`,
      ``,
      `Sou da equipe de suporte da *${COMPANY_CONFIG.name}*.`,
      `Recebi sua solicitação através do nosso site. Como posso te ajudar melhor agora?`
    ];
    
    const fullMessage = messageParts.join('\n');
    
    // Abre o chat direto com o número do CLIENTE enviando a mensagem formatada
    openDirectChat(selectedTicket.phone, fullMessage);
  };

  const filteredTickets = tickets.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-[#dadbd3] flex items-center justify-center font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[127px] bg-[#00a884] z-0"></div>

      <div className="w-full h-full max-w-[1600px] md:h-[95vh] bg-[#f0f2f5] shadow-2xl flex z-10 md:rounded-lg overflow-hidden relative">
        
        {/* Sidebar */}
        <div className={`${isMobileView && selectedTicketId ? 'hidden' : 'flex'} w-full md:w-[450px] border-r border-[#d1d7db] flex-col bg-white`}>
          <div className="h-[60px] bg-[#f0f2f5] px-4 flex items-center justify-between border-b border-[#d1d7db]">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-[#d1d7db] rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-[#54656f]" />
              </button>
              <div className="w-10 h-10 bg-[#005c4b] rounded-full flex items-center justify-center text-white font-bold">ADM</div>
            </div>
            <div className="flex gap-5 text-[#54656f]">
              <MessageSquare className="w-5 h-5 cursor-pointer" />
              < MoreVertical className="w-5 h-5 cursor-pointer" />
            </div>
          </div>

          <div className="p-2 bg-white flex items-center gap-2 border-b border-[#f0f2f5]">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#54656f]" />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar chamados..." 
                className="w-full bg-[#f0f2f5] py-2 pl-12 pr-4 rounded-lg text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
            {filteredTickets.map(t => (
              <div 
                key={t.id}
                onClick={() => handleSelectTicket(t.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer border-b border-[#f0f2f5] hover:bg-[#f5f6f6] ${selectedTicketId === t.id ? 'bg-[#f0f2f5]' : ''}`}
              >
                <div className="w-12 h-12 bg-[#dfe5e7] rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-[#adb5bd]" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-[#111b21] truncate">{t.name}</h4>
                    <span className="text-[11px] text-[#667781]">
                      {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#667781] truncate">
                      <span className="font-semibold text-[#111b21]">{t.serviceType}:</span> {t.description}
                    </p>
                    {t.status === 'pending' && (
                      <div className="w-2.5 h-2.5 bg-[#00a884] rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${isMobileView && !selectedTicketId ? 'hidden' : 'flex'} flex-1 flex-col bg-[#efeae2] relative`}>
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat z-0"></div>
          
          {selectedTicket ? (
            <>
              <div className="h-[60px] bg-[#f0f2f5] px-4 flex items-center justify-between z-10 border-b border-[#d1d7db]">
                <div className="flex items-center gap-3">
                  {isMobileView && (
                    <button onClick={() => setSelectedTicketId(null)} className="p-1">
                      <ArrowLeft className="w-6 h-6 text-[#54656f]" />
                    </button>
                  )}
                  <div className="w-10 h-10 bg-[#dfe5e7] rounded-full flex items-center justify-center"><User className="text-[#adb5bd] w-7 h-7" /></div>
                  <div>
                    <h3 className="font-medium text-[#111b21]">{selectedTicket.name}</h3>
                    <span className="text-[12px] text-[#667781]">Solicitante</span>
                  </div>
                </div>
                <div className="flex gap-5 text-[#54656f]">
                  <Search className="w-5 h-5 cursor-pointer" />
                  <MoreVertical className="w-5 h-5 cursor-pointer" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-10 flex flex-col gap-2 z-10 custom-scrollbar">
                <div className="self-center bg-white px-3 py-1.5 rounded-lg shadow-sm text-[11px] text-[#54656f] uppercase font-medium tracking-wide mb-6">
                  {new Date(selectedTicket.timestamp).toLocaleDateString()}
                </div>

                <div className="self-start max-w-[85%] md:max-w-[70%] bg-white p-2 rounded-lg rounded-tl-none shadow-sm relative">
                  <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
                  <div className="text-[12px] font-bold text-[#e53935] px-2 pt-1 uppercase">DADOS DO PEDIDO</div>
                  <div className="px-2 py-2 space-y-2 text-[14.5px] text-[#111b21]">
                    <div className="bg-[#f0f2f5] p-3 rounded-md">
                      <p><b>Nome:</b> {selectedTicket.name}</p>
                      <p><b>Tel:</b> {selectedTicket.phone}</p>
                      <p><b>Serviço:</b> {selectedTicket.serviceType}</p>
                      <div className="mt-4 pt-3 border-t border-[#d1d7db]">
                        <b className="text-[12px] text-[#54656f] uppercase">Descrição do Problema:</b>
                        <p className="mt-1 italic text-[#111b21] leading-relaxed">
                          "{selectedTicket.description}"
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#667781] text-right pr-1 pt-1">
                    {new Date(selectedTicket.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <div className="min-h-[62px] bg-[#f0f2f5] px-4 py-2 flex items-center gap-4 z-10">
                <Smile className="w-7 h-7 text-[#54656f] cursor-pointer" />
                <Paperclip className="w-6 h-6 text-[#54656f] cursor-pointer rotate-45" />
                
                <button 
                  onClick={handleResponse}
                  className="flex-1 bg-white h-11 px-4 rounded-lg flex items-center justify-between text-[#54656f] hover:bg-gray-50 transition-colors shadow-sm group"
                >
                  <span className="text-sm opacity-60 truncate">Responder para {selectedTicket.name.split(' ')[0]}...</span>
                  <div className="w-8 h-8 bg-[#00a884] rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Send className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </button>
                
                <Mic className="w-7 h-7 text-[#54656f] cursor-pointer" />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 z-10">
              <div className="w-40 h-40 bg-[#e9edef] rounded-full flex items-center justify-center mb-8">
                <LayoutDashboard className="w-20 h-20 text-[#bbc5cb]" />
              </div>
              <h2 className="text-3xl font-light text-[#41525d] mb-4">Mantenha seu celular conectado</h2>
              <p className="text-[#667781] text-sm max-w-sm leading-relaxed">
                Selecione um chamado à esquerda para iniciar o atendimento diretamente no WhatsApp oficial do seu cliente.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ced3d6; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
