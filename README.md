# KaamKhoj - Nepal's Premier Job Portal

A modern job portal built for Nepali youth and students, featuring real-time job listings, employer connections, and seamless application processes.

## 🚀 Features

- **🔍 Advanced Job Search** - Filter by location, job type, skills, and salary
- **👤 User Authentication** - Secure login with Clerk authentication
- **💼 Job Applications** - Easy apply system with cover letters
- **🏢 Company Profiles** - Detailed employer information and job postings
- **📊 Dashboard Analytics** - Track applications and job performance
- **📱 Responsive Design** - Works perfectly on all devices
- **🌙 Dark Mode** - Beautiful dark theme optimized for eye comfort

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: Clerk
- **Database**: Appwrite
- **UI Components**: Radix UI, Lucide Icons
- **Forms**: React Hook Form, Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Clerk account
- Appwrite account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd youth-job-portal-again
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set Up Environment Variables

Run the setup script to create your `.env.local` file:

```bash
npm run setup
```

Then update the following variables in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
```

### 4. Set Up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your publishable and secret keys
4. Update your `.env.local` file

### 5. Set Up Appwrite Database

1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Create a new project
3. Create a database with the following collections:

#### Users Collection
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

#### Companies Collection
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

#### Jobs Collection
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

#### Applications Collection
- **Collection ID**: `applications`
- **Attributes**:
  - `job_id` (string, required)
  - `applicant_id` (string, required)
  - `cover_letter` (string, optional)
  - `resume_url` (string, optional)
  - `status` (string, required) - enum: pending, reviewing, shortlisted, interviewed, rejected, accepted

#### Saved Jobs Collection
- **Collection ID**: `saved_jobs`
- **Attributes**:
  - `job_id` (string, required)
  - `user_id` (string, required)

4. Set up permissions for each collection (allow authenticated users to read/write their own data)
5. Copy your database ID to `.env.local`

### 6. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
youth-job-portal-again/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── jobs/             # Job listing pages
│   ├── post-job/         # Job posting pages
│   ├── sign-in/          # Authentication pages
│   └── sign-up/          # Authentication pages
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                   # Utility functions
│   ├── appwrite.ts       # Appwrite configuration
│   ├── auth.ts           # Authentication utilities
│   ├── jobs.ts           # Job-related functions
│   └── ...               # Other utilities
├── public/                # Static assets
└── scripts/               # Setup scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup` - Set up environment variables
- `npm run setup-appwrite` - Set up Appwrite collections

## 🎯 Key Features Implemented

✅ **Real-time Job Search** - Advanced filtering and search functionality  
✅ **User Authentication** - Secure login/signup with Clerk  
✅ **Job Applications** - Complete application system  
✅ **Employer Dashboard** - Job posting and candidate management  
✅ **Job Seeker Dashboard** - Application tracking and profile management  
✅ **Responsive Design** - Mobile-first approach  
✅ **Dark Mode** - Beautiful dark theme  
✅ **Real Database** - Appwrite backend integration  
✅ **Protected Routes** - Authentication-based access control  

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [SETUP.md](SETUP.md) file for detailed setup instructions
2. Ensure all environment variables are properly configured
3. Verify your Appwrite collections are set up correctly
4. Check the browser console for any errors

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Clerk](https://clerk.com/)
- Database by [Appwrite](https://appwrite.io/)
- UI components by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ for Nepali youth and job seekers
