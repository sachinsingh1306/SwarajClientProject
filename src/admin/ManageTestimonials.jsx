
import { useState } from "react";
import { useApp } from "../context/AppContext";

const ManageTestimonials = () => {
  const {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useApp();

  const initialForm = {
    name: "",
    role: "",
    message: "",
    rating: 5,
  };

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please enter the customer name and testimonial.");
      return;
    }

    if (editingId) {
      updateTestimonial(editingId, formData);
    } else {
      addTestimonial({
        ...formData,
        id: crypto.randomUUID(),
      });
    }

    setFormData(initialForm);
    setEditingId(null);
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name || "",
      role: testimonial.role || "",
      message: testimonial.message || "",
      rating: testimonial.rating || 5,
    });

    setEditingId(testimonial.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(id);
    }
  };

  const cancelEdit = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Manage Testimonials</h1>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>

        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Customer Role</label>
          <input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Example: Wedding Client"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Testimonial</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter customer feedback"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </button>

        {editingId && (
          <button
            className="btn btn-outline"
            type="button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="admin-card" style={{ marginTop: "30px" }}>
        <h2>Customer Testimonials ({testimonials.length})</h2>

        {testimonials.length === 0 ? (
          <p>No testimonials added yet.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Rating</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>{testimonial.name}</td>
                    <td>{testimonial.role || "—"}</td>
                    <td>{"★".repeat(testimonial.rating || 5)}</td>
                    <td>{testimonial.message}</td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="btn btn-outline"
                          type="button"
                          onClick={() => handleEdit(testimonial)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handleDelete(testimonial.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTestimonials;
