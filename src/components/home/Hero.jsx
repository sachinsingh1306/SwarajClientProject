
import { useApp } from "../../context/AppContext";

function Hero({ navigate }) {
  const { settings } = useApp();

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-subtitle">
            WELCOME TO {settings.siteName?.toUpperCase()}
          </span>

          <h1>
            Every Picture
            <br />
            Tells a Beautiful Story
          </h1>

          <p>
            {settings.tagline ||
              "Capturing beautiful moments and turning them into timeless memories."}
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/portfolio")}
            >
              Explore Portfolio
            </button>

            <button
              className="btn btn-outline"
              onClick={() => navigate("/contact")}
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
