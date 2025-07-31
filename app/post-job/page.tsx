import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import JobPostingForm from "@/components/JobPostingForm"

export default async function PostJobPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.user_type !== "employer") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Post a New Job</h1>
          <p className="text-gray-400 text-lg">Find the perfect candidate for your team</p>
        </div>

        <JobPostingForm />
      </div>
    </div>
  )
}
