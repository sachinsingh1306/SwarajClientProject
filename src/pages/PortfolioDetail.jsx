
import { useApp } from "../context/AppContext";

function PortfolioDetail({ navigate }) {
  const { gallery } = useApp();

  const params = new URLSearchParams(window.location.search);
  const imageId = params.get("id");

  const selectedImage = gallery.find(
    (item) => item.id === imageId
  );

  if (!selectedImage) {
    return (
      <section className="portfolio-detail page-section">
        <div className="container">
          <h2>Image not found</h2>
          <p>This portfolio image may have been removed.</p>

          <button onClick={() => navigate("/portfolio")}>
            Back to Portfolio
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-detail page-section">
      <div className="container">
        <button
          className="back-button"
          onClick={() => navigate("/portfolio")}
        >
          ← Back to Portfolio
        </button>

        <div className="portfolio-detail-content">
          <img
            src={selectedImage.image}
            alt={selectedImage.title || "Portfolio"}
          />

          <div className="portfolio-detail-info">
            <span>{selectedImage.category}</span>
            <h1>{selectedImage.title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioDetail;
