
import { useApp } from "../../context/AppContext";

function Footer({ navigate }) {
  const { settings } = useApp();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <h2>{settings.siteName}</h2>

            <p>{settings.tagline}</p>

            <p>
              Capturing beautiful moments and preserving
              memories through photography.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>

            <button onClick={() => navigate("/")}>
              Home
            </button>

            <button onClick={() => navigate("/about")}>
              About
            </button>

            <button onClick={() => navigate("/services")}>
              Services
            </button>

            <button onClick={() => navigate("/portfolio")}>
              Portfolio
            </button>

            <button onClick={() => navigate("/contact")}>
              Contact
            </button>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3>Contact Information</h3>

            <p>
              <strong>Email:</strong>
              <br />
              <a href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            </p>

            <p>
              <strong>Phone:</strong>
              <br />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                {settings.phone}
              </a>
            </p>

            <p>
              <strong>Address:</strong>
              <br />
              {settings.address}
            </p>

            <a
              href={settings.mapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} {settings.siteName}.
            All Rights Reserved.
          </p>

          <p>
            Designed with ❤️ for beautiful memories.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
