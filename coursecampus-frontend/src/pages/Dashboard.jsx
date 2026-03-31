import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const profileResponse = await api.get("/auth/users/me/");
        setProfile(profileResponse.data);

        if (role === "instructor") {
          const instructorCoursesResponse = await api.get("/courses/me/");
          setMyCourses(instructorCoursesResponse.data);
          setSuggestedCourses([]);
          return;
        }

        const [enrollmentsResponse, coursesResponse] = await Promise.all([
          api.get("/enrollments/my/"),
          api.get("/courses/"),
        ]);

        const enrolledIds = new Set(
          enrollmentsResponse.data.map((enrollment) => enrollment.course),
        );

        const enrolledCourses = coursesResponse.data.filter((course) => enrolledIds.has(course.id));
        const recommendedCourses = coursesResponse.data.filter((course) => !enrolledIds.has(course.id));

        setMyCourses(enrolledCourses);
        setSuggestedCourses(recommendedCourses);
      } catch (requestError) {
        console.error(requestError);
        setError("We could not load your dashboard right now.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [role]);

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingId(courseId);
      await api.post(`/enrollments/enroll/${courseId}/`);

      const enrolledCourse = suggestedCourses.find((course) => course.id === courseId);
      setMyCourses((current) => (enrolledCourse ? [...current, enrolledCourse] : current));
      setSuggestedCourses((current) => current.filter((course) => course.id !== courseId));
    } catch (requestError) {
      console.error(requestError);
      alert(
        requestError.response?.data?.detail ||
          "We could not enroll you in this course right now.",
      );
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <section className="stack">
        <div className="surface-card">
          <div className="eyebrow-text">Dashboard</div>
          <h1 className="page-title">Loading your courses...</h1>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="stack">
        <div className="surface-card">
          <div className="eyebrow-text">Dashboard</div>
          <h1 className="page-title">Your dashboard could not load.</h1>
          <p className="page-copy">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Dashboard</div>
        <h1 className="page-title">
          Welcome back{profile?.name ? `, ${profile.name}` : ""}.
        </h1>
        <p className="page-copy">
          {role === "instructor"
            ? "Manage the courses you teach and keep your workspace organized."
            : "See your current courses and discover new ones you may want to join."}
        </p>
      </div>

      <div className="dashboard-grid">
        <article className="surface-card">
          <div className="dashboard-header-row">
            <div>
              <div className="eyebrow-text">
                {role === "instructor" ? "Your teaching space" : "Your courses"}
              </div>
              <h2 className="section-title">
                {role === "instructor" ? "Courses you manage" : "Courses you joined"}
              </h2>
            </div>
            <Link to="/courses" className="secondary-button dashboard-link-button">
              Open courses
            </Link>
          </div>

          <div className="dashboard-course-list">
            {myCourses.length > 0 ? (
              myCourses.map((course) => (
                <article key={course.id} className="dashboard-course-card">
                  <div className="dashboard-course-top">
                    <h3 className="feature-title">{course.title}</h3>
                    {course.category && <span className="dashboard-badge">{course.category}</span>}
                  </div>
                  <p className="feature-copy">{course.description}</p>
                  {course.instructor?.name && (
                    <div className="dashboard-meta">Instructor: {course.instructor.name}</div>
                  )}
                </article>
              ))
            ) : (
              <div className="dashboard-empty">
                {role === "instructor"
                  ? "You have not created any courses yet."
                  : "You are not enrolled in any courses yet."}
              </div>
            )}
          </div>
        </article>

        {role !== "instructor" && (
          <article className="surface-card">
            <div className="eyebrow-text">Suggestions</div>
            <h2 className="section-title">Courses you may like</h2>

            <div className="dashboard-course-list">
              {suggestedCourses.length > 0 ? (
                suggestedCourses.map((course) => (
                  <article key={course.id} className="dashboard-course-card">
                    <div className="dashboard-course-top">
                      <h3 className="feature-title">{course.title}</h3>
                      {course.category && (
                        <span className="dashboard-badge">{course.category}</span>
                      )}
                    </div>
                    <p className="feature-copy">{course.description}</p>
                    {course.instructor?.name && (
                      <div className="dashboard-meta">Instructor: {course.instructor.name}</div>
                    )}
                    <button
                      type="button"
                      className="primary-button dashboard-action"
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrollingId === course.id}
                    >
                      {enrollingId === course.id ? "Joining..." : "Apply"}
                    </button>
                  </article>
                ))
              ) : (
                <div className="dashboard-empty">
                  No new course suggestions right now. You may already be enrolled in everything
                  available.
                </div>
              )}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
