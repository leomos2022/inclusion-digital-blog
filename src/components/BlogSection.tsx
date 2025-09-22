import React, { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';

interface BlogSectionProps {
  activeSection: string;
}

const filterOptions = [
  'Todos',
  'Celulares',
  'Correo',
  'Microsoft Office',
  'Inteligencia Artificial',
  'Seguridad Digital'
];

const categories = [
  { id: 'celulares', label: 'Celulares' },
  { id: 'correo', label: 'Correo' },
  { id: 'office', label: 'Microsoft Office' },
  { id: 'ia', label: 'Inteligencia Artificial' },
  { id: 'seguridad', label: 'Seguridad Digital' },
];

const BlogSection: React.FC<BlogSectionProps> = ({ activeSection }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Map navigation sections to blog categories
  const sectionToCategoryMap: { [key: string]: string } = {
    'inicio': 'Todos',
    'celulares': 'Celulares',
    'correo': 'Correo',
    'office': 'Microsoft Office',
    'ia': 'Inteligencia Artificial',
    'seguridad': 'Seguridad Digital'
  };

  React.useEffect(() => {
    const categoryForSection = sectionToCategoryMap[activeSection];
    if (categoryForSection) {
      setActiveFilter(categoryForSection);
    }
  }, [activeSection]);

  const filteredPosts = activeFilter === 'Todos'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos de Inclusión Digital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestros contenidos especializados para cerrar la brecha digital en Colombia
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg transform -translate-y-0.5'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid (Filtered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Secciones por categoría con id para navegación */}
        {categories.map((cat) => (
          <section id={cat.id} key={cat.id} className="py-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">{cat.label}</h3>
              <p className="text-md text-gray-600 max-w-2xl mx-auto">
                {cat.label === 'Celulares' && 'Explora nuestros contenidos sobre celulares y smartphones para la inclusión digital.'}
                {cat.label === 'Correo' && 'Aprende sobre correo electrónico y mejores prácticas de comunicación digital.'}
                {cat.label === 'Microsoft Office' && 'Descubre recursos para Word, Excel y PowerPoint, y mejora tu productividad.'}
                {cat.label === 'Inteligencia Artificial' && 'Aplicaciones y recursos de IA para la vida diaria y la inclusión digital.'}
                {cat.label === 'Seguridad Digital' && 'Consejos y recursos para proteger tu información y navegar seguro.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.category === cat.label).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
            Leer más
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'Celulares': 'bg-green-100 text-green-700',
    'Correo': 'bg-blue-100 text-blue-700',
    'Microsoft Office': 'bg-purple-100 text-purple-700',
    'Inteligencia Artificial': 'bg-orange-100 text-orange-700',
    'Seguridad Digital': 'bg-red-100 text-red-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

export default BlogSection;