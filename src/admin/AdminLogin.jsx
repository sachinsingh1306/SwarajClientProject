
import { useState } from "react";

function AdminLogin({ navigate }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123";

    if (
      formData.email === adminEmail &&
      formData.password === adminPassword
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <p>Swaraj Gupta Photography</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>

        <button
          className="back-home-button"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>

        <p className="login-notice">
          Demo frontend login. Do not use real or sensitive
          credentials here.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
