export interface User {
  id: string
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
  created_at: Date
  updated_at: Date
}

export interface Company {
  id: string
  name: string
  description?: string
  industry?: string
  size?: string
  founded_year?: number
  location?: string
  website_url?: string
  logo_url?: string
  employer_id: string
}

export interface Job {
  id: string
  title: string
  description: string
  requirements?: string[]
  skills: string[]
  location: string
  job_type: "full-time" | "part-time" | "contract" | "internship" | "remote"
  experience_level?: string
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  is_featured: boolean
  is_urgent: boolean
  status: "active" | "paused" | "closed"
  company_id: string
  employer_id: string
  views_count: number
  applications_count: number
  created_at: Date
  updated_at: Date
  company?: Company
  postedAt?: string
}

export interface Application {
  id: string
  job_id: string
  applicant_id: string
  cover_letter?: string
  resume_url?: string
  status: "pending" | "reviewing" | "shortlisted" | "interviewed" | "rejected" | "accepted"
  applied_at: Date
  updated_at: Date
  job?: Job
  applicant?: User
}

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Nepal",
    description: "Leading technology company in Nepal focusing on innovative software solutions",
    industry: "Technology",
    size: "100-500 employees",
    founded_year: 2018,
    location: "Kathmandu, Nepal",
    website_url: "https://techcorp.com.np",
    logo_url: "/placeholder.svg?height=60&width=60&text=TC",
    employer_id: "emp1",
  },
  {
    id: "2",
    name: "GrowthHub",
    description: "Digital marketing agency helping businesses grow online",
    industry: "Marketing",
    size: "50-100 employees",
    founded_year: 2020,
    location: "Pokhara, Nepal",
    website_url: "https://growthhub.com.np",
    logo_url: "/placeholder.svg?height=60&width=60&text=GH",
    employer_id: "emp2",
  },
  {
    id: "3",
    name: "DesignStudio",
    description: "Creative design agency specializing in UI/UX and branding",
    industry: "Design",
    size: "20-50 employees",
    founded_year: 2019,
    location: "Lalitpur, Nepal",
    website_url: "https://designstudio.com.np",
    logo_url: "/placeholder.svg?height=60&width=60&text=DS",
    employer_id: "emp3",
  },
  {
    id: "4",
    name: "DataFlow Analytics",
    description: "Data analytics and business intelligence solutions",
    industry: "Analytics",
    size: "50-100 employees",
    founded_year: 2017,
    location: "Kathmandu, Nepal",
    website_url: "https://dataflow.com.np",
    logo_url: "/placeholder.svg?height=60&width=60&text=DF",
    employer_id: "emp4",
  },
  {
    id: "5",
    name: "AppWorks",
    description: "Mobile app development company creating innovative solutions",
    industry: "Technology",
    size: "30-50 employees",
    founded_year: 2021,
    location: "Bhaktapur, Nepal",
    website_url: "https://appworks.com.np",
    logo_url: "/placeholder.svg?height=60&width=60&text=AW",
    employer_id: "emp5",
  },
  {
    id: "6",
    name: "EduTech Solutions",
    description: "Educational technology platform for online learning",
    industry: "Education",
    size: "100-200 employees",
    founded_year: 2016,
    location: "Kathmandu, Nepal",
    website_url: "https://edutech.com.np",
    logo_url: "/placeholder.svg?height=60&width=60&text=ET",
    employer_id: "emp6",
  },
]

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for creating amazing user experiences using modern web technologies. The ideal candidate should have strong experience with React, TypeScript, and modern CSS frameworks.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience with React and TypeScript",
      "Strong understanding of modern CSS and responsive design",
      "Experience with state management libraries (Redux, Zustand)",
      "Knowledge of testing frameworks (Jest, React Testing Library)",
      "Excellent communication and teamwork skills",
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "Jest"],
    location: "Kathmandu",
    job_type: "full-time",
    experience_level: "senior-level",
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: false,
    status: "active",
    company_id: "1",
    employer_id: "emp1",
    views_count: 245,
    applications_count: 23,
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Digital Marketing Specialist",
    description:
      "Join our marketing team to drive digital growth and create impactful campaigns for our clients. You'll work on SEO, social media marketing, content creation, and paid advertising campaigns.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of digital marketing experience",
      "Proficiency in Google Analytics, Google Ads, and social media platforms",
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication skills",
    ],
    skills: ["SEO", "Google Ads", "Social Media Marketing", "Content Marketing", "Analytics"],
    location: "Pokhara",
    job_type: "full-time",
    experience_level: "mid-level",
    salary_min: 50000,
    salary_max: 75000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: true,
    status: "active",
    company_id: "2",
    employer_id: "emp2",
    views_count: 189,
    applications_count: 31,
    created_at: new Date("2024-01-14"),
    updated_at: new Date("2024-01-14"),
    postedAt: "3 days ago",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    description:
      "Create beautiful and functional designs for web and mobile applications. Work closely with developers and product managers to deliver exceptional user experiences.",
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "3+ years of UI/UX design experience",
      "Proficiency in Figma, Adobe Creative Suite",
      "Strong portfolio demonstrating design thinking",
      "Understanding of user research and usability testing",
    ],
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
    location: "Remote",
    job_type: "contract",
    experience_level: "mid-level",
    salary_min: 60000,
    salary_max: 90000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: false,
    status: "active",
    company_id: "3",
    employer_id: "emp3",
    views_count: 156,
    applications_count: 18,
    created_at: new Date("2024-01-13"),
    updated_at: new Date("2024-01-13"),
    postedAt: "4 days ago",
  },
  {
    id: "4",
    title: "Data Analyst",
    description:
      "Analyze complex datasets to provide insights and support business decision-making processes. Work with various stakeholders to understand data requirements and deliver actionable insights.",
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, or related field",
      "2+ years of data analysis experience",
      "Proficiency in Python, SQL, and data visualization tools",
      "Experience with statistical analysis and machine learning",
      "Strong problem-solving and communication skills",
    ],
    skills: ["Python", "SQL", "Tableau", "Statistics", "Machine Learning"],
    location: "Kathmandu",
    job_type: "full-time",
    experience_level: "mid-level",
    salary_min: 65000,
    salary_max: 95000,
    salary_currency: "NPR",
    is_featured: false,
    is_urgent: false,
    status: "active",
    company_id: "4",
    employer_id: "emp4",
    views_count: 134,
    applications_count: 15,
    created_at: new Date("2024-01-12"),
    updated_at: new Date("2024-01-12"),
    postedAt: "5 days ago",
  },
  {
    id: "5",
    title: "Mobile App Developer",
    description:
      "Develop innovative mobile applications for iOS and Android platforms. Work with cross-functional teams to deliver high-quality mobile experiences.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of mobile development experience",
      "Proficiency in React Native or Flutter",
      "Experience with native iOS/Android development",
      "Knowledge of mobile app deployment processes",
    ],
    skills: ["React Native", "Flutter", "iOS Development", "Android Development", "Firebase"],
    location: "Bhaktapur",
    job_type: "full-time",
    experience_level: "senior-level",
    salary_min: 75000,
    salary_max: 110000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: false,
    status: "active",
    company_id: "5",
    employer_id: "emp5",
    views_count: 198,
    applications_count: 27,
    created_at: new Date("2024-01-11"),
    updated_at: new Date("2024-01-11"),
    postedAt: "6 days ago",
  },
  {
    id: "6",
    title: "Content Writer",
    description:
      "Create engaging content for various digital platforms and help build our brand voice. Write blog posts, social media content, and marketing materials.",
    requirements: [
      "Bachelor's degree in English, Journalism, or related field",
      "2+ years of content writing experience",
      "Excellent writing and editing skills",
      "SEO knowledge and experience",
      "Ability to adapt writing style for different audiences",
    ],
    skills: ["Content Writing", "SEO Writing", "Copywriting", "WordPress", "Social Media"],
    location: "Lalitpur",
    job_type: "part-time",
    experience_level: "entry-level",
    salary_min: 30000,
    salary_max: 45000,
    salary_currency: "NPR",
    is_featured: false,
    is_urgent: false,
    status: "active",
    company_id: "3",
    employer_id: "emp3",
    views_count: 87,
    applications_count: 12,
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
    postedAt: "1 week ago",
  },
  {
    id: "7",
    title: "Backend Developer",
    description:
      "Build scalable backend systems and APIs for our growing platform. Work with modern technologies and cloud infrastructure.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of backend development experience",
      "Proficiency in Node.js, Python, or similar",
      "Experience with databases and cloud platforms",
      "Understanding of microservices architecture",
    ],
    skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Microservices"],
    location: "Kathmandu",
    job_type: "full-time",
    experience_level: "senior-level",
    salary_min: 85000,
    salary_max: 125000,
    salary_currency: "NPR",
    is_featured: false,
    is_urgent: true,
    status: "active",
    company_id: "1",
    employer_id: "emp1",
    views_count: 167,
    applications_count: 19,
    created_at: new Date("2024-01-09"),
    updated_at: new Date("2024-01-09"),
    postedAt: "1 week ago",
  },
  {
    id: "8",
    title: "DevOps Engineer",
    description:
      "Manage and optimize our cloud infrastructure, implement CI/CD pipelines, and ensure system reliability and scalability.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of DevOps experience",
      "Experience with AWS, Docker, Kubernetes",
      "Knowledge of CI/CD tools and practices",
      "Strong scripting and automation skills",
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
    location: "Remote",
    job_type: "full-time",
    experience_level: "senior-level",
    salary_min: 90000,
    salary_max: 130000,
    salary_currency: "NPR",
    is_featured: true,
    is_urgent: false,
    status: "active",
    company_id: "1",
    employer_id: "emp1",
    views_count: 203,
    applications_count: 16,
    created_at: new Date("2024-01-08"),
    updated_at: new Date("2024-01-08"),
    postedAt: "1 week ago",
  },
]

