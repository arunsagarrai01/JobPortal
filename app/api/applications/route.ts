import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { databases, DATABASE_ID, APPLICATIONS_COLLECTION_ID, USERS_COLLECTION_ID, Query } from "@/lib/appwrite"

export async function GET() {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated"
      }, { status: 401 })
    }

    // Get user from Appwrite
    const userResponse = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    if (userResponse.documents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 })
    }

    const user = userResponse.documents[0]

    // Get applications for this user
    const applications = await databases.listDocuments(DATABASE_ID, APPLICATIONS_COLLECTION_ID, [
      Query.equal("applicant_id", user.$id),
    ])

    return NextResponse.json({
      success: true,
      applications: applications.documents
    })
  } catch (error: any) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated"
      }, { status: 401 })
    }

    const body = await request.json()
    const { job_id, cover_letter, resume_url } = body

    // Get user from Appwrite
    const userResponse = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    if (userResponse.documents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 })
    }

    const user = userResponse.documents[0]

    // Check if already applied
    const existingApplication = await databases.listDocuments(DATABASE_ID, APPLICATIONS_COLLECTION_ID, [
      Query.equal("job_id", job_id),
      Query.equal("applicant_id", user.$id),
    ])

    if (existingApplication.documents.length > 0) {
      return NextResponse.json({
        success: false,
        message: "You have already applied for this job"
      }, { status: 400 })
    }

    // Create application
    const application = await databases.createDocument(
      DATABASE_ID,
      APPLICATIONS_COLLECTION_ID,
      "unique()",
      {
        job_id,
        applicant_id: user.$id,
        status: "pending",
        cover_letter: cover_letter || "",
        resume_url: resume_url || "",
      }
    )

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application
    })
  } catch (error: any) {
    console.error("Error submitting application:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to submit application",
      error: error.message
    }, { status: 500 })
  }
} 