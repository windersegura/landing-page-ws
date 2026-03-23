import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="portfolio-app">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="portfolio-footer">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
