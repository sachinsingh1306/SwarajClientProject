
import { useApp } from "../context/AppContext";
import EnquiryForm from "../components/enquiry/EnquiryForm";

function Contact({ navigate }) {
  const { settings } = useApp();

  const phoneLink = `tel:${settings.phone.replace(/\s/g, "")}`;
  const emailLink = `mailto:${settings.email}`;

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-subtitle">
            GET IN TOUCH
          </span>

          <h1>Contact Us</h1>

          <p>
            Let's discuss your photography requirements.
          </p>
        </div>
      </section>

      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-grid">

            {/* Contact Information */}
            <div className="contact-information">
              <span className="section-subtitle">
                CONTACT INFORMATION
              </span>

              <h2>Let's Create Something Beautiful</h2>

              <p>
                Contact {settings.ownerName} for bookings,
                enquiries and photography services.
              </p>

              <div className="contact-info-item">
                <h3>Email</h3>

                <a href={emailLink}>
                  {settings.email}
                </a>
              </div>

              <div className="contact-info-item">
                <h3>Phone</h3>

                <a href={phoneLink}>
                  {settings.phone}
                </a>
              </div>

              <div className="contact-info-item">
                <h3>Address</h3>

                <p>{settings.address}</p>

                <a
                  href={settings.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Location on Google Maps
                </a>
              </div>

              {settings.whatsapp && (
                <a
                  className="btn btn-primary"
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact on WhatsApp
                </a>
              )}
            </div>

            {/* Enquiry Form */}
            <div className="contact-form">
              <EnquiryForm navigate={navigate} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
