"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, DollarSign, Users, FileText, Star, CheckCircle, AlertCircle } from "lucide-react"

export default function JobPostingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)
    
    try {
      // Convert FormData to JSON
      const jobData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        requirements: (formData.get("requirements") as string)?.split("\n").filter(Boolean) || [],
        skills: (formData.get("skills") as string)?.split(",").map(s => s.trim()).filter(Boolean) || [],
        location: formData.get("location") as string,
        job_type: formData.get("job_type") as string,
        experience_level: formData.get("experience_level") as string,
        salary_min: Number(formData.get("salary_min") as string) || undefined,
        salary_max: Number(formData.get("salary_max") as string) || undefined,
        is_featured: formData.get("is_featured") === "on",
        is_urgent: formData.get("is_urgent") === "on",
        company_name: "Test Company",
        employer_id: "test-employer-123"
      }

      console.log("Submitting job data:", jobData)

      const response = await fetch("/api/post-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      const result = await response.json()

      if (result.success) {
        setMessage({
          type: "success",
          text: "Job posted successfully! Redirecting to jobs page..."
        })
        
        // Redirect to jobs page after a short delay
        setTimeout(() => {
          window.location.href = "/jobs"
        }, 2000)
      } else {
        throw new Error(result.message || "Failed to post job")
      }
    } catch (error: any) {
      console.error("Error:", error)
      setMessage({
        type: "error",
        text: error.message || "Failed to post job. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
    >
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
            message.type === "success" 
              ? "bg-green-500/20 border border-green-500/30 text-green-300" 
              : "bg-red-500/20 border border-red-500/30 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      <form action={handleSubmit} className="space-y-8">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-3">
            Job Title *
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>
        </div>

        {/* Location and Job Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-3">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="location"
                name="location"
                required
                className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g. Kathmandu, Nepal"
              />
            </div>
          </div>

          <div>
            <label htmlFor="job_type" className="block text-sm font-medium text-gray-300 mb-3">
              Job Type *
            </label>
            <select
              id="job_type"
              name="job_type"
              required
              className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="salary_min" className="block text-sm font-medium text-gray-300 mb-3">
              Minimum Salary (NPR)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id="salary_min"
                name="salary_min"
                className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g. 50000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="salary_max" className="block text-sm font-medium text-gray-300 mb-3">
              Maximum Salary (NPR)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                id="salary_max"
                name="salary_max"
                className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g. 80000"
              />
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label htmlFor="experience_level" className="block text-sm font-medium text-gray-300 mb-3">
            Experience Level
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="experience_level"
              name="experience_level"
              className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="entry-level">Entry Level</option>
              <option value="mid-level">Mid Level</option>
              <option value="senior-level">Senior Level</option>
              <option value="executive">Executive</option>
            </select>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-3">
            Required Skills * <span className="text-gray-500">(comma-separated)</span>
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            required
            className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="e.g. React, TypeScript, Node.js, PostgreSQL"
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-3">
            Job Description *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-3">
            Requirements <span className="text-gray-500">(one per line)</span>
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            placeholder="Bachelor's degree in Computer Science&#10;2+ years of React experience&#10;Strong communication skills"
          />
        </div>

        {/* Job Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              className="w-5 h-5 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="is_featured" className="text-gray-300 flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Featured Job (+Rs. 2,000)</span>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="is_urgent"
              name="is_urgent"
              className="w-5 h-5 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="is_urgent" className="text-gray-300 flex items-center space-x-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span>Urgent Hiring (+Rs. 1,000)</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting Job..." : "Post Job"}
        </motion.button>
      </form>
    </motion.div>
  )
}
