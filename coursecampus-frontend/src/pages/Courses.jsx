import { useEffect, useState } from "react";
import api from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await api.get("/courses/");
        setCourses(response.data);
      } catch (requestError) {
        console.error(requestError);
        setError("We could not load the available courses right now.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Courses</div>
        <h1 className="page-title">Available courses</h1>
        <p className="page-copy">
          Browse what is currently available and choose the course that fits you best.
        </p>
      </div>

      <div className="surface-card">
        {loading ? (
          <div className="dashboard-empty">Loading courses...</div>
        ) : error ? (
          <div className="dashboard-empty">{error}</div>
        ) : courses.length > 0 ? (
          <div className="dashboard-course-list">
            {courses.map((course) => (
              <article key={course.id} className="dashboard-course-card">
                <div className="dashboard-course-top">
                  <h2 className="feature-title">{course.title}</h2>
                  {course.category && <span className="dashboard-badge">{course.category}</span>}
                </div>
                <p className="feature-copy">{course.description}</p>
                {course.instructor?.name && (
                  <div className="dashboard-meta">Instructor: {course.instructor.name}</div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="dashboard-empty">No courses are available yet.</div>
        )}
      </div>
    </section>
  );
}
