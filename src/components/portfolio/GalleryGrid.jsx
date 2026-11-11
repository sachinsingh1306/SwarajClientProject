
import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";

function GalleryGrid({ onImageClick }) {
  const { gallery } = useApp();

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        gallery
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];
  }, [gallery]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return gallery;
    }

    return gallery.filter(
      (item) => item.category === activeCategory
    );
  }, [gallery, activeCategory]);

  return (
    <div className="gallery-section">
      {/* Category Filters */}
      <div className="gallery-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "active"
                : ""
            }
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Images */}
      {filteredImages.length === 0 ? (
        <div className="empty-state">
          <h3>No Images Found</h3>
          <p>
            Images from this category will appear here.
          </p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredImages.map((item, index) => (
            <button
              className="gallery-card"
              key={item.id}
              type="button"
              onClick={() => onImageClick(item)}
              aria-label={`View ${item.title || "gallery image"}`}
            >
              <img
                src={item.image}
                alt={item.title || "Photography"}
                loading="lazy"
              />

              <div className="gallery-card-overlay">
                <h3>{item.title}</h3>
                <span>{item.category}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryGrid;
