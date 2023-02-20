import React from 'react';

const Footer = () => {
  return (
    <div className="w-full text-center p-6">
      <div className="flex flex-col items-center justify-center text-sm">        
        <div className="text-stone-500">
          @{new Date().getFullYear()} | Gustavo Oliveira - Todos direitos reservados
        </div>
      </div>
    </div>
  );
};

export default Footer;
