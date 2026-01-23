
import React, { useEffect, useRef } from 'react';
import { COMPANY_CONFIG } from '../../constants';
import { AdProps } from '../../types';

const AdBanner: React.FC<AdProps> = ({ slot, format = 'auto', className = '', isVisible = true }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Se o plano for premium, não renderiza anúncios
  if (COMPANY_CONFIG.premiumMode || !isVisible) return null;

  useEffect(() => {
    // Resetamos o estado de inicialização se o slot mudar
    initialized.current = false;

    const pushAd = () => {
      // Verifica se o elemento existe e se já tem uma largura calculada pelo navegador
      if (adRef.current && adRef.current.offsetWidth > 0) {
        if (!initialized.current) {
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            initialized.current = true;
          } catch (e) {
            console.error("AdSense error:", e);
          }
        }
      } else {
        // Se ainda não tem largura (layout não pronto), tenta novamente em 200ms
        setTimeout(pushAd, 200);
      }
    };

    // Pequeno delay inicial para dar tempo ao Tailwind/Browser processarem o CSS
    const timer = setTimeout(pushAd, 300);
    
    return () => {
      clearTimeout(timer);
      initialized.current = false;
    };
  }, [slot]);

  return (
    <div 
      ref={adRef}
      className={`w-full overflow-hidden flex flex-col items-center justify-center my-4 ${className}`}
      style={{ minWidth: '250px' }} // Sugestão mínima para o AdSense medir corretamente
    >
      <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Publicidade</span>
      
      <div className="w-full bg-gray-50 border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-[100px]">
        {/* Tag Oficial do Google AdSense */}
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '100px' }}
          data-ad-client="ca-pub-2877680986451511"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdBanner;
