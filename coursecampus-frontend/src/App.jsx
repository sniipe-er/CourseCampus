import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-frame">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">CourseCampus</div>
          <div className="site-footer-copy">
            Copyright © 2026 CourseCampus. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
