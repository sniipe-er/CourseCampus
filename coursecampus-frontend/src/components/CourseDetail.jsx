import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import api from '../api'

export const CourseDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          api.get(`/courses/${id}/`),
          api.get(`/courses/${id}/lessons/`)
        ])

        setCourse(courseRes.data)
        setLessons(lessonsRes.data)

        // Check if user is enrolled (for students)
        if (user?.role === 'student') {
          try {
            const enrollmentsRes = await api.get('/enrollments/')
            const userEnrollment = enrollmentsRes.data.find(e => e.course.id === parseInt(id))
            setEnrollment(userEnrollment)
          } catch (error) {
            // User not enrolled
          }
        }
      } catch (error) {
        console.error('Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [id, user])

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await api.post(`/enrollments/enroll/${id}/`)
      // Refresh enrollment status
      const enrollmentsRes = await api.get('/enrollments/')
      const userEnrollment = enrollmentsRes.data.find(e => e.course.id === parseInt(id))
      setEnrollment(userEnrollment)
    } catch (error) {
      console.error('Error enrolling:', error)
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading course...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Course not found</div>
      </div>
    )
  }

  const isInstructor = user?.role === 'instructor' && course.instructor.id === user.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/courses" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Courses
        </Link>
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Category: {course.category}</span>
          <span>Instructor: {course.instructor.name}</span>
        </div>
      </div>

      {user?.role === 'student' && !enrollment && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Ready to start learning?</h2>
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {enrolling ? 'Enrolling...' : 'Enroll Now'}
          </button>
        </div>
      )}

      {enrollment && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">You're enrolled!</h2>
          <p className="text-green-700">Progress: {enrollment.progress || 0}%</p>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Course Content</h2>
        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons available yet.</p>
        ) : (
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{lesson.title}</h3>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {enrollment ? (
                      <Link
                        to={`/lessons/${lesson.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Start Lesson
                      </Link>
                    ) : (
                      <span className="text-gray-400">Enroll to access</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isInstructor && (
        <div className="mt-8">
          <Link
            to={`/courses/${id}/manage`}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Manage Course
          </Link>
        </div>
      )}
    </div>
  )
}