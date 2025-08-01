import { NextResponse } from "next/server"
import { databases, DATABASE_ID, JOBS_COLLECTION_ID } from "@/lib/appwrite"

export async function GET() {
  try {
    console.log("Testing Appwrite connection...")
    console.log("Database ID:", DATABASE_ID)
    console.log("Jobs Collection ID:", JOBS_COLLECTION_ID)
    
    // Test the connection by trying to list documents
    const response = await databases.listDocuments(DATABASE_ID, JOBS_COLLECTION_ID, [])
    
    return NextResponse.json({
      success: true,
      message: "Appwrite connection successful",
      jobsCount: response.documents.length,
      databaseId: DATABASE_ID,
      collectionId: JOBS_COLLECTION_ID
    })
  } catch (error: any) {
    console.error("Appwrite connection error:", error)
    return NextResponse.json({
      success: false,
      message: "Appwrite connection failed",
      error: error.message,
      errorCode: error.code,
      databaseId: DATABASE_ID,
      collectionId: JOBS_COLLECTION_ID
    }, { status: 500 })
  }
} 