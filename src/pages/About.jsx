
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

          <div className="about-hero-actions">
            <a className="btn btn-outline" href="#photographer-story">
              Meet the Photographer
            </a>
            <a className="btn btn-primary" href="#session-experience">
              What to Expect
            </a>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section id="photographer-story" className="about-section section-padding">
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
              At {settings.siteName}, photography is about more than a finished image. It is about helping you feel present, comfortable, and understood while your story unfolds.
            </p>

            <p>
              You do not need to arrive knowing how to pose. Share what matters to you, bring your questions, and let us shape a session around the people and moments you want to remember.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/portfolio")}
            >
              See the Portfolio
            </button>
          </div>

        </div>
      </section>

      {/* Client experience */}
      <section id="session-experience" className="session-experience section-padding">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">A CLEAR, COMFORTABLE PROCESS</span>
            <h2>What it feels like to work together</h2>
            <p>From the first conversation to the final photographs, you should know what comes next and feel welcome to share what matters most to you.</p>
          </div>

          <div className="session-steps">
            <article className="session-step">
              <span className="session-step-number">01</span>
              <h3>Tell us what you’re planning</h3>
              <p>Share the occasion, preferred date, location, and the moments you do not want to miss. If you are still figuring things out, that is a perfectly good place to start.</p>
            </article>
            <article className="session-step">
              <span className="session-step-number">02</span>
              <h3>Plan a session that fits you</h3>
              <p>Talk through the style, timing, people involved, and any questions. You can mention accessibility needs, family dynamics, or anything that would help you feel at ease.</p>
            </article>
            <article className="session-step">
              <span className="session-step-number">03</span>
              <h3>Be present in the moment</h3>
              <p>Enjoy your celebration or session. Gentle direction is there when you need it, while real connections and meaningful details stay at the heart of the photographs.</p>
            </article>
          </div>

          <p className="session-followup-note">Specific packages, availability, delivery timelines, and pricing are confirmed directly with the studio so you know what is included before booking.</p>
        </div>
      </section>

      {/* Helpful answers */}
      <section className="about-faq section-padding">
        <div className="container about-faq-grid">
          <div className="about-faq-intro">
            <span className="section-subtitle">GOOD TO KNOW</span>
            <h2>A few questions you might have</h2>
            <p>Not sure what to ask first? Here are a few helpful starting points. For details specific to your plans, get in touch with {settings.ownerName || "the studio"}.</p>
            <button className="btn btn-primary" onClick={() => navigate("/contact")}>
              Ask Us a Question
            </button>
          </div>

          <div className="about-faq-list">
            <details>
              <summary>I feel awkward in front of a camera. Is that okay?</summary>
              <p>Absolutely. You do not need to know how to pose. Tell the photographer how you are feeling, and you can talk through gentle prompts and a pace that feels comfortable.</p>
            </details>
            <details>
              <summary>Can I share ideas or important photos in advance?</summary>
              <p>Yes. Share the people, details, and moments that matter most when you enquire or discuss your plans with the studio. A short list can help everyone feel prepared.</p>
            </details>
            <details>
              <summary>How do I find out about availability and pricing?</summary>
              <p>Send your preferred date, location, and type of session through the enquiry form. The studio can then confirm availability and explain the options and costs for your plans.</p>
            </details>
            <details>
              <summary>When will my photographs be ready?</summary>
              <p>Delivery timing can depend on the session and the work involved. Ask about the expected timeline and how your finished images will be shared before confirming a booking.</p>
            </details>
            <details>
              <summary>What if I am not sure which service I need?</summary>
              <p>That is fine. Tell us what you are celebrating or hoping to capture, and the studio can help you work out which session may suit you best.</p>
            </details>
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
