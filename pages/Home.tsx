
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/layout/Hero';
import ServiceCard from '../components/services/ServiceCard';
import TicketForm from '../components/tickets/TicketForm';
import AdBanner from '../components/ads/AdBanner';
import { SERVICES } from '../constants';
import { Service } from '../types';
import { useWhatsApp } from '../hooks/useWhatsApp';

const Home: React.FC = () => {
  const { openDirectChat } = useWhatsApp();
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSelectService = (service: Service) => {
    // Primeiro define o serviço para o formulário captar
    setSelectedService(service.category);
    
    // Pequeno delay para garantir que o estado foi aplicado antes do scroll
    setTimeout(() => {
      const formElement = document.getElementById('secao-formulario');
      if (formElement) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = formElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AdBanner slot="top-home" className="mb-12" />

          {/* Serviços */}
          <section id="servicos" className="mb-20 scroll-mt-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Nossos Serviços</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Soluções rápidas e profissionais para o seu dia a dia.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={handleSelectService}
                  onWhatsApp={() => openDirectChat(undefined, `Olá! Gostaria de falar com um especialista sobre o serviço: *${service.title}*.\n\nTenho interesse em saber mais sobre: ${service.description}`)}
                />
              ))}
            </div>
          </section>

          {/* Chamado */}
          <section id="secao-formulario" className="bg-gray-100 rounded-3xl p-6 md:p-12 mb-12 scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Abertura de Chamado Digital</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Não perca tempo em filas de espera. Preencha os detalhes e nossa equipe 
                  entrará em contato diretamente via WhatsApp.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Escolha seu serviço no formulário
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Clique em enviar para registrar sua solicitação
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Aguarde o contato da nossa equipe
                  </li>
                </ul>
              </div>
              
              <div>
                <TicketForm initialService={selectedService} />
              </div>
            </div>
          </section>

          <AdBanner slot="bottom-home" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
