import { currentUser } from "@clerk/nextjs/server"
import { databases, DATABASE_ID, USERS_COLLECTION_ID, Query } from "./appwrite"

export interface User {
  $id: string
  clerk_user_id: string
  email: string
  name: string
  user_type: "seeker" | "employer"
  avatar_url?: string
  phone?: string
  location?: string
  bio?: string
  skills?: string[]
  company_name?: string
  company_size?: string
  website_url?: string
  $createdAt: string
  $updatedAt: string
}

export async function getCurrentUser(): Promise<User | null> {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  try {
    const response = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    if (response.documents.length > 0) {
      return response.documents[0] as User
    }

    return null
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function createOrUpdateUser(clerkUser: any, userType: "seeker" | "employer") {
  try {
    const existingUser = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("clerk_user_id", clerkUser.id),
    ])

    const userData = {
      clerk_user_id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      user_type: userType,
      avatar_url: clerkUser.imageUrl || null,
    }

    if (existingUser.documents.length > 0) {
      // Update existing user
      const updatedUser = await databases.updateDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        existingUser.documents[0].$id,
        userData,
      )
      return updatedUser as User
    } else {
      // Create new user
      const newUser = await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, "unique()", userData)
      return newUser as User
    }
  } catch (error) {
    console.error("Error creating/updating user:", error)
    throw error
  }
}
