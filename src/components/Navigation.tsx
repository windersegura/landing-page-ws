import React from 'react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'about', label: 'About', sectionId: 'hero' },
    { id: 'skills', label: 'Skills', sectionId: 'skills' },
    { id: 'projects', label: 'Projects', sectionId: 'projects' },
    { id: 'contact', label: 'Contact', sectionId: 'contact' },
  ];

  const handleNavClick = (id: string, sectionId: string) => {
    setActiveSection(id);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                onClick={() => handleNavClick(item.id, item.sectionId)}
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