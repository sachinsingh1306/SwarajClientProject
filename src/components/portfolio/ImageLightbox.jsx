
function ImageLightbox({
  images = [],
  currentIndex = 0,
  onClose,
  onNavigate,
  onViewDetails,
}) {
  const image = images[currentIndex];

  if (!image) return null;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }

    if (event.key === "ArrowRight") {
      onNavigate(1);
    }

    if (event.key === "ArrowLeft") {
      onNavigate(-1);
    }
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        type="button"
        aria-label="Close image preview"
      >
        ×
      </button>

      <div
        className="lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.image}
          alt={image.title || "Photography"}
        />

        <div className="lightbox-info">
          <h3>{image.title}</h3>
          <p>{image.category}</p>

          <button
            className="btn btn-primary"
            onClick={onViewDetails}
            type="button"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLightbox;
