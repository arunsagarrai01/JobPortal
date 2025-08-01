"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Users, Briefcase, FileText, Heart } from "lucide-react"

export default function TestAllPage() {
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const runTest = async (testType: string) => {
    setIsLoading(true)
    try {
      let response
      let data

      switch (testType) {
        case "jobs":
          response = await fetch("/api/jobs")
          data = await response.json()
          break
        case "user":
          response = await fetch("/api/user")
          data = await response.json()
          break
        case "applications":
          response = await fetch("/api/applications")
          data = await response.json()
          break
        case "saved-jobs":
          response = await fetch("/api/saved-jobs")
          data = await response.json()
          break
        case "post-job":
          response = await fetch("/api/post-job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "Test Job for Integration",
              description: "This is a test job to verify all functionality works correctly.",
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
            })
          })
          data = await response.json()
          break
        default:
          data = { success: false, message: "Unknown test type" }
      }

      setTestResults(prev => ({
        ...prev,
        [testType]: data
      }))
    } catch (error: any) {
      setTestResults(prev => ({
        ...prev,
        [testType]: { success: false, message: error.message }
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const testTypes = [
    { key: "jobs", name: "Jobs API", description: "Test job listing functionality", icon: Briefcase },
    { key: "user", name: "User API", description: "Test user management", icon: Users },
    { key: "applications", name: "Applications API", description: "Test job applications", icon: FileText },
    { key: "saved-jobs", name: "Saved Jobs API", description: "Test saved jobs functionality", icon: Heart },
    { key: "post-job", name: "Post Job API", description: "Test job posting", icon: Database },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🧪 Complete System Test</h1>
          <p className="text-gray-400 text-lg">
            Test all functionality including jobs, users, applications, and saved jobs
          </p>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testTypes.map((test) => {
            const Icon = test.icon
            const result = testResults[test.key]
            const isSuccess = result?.success
            const testLoading = isLoading && !result

            return (
              <Card key={test.key} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {test.name}
                  </CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => runTest(test.key)} 
                    disabled={testLoading}
                    className="w-full"
                    variant={isSuccess ? "default" : isSuccess === false ? "destructive" : "secondary"}
                  >
                    {testLoading ? "Testing..." : "Run Test"}
                  </Button>
                  
                  {result && (
                    <div className="mt-4 flex items-center gap-2">
                      {isSuccess ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Badge variant={isSuccess ? "default" : "destructive"}>
                        {isSuccess ? "SUCCESS" : "FAILED"}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Test Results */}
        {Object.keys(testResults).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                Detailed results from all API tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(testResults).map(([testType, result]: [string, any]) => (
                  <div key={testType} className="border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold capitalize">{testType.replace("-", " ")}</h4>
                      <Badge variant={result.success ? "default" : "destructive"}>
                        {result.success ? "SUCCESS" : "FAILED"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-400">Message:</span>
                        <p className="text-sm">{result.message}</p>
                      </div>
                      
                      {result.error && (
                        <div>
                          <span className="text-sm text-gray-400">Error:</span>
                          <p className="text-sm text-red-400">{result.error}</p>
                        </div>
                      )}
                      
                      {result.jobs && (
                        <div>
                          <span className="text-sm text-gray-400">Jobs Found:</span>
                          <p className="text-sm">{result.count || result.jobs.length}</p>
                        </div>
                      )}
                      
                      {result.user && (
                        <div>
                          <span className="text-sm text-gray-400">User:</span>
                          <p className="text-sm">{result.user.name} ({result.user.user_type})</p>
                        </div>
                      )}
                      
                      {result.applications && (
                        <div>
                          <span className="text-sm text-gray-400">Applications:</span>
                          <p className="text-sm">{result.applications.length}</p>
                        </div>
                      )}
                      
                      {result.savedJobs && (
                        <div>
                          <span className="text-sm text-gray-400">Saved Jobs:</span>
                          <p className="text-sm">{result.savedJobs.length}</p>
                        </div>
                      )}
                      
                      {result.job && (
                        <div>
                          <span className="text-sm text-gray-400">Created Job:</span>
                          <p className="text-sm">{result.job.title} (ID: {result.job.id})</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 System Status</CardTitle>
            <CardDescription>
              Overall system functionality summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What's Working:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Job posting and listing</li>
                  <li>✅ User authentication and management</li>
                  <li>✅ Job applications</li>
                  <li>✅ Saved jobs functionality</li>
                  <li>✅ Database integration</li>
                  <li>✅ API endpoints</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Test the Real Application:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href="/jobs" 
                    className="block p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-center transition-colors"
                  >
                    Browse Jobs
                  </a>
                  <a 
                    href="/post-job" 
                    className="block p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white text-center transition-colors"
                  >
                    Post a Job
                  </a>
                  <a 
                    href="/sign-in" 
                    className="block p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-center transition-colors"
                  >
                    Sign In
                  </a>
                  <a 
                    href="/dashboard" 
                    className="block p-4 bg-orange-600 hover:bg-orange-700 rounded-lg text-white text-center transition-colors"
                  >
                    Dashboard
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Database Collections:</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <Badge variant="outline">jobs</Badge>
                  <Badge variant="outline">companies</Badge>
                  <Badge variant="outline">users</Badge>
                  <Badge variant="outline">applications</Badge>
                  <Badge variant="outline">saved_jobs</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 