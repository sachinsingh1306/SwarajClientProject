
import React, { useEffect, useState } from 'react';

const Leads = ({ navigate }) => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin/login');
      return;
    }

    loadLeads();
  }, []);

  const loadLeads = () => {
    const savedLeads = JSON.parse(
      localStorage.getItem('leads') || '[]'
    );

    setLeads(savedLeads);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this lead?'
    );

    if (!confirmDelete) return;

    const updatedLeads = leads.filter(
      (lead) => String(lead.id) !== String(id)
    );

    localStorage.setItem(
      'leads',
      JSON.stringify(updatedLeads)
    );

    setLeads(updatedLeads);
  };

  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    return (
      lead.name?.toLowerCase().includes(searchText) ||
      lead.email?.toLowerCase().includes(searchText) ||
      lead.phone?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-leads">

      <header className="leads-header">
        <div>
          <h1>Manage Leads</h1>
          <p>View and manage customer enquiries.</p>
        </div>

        <button
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </button>
      </header>

      <div className="leads-summary">
        <h3>Total Leads: {leads.length}</h3>
      </div>

      <div className="leads-search">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">

        <table className="leads-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id}>

                  <td>{lead.id}</td>

                  <td>{lead.name}</td>

                  <td>{lead.email}</td>

                  <td>{lead.phone}</td>

                  <td>{lead.service || 'N/A'}</td>

                  <td>
                    {lead.status || 'Pending'}
                  </td>

                  <td className="lead-buttons">

                    <button
                      onClick={() =>
                        navigate(`/admin/leads/${lead.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(lead.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  No leads found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Leads;
