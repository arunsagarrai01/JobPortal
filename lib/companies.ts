import { databases, DATABASE_ID, COMPANIES_COLLECTION_ID, Query } from "./appwrite"
import type { Company } from "./jobs"

export async function createCompany(companyData: {
  name: string
  description?: string
  industry?: string
  size?: string
  founded_year?: number
  location?: string
  website_url?: string
  logo_url?: string
  employer_id: string
}) {
  try {
    const company = await databases.createDocument(DATABASE_ID, COMPANIES_COLLECTION_ID, "unique()", companyData)

    return company as Company
  } catch (error) {
    console.error("Error creating company:", error)
    throw error
  }
}

export async function getCompanyByEmployer(employerId: string): Promise<Company | null> {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COMPANIES_COLLECTION_ID, [
      Query.equal("employer_id", employerId),
    ])

    if (response.documents.length > 0) {
      return response.documents[0] as Company
    }

    return null
  } catch (error) {
    console.error("Error fetching company:", error)
    return null
  }
}
