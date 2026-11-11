
import { useApp } from "../context/AppContext";

function Services({ navigate }) {
  const { services, settings } = useApp();

  return (
    <div className="services-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="section-subtitle">
            WHAT WE OFFER
          </span>

          <h1>Our Photography Services</h1>

          <p>
            {settings.tagline ||
              "Professional photography for your special moments."}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="services-section section-padding">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">
              OUR EXPERTISE
            </span>

            <h2>Photography Services</h2>

            <p>
              Explore our photography services and choose the
              perfect experience for your special occasion.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="empty-state">
              <h3>Services Coming Soon</h3>

              <p>
                We are updating our photography services.
                Please check back soon.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <article
                  className="service-card"
                  key={service.id}
                >
                  <div className="service-image">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="service-content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    {service.price && (
                      <span className="service-price">
                        {service.price}
                      </span>
                    )}

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/contact?service=${encodeURIComponent(
                            service.title
                          )}`
                        )
                      }
                    >
                      Enquire Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="services-cta">
        <div className="container">
          <h2>
            Let's Capture Your Beautiful Moments
          </h2>

          <p>
            Contact {settings.ownerName || "our studio"} to
            discuss your photography requirements.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/contact")}
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}

export default Services;
