"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Clock, DollarSign, Bookmark, ExternalLink, Heart, Send } from "lucide-react"
import type { Job } from "@/lib/jobs"
import { useUser } from "@clerk/nextjs"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const { user, isSignedIn } = useUser()
  const [isSaved, setIsSaved] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [savedLoading, setSavedLoading] = useState(false)

  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `Rs. ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
    } else if (job.salary_min) {
      return `Rs. ${job.salary_min.toLocaleString()}+`
    } else if (job.salary_max) {
      return `Up to Rs. ${job.salary_max.toLocaleString()}`
    }
    return null
  }

  const formatPostedDate = () => {
    const date = new Date(job.$createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    if (diffDays <= 30) return `${Math.floor((diffDays - 1) / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const handleSaveJob = async () => {
    if (!isSignedIn) {
      // Redirect to sign in
      window.location.href = "/sign-in"
      return
    }

    setSavedLoading(true)
    try {
      if (isSaved) {
        // Remove from saved
        await fetch(`/api/saved-jobs?job_id=${job.$id}`, {
          method: "DELETE",
        })
        setIsSaved(false)
      } else {
        // Add to saved
        await fetch("/api/saved-jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ job_id: job.$id }),
        })
        setIsSaved(true)
      }
    } catch (error) {
      console.error("Error saving job:", error)
    } finally {
      setSavedLoading(false)
    }
  }

  const handleApply = async () => {
    if (!isSignedIn) {
      // Redirect to sign in
      window.location.href = "/sign-in"
      return
    }

    setIsApplying(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_id: job.$id,
          cover_letter: "",
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        alert("Application submitted successfully!")
      } else {
        alert(result.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error applying:", error)
      alert("Failed to submit application")
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
              <img
                src={job.company?.logo_url || "/placeholder.svg"}
                alt={job.company?.name || "Company"}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                {job.title}
              </h3>
              <p className="text-sm text-gray-400">{job.company?.name || "Company"}</p>
            </div>
          </div>
          <button 
            onClick={handleSaveJob}
            disabled={savedLoading}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isSaved ? (
              <Heart className="w-5 h-5 text-red-400 fill-current" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-400" />
            )}
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{job.job_type}</span>
            </div>
          </div>

          {formatSalary() && (
            <div className="flex items-center space-x-1 text-sm">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">{formatSalary()}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{job.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{formatPostedDate()}</span>
          <div className="flex items-center space-x-2">
            {isSignedIn && (
              <button
                onClick={handleApply}
                disabled={isApplying}
                className="inline-flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-300 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isApplying ? "Applying..." : "Quick Apply"}</span>
              </button>
            )}
            <Link
              href={`/jobs/${job.$id}`}
              className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105"
            >
              <span>View Details</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured badge */}
        {job.is_featured && (
          <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
            Featured
          </div>
        )}

        {/* Urgent badge */}
        {job.is_urgent && (
          <div className="absolute -top-2 -left-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs font-bold text-white">
            Urgent
          </div>
        )}
      </div>
    </motion.div>
  )
}
