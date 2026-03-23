import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Feel free to reach out if you're looking for a developer, have a question, or just want to connect.</p>
          <div className="contact-details">
            <div className="contact-item">
              <strong>Email:</strong>
              <span>your.email@example.com</span>
            </div>
            <div className="contact-item">
              <strong>Location:</strong>
              <span>City, Country</span>
            </div>
          </div>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;