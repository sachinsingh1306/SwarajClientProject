
import React, { useEffect, useState } from 'react';

const PortfolioDetail = ({ navigate }) => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const selectedId = new URLSearchParams(
      window.location.search
    ).get('id');

    const savedImages = JSON.parse(
      localStorage.getItem('gallery') || '[]'
    );

    const selectedImage = savedImages.find(
      (item) => String(item.id) === String(selectedId)
    );

    if (selectedImage) {
      setPortfolio(selectedImage);
    }
  }, []);

  if (!portfolio) {
    return (
      <div className="portfolio-detail-empty">
        <h2>Portfolio Item Not Found</h2>

        <p>
          The photography project you are looking for
          is unavailable.
        </p>

        <button onClick={() => navigate('/portfolio')}>
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="portfolio-detail-page">

      {/* Project Hero */}
      <section className="portfolio-detail-hero">

        <img
          src={portfolio.image}
          alt={portfolio.title || portfolio.name}
        />

        <div className="portfolio-detail-overlay">

          <span>
            {portfolio.category || 'Photography'}
          </span>

          <h1>
            {portfolio.title || portfolio.name}
          </h1>

        </div>

      </section>

      {/* Project Information */}
      <section className="portfolio-detail-content">

        <div className="portfolio-detail-info">

          <span>OUR CREATIVE WORK</span>

          <h2>
            {portfolio.title || portfolio.name}
          </h2>

          <p>
            Explore this beautiful photography project
            captured with creativity, passion and attention
            to every detail.
          </p>

          <div className="portfolio-meta">

            <p>
              <strong>Category:</strong>{' '}
              {portfolio.category || 'Photography'}
            </p>

            <p>
              <strong>Project:</strong>{' '}
              {portfolio.name || portfolio.title}
            </p>

            <p>
              <strong>Date:</strong>{' '}
              {portfolio.date || 'Not specified'}
            </p>

          </div>

          <button
            onClick={() => navigate('/contact')}
          >
            Book Similar Photography
          </button>

          <button
            className="back-button"
            onClick={() => navigate('/portfolio')}
          >
            Back to Portfolio
          </button>

        </div>

        <div className="portfolio-detail-image">

          <img
            src={portfolio.image}
            alt={portfolio.title || portfolio.name}
          />

        </div>

      </section>

    </div>
  );
};

export default PortfolioDetail;
