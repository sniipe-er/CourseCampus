import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const coursesAPI = {
  getCourses: () => api.get('/courses/'),
  getCourse: (id) => api.get(`/courses/${id}/`),
  getMyCourses: () => api.get('/courses/me/'),
  getLessons: (courseId) => api.get(`/courses/${courseId}/lessons/`),
  createCourse: (data) => api.post('/courses/me/', data),
  updateCourse: (id, data) => api.put(`/courses/${id}/`, data),
}

export const enrollmentsAPI = {
  getEnrollments: () => api.get('/enrollments/'),
  enroll: (courseId) => api.post(`/enrollments/enroll/${courseId}/`),
}

export const assignmentsAPI = {
  getAssignments: (lessonId) => api.get(`/assignments/?lesson=${lessonId}`),
  getSubmissions: (assignmentId) => api.get(`/assignments/${assignmentId}/submissions/`),
  submitAssignment: (assignmentId, data) => api.post(`/assignments/${assignmentId}/submit/`, data),
}

export const certificatesAPI = {
  getCertificates: () => api.get('/certificates/'),
}

export const authAPI = {
  getCurrentUser: () => api.get('/auth/users/me/'),
}

export default api