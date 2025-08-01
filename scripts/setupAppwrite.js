#!/usr/bin/env node

const { Client, Databases } = require('node-appwrite');

console.log('🚀 Setting up Appwrite Collections...\n');

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('688c304b002078297555');

const databases = new Databases(client);

const DATABASE_ID = 'kaamkhoj-production';

async function createCollections() {
    try {
        console.log('📋 Creating collections...\n');

        // Create Jobs Collection
        try {
            await databases.createCollection(DATABASE_ID, 'jobs', 'Jobs', [
                // Required attributes
                { key: 'title', type: 'string', required: true, size: 256 },
                { key: 'description', type: 'string', required: true, size: 65536 },
                { key: 'location', type: 'string', required: true, size: 256 },
                { key: 'job_type', type: 'string', required: true, size: 64 },
                { key: 'skills', type: 'string[]', required: true },
                { key: 'company_id', type: 'string', required: true, size: 36 },
                { key: 'employer_id', type: 'string', required: true, size: 36 },
                { key: 'status', type: 'string', required: true, size: 32, default: 'active' },
                
                // Optional attributes
                { key: 'requirements', type: 'string[]', required: false },
                { key: 'experience_level', type: 'string', required: false, size: 64 },
                { key: 'salary_min', type: 'integer', required: false },
                { key: 'salary_max', type: 'integer', required: false },
                { key: 'salary_currency', type: 'string', required: false, size: 16, default: 'NPR' },
                { key: 'is_featured', type: 'boolean', required: false, default: false },
                { key: 'is_urgent', type: 'boolean', required: false, default: false },
                { key: 'views_count', type: 'integer', required: false, default: 0 },
                { key: 'applications_count', type: 'integer', required: false, default: 0 },
            ]);
            console.log('✅ Jobs collection created successfully');
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Jobs collection already exists');
            } else {
                console.error('❌ Error creating jobs collection:', error.message);
            }
        }

        // Create Companies Collection
        try {
            await databases.createCollection(DATABASE_ID, 'companies', 'Companies', [
                { key: 'name', type: 'string', required: true, size: 256 },
                { key: 'employer_id', type: 'string', required: true, size: 36 },
                { key: 'description', type: 'string', required: false, size: 65536 },
                { key: 'industry', type: 'string', required: false, size: 256 },
                { key: 'size', type: 'string', required: false, size: 128 },
                { key: 'founded_year', type: 'integer', required: false },
                { key: 'location', type: 'string', required: false, size: 256 },
                { key: 'website_url', type: 'string', required: false, size: 512 },
                { key: 'logo_url', type: 'string', required: false, size: 512 },
            ]);
            console.log('✅ Companies collection created successfully');
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Companies collection already exists');
            } else {
                console.error('❌ Error creating companies collection:', error.message);
            }
        }

        // Create Users Collection
        try {
            await databases.createCollection(DATABASE_ID, 'users', 'Users', [
                { key: 'clerk_user_id', type: 'string', required: true, size: 256 },
                { key: 'email', type: 'string', required: true, size: 256 },
                { key: 'name', type: 'string', required: true, size: 256 },
                { key: 'user_type', type: 'string', required: true, size: 32 },
                { key: 'avatar_url', type: 'string', required: false, size: 512 },
                { key: 'phone', type: 'string', required: false, size: 32 },
                { key: 'location', type: 'string', required: false, size: 256 },
                { key: 'bio', type: 'string', required: false, size: 2048 },
                { key: 'skills', type: 'string[]', required: false },
                { key: 'company_name', type: 'string', required: false, size: 256 },
                { key: 'company_size', type: 'string', required: false, size: 128 },
                { key: 'website_url', type: 'string', required: false, size: 512 },
            ]);
            console.log('✅ Users collection created successfully');
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Users collection already exists');
            } else {
                console.error('❌ Error creating users collection:', error.message);
            }
        }

        // Create Applications Collection
        try {
            await databases.createCollection(DATABASE_ID, 'applications', 'Applications', [
                { key: 'job_id', type: 'string', required: true, size: 36 },
                { key: 'applicant_id', type: 'string', required: true, size: 36 },
                { key: 'status', type: 'string', required: true, size: 32, default: 'pending' },
                { key: 'cover_letter', type: 'string', required: false, size: 65536 },
                { key: 'resume_url', type: 'string', required: false, size: 512 },
            ]);
            console.log('✅ Applications collection created successfully');
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Applications collection already exists');
            } else {
                console.error('❌ Error creating applications collection:', error.message);
            }
        }

        // Create Saved Jobs Collection
        try {
            await databases.createCollection(DATABASE_ID, 'saved_jobs', 'Saved Jobs', [
                { key: 'job_id', type: 'string', required: true, size: 36 },
                { key: 'user_id', type: 'string', required: true, size: 36 },
            ]);
            console.log('✅ Saved Jobs collection created successfully');
        } catch (error) {
            if (error.code === 409) {
                console.log('ℹ️  Saved Jobs collection already exists');
            } else {
                console.error('❌ Error creating saved jobs collection:', error.message);
            }
        }

        console.log('\n🎉 All collections have been created successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Set up permissions for each collection in your Appwrite console');
        console.log('2. Test the connection by visiting /test');
        console.log('3. Try posting a job at /post-job');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure your Appwrite API key has the correct permissions');
        console.log('2. Verify your project ID is correct');
        console.log('3. Check that the database exists in your Appwrite console');
    }
}

createCollections(); 