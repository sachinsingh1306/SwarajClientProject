
import React, { useState } from 'react';

const AdminLogin = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);

    // Demo authentication
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin@123';

    if (
      email === adminEmail &&
      password === adminPassword
    ) {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password.');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-card">

        <h2>Admin Login</h2>

        <p>Welcome back! Please login to continue.</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
        >
          Back to Website
        </button>

      </div>
    </div>
  );
};

export default AdminLogin;
