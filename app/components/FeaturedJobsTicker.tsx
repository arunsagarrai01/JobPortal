"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

interface Job {
  title: string
  company: string
  salary: string
  urgent: boolean
}

interface FeaturedJobsTickerProps {
  jobs: Job[]
}

export default function FeaturedJobsTicker({ jobs }: FeaturedJobsTickerProps) {
  // Duplicate jobs for seamless loop
  const duplicatedJobs = [...jobs, ...jobs]

  return (
    <div className="relative z-10 py-8 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-y border-white/10">
        <div className="flex items-center py-4">
          <div className="flex items-center gap-2 px-6 text-yellow-400 font-bold whitespace-nowrap">
            <Zap className="w-5 h-5" />
            FEATURED JOBS
          </div>

          <motion.div
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            {duplicatedJobs.map((job, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full border border-white/10"
              >
                <span className="text-white font-semibold">{job.title}</span>
                <span className="text-gray-300">at {job.company}</span>
                <span className="text-green-400 font-bold">{job.salary}</span>
                {job.urgent && <span className="px-2 py-1 bg-red-500/80 text-white text-xs rounded-full">URGENT</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
