"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Clock, DollarSign, Heart, Briefcase } from "lucide-react"
import GlowyButton from "./GlowyButton"

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  urgent: boolean
  description: string
  skills: string[]
  posted: string
}

interface JobListingsProps {
  jobs: Job[]
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 },
      }}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Urgent Badge */}
        {job.urgent && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-4 right-4 px-3 py-1 bg-red-500/80 text-white text-xs font-bold rounded-full flex items-center gap-1"
          >
            <Heart className="w-3 h-3 fill-current" />
            URGENT
          </motion.div>
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-300 font-medium">{job.company}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? "bg-red-500 text-white" : "bg-white/10 text-gray-300 hover:text-red-400"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.salary}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {job.type}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.posted}
            </div>
          </div>

          <p className="text-gray-300 mb-4 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
              >
                {skill}
              </span>
            ))}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <h4 className="text-white font-semibold mb-2">Job Details</h4>
                <p className="text-gray-300 text-sm">
                  This is an expanded view with more detailed information about the job requirements, company culture,
                  and application process. Perfect for students looking to gain real-world experience while earning
                  competitive wages.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <GlowyButton size="sm" className="flex-1" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Show Less" : "Learn More"}
            </GlowyButton>
            <GlowyButton variant="outline" size="sm">
              Apply Now
            </GlowyButton>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function JobListings({ jobs }: JobListingsProps) {
  return (
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Latest Opportunities
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hand-picked jobs perfect for students and young professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <GlowyButton size="lg">View All Jobs</GlowyButton>
        </motion.div>
      </div>
    </section>
  )
}
