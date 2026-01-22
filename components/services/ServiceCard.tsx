
import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import Button from '../ui/Button';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  onWhatsApp: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, onWhatsApp }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
      
      <div className="space-y-3">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={() => onSelect(service)}
          className="gap-2"
        >
          Solicitar Serviço
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          onClick={onWhatsApp}
          className="gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp Direto
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
