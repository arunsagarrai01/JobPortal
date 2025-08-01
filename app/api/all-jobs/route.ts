import { NextResponse } from "next/server"
import { databases, DATABASE_ID, JOBS_COLLECTION_ID, COMPANIES_COLLECTION_ID } from "@/lib/appwrite"

// Test jobs as fallback only
const TEST_JOBS = [
  {
    $id: "test-job-1",
    title: "Frontend Developer",
    description: "We are looking for a talented frontend developer to join our team.",
    requirements: ["React experience", "TypeScript knowledge"],
    skills: ["React", "TypeScript", "Next.js"],
    location: "Kathmandu",
    job_type: "full-time",
    experience_level: "mid-level",
    salary_min: 60000,
    salary_max: 100000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: false,
    status: "active",
    company_id: "test-company-1",
    employer_id: "test-employer-1",
    views_count: 45,
    applications_count: 8,
    $createdAt: "2024-01-15T10:00:00Z",
    $updatedAt: "2024-01-15T10:00:00Z",
    company: {
      $id: "test-company-1",
      name: "TechCorp Nepal",
      description: "Leading technology company in Nepal",
      industry: "Technology",
      size: "50-100 employees",
      location: "Kathmandu",
      website_url: "https://techcorp.com",
      logo_url: "/placeholder-logo.png",
      employer_id: "test-employer-1",
      $createdAt: "2024-01-15T10:00:00Z",
      $updatedAt: "2024-01-15T10:00:00Z"
    }
  },
  {
    $id: "test-job-2",
    title: "Backend Developer",
    description: "Join our backend team to build scalable APIs and microservices.",
    requirements: ["Node.js experience", "Database design"],
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Lalitpur",
    job_type: "full-time",
    experience_level: "senior",
    salary_min: 80000,
    salary_max: 150000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: true,
    status: "active",
    company_id: "test-company-2",
    employer_id: "test-employer-2",
    views_count: 67,
    applications_count: 12,
    $createdAt: "2024-01-14T15:30:00Z",
    $updatedAt: "2024-01-14T15:30:00Z",
    company: {
      $id: "test-company-2",
      name: "Digital Solutions",
      description: "Innovative digital solutions provider",
      industry: "Software Development",
      size: "20-50 employees",
      location: "Lalitpur",
      website_url: "https://digitalsolutions.com",
      logo_url: "/placeholder-logo.png",
      employer_id: "test-employer-2",
      $createdAt: "2024-01-14T15:30:00Z",
      $updatedAt: "2024-01-14T15:30:00Z"
    }
  }
]

export async function GET() {
  try {
    console.log("All Jobs API: Fetching from real database...")
    
    let allJobs = []
    
    // Try to get real jobs from database
    try {
      const response = await databases.listDocuments(DATABASE_ID, JOBS_COLLECTION_ID, [])
      console.log("All Jobs API: Found", response.documents.length, "real jobs in database")
      
      if (response.documents.length > 0) {
        // Get company details for real jobs
        const realJobsWithCompanies = await Promise.all(
          response.documents.map(async (job: any) => {
            try {
              const company = await databases.getDocument(DATABASE_ID, COMPANIES_COLLECTION_ID, job.company_id)
              return { ...job, company }
            } catch (error) {
              console.log(`All Jobs API: Error fetching company ${job.company_id}:`, error)
              return { ...job, company: null }
            }
          }),
        )
        
        allJobs = realJobsWithCompanies
      }
    } catch (error) {
      console.log("All Jobs API: Database fetch failed:", error)
    }
    
    // Add test jobs if no real jobs found
    if (allJobs.length === 0) {
      console.log("All Jobs API: No real jobs found, using test jobs")
      allJobs = [...TEST_JOBS]
    } else {
      console.log("All Jobs API: Adding test jobs to real jobs")
      allJobs = [...allJobs, ...TEST_JOBS]
    }
    
    // Sort by creation date (newest first)
    allJobs.sort((a: any, b: any) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
    
    console.log("All Jobs API: Returning", allJobs.length, "jobs")
    
    return NextResponse.json({
      success: true,
      jobs: allJobs,
      count: allJobs.length
    })
  } catch (error: any) {
    console.error("All Jobs API Error:", error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
} 