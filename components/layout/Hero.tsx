
import React from 'react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('secao-formulario');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-blue-600 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Serviços Profissionais a <br className="hidden md:block" />
          <span className="text-blue-200">Um Toque de Distância</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Resolva seus problemas técnicos com quem entende do assunto. 
          Abra um chamado agora e receba atendimento via WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="w-full sm:w-auto" 
            onClick={scrollToForm}
          >
            Solicitar Serviço
          </Button>
          <a href="#servicos">
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto">
              Ver Catálogo
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
