"use client"

import { useState, useEffect } from "react"

export default function TestJobsDisplayPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetch("/api/all-jobs")
        const result = await response.json()
        
        if (result.success) {
          setJobs(result.jobs)
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Jobs Display Test</h1>
      
      <div className="mb-4">
        <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
        <p><strong>Jobs Count:</strong> {jobs.length}</p>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.$id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-400">{job.location} • {job.job_type}</p>
              <p className="text-sm text-gray-500">ID: {job.$id}</p>
              {job.company && (
                <p className="text-sm text-gray-500">Company: {job.company.name}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <a 
          href="/jobs" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Real Jobs Page
        </a>
      </div>
    </div>
  )
} 