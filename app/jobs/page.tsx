"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import JobCard from "@/components/JobCard"
import FilterSidebar from "@/components/FilterSidebar"
import type { Job } from "@/lib/jobs"
import { Grid, List, Filter, Search, Plus } from "lucide-react"
import Link from "next/link"
import { getFeaturedJobs } from "@/lib/jobs"

// Test jobs data - fallback if API fails
const TEST_JOBS: Job[] = [
  {
    $id: "test-job-1",
    title: "Frontend Developer",
    description: "We are looking for a talented frontend developer to join our team.",
    requirements: ["React experience", "TypeScript knowledge"],
    skills: ["React", "TypeScript", "Next.js"],
    location: "Kathmandu",
    job_type: "full-time",
    experience_level: "mid-level",
    salary_min: 60000,
    salary_max: 100000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: false,
    status: "active",
    company_id: "test-company-1",
    employer_id: "test-employer-1",
    views_count: 45,
    applications_count: 8,
    $createdAt: "2024-01-15T10:00:00Z",
    $updatedAt: "2024-01-15T10:00:00Z",
    company: {
      $id: "test-company-1",
      name: "TechCorp Nepal",
      description: "Leading technology company in Nepal",
      industry: "Technology",
      size: "50-100 employees",
      location: "Kathmandu",
      website_url: "https://techcorp.com",
      logo_url: "/placeholder-logo.png",
      employer_id: "test-employer-1",
      $createdAt: "2024-01-15T10:00:00Z",
      $updatedAt: "2024-01-15T10:00:00Z"
    }
  },
  {
    $id: "test-job-2",
    title: "Backend Developer",
    description: "Join our backend team to build scalable APIs and microservices.",
    requirements: ["Node.js experience", "Database design"],
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Lalitpur",
    job_type: "full-time",
    experience_level: "senior",
    salary_min: 80000,
    salary_max: 150000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: true,
    status: "active",
    company_id: "test-company-2",
    employer_id: "test-employer-2",
    views_count: 67,
    applications_count: 12,
    $createdAt: "2024-01-14T15:30:00Z",
    $updatedAt: "2024-01-14T15:30:00Z",
    company: {
      $id: "test-company-2",
      name: "Digital Solutions",
      description: "Innovative digital solutions provider",
      industry: "Software Development",
      size: "20-50 employees",
      location: "Lalitpur",
      website_url: "https://digitalsolutions.com",
      logo_url: "/placeholder-logo.png",
      employer_id: "test-employer-2",
      $createdAt: "2024-01-14T15:30:00Z",
      $updatedAt: "2024-01-14T15:30:00Z"
    }
  }
]

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  // Load jobs function
  const loadJobs = async () => {
    setLoading(true)
    try {
      console.log("Loading jobs from API...")
      const response = await fetch(`/api/all-jobs?t=${Date.now()}`) // Added cache-busting parameter
      const result = await response.json()
      
      console.log("API response:", result)
      
      if (result.success && result.jobs && result.jobs.length > 0) {
        console.log("Found", result.jobs.length, "jobs from API")
        setJobs(result.jobs)
      } else {
        console.log("No jobs from API, using test jobs")
        setJobs(TEST_JOBS)
      }
      // const jobs = await getFeaturedJobs();
      //   setJobs(jobs)
    } catch (error) {
      console.error("Error loading jobs:", error)
      console.log("Using test jobs due to error")
      setJobs(TEST_JOBS)
    } finally {
      setLoading(false)
    }
  }

  // Load jobs on mount
  useEffect(() => {
    loadJobs()
  }, [])

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => {
    if (!searchTerm.trim()) return true
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Find Your Perfect Job
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover opportunities from Nepal's top employers</p>
          </motion.div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Link
              href="/post-job"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Job</span>
            </Link>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2 bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 flex-shrink-0`}>
            <FilterSidebar jobs={jobs} onFilterChange={() => {}} />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                {loading ? "Loading..." : `Showing ${filteredJobs.length} jobs`}
              </p>
              <button 
                onClick={loadJobs}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search criteria or be the first to post a job!</p>
                <Link
                  href="/post-job"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Post Your First Job</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
