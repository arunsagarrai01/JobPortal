import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { databases, DATABASE_ID, SAVED_JOBS_COLLECTION_ID, USERS_COLLECTION_ID, Query } from "@/lib/appwrite"

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

    // Get saved jobs for this user
    const savedJobs = await databases.listDocuments(DATABASE_ID, SAVED_JOBS_COLLECTION_ID, [
      Query.equal("user_id", user.$id),
    ])

    return NextResponse.json({
      success: true,
      savedJobs: savedJobs.documents
    })
  } catch (error: any) {
    console.error("Error fetching saved jobs:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch saved jobs",
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
    const { job_id } = body

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

    // Check if already saved
    const existingSavedJob = await databases.listDocuments(DATABASE_ID, SAVED_JOBS_COLLECTION_ID, [
      Query.equal("job_id", job_id),
      Query.equal("user_id", user.$id),
    ])

    if (existingSavedJob.documents.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Job is already saved"
      }, { status: 400 })
    }

    // Save job
    const savedJob = await databases.createDocument(
      DATABASE_ID,
      SAVED_JOBS_COLLECTION_ID,
      "unique()",
      {
        job_id,
        user_id: user.$id,
      }
    )

    return NextResponse.json({
      success: true,
      message: "Job saved successfully",
      savedJob
    })
  } catch (error: any) {
    console.error("Error saving job:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to save job",
      error: error.message
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated"
      }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const job_id = searchParams.get("job_id")

    if (!job_id) {
      return NextResponse.json({
        success: false,
        message: "Job ID is required"
      }, { status: 400 })
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

    // Find saved job
    const savedJob = await databases.listDocuments(DATABASE_ID, SAVED_JOBS_COLLECTION_ID, [
      Query.equal("job_id", job_id),
      Query.equal("user_id", user.$id),
    ])

    if (savedJob.documents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Saved job not found"
      }, { status: 404 })
    }

    // Delete saved job
    await databases.deleteDocument(
      DATABASE_ID,
      SAVED_JOBS_COLLECTION_ID,
      savedJob.documents[0].$id
    )

    return NextResponse.json({
      success: true,
      message: "Job removed from saved jobs"
    })
  } catch (error: any) {
    console.error("Error removing saved job:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to remove saved job",
      error: error.message
    }, { status: 500 })
  }
} 