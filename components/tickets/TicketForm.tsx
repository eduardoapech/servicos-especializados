
import React, { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle2, Wrench, Settings, Hammer, Laptop, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { TicketFormData, ServiceCategory } from '../../types';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import Button from '../ui/Button';

const TicketForm: React.FC<{ initialService?: string }> = ({ initialService = '' }) => {
  const { sendDirectly } = useWhatsApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wasSimulated, setWasSimulated] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>({
    name: '',
    phone: '',
    serviceType: initialService,
    description: ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const result = await sendDirectly(formData);
    
    setIsProcessing(false);
    if (result.success) {
      setWasSimulated(!!result.simulated);
      setIsFinished(true);
    } else {
      alert('Erro ao enviar. Verifique sua conexão ou configurações de API.');
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-blue-500 text-center animate-in fade-in zoom-in duration-500">
        <div className={`w-20 h-20 ${wasSimulated ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-600'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {wasSimulated ? <AlertTriangle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          {wasSimulated ? 'Solicitação Recebida' : 'Solicitação Enviada!'}
        </h3>
        
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          Obrigado, <b>{formData.name}</b>! Seus dados foram salvos. <br/>
          Nossa equipe entrará em contato com você pelo número <b>{formData.phone}</b> em instantes.
        </p>

        <Button onClick={() => setIsFinished(false)} variant="outline" fullWidth className="font-bold">
          Novo Chamado
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
      {isProcessing && (
        <div className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center text-blue-600 animate-in fade-in">
          <Loader2 className="w-16 h-16 animate-spin mb-4" />
          <span className="font-black text-lg">ENVIANDO CHAMADO...</span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-black text-gray-900 uppercase">Novo Chamado</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Resposta em instantes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-bold focus:bg-white focus:border-blue-500 transition-all outline-none"
            placeholder="Nome Completo"
          />
          <div className="relative">
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-bold focus:bg-white focus:border-blue-500 transition-all outline-none"
              placeholder="DDD + WhatsApp (ex: 11999998888)"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold uppercase">WhatsApp</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.values(ServiceCategory).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFormData(p => ({...p, serviceType: cat}))}
              className={`p-3 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${
                formData.serviceType === cat
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-100 bg-gray-50 text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <textarea
          name="description"
          rows={2}
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 font-bold focus:bg-white focus:border-blue-500 transition-all outline-none resize-none"
          placeholder="O que você precisa?"
        />

        <Button 
          type="submit" 
          fullWidth 
          className="h-16 text-lg font-black uppercase shadow-xl group rounded-2xl bg-blue-600"
        >
          Enviar Chamado
          <Zap className="w-5 h-5 ml-2 fill-current" />
        </Button>
      </form>
    </div>
  );
};

export default TicketForm;
