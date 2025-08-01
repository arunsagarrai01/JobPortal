import { NextResponse } from "next/server"
import { databases, DATABASE_ID, JOBS_COLLECTION_ID, COMPANIES_COLLECTION_ID } from "@/lib/appwrite"

export async function GET() {
  try {
    console.log("Testing permissions and creating test data...")
    
    // First, let's try to create a test company
    let testCompanyId = "test-company-123"
    try {
      const company = await databases.createDocument(
        DATABASE_ID, 
        COMPANIES_COLLECTION_ID, 
        "unique()",
        {
          name: "Test Company",
          employer_id: "test-employer-123",
          description: "A test company for integration",
          location: "Kathmandu"
        }
      )
      testCompanyId = company.$id
      console.log("Created test company:", testCompanyId)
    } catch (error: any) {
      console.log("Company creation failed:", error.message)
      // Continue with existing test company ID
    }

    // Now try to create a test job
    try {
      const job = await databases.createDocument(
        DATABASE_ID,
        JOBS_COLLECTION_ID,
        "unique()",
        {
          title: "Test Developer Position",
          description: "This is a test job posting to verify the integration works correctly.",
          location: "Kathmandu",
          job_type: "full-time",
          skills: ["JavaScript", "React", "Node.js"],
          company_id: testCompanyId,
          employer_id: "test-employer-123",
          status: "active",
          experience_level: "entry-level",
          salary_min: 50000,
          salary_max: 80000,
          is_featured: false,
          is_urgent: false
        }
      )
      
      return NextResponse.json({
        success: true,
        message: "Test job created successfully",
        jobId: job.$id,
        companyId: testCompanyId
      })
    } catch (error: any) {
      console.error("Job creation error:", error)
      return NextResponse.json({
        success: false,
        message: "Failed to create test job",
        error: error.message,
        errorCode: error.code,
        suggestions: [
          "Check if the jobs collection has the correct attributes",
          "Verify that the API key has write permissions",
          "Make sure all required fields are provided"
        ]
      }, { status: 500 })
    }
    
  } catch (error: any) {
    console.error("General error:", error)
    return NextResponse.json({
      success: false,
      message: "General error occurred",
      error: error.message
    }, { status: 500 })
  }
} 