
import React from 'react';

const NotFound = ({ navigate }) => {
  return (
    <div className="not-found-page">

      <div className="not-found-content">

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you are looking for might have been
          removed, renamed or is temporarily unavailable.
        </p>

        <div className="not-found-actions">

          <button
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate('/contact')}
          >
            Contact Us
          </button>

        </div>

      </div>

    </div>
  );
};

export default NotFound;
