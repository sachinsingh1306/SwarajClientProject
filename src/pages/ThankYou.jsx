
import React from 'react';

const ThankYou = ({ navigate }) => {
  return (
    <div className="thank-you-page">

      <div className="thank-you-card">

        {/* Success Icon */}
        <div className="success-icon">
          ✓
        </div>

        {/* Heading */}
        <h1>Thank You!</h1>

        <h2>Your Enquiry Has Been Submitted</h2>

        {/* Message */}
        <p>
          Thank you for contacting PhotoStudio.
          We have successfully received your enquiry.
        </p>

        <p>
          Our team will review your requirements
          and get back to you as soon as possible.
        </p>

        {/* Actions */}
        <div className="thank-you-actions">

          <button
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/portfolio')}
          >
            Explore Portfolio
          </button>

        </div>

      </div>

    </div>
  );
};

export default ThankYou;