// Add company data to jobs
export const allJobs: Job[] = mockJobs.map((job) => ({
  ...job,
  company: mockCompanies.find((company) => company.id === job.company_id),
}))

export const featuredJobs = allJobs.filter((job) => job.is_featured)

export const topEmployers = mockCompanies.slice(0, 6)

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    email: "john.doe@example.com",
    name: "John Doe",
    user_type: "seeker",
    avatar_url: "/placeholder.svg?height=40&width=40&text=JD",
    phone: "+977-9841234567",
    location: "Kathmandu, Nepal",
    bio: "Passionate frontend developer with 3+ years of experience in React and modern web technologies.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-15"),
  },
  {
    id: "user2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    user_type: "employer",
    avatar_url: "/placeholder.svg?height=40&width=40&text=JS",
    phone: "+977-9851234567",
    location: "Pokhara, Nepal",
    bio: "HR Manager at GrowthHub, passionate about connecting talent with opportunities.",
    company_name: "GrowthHub",
    company_size: "50-100 employees",
    website_url: "https://growthhub.com.np",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-15"),
  },
]

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: "app1",
    job_id: "1",
    applicant_id: "user1",
    cover_letter: "I am very interested in this position and believe my skills align well with your requirements.",
    status: "pending",
    applied_at: new Date("2024-01-14"),
    updated_at: new Date("2024-01-14"),
  },
  {
    id: "app2",
    job_id: "3",
    applicant_id: "user1",
    cover_letter:
      "As a frontend developer with design sensibilities, I would love to contribute to your UI/UX projects.",
    status: "reviewing",
    applied_at: new Date("2024-01-13"),
    updated_at: new Date("2024-01-15"),
  },
]

