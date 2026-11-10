
import React from 'react';

import Hero from '../components/home/Hero';
import FeaturedGallery from '../components/home/FeaturedGallery';
import Testimonials from '../components/home/Testimonials';

const Home = ({ navigate }) => {

  const services = [
    {
      id: 1,
      title: 'Wedding Photography',
      icon: '💍',
      description:
        'Capture every beautiful moment of your special wedding day.'
    },
    {
      id: 2,
      title: 'Pre Wedding Photography',
      icon: '❤️',
      description:
        'Create romantic memories with beautiful pre-wedding photoshoots.'
    },
    {
      id: 3,
      title: 'Portrait Photography',
      icon: '📸',
      description:
        'Professional portraits that showcase your personality.'
    },
    {
      id: 4,
      title: 'Event Photography',
      icon: '🎉',
      description:
        'Capture unforgettable memories from your special events.'
    }
  ];

  return (
    <div className="home-page">

      {/* Hero Section */}
      <Hero navigate={navigate} />

      {/* About Introduction */}
      <section className="home-about">

        <div className="home-about-image">

          <img
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1000"
            alt="Professional photography"
          />

        </div>

        <div className="home-about-content">

          <span>WELCOME TO PHOTOSTUDIO</span>

          <h2>
            We Capture Moments That Last Forever
          </h2>

          <p>
            Photography is more than just taking pictures.
            It is about capturing emotions, stories and
            unforgettable memories.
          </p>

          <p>
            Our team is passionate about delivering
            beautiful photographs with creativity
            and professional quality.
          </p>

          <button
            onClick={() => navigate('/about')}
          >
            Discover Our Story
          </button>

        </div>

      </section>

      {/* Services Section */}
      <section className="home-services">

        <div className="section-heading">

          <span>WHAT WE OFFER</span>

          <h2>Our Photography Services</h2>

          <p>
            Professional photography services
            for your special moments.
          </p>

        </div>

        <div className="home-services-grid">

          {services.map((service) => (

            <div
              className="home-service-card"
              key={service.id}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <button
                onClick={() => navigate('/services')}
              >
                Learn More
              </button>

            </div>

          ))}

        </div>

        <div className="home-services-button">

          <button
            onClick={() => navigate('/services')}
          >
            View All Services
          </button>

        </div>

      </section>

      {/* Featured Gallery */}
      <FeaturedGallery navigate={navigate} />

      {/* Testimonials */}
      <Testimonials />

      {/* Final Call To Action */}
      <section className="home-cta">

        <div className="home-cta-content">

          <span>LET'S CREATE MEMORIES</span>

          <h2>
            Your Story Deserves To Be Captured
          </h2>

          <p>
            Book your photography session today
            and let us capture your beautiful moments.
          </p>

          <button
            onClick={() => navigate('/contact')}
          >
            Book Your Session
          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;
