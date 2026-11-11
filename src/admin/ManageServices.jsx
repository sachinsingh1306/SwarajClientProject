
import { useState } from "react";
import { useApp } from "../context/AppContext";

const photographyServicePresets = [
  {
    title: "Instagram Reels & Short-Form Video",
    category: "Social Media",
    description: "Creative vertical reels and short-form videos for Instagram and other social platforms, planned and filmed to showcase your brand, event, or story.",
  },
  {
    title: "Brand Photography",
    category: "Commercial",
    description: "A polished collection of portraits, workspace, products, and behind-the-scenes images that give your business a consistent visual identity.",
  },
  {
    title: "Product Photography",
    category: "Commercial",
    description: "Clean, detailed product images for websites, online stores, catalogs, and social media campaigns.",
  },
  {
    title: "Corporate Headshots",
    category: "Portrait",
    description: "Professional individual and team portraits for company websites, profiles, press kits, and professional networks.",
  },
  {
    title: "Pre-Wedding Photography",
    category: "Wedding",
    description: "Relaxed couple portraits that tell your story in a location and style that feel personal to you.",
  },
  {
    title: "Maternity & Newborn Photography",
    category: "Portrait",
    description: "Gentle, thoughtful portraits celebrating pregnancy and your family's first days together.",
  },
  {
    title: "Event Photography",
    category: "Event",
    description: "Natural coverage of conferences, celebrations, launches, and private events, with the key moments and atmosphere captured.",
  },
  {
    title: "Food & Restaurant Photography",
    category: "Commercial",
    description: "Appetizing menu, restaurant, and hospitality images for websites, delivery listings, menus, and campaigns.",
  },
];

function ManageServices({ navigate }) {
  const {
    services,
    addService,
    updateService,
    deleteService,
  } = useApp();

  const initialForm = {
    title: "",
    description: "",
    image: "",
    price: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [presetMessage, setPresetMessage] = useState("");

  const availablePresets = photographyServicePresets.filter(
    (preset) =>
      !services.some(
        (service) =>
          String(service.title || "").trim().toLowerCase() === preset.title.toLowerCase()
      )
  );

  const handleAddPreset = (preset) => {
    addService({ ...preset, image: "", price: "" });
    setPresetMessage(`${preset.title} added to your services.`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      setError("Please enter the service title and description.");
      return;
    }

    if (
      formData.image &&
      !/^https?:\/\/|^data:image\//i.test(formData.image)
    ) {
      setError("Please enter a valid image URL.");
      return;
    }

    if (editingId) {
      updateService(editingId, formData);
    } else {
      addService(formData);
    }

    setFormData(initialForm);
    setEditingId(null);
    setError("");
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title || "",
      description: service.description || "",
      image: service.image || "",
      price: service.price || "",
    });

    setEditingId(service.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (confirmed) {
      deleteService(id);

      if (editingId === id) {
        setFormData(initialForm);
        setEditingId(null);
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialForm);
    setEditingId(null);
    setError("");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Manage Services</h1>
          <p>Add, update and manage photography services.</p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Service Form */}
      <section className="admin-card">
        <h2>
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Service Title *</label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wedding Photography"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>

            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your service"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>

            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {formData.image && (
            <img
              className="admin-image-preview"
              src={formData.image}
              alt="Service preview"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}

          <div className="form-group">
            <label htmlFor="price">Price</label>

            <input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Contact for pricing"
            />
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <div className="admin-form-actions">
            <button
              className="btn btn-primary"
              type="submit"
            >
              {editingId ? "Update Service" : "Add Service"}
            </button>

            {editingId && (
              <button
                className="btn btn-outline"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Ready-to-add professional photography services */}
      <section className="admin-card">
        <h2>Popular Photography Services</h2>
        <p>Quick-add a service, then edit its details, image, or pricing above.</p>
        {presetMessage && <p className="success-message" role="status">{presetMessage}</p>}

        {availablePresets.length === 0 ? (
          <p>All suggested services are already in your list.</p>
        ) : (
          <div className="admin-quick-links">
            {availablePresets.map((preset) => (
              <button
                type="button"
                key={preset.title}
                onClick={() => handleAddPreset(preset)}
                aria-label={`Add ${preset.title}`}
              >
                + {preset.title}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Service List */}
      <section className="admin-card">
        <h2>Existing Services ({services.length})</h2>

        {services.length === 0 ? (
          <p>No services added yet.</p>
        ) : (
          <div className="admin-service-list">
            {services.map((service) => (
              <article
                className="admin-service-item"
                key={service.id}
              >
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                  />
                )}

                <div className="admin-service-info">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <span>{service.price}</span>
                </div>

                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(service.id)}
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

export default ManageServices;
