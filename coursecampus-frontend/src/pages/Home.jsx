import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const highlights = [
  {
    title: "Learn your way",
    copy: "Find courses that fit your pace, goals, and interests.",
  },
  {
    title: "Simple access",
    copy: "Sign in once and continue smoothly from your own space.",
  },
  {
    title: "Clear experience",
    copy: "The interface stays focused on courses and your learning journey.",
  },
];

const benefits = [
  {
    title: "Explore courses",
    copy: "Browse available learning spaces and discover new topics.",
  },
  {
    title: "Follow progress",
    copy: "Keep your courses in one place and return anytime.",
  },
  {
    title: "Personal account",
    copy: "Manage your profile and move through the app smoothly.",
  },
  {
    title: "Light and dark mode",
    copy: "Switch themes whenever you want from the navbar.",
  },
];

export default function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (!token || role === "instructor") return;

      try {
        setLoadingSuggestions(true);
        const [enrollmentsResponse, coursesResponse] = await Promise.all([
          api.get("/enrollments/my/"),
          api.get("/courses/"),
        ]);

        const enrolledIds = new Set(
          enrollmentsResponse.data.map((enrollment) => enrollment.course),
        );

        const recommendations = coursesResponse.data
          .filter((course) => !enrolledIds.has(course.id))
          .slice(0, 3);

        setSuggestedCourses(recommendations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    loadSuggestions();
  }, [role, token]);

  return (
    <section className="stack">
      <div className="hero-grid">
        <div className="surface-card">
          <span className="hero-badge">CourseCampus</span>
          <h1 className="page-title">A learning space made for real users.</h1>
          <p className="page-copy">
            Discover courses, continue your learning, and enjoy a cleaner experience designed
            around people learning and growing online.
          </p>

          <div className="hero-actions">
            {!token && (
              <>
                <Link to="/login" className="primary-button">
                  Login
                </Link>
                <Link to="/register" className="primary-button">
                  Create account
                </Link>
              </>
            )}
            <Link to="/courses" className="secondary-button">
              View courses
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">Easy</div>
              <div className="stat-label">Navigation</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Smart</div>
              <div className="stat-label">Theme switch</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">User</div>
              <div className="stat-label">Focused design</div>
            </div>
          </div>
        </div>

        <div className="surface-card glass">
          {token && role !== "instructor" ? (
            <>
              <div className="eyebrow-text">Suggestions for you</div>
              <h2 className="section-title">Courses you may want to join</h2>
              {loadingSuggestions ? (
                <div className="dashboard-empty">Loading suggestions...</div>
              ) : suggestedCourses.length > 0 ? (
                <div className="dashboard-course-list">
                  {suggestedCourses.map((course) => (
                    <article key={course.id} className="dashboard-course-card">
                      <div className="dashboard-course-top">
                        <h3 className="feature-title">{course.title}</h3>
                        {course.category && (
                          <span className="dashboard-badge">{course.category}</span>
                        )}
                      </div>
                      <p className="feature-copy">{course.description}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty">
                  No suggestions right now. Check back later for more courses.
                </div>
              )}
            </>
          ) : (
            <>
              <div className="eyebrow-text">Why use CourseCampus</div>
              <h2 className="section-title">Everything important stays easy to reach</h2>
              <ul className="list-clean">
                <li>Open the menu to move quickly between the main pages.</li>
                <li>Switch between light and dark mode whenever you want.</li>
                <li>Use the logo to jump back home in one click.</li>
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="surface-card">
        <div className="eyebrow-text">Highlights</div>
        <h2 className="section-title">A smoother experience for everyday use</h2>
        <div className="feature-grid">
          {highlights.map((item) => (
            <article key={item.title} className="feature-card">
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="surface-card">
        <div className="eyebrow-text">Benefits</div>
        <h2 className="section-title">Built around the user experience</h2>
        <div className="info-grid">
          {benefits.map((item) => (
            <article key={item.title} className="info-card">
              <h3 className="info-title">{item.title}</h3>
              <p className="info-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
