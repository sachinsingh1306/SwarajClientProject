
import { useApp } from "../../context/AppContext";

function Testimonials() {
  const { testimonials } = useApp();

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="section-heading">
          <span className="section-subtitle">
            CLIENT EXPERIENCES
          </span>

          <h2>What Our Clients Say</h2>

          <p>
            Real experiences from people who trusted us
            with their special moments.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="empty-state">
            <p>Client reviews will appear here soon.</p>
          </div>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article
                className="testimonial-card"
                key={item.id}
              >
                <div className="testimonial-rating">
                  {"★".repeat(
                    Math.max(0, Math.min(5, Number(item.rating) || 0))
                  )}
                </div>

                <p>"{item.message}"</p>

                <h3>{item.name}</h3>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
