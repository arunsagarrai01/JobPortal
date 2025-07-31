"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import JobCard from "@/components/JobCard"
import FilterSidebar from "@/components/FilterSidebar"
import { getJobs, type Job } from "@/lib/jobs"
import { Grid, List, Filter, Search } from "lucide-react"

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true)

      const filters = {
        search: searchParams.get("search") || searchTerm || undefined,
        location: searchParams.get("location") || undefined,
        jobType: searchParams.get("jobType") || undefined,
      }

      const jobs = await getJobs(filters)
      setFilteredJobs(jobs)
      setLoading(false)
    }

    loadJobs()
  }, [searchParams, searchTerm])

  const handleFilterChange = async (filters: any) => {
    setLoading(true)
    const jobs = await getJobs(filters)
    setFilteredJobs(jobs)
    setLoading(false)
  }

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
                  viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
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
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">{loading ? "Searching..." : `Showing ${filteredJobs.length} jobs`}</p>
            </div>

            {loading ? (
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {[...Array(6)].map((_, i) => (
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
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
