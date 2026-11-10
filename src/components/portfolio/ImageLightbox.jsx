
import React, { useEffect } from 'react';

const ImageLightbox = ({
  images = [],
  selectedImage,
  onClose,
  onNext,
  onPrevious
}) => {

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }

      if (e.key === 'ArrowRight') {
        onNext?.();
      }

      if (e.key === 'ArrowLeft') {
        onPrevious?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, onClose, onNext, onPrevious]);

  if (!selectedImage) {
    return null;
  }

  const currentIndex = images.findIndex(
    (image) => image.id === selectedImage.id
  );

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
    >

      <div
        className="lightbox-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close image preview"
        >
          ✕
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            className="lightbox-previous"
            onClick={onPrevious}
            aria-label="Previous image"
          >
            &#10094;
          </button>
        )}

        {/* Selected Image */}
        <div className="lightbox-image-wrapper">

          <img
            src={selectedImage.image}
            alt={selectedImage.title || selectedImage.name || 'Portfolio image'}
            className="lightbox-image"
          />

          <div className="lightbox-caption">

            <h3>
              {selectedImage.title || selectedImage.name}
            </h3>

            <p>
              {selectedImage.category || 'Photography'}
            </p>

            <span>
              {currentIndex + 1} / {images.length}
            </span>

          </div>

        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className="lightbox-next"
            onClick={onNext}
            aria-label="Next image"
          >
            &#10095;
          </button>
        )}

      </div>

    </div>
  );
};

export default ImageLightbox;
