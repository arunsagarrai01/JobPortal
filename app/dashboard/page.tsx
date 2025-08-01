"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUser } from "@clerk/nextjs"
import { Briefcase, Heart, Eye, Users, Plus, TrendingUp, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState("overview")

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

  // For now, we'll show the dashboard even without authentication
  // In a real app, you'd redirect to sign-in if user is not authenticated
  const userType = "seeker" // This should come from your Appwrite user data

  const seekerStats = [
    { icon: Briefcase, label: "Applications", value: "12", color: "text-blue-400" },
    { icon: Heart, label: "Saved Jobs", value: "8", color: "text-red-400" },
    { icon: Eye, label: "Profile Views", value: "45", color: "text-green-400" },
    { icon: TrendingUp, label: "Response Rate", value: "75%", color: "text-purple-400" },
  ]

  const employerStats = [
    { icon: Briefcase, label: "Active Jobs", value: "5", color: "text-blue-400" },
    { icon: Users, label: "Applications", value: "127", color: "text-green-400" },
    { icon: Eye, label: "Job Views", value: "1.2K", color: "text-purple-400" },
    { icon: TrendingUp, label: "Hire Rate", value: "85%", color: "text-orange-400" },
  ]

  const recentApplications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Nepal",
      appliedAt: "2 days ago",
      status: "Under Review",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignStudio",
      appliedAt: "5 days ago",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataFlow",
      appliedAt: "1 week ago",
      status: "Rejected",
    },
  ]

  const activeJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      applications: 23,
      views: 156,
      postedAt: "3 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      applications: 45,
      views: 289,
      postedAt: "1 week ago",
    },
  ]

  const stats = userType === "seeker" ? seekerStats : employerStats

  const tabs =
    userType === "seeker"
      ? [
          { id: "overview", label: "Overview" },
          { id: "applications", label: "My Applications" },
          { id: "saved", label: "Saved Jobs" },
          { id: "profile", label: "Profile" },
        ]
      : [
          { id: "overview", label: "Overview" },
          { id: "jobs", label: "My Jobs" },
          { id: "candidates", label: "Candidates" },
          { id: "settings", label: "Settings" },
        ]

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user ? (user.firstName || user.emailAddresses[0]?.emailAddress) : "User"}!
          </h1>
          <p className="text-gray-400">
            {userType === "seeker"
              ? "Track your job applications and discover new opportunities"
              : "Manage your job postings and find the best candidates"}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-800 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-900/50 rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {userType === "seeker" ? (
                  <>
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                      <h3 className="text-xl font-semibold text-white mb-4">Recent Applications</h3>
                      <div className="space-y-4">
                        {recentApplications.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                            <div>
                              <h4 className="font-medium text-white">{app.title}</h4>
                              <p className="text-sm text-gray-400">{app.company}</p>
                              <p className="text-xs text-gray-500">{app.appliedAt}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                app.status === "Under Review"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : app.status === "Interview Scheduled"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">Active Job Postings</h3>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                          <Plus className="w-4 h-4" />
                          <span>Post New Job</span>
                        </button>
                      </div>
                      <div className="space-y-4">
                        {activeJobs.map((job) => (
                          <div key={job.id} className="p-4 bg-gray-800/50 rounded-xl">
                            <h4 className="font-medium text-white mb-2">{job.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{job.applications} applications</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{job.views} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{job.postedAt}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {userType === "seeker" ? (
                  <>
                    <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Browse Jobs</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-white">Update Profile</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200">
                      <Plus className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Post New Job</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-white">Browse Candidates</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Profile Completion */}
            {userType === "seeker" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Profile Completion</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">75%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm text-gray-400">Complete your profile to get better job recommendations</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
