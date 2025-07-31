"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlowyButtonProps {
  children: ReactNode
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export default function GlowyButton({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
}: GlowyButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const baseClasses = `
    relative font-semibold rounded-full transition-all duration-300 
    ${sizeClasses[size]} ${className}
  `

  if (variant === "outline") {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`
          ${baseClasses}
          bg-transparent border-2 border-white/30 text-white
          hover:border-white/60 hover:bg-white/10
          backdrop-blur-sm
        `}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${baseClasses}
        bg-gradient-to-r from-blue-600 to-purple-600 text-white
        shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
        hover:shadow-xl
      `}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 blur-xl"
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
