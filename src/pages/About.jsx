
import { useApp } from "../context/AppContext";

function About({ navigate }) {
  const { settings } = useApp();

  return (
    <div className="about-page">

      {/* About Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-subtitle">
            OUR STORY
          </span>

          <h1>About {settings.ownerName}</h1>

          <p>{settings.tagline}</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-section section-padding">
        <div className="container about-grid">

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
              alt="Professional photography camera"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <span className="section-subtitle">
              WELCOME TO OUR STUDIO
            </span>

            <h2>{settings.siteName}</h2>

            <p>{settings.about}</p>

            <p>
              We believe every photograph should tell a story.
              Our goal is to preserve your precious memories
              through creative photography and attention to detail.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/portfolio")}
            >
              Explore Our Work
            </button>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-benefits section-padding">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">
              OUR COMMITMENT
            </span>

            <h2>Why Choose Us?</h2>

            <p>
              We focus on delivering memorable photography
              experiences.
            </p>
          </div>

          <div className="benefits-grid">
            <article className="benefit-card">
              <div className="benefit-icon">📸</div>
              <h3>Creative Photography</h3>
              <p>
                Unique perspectives and beautiful storytelling.
              </p>
            </article>

            <article className="benefit-card">
              <div className="benefit-icon">✨</div>
              <h3>Attention to Detail</h3>
              <p>
                Every important moment deserves special care.
              </p>
            </article>

            <article className="benefit-card">
              <div className="benefit-icon">❤️</div>
              <h3>Personal Experience</h3>
              <p>
                Photography that reflects your personality.
              </p>
            </article>

            <article className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Quality Results</h3>
              <p>
                Memorable photographs you'll treasure.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta section-padding">
        <div className="container">
          <h2>Let's Capture Your Story</h2>

          <p>
            Contact {settings.ownerName} to discuss
            your photography requirements.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>
      </section>

    </div>
  );
}

export default About;
