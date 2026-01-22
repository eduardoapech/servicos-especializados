
import React from 'react';
import { COMPANY_CONFIG } from '../../constants';
import { AdProps } from '../../types';

const AdBanner: React.FC<AdProps> = ({ slot, format = 'auto', className = '', isVisible = true }) => {
  // Se o plano for premium, não renderiza anúncios
  if (COMPANY_CONFIG.premiumMode || !isVisible) return null;

  return (
    <div className={`w-full overflow-hidden bg-gray-100 border border-dashed border-gray-300 rounded-lg min-h-[100px] flex items-center justify-center relative ${className}`}>
      <span className="text-[10px] absolute top-1 right-2 text-gray-400 uppercase tracking-widest font-bold">Publicidade</span>
      
      {/* Aqui entraria o script real do AdSense */}
      {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-xxx" data-ad-slot={slot} data-ad-format={format}></ins> */}
      
      <div className="text-center p-4">
        <p className="text-gray-400 text-sm font-medium">Espaço Reservado para Anúncio</p>
        <p className="text-gray-300 text-xs italic">Slot: {slot}</p>
      </div>
    </div>
  );
};

export default AdBanner;
