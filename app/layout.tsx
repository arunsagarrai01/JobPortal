

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "KaamKhoj - Find Work. Find Yourself.",
  description: "Nepal's premier job portal for students and youth. Discover opportunities, build your career.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
