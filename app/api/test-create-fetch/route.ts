import { NextResponse } from "next/server"
import { databases, DATABASE_ID, JOBS_COLLECTION_ID, COMPANIES_COLLECTION_ID } from "@/lib/appwrite"

export async function GET() {
  try {
    console.log("Test: Creating and fetching job...")
    
    // Create a test company
    const company = await databases.createDocument(
      DATABASE_ID, 
      COMPANIES_COLLECTION_ID, 
      "unique()",
      {
        name: "Debug Company",
        employer_id: "debug-employer-123",
        description: "A debug company",
        location: "Kathmandu"
      }
    )
    
    console.log("Created company:", company.$id)
    
    // Create a test job
    const job = await databases.createDocument(
      DATABASE_ID,
      JOBS_COLLECTION_ID,
      "unique()",
      {
        title: "Debug Developer Position",
        description: "This is a debug job posting.",
        location: "Kathmandu",
        job_type: "full-time",
        skills: ["JavaScript", "React"],
        company_id: company.$id,
        employer_id: "debug-employer-123",
        status: "active",
        experience_level: "entry-level",
        salary_min: 50000,
        salary_max: 80000,
        is_featured: false,
        is_urgent: false
      }
    )
    
    console.log("Created job:", job.$id)
    
    // Immediately try to fetch the job
    const fetchedJob = await databases.getDocument(DATABASE_ID, JOBS_COLLECTION_ID, job.$id)
    console.log("Fetched job:", fetchedJob.$id)
    
    // Try to list all jobs
    const allJobs = await databases.listDocuments(DATABASE_ID, JOBS_COLLECTION_ID, [])
    console.log("All jobs count:", allJobs.documents.length)
    
    return NextResponse.json({
      success: true,
      createdJob: {
        id: job.$id,
        title: job.title,
        status: job.status
      },
      fetchedJob: {
        id: fetchedJob.$id,
        title: fetchedJob.title,
        status: fetchedJob.status
      },
      allJobsCount: allJobs.documents.length,
      allJobs: allJobs.documents.map(j => ({ id: j.$id, title: j.title, status: j.status }))
    })
    
  } catch (error: any) {
    console.error("Test error:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      errorCode: error.code
    }, { status: 500 })
  }
} 