import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/jwt/create/", form);
      localStorage.setItem("token", response.data.access);

      const userResponse = await api.get("/auth/users/me/");
      localStorage.setItem("role", userResponse.data.role);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="auth-layout">
      <div className="surface-card glass">
        <span className="hero-badge">Welcome back</span>
        <h1 className="page-title">Sign in and keep learning without friction.</h1>
        <p className="page-copy">
          Access your account, return to your courses, and continue with a simple and
          comfortable experience.
        </p>

        <div className="section-block mini-section">
          <div className="section-title">What you can do</div>
          <ul className="list-clean">
            <li>Open your account in a few seconds.</li>
            <li>Browse courses and continue your learning journey.</li>
            <li>Use the menu and theme switch to personalize the experience.</li>
          </ul>
        </div>
      </div>

      <div className="surface-card auth-panel">
        <div className="eyebrow-text">Welcome back</div>
        <h2 className="section-title">Login</h2>

        <div className="auth-form">
          <label className="field-group">
            <span className="field-label">Email</span>
            <input
              value={form.email}
              onChange={handleChange("email")}
              placeholder="name@example.com"
              className="field-input"
              type="email"
            />
          </label>

          <label className="field-group">
            <span className="field-label">Password</span>
            <input
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Enter your password"
              className="field-input"
              type="password"
            />
          </label>

          <button type="button" onClick={handleLogin} className="primary-button">
            Login
          </button>
        </div>

        <div className="helper-row">
          <span>Need a new account?</span>
          <Link to="/register" className="inline-link">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
