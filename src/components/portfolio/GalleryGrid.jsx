
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

const GalleryGrid = ({ onImageClick }) => {
  const [images, setImages] = useState(defaultImages);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    try {
      const savedImages = JSON.parse(
        localStorage.getItem('gallery') || '[]'
      );

      if (savedImages.length > 0) {
        const formattedImages = savedImages.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          category: item.category || 'Other',
          image: item.image
        }));

        setImages(formattedImages);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
    }
  }, []);

  const categories = [
    'All',
    ...new Set(images.map((item) => item.category))
  ];

  const filteredImages =
    activeCategory === 'All'
      ? images
      : images.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section className="gallery-grid-section">

      <div className="section-heading">

        <span>OUR WORK</span>

        <h2>Explore Our Portfolio</h2>

        <p>
          Discover our collection of beautiful photographs
          and unforgettable moments.
        </p>

      </div>

      {/* Category Filters */}
      <div className="gallery-filters">

        {categories.map((category) => (

          <button
            key={category}
            className={
              activeCategory === category ? 'active' : ''
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>

        ))}

      </div>

      {/* Gallery Images */}
      <div className="gallery-grid">

        {filteredImages.length > 0 ? (

          filteredImages.map((item) => (

            <div
              className="gallery-grid-item"
              key={item.id}
              onClick={() => onImageClick?.(item)}
              role={onImageClick ? 'button' : undefined}
              tabIndex={onImageClick ? 0 : undefined}
              onKeyDown={(e) => {
                if (
                  onImageClick &&
                  (e.key === 'Enter' || e.key === ' ')
                ) {
                  e.preventDefault();
                  onImageClick(item);
                }
              }}
            >

              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="gallery-grid-overlay">

                <h3>{item.title}</h3>

                <p>{item.category}</p>

              </div>

            </div>

          ))

        ) : (

          <p>No images found in this category.</p>

        )}

      </div>

    </section>
  );
};

export default GalleryGrid;
