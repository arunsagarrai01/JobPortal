import { NextResponse } from "next/server"
import { createJob } from "@/lib/jobs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Create a test job
    const jobData = {
      title: body.title || "Test Job",
      description: body.description || "This is a test job posting",
      requirements: body.requirements || ["Test requirement"],
      skills: body.skills || ["Test skill"],
      location: body.location || "Kathmandu",
      job_type: body.job_type || "full-time",
      experience_level: body.experience_level || "entry-level",
      salary_min: body.salary_min || 50000,
      salary_max: body.salary_max || 80000,
      is_featured: body.is_featured || false,
      is_urgent: body.is_urgent || false,
      company_id: "test-company-id", // You'll need to create a test company first
      employer_id: "test-employer-id", // You'll need to create a test employer first
    }

    const job = await createJob(jobData)
    
    return NextResponse.json({
      success: true,
      message: "Test job created successfully",
      job: job
    })
  } catch (error: any) {
    console.error("Test job creation error:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to create test job",
      error: error.message
    }, { status: 500 })
  }
} 