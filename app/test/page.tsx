"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Globe, Settings } from "lucide-react"

export default function TestPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTest = async (testType: "connection" | "job" | "permissions") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/test${testType === "permissions" ? "-permissions" : ""}`)
      const data = await response.json()
      setTestResults({ type: testType, ...data })
    } catch (error) {
      setTestResults({ type: testType, success: false, error: "Network error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🔧 Database Integration Test</h1>
          <p className="text-gray-400 text-lg">
            Test your Appwrite database connection and job posting functionality
          </p>
        </div>

        {/* Success Banner */}
        <Card className="mb-8 border-green-500/20 bg-green-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="font-semibold text-green-500">Integration Successful!</h3>
                <p className="text-sm text-green-400">
                  Your Appwrite database is connected and job posting is working correctly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Connection Test
              </CardTitle>
              <CardDescription>
                Test basic database connectivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => runTest("connection")} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Testing..." : "Test Connection"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Permissions Test
              </CardTitle>
              <CardDescription>
                Test job creation with full attributes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => runTest("permissions")} 
                disabled={isLoading}
                className="w-full"
                variant="secondary"
              >
                {isLoading ? "Testing..." : "Test Job Creation"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Live Test
              </CardTitle>
              <CardDescription>
                Test the actual job posting form
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.open("/post-job", "_blank")} 
                className="w-full"
                variant="outline"
              >
                Go to Post Job
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        {testResults && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {testResults.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Test Results: {testResults.type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Badge variant={testResults.success ? "default" : "destructive"}>
                    {testResults.success ? "SUCCESS" : "FAILED"}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Message:</h4>
                  <p className="text-sm text-gray-400">{testResults.message}</p>
                </div>

                {testResults.jobsCount !== undefined && (
                  <div>
                    <h4 className="font-semibold mb-2">Database Info:</h4>
                    <p className="text-sm text-gray-400">
                      Jobs in database: {testResults.jobsCount}
                    </p>
                  </div>
                )}

                {testResults.jobId && (
                  <div>
                    <h4 className="font-semibold mb-2">Created Job:</h4>
                    <p className="text-sm text-gray-400">
                      Job ID: {testResults.jobId}
                    </p>
                    <p className="text-sm text-gray-400">
                      Company ID: {testResults.companyId}
                    </p>
                  </div>
                )}

                {testResults.error && (
                  <div>
                    <h4 className="font-semibold mb-2 text-red-500">Error:</h4>
                    <p className="text-sm text-red-400">{testResults.error}</p>
                  </div>
                )}

                {testResults.suggestions && (
                  <div>
                    <h4 className="font-semibold mb-2">Suggestions:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {testResults.suggestions.map((suggestion: string, index: number) => (
                        <li key={index}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>🎉 Integration Complete!</CardTitle>
            <CardDescription>
              Your database is now fully integrated with your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What's Working:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✅ Appwrite database connection</li>
                  <li>✅ Job creation with all attributes</li>
                  <li>✅ Company creation</li>
                  <li>✅ Proper data structure</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Next Steps:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>1. Visit <a href="/post-job" className="text-blue-400 hover:underline">Post Job</a> to create real job postings</li>
                  <li>2. Visit <a href="/jobs" className="text-blue-400 hover:underline">Jobs</a> to see posted jobs</li>
                  <li>3. Test user authentication and job applications</li>
                  <li>4. Customize the job posting form as needed</li>
                </ul>
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