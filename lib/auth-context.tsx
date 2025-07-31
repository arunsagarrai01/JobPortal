"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockUsers, type User } from "./data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "seeker" | "employer") => Promise<void>
  register: (name: string, email: string, password: string, type: "seeker" | "employer") => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("kaamkhoj_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, type: "seeker" | "employer") => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find existing mock user or create new one
    let mockUser = mockUsers.find((u) => u.email === email && u.user_type === type)

    if (!mockUser) {
      // Create a new mock user
      mockUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0].replace(/[^a-zA-Z]/g, " "),
        user_type: type,
        avatar_url: `/placeholder.svg?height=40&width=40&text=${email.charAt(0).toUpperCase()}`,
        phone: "+977-98XXXXXXXX",
        location: "Kathmandu, Nepal",
        bio: type === "seeker" ? "Job seeker looking for opportunities" : "Employer looking for talent",
        skills: type === "seeker" ? ["JavaScript", "React", "Node.js"] : undefined,
        company_name: type === "employer" ? "My Company" : undefined,
        company_size: type === "employer" ? "10-50 employees" : undefined,
        created_at: new Date(),
        updated_at: new Date(),
      }
    }

    setUser(mockUser)
    localStorage.setItem("kaamkhoj_user", JSON.stringify(mockUser))
  }

  const register = async (name: string, email: string, password: string, type: "seeker" | "employer") => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      user_type: type,
      avatar_url: `/placeholder.svg?height=40&width=40&text=${name.charAt(0).toUpperCase()}`,
      phone: "+977-98XXXXXXXX",
      location: "Kathmandu, Nepal",
      bio: type === "seeker" ? "Job seeker looking for opportunities" : "Employer looking for talent",
      skills: type === "seeker" ? [] : undefined,
      company_name: type === "employer" ? "My Company" : undefined,
      company_size: type === "employer" ? "10-50 employees" : undefined,
      created_at: new Date(),
      updated_at: new Date(),
    }

    setUser(mockUser)
    localStorage.setItem("kaamkhoj_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("kaamkhoj_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
