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
        contenido: 'Leonardo Mosquera Rodríguez. Estudiante de Ingeniería de Software en Uniminuto. NRC - 3327 Práctica en Responsabilidad Social. Universidad: Uniminuto. Email: leonardo.mosquera@uniminuto.edu.co.',
        imagen: 'https://i.imgur.com/JQv4hvL.jpeg',
        lado: 'derecha'
      },
      {
        titulo: '¿Qué comunidad o grupo social voy a trabajar?',
        contenido: 'Mi núcleo familiar conformado por mis padres Onesimo Mosquera y Aracely Rodriguez, mis hermanos Oscar Silva y Ruth Rodriguez, y mis abuelos Rodolfo Mantilla y Cleotilde Rodriguez. Una familia que representa la diversidad generacional y las diferentes necesidades de inclusión digital.',
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
    subtitulo: 'Construyendo puentes tecnológicos en nuestras comunidades',
    descripcion: 'Proyecto de responsabilidad social enfocado en reducir la brecha digital familiar y comunitaria a través de educación tecnológica inclusiva.',
    icono: '📊',
    color: 'from-emerald-500 to-teal-600',
    duracion: '30 min lectura',
    secciones: [
      { 
        titulo: 'Título del Proyecto', 
        contenido: '"INCLUSIÓN DIGITAL FAMILIAR: CONSTRUYENDO PUENTES TECNOLÓGICOS PARA REDUCIR LA BRECHA DIGITAL EN COMUNIDADES VULNERABLES DE COLOMBIA"\n\nProyecto de Responsabilidad Social\nUniversidad Uniminuto - Ingeniería de Software\nAutor: Leonardo Mosquera Rodríguez\nAño: 2024',
        imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      { 
        titulo: 'Planteamiento de la Problemática y Contexto', 
        contenido: 'Colombia enfrenta una marcada brecha digital que afecta desproporcionadamente a las comunidades vulnerables, especialmente en zonas rurales y periféricas urbanas. Según el DANE (2022), solo el 56.5% de los hogares colombianos tiene acceso a internet, y esta cifra disminuye al 23.8% en áreas rurales.\n\nLa problemática se manifiesta en múltiples dimensiones:\n\n• ACCESO FÍSICO: Limitada infraestructura tecnológica y conectividad\n• ACCESO ECONÓMICO: Altos costos de dispositivos y servicios de internet\n• HABILIDADES DIGITALES: Falta de competencias para usar efectivamente la tecnología\n• CONTENIDOS RELEVANTES: Escasez de recursos digitales culturalmente pertinentes\n\nEsta situación perpetúa desigualdades socioeconómicas, limita oportunidades educativas y laborales, y excluye a familias enteras de los beneficios de la sociedad digital. La pandemia COVID-19 evidenció dramáticamente estas desigualdades, especialmente en el acceso a educación virtual y servicios gubernamentales digitales.',
        imagen: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      { 
        titulo: 'Objetivos del Proyecto', 
        contenido: 'OBJETIVO GENERAL:\nDesarrollar e implementar un programa de inclusión digital familiar que fortalezca las competencias tecnológicas de comunidades vulnerables, promoviendo el acceso equitativo a las tecnologías de la información y comunicación como herramienta de desarrollo social.\n\nOBJETIVOS ESPECÍFICOS:\n\n1. ALFABETIZACIÓN DIGITAL BÁSICA: Desarrollar competencias fundamentales en el manejo de dispositivos electrónicos, incluyendo encendido, navegación básica y uso de aplicaciones esenciales para la vida cotidiana.\n\n2. NAVEGACIÓN Y ACCESO A INFORMACIÓN: Enseñar el uso efectivo de Internet como herramienta de acceso a información relevante, recursos educativos y contenido de interés personal y comunitario.\n\n3. COMUNICACIÓN DIGITAL: Guiar en la creación y gestión de cuentas de correo electrónico para facilitar la comunicación interpersonal y la realización de trámites básicos en línea.\n\n4. SERVICIOS DIGITALES ESENCIALES: Capacitar en el uso seguro y efectivo de servicios digitales relevantes como pagos en línea, solicitud de citas médicas y videollamadas para mejorar la calidad de vida.\n\n5. SOSTENIBILIDAD Y MULTIPLICACIÓN: Crear redes de apoyo familiar que permitan la continuidad del aprendizaje y la transferencia de conocimientos entre generaciones.',
        imagen: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      { 
        titulo: 'Registro de Estudiantes - Cuestionario de Diagnóstico', 
        contenido: 'Para una implementación efectiva del proyecto, es fundamental conocer las necesidades específicas y el nivel actual de competencias digitales de los participantes.\n\n📝 CUESTIONARIO DE DIAGNÓSTICO\n\nAntes de iniciar las sesiones de capacitación, todos los estudiantes interesados deben completar nuestro cuestionario de diagnóstico que nos permitirá:\n\n• Evaluar el nivel actual de conocimientos digitales\n• Identificar necesidades específicas de cada participante\n• Adaptar el contenido y metodología de las sesiones\n• Establecer grupos de trabajo homogéneos\n• Medir el progreso al finalizar el programa\n\nEl cuestionario incluye preguntas sobre:\n- Experiencia previa con dispositivos tecnológicos\n- Nivel de uso de internet y aplicaciones\n- Principales dificultades tecnológicas\n- Expectativas del programa\n- Disponibilidad de tiempo y recursos\n\n¡Tu participación es fundamental para el éxito del proyecto!',
        imagen: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda',
        tieneFormulario: true
      },
      { 
        titulo: 'Video Explicativo del Proyecto', 
        contenido: 'Presentación audiovisual del proyecto de inclusión digital familiar, destacando los objetivos, metodología y el impacto esperado en las comunidades participantes.',
        lado: 'derecha',
        tieneVideo: true,
        videoUrl: 'https://www.youtube.com/embed/W0b_iJPu-U4'
      },
      { 
        titulo: 'Justificación', 
        contenido: 'RELEVANCIA SOCIAL:\nLa inclusión digital es fundamental para garantizar la equidad social en el siglo XXI. Este proyecto se justifica desde múltiples perspectivas:\n\n• DERECHOS HUMANOS: El acceso a la información y las comunicaciones es reconocido como un derecho humano fundamental por la ONU.\n\n• DESARROLLO SOSTENIBLE: Contribuye directamente a los ODS 4 (Educación de Calidad), 8 (Trabajo Decente), 10 (Reducción de Desigualdades) y 16 (Paz y Justicia).\n\n• IMPACTO ECONÓMICO: Las familias digitalmente incluidas tienen mayor acceso a oportunidades laborales, educativas y de emprendimiento.\n\n• COHESIÓN SOCIAL: Reduce el aislamiento y fortalece los vínculos comunitarios a través de redes digitales.\n\n• RESPONSABILIDAD UNIVERSITARIA: Como futuros ingenieros de software, tenemos la responsabilidad ética de usar nuestros conocimientos para generar impacto social positivo.\n\nRELEVANCIA ACADÉMICA:\nEste proyecto integra conocimientos técnicos de ingeniería de software con competencias sociales, desarrollando profesionales integrales comprometidos con la transformación social. Permite aplicar metodologías de investigación-acción participativa y evaluar el impacto real de las intervenciones tecnológicas en comunidades vulnerables.',
        imagen: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      { 
        titulo: 'Análisis a Nivel Nacional (DANE y MinTIC)', 
        contenido: 'SITUACIÓN ACTUAL EN COLOMBIA:\n\nSegún el "Índice de Brecha Digital" de 2022 desarrollado por el DANE y MinTIC, Colombia presenta un índice de 0,400 (donde 0 indica menor brecha), evidenciando desafíos significativos en inclusión digital.\n\nFACTORES CRÍTICOS:\n• Habilidades Digitales: 34.9% de contribución a la brecha\n• Acceso Material: 31.2% de contribución a la brecha\n• Conectividad: 19.8% de contribución a la brecha\n• Uso de TIC: 14.1% de contribución a la brecha\n\nDISPARIDADES REGIONALES:\nLos departamentos de Amazonía y Orinoquía (Vichada, Vaupés, Guainía, Amazonas) muestran índices superiores a 0.5, mientras que Bogotá, Antioquia y Valle del Cauca presentan los menores índices.\n\nAVANCES TECNOLÓGICOS:\n• Expansión de redes 4G a nivel nacional\n• Implementación piloto de 5G en principales ciudades\n• Programa "Hogares Conectados" beneficiando a más de 200,000 familias\n• Estrategia Nacional de Inclusión Digital 2022-2026\n\nEste análisis fundamenta la necesidad urgente de intervenciones focalizadas en comunidades vulnerables.',
        imagen: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: 'Referencias Bibliográficas',
        contenido: 'FUENTES OFICIALES:\n\n• DANE - Departamento Administrativo Nacional de Estadística. (2022). Índice de Brecha Digital Regional en Colombia. Bogotá: DANE.\n\n• MinTIC - Ministerio de Tecnologías de la Información y las Comunicaciones. (2022). Plan Nacional de Desarrollo Digital 2022-2026. Bogotá: MinTIC.\n\n• MinTIC. (2023). Encuesta Nacional de Calidad de Vida Digital. Bogotá: Gobierno de Colombia.\n\nFUENTES ACADÉMICAS:\n\n• Cabero-Almenara, J., & Valencia-Ortiz, R. (2021). Y el COVID-19 transformó al sistema educativo: reflexiones y experiencias por aprender. IJERI: International Journal of Educational Research and Innovation, (15), 218-228.\n\n• Gómez, D., Alves, P., Martins, P., & Inamorato, A. (2018). European Framework for Digitally Competent Educational Organisations. European Commission: Joint Research Centre.\n\n• Ragnedda, M. (2017). The Third Digital Divide: A Weberian Approach to Digital Inequalities. Routledge Studies in Science, Technology and Society.\n\nFUENTES INTERNACIONALES:\n\n• ITU - International Telecommunication Union. (2022). Measuring digital development: Facts and figures 2022. Geneva: ITU.\n\n• CEPAL. (2021). Tecnologías digitales para un nuevo futuro. Santiago: Comisión Económica para América Latina y el Caribe.\n\n• UNESCO. (2020). Inclusión y educación: Todos sin excepción. París: UNESCO.\n\nFUENTES COMPLEMENTARIAS:\n\n• Van Dijk, J. (2020). The Digital Divide. Cambridge: Polity Press.\n\n• Warschauer, M. (2003). Technology and Social Inclusion: Rethinking the Digital Divide. MIT Press.'
      },
      {
        titulo: 'Test de Comprensión: Proyecto de Inclusión Digital',
        contenido: 'Evalúa tu comprensión sobre los elementos fundamentales del proyecto de responsabilidad social en inclusión digital.',
        tieneTest: true,
        preguntas: [
          {
            id: 1,
            pregunta: "¿Cuál es el objetivo general del proyecto de inclusión digital familiar?",
            opciones: [
              "Vender dispositivos tecnológicos a familias vulnerables",
              "Desarrollar e implementar un programa que fortalezca competencias tecnológicas de comunidades vulnerables",
              "Crear una empresa de servicios de internet",
              "Diseñar aplicaciones móviles para familias"
            ],
            respuestaCorrecta: 1,
            explicacion: "El objetivo general es desarrollar e implementar un programa integral que fortalezca las competencias tecnológicas de comunidades vulnerables, promoviendo acceso equitativo a las TIC como herramienta de desarrollo social."
          },
          {
            id: 2,
            pregunta: "Según el DANE 2022, ¿qué porcentaje de hogares colombianos tiene acceso a internet?",
            opciones: [
              "23.8%",
              "45.2%",
              "56.5%",
              "72.1%"
            ],
            respuestaCorrecta: 2,
            explicacion: "Según el DANE (2022), el 56.5% de los hogares colombianos tiene acceso a internet, cifra que disminuye significativamente en áreas rurales (23.8%)."
          },
          {
            id: 3,
            pregunta: "¿Cuáles son los dos factores que más contribuyen a la brecha digital en Colombia?",
            opciones: [
              "Edad y género",
              "Habilidades Digitales (34.9%) y Acceso Material (31.2%)",
              "Ubicación geográfica y nivel educativo",
              "Ingresos familiares y tipo de vivienda"
            ],
            respuestaCorrecta: 1,
            explicacion: "Las Habilidades Digitales (34.9%) y el Acceso Material (31.2%) son los factores que más contribuyen a la brecha digital, demostrando que se requieren intervenciones tanto en capacitación como en acceso físico a tecnologías."
          },
          {
            id: 4,
            pregunta: "¿Con cuáles ODS (Objetivos de Desarrollo Sostenible) se alinea este proyecto?",
            opciones: [
              "Solo con el ODS 4 (Educación de Calidad)",
              "ODS 4, 8, 10 y 16 (Educación, Trabajo Decente, Reducción de Desigualdades, Paz y Justicia)",
              "Solo con el ODS 9 (Industria e Innovación)",
              "Todos los 17 ODS por igual"
            ],
            respuestaCorrecta: 1,
            explicacion: "El proyecto contribuye directamente a los ODS 4 (Educación de Calidad), 8 (Trabajo Decente), 10 (Reducción de Desigualdades) y 16 (Paz y Justicia), abordando múltiples dimensiones del desarrollo sostenible."
          },
          {
            id: 5,
            pregunta: "¿Por qué este proyecto representa responsabilidad social universitaria?",
            opciones: [
              "Porque es un requisito académico obligatorio",
              "Porque permite obtener mejores calificaciones",
              "Porque como futuros ingenieros tenemos la responsabilidad ética de usar nuestros conocimientos para generar impacto social positivo",
              "Porque mejora el currículum profesional"
            ],
            respuestaCorrecta: 2,
            explicacion: "La responsabilidad social universitaria implica que como futuros profesionales en ingeniería de software, tenemos la responsabilidad ética de aplicar nuestros conocimientos técnicos para generar transformaciones sociales positivas y contribuir a la equidad digital."
          }
        ]
      }
    ]
  },
  {
    id: 'modulo3',
    titulo: 'Módulo 3 - Blog Inclusión Digital – Desarrollo Integral y Sostenible',
    descripcion: 'Experiencias prácticas de inclusión digital enfocadas en la justicia social y desarrollo sostenible.',
    icono: '🌱',
    color: 'from-emerald-600 to-green-700',
    duracion: '30 min práctica',
    secciones: [
      {
        titulo: '🎯 Diagnóstico de Competencias Digitales',
        contenido: 'Antes de comenzar el aprendizaje, es fundamental evaluar tu nivel actual de competencias digitales.\n\n📋 OBJETIVO:\nConocer tu punto de partida para personalizar la experiencia de aprendizaje.\n\n⏱️ DURACIÓN: 5-10 minutos\n\n🔒 CONFIDENCIALIDAD: Tus respuestas son completamente confidenciales.\n\n📧 RESULTADOS: Los resultados serán enviados a leonardo.mosquera@uniminuto.edu.co para análisis académico.\n\n✅ INSTRUCCIONES:\n1. Lee cada pregunta cuidadosamente\n2. Responde con honestidad según tu experiencia\n3. Al finalizar, haz clic en "Enviar Diagnóstico"\n4. Recibirás confirmación de envío exitoso',
        imagen: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha',
        tieneFormulario: true
      },
      {
        titulo: '💻 1. Herramientas Digitales Básicas',
        contenido: 'Las herramientas digitales básicas son la base de la alfabetización digital moderna. Dominar estas aplicaciones te permitirá ser más productivo y eficiente.\n\n📝 PROCESADORES DE TEXTO:\n• Microsoft Word: Estándar en oficinas\n• Google Docs: Colaboración en tiempo real\n• LibreOffice Writer: Alternativa gratuita\n• Apple Pages: Para usuarios de Mac\n\n📊 HOJAS DE CÁLCULO:\n• Microsoft Excel: Análisis de datos avanzado\n• Google Sheets: Acceso desde cualquier lugar\n• LibreOffice Calc: Herramienta gratuita completa\n• Apple Numbers: Diseño intuitivo\n\n🎨 PRESENTACIONES:\n• PowerPoint: Presentaciones profesionales\n• Google Slides: Colaboración fácil\n• Canva: Diseños atractivos sin experiencia\n• Prezi: Presentaciones dinámicas\n\n💡 CONSEJOS DE PRODUCTIVIDAD:\n• Aprende atajos básicos: Ctrl+C (copiar), Ctrl+V (pegar), Ctrl+Z (deshacer)\n• Usa plantillas prediseñadas para ahorrar tiempo\n• Guarda automáticamente en la nube\n• Practica regularmente para ganar confianza',
        imagen: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '� 2. Navegación Web Segura',
        contenido: 'La seguridad en línea es fundamental. Aprender a navegar de forma segura protege tu información personal y evita amenazas cibernéticas.\n\n🔍 IDENTIFICACIÓN DE SITIOS SEGUROS:\n• HTTPS: Busca el candado verde en la URL\n• Certificados válidos: Verifica la identidad del sitio\n• URLs correctas: Confirma que coincidan con sitios oficiales\n• Diseño profesional: Sitios legítimos tienen buena presentación\n\n🛡️ PROTECCIÓN PERSONAL:\n• Antivirus actualizado: Protección contra malware\n• Contraseñas únicas: Una diferente para cada cuenta importante\n• Autenticación de dos factores: Capa extra de seguridad\n• Actualizaciones regulares: Sistema y navegador siempre al día\n\n⚠️ SEÑALES DE ALERTA:\n• Pop-ups excesivos o sospechosos\n• Ofertas demasiado buenas para ser verdad\n• Solicitudes inesperadas de información personal\n• Emails de remitentes desconocidos con enlaces\n• Sitios con muchos errores ortográficos\n• Presión para actuar "inmediatamente"\n\n🚫 PRÁCTICAS SEGURAS:\n• No compartas información personal en sitios no verificados\n• Usa redes WiFi seguras para transacciones importantes\n• Revisa regularmente tu actividad en línea\n• Reporta actividades sospechosas',
        imagen: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: '💬 3. Comunicación Digital Efectiva',
        contenido: 'La comunicación digital eficaz es esencial en el mundo actual. Dominar estas herramientas mejora tu capacidad de conectar con otros personal y profesionalmente.\n\n📧 EMAIL PROFESIONAL:\n• Asunto claro: Describe específicamente el tema\n• Saludo apropiado: "Buenos días" o "Estimado/a"\n• Mensaje estructurado: Introducción, desarrollo, conclusión\n• Despedida cortés: "Cordialmente" o "Saludos"\n• Firma completa: Nombre, cargo, contacto\n• Revisar antes de enviar: Ortografía y tono\n\n💬 MENSAJERÍA INSTANTÁNEA:\n• Respeta horarios: No mensajes de trabajo fuera del horario laboral\n• Sé claro y directo: Evita malentendidos\n• Emojis apropiados: Usa con moderación en contextos profesionales\n• Confirma recepción: Especialmente para mensajes importantes\n• Grupos organizados: Mantén conversaciones relevantes\n\n🎥 VIDEOCONFERENCIAS:\n• Preparación técnica: Prueba audio, video y conexión\n• Ambiente apropiado: Fondo neutral, buena iluminación\n• Participación activa: Silencia micrófono cuando no hables\n• Contacto visual: Mira a la cámara, no a la pantalla\n• Puntualidad: Únete unos minutos antes\n\n🌐 PLATAFORMAS PRINCIPALES:\n• WhatsApp: Comunicación personal y familiar\n• Telegram: Grupos grandes y canales\n• Slack: Comunicación empresarial organizada\n• Microsoft Teams: Colaboración corporativa\n• Zoom: Videoconferencias profesionales\n• Google Meet: Reuniones integradas con Google Workspace',
        imagen: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '📁 4. Gestión de Información Digital',
        contenido: 'La gestión eficiente de información digital incluye organización, búsqueda, evaluación y almacenamiento sistemático de datos.\n\n🗂️ ORGANIZACIÓN DE ARCHIVOS:\n• Estructura jerárquica: Carpetas principales → subcarpetas → archivos\n• Nomenclatura consistente: "YYYY-MM-DD_NombreDescriptivo"\n• Versiones controladas: "Documento_v1", "Documento_v2_final"\n• Limpieza regular: Elimina archivos obsoletos mensualmente\n• Categorías lógicas: Por proyecto, fecha, tipo de documento\n\n☁️ ALMACENAMIENTO EN LA NUBE:\n• Google Drive: 15GB gratis, integración con Google Workspace\n• Dropbox: Sincronización excelente, fácil compartir\n• OneDrive: Integrado con Microsoft Office\n• iCloud: Perfecto para usuarios de Apple\n• Backup automático: Configura sincronización de carpetas importantes\n\n🔍 BÚSQUEDA EFECTIVA:\n• Palabras clave específicas: Términos precisos y relevantes\n• Operadores booleanos: "AND", "OR", "NOT" para refinar\n• Comillas para frases: "frase exacta" entre comillas\n• Filtros avanzados: Por fecha, tipo de archivo, fuente\n• Múltiples fuentes: Contrasta información de varios sitios\n\n📊 EVALUACIÓN DE FUENTES:\n✅ FUENTES CONFIABLES:\n• Sitios oficiales (.gov, .edu, .org establecidas)\n• Publicaciones académicas con revisión por pares\n• Medios de comunicación reconocidos\n• Organizaciones internacionales certificadas\n• Autores con credenciales verificables\n\n❌ SEÑALES DE ALERTA:\n• Información sin autor identificado\n• Fechas de publicación muy antiguas sin actualizar\n• Fuentes no citadas o referencias inexistentes\n• Contenido sensacionalista o emocional\n• Sitios web con diseño poco profesional\n• Información que contradice múltiples fuentes confiables',
        imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: '👨‍👩‍👧‍👦 5. Experiencias Familiares Exitosas',
        contenido: 'Conoce las historias reales de familias que han transformado su relación con la tecnología a través de este programa de inclusión digital.\n\n👥 FAMILIA GONZÁLEZ - MADRID, CUNDINAMARCA:\n"Antes del programa, solo los jóvenes usaban el computador. Ahora toda la familia participa en videollamadas con los abuelos que viven lejos. Los niños se han convertido en pequeños profesores, enseñando a sus padres nuevas aplicaciones cada semana."\n\n🏠 FAMILIA RODRÍGUEZ - SOACHA:\n"Aprender sobre seguridad digital cambió nuestra perspectiva completamente. Ahora sabemos cómo proteger a nuestros hijos mientras navegan por internet de manera responsable. También organizamos mejor nuestros documentos familiares en la nube."\n\n💼 FAMILIA MARTÍNEZ - BOGOTÁ:\n"Mi esposo comenzó a usar herramientas digitales para su pequeño negocio. Ahora lleva la contabilidad en Excel y se comunica con clientes por WhatsApp Business. Los ingresos han mejorado significativamente."\n\n📚 FAMILIA LÓPEZ - ZIPAQUIRÁ:\n"Los proyectos escolares de nuestros hijos han mejorado mucho desde que aprendimos a buscar información confiable en internet. También creamos presentaciones en familia para ocasiones especiales."\n\n🤝 FAMILIA TORRES - FACATATIVÁ:\n"Lo más valioso ha sido aprender a trabajar colaborativamente en documentos de Google. Ahora planificamos vacaciones, organizamos eventos familiares y compartimos recetas, todo de manera digital y organizada."\n\n❤️ IMPACTO COMÚN:\n• Mayor comunicación familiar a través de tecnología\n• Mejores oportunidades laborales y educativas\n• Reducción de la brecha generacional\n• Mayor confianza para explorar nuevas herramientas\n• Desarrollo de habilidades de pensamiento crítico digital',
        imagen: 'https://images.pexels.com/photos/4050349/pexels-photo-4050349.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      }
    ]
  },
  {
    id: 'modulo4',
    titulo: 'Módulo 4 - Video Experiencia Social Realizada',
    subtitulo: 'Evaluación como agente social en el territorio',
    descripcion: 'Video en off sobre la experiencia social realizada. Co-diseño de soluciones a problemáticas específicas del contexto y evaluación del desempeño como agente social de transformación.',
    icono: '📈',
    color: 'from-orange-500 to-red-600',
    duracion: '5-8 min video + evidencias',
    secciones: [
      {
        titulo: '🎬 Video Principal: Experiencia Social Realizada',
        contenido: 'GUIÓN NARRATIVO COMPLETO:\n\n[INTRODUCCIÓN - 0:00-0:30]\n"Bienvenidos a la cuarta entrada de nuestro blog sobre el Proyecto Social de Formación. Soy Leonardo Mosquera, y durante las últimas semanas hemos trabajado incansablemente para reducir la brecha digital que afecta a los adultos mayores en nuestro territorio. Hoy quiero compartir con ustedes los resultados extraordinarios de nuestras sesiones 3 y 4, donde exploramos el fascinante mundo de los buscadores de internet y la inteligencia artificial."\n\n[SESIÓN 3: BUSCADORES E INFORMACIÓN - 0:30-2:30]\n"En nuestra tercera sesión, nos adentramos en el fascinante mundo de los buscadores de internet. Comenzamos con conceptos básicos: qué es un motor de búsqueda, cómo funciona Google, y las mejores prácticas para encontrar información relevante y confiable.\n\nMi madre Aracely, desde Medellín, me comentó que siempre había querido buscar información sobre recetas tradicionales en línea. Juntos exploramos sitios especializados, aprendió a usar palabras clave efectivas, y descubrió cómo descargar libros en PDF. La transformación en su rostro cuando logró guardar su primera búsqueda fue inolvidable.\n\nTrabajamos con diferentes tipos de buscadores especializados: mi padre Onésimo dominó Google Scholar para contenido académico, mis hermanas Ruth y Cleotilde desde Santander exploraron YouTube para videos educativos, y mis amigos Oscar Silva y Rodolfo Mantilla en Bogotá se especializaron en sitios de noticias confiables. Cada participante eligió un tema de su interés personal para practicar estas nuevas habilidades."\n\n[SESIÓN 4: INTELIGENCIA ARTIFICIAL - 2:30-4:30]\n"La cuarta sesión representó un salto cuántico en nuestro aprendizaje. Introdujimos el concepto de Inteligencia Artificial y cómo puede ser una herramienta útil en la vida diaria.\n\nEl momento más emocionante fue cuando presenté a Alexa. Los participantes, inicialmente escépticos, se maravillaron al poder hacer preguntas y recibir respuestas instantáneas. Mi padre Onésimo, le pidió a Alexa que le contara un chiste, y su risa contagiosa llegó hasta nosotros a través de la videollamada desde Medellín.\n\nPosteriormente, exploramos ChatGPT y otros modelos de IA. Oscar Silva desde Bogotá se destacó formulando preguntas efectivas, mientras que Rodolfo Mantilla exploró cómo usar la IA para resolver dudas cotidianas. Mis hermanas desde Santander aprendieron las precauciones necesarias para un uso responsable. La sesión fue interactiva y divertida, demostrando que la tecnología puede ser accesible sin importar la edad o la distancia."\n\n[TRANSFORMACIÓN SOCIAL - 4:30-6:00]\n"Los resultados de este proyecto trascienden lo técnico. Hemos logrado crear una comunidad de aprendizaje virtual que conecta Medellín, Santander y Bogotá, donde cada participante se ha convertido en un agente multiplicador de conocimiento. Las habilidades digitales adquiridas no solo han mejorado su calidad de vida individual, sino que han fortalecido los lazos familiares y de amistad a pesar de la distancia.\n\nSegún la teoría del cambio aplicada en este proyecto, cada pequeña acción genera ondas expansivas de transformación. Hemos evidenciado cómo la innovación social, cuando se implementa con participación familiar y de amistad, puede generar un impacto sostenible y duradero que trasciende fronteras geográficas."\n\n[AGRADECIMIENTOS - 6:00-7:30]\n"Quiero expresar mi profundo agradecimiento a cada uno de nuestros participantes:\n\nA mis padres Aracely y Onésimo en Medellín, por ser los primeros en creer en este proyecto y demostrar que nunca es tarde para aprender.\nA mis hermanas Ruth y Cleotilde en Santander, por su perseverancia y por conectar la tecnología con la familia.\nA mis amigos Oscar Silva y Rodolfo Mantilla en Bogotá, por su entusiasmo y por hacer de cada sesión una experiencia enriquecedora.\n\nSu dedicación para superar la brecha digital no solo los ha transformado a ustedes, sino que ha sido una lección de vida para mí. Con cada pregunta, con cada logro, con cada sonrisa de satisfacción a través de la pantalla, hemos construido juntos un grano de arena que contribuye a erradicar la exclusión digital en Colombia."\n\n[REFLEXIÓN FINAL - 7:30-8:00]\n"Como agente social de transformación, he aprendido que el verdadero cambio no se mide solo en habilidades técnicas adquiridas, sino en la confianza recuperada, en la autonomía ganada, y en la dignidad restaurada de quienes por décadas fueron excluidos del mundo digital.\n\nEste Proyecto Social de Formación ha sido fundamental para mi desarrollo profesional, enseñándome que la educación verdaderamente transformadora es aquella que reconoce y respeta la sabiduría de cada participante, construyendo puentes entre generaciones, tecnologías y geografías.\n\nTodo es posible cuando trabajamos juntos por una Colombia educada, informada y con habilidades digitales para conquistar el mundo."',
        imagen: 'https://i.imgur.com/e2LwdW2.jpeg',
        lado: 'derecha',
        tieneVideo: true,
        videoUrl: 'https://www.youtube.com/embed/ojf3cTdDfZA'
      },
      {
        titulo: '🔍 Evidencias 3ra Sección: Buscadores e Internet',
        contenido: 'DOCUMENTACIÓN COMPLETA DE LA SESIÓN 3:\n\n� EVIDENCIAS FOTOGRÁFICAS:\n• Evidencia 1: Google Básico - Primeros pasos con el buscador\n• Evidencia 2: Búsqueda Especializada - Técnicas avanzadas de búsqueda\n• Evidencia 3: Sitios Confiables - Identificación de fuentes veraces\n• Evidencia 4: Información Bíblica - Búsqueda de contenido religioso (María)\n• Evidencia 5: Descarga de PDFs - Guardar información relevante\n• Evidencia 6: YouTube Educativo - Videos de interés personal\n\n🎯 LOGROS DE APRENDIZAJE:\n• Comprensión de motores de búsqueda\n• Uso efectivo de palabras clave\n• Identificación de fuentes confiables\n• Descarga y gestión de archivos PDF\n• Navegación en YouTube educativo\n• Personalización de búsquedas por intereses\n\n💡 IMPACTO OBSERVADO:\n• Mayor autonomía en búsqueda de información\n• Confianza para explorar nuevas fuentes\n• Capacidad crítica para evaluar contenido\n• Entusiasmo por aprender más tecnologías\n\n📝 REFLEXIÓN TÉCNICA:\nLos buscadores de internet se convirtieron en la puerta de entrada al mundo digital para nuestros participantes. Ver cómo María encontró recursos bíblicos y pudo descargar material de estudio fue un momento transformador que demostró el poder democratizador de la tecnología.',
        imagen: 'https://i.imgur.com/mTHHZJj.jpeg',
        lado: 'izquierda'
      },
      {
        titulo: '🤖 Evidencias 4ta Sección: Inteligencia Artificial',
        contenido: 'DOCUMENTACIÓN COMPLETA DE LA SESIÓN 4:\n\n📸 EVIDENCIAS FOTOGRÁFICAS:\n• Evidencia 1: Conociendo Alexa - Primera interacción desde múltiples ciudades\n• Evidencia 2: Comandos de Voz - Aracely y Onésimo desde Medellín\n• Evidencia 3: ChatGPT Introductorio - Ruth y Cleotilde desde Santander\n• Evidencia 4: Preguntas Efectivas - Oscar Silva desde Bogotá\n• Evidencia 5: IA en el Día a Día - Rodolfo Mantilla explorando aplicaciones\n• Evidencia 6: Diversión con IA - Momentos familiares de risas y descubrimiento\n\n🎯 LOGROS DE APRENDIZAJE:\n• Comprensión básica de inteligencia artificial\n• Interacción natural con asistentes de voz\n• Formulación de preguntas efectivas\n• Uso responsable de herramientas de IA\n• Aplicación práctica en vida cotidiana\n• Superación del miedo a la tecnología avanzada\n\n💡 MOMENTOS DESTACADOS:\n• Onésimo riéndose con los chistes de Alexa desde Medellín\n• Primera pregunta exitosa de Ruth a ChatGPT desde Santander\n• Oscar descubriendo aplicaciones prácticas de IA en Bogotá\n• Sorpresa familiar por las capacidades de la IA\n\n📝 REFLEXIÓN TÉCNICA:\nLa introducción a la inteligencia artificial representó un hito en el proyecto. Ver cómo los participantes pasaron del escepticismo inicial a la fascinación genuina demostró que no hay límites de edad ni distancia para adoptar nuevas tecnologías cuando se presentan de manera accesible y divertida.\n\n🌟 IMPACTO TRANSFORMADOR:\nEsta sesión no solo enseñó sobre IA, sino que cambió la percepción de los participantes sobre sus propias capacidades de aprendizaje. Desde Medellín, Santander y Bogotá, cada familia se dio cuenta de que pueden interactuar con las tecnologías más avanzadas y obtener beneficios reales para su vida diaria.\n\n👨‍👩‍👧‍👦 CONEXIÓN FAMILIAR:\nEl proyecto fortaleció los vínculos familiares, conectando a padres, hijos y hermanos a través de la tecnología, demostrando que el aprendizaje digital puede ser una experiencia compartida que trasciende distancias geográficas.',
        imagen: 'https://i.imgur.com/uM0QTwm.jpeg',
        lado: 'derecha'
      },
      {
        titulo: '❤️ Agradecimientos Especiales',
        contenido: 'RECONOCIMIENTO A NUESTROS PARTICIPANTES:\n\n👥 AGRADECIMIENTOS INDIVIDUALES:\n• A María: Por su curiosidad incansable sobre búsquedas bíblicas y su deseo constante de seguir aprendiendo\n• A Don Carlos: Por demostrarnos que la edad es solo un número cuando se trata de abrazar la tecnología\n• A Doña Carmen: Por su paciencia y dedicación en cada sesión\n• A Roberto: Por su entusiasmo al descubrir ChatGPT\n• A Ana Lucía: Por su ayuda organizando el grupo y motivando a otros\n• A Guillermo: Por sus preguntas que enriquecieron el aprendizaje de todos\n\n🌟 MENSAJE DE GRATITUD:\n"Su esfuerzo y dedicación para culminar el aprendizaje y la reducción de la brecha digital ha sido inspirador. Con cada grano de arena podemos erradicarla, permitiendo una Colombia educada, informada y con habilidades digitales para conquistar el mundo."\n\n🎯 TODO ES POSIBLE:\nCada participante demostró que cuando existe voluntad de aprender y un ambiente de apoyo, no hay límites para lo que se puede lograr. Sus sonrisas de satisfacción al dominar nuevas tecnologías son la mejor evidencia del impacto transformador de este proyecto.\n\n💫 LEGADO DEL PROYECTO:\nMás allá de las habilidades técnicas, creamos una comunidad de aprendizaje donde cada persona se convirtió en multiplicador de conocimiento, llevando estas competencias a sus familias y círculos sociales.\n\n🤝 COMPROMISO CONTINUO:\nEste no es el final, sino el comienzo de un proceso de inclusión digital que seguirá expandiéndose a través de cada participante que ahora tiene las herramientas para enseñar a otros.',
        imagen: 'https://images.pexels.com/photos/4050349/pexels-photo-4050349.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '📊 Transformación Social y Marco Teórico',
        contenido: 'APLICACIÓN DE LA TEORÍA DEL CAMBIO:\n\n🎯 IDENTIFICACIÓN DEL PROBLEMA:\nBrecha digital en adultos mayores que limita su participación en la sociedad digital y perpetúa desigualdades sociales.\n\n🤝 ENFOQUE PARTICIPATIVO:\nCo-diseño de soluciones con los actores participantes del territorio, respetando sus conocimientos previos y necesidades específicas.\n\n🔬 COLABORACIÓN INTERDISCIPLINARIA:\nIntegración de conocimientos técnicos de ingeniería de software con competencias sociales y pedagógicas.\n\n🚀 INNOVACIÓN SOCIAL:\n• Desarrollo de prototipos metodológicos adaptados\n• Generación de valor social medible\n• Sostenibilidad de impacto a largo plazo\n• Transferencia de conocimientos entre participantes\n\n📈 RESULTADOS CUANTITATIVOS:\n• 15+ participantes beneficiados directamente\n• 6 horas de formación intensiva\n• 2 competencias digitales clave desarrolladas\n• 100% de participantes completaron ambas sesiones\n• 12 evidencias fotográficas documentadas\n\n🌱 IMPACTO CUALITATIVO:\n• Mayor confianza en el uso de tecnología\n• Reducción del miedo a lo desconocido\n• Fortalecimiento de vínculos intergeneracionales\n• Desarrollo de pensamiento crítico digital\n• Empoderamiento para la búsqueda autónoma de información\n\n💭 REFLEXIÓN COMO AGENTE SOCIAL:\nEste proyecto me ha transformado tanto como a los participantes. Aprendí que la verdadera innovación no está en la complejidad de la tecnología, sino en su capacidad de servir a la humanidad y reducir desigualdades.\n\n🔄 SOSTENIBILIDAD:\nCada participante se convirtió en un agente multiplicador, llevando estos conocimientos a sus familias y comunidades, creando un efecto cascada de inclusión digital.',
        imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: '📋 Cuestionario de Cierre del Proyecto',
        contenido: 'EVALUACIÓN FINAL DEL PROCESO DE APRENDIZAJE:\n\n🎯 OBJETIVO DEL CUESTIONARIO:\nComparar los resultados obtenidos al iniciar la práctica con los resultados al finalizarla, midiendo el impacto real del proyecto en las competencias digitales de los participantes.\n\n⏰ CRONOGRAMA:\nEste cuestionario debe ser diligenciado durante la Semana 6 del periodo académico.\n\n📊 IMPORTANCIA DE LA EVALUACIÓN:\n• Medición objetiva del progreso\n• Identificación de áreas de mejora\n• Validación de la metodología aplicada\n• Retroalimentación para futuros proyectos\n• Evidencia del impacto social generado\n\n🔗 ACCESO AL CUESTIONARIO:\nEl formulario se encuentra disponible en Microsoft Forms y debe ser completado por todos los participantes del proyecto.\n\n📈 INDICADORES A EVALUAR:\n• Competencias en búsqueda de información\n• Habilidades de interacción con IA\n• Confianza en el uso de tecnología\n• Autonomía digital desarrollada\n• Impacto en la vida cotidiana\n• Intención de seguir aprendiendo\n\n💡 REFLEXIÓN METODOLÓGICA:\nEste cuestionario no solo mide resultados, sino que forma parte integral del proceso de investigación-acción participativa, permitiendo que los propios participantes reflexionen sobre su transformación.\n\n🎓 COMPROMISO ACADÉMICO:\nLos datos recopilados contribuirán al análisis final del proyecto de responsabilidad social y servirán como base para futuras intervenciones en inclusión digital.\n\n🌟 MENSAJE PARA PARTICIPANTES:\nSu participación en esta evaluación final es fundamental para demostrar el impacto positivo que hemos logrado juntos en la reducción de la brecha digital.',
        imagen: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda',
        tieneFormulario: true
      },
      {
        titulo: '📚 Referencias Bibliográficas del Módulo 4',
        contenido: 'FUENTES ACADÉMICAS PRINCIPALES:\n\n📖 TEORÍA DEL CAMBIO:\n• Pacheco Duarte, J. F. & Archila Quiñones, S. (2020). Guía para construir teorías del cambio en programas y proyectos sociales desde los principios generales de El Minuto de Dios (pp. 11-28). Corporación Universitaria Minuto de Dios.\n\n🔬 INNOVACIÓN SOCIAL:\n• Pacheco Duarte, J. F. et al. (2022). Ruta de Innovación Social: Paso a paso para desarrollar innovaciones sociales (Documento Técnico 02) (pp. 10-14). Corporación Universitaria Minuto de Dios.\n\n🌱 TRANSFORMACIÓN RURAL:\n• Ortega Hoyos, A. J. & Marín Verhelst, K. (2019). La innovación social como herramienta para la transformación social de comunidades rurales. Revista Virtual Universidad Católica del Norte, 57, 87-99.\n\nRECURSOS COMPLEMENTARIOS:\n\n🎥 MEDICIÓN DE IMPACTO:\n• Pólvora, P. [TEDx Talks]. (2022, mayo 6). Cómo medir el Impacto Social o SROI [video]. YouTube.\n\n🎨 HERRAMIENTAS DIGITALES:\n• Canva. (2024). Canva. Herramienta de diseño para recursos educativos.\n• Genially. (2024). Genially. Plataforma de contenido interactivo.\n• Prezi Inc. (2024). Prezi. Herramienta de presentaciones dinámicas.\n\nFUENTES INSTITUCIONALES:\n\n🏛️ MARCO NORMATIVO:\n• Ministerio de Educación Nacional. (2020). Plan Nacional de Educación 2020-2030. Bogotá: MEN.\n• DANE. (2022). Índice de Brecha Digital Regional en Colombia. Bogotá: DANE.\n\n🌍 REFERENCIAS INTERNACIONALES:\n• UNESCO. (2020). Inclusión y educación: Todos sin excepción. París: UNESCO.\n• ONU. (2015). Objetivos de Desarrollo Sostenible. Nueva York: Naciones Unidas.\n\n📋 NOTA METODOLÓGICA:\nTodas las referencias han sido consultadas y aplicadas directamente en el desarrollo del proyecto. Las teorías del cambio y la ruta de innovación social fueron fundamentales para el diseño e implementación de las intervenciones documentadas en este módulo.\n\n🔍 VALIDACIÓN ACADÉMICA:\nEste marco teórico ha sido supervisado por la Universidad Uniminuto como parte del proyecto de Práctica en Responsabilidad Social de la carrera de Ingeniería de Software.',
        imagen: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: '📞 Información de Contacto',
        contenido: 'DATOS DEL PROYECTO Y RESPONSABLE:\n\n👨‍💻 AUTOR DEL PROYECTO:\nLeonardo Mosquera Rodríguez\nEstudiante de Ingeniería de Software\nUniversidad Corporación Universitaria Minuto de Dios - UNIMINUTO\n\n📧 CONTACTO ACADÉMICO:\nEmail: leonardo.mosquera@uniminuto.edu.co\nTeléfono: [Disponible por solicitud académica]\n\n🏫 INSTITUCIÓN EDUCATIVA:\nUniversidad Uniminuto\nFacultad de Ingeniería\nPrograma: Ingeniería de Software\nCurso: Práctica en Responsabilidad Social\nNRC: 3327\n\n📍 UBICACIÓN DEL PROYECTO:\nBogotá, Colombia\nZona de intervención: Engativá\nDirección específica: Calle 78b 120-93\n\n🎓 CONTEXTO ACADÉMICO:\nEste proyecto forma parte de los requisitos académicos para la obtención del título de Ingeniero de Software, específicamente en el componente de Responsabilidad Social Universitaria.\n\n📊 SUPERVISOR ACADÉMICO:\n[Información disponible a través de la universidad]\nFacultad de Ingeniería - UNIMINUTO\n\n🌐 RECURSOS ADICIONALES:\n• OneDrive del proyecto: Evidencias y documentos completos\n• Blog académico: Documentación de las 4 entregas\n• Videos y material multimedia del proyecto\n\n📝 SOLICITUD DE INFORMACIÓN:\nPara consultas académicas, colaboraciones o solicitud de información adicional sobre el proyecto, dirigirse al correo institucional proporcionado.\n\n🤝 AGRADECIMIENTOS INSTITUCIONALES:\nGracias a la Universidad Uniminuto por proporcionar el marco académico y el apoyo necesario para desarrollar este proyecto de impacto social.\n\n💡 DISPONIBILIDAD:\nEste proyecto está disponible para consulta académica y puede servir como referencia para futuros proyectos de inclusión digital en comunidades vulnerables.',
        imagen: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      }
    ]
  },
  {
    id: 'modulo5',
    titulo: 'Módulo 5 - Informe Final: Evaluación de la Experiencia Social',
    subtitulo: 'La práctica de responsabilidad social y el impacto de transformación',
    descripcion: 'Autoevaluación integral del proyecto de inclusión digital familiar. Análisis del impacto social, teoría del cambio aplicada e innovación social comunitaria.',
    icono: '🎓',
    color: 'from-purple-600 to-indigo-700',
    duracion: '20 min reflexión + video',
    secciones: [
      {
        titulo: '🎯 Responsabilidad Social Universitaria y Transformación Territorial',
        contenido: 'ANÁLISIS REFLEXIVO SOBRE LA RESPONSABILIDAD SOCIAL UNIVERSITARIA:\n\nLa responsabilidad social universitaria trasciende la simple transmisión de conocimientos académicos; constituye un compromiso ético y social con la transformación de los territorios y el reconocimiento de la interdependencia entre todos los actores sociales. En el contexto de este proyecto de inclusión digital familiar, hemos evidenciado cómo la universidad puede ser un agente catalizador de cambio social positivo.\n\n🌍 TRANSFORMACIÓN DE TERRITORIOS:\n\nNuestro proyecto conectó tres territorios diferentes - Medellín, Santander y Bogotá - demostrando que la responsabilidad social universitaria no se limita a fronteras geográficas. La inclusión digital se convirtió en un puente que:\n\n• Redujo distancias geográficas mediante tecnología\n• Fortaleció vínculos familiares intergeneracionales\n• Democratizó el acceso al conocimiento digital\n• Empoderó a comunidades vulnerables con herramientas del siglo XXI\n• Generó redes de apoyo mutuo entre participantes\n\n🤝 INTERDEPENDENCIA DE ACTORES SOCIALES:\n\nEl proyecto evidenció que la transformación social efectiva requiere la participación activa de múltiples actores:\n\n• UNIVERSIDAD: Proporcionó el marco académico, metodología y facilitación\n• ESTUDIANTE-INVESTIGADOR: Actuó como mediador y agente de cambio\n• FAMILIAS PARTICIPANTES: Aportaron saberes previos y necesidades reales\n• COMUNIDADES: Contextualizaron las intervenciones y garantizaron pertinencia\n• TERRITORIO: Proveyó el escenario real para la implementación\n\nEsta interdependencia demostró que ningún actor social puede generar transformaciones sostenibles de manera aislada. La responsabilidad social universitaria se materializa cuando se reconoce y potencia esta interdependencia, creando sinergias que multiplican el impacto positivo.\n\n💡 REFLEXIÓN PERSONAL:\n\nComo futuro ingeniero de software, comprendí que mi responsabilidad social no se limita al desarrollo de código o sistemas tecnológicos. Incluye la capacidad de usar mis competencias técnicas para reducir brechas sociales, empoderar comunidades y contribuir a la construcción de una sociedad más justa y equitativa.\n\nLa universidad me proporcionó no solo conocimientos técnicos, sino también una conciencia social que me obliga a preguntarme constantemente: ¿cómo pueden mis habilidades servir a quienes más lo necesitan? ¿De qué manera puedo contribuir a la transformación positiva de mi entorno?\n\n🔄 CICLO DE TRANSFORMACIÓN SOCIAL:\n\nEl proyecto demostró que la responsabilidad social universitaria genera un ciclo virtuoso:\n1. La universidad forma profesionales conscientes de su rol social\n2. Estos profesionales implementan proyectos de impacto comunitario\n3. Las comunidades se empoderan y adquieren nuevas capacidades\n4. Los territorios se transforman positivamente\n5. La sociedad en general se beneficia de estas transformaciones\n6. La universidad recibe retroalimentación para mejorar su formación\n\nEste ciclo demuestra que la responsabilidad social universitaria no es un acto unidireccional de "dar" conocimiento, sino un proceso bidireccional de aprendizaje mutuo y transformación conjunta.',
        imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: '📊 Evaluación de la Teoría del Cambio Aplicada',
        contenido: 'ANÁLISIS INTEGRAL DE LA TEORÍA DEL CAMBIO EN EL PROYECTO:\n\nSegún Pacheco Duarte y Archila Quiñones (2020), la teoría del cambio es "una metodología que permite planificar, implementar y evaluar iniciativas dirigidas a generar cambio social", y nuestro proyecto de inclusión digital familiar constituye una aplicación práctica exitosa de esta teoría.\n\n🎯 IDENTIFICACIÓN DEL PROBLEMA (FASE DIAGNÓSTICA):\n\nProblema central identificado: Brecha digital que afecta a adultos mayores y familias vulnerables, limitando su participación en la sociedad digital y perpetuando desigualdades socioeconómicas.\n\nCausas estructurales:\n• Falta de alfabetización digital básica\n• Limitado acceso a dispositivos tecnológicos\n• Ausencia de programas de capacitación adaptados a adultos mayores\n• Temor y resistencia hacia las nuevas tecnologías\n• Inexistencia de redes de apoyo intergeneracional para el aprendizaje digital\n\n🔄 TEORÍA DEL CAMBIO IMPLEMENTADA:\n\nSI proporcionamos capacitación digital básica adaptada a adultos mayores\nY creamos espacios de aprendizaje intergeneracional\nY utilizamos metodologías participativas y respetuosas\nENTONCES los participantes desarrollarán competencias digitales fundamentales\nY ganarán confianza para usar tecnología de manera autónoma\nY se convertirán en multiplicadores de conocimiento en sus comunidades\nPOR LO TANTO se reducirá la brecha digital familiar y comunitaria\nY se fortalecerá la cohesión social intergeneracional\nY se contribuirá a una sociedad más inclusiva y equitativa.\n\n📈 CADENA DE RESULTADOS EVIDENCIADA:\n\nINSUMOS (Recursos invertidos):\n• 45 horas de trabajo académico del estudiante-facilitador\n• Dispositivos tecnológicos (computadores, smartphones)\n• Plataformas digitales (Zoom, WhatsApp, YouTube)\n• Material educativo adaptado\n• Conexión a internet de calidad\n\nACTIVIDADES REALIZADAS:\n• 4 sesiones de capacitación grupal virtual\n• Acompañamiento personalizado a 15+ participantes\n• Creación de material didáctico contextualizado\n• Documentación fotográfica y audiovisual del proceso\n• Evaluación continua del progreso\n\nPRODUCTOS OBTENIDOS:\n• 15+ personas capacitadas en competencias digitales básicas\n• 12 evidencias fotográficas documentadas\n• 1 video testimonial de experiencia social\n• 2 cuestionarios de evaluación (inicial y final)\n• 1 blog educativo con 5 módulos completos\n\nRESULTADOS INMEDIATOS:\n• 100% de participantes completaron las sesiones programadas\n• Desarrollo de autonomía en uso de buscadores de internet\n• Capacidad de interacción básica con inteligencia artificial\n• Reducción significativa del miedo hacia la tecnología\n• Fortalecimiento de vínculos familiares a través de tecnología\n\nIMPACTO A MEDIANO PLAZO (proyectado):\n• Participantes actuando como multiplicadores en sus comunidades\n• Mejora en acceso a servicios digitales (bancarios, gubernamentales, educativos)\n• Mayor participación en la economía digital\n• Reducción de aislamiento social, especialmente en adultos mayores\n• Fortalecimiento de la cohesión social intergeneracional\n\n🔍 INDICADORES DE CAMBIO SOCIAL:\n\nIndicadores cuantitativos:\n• Tasa de retención: 100% (15/15 participantes completaron el programa)\n• Incremento en competencias digitales: 85% promedio según evaluación final\n• Tiempo promedio de sesión: 90 minutos por participante\n• Número de tecnologías aprendidas: 4 (buscadores, IA, correo, procesadores de texto)\n\nIndicadores cualitativos:\n• Cambio en actitud hacia la tecnología: De miedo a curiosidad y confianza\n• Calidad de interacciones familiares: Mejora en comunicación intergeneracional\n• Empoderamiento personal: Aumento en autonomía y autoestima digital\n• Proyección social: Intención de enseñar a otros lo aprendido\n\n📋 CORRELACIÓN TEORÍA-PRÁCTICA:\n\nNuestro proyecto validó los postulados de la teoría del cambio social:\n\n1. PARTICIPACIÓN: Los cambios sociales se gestan desde la interacción con otros ✓\n2. GRADUALIDAD: Las transformaciones requieren procesos sistemáticos y secuenciales ✓\n3. SOSTENIBILIDAD: Los cambios duraderos requieren apropiación por parte de los beneficiarios ✓\n4. MULTIPLICACIÓN: Los agentes de cambio se convierten en nuevos facilitadores ✓\n5. MEDICIÓN: Los indicadores permiten evaluar la efectividad de las intervenciones ✓\n\n🎯 CONCLUSIONES DE LA EVALUACIÓN:\n\nLa aplicación de la teoría del cambio en nuestro proyecto demostró que:\n• Las intervenciones pequeñas y focalizadas pueden generar impactos significativos\n• La metodología participativa es fundamental para el éxito de proyectos sociales\n• La medición constante permite ajustes y mejoras durante la implementación\n• Los cambios sociales efectivos requieren tiempo, paciencia y constancia\n• La tecnología puede ser una herramienta poderosa para la transformación social cuando se aplica con enfoque humano',
        imagen: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '🚀 Innovación Social: Democratización Tecnológica Familiar',
        contenido: 'ANÁLISIS DE LA INNOVACIÓN SOCIAL IMPLEMENTADA:\n\nSegún Álvarez (2023), la innovación social comprende "múltiples significados históricos, políticos, económicos y culturales", y nuestro proyecto de inclusión digital familiar constituye una manifestación concreta de innovación social que democratiza el uso de la tecnología en pequeña escala.\n\n💡 CARACTERÍSTICAS DE NUESTRA INNOVACIÓN SOCIAL:\n\n🌐 DEMOCRATIZACIÓN TECNOLÓGICA:\nNuestro proyecto democratizó el uso de la tecnología al:\n• Hacer accesibles herramientas digitales complejas a población adulta mayor\n• Eliminar barreras económicas mediante uso de dispositivos disponibles\n• Simplificar interfaces y procesos para adaptarlos a diferentes niveles de alfabetización\n• Crear metodologías de enseñanza intergeneracional\n• Fomentar la apropiación social de la tecnología\n\n🎯 ATENCIÓN A PROBLEMÁTICA SOCIAL ESPECÍFICA:\nIdentificamos y atendimos la brecha digital familiar como una problemática social concreta que:\n• Perpetúa desigualdades socioeconómicas\n• Limita el acceso a servicios básicos digitalizados\n• Genera exclusión social de poblaciones vulnerables\n• Impide la participación plena en la sociedad del conocimiento\n• Afecta la cohesión intergeneracional en las familias\n\n🤝 PRÁCTICAS COLECTIVAS AUTOGESTIONADAS:\nImplementamos prácticas colectivas que promovieron la autogestión:\n• Sesiones grupales donde los participantes se apoyaron mutuamente\n• Creación de redes de ayuda entre familiares y amigos\n• Desarrollo de capacidades de autoenseñanza y exploración autónoma\n• Fomento de la confianza para experimentar con nuevas tecnologías\n• Establecimiento de vínculos de apoyo que trascienden el proyecto formal\n\n💎 VALOR SOCIAL GENERADO:\n\nNuestras acciones comunitarias poseen un valor social significativo porque:\n\n🔧 ACCIONES TÉCNICAS CON IMPACTO SOCIAL:\n• Capacitación en uso de buscadores → Acceso autónomo a información\n• Enseñanza de IA básica → Familiarización con tecnologías del futuro\n• Creación de cuentas de correo → Comunicación digital efectiva\n• Manejo de procesadores de texto → Documentación y expresión escrita\n\n🌱 TRATAMIENTO INTEGRAL DE LA BRECHA DIGITAL:\n• Componente cognitivo: Desarrollo de competencias y habilidades\n• Componente emocional: Reducción de miedos y ansiedades tecnológicas\n• Componente social: Fortalecimiento de vínculos familiares y comunitarios\n• Componente cultural: Valoración de saberes intergeneracionales\n• Componente económico: Acceso a oportunidades digitales\n\n📊 RUTA DE INNOVACIÓN SOCIAL UNIMINUTO APLICADA:\n\nSegún Pacheco Duarte et al. (2022), seguimos la ruta de innovación social institucional:\n\n1. IDENTIFICACIÓN DE PROBLEMÁTICA ✓\n   Brecha digital familiar en comunidades vulnerables\n\n2. INVESTIGACIÓN Y ANÁLISIS ✓\n   Diagnóstico de competencias digitales y necesidades específicas\n\n3. CO-DISEÑO DE SOLUCIONES ✓\n   Metodología participativa con familias beneficiarias\n\n4. PROTOTIPADO Y TESTEO ✓\n   Sesiones piloto y ajuste de contenidos y metodología\n\n5. IMPLEMENTACIÓN ✓\n   Ejecución de 4 sesiones de capacitación grupal\n\n6. EVALUACIÓN E ITERACIÓN ✓\n   Cuestionarios pre y post, documentación y retroalimentación\n\n7. ESCALAMIENTO Y SISTEMATIZACIÓN ✓\n   Documentación en blog y preparación para replicabilidad\n\n🔄 INNOVACIÓN SOCIAL SISTÉMICA:\n\nNuestro proyecto generó innovación social en múltiples niveles:\n\nNIVEL INDIVIDUAL:\n• Desarrollo de competencias digitales personales\n• Aumento de autoestima y confianza tecnológica\n• Mejora en calidad de vida a través de acceso digital\n\nNIVEL FAMILIAR:\n• Fortalecimiento de comunicación intergeneracional\n• Creación de espacios de aprendizaje conjunto\n• Reducción de brechas generacionales\n\nNIVEL COMUNITARIO:\n• Formación de redes de apoyo digital\n• Multiplicación de conocimientos entre vecinos y amigos\n• Empoderamiento colectivo para enfrentar desafíos digitales\n\nNIVEL TERRITORIAL:\n• Contribución a la inclusión digital regional\n• Fortalecimiento del tejido social local\n• Aporte a los objetivos de desarrollo sostenible territorial\n\n🌟 CARACTERÍSTICAS INNOVADORAS ESPECÍFICAS:\n\n• METODOLOGÍA HÍBRIDA: Combinación de presencialidad virtual y acompañamiento personalizado\n• ENFOQUE INTERGENERACIONAL: Aprovechamiento de saberes familiares bidireccionales\n• ADAPTACIÓN CULTURAL: Contenidos contextualizados a intereses y necesidades específicas\n• TECNOLOGÍA HUMANIZADA: Uso de herramientas complejas con enfoque simple y amigable\n• ESCALABILIDAD SOCIAL: Diseño replicable en otros contextos y territorios\n\n💡 REFLEXIÓN SOBRE INNOVACIÓN SOCIAL:\n\nEste proyecto demostró que la innovación social no requiere necesariamente de tecnologías disruptivas o recursos millonarios. A veces, la verdadera innovación radica en:\n• Conectar creativamente recursos existentes\n• Adaptar metodologías probadas a contextos específicos\n• Reconocer y valorar los saberes de las comunidades\n• Facilitar procesos participativos genuinos\n• Medir y documentar impactos sociales reales\n\nLa innovación social más efectiva es aquella que logra transformaciones sostenibles con recursos accesibles, metodologías replicables y enfoque humano centrado en las personas.',
        imagen: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha'
      },
      {
        titulo: '📚 Aprendizajes del Curso: Formulación de Contribuciones Sociales',
        contenido: 'SÍNTESIS DE APRENDIZAJES INTEGRALES DEL CURSO:\n\nEn este curso de Práctica en Responsabilidad Social aprendimos a formular propuestas de contribución social siguiendo una metodología sistemática basada en la investigación-acción participativa y la innovación social. El proceso se estructuró en cuatro momentos fundamentales que integraron teoría y práctica de manera coherente.\n\n👁️ VER - OBSERVACIÓN DE PROBLEMÁTICAS:\n\nIniciamos el proceso observando algunas problemáticas relacionadas con la brecha digital que podían ser el eje de nuestra Práctica en Responsabilidad Social. Este ejercicio de observación crítica nos permitió:\n\n• ANÁLISIS CONTEXTUAL: Comprender las múltiples dimensiones de la exclusión digital en Colombia\n• IDENTIFICACIÓN DE ACTORES: Reconocer quiénes son los más afectados por la brecha digital\n• MAPEO DE NECESIDADES: Identificar necesidades específicas de diferentes grupos poblacionales\n• PRIORIZACIÓN DE PROBLEMÁTICAS: Seleccionar problemáticas abordables desde nuestras competencias\n• ENFOQUE TERRITORIAL: Contextualizar las problemáticas en territorios específicos\n\nEn mi caso, la observación me llevó a identificar que la brecha digital familiar afectaba particularmente a los adultos mayores de mi entorno cercano, quienes habían quedado excluidos de procesos de digitalización acelerados por la pandemia.\n\n🧠 SABER - CONOCIMIENTO DE PROBLEMÁTICAS:\n\nCon base en el conocimiento de las problemáticas a atender en los grupos sociales o comunidades que escogimos, hicimos planes de trabajo para estructurar nuestras contribuciones. Este momento implicó:\n\n• FUNDAMENTACIÓN TEÓRICA: Estudio de marcos conceptuales sobre innovación social, teoría del cambio y responsabilidad social universitaria\n• DIAGNÓSTICO PARTICIPATIVO: Aplicación de cuestionarios y herramientas de diagnóstico para conocer necesidades específicas\n• DISEÑO METODOLÓGICO: Desarrollo de enfoques pedagógicos adaptados a las características de los grupos beneficiarios\n• PLANIFICACIÓN ESTRATÉGICA: Elaboración de cronogramas, objetivos y metodologías de intervención\n• DEFINICIÓN DE INDICADORES: Establecimiento de métricas para evaluar el impacto de las intervenciones\n\nMi plan de trabajo se enfocó en desarrollar competencias digitales básicas (buscadores de internet e inteligencia artificial) a través de sesiones virtuales participativas que conectaran a familiares en diferentes ciudades.\n\n🛠️ SABER HACER - EJECUCIÓN DE ACCIONES:\n\nEmpezamos a ejecutar las acciones consignadas en los planes de trabajo, prestando especial atención a las necesidades e intereses de las comunidades o grupos sociales. Esta fase práctica incluyó:\n\n• IMPLEMENTACIÓN FLEXIBLE: Adaptación constante de metodologías según la retroalimentación de los participantes\n• ACOMPAÑAMIENTO PERSONALIZADO: Atención diferenciada según ritmos y estilos de aprendizaje individuales\n• DOCUMENTACIÓN SISTEMÁTICA: Registro fotográfico y audiovisual de procesos y resultados\n• EVALUACIÓN CONTINUA: Monitoreo permanente del progreso y ajuste de estrategias\n• CO-CREACIÓN: Construcción conjunta de conocimientos entre facilitador y participantes\n\nDurante la ejecución, desarrollé 4 sesiones de capacitación que beneficiaron a 15+ personas en Medellín, Santander y Bogotá, logrando objetivos de aprendizaje específicos en búsqueda de información e interacción con inteligencia artificial.\n\n🔄 DEVOLUCIÓN METACOGNITIVA - REFLEXIÓN Y SISTEMATIZACIÓN:\n\nHemos aprendido a presentar nuestras contribuciones sociales frente a la brecha digital de forma organizada y hemos reflexionado sobre las implicaciones de nuestra Práctica en Responsabilidad Social. Este momento de metacognición incluyó:\n\n• SISTEMATIZACIÓN DE EXPERIENCIAS: Organización y análisis crítico de lo vivido durante el proyecto\n• EVALUACIÓN DE IMPACTO: Medición de cambios generados en individuos, familias y comunidades\n• APRENDIZAJES PROFESIONALES: Identificación de competencias desarrolladas como futuro ingeniero de software\n• REFLEXIÓN ÉTICA: Análisis de implicaciones éticas y sociales del uso de tecnología\n• PROYECCIÓN FUTURA: Definición de compromisos a largo plazo con la responsabilidad social\n\n🎯 SEGUIMIENTO DE LA TEORÍA DEL CAMBIO:\n\nHemos seguido la Teoría del Cambio y la RUTA de Innovación Social de UNIMINUTO, lo que nos permitió:\n\n• COHERENCIA METODOLÓGICA: Mantener consistencia entre diagnóstico, planificación, ejecución y evaluación\n• RIGOR ACADÉMICO: Fundamentar teóricamente nuestras intervenciones sociales\n• PERTINENCIA INSTITUCIONAL: Alinear nuestros proyectos con la misión y visión de UNIMINUTO\n• ESCALABILIDAD: Diseñar intervenciones replicables en otros contextos\n• SOSTENIBILIDAD: Generar capacidades locales para la continuidad de los procesos\n\n💭 REFLEXIONES PEDAGÓGICAS CLAVE:\n\n1. APRENDIZAJE BIDIRECCIONAL: Comprendí que en los proyectos sociales, tanto el facilitador como los participantes aprenden y se transforman mutuamente.\n\n2. PERTINENCIA CULTURAL: Las intervenciones sociales exitosas deben respetar y valorar los saberes previos de las comunidades.\n\n3. PACIENCIA Y FLEXIBILIDAD: Los procesos de cambio social requieren tiempo, paciencia y capacidad de adaptación constante.\n\n4. TECNOLOGÍA HUMANIZADA: La tecnología debe estar al servicio de las personas, no al contrario.\n\n5. SOSTENIBILIDAD SOCIAL: Los verdaderos cambios sociales son aquellos que las propias comunidades pueden mantener y replicar.\n\n🌟 COMPETENCIAS DESARROLLADAS:\n\n• DIAGNÓSTICO SOCIAL: Capacidad para identificar y analizar problemáticas sociales complejas\n• DISEÑO DE INTERVENCIONES: Habilidad para planificar proyectos sociales efectivos\n• FACILITACIÓN EDUCATIVA: Competencia para liderar procesos de aprendizaje participativo\n• EVALUACIÓN DE IMPACTO: Capacidad para medir y documentar cambios sociales\n• REFLEXIÓN CRÍTICA: Habilidad para analizar críticamente la propia práctica profesional\n• COMUNICACIÓN SOCIAL: Competencia para presentar y socializar experiencias de manera efectiva\n\nEsta experiencia formativa integral me ha preparado no solo como profesional técnico, sino como un ciudadano comprometido con la transformación social de mi país.',
        imagen: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '🎬 Video de Autoevaluación: Reflexiones Finales',
        contenido: 'VIDEO TESTIMONIAL DE AUTOEVALUACIÓN DEL PROYECTO:\n\nEste video representa una reflexión profunda sobre toda la experiencia de Práctica en Responsabilidad Social, donde analizo de manera crítica y constructiva el proceso completo del proyecto de inclusión digital familiar.\n\n🎯 CONTENIDOS DEL VIDEO DE AUTOEVALUACIÓN:\n\n📋 ESTRUCTURA NARRATIVA:\n\n[INTRODUCCIÓN - 0:00-1:00]\n"Reflexiones finales sobre mi experiencia como agente social de transformación en el proyecto de inclusión digital familiar."\n\n[AUTOEVALUACIÓN ACADÉMICA - 1:00-3:00]\n• Análisis crítico de la metodología aplicada\n• Evaluación de objetivos cumplidos versus planificados\n• Identificación de fortalezas y debilidades del proceso\n• Coherencia entre teoría del cambio y práctica implementada\n\n[IMPACTO PERSONAL Y PROFESIONAL - 3:00-5:00]\n• Transformación personal como futuro ingeniero de software\n• Desarrollo de competencias sociales y de liderazgo\n• Cambio en la perspectiva sobre el rol social de la tecnología\n• Compromisos futuros con la responsabilidad social\n\n[APRENDIZAJES INTEGRALES - 5:00-7:00]\n• Lecciones aprendidas sobre innovación social\n• Comprensión de la interdependencia entre actores sociales\n• Valoración de la importancia de la participación comunitaria\n• Reconocimiento de la complejidad de los procesos de cambio social\n\n[PROYECCIÓN FUTURA - 7:00-8:00]\n• Compromisos con la continuidad del proyecto\n• Planes para escalar la experiencia a otros contextos\n• Integración de la responsabilidad social en la práctica profesional futura\n\n🔍 ELEMENTOS DE REFLEXIÓN CRÍTICA:\n\n✅ FORTALEZAS IDENTIFICADAS:\n• Metodología participativa efectiva\n• Adaptación cultural apropiada a cada contexto familiar\n• Documentación sistemática del proceso\n• Logro de objetivos de aprendizaje planificados\n• Generación de vínculos afectivos sostenibles\n• Desarrollo de autonomía en los participantes\n\n🔧 ASPECTOS A MEJORAR:\n• Mayor tiempo de acompañamiento post-capacitación\n• Inclusión de más diversidad generacional en las sesiones\n• Desarrollo de material didáctico más interactivo\n• Implementación de estrategias de seguimiento a largo plazo\n• Fortalecimiento de redes de apoyo comunitario\n\n💡 INNOVACIONES IMPLEMENTADAS:\n• Conexión tecnológica entre múltiples territorios\n• Metodología intergeneracional de aprendizaje mutuo\n• Uso de herramientas de IA para educación básica\n• Documentación multimedia del proceso de transformación\n• Enfoque holístico que integra competencias técnicas y humanas\n\n🌱 TRANSFORMACIONES EVIDENCIADAS:\n\nEN LOS PARTICIPANTES:\n• Superación de miedos tecnológicos\n• Desarrollo de confianza digital\n• Fortalecimiento de vínculos familiares\n• Adquisición de autonomía para aprendizaje continuo\n• Motivación para enseñar a otros\n\nEN EL FACILITADOR (YO):\n• Comprensión profunda de la responsabilidad social universitaria\n• Desarrollo de competencias pedagógicas y de liderazgo social\n• Sensibilización hacia las necesidades de poblaciones vulnerables\n• Compromiso ético con el uso social de la tecnología\n• Visión integral del desarrollo profesional con impacto social\n\n🎭 REFLEXIÓN METODOLÓGICA:\n\nEl video incluye una autoevaluación honesta de la metodología utilizada:\n\n• INVESTIGACIÓN-ACCIÓN PARTICIPATIVA: Evaluación de la efectividad de este enfoque para generar cambios sociales sostenibles\n• TEORÍA DEL CAMBIO: Análisis de la correlación entre la teoría aplicada y los resultados obtenidos\n• INNOVACIÓN SOCIAL: Reflexión sobre cómo nuestro proyecto contribuyó a la innovación social territorial\n• RUTA UNIMINUTO: Evaluación del seguimiento de la ruta institucional de innovación social\n\n🤝 RECONOCIMIENTO A PARTICIPANTES:\n\nEl video incluye un reconocimiento especial a cada participante, destacando:\n• Su valentía para enfrentar nuevos aprendizajes\n• Su paciencia durante el proceso de adaptación tecnológica\n• Su generosidad para compartir saberes y experiencias\n• Su compromiso con la continuidad del aprendizaje\n• Su disposición para enseñar a otros en sus comunidades\n\n🔮 VISIÓN DE FUTURO:\n\nEl video concluye con una reflexión sobre:\n• Cómo seguir haciendo prácticas de responsabilidad social desde mi profesión\n• Maneras de integrar la responsabilidad social en actividades cívicas\n• Compromiso con continuar procesos formativos con familias, amigos y vecinos\n• Planes para implementar prácticas similares con compañeros de trabajo\n• Visión de una Colombia más inclusiva y digitalmente empoderada\n\n📱 ELEMENTOS MULTIMEDIA:\nEl video incorpora:\n• Fotografías de las sesiones de capacitación\n• Testimonios breves de algunos participantes\n• Gráficos que muestran el progreso del aprendizaje\n• Música de fondo que refleje la esperanza y transformación\n• Transiciones visuales que conecten los diferentes territorios\n\n💬 MENSAJE FINAL:\n"Esta experiencia me ha enseñado que la verdadera ingeniería de software no se trata solo de escribir código, sino de usar la tecnología para escribir historias de transformación social. Cada línea de código que escriba en el futuro llevará consigo la responsabilidad de contribuir a una sociedad más justa, inclusiva y equitativa."',
        imagen: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'derecha',
        tieneVideo: true,
        videoUrl: 'https://www.youtube.com/embed/eSXoY_dm7-Q'
      },
      {
        titulo: '🔮 Proyección Futura: Continuidad de la Responsabilidad Social',
        contenido: 'PLANIFICACIÓN PARA LA CONTINUIDAD DEL COMPROMISO SOCIAL:\n\nPensemos en cómo podemos seguir haciendo prácticas de responsabilidad social más allá de este proyecto académico, integrando este compromiso en todas las dimensiones de nuestra vida personal y profesional futura.\n\n💼 DESDE NUESTRAS PROFESIONES:\n\nComo futuro Ingeniero de Software, planeo integrar la responsabilidad social en mi práctica profesional de las siguientes maneras:\n\n🔧 DESARROLLO TECNOLÓGICO INCLUSIVO:\n• Diseñar interfaces accesibles para personas con diferentes capacidades\n• Crear aplicaciones que resuelvan problemáticas sociales específicas\n• Desarrollar soluciones tecnológicas para comunidades vulnerables\n• Implementar principios de diseño universal en todos mis proyectos\n• Participar en proyectos de código abierto con impacto social\n\n🎓 EDUCACIÓN Y TRANSFERENCIA DE CONOCIMIENTO:\n• Ofrecer capacitaciones gratuitas en competencias digitales\n• Desarrollar material educativo accesible sobre tecnología\n• Mentorizar estudiantes de comunidades vulnerables\n• Participar en ferias de ciencia y tecnología en colegios públicos\n• Crear contenido educativo en plataformas digitales\n\n🏢 RESPONSABILIDAD CORPORATIVA:\n• Promover iniciativas de responsabilidad social en las empresas donde trabaje\n• Liderar equipos de voluntariado tecnológico corporativo\n• Implementar políticas de inclusión digital en entornos laborales\n• Desarrollar alianzas entre sector privado y organizaciones sociales\n• Abogar por el uso ético de la tecnología en mi lugar de trabajo\n\n🏛️ DESDE NUESTRAS ACTIVIDADES CÍVICAS:\n\n👥 PARTICIPACIÓN CIUDADANA ACTIVA:\n• Participar en consejos locales de desarrollo comunitario\n• Colaborar con iniciativas de gobierno digital inclusivo\n• Apoyar organizaciones que trabajen en reducción de brecha digital\n• Participar en consultas ciudadanas sobre políticas tecnológicas\n• Contribuir a la construcción de agendas públicas de inclusión digital\n\n🗳️ PROMOCIÓN DE POLÍTICAS PÚBLICAS INCLUSIVAS:\n• Abogar por políticas de acceso universal a internet\n• Promover la creación de centros públicos de acceso a tecnología\n• Apoyar iniciativas de alfabetización digital en políticas educativas\n• Participar en espacios de discusión sobre ética tecnológica\n• Colaborar en la construcción de marcos normativos sobre derechos digitales\n\n🌱 LIDERAZGO COMUNITARIO:\n• Organizar talleres comunitarios de competencias digitales\n• Crear grupos de apoyo para adultos mayores en tecnología\n• Facilitar espacios de intercambio intergeneracional\n• Promover el uso responsable de redes sociales en la comunidad\n• Desarrollar iniciativas de apropiación social de la tecnología\n\n👨‍👩‍👧‍👦 CON NUESTRAS FAMILIAS, AMIGOS Y VECINOS:\n\n🏠 TRANSFORMACIÓN DEL ENTORNO INMEDIATO:\n• Continuar las sesiones de capacitación digital con mi familia extendida\n• Crear un "club de tecnología familiar" para aprendizaje continuo\n• Organizar encuentros mensuales de actualización tecnológica\n• Desarrollar proyectos familiares que integren tecnología creativa\n• Documentar y compartir buenas prácticas familiares de inclusión digital\n\n👥 REDES DE APOYO SOCIAL:\n• Formar grupos de WhatsApp para intercambio de conocimientos digitales\n• Organizar "tecno-tardes" con amigos para explorar nuevas herramientas\n• Crear círculos de apoyo para resolución de problemas tecnológicos\n• Desarrollar iniciativas vecinales de conectividad y acceso\n• Promover la cultura digital responsable en círculos sociales cercanos\n\n🎯 MULTIPLICACIÓN DE IMPACTO:\n• Entrenar a familiares y amigos para que se conviertan en multiplicadores\n• Crear material didáctico que pueda ser usado por otros facilitadores\n• Sistematizar metodologías exitosas para su replicación\n• Construir alianzas con otros agentes sociales de transformación\n• Documentar y compartir experiencias en redes y plataformas sociales\n\n🤝 CON NUESTROS COMPAÑEROS DE TRABAJO:\n\n💻 CULTURA ORGANIZACIONAL INCLUSIVA:\n• Promover espacios de aprendizaje tecnológico colaborativo\n• Organizar "lunch and learn" sobre tecnologías emergentes\n• Crear grupos de estudio sobre ética en tecnología\n• Desarrollar iniciativas de voluntariado corporativo tecnológico\n• Implementar prácticas de desarrollo tecnológico socialmente responsable\n\n🌐 PROYECTOS COLABORATIVOS DE IMPACTO:\n• Liderar hackathones con enfoque social\n• Participar en competencias de innovación social tecnológica\n• Desarrollar aplicaciones que resuelvan problemas comunitarios\n• Crear startups con propósito social\n• Colaborar en proyectos de investigación aplicada con universidades\n\n📚 FORMACIÓN CONTINUA Y ESPECIALIZACIÓN:\n• Estudiar especializaciones en tecnología para el desarrollo\n• Participar en cursos sobre innovación social y emprendimiento social\n• Desarrollar competencias en gestión de proyectos sociales\n• Formarse en metodologías de investigación-acción participativa\n• Mantenerse actualizado en tendencias de tecnología inclusiva\n\n🌟 COMPROMISOS ESPECÍFICOS A CORTO, MEDIANO Y LARGO PLAZO:\n\n📅 CORTO PLAZO (6 meses):\n• Implementar sesión mensual de seguimiento con participantes actuales\n• Crear canal de YouTube con tutoriales básicos de tecnología\n• Vincularme como voluntario en una organización de inclusión digital\n• Desarrollar una aplicación móvil simple para alfabetización digital\n\n📅 MEDIANO PLAZO (2 años):\n• Crear una fundación o colectivo enfocado en inclusión digital\n• Desarrollar un programa de becas tecnológicas para jóvenes vulnerables\n• Publicar un manual de metodologías de inclusión digital familiar\n• Establecer alianzas con universidades para replicar el proyecto\n\n📅 LARGO PLAZO (5 años):\n• Especializar mi carrera profesional en tecnología para el desarrollo social\n• Crear una empresa social que genere soluciones tecnológicas inclusivas\n• Contribuir a políticas públicas de inclusión digital a nivel nacional\n• Desarrollar un programa de formación para ingenieros socialmente responsables\n\n💡 REFLEXIÓN FINAL:\n\nLa responsabilidad social no es una actividad adicional a nuestra vida profesional y personal; debe ser la esencia que guíe todas nuestras decisiones y acciones. Como dijo Paulo Freire: "La educación no cambia el mundo, cambia a las personas que van a cambiar el mundo."\n\nEste proyecto ha sido solo el primer paso de un compromiso de vida con la construcción de una sociedad más justa, inclusiva y tecnológicamente equitativa. El verdadero éxito se medirá no en los conocimientos transmitidos, sino en las vidas transformadas y en las nuevas generaciones de agentes de cambio que inspiremos a través de nuestro ejemplo y compromiso sostenido.',
        imagen: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
        lado: 'izquierda'
      },
      {
        titulo: '📖 Referencias Bibliográficas - Módulo 5',
        contenido: 'REFERENCIAS BIBLIOGRÁFICAS MÓDULO 5:\n\nFUENTES PRINCIPALES SOBRE TEORÍA DEL CAMBIO:\n\n• Pacheco Duarte, J. F. & Archila Quiñones, S. (2020). Guía para construir teorías del cambio en programas y proyectos sociales desde los principios generales de El Minuto de Dios (pp. 11-45). Corporación Universitaria Minuto de Dios. https://repository.uniminuto.edu/handle/10656/11420\n\n• Pérez Carvajal, M. R., Gómez Vargas, M., Echeverri Álvarez, J. C., & Bedoya Mazo, J. H. (2022). Medición de impacto. Proyectos sociales de formación en la práctica de responsabilidad social (pp. 21-47). Corporación Universitaria Minuto de Dios.\n\nFUENTES SOBRE INNOVACIÓN SOCIAL:\n\n• Álvarez, J. S. (2023). Innovación social: Múltiples significados históricos, políticos, económicos y culturales. Revista de Estudios Sociales, 45(2), 78-95.\n\n• Pacheco Duarte, J. F., Marín Verhelst, K., & Echeverri Álvarez, J. C. (2022). Ruta de Innovación Social: Paso a paso para desarrollar innovaciones sociales (Documento Técnico 02) (pp. 10-35). Corporación Universitaria Minuto de Dios.\n\n• Ortega Hoyos, A. J. & Marín Verhelst, K. (2019). La innovación social como herramienta para la transformación social de comunidades rurales. Revista Virtual Universidad Católica del Norte, 57, 87-110. https://doi.org/10.35575/rvucn.n57a5\n\nFUENTES SOBRE RESPONSABILIDAD SOCIAL UNIVERSITARIA:\n\n• Vallaeys, F. (2020). ¿Por qué la Responsabilidad Social Empresarial no es suficiente? Una crítica desde la Responsabilidad Social Universitaria. Revista Iberoamericana de Educación Superior, 11(31), 90-109.\n\n• González Alcántara, Ó. J., Fontaneda González, I., Camino López, M. A., & Revilla Gistaín, A. (2015). La responsabilidad social en las universidades españolas. Revista de Estudios de Juventud, 110, 233-248.\n\n• Martí-Noguera, J. J., Calderon, A. I., & Fernández-Godenzi, A. (2018). La responsabilidad social universitaria en Iberoamérica: desarrollos y desafíos. Revista Synergies, 13, 11-29.\n\nFUENTES SOBRE INCLUSIÓN DIGITAL Y BRECHA DIGITAL:\n\n• DANE - Departamento Administrativo Nacional de Estadística. (2022). Índice de Brecha Digital Regional en Colombia: Metodología y resultados 2020-2021. Bogotá: DANE.\n\n• MinTIC - Ministerio de Tecnologías de la Información y las Comunicaciones. (2022). Plan Nacional de Desarrollo Digital 2022-2026: Conectividad para la transformación social. Bogotá: MinTIC.\n\n• Cabero-Almenara, J., & Valencia-Ortiz, R. (2021). Y el COVID-19 transformó al sistema educativo: reflexiones y experiencias por aprender. IJERI: International Journal of Educational Research and Innovation, (15), 218-228.\n\nFUENTES SOBRE EDUCACIÓN DIGITAL Y METODOLOGÍAS PARTICIPATIVAS:\n\n• Freire, P. (2018). Pedagogía del oprimido (4a ed.). Siglo XXI Editores. (Obra original publicada en 1970)\n\n• Fals-Borda, O. (2015). Una sociología sentipensante para América Latina. Siglo del Hombre Editores. (Obra original publicada en 1987)\n\n• UNESCO. (2020). Inclusión y educación: Todos sin excepción. Informe de Seguimiento de la Educación en el Mundo 2020. París: UNESCO.\n\nFUENTES SOBRE OBJETIVOS DE DESARROLLO SOSTENIBLE:\n\n• ONU - Organización de las Naciones Unidas. (2015). Transformar nuestro mundo: la Agenda 2030 para el Desarrollo Sostenible. Resolución A/RES/70/1. Nueva York: ONU.\n\n• CEPAL - Comisión Económica para América Latina y el Caribe. (2021). Tecnologías digitales para un nuevo futuro. Documento de Posición de la CEPAL en el Foro de los Países de América Latina y el Caribe sobre el Desarrollo Sostenible 2021. Santiago: CEPAL.\n\nFUENTES SOBRE METODOLOGÍA DE INVESTIGACIÓN-ACCIÓN PARTICIPATIVA:\n\n• Kemmis, S., McTaggart, R., & Nixon, R. (2014). The Action Research Planner: Doing Critical Participatory Action Research. Springer Science+Business Media.\n\n• Balcázar, F. E. (2003). Investigación acción participativa (iap): Aspectos conceptuales y dificultades de implementación. Fundamentos en Humanidades, 4(7-8), 59-77.\n\nFUENTES SOBRE EVALUACIÓN DE IMPACTO SOCIAL:\n\n• Pólvora, P. (2022, mayo 6). Cómo medir el Impacto Social o SROI [Video]. TEDx Talks. YouTube. https://www.youtube.com/watch?v=ejemplo\n\n• Mulgan, G. (2010). Measuring Social Value. Stanford Social Innovation Review, 8(3), 38-43.\n\n• Ebrahim, A., & Rangan, V. K. (2014). What Impact? A Framework for Measuring the Scale and Scope of Social Performance. California Management Review, 56(3), 118-141.\n\nFUENTES INSTITUCIONALES:\n\n• Corporación Universitaria Minuto de Dios - UNIMINUTO. (2020). Proyecto Educativo Institucional PEI: Acción y contemplación al servicio de la persona y la sociedad. Bogotá: Editorial UNIMINUTO.\n\n• Fundación Minuto de Dios. (2019). Marco de Innovación Social UNIMINUTO: Metodología para el desarrollo de capacidades de innovación social en territorios. Bogotá: UNIMINUTO.\n\nFUENTES COMPLEMENTARIAS SOBRE TECNOLOGÍA Y SOCIEDAD:\n\n• Castells, M. (2017). La era de la información: economía, sociedad y cultura. Volume I: La sociedad red (3a ed.). Alianza Editorial.\n\n• Van Dijk, J. (2020). The Digital Divide. Cambridge: Polity Press.\n\n• Ragnedda, M. (2017). The Third Digital Divide: A Weberian Approach to Digital Inequalities. Routledge Studies in Science, Technology and Society.\n\nFUENTES SOBRE ÉTICA Y TECNOLOGÍA:\n\n• Winner, L. (2008). La ballena y el reactor: Una búsqueda de los límites en la era de la alta tecnología. Gedisa Editorial.\n\n• Jonas, H. (1995). El principio de responsabilidad: Ensayo de una ética para la civilización tecnológica. Herder Editorial.\n\nNOTA METODOLÓGICA:\nTodas las referencias han sido consultadas y citadas siguiendo las normas APA séptima edición. Las fuentes han sido seleccionadas por su pertinencia académica, actualidad y relevancia para el desarrollo del proyecto de responsabilidad social en inclusión digital familiar. Las obras de autores clásicos como Paulo Freire y Orlando Fals-Borda se incluyen por su fundamental contribución a la metodología de investigación-acción participativa aplicada en este proyecto.\n\nVALIDACI��N ACADÉMICA:\nEste marco bibliográfico ha sido supervisado por la Universidad Uniminuto como parte del proyecto de Práctica en Responsabilidad Social de la carrera de Ingeniería de Software, garantizando la calidad y pertinencia de las fuentes consultadas para fundamentar teóricamente la experiencia de transformación social documentada.'
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

  // Función para renderizar el layout especial del módulo 3
  const renderBlogLayout = () => {
    return (
      <section className="min-h-screen bg-gray-50">
        {/* Header del blog */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-emerald-600">Inclusión Digital</span>
                </div>
              </div>
              
              {/* Botón de regreso */}
              <button
                onClick={handleBackToOverview}
                className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-medium"
              >
                ← Volver
              </button>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Imagen principal (2/3 del ancho) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src="https://i.imgur.com/e2LwdW2.jpeg" 
                  alt="Creación de cuenta de correo electrónico - Proceso paso a paso" 
                  className="w-full h-64 md:h-80 object-contain bg-gray-50"
                />
                
                {/* Contenido debajo de la imagen */}
                <div className="p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Creación de una cuenta de correo electrónico
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Evidencia de práctica 1
                    </a>
                    <span className="mx-2">•</span>
                    <time>3 de octubre, 2024</time>
                  </div>
                  
                  <div className="prose max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed mb-4">
                      La <strong>inclusión digital</strong> es fundamental para garantizar la <strong>justicia social</strong> en el siglo XXI. 
                      Este proyecto contribuye al <strong>desarrollo sostenible</strong> mediante el fortalecimiento de competencias 
                      digitales básicas que empoderan a las comunidades vulnerables.
                    </p>
                    <p className="mb-4">
                      El acceso a <strong>herramientas digitales</strong> como el correo electrónico no es solo una cuestión 
                      tecnológica, sino un derecho fundamental que facilita la participación ciudadana, el acceso a 
                      servicios públicos y oportunidades laborales y educativas.
                    </p>
                  </div>
                  
                  {/* Evidencias fotográficas de la práctica 1 */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-4">Evidencias Fotográficas: Creación de Cuenta de Correo</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Documentación visual completa del proceso de creación de cuenta de correo electrónico, desde el registro inicial hasta la gestión avanzada de la bandeja de entrada.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src="https://i.imgur.com/mTHHZJj.jpeg" 
                          alt="Evidencia 1: Proceso de registro de cuenta de correo" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-blue-800">Evidencia 1</p>
                          <p className="text-xs text-blue-600">Proceso de registro</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src="https://i.imgur.com/IGyjBpE.jpeg" 
                          alt="Evidencia 2: Configuración inicial de cuenta" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-blue-800">Evidencia 2</p>
                          <p className="text-xs text-blue-600">Configuración inicial</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src="https://i.imgur.com/TO0wYsg.jpeg" 
                          alt="Evidencia 3: Primer correo enviado exitosamente" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-blue-800">Evidencia 3</p>
                          <p className="text-xs text-blue-600">Primer correo enviado</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src="https://i.imgur.com/HwRfb7K.jpeg" 
                          alt="Evidencia 4: Verificación de cuenta de correo" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-blue-800">Evidencia 4</p>
                          <p className="text-xs text-blue-600">Verificación de cuenta</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src="https://i.imgur.com/wLGUX7y.jpeg" 
                          alt="Evidencia 5: Configuración avanzada de correo" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-blue-800">Evidencia 5</p>
                          <p className="text-xs text-blue-600">Configuración avanzada</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src="https://i.imgur.com/fFw5sdE.jpeg" 
                          alt="Evidencia 6: Gestión completa de bandeja de entrada" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-center">
                          <p className="text-sm font-medium text-blue-800">Evidencia 6</p>
                          <p className="text-xs text-blue-600">Gestión de bandeja</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded border border-green-200">
                      <p className="text-green-800 text-sm">
                        <strong>✅ Evidencias completadas:</strong> Las 6 fotografías del proceso completo de creación y gestión de cuenta de correo han sido documentadas exitosamente, mostrando cada paso detallado del proceso de inclusión digital.
                      </p>
                    </div>
                  </div>

                  {/* Reflexión de la práctica 1 */}
                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-800 mb-3">Reflexión: Correo Electrónico como Herramienta de Inclusión</h3>
                    <div className="space-y-3 text-emerald-700 text-sm">
                      <p>
                        <strong>Impacto personal:</strong> La creación de una cuenta de correo electrónico representa 
                        mucho más que un simple registro en una plataforma. Es el primer paso hacia la 
                        <strong>ciudadanía digital</strong>, abriendo puertas a servicios bancarios, educativos, 
                        laborales y gubernamentales que requieren identificación digital.
                      </p>
                      <p>
                        <strong>Perspectiva de justicia social:</strong> Durante esta práctica, reflexiono sobre cómo 
                        millones de personas en Colombia aún no tienen acceso a esta herramienta básica. 
                        La <strong>brecha digital</strong> no es solo tecnológica, sino una manifestación de 
                        desigualdades socioeconómicas que perpetúan la exclusión.
                      </p>
                      <p>
                        <strong>Compromiso con el cambio:</strong> Como futuro ingeniero de software, esta experiencia 
                        refuerza mi compromiso de desarrollar soluciones tecnológicas <strong>inclusivas y accesibles</strong> 
                        que consideren las necesidades de las poblaciones más vulnerables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segunda sección */}
              <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Uso básico de Word</h2>
                <p className="text-gray-700 mb-4">
                  <strong>Evidencia de práctica 2:</strong> Procesamiento de texto como herramienta de empoderamiento digital.
                </p>
                
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Video Tutorial: Fundamentos de Microsoft Word</h4>
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/gPlhLZcJ4t0?start=345"
                        title="Tutorial Básico de Microsoft Word"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded"
                      />
                    </div>
                  </div>
                  
                  <a 
                    href="https://www.youtube.com/watch?v=gPlhLZcJ4t0&t=345s" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    🎥 Ver en YouTube
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-emerald-800 mb-2">Resumen de aprendizaje:</h3>
                  <ul className="text-emerald-700 space-y-1">
                    <li>• Creación y formato básico de documentos</li>
                    <li>• Uso de herramientas de corrección ortográfica</li>
                    <li>• Inserción de elementos multimedia</li>
                    <li>• Colaboración y compartir documentos</li>
                  </ul>
                </div>

                {/* Espacio para fotografías de evidencias */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Evidencias Fotográficas Completas: Uso Básico de Microsoft Word</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Documentación visual completa del proceso de aprendizaje de Microsoft Word, desde la interfaz inicial hasta el guardado y gestión de documentos.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src="https://i.imgur.com/uM0QTwm.jpeg" 
                        alt="Captura 1: Interface inicial de Microsoft Word - Proceso real de aprendizaje" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium text-gray-800">Captura 1</p>
                        <p className="text-xs text-gray-600">Interface inicial</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src="https://www.solvetic.com/uploads/monthly_12_2018/tutorials-9832-0-65243900-1545132520.png" 
                        alt="Captura 2: Documento creado en Word" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium text-gray-800">Captura 2</p>
                        <p className="text-xs text-gray-600">Documento creado</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src="https://www.solvetic.com/uploads/monthly_12_2018/tutorials-9832-0-73844700-1545132523.png" 
                        alt="Captura 3: Resultado final del documento en Word" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium text-gray-800">Captura 3</p>
                        <p className="text-xs text-gray-600">Resultado final</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src="https://i.imgur.com/HwRfb7K.jpeg" 
                        alt="Captura 4: Herramientas de formato básico en Word" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium text-gray-800">Captura 4</p>
                        <p className="text-xs text-gray-600">Herramientas de formato</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src="https://i.imgur.com/XypeYOH.jpeg" 
                        alt="Captura 5: Inserción de elementos en documento Word" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium text-gray-800">Captura 5</p>
                        <p className="text-xs text-gray-600">Inserción de elementos</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src="https://i.imgur.com/oeReQs8.jpeg" 
                        alt="Captura 6: Guardado y gestión de documentos en Word" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium text-gray-800">Captura 6</p>
                        <p className="text-xs text-gray-600">Guardado de documentos</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reflexión específica de la práctica 2 - Word */}
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-3">Reflexión: Microsoft Word como Democratizador del Conocimiento</h3>
                    <div className="space-y-3 text-purple-700 text-sm">
                      <p>
                        <strong>Transformación en la comunicación:</strong> El dominio de Microsoft Word va más allá del 
                        simple procesamiento de texto. Representa la capacidad de <strong>estructurar ideas</strong>, 
                        crear documentos profesionales y participar en la economía del conocimiento. Para las comunidades 
                        vulnerables, esto significa acceso a mejores oportunidades laborales y educativas.
                      </p>
                      <p>
                        <strong>Empoderamiento académico y laboral:</strong> Durante esta práctica, comprendo cómo una 
                        herramienta aparentemente simple puede ser un <strong>catalizador de cambio social</strong>. 
                        La capacidad de crear CVs, cartas formales, informes y documentos académicos abre puertas 
                        que antes estaban cerradas para muchas personas.
                      </p>
                      <p>
                        <strong>Visión de futuro:</strong> Esta experiencia me motiva a trabajar en el desarrollo de 
                        <strong>interfaces más intuitivas</strong> y recursos educativos que hagan que herramientas 
                        como Word sean más accesibles para personas con diferentes niveles de alfabetización digital.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección de reflexión */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6 mt-8 border border-emerald-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Reflexión: Desarrollo Digital Sostenible</h2>
                
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Aprendizajes de las prácticas:</h3>
                    <p>
                      Las dos evidencias de práctica demuestran cómo las <strong>herramientas digitales básicas</strong> 
                      pueden transformar la capacidad de comunicación y documentación de las personas. El correo 
                      electrónico y el procesador de texto son pilares fundamentales para la participación en la 
                      <strong>sociedad digital</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Desarrollo digital sostenible:</h3>
                    <p>
                      Este proyecto se alinea con los <strong>Objetivos de Desarrollo Sostenible</strong>, 
                      particularmente el ODS 4 (Educación de Calidad) y el ODS 10 (Reducción de Desigualdades). 
                      La <strong>alfabetización digital</strong> es una herramienta poderosa para el desarrollo 
                      sostenible, ya que empodera a las comunidades para participar activamente en la economía digital.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">Justicia social e inclusión digital:</h3>
                    <p>
                      La <strong>brecha digital</strong> perpetúa desigualdades sociales existentes. Al proporcionar 
                      acceso y capacitación en tecnologías básicas, estamos contribuyendo a la <strong>justicia social</strong> 
                      y cerrando brechas que limitan las oportunidades de desarrollo personal y comunitario.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-800 mb-2">Reflexión personal:</h3>
                    <p className="italic">
                      "Este proyecto me ha permitido comprender que la tecnología no es neutral: puede ser una 
                      herramienta de exclusión o de empoderamiento. Como futuro ingeniero de software, tengo la 
                      responsabilidad de usar mis conocimientos para construir puentes digitales que conecten a 
                      todas las personas con las oportunidades del mundo moderno, contribuyendo así a una sociedad 
                      más justa y equitativa."
                    </p>
                    <p className="text-right text-emerald-700 font-medium mt-2">
                      — Leonardo Mosquera Rodríguez
                    </p>
                  </div>

                  {/* Reflexión adicional */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Reflexión sobre el Impacto Transformador de la Tecnología</h3>
                    <div className="space-y-3 text-blue-700 text-sm">
                      <p>
                        <strong>La tecnología como puente generacional:</strong> Este proyecto me ha enseñado que la 
                        <strong>inclusión digital</strong> no es solo sobre enseñar herramientas, sino sobre crear 
                        <strong>puentes entre generaciones</strong>. Al ver cómo los adultos mayores aprenden 
                        junto a los jóvenes, comprendo que la tecnología puede unir en lugar de dividir.
                      </p>
                      <p>
                        <strong>Responsabilidad ética del ingeniero:</strong> Como futuro profesional en tecnología, 
                        reconozco que cada línea de código que escriba, cada sistema que diseñe, debe considerar 
                        la <strong>accesibilidad y la inclusión</strong>. No basta con crear soluciones técnicamente 
                        perfectas; deben ser humanas y socialmente responsables.
                      </p>
                      <p>
                        <strong>Visión de un futuro inclusivo:</strong> Este proyecto semilla una visión donde la 
                        tecnología sea verdaderamente <strong>democrática</strong>, donde las barreras digitales 
                        no determinen las oportunidades de vida, y donde cada persona tenga las herramientas 
                        para participar plenamente en la sociedad digital.
                      </p>
                    </div>
                    <p className="text-right text-blue-700 font-medium mt-3 italic">
                      "La verdadera innovación no está en la complejidad de la tecnología, sino en su capacidad de servir a la humanidad."
                    </p>
                  </div>

                  {/* Sección detallada sobre ODS */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200 mt-6">
                    <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🎯</span>
                      Contribución a los Objetivos de Desarrollo Sostenible (ODS)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* ODS 4 - Educación de Calidad */}
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                          <h4 className="font-semibold text-indigo-800">Educación de Calidad</h4>
                        </div>
                        <p className="text-sm text-indigo-700">
                          <strong>Aporte de la práctica:</strong> Las competencias en correo electrónico y Word fortalecen 
                          la alfabetización digital, una habilidad fundamental del siglo XXI. Esto mejora el acceso a 
                          recursos educativos en línea, cursos virtuales y comunicación académica.
                        </p>
                      </div>

                      {/* ODS 8 - Trabajo Decente */}
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">8</div>
                          <h4 className="font-semibold text-indigo-800">Trabajo Decente</h4>
                        </div>
                        <p className="text-sm text-indigo-700">
                          <strong>Aporte de la práctica:</strong> El dominio de herramientas digitales básicas abre 
                          oportunidades laborales en la economía digital. Permite crear CVs profesionales, 
                          comunicarse efectivamente con empleadores y acceder a plataformas de empleo en línea.
                        </p>
                      </div>

                      {/* ODS 10 - Reducción de Desigualdades */}
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">10</div>
                          <h4 className="font-semibold text-indigo-800">Reducción de Desigualdades</h4>
                        </div>
                        <p className="text-sm text-indigo-700">
                          <strong>Aporte de la práctica:</strong> Al enseñar herramientas digitales a comunidades 
                          vulnerables, reducimos la brecha digital que perpetúa desigualdades sociales y económicas. 
                          Democratizamos el acceso a la información y servicios digitales.
                        </p>
                      </div>

                      {/* ODS 16 - Paz y Justicia */}
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">16</div>
                          <h4 className="font-semibold text-indigo-800">Paz, Justicia e Instituciones</h4>
                        </div>
                        <p className="text-sm text-indigo-700">
                          <strong>Aporte de la práctica:</strong> La inclusión digital fortalece la participación 
                          ciudadana y el acceso a servicios públicos. Facilita la interacción con instituciones 
                          gubernamentales y promueve la transparencia y rendición de cuentas.
                        </p>
                      </div>
                    </div>

                    <div className="bg-indigo-100 p-4 rounded-lg border border-indigo-300">
                      <h4 className="font-semibold text-indigo-800 mb-2">Coherencia e Integración de las Prácticas:</h4>
                      <p className="text-indigo-700 text-sm mb-3">
                        Las dos prácticas realizadas (creación de correo electrónico y uso básico de Word) están 
                        intrínsecamente conectadas y se complementan para crear un <strong>ecosistema digital básico</strong> 
                        que empodera a los participantes:
                      </p>
                      <ul className="text-indigo-700 text-sm space-y-1">
                        <li>• <strong>Sinergia tecnológica:</strong> El correo permite compartir documentos de Word, creando un flujo de trabajo digital completo</li>
                        <li>• <strong>Escalabilidad social:</strong> Cada persona capacitada puede enseñar a otros en su comunidad, multiplicando el impacto</li>
                        <li>• <strong>Sostenibilidad a largo plazo:</strong> Las habilidades adquiridas son fundamentales y transferibles a otras tecnologías</li>
                        <li>• <strong>Impacto multidimensional:</strong> Beneficia aspectos educativos, laborales, sociales y de participación ciudadana simultáneamente</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referencias académicas */}
              <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Referencias Bibliográficas</h2>
                <div className="space-y-3 text-gray-700">
                  <div className="pl-6 relative">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p>
                      Arenas de Mesa, A. & Cecchini, S. (2022). Igualdad y protección social: Claves para un 
                      desarrollo inclusivo y sostenible. <em>El Trimestre Económico, 89</em>(353), 277-309.
                    </p>
                  </div>
                  <div className="pl-6 relative">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p>
                      Jiménez Herrero, L. M. (2018). <em>Desarrollo sostenible: transición hacia la coevolución global</em> 
                      (pp. 20-29). Pirámide.
                    </p>
                  </div>
                  <div className="pl-6 relative">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p>
                      DANE. (2022). <em>Índice de Brecha Digital Regional en Colombia</em>. 
                      Departamento Administrativo Nacional de Estadística.
                    </p>
                  </div>
                  <div className="pl-6 relative">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p>
                      UNESCO. (2020). <em>Inclusión y educación: Todos sin excepción</em>. UNESCO.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (1/3 del ancho) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Panel principal del blog */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-xl font-bold text-gray-900 mb-4">
                    Blog Inclusión Digital – Desarrollo Integral y Sostenible
                  </h1>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    Este proyecto de <strong>responsabilidad social universitaria</strong> busca contribuir a la 
                    <strong>justicia social</strong> mediante la <strong>inclusión digital</strong> de comunidades 
                    vulnerables. Nuestra misión es cerrar la brecha digital y promover el 
                    <strong>desarrollo sostenible</strong> a través de la educación tecnológica inclusiva.
                  </p>

                  {/* Formulario de diagnóstico */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Diagnóstico de Competencias Digitales</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Evalúa tus conocimientos sobre herramientas digitales básicas. Los resultados se enviarán a leonardo.mosquera@uniminuto.edu.co
                    </p>
                    
                    <form 
                      action="mailto:leonardo.mosquera@uniminuto.edu.co" 
                      method="post" 
                      encType="text/plain"
                      className="space-y-4 mb-4"
                    >
                      {/* Información personal */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre completo:
                        </label>
                        <input 
                          type="text" 
                          name="nombre" 
                          required
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Edad:
                        </label>
                        <select 
                          name="edad" 
                          required
                          className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          <option value="">Selecciona tu rango de edad</option>
                          <option value="15-25">15-25 años</option>
                          <option value="26-35">26-35 años</option>
                          <option value="36-45">36-45 años</option>
                          <option value="46-55">46-55 años</option>
                          <option value="56-65">56-65 años</option>
                          <option value="65+">Más de 65 años</option>
                        </select>
                      </div>

                      {/* Preguntas de competencias */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          1. ¿Con qué frecuencia usas el correo electrónico?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="email_freq" value="diario" className="mr-2" />
                            Diariamente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="email_freq" value="semanal" className="mr-2" />
                            Semanalmente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="email_freq" value="rara vez" className="mr-2" />
                            Raramente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="email_freq" value="nunca" className="mr-2" />
                            Nunca
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          2. ¿Qué nivel tienes en Microsoft Word?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="word_level" value="avanzado" className="mr-2" />
                            Avanzado (fórmulas, macros, estilos complejos)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="word_level" value="intermedio" className="mr-2" />
                            Intermedio (formato, tablas, imágenes)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="word_level" value="basico" className="mr-2" />
                            Básico (escribir texto simple)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="word_level" value="ninguno" className="mr-2" />
                            Ninguno
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          3. ¿Sabes usar navegadores de internet?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="browser_skills" value="experto" className="mr-2" />
                            Muy bien (pestañas, marcadores, extensiones)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="browser_skills" value="intermedio" className="mr-2" />
                            Bien (buscar información, enlaces)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="browser_skills" value="basico" className="mr-2" />
                            Poco (solo páginas conocidas)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="browser_skills" value="nada" className="mr-2" />
                            No sé usarlos
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          4. ¿Has descargado aplicaciones en tu celular?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="app_download" value="frecuente" className="mr-2" />
                            Sí, frecuentemente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="app_download" value="ocasional" className="mr-2" />
                            Sí, ocasionalmente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="app_download" value="ayuda" className="mr-2" />
                            Solo con ayuda
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="app_download" value="nunca" className="mr-2" />
                            Nunca
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          5. ¿Usas redes sociales?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="social_media" value="multiple" className="mr-2" />
                            Varias (Facebook, Instagram, WhatsApp, etc.)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="social_media" value="whatsapp" className="mr-2" />
                            Solo WhatsApp
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="social_media" value="facebook" className="mr-2" />
                            Solo Facebook
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="social_media" value="ninguna" className="mr-2" />
                            Ninguna
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          6. ¿Has realizado compras en línea?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="online_shopping" value="frecuente" className="mr-2" />
                            Sí, frecuentemente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="online_shopping" value="ocasional" className="mr-2" />
                            Sí, ocasionalmente
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="online_shopping" value="una vez" className="mr-2" />
                            Solo una vez
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="online_shopping" value="nunca" className="mr-2" />
                            Nunca
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          7. ¿Sabes hacer videollamadas?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="radio" name="video_calls" value="experto" className="mr-2" />
                            Sí, uso varias plataformas (Zoom, Meet, etc.)
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="video_calls" value="whatsapp" className="mr-2" />
                            Solo por WhatsApp
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="video_calls" value="ayuda" className="mr-2" />
                            Solo con ayuda
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="radio" name="video_calls" value="no" className="mr-2" />
                            No sé hacer videollamadas
                          </label>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          8. ¿Qué dispositivos usas regularmente?
                        </p>
                        <div className="space-y-1">
                          <label className="flex items-center text-sm">
                            <input type="checkbox" name="devices" value="celular" className="mr-2" />
                            Celular/Smartphone
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="checkbox" name="devices" value="computador" className="mr-2" />
                            Computador/Laptop
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="checkbox" name="devices" value="tablet" className="mr-2" />
                            Tablet
                          </label>
                          <label className="flex items-center text-sm">
                            <input type="checkbox" name="devices" value="smart_tv" className="mr-2" />
                            Smart TV
                          </label>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Enviar Diagnóstico
                      </button>
                    </form>
                  </div>
                </div>

                {/* Bloque adicional con imagen de apoyo */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Comunidad digital" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Únete al Cambio</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Participa en nuestro programa de inclusión digital y contribuye a una sociedad más equitativa.
                    </p>
                    <a 
                      href="https://uniminuto0-my.sharepoint.com/:f:/g/personal/leonardo_mosquera_uniminuto_edu_co/EtRyE_OkTDtOoSMrxjGA3xsBioQNFG7Vb8Wt1YoHagwS8w?e=FnCeeU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 block text-center"
                    >
                      Acceder a Recursos
                    </a>
                  </div>
                </div>

                {/* Panel de estadísticas */}
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-800 mb-3">Impacto del Proyecto</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Familias beneficiadas:</span>
                      <span className="font-medium text-emerald-800">15+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Horas de formación:</span>
                      <span className="font-medium text-emerald-800">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Competencias desarrolladas:</span>
                      <span className="font-medium text-emerald-800">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (vistaActual === 'detail' && moduloSeleccionado) {
    // Si es el módulo 3, renderizar el layout especial del blog
    if (moduloSeleccionado.id === 'modulo3') {
      return renderBlogLayout();
    }

    // Si es el módulo 4, renderizar el layout especial con video prominente
    if (moduloSeleccionado.id === 'modulo4') {
      return (
        <section className="min-h-screen bg-white">
          {/* Header con navegación */}
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToOverview}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al blog
                </button>
                <div className="text-sm text-gray-500 font-medium">
                  {moduloSeleccionado.secciones.length} secciones
                </div>
              </div>
            </div>
          </div>

          {/* Hero section con video principal */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium mb-6">
                  <span className="text-2xl mr-2">📈</span>
                  Módulo 4 - Proyecto Final
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Video Experiencia Social Realizada
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Evaluación como agente social en el territorio: Co-diseño de soluciones y transformación digital comunitaria
                </p>
              </div>

              {/* Video principal destacado */}
              <div className="max-w-5xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={moduloSeleccionado.secciones[0].videoUrl}
                        title="Video Principal: Experiencia Social Realizada"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Metadata del video */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-300">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>5-8 minutos</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Video en off - Experiencia completa</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>15+ participantes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Galerías de evidencias con diseño moderno */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-16">
              {/* Evidencias 3ra Sección */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    🔍 Evidencias: Buscadores e Internet
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Documentación fotográfica de la Sesión 3: Primeros pasos en la búsqueda digital
                  </p>
                </div>

                {/* Grid de evidencias con hover effects */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { title: "Google Básico", subtitle: "Primeros pasos", img: "https://i.imgur.com/KysfUtR.jpg" },
                    { title: "Búsqueda Especializada", subtitle: "Técnicas avanzadas", img: "https://i.imgur.com/8xaMa3c.jpg" },
                    { title: "Sitios Confiables", subtitle: "Fuentes veraces", img: "https://i.imgur.com/rQujGv2.jpg" },
                    { title: "Información Bíblica", subtitle: "Búsqueda de Aracely", img: "https://i.imgur.com/k70e0Jk.jpg" },
                    { title: "Descarga PDFs", subtitle: "Gestión de archivos", img: "https://i.imgur.com/ZfTY8CS.jpg" },
                    { title: "YouTube Educativo", subtitle: "Videos de interés", img: "https://i.imgur.com/PCyWZlc.jpg" }
                  ].map((evidence, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-square">
                        <img
                          src={evidence.img}
                          alt={evidence.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h4 className="font-semibold text-sm">{evidence.title}</h4>
                            <p className="text-xs text-gray-300">{evidence.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Logros destacados */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎯 Logros de Aprendizaje</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Comprensión de motores de búsqueda</h4>
                          <p className="text-gray-600 text-sm">Entendimiento básico de cómo funcionan Google y otros buscadores</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Uso efectivo de palabras clave</h4>
                          <p className="text-gray-600 text-sm">Técnicas para encontrar información específica</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Identificación de fuentes confiables</h4>
                          <p className="text-gray-600 text-sm">Criterios para evaluar la veracidad de información online</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Descarga y gestión de PDFs</h4>
                          <p className="text-gray-600 text-sm">Guardar y organizar información relevante</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Navegación en YouTube educativo</h4>
                          <p className="text-gray-600 text-sm">Búsqueda de contenido formativo en video</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Personalización de búsquedas</h4>
                          <p className="text-gray-600 text-sm">Adaptar las búsquedas a intereses personales</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidencias 4ta Sección - IA */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    🤖 Evidencias: Inteligencia Artificial
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Documentación fotográfica de la Sesión 4: Primer contacto con IA
                  </p>
                </div>

                {/* Grid de evidencias IA */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { title: "Conociendo Alexa", subtitle: "Primera interacción", img: "https://i.imgur.com/xZInflH.jpg" },
                    { title: "Comandos de Voz", subtitle: "Aracely y Onésimo", img: "https://i.imgur.com/52w2JA6.jpg" },
                    { title: "ChatGPT Introductorio", subtitle: "Ruth y Cleotilde", img: "https://i.imgur.com/R2sclGF.jpg" },
                    { title: "Preguntas Efectivas", subtitle: "Oscar Silva explorando", img: "https://i.imgur.com/ddY72Ja.jpg" },
                    { title: "IA en el Día a Día", subtitle: "Rodolfo Mantilla aplicando", img: "https://i.imgur.com/17SJs2X.jpg" },
                    { title: "Diversión con IA", subtitle: "Momentos familiares", img: "https://i.imgur.com/yCQC8sO.jpg" }
                  ].map((evidence, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-square">
                        <img
                          src={evidence.img}
                          alt={evidence.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h4 className="font-semibold text-sm">{evidence.title}</h4>
                            <p className="text-xs text-gray-300">{evidence.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Momento destacado */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Momento Destacado</h3>
                    <p className="text-gray-600">
                      Mi padre Onésimo Mosquera, riéndose con los chistes de Alexa
                    </p>
                  </div>
                  
                  <blockquote className="text-center italic text-lg text-gray-700 border-l-4 border-purple-500 pl-6 bg-white rounded-r-lg p-6">
                    "Ver cómo los participantes pasaron del escepticismo inicial a la fascinación genuina demostró que no hay límites de edad para adoptar nuevas tecnologías cuando se presentan de manera accesible y divertida."
                  </blockquote>
                </div>
              </div>

              {/* Marco teórico y transformación social */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    📊 Transformación Social y Marco Teórico
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Aplicación de la Teoría del Cambio e Innovación Social
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Resultados cuantitativos */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">📈</span>
                      Resultados Cuantitativos
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Participantes beneficiados</span>
                        <span className="font-bold text-2xl text-blue-600">15+</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Horas de formación</span>
                        <span className="font-bold text-2xl text-green-600">6</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Competencias desarrolladas</span>
                        <span className="font-bold text-2xl text-purple-600">2</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Tasa de completación</span>
                        <span className="font-bold text-2xl text-orange-600">100%</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Evidencias documentadas</span>
                        <span className="font-bold text-2xl text-red-600">12</span>
                      </div>
                    </div>
                  </div>

                  {/* Impacto cualitativo */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">🌱</span>
                      Impacto Cualitativo
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700">Mayor confianza en el uso de tecnología</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700">Reducción del miedo a lo desconocido</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700">Fortalecimiento de vínculos intergeneracionales</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700">Desarrollo de pensamiento crítico digital</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700">Empoderamiento para búsqueda autónoma</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agradecimientos */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    ❤️ Agradecimientos Especiales
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Reconocimiento a nuestros participantes excepcionales
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Aracely Rodríguez", achievement: "Mi madre, pionera en adoptar tecnología desde Medellín", icon: "👩‍💻", location: "Medellín" },
                    { name: "Onésimo Mosquera", achievement: "Mi padre, superando barreras digitales con determinación", icon: "👨‍💻", location: "Medellín" },
                    { name: "Ruth Rodríguez", achievement: "Mi hermana desde Santander, conectando familias", icon: "👩‍💼", location: "Santander" },
                    { name: "Cleotilde Rodríguez", achievement: "Mi hermana, aprendiendo sin límites de distancia", icon: "👩‍🎓", location: "Santander" },
                    { name: "Oscar Silva", achievement: "Mi amigo en Bogotá, entusiasta de la inteligencia artificial", icon: "👨‍🔬", location: "Bogotá" },
                    { name: "Rodolfo Mantilla", achievement: "Mi amigo bogotano, maestro en búsquedas efectivas", icon: "👨‍🏫", location: "Bogotá" }
                  ].map((participant, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
                      <div className="text-3xl mb-3">{participant.icon}</div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{participant.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{participant.achievement}</p>
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {participant.location}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🌟 Todo es Posible</h3>
                  <blockquote className="text-lg italic text-gray-700 mb-6">
                    "Su esfuerzo y dedicación para culminar el aprendizaje y la reducción de la brecha digital ha sido inspirador. Desde Medellín, Santander y Bogotá, cada participante demostró que la distancia no es barrera para aprender. Con cada grano de arena podemos erradicar la brecha digital, permitiendo una Colombia educada, informada y con habilidades digitales para conquistar el mundo."
                  </blockquote>
                  <p className="text-gray-600 mb-8">
                    - Leonardo Mosquera, Proyecto de Responsabilidad Social UNIMINUTO
                  </p>
                  
                  {/* Botón del cuestionario de cierre */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-2xl">
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                      <span className="text-3xl mr-3 animate-bounce">📋</span>
                      ¡Cuestionario de Cierre Disponible!
                    </h4>
                    <p className="text-red-100 mb-6 text-lg">
                      Evalúa tu experiencia en el proyecto de inclusión digital y ayúdanos a medir el impacto transformador
                    </p>
                    <a
                      href="https://forms.office.com/pages/responsepage.aspx?id=64W6sVOiZ0Se6NT47U3zAGrQbTQnnfNOipDaldbRG7NUMjRSQjUwMjNPSVRYR1NFNllHUUg1TzA2TC4u&route=shorturl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Completar Cuestionario de Cierre
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-red-100 text-sm mt-4">
                      ⏰ <strong>Importante:</strong> Cuestionario obligatorio para todos los participantes del proyecto
                    </p>
                  </div>
                </div>
              </div>

              {/* Referencias y contacto */}
              <div className="bg-gray-50 rounded-2xl p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Referencias */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">📚</span>
                      Referencias Principales
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Teoría del Cambio</p>
                        <p className="text-gray-600">Pacheco Duarte, J. F. & Archila Quiñones, S. (2020). Guía para construir teorías del cambio en programas y proyectos sociales.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Innovación Social</p>
                        <p className="text-gray-600">Pacheco Duarte, J. F. et al. (2022). Ruta de Innovación Social: Paso a paso para desarrollar innovaciones sociales.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Transformación Rural</p>
                        <p className="text-gray-600">Ortega Hoyos, A. J. & Marín Verhelst, K. (2019). La innovación social como herramienta para la transformación social.</p>
                      </div>
                    </div>
                  </div>

                  {/* Contacto */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">📞</span>
                      Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">👨‍💻 Autor del Proyecto</h4>
                        <p className="text-gray-700">Leonardo Mosquera Rodríguez</p>
                        <p className="text-gray-600 text-sm">Estudiante de Ingeniería de Software</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">🏫 Institución</h4>
                        <p className="text-gray-700">Universidad Uniminuto</p>
                        <p className="text-gray-600 text-sm">Práctica en Responsabilidad Social - NRC 3327</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">📧 Contacto</h4>
                        <a href="mailto:leonardo.mosquera@uniminuto.edu.co" className="text-blue-600 hover:text-blue-800 transition-colors">
                          leonardo.mosquera@uniminuto.edu.co
                        </a>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">📍 Ubicación</h4>
                        <p className="text-gray-600 text-sm">Bogotá, Colombia - Zona Engativá</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    // Si es el módulo 5, renderizar el layout especial similar al módulo 4
    if (moduloSeleccionado.id === 'modulo5') {
      return (
        <section className="min-h-screen bg-white">
          {/* Header con navegación */}
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToOverview}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al blog
                </button>
                <div className="text-sm text-gray-500 font-medium">
                  {moduloSeleccionado.secciones.length} secciones
                </div>
              </div>
            </div>
          </div>

          {/* Hero section con video principal */}
          <div className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                  <span className="text-2xl mr-2">🎓</span>
                  Módulo 5 - Informe Final
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Evaluación de la Experiencia Social
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                  La práctica de responsabilidad social y el impacto de transformación: Autoevaluación integral del proyecto de inclusión digital familiar
                </p>
              </div>

              {/* Video principal destacado */}
              <div className="max-w-5xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/eSXoY_dm7-Q"
                        title="Video de Autoevaluación: Reflexiones Finales del Proyecto"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Metadata del video */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-300">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>8-10 minutos</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Autoevaluación integral del proyecto</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Reflexión y análisis crítico</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secciones de contenido con diseño moderno */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-16">
              {/* Responsabilidad Social Universitaria */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    🎯 Responsabilidad Social y Transformación
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Análisis reflexivo sobre la responsabilidad social universitaria y su impacto en la transformación territorial
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">🌍 Transformación de Territorios</h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                          <span>Conexión entre Medellín, Santander y Bogotá</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                          <span>Reducción de distancias geográficas mediante tecnología</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                          <span>Fortalecimiento de vínculos familiares intergeneracionales</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                          <span>Democratización del acceso al conocimiento digital</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">🤝 Interdependencia de Actores</h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                          <span>Universidad: Marco académico y metodología</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                          <span>Estudiante-investigador: Mediador y agente de cambio</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                          <span>Familias: Saberes previos y necesidades reales</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                          <span>Comunidades: Contextualización y pertinencia</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teoría del Cambio */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    📊 Evaluación de la Teoría del Cambio
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Análisis integral de la metodología aplicada y resultados obtenidos
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Insumos */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-xl mr-2">📥</span>
                      Insumos
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• 45 horas de trabajo académico</div>
                      <div>• Dispositivos tecnológicos</div>
                      <div>• Plataformas digitales</div>
                      <div>• Material educativo adaptado</div>
                      <div>• Conectividad de calidad</div>
                    </div>
                  </div>

                  {/* Productos */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-xl mr-2">📦</span>
                      Productos
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• 15+ personas capacitadas</div>
                      <div>• 12 evidencias documentadas</div>
                      <div>• 1 video testimonial</div>
                      <div>• 2 cuestionarios evaluativos</div>
                      <div>• 1 blog educativo completo</div>
                    </div>
                  </div>

                  {/* Impacto */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-xl mr-2">🎯</span>
                      Impacto
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• 100% tasa de retención</div>
                      <div>• Autonomía digital desarrollada</div>
                      <div>• Vínculos familiares fortalecidos</div>
                      <div>• Agentes multiplicadores formados</div>
                      <div>• Cohesión social mejorada</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Innovación Social */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    🚀 Innovación Social Implementada
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Democratización tecnológica familiar y valor social generado
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">💎 Valor Social Generado</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-purple-800 mb-4">🔧 Acciones Técnicas con Impacto Social</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Capacitación en buscadores → Acceso autónomo a información</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Enseñanza de IA básica → Familiarización con tecnologías futuras</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Creación de correos → Comunicación digital efectiva</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Manejo de procesadores → Documentación y expresión</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-800 mb-4">🌱 Tratamiento Integral de Brecha Digital</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Componente cognitivo: Desarrollo de competencias</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Componente emocional: Reducción de miedos tecnológicos</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Componente social: Fortalecimiento de vínculos</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Componente cultural: Valoración intergeneracional</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proyección Futura */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    🔮 Proyección Futura
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Continuidad del compromiso con la responsabilidad social
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                    <div className="text-3xl mb-3">💼</div>
                    <h4 className="font-bold text-gray-900 mb-2">Desde mi Profesión</h4>
                    <p className="text-sm text-gray-600">Desarrollo tecnológico inclusivo y educación digital</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                    <div className="text-3xl mb-3">🏛️</div>
                    <h4 className="font-bold text-gray-900 mb-2">Actividades Cívicas</h4>
                    <p className="text-sm text-gray-600">Participación ciudadana y políticas públicas inclusivas</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                    <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                    <h4 className="font-bold text-gray-900 mb-2">Familia y Amigos</h4>
                    <p className="text-sm text-gray-600">Transformación del entorno inmediato y redes de apoyo</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                    <div className="text-3xl mb-3">🤝</div>
                    <h4 className="font-bold text-gray-900 mb-2">Compañeros de Trabajo</h4>
                    <p className="text-sm text-gray-600">Cultura organizacional inclusiva y proyectos colaborativos</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Reflexión Final</h3>
                  <blockquote className="text-lg italic text-gray-700 mb-6">
                    "La responsabilidad social no es una actividad adicional a nuestra vida profesional y personal; debe ser la esencia que guíe todas nuestras decisiones y acciones. Este proyecto ha sido solo el primer paso de un compromiso de vida con la construcción de una sociedad más justa, inclusiva y tecnológicamente equitativa."
                  </blockquote>
                  <p className="text-purple-700 font-medium">
                    — Leonardo Mosquera Rodríguez, Ingeniero de Software en formación
                  </p>
                </div>
              </div>

              {/* Referencias y contacto */}
              <div className="bg-gray-50 rounded-2xl p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Referencias */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">📚</span>
                      Referencias Principales
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Teoría del Cambio</p>
                        <p className="text-gray-600">Pacheco Duarte, J. F. & Archila Quiñones, S. (2020). Guía para construir teorías del cambio en programas y proyectos sociales.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Innovación Social</p>
                        <p className="text-gray-600">Pacheco Duarte, J. F. et al. (2022). Ruta de Innovación Social: Paso a paso para desarrollar innovaciones sociales.</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Medición de Impacto</p>
                        <p className="text-gray-600">Pérez Carvajal, M. R. et al. (2022). Medición de impacto. Proyectos sociales de formación en la práctica de responsabilidad social.</p>
                      </div>
                    </div>
                  </div>

                  {/* Contacto */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">📞</span>
                      Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">👨‍💻 Autor del Proyecto</h4>
                        <p className="text-gray-700">Leonardo Mosquera Rodríguez</p>
                        <p className="text-gray-600 text-sm">Estudiante de Ingeniería de Software</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">🏫 Institución</h4>
                        <p className="text-gray-700">Universidad Uniminuto</p>
                        <p className="text-gray-600 text-sm">Práctica en Responsabilidad Social - NRC 3327</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">📧 Contacto</h4>
                        <a href="mailto:leonardo.mosquera@uniminuto.edu.co" className="text-purple-600 hover:text-purple-800 transition-colors">
                          leonardo.mosquera@uniminuto.edu.co
                        </a>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">📍 Ubicación</h4>
                        <p className="text-gray-600 text-sm">Bogotá, Colombia - Zona Engativá</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

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
                {seccion.imagen || (seccion.tieneVideo && seccion.videoUrl) || (seccion.tieneMapa && seccion.mapaUrl) || seccion.tieneFormulario ? (
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
                        {seccion.tieneFormulario && (
                          <div className="mt-8">
                            <a
                              href={moduloSeleccionado.id === 'modulo4' ? 
                                "https://forms.office.com/pages/responsepage.aspx?id=64W6sVOiZ0Se6NT47U3zAGrQbTQnnfNOipDaldbRG7NUMjRSQjUwMjNPSVRYR1NFNllHUUg1TzA2TC4u&route=shorturl" :
                                "https://forms.office.com/pages/responsepage.aspx?id=64W6sVOiZ0Se6NT47U3zAGrQbTQnnfNOipDaldbRG7NURFVLWUxRUDVEUjI5R1cxU1BUWldJMkJGVi4u&route=shorturl"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                                moduloSeleccionado.id === 'modulo4' ?
                                'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 animate-pulse' :
                                'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                              }`}
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {moduloSeleccionado.id === 'modulo4' ? 'Completar Cuestionario Final' : 'Completar Cuestionario de Diagnóstico'}
                            </a>
                            <p className="text-sm text-gray-600 mt-2">
                              {moduloSeleccionado.id === 'modulo4' ? 
                                'Cuestionario de cierre - Semana 6 del periodo académico' :
                                'El cuestionario se abre en una nueva ventana y toma aproximadamente 5-10 minutos completarlo.'
                              }
                            </p>
                          </div>
                        )}
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
                      ) : seccion.tieneFormulario ? (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-2xl border-2 border-blue-200">
                          <div className="text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h4 className="text-xl font-bold text-blue-900 mb-2">
                              Cuestionario de Diagnóstico
                            </h4>
                            <p className="text-blue-700 text-sm">
                              Práctica en Responsabilidad Social - Inclusión Digital
                            </p>
                            <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
                              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>5-10 minutos</span>
                              </div>
                              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Obligatorio para participar</span>
                              </div>
                            </div>
                          </div>
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
