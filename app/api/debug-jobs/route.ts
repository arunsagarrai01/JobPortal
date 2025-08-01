import { NextResponse } from "next/server"
import { databases, DATABASE_ID, JOBS_COLLECTION_ID } from "@/lib/appwrite"

export async function GET() {
  try {
    console.log("Debug: Fetching all jobs without filters...")
    
    // Get all jobs without any filters
    const response = await databases.listDocuments(DATABASE_ID, JOBS_COLLECTION_ID, [])
    
    console.log("Debug: Found jobs:", response.documents.length)
    
    const jobs = response.documents.map(job => ({
      id: job.$id,
      title: job.title,
      status: job.status,
      company_id: job.company_id,
      employer_id: job.employer_id,
      created: job.$createdAt
    }))

    return NextResponse.json({
      success: true,
      jobs: jobs,
      count: jobs.length,
      rawJobs: response.documents
    })
  } catch (error: any) {
    console.error("Debug: Error fetching jobs:", error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
} 