
import { useApp } from "../context/AppContext";

function LeadDetail({ navigate, leadId }) {
  const { leads, updateLead, deleteLead } = useApp();

  const lead = leads.find(
    (item) => item.id === leadId
  );

  if (!lead) {
    return (
      <div className="admin-page">
        <h2>Enquiry Not Found</h2>

        <p>This enquiry may have been deleted.</p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/leads")}
        >
          Back to Enquiries
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Delete this enquiry permanently?")) {
      deleteLead(lead.id);
      navigate("/admin/leads");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Enquiry Details</h1>
          <p>View and manage customer enquiry.</p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/leads")}
        >
          Back to Enquiries
        </button>
      </div>

      <section className="admin-card lead-detail-card">
        <h2>{lead.name}</h2>

        <div className="lead-detail-info">
          <p>
            <strong>Email:</strong> {lead.email}
          </p>

          <p>
            <strong>Phone:</strong> {lead.phone}
          </p>

          <p>
            <strong>Service:</strong> {lead.service}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {lead.createdAt
              ? new Date(lead.createdAt).toLocaleString()
              : "—"}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>{lead.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="lead-status">Enquiry Status</label>

          <select
            id="lead-status"
            value={lead.status || "New"}
            onChange={(event) =>
              updateLead(lead.id, {
                status: event.target.value,
              })
            }
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="admin-item-actions">
          <a
            className="btn btn-outline"
            href={`mailto:${lead.email}`}
          >
            Reply by Email
          </a>

          <a
            className="btn btn-outline"
            href={`tel:${lead.phone}`}
          >
            Call Customer
          </a>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete Enquiry
          </button>
        </div>
      </section>
    </div>
  );
}

export default LeadDetail;
