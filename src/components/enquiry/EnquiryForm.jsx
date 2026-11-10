
import React, { useState } from 'react';

const EnquiryForm = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email, phone, service, message } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !service || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const savedLeads = JSON.parse(
        localStorage.getItem('leads') || '[]'
      );

      const newLead = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        message: message.trim(),
        status: 'Pending',
        date: new Date().toLocaleDateString()
      };

      const updatedLeads = [...savedLeads, newLead];

      localStorage.setItem(
        'leads',
        JSON.stringify(updatedLeads)
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      if (navigate) {
        navigate('/thank-you');
      }

    } catch (err) {
      setError('Unable to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="enquiry-section">

      <div className="enquiry-container">

        <div className="enquiry-heading">
          <h2>Get In Touch</h2>

          <p>
            Tell us about your photography requirements.
            We would love to hear from you!
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="enquiry-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Select Service</label>

            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="Wedding Photography">
                Wedding Photography
              </option>
              <option value="Pre Wedding Photography">
                Pre Wedding Photography
              </option>
              <option value="Portrait Photography">
                Portrait Photography
              </option>
              <option value="Event Photography">
                Event Photography
              </option>
              <option value="Product Photography">
                Product Photography
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>

            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your requirements..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Enquiry'}
          </button>

        </form>

      </div>

    </section>
  );
};

export default EnquiryForm;
