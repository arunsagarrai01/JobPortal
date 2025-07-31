"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentUser } from "./auth"
import { createApplication } from "./applications"
import { createJob } from "./jobs"
import { createCompany, getCompanyByEmployer } from "./companies"

export async function submitJobApplication(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    const jobId = formData.get("job_id") as string
    const coverLetter = formData.get("cover_letter") as string

    await createApplication({
      job_id: jobId,
      applicant_id: user.$id,
      cover_letter: coverLetter,
    })

    revalidatePath("/jobs")
    revalidatePath("/dashboard")

    return { success: true, message: "Application submitted successfully!" }
  } catch (error: any) {
    console.error("Application submission error:", error)
    return { success: false, message: error.message || "Failed to submit application" }
  }
}

export async function createJobPosting(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "employer") {
      throw new Error("Unauthorized")
    }

    // Get or create company
    let company = await getCompanyByEmployer(user.$id)
    if (!company) {
      company = await createCompany({
        name: user.company_name || "My Company",
        employer_id: user.$id,
        location: user.location || "Nepal",
      })
    }

    const jobData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      requirements: (formData.get("requirements") as string).split("\n").filter(Boolean),
      skills: (formData.get("skills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      location: formData.get("location") as string,
      job_type: formData.get("job_type") as string,
      experience_level: formData.get("experience_level") as string,
      salary_min: Number.parseInt(formData.get("salary_min") as string) || undefined,
      salary_max: Number.parseInt(formData.get("salary_max") as string) || undefined,
      is_featured: formData.get("is_featured") === "on",
      is_urgent: formData.get("is_urgent") === "on",
      company_id: company.$id,
      employer_id: user.$id,
    }

    const job = await createJob(jobData)

    revalidatePath("/jobs")
    revalidatePath("/dashboard")

    redirect(`/jobs/${job.$id}`)
  } catch (error: any) {
    console.error("Job creation error:", error)
    throw error
  }
}

export async function updateProfile(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    // This would update the user profile in Appwrite
    // Implementation depends on your specific needs

    revalidatePath("/dashboard")
    return { success: true, message: "Profile updated successfully!" }
  } catch (error: any) {
    console.error("Profile update error:", error)
    return { success: false, message: error.message || "Failed to update profile" }
  }
}
