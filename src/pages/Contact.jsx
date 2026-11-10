
import React from 'react';

import EnquiryForm from '../components/enquiry/EnquiryForm';

const Contact = ({ navigate }) => {
  return (
    <div className="contact-page">

      {/* Contact Hero */}
      <section className="contact-hero">

        <div className="contact-hero-content">

          <span>GET IN TOUCH</span>

          <h1>Contact Us</h1>

          <p>
            Let's capture your beautiful moments together.
            Get in touch with our photography team.
          </p>

        </div>

      </section>

      {/* Contact Information */}
      <section className="contact-information">

        <div className="section-heading">

          <span>CONTACT INFORMATION</span>

          <h2>We Would Love To Hear From You</h2>

          <p>
            Have a question or planning a photoshoot?
            Contact us using the details below.
          </p>

        </div>

        <div className="contact-info-grid">

          {/* Address */}
          <div className="contact-info-card">

            <div className="contact-icon">📍</div>

            <h3>Our Location</h3>

            <p>Jaipur, Rajasthan, India</p>

          </div>

          {/* Phone */}
          <div className="contact-info-card">

            <div className="contact-icon">📞</div>

            <h3>Phone Number</h3>

            <p>+91 9876543210</p>

            <a href="tel:+919876543210">
              Call Us
            </a>

          </div>

          {/* Email */}
          <div className="contact-info-card">

            <div className="contact-icon">📧</div>

            <h3>Email Address</h3>

            <p>info@example.com</p>

            <a href="mailto:info@example.com">
              Send Email
            </a>

          </div>

        </div>

      </section>

      {/* Enquiry Form */}
      <section className="contact-form-section">

        <EnquiryForm navigate={navigate} />

      </section>

      {/* Business Hours */}
      <section className="business-hours">

        <h2>Our Working Hours</h2>

        <div className="hours-list">

          <p>
            <strong>Monday - Friday:</strong>
            <span> 9:00 AM - 7:00 PM</span>
          </p>

          <p>
            <strong>Saturday:</strong>
            <span> 10:00 AM - 6:00 PM</span>
          </p>

          <p>
            <strong>Sunday:</strong>
            <span> By Appointment</span>
          </p>

        </div>

      </section>

      {/* Contact CTA */}
      <section className="contact-cta">

        <h2>Ready To Book Your Photoshoot?</h2>

        <p>
          We are excited to be part of your special moments.
        </p>

        <button
          onClick={() => navigate('/portfolio')}
        >
          Explore Our Work
        </button>

      </section>

    </div>
  );
};

export default Contact;
