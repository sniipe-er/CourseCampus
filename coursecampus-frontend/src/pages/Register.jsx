import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/users/", form);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Register failed. Please verify the required fields.");
    }
  };

  return (
    <section className="auth-layout">
      <div className="surface-card">
        <span className="hero-badge">New account</span>
        <h1 className="page-title">Join CourseCampus and start your journey.</h1>
        <p className="page-copy">
          Create your profile, choose your role, and enjoy a platform designed around people
          learning, sharing, and exploring courses.
        </p>

        <div className="section-block mini-section">
          <div className="section-title">Why create an account</div>
          <ul className="list-clean">
            <li>Save your place and return to your courses anytime.</li>
            <li>Choose the role that matches how you want to use the platform.</li>
            <li>Enjoy a cleaner experience in light or dark mode.</li>
          </ul>
        </div>
      </div>

      <div className="surface-card auth-panel">
        <div className="eyebrow-text">Create your account</div>
        <h2 className="section-title">Register</h2>

        <div className="auth-form">
          <label className="field-group">
            <span className="field-label">Username</span>
            <input
              value={form.username}
              onChange={handleChange("username")}
              placeholder="Choose a username"
              className="field-input"
            />
          </label>

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
            <span className="field-label">Role</span>
            <select
              value={form.role}
              onChange={handleChange("role")}
              className="field-select"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </label>

          <label className="field-group">
            <span className="field-label">Password</span>
            <input
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Create a secure password"
              className="field-input"
              type="password"
            />
          </label>

          <button type="button" onClick={handleRegister} className="primary-button">
            Create account
          </button>
        </div>

        <div className="helper-row">
          <span>Already have an account?</span>
          <Link to="/login" className="inline-link">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
