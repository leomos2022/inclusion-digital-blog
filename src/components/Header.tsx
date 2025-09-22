import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Celulares', id: 'celulares' },
    { name: 'Correo', id: 'correo' },
    { name: 'Microsoft Office', id: 'office' },
    { name: 'IA', id: 'ia' },
    { name: 'Seguridad', id: 'seguridad' },
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
          <div className="w-full flex items-center justify-center mb-8 mt-8">
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
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700 text-center">Empoderamiento Digital</h2>
            <h3 className="text-xl md:text-2xl mb-6 text-blue-500 text-center">Construyendo Puentes Tecnológicos para la Inclusión</h3>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              Mientras tecleamos y navegamos por un mundo de información infinita, hay miles de corazones y mentes que permanecen en silencio digital, desconectados de las oportunidades que damos por sentado. La tecnología, esa ventana que nos conecta con el universo, se convierte en una barrera invisible para aquellos que viven en la lejanía, en las zonas rurales de nuestra amada Colombia, donde la señal es una fantasía y un smartphone un lujo inalcanzable.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              Pero la tragedia no termina ahí. La verdadera ironía es que incluso aquellos con acceso material a menudo viven en una ilusión de conectividad. Usamos nuestros dispositivos para el consumo trivial, para la superficialidad de las redes sociales, mientras el vasto potencial de la educación, el emprendimiento y la innovación se desvanece ante nuestros ojos.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              La tecnología es un espejo que nos confronta con nuestra propia indolencia: nos muestra un mundo de posibilidades, pero somos nosotros quienes elegimos mirar el reflejo de nuestro propio desinterés, ignorando que cada clic y cada "me gusta" podría ser una herramienta para construir un futuro mejor y más inclusivo. Es tiempo de despertar, de reconocer que la brecha digital no es solo una falta de acceso, sino una responsabilidad moral que nos llama a actuar.
            </p>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
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
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;