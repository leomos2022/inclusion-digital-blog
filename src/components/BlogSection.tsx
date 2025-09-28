import React, { useState, useEffect } from 'react';

interface Pregunta {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
}

interface RespuestaEstudiante {
  preguntaId: number;
  respuestaSeleccionada: number;
}

interface Seccion {
  titulo: string;
  contenido: string;
  imagen?: string;
  lado?: 'izquierda' | 'derecha';
  tieneFormulario?: boolean;
  tieneVideo?: boolean;
  videoUrl?: string;
  tieneTest?: boolean;
  preguntas?: Pregunta[];
  tieneMapa?: boolean;
  mapaUrl?: string;
}

interface Modulo {
  id: string;
  titulo: string;
  subtitulo?: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  duracion?: string;
  secciones: Seccion[];
}

interface BlogSectionProps {
  activeSection: string;
}

const modulos: Modulo[] = [
  {
    id: 'modulo1',
    titulo: 'Módulo 1',
    descripcion: 'Introducción personal al proyecto. Conoce al autor, su comunidad y metodología de trabajo en un contexto real y auténtico.',
    icono: '👤',
    color: 'from-blue-500 to-indigo-600',
    duracion: '15 min lectura',
    secciones: [
      {
        titulo: '¿Quién soy?',
        contenido: 'Leonardo Mosquera Rodríguez. Estudiante de Ingeniería de Software en Uniminuto. RCC: 123456789. Universidad: Uniminuto. Email: leonardo.mosquera@uniminuto.edu.co.',
        imagen: 'https://i.imgur.com/JQv4hvL.jpeg',
        lado: 'derecha'
      },
      {
        titulo: '¿Qué comunidad o grupo social voy a trabajar?',
        contenido: 'Familia: Onesimo Mosquera, Aracely Rodríguez, Oscar Silva, Ruth Rodriguez, Rodolfo Mantilla.',
        imagen: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '¿Dónde se encuentra mi grupo social?',
        contenido: 'Mi grupo social se encuentra en Medellín, Barrancabermeja, Floridablanca (Santander) y Bogotá. Dirección: calle 78b 120-93 Engativá Bogotá.',
        tieneMapa: true,
        mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.863778967485!2d-74.13245!3d4.708777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDInMzEuNiJOIDc0wrogMDcnNTIuOCJX!5e0!3m2!1ses!2sco!4v1695910000000!5m2!1ses!2sco',
        lado: 'derecha'
      },
      {
        titulo: '¿En qué modalidad voy a realizar mis prácticas?',
        contenido: 'Modalidad remota. Jueves de 5:30 p.m. a 7:00 p.m. Sesiones de 90 minutos.',
        imagen: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      }
    ]
  },
  {
    id: 'modulo2',
    titulo: 'Módulo 2 - Proyecto Inclusión Digital',
    subtitulo: 'Visibilizando la brecha digital en nuestra comunidad',
    descripcion: 'Análisis profundo de la brecha digital en Colombia. Incluye datos de DANE y MinTIC, video explicativo y análisis local, nacional e internacional.',
    icono: '📊',
    color: 'from-emerald-500 to-teal-600',
    duracion: '25 min lectura',
    secciones: [
      { 
        titulo: 'Presentación del Proyecto', 
        contenido: 'El objetivo de este blog es visibilizar la brecha digital que afecta a nuestra comunidad, compartir recursos educativos accesibles y proponer soluciones innovadoras que fomenten la inclusión digital. A través de este espacio, buscamos crear conciencia sobre las desigualdades tecnológicas y empoderar a las personas con herramientas y conocimientos que les permitan participar activamente en la sociedad digital.',
        imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      { 
        titulo: 'Video Explicativo del Proyecto', 
        contenido: 'El video presenta los objetivos principales del proyecto de inclusión digital, destacando la importancia de construir puentes tecnológicos para cerrar la brecha digital en nuestra comunidad.',
        lado: 'derecha',
        tieneVideo: true,
        videoUrl: 'https://www.youtube.com/embed/W0b_iJPu-U4'
      },
      { 
        titulo: 'Análisis a Nivel Nacional (DANE y MinTIC)', 
        contenido: 'Según el reporte "Índice de Brecha Digital" de 2022, Colombia ha logrado avances significativos en conectividad general, especialmente con la expansión de redes 4G y la llegada del 5G a algunas ciudades. Sin embargo, la brecha persiste entre el campo y la ciudad. El Índice de Brecha Digital para Colombia en 2022 fue de 0,400, donde un valor más cercano a cero implica menor brecha.\n\nLas Habilidades Digitales (34,9%) y el Acceso Material (31,2%) son los mayores factores que contribuyen a esta desigualdad, demostrando que no basta con tener infraestructura; la capacidad y conocimiento para usarla son igualmente importantes.\n\nLos departamentos de la Amazonía y Orinoquía, como Vichada, Vaupés, Guainía y Amazonas, muestran los índices más altos, superando el 0,5, evidenciando la necesidad de políticas públicas más focalizadas.',
        imagen: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: 'Test de Comprensión: Brecha Digital en Colombia',
        contenido: 'Evalúa tu comprensión sobre la brecha digital en Colombia respondiendo las siguientes preguntas basadas en el contenido del módulo.',
        tieneTest: true,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuál fue el Índice de Brecha Digital para Colombia en 2022?",
            opciones: [
              "0,200",
              "0,400", 
              "0,600",
              "0,800"
            ],
            respuestaCorrecta: 1,
            explicacion: "El Índice de Brecha Digital para Colombia en 2022 fue de 0,400, donde un valor más cercano a cero implica menor brecha."
          },
          {
            id: 2,
            pregunta: "¿Cuáles son los dos mayores factores que contribuyen a la brecha digital en Colombia?",
            opciones: [
              "Infraestructura y Costos",
              "Habilidades Digitales (34,9%) y Acceso Material (31,2%)",
              "Ubicación Geográfica y Educación",
              "Conectividad 4G y 5G"
            ],
            respuestaCorrecta: 1,
            explicacion: "Las Habilidades Digitales (34,9%) y el Acceso Material (31,2%) son los mayores factores que contribuyen a esta desigualdad."
          },
          {
            id: 3,
            pregunta: "¿Qué departamentos muestran los índices más altos de brecha digital?",
            opciones: [
              "Antioquia, Cundinamarca y Valle",
              "Atlántico, Bolívar y Magdalena", 
              "Vichada, Vaupés, Guainía y Amazonas",
              "Santander, Norte de Santander y Cesar"
            ],
            respuestaCorrecta: 2,
            explicacion: "Los departamentos de la Amazonía y Orinoquía, como Vichada, Vaupés, Guainía y Amazonas, muestran los índices más altos, superando el 0,5."
          },
          {
            id: 4,
            pregunta: "¿Qué tecnologías han contribuido a los avances en conectividad en Colombia?",
            opciones: [
              "Solo redes 3G",
              "Expansión de redes 4G y la llegada del 5G a algunas ciudades",
              "Únicamente fibra óptica",
              "Solo conexiones satelitales"
            ],
            respuestaCorrecta: 1,
            explicacion: "Colombia ha logrado avances significativos en conectividad general, especialmente con la expansión de redes 4G y la llegada del 5G a algunas ciudades."
          },
          {
            id: 5,
            pregunta: "¿Qué demuestra la importancia de las Habilidades Digitales como factor de brecha?",
            opciones: [
              "Que la infraestructura es lo único importante",
              "Que no basta con tener infraestructura; la capacidad y conocimiento para usarla son igualmente importantes",
              "Que solo importa el acceso a internet",
              "Que la educación tradicional es suficiente"
            ],
            respuestaCorrecta: 1,
            explicacion: "Esto demuestra que no basta con tener infraestructura; la capacidad y conocimiento para usarla son igualmente importantes."
          }
        ]
      }
    ]
  },
  {
    id: 'modulo3',
    titulo: 'Módulo 3 - Metodología y Desarrollo',
    descripcion: 'Metodologías aplicadas, herramientas utilizadas y proceso de desarrollo del proyecto de inclusión digital.',
    icono: '🔧',
    color: 'from-purple-500 to-pink-600',
    duracion: '20 min lectura',
    secciones: [
      {
        titulo: 'Metodología de Investigación',
        contenido: 'Metodología de investigación mixta aplicada al estudio de la brecha digital, incluyendo enfoques cuantitativos y cualitativos para un análisis integral.',
        imagen: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      }
    ]
  },
  {
    id: 'modulo4',
    titulo: 'Módulo 4 - Resultados y Conclusiones',
    descripcion: 'Resultados obtenidos, análisis de impacto y conclusiones del proyecto de investigación sobre inclusión digital.',
    icono: '📈',
    color: 'from-orange-500 to-red-600',
    duracion: '18 min lectura',
    secciones: [
      {
        titulo: 'Resultados del Estudio',
        contenido: 'Principales hallazgos del estudio sobre brecha digital y su impacto en las comunidades analizadas.',
        imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      }
    ]
  }
];

