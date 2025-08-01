import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { databases, DATABASE_ID, USERS_COLLECTION_ID, Query } from "@/lib/appwrite"
import type { User } from "@/lib/auth"

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
    const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    if (response.documents.length > 0) {
      return NextResponse.json({
        success: true,
        user: response.documents[0] as User
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "User not found in database"
      }, { status: 404 })
    }
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch user",
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
    const { userType, ...userData } = body

    // Check if user already exists
    const existingUser = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    const userDataToSave = {
      clerk_user_id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      user_type: userType || "seeker",
      avatar_url: clerkUser.imageUrl || null,
      ...userData
    }

    let user: User

    if (existingUser.documents.length > 0) {
      // Update existing user
      user = await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        existingUser.documents[0].$id,
        userDataToSave,
      ) as User
    } else {
      // Create new user
      user = await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        "unique()",
        userDataToSave
      ) as User
    }

    return NextResponse.json({
      success: true,
      message: "User created/updated successfully",
      user
    })
  } catch (error: any) {
    console.error("Error creating/updating user:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to create/update user",
      error: error.message
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated"
      }, { status: 401 })
    }

    const body = await request.json()

    // Get existing user
    const existingUser = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    if (existingUser.documents.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 })
    }

    // Update user
    const updatedUser = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      existingUser.documents[0].$id,
      body
    ) as User

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    })
  } catch (error: any) {
    console.error("Error updating user:", error)
    return NextResponse.json({
      success: false,
      message: "Failed to update user",
      error: error.message
    }, { status: 500 })
  }
} 