export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "La Brecha Digital en Colombia: Un Análisis Profundo",
    excerpt: "Exploramos las disparidades en el acceso y uso de tecnologías entre zonas urbanas y rurales, y cómo esto afecta el desarrollo socioeconómico del país.",
    category: "Celulares",
    date: "15 Dic 2024",
    author: "María González",
    image: "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Configurando tu Primer Correo Electrónico: Guía Completa",
    excerpt: "Paso a paso para crear y configurar una cuenta de correo electrónico, desde la selección del proveedor hasta las mejores prácticas de seguridad.",
    category: "Correo",
    date: "12 Dic 2024",
    author: "Carlos Ramírez",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Microsoft Office para Principiantes: Word, Excel y PowerPoint",
    excerpt: "Introducción práctica a las herramientas básicas de oficina que pueden transformar tu productividad personal y profesional.",
    category: "Microsoft Office",
    date: "10 Dic 2024",
    author: "Ana López",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "IA para Todos: Cómo la Inteligencia Artificial Puede Mejorar tu Vida Diaria",
    excerpt: "Descubre aplicaciones prácticas de IA que están al alcance de todos, desde asistentes virtuales hasta herramientas de traducción.",
    category: "Inteligencia Artificial",
    date: "8 Dic 2024",
    author: "Diego Morales",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "Seguridad Digital: Protege tu Información Personal",
    excerpt: "Consejos esenciales para mantener segura tu información en línea, desde contraseñas fuertes hasta reconocer estafas digitales.",
    category: "Seguridad Digital",
    date: "5 Dic 2024",
    author: "Laura Silva",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    title: "Smartphones para Adultos Mayores: Guía de Inicio",
    excerpt: "Una introducción amigable al mundo de los teléfonos inteligentes, diseñada especialmente para adultos mayores que dan sus primeros pasos en la tecnología.",
    category: "Celulares",
    date: "3 Dic 2024",
    author: "Roberto Vásquez",
    image: "https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 7,
    title: "Gmail vs Outlook: ¿Cuál Elegir para tu Primer Correo?",
    excerpt: "Comparamos las principales plataformas de correo electrónico para ayudarte a tomar la mejor decisión según tus necesidades.",
    category: "Correo",
    date: "1 Dic 2024",
    author: "Patricia Herrera",
    image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 8,
    title: "Excel Básico: Organiza tu Vida con Hojas de Cálculo",
    excerpt: "Aprende a usar Excel para tareas cotidianas como control de gastos, inventarios caseros y planificación de actividades.",
    category: "Microsoft Office",
    date: "28 Nov 2024",
    author: "Miguel Torres",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 9,
    title: "ChatGPT y Asistentes IA: Tu Nuevo Compañero Digital",
    excerpt: "Conoce cómo los asistentes de inteligencia artificial pueden ayudarte en tareas diarias, desde responder preguntas hasta crear contenido.",
    category: "Inteligencia Artificial",
    date: "25 Nov 2024",
    author: "Sandra Castillo",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 10,
    title: "Phishing y Estafas Online: Cómo Identificarlas y Evitarlas",
    excerpt: "Aprende a reconocer los intentos de fraude más comunes en internet y protégete de los ciberdelincuentes.",
    category: "Seguridad Digital",
    date: "22 Nov 2024",
    author: "Fernando Ruiz",
    image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 11,
    title: "Uso Superficial vs. Uso Productivo de la Tecnología",
    excerpt: "Reflexión sobre cómo transformar nuestro consumo tecnológico de entretenimiento pasivo a herramienta de crecimiento personal y profesional.",
    category: "Celulares",
    date: "20 Nov 2024",
    author: "Carmen Jiménez",
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 12,
    title: "Creando Presentaciones Impactantes con PowerPoint",
    excerpt: "Técnicas básicas para crear presentaciones profesionales que comuniquen tus ideas de manera efectiva y atractiva.",
    category: "Microsoft Office",
    date: "18 Nov 2024",
    author: "Andrés Mendoza",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 13,
    title: "Configuración Básica de Android: Primeros Pasos",
    excerpt: "Guía completa para configurar tu primer smartphone Android, desde la configuración inicial hasta las aplicaciones esenciales.",
    category: "Celulares",
    date: "15 Nov 2024",
    author: "Luis Martínez",
    image: "https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 14,
    title: "Word para Principiantes: Creando tu Primer Documento",
    excerpt: "Aprende los fundamentos de Microsoft Word para crear documentos profesionales desde cero.",
    category: "Microsoft Office",
    date: "12 Nov 2024",
    author: "Elena Rodríguez",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 15,
    title: "Contraseñas Seguras: Tu Primera Línea de Defensa",
    excerpt: "Cómo crear y gestionar contraseñas seguras para proteger tus cuentas digitales de manera efectiva.",
    category: "Seguridad Digital",
    date: "10 Nov 2024",
    author: "Carlos Mendez",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];