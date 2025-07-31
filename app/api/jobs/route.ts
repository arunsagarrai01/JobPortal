import { type NextRequest, NextResponse } from "next/server"
import { allJobs } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const jobType = searchParams.get("jobType")
    const featured = searchParams.get("featured") === "true"

    let filteredJobs = allJobs

    if (search) {
      const searchTerm = search.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.company?.name.toLowerCase().includes(searchTerm),
      )
    }

    if (location && location !== "All Locations") {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (jobType && jobType !== "All Categories") {
      filteredJobs = filteredJobs.filter((job) => job.type === jobType)
    }

    if (featured) {
      filteredJobs = filteredJobs.filter((job) => job.featured)
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(filteredJobs)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
