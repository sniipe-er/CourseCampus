import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import api from '../api'

export const Dashboard = () => {
  const { user, logout } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [myCourses, setMyCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsRes, certificatesRes] = await Promise.all([
          user.role === 'student' ? api.get('/enrollments/') : Promise.resolve({ data: [] }),
          user.role === 'student' ? api.get('/certificates/') : Promise.resolve({ data: [] }),
        ])

        if (user.role === 'student') {
          setEnrollments(enrollmentsRes.data)
          setCertificates(certificatesRes.data)
        } else {
          // For instructors, fetch their courses
          const coursesRes = await api.get('/courses/me/')
          setMyCourses(coursesRes.data)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {user.role === 'student' ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{enrollment.course.title}</h3>
                  <p className="text-gray-600 mb-4">{enrollment.course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Progress: {enrollment.progress || 0}%
                    </span>
                    <Link
                      to={`/courses/${enrollment.course.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {enrollments.length === 0 && (
              <p className="text-center text-gray-500">You haven't enrolled in any courses yet.</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">My Certificates</h2>
              <Link
                to="/certificates"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{cert.course.title}</h3>
                  <p className="text-gray-600 mb-4">Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    View Certificate
                  </button>
                </div>
              ))}
            </div>
            {certificates.length === 0 && (
              <p className="text-center text-gray-500">No certificates earned yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between">
                    <Link
                      to={`/courses/${course.id}/manage`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Manage
                    </Link>
                    <Link
                      to={`/courses/${course.id}`}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {myCourses.length === 0 && (
              <div className="text-center">
                <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
                <Link
                  to="/courses/create"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                  Create Your First Course
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}