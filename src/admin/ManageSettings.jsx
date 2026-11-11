
import { useState } from "react";
import { useApp } from "../context/AppContext";

function ManageSettings({ navigate }) {
  const { settings, updateSettings } = useApp();

  const [formData, setFormData] = useState({
    ...settings,
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateSettings(formData);

    setMessage("Website settings saved successfully!");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Website Settings</h1>
          <p>Manage portfolio and business information.</p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <section className="admin-card">
        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <h2>Portfolio Information</h2>

          <div className="form-group">
            <label>Portfolio Name</label>
            <input
              name="siteName"
              value={formData.siteName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Owner Name</label>
            <input
              name="ownerName"
              value={formData.ownerName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tagline</label>
            <input
              name="tagline"
              value={formData.tagline || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>About Description</label>
            <textarea
              name="about"
              rows="5"
              value={formData.about || ""}
              onChange={handleChange}
            />
          </div>

          <h2>Contact Information</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              rows="3"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Google Maps Link</label>
            <input
              type="url"
              name="mapLink"
              value={formData.mapLink || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>WhatsApp Number (international format)</label>
            <input
              name="whatsapp"
              value={formData.whatsapp || ""}
              onChange={handleChange}
              placeholder="919876543210"
            />
          </div>

          <h2>Social Media</h2>

          <div className="form-group">
            <label>Instagram URL</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Facebook URL</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook || ""}
              onChange={handleChange}
            />
          </div>

          {message && (
            <p className="success-message">{message}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Website Settings
          </button>
        </form>
      </section>
    </div>
  );
}

export default ManageSettings;
