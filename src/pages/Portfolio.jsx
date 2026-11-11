
import { useState } from "react";

import GalleryGrid from "../components/portfolio/GalleryGrid";
import ImageLightbox from "../components/portfolio/ImageLightbox";

function Portfolio({ navigate }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="portfolio-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-subtitle">
            OUR CREATIVE WORK
          </span>

          <h1>Our Photography Portfolio</h1>

          <p>
            Explore beautiful moments captured by
            Swaraj Gupta Photography.
          </p>
        </div>
      </section>

      <section className="portfolio-section section-padding">
        <div className="container">
          <GalleryGrid
            onImageClick={handleImageClick}
          />
        </div>
      </section>

      {selectedImage && (
        <ImageLightbox
          images={[selectedImage]}
          currentIndex={0}
          onClose={() => setSelectedImage(null)}
          onNavigate={() => {}}
          onViewDetails={() =>
            navigate(
              `/portfolio/detail?id=${encodeURIComponent(selectedImage.id)}`
            )
          }
        />
      )}
    </div>
  );
}

export default Portfolio;
