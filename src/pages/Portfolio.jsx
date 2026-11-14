
import { useState } from "react";

import GalleryGrid from "../components/portfolio/GalleryGrid";
import ImageLightbox from "../components/portfolio/ImageLightbox";
import MobilePageContent from "../components/common/MobilePageContent";

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

      <MobilePageContent
        eyebrow="EXPLORE THE WORK"
        title="Look closer at the stories"
        intro="Every gallery brings together a different set of people, places, and details. Open an image to view it more closely."
        points={[
          {
            title: "Notice the small details",
            description: "Expressions, gestures, light, and setting all help tell the story behind a photograph.",
          },
          {
            title: "Find a style that speaks to you",
            description: "Save or share examples that feel close to the mood you would like for your own session.",
          },
          {
            title: "Use the images as a starting point",
            description: "Tell the studio what you like about a photograph, then discuss how that inspiration might fit your plans.",
          },
        ]}
      />

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
