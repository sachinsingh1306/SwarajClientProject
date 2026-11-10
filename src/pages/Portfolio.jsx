
import React, { useState, useCallback } from 'react';

import GalleryGrid from '../components/portfolio/GalleryGrid';
import ImageLightbox from '../components/portfolio/ImageLightbox';

const Portfolio = ({ navigate }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const handleImageClick = (image) => {
    const savedImages = JSON.parse(
      localStorage.getItem('gallery') || '[]'
    );

    setImages(savedImages.length > 0 ? savedImages : [
      {
        id: 1,
        title: 'Wedding Photography',
        category: 'Wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
      },
      {
        id: 2,
        title: 'Pre Wedding Shoot',
        category: 'Pre Wedding',
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800'
      },
      {
        id: 3,
        title: 'Portrait Photography',
        category: 'Portrait',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'
      },
      {
        id: 4,
        title: 'Event Photography',
        category: 'Event',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'
      },
      {
        id: 5,
        title: 'Couple Photography',
        category: 'Couple',
        image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800'
      },
      {
        id: 6,
        title: 'Fashion Photography',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800'
      }
    ]);

    setSelectedImage(image);
  };

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedImage((current) => {
      if (!current || images.length === 0) return current;

      const currentIndex = images.findIndex(
        (item) => item.id === current.id
      );

      const nextIndex = (currentIndex + 1) % images.length;

      return images[nextIndex];
    });
  }, [images]);

  const handlePrevious = useCallback(() => {
    setSelectedImage((current) => {
      if (!current || images.length === 0) return current;

      const currentIndex = images.findIndex(
        (item) => item.id === current.id
      );

      const previousIndex =
        (currentIndex - 1 + images.length) % images.length;

      return images[previousIndex];
    });
  }, [images]);

  return (
    <div className="portfolio-page">

      {/* Portfolio Hero */}
      <section className="portfolio-hero">

        <div className="portfolio-hero-content">

          <span>OUR CREATIVE WORK</span>

          <h1>Our Photography Portfolio</h1>

          <p>
            Explore our collection of beautiful photographs,
            creative stories and unforgettable memories.
          </p>

          <button
            onClick={() => navigate('/contact')}
          >
            Book Your Photoshoot
          </button>

        </div>

      </section>

      {/* Gallery Section */}
      <GalleryGrid
        onImageClick={handleImageClick}
      />

      {/* Image Lightbox */}
      <ImageLightbox
        images={images}
        selectedImage={selectedImage}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* Portfolio CTA */}
      <section className="portfolio-cta">

        <h2>Love Our Photography?</h2>

        <p>
          Let's create beautiful memories together.
        </p>

        <button
          onClick={() => navigate('/contact')}
        >
          Contact Us
        </button>

      </section>

    </div>
  );
};

export default Portfolio;
