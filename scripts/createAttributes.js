#!/usr/bin/env node

const { Client, Databases } = require('node-appwrite');

console.log('🔧 Creating Attributes with API Key...\n');

// Initialize Appwrite client with API key
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('688c304b002078297555')
    .setKey('standard_4b8851c31d35433449d8997a335b619872248bc9e316bad4600263e4b3b9a5ea30901df71bb3d7877136cf425a0e7e104e53bdd381216161a06a3ed98247157997441bce482446243482ec65d9bc6c6ec3db8045ede15b4a46828e4d0cfc77a748c15328f3b373ff1c43ac8ecf8523df397d802ca670924fef025a7aa4770707');

const databases = new Databases(client);

const DATABASE_ID = 'kaamkhoj-production';

async function createAttributes() {
    try {
        console.log('📋 Creating attributes with underscores...\n');

        // Create Jobs Collection Attributes
        console.log('🔧 Creating Jobs collection attributes...');
        
        const jobsAttributes = [
            // String attributes
            { key: 'company_id', type: 'string', size: 36, required: true },
            { key: 'employer_id', type: 'string', size: 36, required: true },
            { key: 'status', type: 'string', size: 32, required: true, default: 'active' },
            { key: 'experience_level', type: 'string', size: 64, required: false },
            { key: 'salary_currency', type: 'string', size: 16, required: false, default: 'NPR' },
            
            // Integer attributes
            { key: 'salary_min', type: 'integer', required: false, min: 0, max: 999999999 },
            { key: 'salary_max', type: 'integer', required: false, min: 0, max: 999999999 },
            { key: 'views_count', type: 'integer', required: false, min: 0, max: 999999999, default: 0 },
            { key: 'applications_count', type: 'integer', required: false, min: 0, max: 999999999, default: 0 },
            
            // Boolean attributes
            { key: 'is_featured', type: 'boolean', required: false, default: false },
            { key: 'is_urgent', type: 'boolean', required: false, default: false },
            
            // String array attributes
            { key: 'requirements', type: 'stringArray', required: false },
        ];

        for (const attr of jobsAttributes) {
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(
                        DATABASE_ID, 
                        'jobs', 
                        attr.key, 
                        attr.size, 
                        attr.required, 
                        attr.default
                    );
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(
                        DATABASE_ID, 
                        'jobs', 
                        attr.key, 
                        attr.required, 
                        attr.min, 
                        attr.max, 
                        attr.default
                    );
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(
                        DATABASE_ID, 
                        'jobs', 
                        attr.key, 
                        attr.required, 
                        attr.default
                    );
                } else if (attr.type === 'stringArray') {
                    await databases.createStringAttribute(
                        DATABASE_ID, 
                        'jobs', 
                        attr.key, 
                        256, 
                        attr.required, 
                        null, 
                        true // array
                    );
                }
                console.log(`   ✅ Added ${attr.key} (${attr.type}) to jobs collection`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ℹ️  ${attr.key} already exists in jobs collection`);
                } else {
                    console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                }
            }
        }

        // Create Companies Collection Attributes
        console.log('\n🔧 Creating Companies collection attributes...');
        
        const companiesAttributes = [
            // String attributes
            { key: 'employer_id', type: 'string', size: 36, required: true },
            { key: 'description', type: 'string', size: 65536, required: false },
            { key: 'industry', type: 'string', size: 256, required: false },
            { key: 'size', type: 'string', size: 128, required: false },
            { key: 'location', type: 'string', size: 256, required: false },
            { key: 'website_url', type: 'string', size: 512, required: false },
            { key: 'logo_url', type: 'string', size: 512, required: false },
            
            // Integer attributes
            { key: 'founded_year', type: 'integer', required: false, min: 1900, max: 2100 },
        ];

        for (const attr of companiesAttributes) {
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(
                        DATABASE_ID, 
                        'companies', 
                        attr.key, 
                        attr.size, 
                        attr.required
                    );
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(
                        DATABASE_ID, 
                        'companies', 
                        attr.key, 
                        attr.required, 
                        attr.min, 
                        attr.max
                    );
                }
                console.log(`   ✅ Added ${attr.key} (${attr.type}) to companies collection`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ℹ️  ${attr.key} already exists in companies collection`);
                } else {
                    console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                }
            }
        }

        // Create Users Collection Attributes
        console.log('\n🔧 Creating Users collection attributes...');
        
        const usersAttributes = [
            { key: 'clerk_user_id', type: 'string', size: 256, required: true },
            { key: 'user_type', type: 'string', size: 32, required: true },
            { key: 'avatar_url', type: 'string', size: 512, required: false },
            { key: 'company_name', type: 'string', size: 256, required: false },
            { key: 'company_size', type: 'string', size: 128, required: false },
            { key: 'website_url', type: 'string', size: 512, required: false },
        ];

        for (const attr of usersAttributes) {
            try {
                await databases.createStringAttribute(
                    DATABASE_ID, 
                    'users', 
                    attr.key, 
                    attr.size, 
                    attr.required
                );
                console.log(`   ✅ Added ${attr.key} (${attr.type}) to users collection`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ℹ️  ${attr.key} already exists in users collection`);
                } else {
                    console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                }
            }
        }

        // Create Applications Collection Attributes
        console.log('\n🔧 Creating Applications collection attributes...');
        
        const applicationsAttributes = [
            { key: 'job_id', type: 'string', size: 36, required: true },
            { key: 'applicant_id', type: 'string', size: 36, required: true },
            { key: 'status', type: 'string', size: 32, required: true, default: 'pending' },
            { key: 'cover_letter', type: 'string', size: 65536, required: false },
            { key: 'resume_url', type: 'string', size: 512, required: false },
        ];

        for (const attr of applicationsAttributes) {
            try {
                await databases.createStringAttribute(
                    DATABASE_ID, 
                    'applications', 
                    attr.key, 
                    attr.size, 
                    attr.required,
                    attr.default
                );
                console.log(`   ✅ Added ${attr.key} (${attr.type}) to applications collection`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ℹ️  ${attr.key} already exists in applications collection`);
                } else {
                    console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                }
            }
        }

        // Create Saved Jobs Collection Attributes
        console.log('\n🔧 Creating Saved Jobs collection attributes...');
        
        const savedJobsAttributes = [
            { key: 'job_id', type: 'string', size: 36, required: true },
            { key: 'user_id', type: 'string', size: 36, required: true },
        ];

        for (const attr of savedJobsAttributes) {
            try {
                await databases.createStringAttribute(
                    DATABASE_ID, 
                    'saved_jobs', 
                    attr.key, 
                    attr.size, 
                    attr.required
                );
                console.log(`   ✅ Added ${attr.key} (${attr.type}) to saved_jobs collection`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ℹ️  ${attr.key} already exists in saved_jobs collection`);
                } else {
                    console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                }
            }
        }

        console.log('\n🎉 All attributes created successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Test the connection by visiting /test-permissions');
        console.log('2. Try posting a job at /post-job');
        console.log('3. Check your jobs at /jobs');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure your API key has the correct permissions');
        console.log('2. Verify your project ID is correct');
        console.log('3. Check that the database and collections exist');
    }
}

createAttributes(); 