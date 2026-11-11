
import { useEffect } from "react";
import { useApp } from "../context/AppContext";

function Dashboard({ navigate }) {
  const {
    services,
    gallery,
    leads,
    testimonials,
    settings,
  } = useApp();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("adminLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  const stats = [
    {
      title: "Total Services",
      count: services.length,
      icon: "📸",
      path: "/admin/services",
    },
    {
      title: "Gallery Images",
      count: gallery.length,
      icon: "🖼️",
      path: "/admin/gallery",
    },
    {
      title: "Total Enquiries",
      count: leads.length,
      icon: "📩",
      path: "/admin/leads",
    },
    {
      title: "Testimonials",
      count: testimonials.length,
      icon: "⭐",
      path: "/admin/testimonials",
    },
  ];

  const recentLeads = leads.slice(0, 5);

  if (localStorage.getItem("adminLoggedIn") !== "true") {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome to {settings.siteName}</p>
        </div>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Statistics */}
      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <button
            type="button"
            className="admin-stat-card"
            key={stat.title}
            onClick={() => navigate(stat.path)}
          >
            <span className="admin-stat-icon">
              {stat.icon}
            </span>

            <div>
              <h3>{stat.count}</h3>
              <p>{stat.title}</p>
            </div>
          </button>
        ))}
      </section>

      {/* Management Navigation */}
      <section className="admin-card">
        <h2>Manage Website</h2>

        <div className="admin-quick-links">
          <button
            onClick={() => navigate("/admin/services")}
          >
            Manage Services
          </button>

          <button
            onClick={() => navigate("/admin/gallery")}
          >
            Manage Gallery
          </button>

          <button
            onClick={() => navigate("/admin/leads")}
          >
            View Enquiries
          </button>

          <button
            onClick={() => navigate("/admin/settings")}
          >
            Website Settings
          </button>
        </div>
      </section>

      {/* Recent Leads */}
      <section className="admin-card">
        <div className="admin-section-heading">
          <h2>Recent Enquiries</h2>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/admin/leads")}
          >
            View All
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <p>No enquiries received yet.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() =>
                      navigate(`/admin/leads/${lead.id}`)
                    }
                  >
                    <td>{lead.name}</td>
                    <td>{lead.service}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.status || "New"}</td>
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

export default Dashboard;
