
import { useState } from "react";
import { useApp } from "../../context/AppContext";

const Navbar = ({ navigate, pathname = window.location.pathname }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useApp();

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Contact", path: "/contact" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="luxury-navbar">
      <div className="luxury-navbar-inner">
        <button
          className="luxury-brand"
          onClick={() => handleNavigation("/")}
          aria-label="Go to homepage"
        >
          {settings?.portfolioName || "Swaraj Gupta Photography"}
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`luxury-nav ${menuOpen ? "active" : ""}`}>
          {links.map((link) => (
            <button
              key={link.path}
              className={`luxury-nav-link ${
                pathname === link.path ||
                (link.path === "/portfolio" && pathname.startsWith("/portfolio/"))
                  ? "active"
                  : ""
              }`}
              aria-current={
                pathname === link.path ||
                (link.path === "/portfolio" && pathname.startsWith("/portfolio/"))
                  ? "page"
                  : undefined
              }
              onClick={() => handleNavigation(link.path)}
            >
              {link.label}
            </button>
          ))}
          <button
            className="luxury-menu-booking"
            onClick={() => handleNavigation("/contact")}
          >
            BOOK A SESSION
          </button>
        </nav>

        <div className="luxury-nav-cta-block">
          <button
            className="luxury-nav-cta"
            onClick={() => handleNavigation("/contact")}
          >
            BOOK A SESSION
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
