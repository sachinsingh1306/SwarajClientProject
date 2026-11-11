
import { useState } from "react";
import { useApp } from "../../context/AppContext";

function EnquiryForm({ navigate }) {
  const { addLead, services, settings } = useApp();

  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: selectedService,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  
const handleSubmit = (e) => {
  e.preventDefault();

  // Save the enquiry in localStorage through AppContext
  const newLead = {
    id: crypto.randomUUID(),
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    service: formData.service,
    message: formData.message,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  addLead(newLead);

  // Client's WhatsApp number
  const clientWhatsApp = String(
    settings.whatsapp || "918840857530"
  ).replace(/\D/g, "");

  // Prepare enquiry message
  const whatsappMessage = `
Hello Swaraj Gupta Photography!

I would like to enquire about your photography services.

Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}

Message:
${formData.message}

Thank you!
  `.trim();

  // Open WhatsApp with pre-filled enquiry
  const whatsappURL =
    `https://wa.me/${clientWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");

  // Show success message or navigate to thank-you page
  navigate("/thank-you");
};


  const whatsappNumber = (settings.whatsapp || "")
    .replace(/\D/g, "");

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hello, I would like to enquire about your photography services."
      )}`
    : "";

  return (
    <div className="enquiry-form-wrapper">
      <form className="enquiry-form" onSubmit={handleSubmit}>
        <h2>Send Us an Enquiry</h2>

        <p>
          Tell us about your photography requirements.
          We'll be happy to hear from you.
        </p>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          {errors.name && (
            <small className="error-message">
              {errors.name}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {errors.email && (
            <small className="error-message">
              {errors.email}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          {errors.phone && (
            <small className="error-message">
              {errors.phone}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="service">Select Service *</label>

          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Choose a service</option>

            {services.map((service) => (
              <option
                key={service.id}
                value={service.title}
              >
                {service.title}
              </option>
            ))}
          </select>

          {errors.service && (
            <small className="error-message">
              {errors.service}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message *</label>

          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your event or requirements"
          />

          {errors.message && (
            <small className="error-message">
              {errors.message}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit Enquiry
        </button>

        {success && (
          <p className="success-message">{success}</p>
        )}
      </form>

      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          Chat with us on WhatsApp
        </a>
      )}
    </div>
  );
}

export default EnquiryForm;
