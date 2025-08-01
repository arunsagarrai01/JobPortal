"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Plus, ArrowRight } from "lucide-react"

export default function TestJobPostingPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testJobPosting = async () => {
    setIsLoading(true)
    try {
      const jobData = {
        title: "Test Developer Position",
        description: "This is a test job posting to verify the functionality works correctly.",
        requirements: ["Test requirement 1", "Test requirement 2"],
        skills: ["JavaScript", "React", "Node.js"],
        location: "Kathmandu",
        job_type: "full-time",
        experience_level: "entry-level",
        salary_min: 50000,
        salary_max: 80000,
        is_featured: false,
        is_urgent: false,
        company_name: "Test Company",
        employer_id: "test-employer-123"
      }

      const response = await fetch("/api/post-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error: any) {
      setTestResult({ success: false, message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const checkJobs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/jobs")
      const result = await response.json()
      setTestResult({ success: true, message: `Found ${result.count} jobs`, jobs: result.jobs })
    } catch (error: any) {
      setTestResult({ success: false, message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🧪 Job Posting Test</h1>
          <p className="text-gray-400 text-lg">
            Test the job posting functionality and verify jobs are being saved and displayed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Test Job Posting
              </CardTitle>
              <CardDescription>
                Create a test job and save it to the database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={testJobPosting} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Posting..." : "Post Test Job"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Check Jobs
              </CardTitle>
              <CardDescription>
                Verify that jobs are being displayed correctly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={checkJobs} 
                disabled={isLoading}
                className="w-full"
                variant="secondary"
              >
                {isLoading ? "Checking..." : "Check Jobs"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {testResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {testResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Test Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Badge variant={testResult.success ? "default" : "destructive"}>
                    {testResult.success ? "SUCCESS" : "FAILED"}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Message:</h4>
                  <p className="text-sm text-gray-400">{testResult.message}</p>
                </div>

                {testResult.job && (
                  <div>
                    <h4 className="font-semibold mb-2">Created Job:</h4>
                    <p className="text-sm text-gray-400">ID: {testResult.job.id}</p>
                    <p className="text-sm text-gray-400">Title: {testResult.job.title}</p>
                    <p className="text-sm text-gray-400">Location: {testResult.job.location}</p>
                  </div>
                )}

                {testResult.jobs && (
                  <div>
                    <h4 className="font-semibold mb-2">Available Jobs:</h4>
                    <div className="space-y-2">
                      {testResult.jobs.map((job: any) => (
                        <div key={job.$id} className="p-3 bg-gray-800 rounded-lg">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-400">{job.location} • {job.job_type}</p>
                          {job.company && (
                            <p className="text-sm text-gray-500">{job.company.name}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {testResult.error && (
                  <div>
                    <h4 className="font-semibold mb-2 text-red-500">Error:</h4>
                    <p className="text-sm text-red-400">{testResult.error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>🎯 Next Steps</CardTitle>
            <CardDescription>
              Test the actual job posting form and jobs page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Test the Real Forms:</h4>
                <div className="space-y-2">
                  <a 
                    href="/post-job" 
                    className="block p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-center transition-colors"
                  >
                    Go to Job Posting Form
                  </a>
                  <a 
                    href="/jobs" 
                    className="block p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-center transition-colors"
                  >
                    Go to Jobs Page
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">What's Working:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Job posting API</li>
                  <li>✅ Jobs display API</li>
                  <li>✅ Database integration</li>
                  <li>✅ Test jobs fallback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 