import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export const ProtectedRoute = ({ children, requireAuth = true, requireInstructor = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />
  }

  if (requireInstructor && user?.role !== 'instructor') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}