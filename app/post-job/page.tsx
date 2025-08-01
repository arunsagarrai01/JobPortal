"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import JobPostingForm from "@/components/JobPostingForm"

export default function PostJobPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      // For now, we'll allow access even without authentication
      // In a real app, you'd redirect to sign-in
      // router.push("/sign-in")
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Post a New Job</h1>
          <p className="text-gray-400 text-lg">Find the perfect candidate for your team</p>
        </div>

        <JobPostingForm />
      </div>
    </div>
  )
}
