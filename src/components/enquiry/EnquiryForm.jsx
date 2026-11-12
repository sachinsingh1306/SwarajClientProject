import { useState } from "react";
import { useApp } from "../../context/AppContext";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  eventDate: "",
  eventLocation: "",
  guestCount: "",
  contactPreference: "WhatsApp",
  message: "",
};

function EnquiryForm() {
  const { services, settings } = useApp();
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service") || "";
  const selectedService = services.some(
    (service) => service.title === requestedService
  )
    ? requestedService
    : "";

  const [formData, setFormData] = useState({
    ...emptyForm,
    service: selectedService,
  });
  const [errors, setErrors] = useState({});
  const [preparedEnquiry, setPreparedEnquiry] = useState(null);

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [name]: "",
      contact: "",
    }));
    setPreparedEnquiry(null);
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const guestCount = Number(formData.guestCount);

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (formData.contactPreference === "Email" && !formData.email.trim()) {
      newErrors.email = "Please enter an email address for an email reply.";
    } else if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please choose a service or select ‘Not sure yet’.";
    }

    if (formData.eventDate && formData.eventDate < minDate) {
      newErrors.eventDate = "Please choose today or a future date.";
    }

    if (formData.guestCount && (!Number.isInteger(guestCount) || guestCount < 1)) {
      newErrors.guestCount = "Enter a guest count of at least 1.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const ownerName = settings.ownerName || settings.siteName || "the studio";
    const messageLines = [
      `Hello ${ownerName}, I would like to enquire about a photography session.`,
      "",
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Service: ${formData.service}`,
      `Preferred reply method: ${formData.contactPreference}`,
    ];

    if (formData.email.trim()) {
      messageLines.splice(3, 0, `Email: ${formData.email.trim()}`);
    }

    if (formData.eventDate) {
      messageLines.push(`Preferred date: ${formData.eventDate}`);
    }
    if (formData.eventLocation.trim()) {
      messageLines.push(`Location: ${formData.eventLocation.trim()}`);
    }
    if (formData.guestCount) {
      messageLines.push(`Approximate guests: ${formData.guestCount}`);
    }
    if (formData.message.trim()) {
      messageLines.push("", "More about my plans:", formData.message.trim());
    }

    const message = messageLines.join("\n");
    const whatsappNumber = String(settings.whatsapp || "").replace(/\D/g, "");
    const emailAddress = String(settings.email || "").trim();
    const phoneNumber = String(settings.phone || "").replace(/[^\d+]/g, "");
    const subject = `Photography enquiry - ${formData.service}`;
    const links = [];

    if (whatsappNumber) {
      links.push({
        id: "whatsapp",
        label: "Continue in WhatsApp",
        href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      });
    }
    if (emailAddress) {
      links.push({
        id: "email",
        label: "Continue by email",
        href: `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
      });
    }
    if (phoneNumber) {
      links.push({
        id: "phone",
        label: "Call the studio",
        href: `tel:${phoneNumber}`,
      });
    }

    if (links.length === 0) {
      setErrors({
        contact: "No contact method is configured. Please contact the studio using the details shown on this page.",
      });
      return;
    }

    const preferredId = formData.contactPreference === "Phone"
      ? "phone"
      : formData.contactPreference.toLowerCase();
    links.sort((first, second) => {
      if (first.id === preferredId) return -1;
      if (second.id === preferredId) return 1;
      return 0;
    });

    setPreparedEnquiry({ message, links });
  };

  return (
    <div className="enquiry-form-wrapper">
      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        <h2>Send Us an Enquiry</h2>
        <p>Share a few details about your shoot so the studio can respond with a more useful answer.</p>

        <p className="enquiry-note">
          Frontend-only contact: your details are not stored or sent by this website. After preparing your message, choose a contact option and send it in that app.
        </p>

        <div className="enquiry-section-title">Your contact details</div>
        <div className="enquiry-fields-grid">
          <div className="form-group">
            <label htmlFor="name">Full name *</label>
            <input id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <small id="name-error" className="error-message">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number *</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="Include country code if needed" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
            {errors.phone && <small id="phone-error" className="error-message">{errors.phone}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email address {formData.contactPreference === "Email" ? "*" : <span className="field-optional">(optional)</span>}
            </label>
            <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <small id="email-error" className="error-message">{errors.email}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="contactPreference">Preferred reply method</label>
            <select id="contactPreference" name="contactPreference" value={formData.contactPreference} onChange={handleChange}>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone call</option>
            </select>
          </div>
        </div>

        <div className="enquiry-section-title">Your photography plans</div>
        <div className="enquiry-fields-grid">
          <div className="form-group">
            <label htmlFor="service">Service *</label>
            <select id="service" name="service" value={formData.service} onChange={handleChange} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
              <option value="">Choose a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.title}>{service.title}</option>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
            {errors.service && <small id="service-error" className="error-message">{errors.service}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Preferred date <span className="field-optional">(optional)</span></label>
            <input id="eventDate" name="eventDate" type="date" min={minDate} value={formData.eventDate} onChange={handleChange} aria-invalid={Boolean(errors.eventDate)} aria-describedby={errors.eventDate ? "eventDate-error" : undefined} />
            {errors.eventDate && <small id="eventDate-error" className="error-message">{errors.eventDate}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="eventLocation">Event or shoot location <span className="field-optional">(optional)</span></label>
            <input id="eventLocation" name="eventLocation" type="text" autoComplete="street-address" value={formData.eventLocation} onChange={handleChange} placeholder="City or venue" />
          </div>

          <div className="form-group">
            <label htmlFor="guestCount">Approximate guest count <span className="field-optional">(optional)</span></label>
            <input id="guestCount" name="guestCount" type="number" min="1" inputMode="numeric" value={formData.guestCount} onChange={handleChange} placeholder="For events" aria-invalid={Boolean(errors.guestCount)} aria-describedby={errors.guestCount ? "guestCount-error" : undefined} />
            {errors.guestCount && <small id="guestCount-error" className="error-message">{errors.guestCount}</small>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Anything else we should know? <span className="field-optional">(optional)</span></label>
          <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Share your ideas, schedule, or questions." />
        </div>

        {errors.contact && <p className="error-message" role="alert">{errors.contact}</p>}

        <button type="submit" className="btn btn-primary">
          Prepare My Enquiry
        </button>

        {preparedEnquiry && (
          <section className="enquiry-handoff" aria-live="polite" aria-labelledby="handoff-heading">
            <h3 id="handoff-heading">Your message is ready</h3>
            <p>This website has not sent your enquiry. Choose WhatsApp or email to review and send the message. A phone call opens your dialer and does not include these details automatically.</p>
            <div className="enquiry-handoff-actions">
              {preparedEnquiry.links.map((link, index) => (
                <a
                  key={link.id}
                  className={index === 0 ? "btn btn-primary" : "btn btn-outline"}
                  href={link.href}
                  target={link.id === "whatsapp" ? "_blank" : undefined}
                  rel={link.id === "whatsapp" ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
              <button type="button" className="btn btn-outline" onClick={() => setPreparedEnquiry(null)}>
                Edit details
              </button>
            </div>
            <details className="enquiry-message-preview">
              <summary>Review the message before sending</summary>
              <pre>{preparedEnquiry.message}</pre>
            </details>
          </section>
        )}
      </form>
    </div>
  );
}

export default EnquiryForm;