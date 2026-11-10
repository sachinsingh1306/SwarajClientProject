
import React from 'react';

const Footer = ({ navigate }) => {
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* Company Information */}
        <div className="footer-section">
          <h2>PhotoStudio</h2>

          <p>
            Capturing your beautiful moments and turning
            them into memories that last forever.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <a href="/" onClick={(e) => handleNavigation(e, '/')}>
                Home
              </a>
            </li>

            <li>
              <a href="/about" onClick={(e) => handleNavigation(e, '/about')}>
                About
              </a>
            </li>

            <li>
              <a href="/services" onClick={(e) => handleNavigation(e, '/services')}>
                Services
              </a>
            </li>

            <li>
              <a href="/portfolio" onClick={(e) => handleNavigation(e, '/portfolio')}>
                Portfolio
              </a>
            </li>

            <li>
              <a href="/contact" onClick={(e) => handleNavigation(e, '/contact')}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>📍 Jaipur, Rajasthan, India</p>

          <p>
            📧 info@example.com
          </p>

          <p>
            📞 +91 9876543210
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-links">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} PhotoStudio.
          All Rights Reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
