import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const emptyCourseForm = {
  title: "",
  description: "",
  category: "",
};

export default function Courses() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isInstructor = role === "instructor";
  const isStudent = role === "student";

  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [form, setForm] = useState(emptyCourseForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enrollingId, setEnrollingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setError("");

        if (isInstructor && token) {
          const response = await api.get("/courses/me/");
          setCourses(response.data);
          setSelectedCourseId(response.data[0]?.id ?? null);
          setEnrolledIds([]);
          return;
        }

        const requests = [api.get("/courses/")];

        if (isStudent && token) {
          requests.push(api.get("/enrollments/my/"));
        }

        const [coursesResponse, enrollmentsResponse] = await Promise.all(requests);
        const nextCourses = coursesResponse.data;

        setCourses(nextCourses);
        setSelectedCourseId(nextCourses[0]?.id ?? null);

        if (enrollmentsResponse) {
          setEnrolledIds(enrollmentsResponse.data.map((enrollment) => enrollment.course));
        } else {
          setEnrolledIds([]);
        }
      } catch (requestError) {
        console.error(requestError);
        setError("We could not load the courses right now.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [isInstructor, isStudent, token]);

  const selectedCourse = courses.find((course) => course.id === selectedCourseId) || null;

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.post("/courses/me/", form);
      setCourses((current) => [response.data, ...current]);
      setSelectedCourseId(response.data.id);
      setForm(emptyCourseForm);
      setSuccess("Your course was created successfully.");
    } catch (requestError) {
      console.error(requestError);
      setError(
        requestError.response?.data?.title?.[0] ||
          requestError.response?.data?.description?.[0] ||
          requestError.response?.data?.category?.[0] ||
          requestError.response?.data?.detail ||
          "We could not create the course right now.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingId(courseId);
      setError("");
      setSuccess("");
      await api.post(`/enrollments/enroll/${courseId}/`);
      setEnrolledIds((current) => [...new Set([...current, courseId])]);
      setSuccess("You are now enrolled in this course.");
    } catch (requestError) {
      console.error(requestError);
      setError(
        requestError.response?.data?.detail ||
          "We could not enroll you in this course right now.",
      );
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <section className="stack">
      <div className="surface-card">
        <div className="eyebrow-text">Courses</div>
        <h1 className="page-title">
          {isInstructor ? "Manage your teaching space" : "Discover available courses"}
        </h1>
        <p className="page-copy">
          {isInstructor
            ? "Only the courses you created appear here, and you can add a new one whenever you are ready."
            : "Select a course to read the details, then join it when it matches what you need."}
        </p>
      </div>

      {isInstructor && (
        <div className="surface-card">
          <div className="eyebrow-text">New course</div>
          <h2 className="section-title">Add a course</h2>
          <form className="auth-form" onSubmit={handleCreateCourse}>
            <div className="course-form-grid">
              <label className="field-group">
                <span className="field-label">Title</span>
                <input
                  value={form.title}
                  onChange={handleChange("title")}
                  placeholder="Course title"
                  className="field-input"
                />
              </label>

              <label className="field-group">
                <span className="field-label">Category</span>
                <input
                  value={form.category}
                  onChange={handleChange("category")}
                  placeholder="Design, programming, marketing..."
                  className="field-input"
                />
              </label>
            </div>

            <label className="field-group">
              <span className="field-label">Description</span>
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Describe what students will learn in this course."
                className="field-input field-textarea"
                rows="5"
              />
            </label>

            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? "Creating..." : "Add course"}
            </button>
          </form>
        </div>
      )}

      <div className="surface-card">
        {loading ? (
          <div className="dashboard-empty">Loading courses...</div>
        ) : error ? (
          <div className="dashboard-empty">{error}</div>
        ) : courses.length > 0 ? (
          <>
            {success && <div className="dashboard-empty course-feedback">{success}</div>}

            <div className="course-browser">
              <div className="course-select-list">
                {courses.map((course) => {
                  const isSelected = course.id === selectedCourseId;
                  const isEnrolled = enrolledIds.includes(course.id);

                  return (
                    <button
                      key={course.id}
                      type="button"
                      className={`course-select-card${isSelected ? " is-active" : ""}`}
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      <div className="dashboard-course-top">
                        <h2 className="feature-title">{course.title}</h2>
                        {course.category && <span className="dashboard-badge">{course.category}</span>}
                      </div>
                      <p className="feature-copy">{course.description}</p>
                      <div className="course-card-footer">
                        {!isInstructor && course.instructor?.name && (
                          <span className="dashboard-meta">Instructor: {course.instructor.name}</span>
                        )}
                        {isStudent && isEnrolled && (
                          <span className="dashboard-badge course-status-badge">Joined</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <article className="course-detail-panel">
                {selectedCourse ? (
                  <>
                    <div className="eyebrow-text">
                      {isInstructor ? "Selected course" : "Course details"}
                    </div>
                    <h2 className="section-title">{selectedCourse.title}</h2>
                    <p className="page-copy">{selectedCourse.description}</p>

                    <div className="info-grid course-info-grid">
                      {selectedCourse.category && (
                        <div className="info-card">
                          <div className="info-title">Category</div>
                          <div className="info-copy">{selectedCourse.category}</div>
                        </div>
                      )}

                      {!isInstructor && selectedCourse.instructor?.name && (
                        <div className="info-card">
                          <div className="info-title">Instructor</div>
                          <div className="info-copy">{selectedCourse.instructor.name}</div>
                        </div>
                      )}
                    </div>

                    <div className="course-detail-actions">
                      {isInstructor ? (
                        <div className="dashboard-empty">
                          This section shows only the courses you created.
                        </div>
                      ) : isStudent ? (
                        enrolledIds.includes(selectedCourse.id) ? (
                          <Link to="/dashboard" className="secondary-button">
                            Go to dashboard
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="primary-button"
                            onClick={() => handleEnroll(selectedCourse.id)}
                            disabled={enrollingId === selectedCourse.id}
                          >
                            {enrollingId === selectedCourse.id ? "Joining..." : "Apply to this course"}
                          </button>
                        )
                      ) : (
                        <Link to="/login" className="primary-button">
                          Login to enroll
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="dashboard-empty">Select a course to view more details.</div>
                )}
              </article>
            </div>
          </>
        ) : (
          <div className="dashboard-empty">
            {isInstructor ? "You have not created any courses yet." : "No courses are available yet."}
          </div>
        )}
      </div>
    </section>
  );
}
