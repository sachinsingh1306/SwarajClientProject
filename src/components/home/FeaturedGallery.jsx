
import React, { useEffect, useState } from 'react';

const defaultImages = [
  {
    id: 1,
    title: 'Wedding Photography',
    category: 'Wedding',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
  },
  {
    id: 2,
    title: 'Pre Wedding Shoot',
    category: 'Pre Wedding',
    image:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800'
  },
  {
    id: 3,
    title: 'Portrait Photography',
    category: 'Portrait',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'
  },
  {
    id: 4,
    title: 'Event Photography',
    category: 'Event',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
  },
  {
    id: 5,
    title: 'Couple Photography',
    category: 'Couple',
    image:
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800'
  },
  {
    id: 6,
    title: 'Fashion Photography',
    category: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800'
  }
];

const FeaturedGallery = ({ navigate }) => {
  const [images, setImages] = useState(defaultImages);

  useEffect(() => {
    try {
      const savedImages = JSON.parse(
        localStorage.getItem('gallery') || '[]'
      );

      if (savedImages.length > 0) {
        setImages(savedImages.slice(0, 6));
      }
    } catch (error) {
      console.error('Unable to load gallery images:', error);
    }
  }, []);

  return (
    <section className="featured-gallery">

      <div className="section-heading">
        <span>OUR PORTFOLIO</span>

        <h2>Featured Photography</h2>

        <p>
          Explore some of our beautiful moments
          captured through our camera.
        </p>
      </div>

      <div className="featured-gallery-grid">

        {images.map((item) => (
          <div
            className="featured-gallery-item"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.title || item.name}
              loading="lazy"
            />

            <div className="gallery-overlay">
              <h3>
                {item.title || item.name}
              </h3>

              <p>
                {item.category || 'Photography'}
              </p>
            </div>

          </div>
        ))}

      </div>

      <div className="gallery-button-wrapper">

        <button
          onClick={() => navigate('/portfolio')}
        >
          View Full Portfolio
        </button>

      </div>

    </section>
  );
};

export default FeaturedGallery;
