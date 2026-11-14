
import { useApp } from "../../context/AppContext";

function Hero({ navigate }) {
  const { settings } = useApp();

  return (
    <section className="luxury-hero">
      <div className="luxury-hero-overlay"></div>

      <div className="container luxury-hero-container">
        <div className="luxury-hero-copy">
          <span className="luxury-kicker">
            WELCOME TO {settings.siteName?.toUpperCase()}
          </span>

          <h1>
            <span className="luxury-bracket">[</span>
            EVERY PICTURE TELLS
            <span className="luxury-headline-break">A BEAUTIFUL STORY</span>
            <span className="luxury-bracket">]</span>
          </h1>

          <p>
            TURNING YOUR BEAUTIFUL MOMENTS INTO TIMELESS MEMORIES.
          </p>

          <div className="luxury-cta-dock">
            <button
              className="luxury-cta-card luxury-cta-card-primary"
              onClick={() => navigate("/portfolio")}
            >
              <span className="card-label">CURATED FRAMEWORK</span>
              <strong>EXPLORE PORTFOLIO</strong>
            </button>

            <button
              className="luxury-cta-card luxury-cta-card-secondary"
              onClick={() => navigate("/contact")}
            >
              <span className="card-label">BOOKING STUDIO</span>
              <strong>BOOK YOUR SESSION</strong>
            </button>
          </div>
        </div>

        <div className="luxury-showcase-wrap">
          <div className="luxury-showcase-frame">
            <div className="showcase-card showcase-card-left">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                alt="Luxury portrait preview"
              />
            </div>

            <div className="showcase-card showcase-card-main">
              <img
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80"
                alt="Featured session portrait"
              />
            </div>

            <div className="showcase-card showcase-card-right">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                alt="Wedding portrait preview"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
