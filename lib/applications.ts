import { databases, DATABASE_ID, APPLICATIONS_COLLECTION_ID, JOBS_COLLECTION_ID, Query } from "./appwrite"

export interface Application {
  $id: string
  job_id: string
  applicant_id: string
  cover_letter?: string
  resume_url?: string
  status: "pending" | "reviewing" | "shortlisted" | "interviewed" | "rejected" | "accepted"
  $createdAt: string
  $updatedAt: string
}

export async function createApplication(applicationData: {
  job_id: string
  applicant_id: string
  cover_letter?: string
  resume_url?: string
}) {
  try {
    // Check if application already exists
    const existingApplication = await databases.listDocuments(DATABASE_ID, APPLICATIONS_COLLECTION_ID, [
      Query.equal("job_id", applicationData.job_id),
      Query.equal("applicant_id", applicationData.applicant_id),
    ])

    if (existingApplication.documents.length > 0) {
      throw new Error("You have already applied to this job")
    }

    const application = await databases.createDocument(DATABASE_ID, APPLICATIONS_COLLECTION_ID, "unique()", {
      ...applicationData,
      status: "pending",
    })

    // Increment application count on job
    const job = await databases.getDocument(DATABASE_ID, JOBS_COLLECTION_ID, applicationData.job_id)
    await databases.updateDocument(DATABASE_ID, JOBS_COLLECTION_ID, applicationData.job_id, {
      applications_count: job.applications_count + 1,
    })

    return application as Application
  } catch (error) {
    console.error("Error creating application:", error)
    throw error
  }
}

export async function getUserApplications(userId: string) {
  try {
    const response = await databases.listDocuments(DATABASE_ID, APPLICATIONS_COLLECTION_ID, [
      Query.equal("applicant_id", userId),
      Query.orderDesc("$createdAt"),
    ])

    return response.documents as Application[]
  } catch (error) {
    console.error("Error fetching user applications:", error)
    return []
  }
}
