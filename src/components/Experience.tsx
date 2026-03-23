import React from 'react';

interface Job {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
}

const Experience: React.FC = () => {
  const jobs: Job[] = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      duration: '2022 - Present',
      description: 'Leading frontend development for enterprise SaaS products.',
      achievements: [
        'Reduced page load time by 40% through code optimization',
        'Implemented design system used across 15+ products',
        'Mentored junior developers and conducted technical interviews',
      ],
    },
    {
      id: 2,
      company: 'Digital Innovations LLC',
      position: 'Frontend Developer',
      duration: '2020 - 2022',
      description: 'Developed responsive web applications for clients in various industries.',
      achievements: [
        'Built 10+ client websites with React and TypeScript',
        'Created reusable component library reducing development time by 30%',
        'Collaborated with UX designers to implement pixel-perfect interfaces',
      ],
    },
  ];

  return (
    <section id="experience" className="experience-section">
      <h2>Work Experience</h2>
      <div className="timeline">
        {jobs.map((job) => (
          <div key={job.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>{job.position}</h3>
              <h4>{job.company}</h4>
              <span className="duration">{job.duration}</span>
              <p>{job.description}</p>
              <ul>
                {job.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;