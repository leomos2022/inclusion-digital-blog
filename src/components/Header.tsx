import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Modulo 1', id: 'modulo1' },
    { name: 'Modulo 2', id: 'modulo2' },
    { name: 'Modulo 3', id: 'modulo3' },
    { name: 'Modulo 4', id: 'modulo4' },
    { name: 'Modulo 5', id: 'modulo5' },
    { name: 'One Drive', id: 'onedrive', link: 'https://uniminuto0-my.sharepoint.com/:f:/g/personal/leonardo_mosquera_uniminuto_edu_co/EtRyE_OkTDtOoSMrxjGA3xsBioQNFG7Vb8Wt1YoHagwS8w?e=FnCeeU' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    // Scroll suave a la sección si existe
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm min-h-screen flex flex-col justify-start">
      {/* Menú superior */}
  <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Inclusión Digital</h1>
        <nav className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            {navItems.map((item) => (
              item.link ? (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gray-50 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {/* Hero principal */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
          {/* Título y subtítulo centrados arriba del video */}
          <div className="w-full flex flex-col items-center justify-center mt-8 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-700 text-center">Empoderamiento Digital</h2>
            <h3 className="text-xl md:text-2xl mb-4 text-blue-500 text-center">Construyendo Puentes Tecnológicos para la Inclusión</h3>
          </div>
          <div className="w-full flex items-center justify-center mb-8">
            <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/iAYxNaiwIbs?start=103"
                title="Empoderamiento Digital"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ minHeight: '320px', maxHeight: '600px', minWidth: '100%', borderRadius: '1rem' }}
              ></iframe>
            </div>
          </div>
          {/* Card de presentación unificada debajo del video y animación azul rey */}
          <div className="w-full flex flex-col items-center mb-8">
            {/* Eliminado el texto azul rey debajo del video */}
            <div className="bg-white text-gray-900 rounded-xl shadow-lg p-8 min-w-[280px] max-w-xl w-full animate-fade-in">
              <h4 className="font-bold text-xl mb-2 text-blue-700">Presentado por</h4>
              <p className="mb-1">Leonardo Mosquera Rodríguez</p>
              <p className="mb-1">ID 922268</p>
              <p className="mb-1">Docente: Jessica Sabina Alvarez Ariza</p>
              <p className="mb-1">Ciudad: Bogotá, Colombia</p>
              <p className="mb-1">Corporación Universitaria Minuto de Dios</p>
              <p className="mb-1">Práctica en Responsabilidad Social</p>
              <p className="mb-1">NRC-3327</p>
              <p className="mb-1">Septiembre de 2025</p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              item.link ? (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left block px-3 py-2 text-base font-medium transition-colors duration-200 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-800 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;