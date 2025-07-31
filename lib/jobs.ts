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

export async function getJobs(filters?: {
  search?: string
  location?: string
  jobType?: string
  skills?: string[]
  featured?: boolean
  limit?: number
}) {
  try {
    const queries = [Query.equal("status", "active")]

    if (filters?.search) {
      queries.push(Query.search("title", filters.search))
    }

    if (filters?.location && filters.location !== "All Locations") {
      queries.push(Query.search("location", filters.location))
    }

    if (filters?.jobType && filters.jobType !== "All Categories") {
      queries.push(Query.equal("job_type", filters.jobType))
    }

    if (filters?.featured) {
      queries.push(Query.equal("is_featured", true))
    }

    if (filters?.limit) {
      queries.push(Query.limit(filters.limit))
    }

    queries.push(Query.orderDesc("$createdAt"))

    const response = await databases.listDocuments(DATABASE_ID, JOBS_COLLECTION_ID, queries)

    // Get company details for each job
    const jobsWithCompanies = await Promise.all(
      response.documents.map(async (job: any) => {
        try {
          const company = await databases.getDocument(DATABASE_ID, COMPANIES_COLLECTION_ID, job.company_id)
          return { ...job, company } as Job
        } catch (error) {
          return { ...job, company: null } as Job
        }
      }),
    )

    return jobsWithCompanies
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const job = await databases.getDocument(DATABASE_ID, JOBS_COLLECTION_ID, id)

    // Get company details
    const company = await databases.getDocument(DATABASE_ID, COMPANIES_COLLECTION_ID, job.company_id)

    // Increment view count
    await databases.updateDocument(DATABASE_ID, JOBS_COLLECTION_ID, id, { views_count: job.views_count + 1 })

    return { ...job, company } as Job
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
    const job = await databases.createDocument(DATABASE_ID, JOBS_COLLECTION_ID, "unique()", {
      ...jobData,
      status: "active",
      views_count: 0,
      applications_count: 0,
      salary_currency: "NPR",
    })

    return job as Job
  } catch (error) {
    console.error("Error creating job:", error)
    throw error
  }
}

export async function getFeaturedJobs(limit = 6) {
  return getJobs({ featured: true, limit })
}
