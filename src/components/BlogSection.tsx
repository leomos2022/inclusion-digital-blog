
import React from 'react';

const modulos = [
  {
    id: 'modulo1',
    titulo: 'Módulo 1',
    secciones: [
      {
        titulo: '¿Quién soy?',
        contenido: 'Leonardo Mosquera Rodríguez. Estudiante de Ingeniería de Software en Uniminuto. RCC: 123456789. Universidad: Uniminuto. Email: leonardo.mosquera@uniminuto.edu.co.'
      },
      {
        titulo: '¿Qué comunidad o grupo social voy a trabajar?',
        contenido: 'Familia: Onesimo Mosquera, Aracely Rodríguez, Oscar Silva, Ruth Rodriguez, Rodolfo Mantilla.'
      },
      {
        titulo: '¿Dónde se encuentra mi grupo social?',
        contenido: 'Mi grupo social se encuentra en Medellín, Barrancabermeja, Floridablanca (Santander) y Bogotá. Dirección: calle 78b 120-93 Engativá Bogotá.'
      },
      {
        titulo: '¿En qué modalidad voy a realizar mis prácticas?',
        contenido: 'Modalidad remota. Jueves de 5:30 p.m. a 7:00 p.m. Sesiones de 90 minutos.'
      }
    ]
  },
  {
    id: 'modulo2',
    titulo: 'Módulo 2',
    secciones: [
      { titulo: '¿Quién soy?', contenido: '' },
      { titulo: '¿Qué comunidad o grupo social voy a trabajar?', contenido: '' },
      { titulo: '¿Dónde se encuentra mi grupo social?', contenido: '' },
      { titulo: '¿En qué modalidad voy a realizar mis prácticas?', contenido: '' }
    ]
  },
  {
    id: 'modulo3',
    titulo: 'Módulo 3',
    secciones: [
      { titulo: '¿Quién soy?', contenido: '' },
      { titulo: '¿Qué comunidad o grupo social voy a trabajar?', contenido: '' },
      { titulo: '¿Dónde se encuentra mi grupo social?', contenido: '' },
      { titulo: '¿En qué modalidad voy a realizar mis prácticas?', contenido: '' }
    ]
  },
  {
    id: 'modulo4',
    titulo: 'Módulo 4',
    secciones: [
      { titulo: '¿Quién soy?', contenido: '' },
      { titulo: '¿Qué comunidad o grupo social voy a trabajar?', contenido: '' },
      { titulo: '¿Dónde se encuentra mi grupo social?', contenido: '' },
      { titulo: '¿En qué modalidad voy a realizar mis prácticas?', contenido: '' }
    ]
  },
  {
    id: 'modulo5',
    titulo: 'Módulo 5',
    secciones: [
      { titulo: '¿Quién soy?', contenido: '' },
      { titulo: '¿Qué comunidad o grupo social voy a trabajar?', contenido: '' },
      { titulo: '¿Dónde se encuentra mi grupo social?', contenido: '' },
      { titulo: '¿En qué modalidad voy a realizar mis prácticas?', contenido: '' }
    ]
  }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {modulos.map((modulo) => (
              <a
                key={modulo.id}
                href={`#${modulo.id}`}
                className="px-5 py-2 rounded border border-blue-400 text-sm font-semibold transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ borderRadius: '6px' }}
              >
                {modulo.titulo}
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-12">
          {modulos.map((modulo) => (
            <div key={modulo.id} id={modulo.id} className="bg-white rounded-xl shadow-md p-8 animate-fade-in">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">{modulo.titulo}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modulo.secciones.map((sec, idx) => {
                  // Diseño especial para las cards de Módulo 1
                  let cardClass = `mb-4 p-6 rounded-lg shadow-lg transition-transform duration-300 bg-gradient-to-br from-blue-50 to-blue-100 hover:scale-105 hover:shadow-2xl animate-fade-in`;
                  let titleClass = "text-lg font-semibold text-blue-600 mb-2";
                  let cardStyle = { borderRadius: '12px' };
                  if (modulo.id === 'modulo1') {
                    // Alternar colores llamativos pero formales
                    const colors = [
                      'bg-gradient-to-br from-blue-200 to-blue-400',
                      'bg-gradient-to-br from-pink-200 to-pink-400',
                      'bg-gradient-to-br from-yellow-200 to-yellow-400',
                      'bg-gradient-to-br from-green-200 to-green-400'
                    ];
                    cardClass = `mb-4 p-6 rounded border-2 border-blue-200 shadow-lg transition-transform duration-300 ${colors[idx % colors.length]} hover:scale-105 hover:shadow-2xl animate-fade-in`;
                    titleClass = "text-lg font-semibold text-blue-900 mb-2";
                    cardStyle = { borderRadius: '6px' };
                  }
                  return (
                    <div
                      key={idx}
                      className={cardClass}
                      style={cardStyle}
                    >
                      <h4 className={titleClass}>{sec.titulo}</h4>
                      {modulo.id === 'modulo1' && sec.titulo === '¿Dónde se encuentra mi grupo social?' ? (
                        <>
                          <p className="text-gray-700 whitespace-pre-line mb-4">{sec.contenido}</p>
                          <iframe
                            title="Mapa de Google"
                            src="https://www.google.com/maps?q=calle+78b+120-93+Engativa+Bogota&output=embed"
                            width="100%"
                            height="250"
                            className="rounded-md border-2 border-blue-200 shadow"
                            style={{ minHeight: '200px' }}
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        </>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-line">{sec.contenido || <span className="italic text-gray-400">(Por completar)</span>}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;