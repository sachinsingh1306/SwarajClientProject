
import { useRef, useState } from "react";
import { useApp } from "../context/AppContext";

const MAX_FILE_SIZE = 1.5 * 1024 * 1024;

function ManageGallery({ navigate }) {
  const {
    gallery,
    addGalleryImage,
    deleteGalleryImage,
  } = useApp();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Wedding",
  });

  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError("");
    setPreview("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image must be smaller than 1.5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.onerror = () => {
      setError("Unable to read this image.");
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Wedding",
    });

    setPreview("");
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!preview) {
      setError("Please upload an image.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter an image title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      addGalleryImage({
        title: formData.title.trim(),
        category: formData.category,
        image: preview,
      });

      resetForm();
    } catch (err) {
      setError(
        "Unable to save image. Browser storage may be full."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (confirmed) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Manage Gallery</h1>
          <p>Upload and manage portfolio photographs.</p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Upload Form */}
      <section className="admin-card">
        <h2>Upload New Photograph</h2>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="gallery-title">
              Image Title *
            </label>

            <input
              id="gallery-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter image title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gallery-category">
              Category *
            </label>

            <select
              id="gallery-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Wedding">Wedding</option>
              <option value="Portrait">Portrait</option>
              <option value="Event">Event</option>
              <option value="Fashion">Fashion</option>
              <option value="Nature">Nature</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gallery-image">
              Select Photograph *
            </label>

            <input
              ref={fileInputRef}
              id="gallery-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
          </div>

          {preview && (
            <div className="gallery-upload-preview">
              <img
                src={preview}
                alt="Upload preview"
              />
            </div>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Upload Image"}
          </button>
        </form>
      </section>

      {/* Gallery List */}
      <section className="admin-card">
        <h2>Gallery Images ({gallery.length})</h2>

        {gallery.length === 0 ? (
          <p>No photographs uploaded yet.</p>
        ) : (
          <div className="admin-gallery-grid">
            {gallery.map((item) => (
              <article
                className="admin-gallery-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="admin-gallery-info">
                  <h3>{item.title}</h3>

                  <span>{item.category}</span>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ManageGallery;
