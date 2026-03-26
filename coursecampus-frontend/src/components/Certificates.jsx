import { useState, useEffect } from 'react'
import { certificatesAPI } from '../api'

export const Certificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await certificatesAPI.getCertificates()
        setCertificates(response.data)
      } catch (error) {
        console.error('Error fetching certificates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading certificates...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">You haven't earned any certificates yet.</p>
          <p className="text-sm text-gray-400">
            Complete courses to earn certificates!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-green-800">Certificate</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Completed
                </span>
              </div>

              <h3 className="text-lg font-medium mb-2">{cert.course.title}</h3>
              <p className="text-gray-600 mb-4">{cert.course.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <p>Instructor: {cert.course.instructor.name}</p>
                <p>Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
                <p>Certificate ID: {cert.id}</p>
              </div>

              <div className="mt-6 flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Certificate
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}