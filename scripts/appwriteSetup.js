"use server";

const { Client, Databases, Permission, Role } =require("appwrite")


// Initialize Appwrite client
const client = new Client()
const databases = new Databases(client)

// Configuration
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"
const APPWRITE_PROJECT_ID = "688b43a80014350eb447"
const APPWRITE_API_KEY = "standard_267e4099417dd2a27245cc2268b2adca5d0aa2cf562f5f632e6d80d60c393bcda57cbcd439e3cb90f02bc8492536e49482405a4a00f145e63f10884959ee62be093f90daff463a0a901180c033375e0c365b7e79f1ae2d02266f539068686061804d3c21251025f55cd7795d77b58d82a9fcbc89c5ab3cf69d4b86293291d6ba"// You need to create this API key

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
  console.error("❌ Missing required environment variables:")
  console.error("- NEXT_PUBLIC_APPWRITE_ENDPOINT")
  console.error("- NEXT_PUBLIC_APPWRITE_PROJECT_ID")
  console.error("- APPWRITE_API_KEY")
  process.exit(1)
}

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)
client.headers['X-Appwrite-Key'] = APPWRITE_API_KEY

// Collection IDs
const DATABASE_ID = "688b4bdf003dea4a5685"
const COLLECTIONS = {
  USERS: "users",
  COMPANIES: "companies",
  JOBS: "jobs",
  APPLICATIONS: "applications",
  SAVED_JOBS: "saved_jobs",
}

async function setupAppwrite() {
  try {
    console.log("🚀 Starting Appwrite setup...")

    // 1. Create Database
    console.log("📁 Creating database...")
    try {
      // await databases.create(DATABASE_ID, "")
      console.log("✅ Database created successfully")
    } catch (error) {
      if (error.code === 409) {
        console.log("ℹ️ Database already exists")
      } else {
        throw error
      }
    }

    // 2. Create Users Collection
    // console.log("👥 Creating Users collection...")
    // await createUsersCollection()

    // // 3. Create Companies Collection
    // console.log("🏢 Creating Companies collection...")
    // await createCompaniesCollection()

    // // 4. Create Jobs Collection
    // console.log("💼 Creating Jobs collection...")
    // await createJobsCollection()

    // // 5. Create Applications Collection
    // console.log("📝 Creating Applications collection...")
    // await createApplicationsCollection()

    // // 6. Create Saved Jobs Collection
    // console.log("❤️ Creating Saved Jobs collection...")
    // await createSavedJobsCollection()

    // // 7. Create Indexes
    // console.log("🔍 Creating indexes...")
    // await createIndexes()
    console.log("done");
    console.log("🎉 Appwrite setup completed successfully!")
    console.log("\n📋 Your environment variables:")
    console.log(`NEXT_PUBLIC_APPWRITE_DATABASE_ID=${DATABASE_ID}`)
    console.log(`NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=${COLLECTIONS.USERS}`)
    console.log(`NEXT_PUBLIC_APPWRITE_COMPANIES_COLLECTION_ID=${COLLECTIONS.COMPANIES}`)
    console.log(`NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID=${COLLECTIONS.JOBS}`)
    console.log(`NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID=${COLLECTIONS.APPLICATIONS}`)
    console.log(`NEXT_PUBLIC_APPWRITE_SAVED_JOBS_COLLECTION_ID=${COLLECTIONS.SAVED_JOBS}`)

  } catch (error) {
    console.error("❌ Setup failed:", error)
    process.exit(1)
  }

  createUsersCollection();
  createCompaniesCollection();
  createJobsCollection();
  createApplicationsCollection();
  createSavedJobsCollection();
  createIndexes();
  console.log("Setup complete");
  console.log("You can now run the app with `npm run dev`")
  console.log("Happy coding! 🎉")
}

async function createUsersCollection() {
  try {
    // Create collection

    // Wait a bit for collection to be ready
    await sleep(2000)

    // Create attributes
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "clerk_user_id", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "email", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "name", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "user_type", 50, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "avatar_url", 500, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "phone", 50, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "location", 255, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "bio", 1000, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "skills", 1000, false, undefined, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "company_name", 255, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "company_size", 100, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.USERS, "website_url", 500, false)

    console.log("✅ Users collection created")
  } catch (error) {
    if (error.code === 409) {
      console.log("ℹ️ Users collection already exists")
    } else {
      throw error
    }
  }
}

async function createCompaniesCollection() {
  try {
    // Create collection

    // Wait a bit for collection to be ready
    await sleep(2000)

    // Create attributes
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "name", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "description", 2000, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "industry", 100, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "size", 100, false)
    await sleep(1000)
    await databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "founded_year", false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "location", 255, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "website_url", 500, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "logo_url", 500, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.COMPANIES, "employer_id", 255, true)

    console.log("✅ Companies collection created")
  } catch (error) {
    if (error.code === 409) {
      console.log("ℹ️ Companies collection already exists")
    } else {
      throw error
    }
  }
}

