
import React, { useState } from 'react';

const Navbar = ({ navigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">

      <div className="navbar-container">

        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => handleNavigation('/')}
        >
          <h2>PhotoStudio</h2>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-menu ${menuOpen ? 'active' : ''}`}>

          {navLinks.map((link) => (
            <button
              key={link.path}
              className="nav-link"
              onClick={() => handleNavigation(link.path)}
            >
              {link.name}
            </button>
          ))}

          <button
            className="navbar-contact-btn"
            onClick={() => handleNavigation('/contact')}
          >
            Book Now
          </button>

        </nav>

      </div>

    </header>
  );
};

export default Navbar;