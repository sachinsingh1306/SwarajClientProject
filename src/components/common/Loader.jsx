
import React from 'react';

const Loader = ({
  message = 'Loading...',
  fullScreen = false
}) => {
  return (
    <div
      className={`loader-container ${
        fullScreen ? 'loader-fullscreen' : ''
      }`}
    >
      <div className="loader-spinner"></div>

      <p>{message}</p>
    </div>
  );
};

export default Loader;