async function createJobsCollection() {
  try {
    // Create collection

    // Wait a bit for collection to be ready
    await sleep(2000)

    // Create attributes
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "title", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "description", 5000, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "requirements", 2000, false, undefined, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "skills", 1000, true, undefined, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "location", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "job_type", 50, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "experience_level", 100, false)
    await sleep(1000)
    await databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.JOBS, "salary_min", false)
    await sleep(1000)
    await databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.JOBS, "salary_max", false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "salary_currency", 10, false, "NPR")
    await sleep(1000)
    await databases.createBooleanAttribute(DATABASE_ID, COLLECTIONS.JOBS, "is_featured", true, false)
    await sleep(1000)
    await databases.createBooleanAttribute(DATABASE_ID, COLLECTIONS.JOBS, "is_urgent", true, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "status", 50, true, "active")
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "company_id", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.JOBS, "employer_id", 255, true)
    await sleep(1000)
    await databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.JOBS, "views_count", true, 0)
    await sleep(1000)
    await databases.createIntegerAttribute(DATABASE_ID, COLLECTIONS.JOBS, "applications_count", true, 0)

    console.log("✅ Jobs collection created")
  } catch (error) {
    if (error.code === 409) {
      console.log("ℹ️ Jobs collection already exists")
    } else {
      throw error
    }
  }
}

async function createApplicationsCollection() {
  try {
    // Create collection

    // Wait a bit for collection to be ready
    await sleep(2000)

    // Create attributes
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.APPLICATIONS, "job_id", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.APPLICATIONS, "applicant_id", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.APPLICATIONS, "cover_letter", 2000, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.APPLICATIONS, "resume_url", 500, false)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.APPLICATIONS, "status", 50, true, "pending")

    console.log("✅ Applications collection created")
  } catch (error) {
    if (error.code === 409) {
      console.log("ℹ️ Applications collection already exists")
    } else {
      throw error
    }
  }
}

async function createSavedJobsCollection() {
  try {
    // Create collection

    // Wait a bit for collection to be ready
    await sleep(2000)

    // Create attributes
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.SAVED_JOBS, "job_id", 255, true)
    await sleep(1000)
    await databases.createStringAttribute(DATABASE_ID, COLLECTIONS.SAVED_JOBS, "user_id", 255, true)

    console.log("✅ Saved Jobs collection created")
  } catch (error) {
    console.log(error)
    if (error.code === 409) {
      console.log("ℹ️ Saved Jobs collection already exists")
    } else {
      throw error
    }
  }
}

async function createIndexes() {
  try {
    console.log("⏳ Waiting for attributes to be ready...")
    // Wait longer for all attributes to be ready
    await sleep(10000)

    // Users collection indexes
    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.USERS, "clerk_user_lookup", "unique", ["clerk_user_id"])
      console.log("✅ Users clerk_user_lookup index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Users index creation failed:", error.message)
    }

    await sleep(2000)

    // Jobs collection indexes
    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.JOBS, "title_search", "fulltext", ["title"])
      console.log("✅ Jobs title_search index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Jobs title index creation failed:", error.message)
    }

    await sleep(2000)

    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.JOBS, "location_search", "fulltext", ["location"])
      console.log("✅ Jobs location_search index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Jobs location index creation failed:", error.message)
    }

    await sleep(2000)

    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.JOBS, "status_active", "key", ["status"])
      console.log("✅ Jobs status_active index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Jobs status index creation failed:", error.message)
    }

    await sleep(2000)

    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.JOBS, "featured_jobs", "key", ["is_featured"])
      console.log("✅ Jobs featured_jobs index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Jobs featured index creation failed:", error.message)
    }

    await sleep(2000)

    // Applications collection indexes
    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.APPLICATIONS, "job_applicant", "unique", [
        "job_id",
        "applicant_id",
      ])
      console.log("✅ Applications job_applicant index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Applications index creation failed:", error.message)
    }

    await sleep(2000)

    // Saved Jobs collection indexes
    try {
      await databases.createIndex(DATABASE_ID, COLLECTIONS.SAVED_JOBS, "user_job", "unique", ["user_id", "job_id"])
      console.log("✅ Saved Jobs user_job index created")
    } catch (error) {
      if (error.code !== 409) console.log("⚠️ Saved Jobs index creation failed:", error.message)
    }
  } catch (error) {
    console.log("⚠️ Some indexes may have failed to create, but that's okay")
  }
}

// Helper function to sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Run the setup
setupAppwrite().catch((error) => {
  console.error("❌ Setup failed:", error)
  process.exit(1)
})
// export {setupAppwrite};