import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'inicio' && <Hero />}
      {activeSection !== 'inicio' && activeSection !== 'onedrive' && <BlogSection activeSection={activeSection} />}
      <Footer />
    </div>
  );
}

export default App;