
import React, { useEffect, useState } from 'react';

const LeadDetail = ({ leadId, navigate }) => {
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const savedLeads = JSON.parse(
      localStorage.getItem('leads') || '[]'
    );

    const selectedLead = savedLeads.find(
      (item) => String(item.id) === String(leadId)
    );

    setLead(selectedLead || null);
  }, [leadId]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this enquiry?'
    );

    if (!confirmDelete) return;

    const savedLeads = JSON.parse(
      localStorage.getItem('leads') || '[]'
    );

    const updatedLeads = savedLeads.filter(
      (item) => String(item.id) !== String(leadId)
    );

    localStorage.setItem(
      'leads',
      JSON.stringify(updatedLeads)
    );

    navigate('/admin/leads');
  };

  if (!localStorage.getItem('adminLoggedIn')) {
    navigate('/admin/login');
    return null;
  }

  if (!lead) {
    return (
      <div className="lead-detail">
        <h2>Lead Not Found</h2>

        <button onClick={() => navigate('/admin/leads')}>
          Back to Leads
        </button>
      </div>
    );
  }

  return (
    <div className="lead-detail">

      <div className="lead-header">
        <h1>Enquiry Details</h1>

        <button onClick={() => navigate('/admin/leads')}>
          Back to Leads
        </button>
      </div>

      <div className="lead-card">

        <h2>Customer Information</h2>

        <div className="lead-info">
          <p>
            <strong>Name:</strong> {lead.name}
          </p>

          <p>
            <strong>Email:</strong> {lead.email}
          </p>

          <p>
            <strong>Phone:</strong> {lead.phone}
          </p>

          <p>
            <strong>Service:</strong> {lead.service || 'Not specified'}
          </p>

          <p>
            <strong>Date:</strong> {lead.date || 'Not available'}
          </p>

          <p>
            <strong>Status:</strong> {lead.status || 'Pending'}
          </p>
        </div>

        <div className="lead-message">
          <h3>Customer Message</h3>

          <p>
            {lead.message || 'No message provided.'}
          </p>
        </div>

        <div className="lead-actions">

          <a href={`mailto:${lead.email}`}>
            Reply by Email
          </a>

          <a href={`tel:${lead.phone}`}>
            Call Customer
          </a>

          <button
            className="delete-button"
            onClick={handleDelete}
          >
            Delete Enquiry
          </button>

        </div>

      </div>

    </div>
  );
};

export default LeadDetail;