import { NextResponse } from "next/server"
import { createJob } from "@/lib/jobs"
import { createCompany } from "@/lib/companies"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log("Received job data:", body)

    // Create a test company if not provided
    let companyId = body.company_id
    if (!companyId) {
      const company = await createCompany({
        name: body.company_name || "Test Company",
        employer_id: body.employer_id || "test-employer-123",
        location: body.location || "Kathmandu",
        description: "A test company for job posting"
      })
      companyId = company.$id
    }

    const jobData = {
      title: body.title,
      description: body.description,
      requirements: body.requirements || [],
      skills: body.skills || [],
      location: body.location,
      job_type: body.job_type,
      experience_level: body.experience_level,
      salary_min: body.salary_min,
      salary_max: body.salary_max,
      is_featured: body.is_featured || false,
      is_urgent: body.is_urgent || false,
      company_id: companyId,
      employer_id: body.employer_id || "test-employer-123",
    }

    console.log("Creating job with data:", jobData)

    const job = await createJob(jobData)
    
    console.log("Job created successfully:", job.$id)

    return NextResponse.json({
      success: true,
      message: "Job posted successfully!",
      job: {
        id: job.$id,
        title: job.title,
        location: job.location
      }
    })
  } catch (error: any) {
    console.error("Error posting job:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to post job",
      error: error.message
    }, { status: 500 })
  }
} 