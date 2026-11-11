
import { useApp } from "../../context/AppContext";

function FeaturedGallery({ navigate }) {
  const { gallery } = useApp();

  const featuredImages = gallery.slice(0, 6);

  return (
    <section className="featured-gallery section-padding">
      <div className="container">
        <div className="section-heading">
          <span className="section-subtitle">
            OUR RECENT WORK
          </span>

          <h2>Featured Photography</h2>

          <p>
            A collection of moments captured by
            Swaraj Gupta Photography.
          </p>
        </div>

        {featuredImages.length === 0 ? (
          <div className="empty-state">
            <h3>Gallery Coming Soon</h3>

            <p>
              Our latest photography will appear here.
            </p>
          </div>
        ) : (
          <div className="featured-gallery-grid">
            {featuredImages.map((item) => (
              <div
                className="featured-gallery-item"
                key={item.id}
                onClick={() =>
                  navigate(
                    `/portfolio/detail?id=${encodeURIComponent(item.id)}`
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();

                    navigate(
                      `/portfolio/detail?id=${encodeURIComponent(item.id)}`
                    );
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={item.title || "Photography"}
                  loading="lazy"
                />

                <div className="gallery-item-overlay">
                  <h3>{item.title}</h3>
                  <span>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="section-action">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/portfolio")}
          >
            View Full Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedGallery;
