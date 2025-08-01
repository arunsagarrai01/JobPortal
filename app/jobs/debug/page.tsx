"use client"

import { useState, useEffect } from "react"

export default function JobsDebugPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        console.log("Debug: Starting to load jobs from API...")
        setLoading(true)
        setError(null)
        
        const response = await fetch("/api/jobs")
        const result = await response.json()
        
        console.log("Debug: API response:", result)
        
        if (result.success) {
          setJobs(result.jobs || [])
        } else {
          setError(result.message || "Failed to load jobs")
        }
      } catch (err: any) {
        console.error("Debug: Error loading jobs:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Jobs Debug Page</h1>
        
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
          <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
          <p><strong>Jobs Count:</strong> {jobs.length}</p>
          <p><strong>Error:</strong> {error || "None"}</p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-lg">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-lg text-red-400">Error: {error}</p>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg">No jobs found</p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Jobs Found ({jobs.length}):</h2>
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
          </div>
        )}

        <div className="mt-8 space-x-4">
          <a 
            href="/jobs" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Jobs Page
          </a>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
} 