interface BlogSectionProps {
  activeSection: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ activeSection }) => {
  const [moduloActivo, setModuloActivo] = useState<string | null>(null);
  const [vistaActual, setVistaActual] = useState<'overview' | 'detail'>('overview');
  const [respuestasTest, setRespuestasTest] = useState<RespuestaEstudiante[]>([]);
  const [testCompletado, setTestCompletado] = useState(false);
  const [mostrandoResultados, setMostrandoResultados] = useState(false);

  // Efecto para manejar navegación desde Header
  useEffect(() => {
    if (activeSection.startsWith('modulo')) {
      setModuloActivo(activeSection);
      setVistaActual('detail');
    } else if (activeSection === 'inicio') {
      setModuloActivo(null);
      setVistaActual('overview');
    }
  }, [activeSection]);

  const handleModuloClick = (moduloId: string) => {
    setModuloActivo(moduloId);
    setVistaActual('detail');
  };

  const handleBackToOverview = () => {
    setModuloActivo(null);
    setVistaActual('overview');
    setRespuestasTest([]);
    setTestCompletado(false);
    setMostrandoResultados(false);
  };

  const handleRespuestaTest = (preguntaId: number, respuestaSeleccionada: number) => {
    setRespuestasTest(prev => {
      const nuevasRespuestas = prev.filter(r => r.preguntaId !== preguntaId);
      return [...nuevasRespuestas, { preguntaId, respuestaSeleccionada }];
    });
  };

  const handleSubmitTest = (preguntas: Pregunta[]) => {
    if (respuestasTest.length === preguntas.length) {
      setTestCompletado(true);
      setMostrandoResultados(true);
    }
  };

  const calcularPuntaje = (preguntas: Pregunta[]) => {
    let correctas = 0;
    preguntas.forEach(pregunta => {
      const respuesta = respuestasTest.find(r => r.preguntaId === pregunta.id);
      if (respuesta && respuesta.respuestaSeleccionada === pregunta.respuestaCorrecta) {
        correctas++;
      }
    });
    return { correctas, total: preguntas.length, porcentaje: Math.round((correctas / preguntas.length) * 100) };
  };

  const moduloSeleccionado = modulos.find(m => m.id === moduloActivo);

  if (vistaActual === 'detail' && moduloSeleccionado) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Navegación de regreso */}
          <div className="mb-8">
            <button
              onClick={handleBackToOverview}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a módulos
            </button>
          </div>

          {/* Header del módulo */}
          <div className="text-center mb-16">
            <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${moduloSeleccionado.color} text-white text-4xl mb-6 shadow-lg`}>
              {moduloSeleccionado.icono}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {moduloSeleccionado.titulo}
            </h1>
            {moduloSeleccionado.subtitulo && (
              <p className="text-xl md:text-2xl text-blue-600 italic font-light mb-4">
                {moduloSeleccionado.subtitulo}
              </p>
            )}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {moduloSeleccionado.descripcion}
            </p>
            {moduloSeleccionado.duracion && (
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {moduloSeleccionado.duracion}
              </div>
            )}
          </div>

          {/* Contenido de las secciones */}
          <div className="space-y-20">
            {moduloSeleccionado.secciones.map((seccion, idx) => (
              <div key={idx} className="animate-fade-in">
                {seccion.imagen || (seccion.tieneVideo && seccion.videoUrl) || (seccion.tieneMapa && seccion.mapaUrl) ? (
                  <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                    seccion.lado === 'izquierda' ? 'lg:flex-row-reverse' : ''
                  }`}>
                    <div className="flex-1 max-w-2xl">
                      {/* Texto sin card - solo sobre el fondo */}
                      <div className="p-2">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                          {seccion.titulo}
                        </h3>
                        <div className="prose prose-xl max-w-none text-gray-800 leading-relaxed">
                          <p className="whitespace-pre-line text-lg">
                            {seccion.contenido}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 max-w-lg">
                      {seccion.tieneVideo && seccion.videoUrl ? (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                          <iframe
                            width="100%"
                            height="100%"
                            src={seccion.videoUrl}
                            title={seccion.titulo}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      ) : seccion.tieneMapa && seccion.mapaUrl ? (
                        <div className="w-full h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200">
                          <iframe
                            width="100%"
                            height="100%"
                            src={seccion.mapaUrl}
                            title={`Mapa de ${seccion.titulo}`}
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen
                            className="w-full h-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      ) : seccion.imagen ? (
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                          <img
                            src={seccion.imagen}
                            alt={seccion.titulo}
                            className="w-full h-80 object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : seccion.tieneTest && seccion.preguntas ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-emerald-500">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <span className="text-3xl mr-3">🧪</span>
                        {seccion.titulo}
                      </h3>
                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                        <p className="whitespace-pre-line">
                          {seccion.contenido}
                        </p>
                      </div>

                      {!mostrandoResultados ? (
                        <div className="space-y-8">
                          {seccion.preguntas.map((pregunta, preguntaIdx) => {
                            const respuestaSeleccionada = respuestasTest.find(r => r.preguntaId === pregunta.id)?.respuestaSeleccionada;
                            
                            return (
                              <div key={pregunta.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                  {preguntaIdx + 1}. {pregunta.pregunta}
                                </h4>
                                <div className="space-y-3">
                                  {pregunta.opciones.map((opcion, opcionIdx) => (
                                    <label
                                      key={opcionIdx}
                                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                        respuestaSeleccionada === opcionIdx
                                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-900'
                                          : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`pregunta-${pregunta.id}`}
                                        value={opcionIdx}
                                        checked={respuestaSeleccionada === opcionIdx}
                                        onChange={() => handleRespuestaTest(pregunta.id, opcionIdx)}
                                        className="mt-1 mr-3 text-blue-600"
                                      />
                                      <span className="flex-1 text-gray-800">{opcion}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            );
                          })}

                          <div className="text-center pt-8">
                            <button
                              onClick={() => handleSubmitTest(seccion.preguntas!)}
                              disabled={respuestasTest.length !== seccion.preguntas.length}
                              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                                respuestasTest.length === seccion.preguntas.length
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {respuestasTest.length === seccion.preguntas.length ? 'Ver Resultados' : `Responde todas las preguntas (${respuestasTest.length}/${seccion.preguntas.length})`}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {(() => {
                            const puntaje = calcularPuntaje(seccion.preguntas);
                            return (
                              <div className="text-center mb-8">
                                <div className={`inline-block p-6 rounded-full text-4xl mb-4 ${
                                  puntaje.porcentaje >= 80 ? 'bg-green-100 text-green-600' :
                                  puntaje.porcentaje >= 60 ? 'bg-yellow-100 text-yellow-600' :
                                  'bg-red-100 text-red-600'
                                }`}>
                                  {puntaje.porcentaje >= 80 ? '🎉' : puntaje.porcentaje >= 60 ? '👍' : '📚'}
                                </div>
                                <h4 className="text-3xl font-bold text-gray-900 mb-2">
                                  Tu puntuación: {puntaje.correctas}/{puntaje.total}
                                </h4>
                                <p className={`text-xl font-medium ${
                                  puntaje.porcentaje >= 80 ? 'text-green-600' :
                                  puntaje.porcentaje >= 60 ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {puntaje.porcentaje}% - {
                                    puntaje.porcentaje >= 80 ? '¡Excelente comprensión!' :
                                    puntaje.porcentaje >= 60 ? 'Buen trabajo, puedes mejorar' :
                                    'Te recomendamos repasar el contenido'
                                  }
                                </p>
                              </div>
                            );
                          })()}

                          {seccion.preguntas.map((pregunta, preguntaIdx) => {
                            const respuestaUsuario = respuestasTest.find(r => r.preguntaId === pregunta.id);
                            const esCorrecta = respuestaUsuario?.respuestaSeleccionada === pregunta.respuestaCorrecta;
                            
                            return (
                              <div key={pregunta.id} className={`rounded-xl p-6 border-2 ${
                                esCorrecta ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                              }`}>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                  <span className={`text-2xl mr-2 ${esCorrecta ? 'text-green-500' : 'text-red-500'}`}>
                                    {esCorrecta ? '✅' : '❌'}
                                  </span>
                                  {preguntaIdx + 1}. {pregunta.pregunta}
                                </h4>
                                
                                <div className="space-y-2 mb-4">
                                  {pregunta.opciones.map((opcion, opcionIdx) => {
                                    const esRespuestaCorrecta = opcionIdx === pregunta.respuestaCorrecta;
                                    const esRespuestaUsuario = respuestaUsuario?.respuestaSeleccionada === opcionIdx;
                                    
                                    return (
                                      <div
                                        key={opcionIdx}
                                        className={`p-3 rounded-lg border-2 ${
                                          esRespuestaCorrecta 
                                            ? 'bg-green-100 border-green-300 text-green-800' 
                                            : esRespuestaUsuario && !esRespuestaCorrecta
                                            ? 'bg-red-100 border-red-300 text-red-800'
                                            : 'bg-white border-gray-200 text-gray-700'
                                        }`}
                                      >
                                        <span className="flex items-center">
                                          {esRespuestaCorrecta && <span className="text-green-600 mr-2">✓</span>}
                                          {esRespuestaUsuario && !esRespuestaCorrecta && <span className="text-red-600 mr-2">✗</span>}
                                          {opcion}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                  <p className="text-sm text-blue-800">
                                    <strong>Explicación:</strong> {pregunta.explicacion}
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                          <div className="text-center pt-8 space-x-4">
                            <button
                              onClick={() => {
                                setRespuestasTest([]);
                                setTestCompletado(false);
                                setMostrandoResultados(false);
                              }}
                              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              Intentar de nuevo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto text-center">
                    {/* Texto sin card - solo sobre el fondo */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                      {seccion.titulo}
                    </h3>
                    <div className="prose prose-xl max-w-none mx-auto text-gray-800 leading-relaxed">
                      <p className="whitespace-pre-line text-lg">
                        {seccion.contenido || <span className="italic text-gray-400">(Por completar)</span>}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header principal */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Blog Inclusión Digital
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12">
            Un proyecto académico que explora la brecha digital en Colombia y propone soluciones 
            innovadoras para fomentar la inclusión tecnológica en nuestras comunidades.
          </p>
          
          {/* Enlace a OneDrive */}
          <div className="mb-12">
            <a
              href="https://uniminuto0-my.sharepoint.com/:f:/g/personal/leonardo_mosquera_uniminuto_edu_co/EtRyE_OkTDtOoSMrxjGA3xsBioQNFG7Vb8Wt1YoHagwS8w?e=FnCeeU"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 10l5 5 5-5" />
              </svg>
              Acceder a OneDrive
            </a>
          </div>
        </div>

        {/* Grid de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {modulos.map((modulo) => (
            <div 
              key={modulo.id}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => handleModuloClick(modulo.id)}
            >
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-full">
                {/* Header del card con gradiente */}
                <div className={`p-8 bg-gradient-to-r ${modulo.color} text-white relative overflow-hidden`}>
                  <div className="absolute -top-4 -right-4 text-6xl opacity-20">
                    {modulo.icono}
                  </div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">
                      {modulo.icono}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {modulo.titulo.includes('Módulo') ? modulo.titulo.split(' - ')[0] : modulo.titulo}
                    </h3>
                    {modulo.titulo.includes(' - ') && (
                      <p className="text-lg opacity-90 font-medium">
                        {modulo.titulo.split(' - ')[1]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contenido del card */}
                <div className="p-8">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {modulo.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      {modulo.duracion && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium">{modulo.duracion}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="text-sm font-semibold mr-2">Explorar</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Estadísticas del módulo */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{modulo.secciones.length} secciones</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 font-medium">Disponible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Sobre este proyecto</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
            Este blog académico presenta una investigación integral sobre la brecha digital en Colombia, 
            desarrollado como parte del proyecto de inclusión digital. Cada módulo aborda aspectos 
            específicos del problema, desde el contexto personal del investigador hasta análisis 
            profundos con datos oficiales de DANE y MinTIC.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>Universidad Uniminuto</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Leonardo Mosquera</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7h8m-8 0v11a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v9a2 2 0 002 2h1M7 16h4v-4H7v4z" />
              </svg>
              <span>Ingeniería de Software</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
