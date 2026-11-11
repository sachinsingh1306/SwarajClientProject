
import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

function Leads({ navigate }) {
  const { leads, deleteLead, updateLead } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        lead.name,
        lead.email,
        lead.phone,
        lead.service,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "All" ||
        (lead.status || "New") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this enquiry?")) {
      deleteLead(id);
    }
  };

  const handleStatusChange = (id, status) => {
    updateLead(id, { status });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Manage Enquiries</h1>
          <p>Total enquiries: {leads.length}</p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Search and Filter */}
      <section className="admin-card">
        <div className="admin-filter-row">
          <input
            type="search"
            placeholder="Search by name, email, phone or service..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </section>

      {/* Enquiry Table */}
      <section className="admin-card">
        {filteredLeads.length === 0 ? (
          <div className="empty-state">
            <h3>No Enquiries Found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.service}</td>

                    <td>
                      <select
                        value={lead.status || "New"}
                        onChange={(event) =>
                          handleStatusChange(
                            lead.id,
                            event.target.value
                          )
                        }
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td>
                      {lead.createdAt
                        ? new Date(
                            lead.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <div className="admin-item-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() =>
                            navigate(
                              `/admin/leads/${lead.id}`
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(lead.id)
                          }
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
      </section>
    </div>
  );
}

export default Leads;
