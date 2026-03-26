import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaHome, FaBook, FaSignInAlt, FaUserCircle, FaBars, FaMoon, FaSun } from 'react-icons/fa'
import { useAuth } from './AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './components/Auth'
import { Dashboard } from './components/Dashboard'
import { CourseDetail } from './components/CourseDetail'
import { CourseCreate } from './components/CourseCreate'
import { Assignments } from './components/Assignments'
import { Certificates } from './components/Certificates'
import { coursesAPI } from './api'

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to CourseCampus</h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Your platform for online learning and course management.
      </p>
      <div className="text-center">
        <Link
          to="/courses"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mr-4"
        >
          Browse Courses
        </Link>
        <Link
          to="/auth"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesAPI.getCourses()
        setCourses(response.data)
      } catch (err) {
        setError('Failed to load courses')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading courses...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          My Dashboard
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>Category: {course.category}</p>
              <p>Instructor: {course.instructor?.name}</p>
            </div>
            <Link
              to={`/courses/${course.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-center block"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
      {courses.length === 0 && (
        <p className="text-center text-gray-500">No courses available yet.</p>
      )}
    </div>
  )
}

function App() {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Apply dark mode by default
    document.body.classList.add('dark-mode')
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // Toggle between dark and light mode
    document.body.classList.toggle('dark-mode', !darkMode)
  }

  return (
    <div className="app-shell min-h-screen">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="brand">
            <FaBook className="inline-block mr-2" />
            CourseCampus
          </Link>

          <div className="desktop-menu">
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/certificates" className="nav-link">
                  Certificates
                </Link>
              </>
            ) : null}
          </div>

          <div className="navbar-right">
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <div className="options-menu-container">
              <button
                className="menu-button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Open menu"
              >
                <FaBars />
              </button>
              {menuOpen && (
                <div className="menu-dropdown">
                  <Link to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    <FaHome className="mr-2" /> Home
                  </Link>
                  <Link to="/courses" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    <FaBook className="mr-2" /> Courses
                  </Link>
                  {user ? (
                    <>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                        <FaUserCircle className="mr-2" /> Dashboard
                      </Link>
                      <Link to="/certificates" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                        <FaBook className="mr-2" /> Certificates
                      </Link>
                    </>
                  ) : (
                    <Link to="/auth" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                      <FaSignInAlt className="mr-2" /> Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route
            path="/courses/create"
            element={
              <ProtectedRoute requireInstructor={true}>
                <CourseCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments/:lessonId"
            element={
              <ProtectedRoute>
                <Assignments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="global-footer">
        <p>CourseCampus © {new Date().getFullYear()} • All Rights Reserved</p>
        <p>From sniper</p>
      </footer>
    </div>
  )
}

export default App
