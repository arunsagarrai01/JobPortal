import { databases, DATABASE_ID, JOBS_COLLECTION_ID, COMPANIES_COLLECTION_ID, Query } from "./appwrite"

export interface Job {
  $id: string
  title: string
  description: string
  requirements?: string[]
  skills: string[]
  location: string
  job_type: "full-time" | "part-time" | "contract" | "internship" | "remote"
  experience_level?: string
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  is_featured: boolean
  is_urgent: boolean
  status: "active" | "paused" | "closed"
  company_id: string
  employer_id: string
  views_count: number
  applications_count: number
  $createdAt: string
  $updatedAt: string
  company?: Company
}

export interface Company {
  $id: string
  name: string
  description?: string
  industry?: string
  size?: string
  founded_year?: number
  location?: string
  website_url?: string
  logo_url?: string
  employer_id: string
  $createdAt: string
  $updatedAt: string
}

// Test jobs as fallback only
const TEST_JOBS: Job[] = [
  {
    $id: "test-job-1",
    title: "Frontend Developer",
    description: "We are looking for a talented frontend developer to join our team. You will be responsible for building user-friendly web applications using React and TypeScript.",
    requirements: ["React experience", "TypeScript knowledge", "Good communication skills"],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
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
    description: "Join our backend team to build scalable APIs and microservices. Experience with Node.js and databases required.",
    requirements: ["Node.js experience", "Database design", "API development"],
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
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

export async function getJobs(filters?: {
  search?: string
  location?: string
  jobType?: string
  skills?: string[]
  featured?: boolean
  limit?: number
}) {
  try {
    console.log("Fetching jobs with filters:", filters)
    
    // Try to get real jobs from database first
    let allJobs: Job[] = []
    
    try {
      console.log("Attempting to fetch jobs from database...")
      const response = await databases.listDocuments(DATABASE_ID, JOBS_COLLECTION_ID, [])
      console.log("Database response:", response.documents.length, "jobs found")
      
      if (response.documents.length > 0) {
        console.log("Found", response.documents.length, "real jobs in database")
        
        // Get company details for real jobs
        const realJobsWithCompanies = await Promise.all(
          response.documents.map(async (job: any) => {
            try {
              const company = await databases.getDocument(DATABASE_ID, COMPANIES_COLLECTION_ID, job.company_id)
              return { ...job, company } as unknown as Job
            } catch (error) {
              console.log(`Error fetching company ${job.company_id}:`, error)
              return { ...job, company: null } as Job
            }
          }),
        )
        
        allJobs = realJobsWithCompanies
      } else {
        console.log("No real jobs found in database")
      }
    } catch (error) {
      console.log("Database fetch failed:", error)
    }

    // If no real jobs, add test jobs
    if (allJobs.length === 0) {
      console.log("Adding test jobs as fallback")
      allJobs = [...TEST_JOBS]
    }

    console.log("Total jobs before filtering:", allJobs.length)

    // Filter jobs based on criteria
    let filteredJobs = allJobs.filter((job: any) => {
      // Always filter by active status
      if (job.status !== "active") return false
      
      // Apply search filter
      if (filters?.search && !job.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      
      // Apply location filter
      if (filters?.location && filters.location !== "All Locations" && 
          !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      
      // Apply job type filter
      if (filters?.jobType && filters.jobType !== "All Categories" && 
          job.job_type !== filters.jobType) {
        return false
      }
      
      // Apply featured filter
      if (filters?.featured && !job.is_featured) {
        return false
      }
      
      return true
    })

    // Apply limit
    if (filters?.limit) {
      filteredJobs = filteredJobs.slice(0, filters.limit)
    }

    // Sort by creation date (newest first)
    filteredJobs.sort((a: any, b: any) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())

    console.log("Returning", filteredJobs.length, "filtered jobs")
    return filteredJobs
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return TEST_JOBS // Fallback to test jobs
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    // First try to get from database
    try {
      const job = await databases.getDocument(DATABASE_ID, JOBS_COLLECTION_ID, id)
      const company = await databases.getDocument(DATABASE_ID, COMPANIES_COLLECTION_ID, job.company_id)
      
      // Increment view count
      await databases.updateDocument(DATABASE_ID, JOBS_COLLECTION_ID, id, { views_count: job.views_count + 1 })
      
      return { ...job, company } as unknown as Job
    } catch (error) {
      console.log("Job not found in database, checking test jobs")
    }
    
    // If not in database, check test jobs
    const testJob = TEST_JOBS.find(job => job.$id === id)
    return testJob || null
  } catch (error) {
    console.error("Error fetching job:", error)
    return null
  }
}

export async function createJob(jobData: {
  title: string
  description: string
  requirements: string[]
  skills: string[]
  location: string
  job_type: string
  experience_level?: string
  salary_min?: number
  salary_max?: number
  is_featured?: boolean
  is_urgent?: boolean
  company_id: string
  employer_id: string
}) {
  try {
    console.log("Creating job with data:", jobData)
    
    const job = await databases.createDocument(DATABASE_ID, JOBS_COLLECTION_ID, "unique()", {
      ...jobData,
      status: "active",
      views_count: 0,
      applications_count: 0,
      salary_currency: "NPR",
    })

    console.log("Job created successfully:", job.$id)
    return job as unknown as Job
  } catch (error) {
    console.error("Error creating job:", error)
    throw error
  }
}

export async function getFeaturedJobs(limit = 6) {
  return getJobs({ featured: true, limit })
}
