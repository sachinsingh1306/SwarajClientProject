
import React, { useEffect, useState } from 'react';

const defaultServices = [
  {
    id: 1,
    name: 'Wedding Photography',
    icon: '💍',
    description:
      'Capture every beautiful moment of your wedding day with professional photography.',
    price: '25000'
  },
  {
    id: 2,
    name: 'Pre Wedding Photography',
    icon: '❤️',
    description:
      'Beautiful and romantic pre-wedding photoshoots with creative concepts.',
    price: '15000'
  },
  {
    id: 3,
    name: 'Portrait Photography',
    icon: '📸',
    description:
      'Professional portraits that capture your personality and style.',
    price: '5000'
  },
  {
    id: 4,
    name: 'Event Photography',
    icon: '🎉',
    description:
      'Capture memorable moments from birthdays, parties and special events.',
    price: '10000'
  },
  {
    id: 5,
    name: 'Product Photography',
    icon: '📷',
    description:
      'High-quality product images for businesses, brands and online stores.',
    price: '7000'
  },
  {
    id: 6,
    name: 'Fashion Photography',
    icon: '✨',
    description:
      'Creative fashion photography for portfolios, brands and models.',
    price: '12000'
  }
];

const Services = ({ navigate }) => {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    try {
      const savedServices = JSON.parse(
        localStorage.getItem('services') || '[]'
      );

      if (savedServices.length > 0) {
        setServices(
          savedServices.map((service) => ({
            ...service,
            icon: service.icon || '📸'
          }))
        );
      }
    } catch (error) {
      console.error('Unable to load services:', error);
    }
  }, []);

  return (
    <div className="services-page">

      {/* Services Hero */}
      <section className="services-hero">

        <div className="services-hero-content">

          <span>WHAT WE OFFER</span>

          <h1>Our Photography Services</h1>

          <p>
            Professional photography services to capture
            your special moments and beautiful memories.
          </p>

          <button
            onClick={() => navigate('/contact')}
          >
            Book Your Session
          </button>

        </div>

      </section>

      {/* Services List */}
      <section className="services-section">

        <div className="section-heading">

          <span>OUR EXPERTISE</span>

          <h2>Explore Our Services</h2>

          <p>
            Choose the perfect photography service
            for your special occasion.
          </p>

        </div>

        <div className="services-page-grid">

          {services.map((service) => (

            <div
              className="services-page-card"
              key={service.id}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>{service.name}</h3>

              <p>{service.description}</p>

              {service.price && (
                <div className="service-price">
                  <span>Starting From</span>

                  <h4>
                    ₹{Number(service.price).toLocaleString('en-IN')}
                  </h4>
                </div>
              )}

              <button
                onClick={() => navigate('/contact')}
              >
                Book This Service
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="services-benefits">

        <div className="section-heading">

          <span>WHY CHOOSE US</span>

          <h2>Our Promise To You</h2>

        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <span>📸</span>
            <h3>Professional Quality</h3>
            <p>High-quality photographs with attention to detail.</p>
          </div>

          <div className="benefit-card">
            <span>✨</span>
            <h3>Creative Concepts</h3>
            <p>Unique photography ideas for every occasion.</p>
          </div>

          <div className="benefit-card">
            <span>🤝</span>
            <h3>Customer Satisfaction</h3>
            <p>Personalized service based on your requirements.</p>
          </div>

          <div className="benefit-card">
            <span>❤️</span>
            <h3>Beautiful Memories</h3>
            <p>Moments captured to cherish for a lifetime.</p>
          </div>

        </div>

      </section>

      {/* Final CTA */}
      <section className="services-cta">

        <h2>Ready To Capture Your Story?</h2>

        <p>
          Contact us today to discuss your photography needs.
        </p>

        <button
          onClick={() => navigate('/contact')}
        >
          Get In Touch
        </button>

      </section>

    </div>
  );
};

export default Services;
