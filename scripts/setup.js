#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up KaamKhoj Environment Variables...\n');

const envContent = `# Clerk Authentication
# Get these from https://dashboard.clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Appwrite Configuration
# Get these from https://cloud.appwrite.io/
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=688b43a80014350eb447

# Appwrite Database and Collections
# Create these collections in your Appwrite project
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
NEXT_PUBLIC_APPWRITE_COMPANIES_COLLECTION_ID=companies
NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID=jobs
NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID=applications
NEXT_PUBLIC_APPWRITE_SAVED_JOBS_COLLECTION_ID=saved_jobs
`;

const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Please update it manually with the following variables:\n');
  console.log(envContent);
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file with template variables\n');
  console.log('📝 Please update the following variables in .env.local:');
  console.log('   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
  console.log('   - CLERK_SECRET_KEY');
  console.log('   - NEXT_PUBLIC_APPWRITE_DATABASE_ID');
  console.log('\n🔗 Get your keys from:');
  console.log('   - Clerk: https://dashboard.clerk.com/');
  console.log('   - Appwrite: https://cloud.appwrite.io/\n');
}

console.log('📚 Next steps:');
console.log('1. Update .env.local with your actual API keys');
console.log('2. Set up your Appwrite database and collections (see SETUP.md)');
console.log('3. Run "npm run dev" to start the development server');
console.log('\n�� Happy coding!'); 