// Helper functions for data operations
export function getJobById(id: string): Job | undefined {
  return allJobs.find((job) => job.id === id)
}

export function getJobsByFilters(filters: {
  search?: string
  location?: string
  jobType?: string
  skills?: string[]
  salaryMin?: number
  salaryMax?: number
  featured?: boolean
}): Job[] {
  let filteredJobs = allJobs

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.company?.name.toLowerCase().includes(searchTerm),
    )
  }

  if (filters.location && filters.location !== "All Locations") {
    filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(filters.location!.toLowerCase()))
  }

  if (filters.jobType && filters.jobType !== "All Categories") {
    filteredJobs = filteredJobs.filter((job) => job.job_type === filters.jobType)
  }

  if (filters.skills && filters.skills.length > 0) {
    filteredJobs = filteredJobs.filter((job) => filters.skills!.some((skill) => job.skills.includes(skill)))
  }

  if (filters.salaryMin) {
    filteredJobs = filteredJobs.filter((job) => job.salary_min && job.salary_min >= filters.salaryMin!)
  }

  if (filters.salaryMax) {
    filteredJobs = filteredJobs.filter((job) => job.salary_max && job.salary_max <= filters.salaryMax!)
  }

  if (filters.featured) {
    filteredJobs = filteredJobs.filter((job) => job.is_featured)
  }

  return filteredJobs
}

export function getJobStats() {
  return {
    totalJobs: allJobs.length,
    featuredJobs: featuredJobs.length,
    totalEmployers: mockCompanies.length,
    totalApplications: mockApplications.length,
  }
}

export function getUserApplications(userId: string): Application[] {
  return mockApplications
    .filter((app) => app.applicant_id === userId)
    .map((app) => ({
      ...app,
      job: allJobs.find((job) => job.id === app.job_id),
    }))
}

export function getJobApplications(jobId: string): Application[] {
  return mockApplications
    .filter((app) => app.job_id === jobId)
    .map((app) => ({
      ...app,
      applicant: mockUsers.find((user) => user.id === app.applicant_id),
    }))
}
