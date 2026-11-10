
import React from 'react';

const Dashboard = ({ navigate }) => {
  // Check admin login
  const isLoggedIn = localStorage.getItem('adminLoggedIn');

  if (!isLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  // Dashboard statistics
  const stats = [
    {
      title: 'Total Leads',
      value: '120',
      icon: '📩',
      color: '#3498db'
    },
    {
      title: 'Total Services',
      value: '8',
      icon: '🛠️',
      color: '#2ecc71'
    },
    {
      title: 'Gallery Images',
      value: '45',
      icon: '🖼️',
      color: '#9b59b6'
    },
    {
      title: 'Pending Enquiries',
      value: '15',
      icon: '⏳',
      color: '#e67e22'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">

      <aside className="admin-sidebar">

        <h2>Admin Panel</h2>

        <nav>
          <button onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </button>

          <button onClick={() => navigate('/admin/leads')}>
            Manage Leads
          </button>

          <button onClick={() => navigate('/admin/gallery')}>
            Manage Gallery
          </button>

          <button onClick={() => navigate('/admin/services')}>
            Manage Services
          </button>
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="dashboard-content">

        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your admin dashboard.</p>
          </div>

          <button onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-stats">

          {stats.map((stat, index) => (
            <div
              className="stat-card"
              key={index}
              style={{ borderLeft: `5px solid ${stat.color}` }}
            >
              <div className="stat-icon">
                {stat.icon}
              </div>

              <div>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}

        </section>

        <section className="dashboard-actions">

          <h2>Quick Actions</h2>

          <div className="action-grid">

            <button
              onClick={() => navigate('/admin/leads')}
            >
              📩 View Leads
            </button>

            <button
              onClick={() => navigate('/admin/gallery')}
            >
              🖼️ Manage Gallery
            </button>

            <button
              onClick={() => navigate('/admin/services')}
            >
              🛠️ Manage Services
            </button>

            <button
              onClick={() => navigate('/')}
            >
              🌐 Visit Website
            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Dashboard;
