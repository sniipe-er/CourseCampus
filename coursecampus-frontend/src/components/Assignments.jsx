import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assignmentsAPI } from '../api'

export const Assignments = () => {
  const { lessonId } = useParams()
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submission, setSubmission] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await assignmentsAPI.getAssignments(lessonId)
        setAssignments(response.data)
      } catch (error) {
        console.error('Error fetching assignments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [lessonId])

  const handleSubmit = async (assignmentId) => {
    setSubmitting(true)
    try {
      await assignmentsAPI.submitAssignment(assignmentId, { content: submission })
      setSubmission('')
      setSelectedAssignment(null)
      // Refresh assignments to show submission
      const response = await assignmentsAPI.getAssignments(lessonId)
      setAssignments(response.data)
    } catch (error) {
      console.error('Error submitting assignment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading assignments...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>

      {assignments.length === 0 ? (
        <p className="text-center text-gray-500">No assignments for this lesson.</p>
      ) : (
        <div className="space-y-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{assignment.title}</h2>
              <p className="text-gray-600 mb-4">{assignment.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p>Due: {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'No due date'}</p>
                <p>Points: {assignment.points || 0}</p>
              </div>

              {assignment.submission ? (
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h3 className="font-medium text-green-800">Submitted</h3>
                  <p className="text-green-700">{assignment.submission.content}</p>
                  <p className="text-sm text-green-600 mt-2">
                    Submitted: {new Date(assignment.submission.submitted_at).toLocaleDateString()}
                  </p>
                  {assignment.submission.grade && (
                    <p className="text-sm font-medium text-green-800">
                      Grade: {assignment.submission.grade}/{assignment.points}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {selectedAssignment === assignment.id ? (
                    <div className="space-y-4">
                      <textarea
                        value={submission}
                        onChange={(e) => setSubmission(e.target.value)}
                        placeholder="Enter your submission..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows={6}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSubmit(assignment.id)}
                          disabled={submitting || !submission.trim()}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                          {submitting ? 'Submitting...' : 'Submit Assignment'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAssignment(null)
                            setSubmission('')
                          }}
                          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedAssignment(assignment.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Submit Assignment
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}