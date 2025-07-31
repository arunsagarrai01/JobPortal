# KaamKhoj Setup Guide

## 1. Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

## 2. Appwrite Setup

1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Create a new project
3. Create a database with these collections:

### Users Collection
- **Collection ID**: `users`
- **Attributes**:
  - `clerk_user_id` (string, required)
  - `email` (string, required)
  - `name` (string, required)
  - `user_type` (string, required) - enum: seeker, employer
  - `avatar_url` (string, optional)
  - `phone` (string, optional)
  - `location` (string, optional)
  - `bio` (string, optional)
  - `skills` (string[], optional)
  - `company_name` (string, optional)
  - `company_size` (string, optional)
  - `website_url` (string, optional)

### Companies Collection
- **Collection ID**: `companies`
- **Attributes**:
  - `name` (string, required)
  - `description` (string, optional)
  - `industry` (string, optional)
  - `size` (string, optional)
  - `founded_year` (integer, optional)
  - `location` (string, optional)
  - `website_url` (string, optional)
  - `logo_url` (string, optional)
  - `employer_id` (string, required)

### Jobs Collection
- **Collection ID**: `jobs`
- **Attributes**:
  - `title` (string, required)
  - `description` (string, required)
  - `requirements` (string[], optional)
  - `skills` (string[], required)
  - `location` (string, required)
  - `job_type` (string, required) - enum: full-time, part-time, contract, internship, remote
  - `experience_level` (string, optional)
  - `salary_min` (integer, optional)
  - `salary_max` (integer, optional)
  - `salary_currency` (string, optional)
  - `is_featured` (boolean, default: false)
  - `is_urgent` (boolean, default: false)
  - `status` (string, required) - enum: active, paused, closed
  - `company_id` (string, required)
  - `employer_id` (string, required)
  - `views_count` (integer, default: 0)
  - `applications_count` (integer, default: 0)

### Applications Collection
- **Collection ID**: `applications`
- **Attributes**:
  - `job_id` (string, required)
  - `applicant_id` (string, required)
  - `cover_letter` (string, optional)
  - `resume_url` (string, optional)
  - `status` (string, required) - enum: pending, reviewing, shortlisted, interviewed, rejected, accepted

### Saved Jobs Collection
- **Collection ID**: `saved_jobs`
- **Attributes**:
  - `job_id` (string, required)
  - `user_id` (string, required)

4. Set up permissions for each collection (allow authenticated users to read/write their own data)

5. Copy your Appwrite credentials to `.env.local`

## 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

## 4. Run the Application

\`\`\`bash
npm run dev
\`\`\`

## Features Now Working:

✅ **Search Functionality** - Search bar redirects to jobs page with filters
✅ **Clerk Authentication** - Full auth flow with sign-in/sign-up
✅ **Appwrite Database** - Real database operations
✅ **Job Creation** - Employers can post jobs
✅ **Job Applications** - Users can apply to jobs
✅ **User Onboarding** - Choose between seeker/employer
✅ **Protected Routes** - Dashboard and post-job require auth
✅ **Real-time Data** - All data comes from Appwrite
