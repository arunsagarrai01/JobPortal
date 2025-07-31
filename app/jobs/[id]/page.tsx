"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { allJobs } from "@/lib/data"
import { MapPin, Clock, DollarSign, Users, Calendar, Share2, Bookmark, ExternalLink, Building } from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const job = allJobs.find((j) => j.id === Number.parseInt(params.id as string))

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
          <p className="text-gray-400">The job you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const similarJobs = allJobs
    .filter((j) => j.id !== job.id && (j.type === job.type || j.skills.some((skill) => job.skills.includes(skill))))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <img
                      src={job.company.logo || "/placeholder.svg"}
                      alt={job.company.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Job Type</div>
                  <div className="font-semibold text-white">{job.type}</div>
                </div>
                {job.salary && (
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-400">Salary</div>
                    <div className="font-semibold text-white">{job.salary}</div>
                  </div>
                )}
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Experience</div>
                  <div className="font-semibold text-white">{job.experience || "Entry Level"}</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Posted</div>
                  <div className="font-semibold text-white">{job.postedAt}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">{job.description}</p>
                  <p className="text-gray-300 leading-relaxed">
                    We are looking for a talented individual to join our growing team. This role offers excellent
                    opportunities for career growth and skill development in a dynamic work environment.
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Bachelor's degree in relevant field or equivalent experience</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Strong communication and interpersonal skills</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Ability to work independently and as part of a team</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Proficiency in relevant tools and technologies</span>
                  </li>
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-500/30 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                  <span>Apply Now</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-gray-800 rounded-2xl font-semibold hover:bg-gray-700 transition-colors duration-300">
                  Save Job
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-lg font-semibold text-white mb-4">About Company</h3>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={job.company.logo || "/placeholder.svg"}
                  alt={job.company.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h4 className="font-semibold text-white">{job.company.name}</h4>
                  <p className="text-sm text-gray-400">{job.company.industry || "Technology"}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {job.company.description ||
                  "A leading company in the industry, committed to innovation and excellence."}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Company Size:</span>
                  <span className="text-white">{job.company.size || "50-200 employees"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Founded:</span>
                  <span className="text-white">{job.company.founded || "2015"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{job.company.location || job.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Similar Jobs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <div key={similarJob.id} className="border-b border-gray-800 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-white mb-1 hover:text-blue-300 cursor-pointer transition-colors duration-200">
                      {similarJob.title}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">{similarJob.company.name}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{similarJob.location}</span>
                      <span>{similarJob.postedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
