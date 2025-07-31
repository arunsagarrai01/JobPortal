"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { createOrUpdateUser } from "@/lib/auth"
import { User, Briefcase } from "lucide-react"

export default function OnboardingPage() {
  const [userType, setUserType] = useState<"seeker" | "employer">("seeker")
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleComplete = async () => {
    if (!user) return

    setLoading(true)
    try {
      await createOrUpdateUser(user, userType)
      router.push("/dashboard")
    } catch (error) {
      console.error("Onboarding error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to KaamKhoj!
          </h2>
          <p className="mt-2 text-gray-400">Tell us about yourself</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">I am a...</label>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setUserType("seeker")}
                  className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "seeker" ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <User className="w-8 h-8 text-blue-400" />
                  <div className="text-left">
                    <div className="font-semibold text-white">Job Seeker</div>
                    <div className="text-sm text-gray-400">Looking for opportunities</div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType("employer")}
                  className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === "employer" ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <Briefcase className="w-8 h-8 text-purple-400" />
                  <div className="text-left">
                    <div className="font-semibold text-white">Employer</div>
                    <div className="text-sm text-gray-400">Hiring talent</div>
                  </div>
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleComplete}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Setting up..." : "Complete Setup"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
