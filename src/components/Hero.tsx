import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1>Hi, I'm <span className="highlight">Your Name</span></h1>
        <h2>Frontend Developer & UI Designer</h2>
        <p>
          I create beautiful, responsive websites and applications with modern technologies
          like React, TypeScript, and CSS. Passionate about user experience and clean code.
        </p>
        <div className="hero-buttons">
          {/* <button className="primary-btn">View Projects</button>
          <button className="secondary-btn">Contact Me</button> */}
        </div>
      </div>
      <div className="hero-image">
        {/* Placeholder for profile image */}
        <div className="profile-placeholder"></div>
      </div>
    </section>
  );
};

export default Hero;