
import { useApp } from "../context/AppContext";

import Hero from "../components/home/Hero";
import FeaturedGallery from "../components/home/FeaturedGallery";
import Testimonials from "../components/home/Testimonials";
import MobilePageContent from "../components/common/MobilePageContent";

function Home({ navigate }) {
  const { services, settings } = useApp();

  return (
    <div className="home-page">
      <Hero navigate={navigate} />

      {/* About Preview */}
      <section className="home-about section-padding">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">
              ABOUT US
            </span>

            <h2>Welcome to {settings.siteName}</h2>

            <p>{settings.about}</p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/about")}
            >
              Discover Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="home-services section-padding">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">
              WHAT WE DO
            </span>

            <h2>Our Photography Services</h2>

            <p>
              Professional photography for life's most
              meaningful moments.
            </p>
          </div>

          <div className="services-grid">
            {services.slice(0, 3).map((service) => (
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

          <div className="section-action">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/services")}
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      <MobilePageContent
        eyebrow="A LITTLE INSPIRATION"
        title="Make room for the moments that matter"
        intro="A thoughtful session starts with the feeling you want to remember. The details can come together one step at a time."
        points={[
          {
            title: "Start with your story",
            description: "Think about the people, places, and small details you would love to see reflected in your photographs.",
          },
          {
            title: "Bring a few references",
            description: "A favorite photograph, color palette, or simple mood description can help communicate the look you have in mind.",
          },
          {
            title: "Ask anything",
            description: "Share your questions about timing, location, or planning when you enquire. We can begin with the details you already know.",
          },
        ]}
      />

      {/* Featured Gallery */}
      <FeaturedGallery navigate={navigate} />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact CTA */}
      <section className="home-cta section-padding">
        <div className="container">
          <span className="section-subtitle">
            LET'S WORK TOGETHER
          </span>

          <h2>Ready to Capture Your Story?</h2>

          <p>
            Get in touch with {settings.ownerName || "our studio"}
            {" "}and let's create something beautiful.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/contact")}
          >
            Book Your Session
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
