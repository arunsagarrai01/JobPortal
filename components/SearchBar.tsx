"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Search, MapPin, Filter } from "lucide-react"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const router = useRouter()

  const categories = ["All Categories", "full-time", "part-time", "contract", "internship", "remote"]

  const locations = ["All Locations", "Kathmandu", "Pokhara", "Lalitpur", "Bhaktapur", "Chitwan", "Remote"]

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (searchTerm) params.set("search", searchTerm)
    if (location && location !== "All Locations") params.set("location", location)
    if (category && category !== "All Categories") params.set("jobType", category)

    router.push(`/jobs?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Find Your Dream Job</h2>
        <p className="text-gray-400">Search from thousands of opportunities</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        {/* Location Select */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 pr-8 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer min-w-[200px]"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-gray-800">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-12 pr-8 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer min-w-[200px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-800">
                {cat === "All Categories" ? cat : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          Search Jobs
        </motion.button>
      </div>

      {/* Popular Searches */}
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-3">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["React Developer", "Digital Marketing", "UI/UX Designer", "Data Analyst", "Content Writer"].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchTerm(term)
                const params = new URLSearchParams()
                params.set("search", term)
                router.push(`/jobs?${params.toString()}`)
              }}
              className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/50 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
