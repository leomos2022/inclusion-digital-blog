import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Empoderamiento Digital
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-light">
            Construyendo Puentes Tecnológicos para la Inclusión
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;