"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Job } from "@/lib/jobs"
import { X } from "lucide-react"

interface FilterSidebarProps {
  jobs: Job[]
  onFilterChange: (filteredJobs: Job[]) => void
}

export default function FilterSidebar({ jobs, onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    jobType: [] as string[],
    location: [] as string[],
    salary: "",
    experience: "",
    skills: [] as string[],
  })

  // Extract unique values for filters
  const jobTypes = [...new Set(jobs.map((job) => job.job_type))]
  const locations = [...new Set(jobs.map((job) => job.location))]
  const allSkills = [...new Set(jobs.flatMap((job) => job.skills))]

  useEffect(() => {
    let filtered = jobs

    // Filter by job type
    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) => filters.jobType.includes(job.job_type))
    }

    // Filter by location
    if (filters.location.length > 0) {
      filtered = filtered.filter((job) => filters.location.includes(job.location))
    }

    // Filter by salary
    if (filters.salary) {
      filtered = filtered.filter((job) => {
        if (!job.salary_min && !job.salary_max) return false
        const salary = job.salary_min || job.salary_max || 0
        switch (filters.salary) {
          case "0-30000":
            return salary <= 30000
          case "30000-60000":
            return salary > 30000 && salary <= 60000
          case "60000-100000":
            return salary > 60000 && salary <= 100000
          case "100000+":
            return salary > 100000
          default:
            return true
        }
      })
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      filtered = filtered.filter((job) => filters.skills.some((skill) => job.skills.includes(skill)))
    }

    onFilterChange(filtered)
  }, [filters, jobs, onFilterChange])

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      if (category === "salary" || category === "experience") {
        return { ...prev, [category]: prev[category] === value ? "" : value }
      } else {
        const currentValues = prev[category] as string[]
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value]
        return { ...prev, [category]: newValues }
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      jobType: [],
      location: [],
      salary: "",
      experience: "",
      skills: [],
    })
  }

  const hasActiveFilters = Object.values(filters).some((filter) =>
    Array.isArray(filter) ? filter.length > 0 : filter !== "",
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Job Type */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Job Type</h4>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.jobType.includes(type)}
                  onChange={() => handleFilterChange("jobType", type)}
                  className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-400 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Location</h4>
          <div className="space-y-2">
            {locations.slice(0, 6).map((location) => (
              <label key={location} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.location.includes(location)}
                  onChange={() => handleFilterChange("location", location)}
                  className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-400 text-sm">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Salary Range</h4>
          <div className="space-y-2">
            {[
              { label: "Up to Rs. 30,000", value: "0-30000" },
              { label: "Rs. 30,000 - Rs. 60,000", value: "30000-60000" },
              { label: "Rs. 60,000 - Rs. 1,00,000", value: "60000-100000" },
              { label: "Rs. 1,00,000+", value: "100000+" },
            ].map((range) => (
              <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="salary"
                  checked={filters.salary === range.value}
                  onChange={() => handleFilterChange("salary", range.value)}
                  className="w-4 h-4 bg-gray-800 border-gray-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-400 text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Skills</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allSkills.slice(0, 15).map((skill) => (
              <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => handleFilterChange("skills", skill)}
                  className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-400 text-sm">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {[...filters.jobType, ...filters.location, ...filters.skills, filters.salary]
              .filter(Boolean)
              .map((filter, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => {
                      // Remove specific filter
                      Object.entries(filters).forEach(([key, value]) => {
                        if (Array.isArray(value) && value.includes(filter)) {
                          handleFilterChange(key as keyof typeof filters, filter)
                        } else if (value === filter) {
                          handleFilterChange(key as keyof typeof filters, filter)
                        }
                      })
                    }}
                    className="hover:text-blue-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
