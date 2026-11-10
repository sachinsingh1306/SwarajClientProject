
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Wedding Client',
    rating: 5,
    message:
      'Amazing photography! They captured every beautiful moment of our wedding. The pictures were absolutely stunning.'
  },
  {
    id: 2,
    name: 'Priya Verma',
    role: 'Pre-Wedding Client',
    rating: 5,
    message:
      'We had a wonderful experience. The photographer was very professional, creative and friendly.'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    role: 'Event Client',
    rating: 5,
    message:
      'Excellent service and outstanding picture quality. Highly recommended for anyone looking for professional photography.'
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">

      <div className="section-heading">

        <span>CLIENT REVIEWS</span>

        <h2>What Our Clients Say</h2>

        <p>
          Our clients' happiness is our biggest achievement.
          Here is what they say about our work.
        </p>

      </div>

      <div className="testimonials-grid">

        {testimonials.map((item) => (

          <div
            className="testimonial-card"
            key={item.id}
          >

            <div className="testimonial-rating">
              {'★'.repeat(item.rating)}
            </div>

            <p className="testimonial-message">
              "{item.message}"
            </p>

            <div className="testimonial-author">

              <div className="testimonial-avatar">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3>{item.name}</h3>

                <span>{item.role}</span>
              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Testimonials;
