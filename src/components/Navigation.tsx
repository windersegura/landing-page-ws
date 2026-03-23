import React, { useState } from 'react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo">
          <h2>Portfolio</h2>
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={() => console.log('toggle menu')}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;