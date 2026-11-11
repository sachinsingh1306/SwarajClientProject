
import { useState } from "react";
import { useApp } from "../context/AppContext";

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
