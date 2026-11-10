
import React, { useEffect, useState } from 'react';

const ManageServices = ({ navigate }) => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin/login');
      return;
    }

    loadServices();
  }, []);

  const loadServices = () => {
    const savedServices = JSON.parse(
      localStorage.getItem('services') || '[]'
    );

    setServices(savedServices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceName.trim() || !description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    let updatedServices;

    if (editingId !== null) {
      updatedServices = services.map((service) =>
        service.id === editingId
          ? {
              ...service,
              name: serviceName,
              description,
              price
            }
          : service
      );
    } else {
      const newService = {
        id: Date.now(),
        name: serviceName,
        description,
        price
      };

      updatedServices = [...services, newService];
    }

    localStorage.setItem(
      'services',
      JSON.stringify(updatedServices)
    );

    setServices(updatedServices);
    resetForm();

    alert(
      editingId !== null
        ? 'Service updated successfully!'
        : 'Service added successfully!'
    );
  };

  const handleEdit = (service) => {
    setServiceName(service.name);
    setDescription(service.description);
    setPrice(service.price || '');
    setEditingId(service.id);

    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this service?'
    );

    if (!confirmDelete) return;

    const updatedServices = services.filter(
      (service) => service.id !== id
    );

    localStorage.setItem(
      'services',
      JSON.stringify(updatedServices)
    );

    setServices(updatedServices);

    if (editingId === id) {
      resetForm();
    }
  };

  const resetForm = () => {
    setServiceName('');
    setDescription('');
    setPrice('');
    setEditingId(null);
  };

  return (
    <div className="admin-services">

      <header className="services-header">
        <div>
          <h1>Manage Services</h1>
          <p>Add and manage photography services.</p>
        </div>

        <button
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </button>
      </header>

      <section className="service-form-section">

        <h2>
          {editingId !== null
            ? 'Edit Service'
            : 'Add New Service'}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Service Name</label>

            <input
              type="text"
              placeholder="Enter service name"
              value={serviceName}
              onChange={(e) =>
                setServiceName(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter service description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              min="0"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />
          </div>

          <button type="submit">
            {editingId !== null
              ? 'Update Service'
              : 'Add Service'}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}

        </form>

      </section>

      <section className="services-list">

        <h2>All Services ({services.length})</h2>

        {services.length === 0 ? (
          <p>No services added yet.</p>
        ) : (
          <div className="services-grid">

            {services.map((service) => (
              <div
                className="service-card"
                key={service.id}
              >

                <h3>{service.name}</h3>

                <p>{service.description}</p>

                {service.price && (
                  <p>
                    <strong>Price:</strong> ₹{service.price}
                  </p>
                )}

                <div className="service-actions">

                  <button
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default ManageServices;
