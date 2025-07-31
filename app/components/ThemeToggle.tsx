"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      className="relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      <motion.div animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.5, type: "spring", stiffness: 200 }}>
        {isDark ? <Moon className="w-6 h-6 text-blue-300" /> : <Sun className="w-6 h-6 text-yellow-400" />}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-xl opacity-0 ${isDark ? "bg-blue-400" : "bg-yellow-400"}`}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
