import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', id: 'inicio', color: 'from-gray-500 to-gray-600' },
    { name: 'Módulo 1', id: 'modulo1', color: 'from-blue-500 to-indigo-600' },
    { name: 'Módulo 2', id: 'modulo2', color: 'from-emerald-500 to-teal-600' },
    { name: 'Módulo 3', id: 'modulo3', color: 'from-purple-500 to-pink-600' },
    { name: 'Módulo 4', id: 'modulo4', color: 'from-orange-500 to-red-600' },
    { name: 'Módulo 5', id: 'modulo5', color: 'from-purple-600 to-indigo-700' },
    { name: 'OneDrive', id: 'onedrive', link: 'https://uniminuto0-my.sharepoint.com/:f:/g/personal/leonardo_mosquera_uniminuto_edu_co/EtRyE_OkTDtOoSMrxjGA3xsBioQNFG7Vb8Wt1YoHagwS8w?e=FnCeeU', color: 'from-green-500 to-emerald-600' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm min-h-screen flex flex-col justify-start">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Inclusión Digital</h1>
        <nav className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {navItems.map((item) => (
              item.link ? (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-gradient-to-r ${item.color} text-white hover:opacity-90`}
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
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
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-3 space-y-3 bg-white border-t">
            {navItems.map((item) => (
              item.link ? (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r ${item.color} text-white hover:opacity-90`}
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="w-full h-full flex flex-col items-center justify-center">
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
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-w-[280px] max-w-lg w-full">
              <div className="text-center text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Estudiante:</span> Leonardo Mosquera Rodríguez (ID: 922268)</p>
                <p><span className="font-medium">Docente:</span> Jessica Sabina Alvarez Ariza</p>
                <p><span className="font-medium">Institución:</span> UNIMINUTO - Bogotá, Colombia</p>
                <p><span className="font-medium">Asignatura:</span> Práctica en Responsabilidad Social (NRC-3327)</p>
                <p><span className="font-medium">Período:</span> Septiembre de 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
