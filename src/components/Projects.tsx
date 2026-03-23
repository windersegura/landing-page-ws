import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description: 'A comprehensive dashboard for managing online store operations with real-time analytics.',
      technologies: ['React', 'TypeScript', 'Redux', 'Chart.js'],
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with drag-and-drop functionality and team features.',
      technologies: ['React', 'Firebase', 'Material-UI', 'Context API'],
    },
    {
      id: 3,
      title: 'Weather Forecast App',
      description: 'A responsive weather application with location-based forecasts and interactive maps.',
      technologies: ['React', 'OpenWeather API', 'CSS Modules', 'Geolocation API'],
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              {/* Placeholder for project image */}
              <div className="image-placeholder"></div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;