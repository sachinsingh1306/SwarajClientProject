
import React from 'react';

const Hero = ({ navigate }) => {
  return (
    <section className="hero-section">

      <div className="hero-background">

        <div className="hero-overlay">

          <div className="hero-content">

            <span className="hero-subtitle">
              CAPTURING MOMENTS, CREATING MEMORIES
            </span>

            <h1>
              Every Picture Tells
              <br />
              A Beautiful Story
            </h1>

            <p>
              We capture your special moments with creativity,
              passion and perfection. Let us turn your memories
              into timeless photographs.
            </p>

            <div className="hero-buttons">

              <button
                className="hero-primary-btn"
                onClick={() => navigate('/portfolio')}
              >
                Explore Portfolio
              </button>

              <button
                className="hero-secondary-btn"
                onClick={() => navigate('/contact')}
              >
                Book a Session
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
