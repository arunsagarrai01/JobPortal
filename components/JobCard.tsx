"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Clock, DollarSign, Bookmark, ExternalLink } from "lucide-react"
import type { Job } from "@/lib/data"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
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
                src={job.company.logo || "/placeholder.svg"}
                alt={job.company.name}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                {job.title}
              </h3>
              <p className="text-sm text-gray-400">{job.company.name}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-400" />
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
              <span>{job.type}</span>
            </div>
          </div>

          {job.salary && (
            <div className="flex items-center space-x-1 text-sm">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">{job.salary}</span>
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
          <span className="text-xs text-gray-500">{job.postedAt}</span>
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105"
          >
            <span>View Details</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured badge */}
        {job.featured && (
          <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
            Featured
          </div>
        )}
      </div>
    </motion.div>
  )
}
