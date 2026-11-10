
import React from 'react';

const About = ({ navigate }) => {
  return (
    <div className="about-page">

      {/* Page Hero */}
      <section className="about-hero">

        <div className="about-hero-content">
          <span>GET TO KNOW US</span>

          <h1>About Our Studio</h1>

          <p>
            We believe every moment has a story worth capturing.
          </p>
        </div>

      </section>

      {/* About Introduction */}
      <section className="about-intro">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1000"
            alt="Professional photographer working"
          />
        </div>

        <div className="about-content">

          <span>OUR STORY</span>

          <h2>Capturing Moments That Last Forever</h2>

          <p>
            Welcome to PhotoStudio, where creativity meets
            photography. We are passionate about capturing
            beautiful moments and transforming them into
            unforgettable memories.
          </p>

          <p>
            From weddings and pre-wedding shoots to portraits
            and special events, we focus on delivering
            professional photography with creativity and care.
          </p>

          <button
            onClick={() => navigate('/contact')}
          >
            Work With Us
          </button>

        </div>

      </section>

      {/* Mission and Vision */}
      <section className="about-mission">

        <div className="mission-card">

          <div className="mission-icon">🎯</div>

          <h2>Our Mission</h2>

          <p>
            Our mission is to capture meaningful moments
            through creative photography and provide
            exceptional experiences to every client.
          </p>

        </div>

        <div className="mission-card">

          <div className="mission-icon">👁️</div>

          <h2>Our Vision</h2>

          <p>
            Our vision is to become a trusted photography
            studio known for creativity, quality and
            beautiful storytelling.
          </p>

        </div>

        <div className="mission-card">

          <div className="mission-icon">❤️</div>

          <h2>Our Values</h2>

          <p>
            We value creativity, professionalism,
            customer satisfaction and attention to detail
            in every photograph we capture.
          </p>

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">

        <div className="section-heading">

          <span>WHY CHOOSE US</span>

          <h2>What Makes Us Different?</h2>

          <p>
            We make every photography experience special.
          </p>

        </div>

        <div className="why-choose-grid">

          <div className="why-card">
            <h3>📸 Professional Quality</h3>
            <p>
              High-quality photography with attention
              to every detail.
            </p>
          </div>

          <div className="why-card">
            <h3>✨ Creative Approach</h3>
            <p>
              Unique ideas and creative storytelling
              for every photoshoot.
            </p>
          </div>

          <div className="why-card">
            <h3>🤝 Client Satisfaction</h3>
            <p>
              We understand your requirements and
              work to deliver beautiful results.
            </p>
          </div>

          <div className="why-card">
            <h3>💖 Memorable Experiences</h3>
            <p>
              We capture emotions and moments that
              you can cherish forever.
            </p>
          </div>

        </div>

      </section>

      {/* Call To Action */}
      <section className="about-cta">

        <h2>Let's Capture Your Beautiful Moments</h2>

        <p>
          Contact us today and let's create something special.
        </p>

        <button
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </button>

      </section>

    </div>
  );
};

export default About;
