import { Client, Account, Databases, Storage, Query } from "appwrite"

const client = new Client()

client.setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("688b43a80014350eb447")

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
export const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!
export const COMPANIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COMPANIES_COLLECTION_ID!
export const JOBS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID!
export const APPLICATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID!
export const SAVED_JOBS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SAVED_JOBS_COLLECTION_ID!

export { Query }
export default client
