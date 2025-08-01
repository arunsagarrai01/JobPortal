#!/usr/bin/env node

const { Client, Databases } = require('node-appwrite');

console.log('🔧 Fixing Appwrite Collections...\n');

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('688c304b002078297555');

const databases = new Databases(client);

const DATABASE_ID = 'kaamkhoj-production';

async function fixCollections() {
    try {
        console.log('📋 Adding missing attributes to collections...\n');

        // Fix Jobs Collection
        console.log('🔧 Fixing Jobs collection...');
        try {
            // Add missing attributes to jobs collection
            const jobsAttributes = [
                { key: 'company_id', type: 'string', required: true, size: 36 },
                { key: 'employer_id', type: 'string', required: true, size: 36 },
                { key: 'status', type: 'string', required: true, size: 32, default: 'active' },
                { key: 'experience_level', type: 'string', required: false, size: 64 },
                { key: 'salary_min', type: 'integer', required: false },
                { key: 'salary_max', type: 'integer', required: false },
                { key: 'salary_currency', type: 'string', required: false, size: 16, default: 'NPR' },
                { key: 'is_featured', type: 'boolean', required: false, default: false },
                { key: 'is_urgent', type: 'boolean', required: false, default: false },
                { key: 'views_count', type: 'integer', required: false, default: 0 },
                { key: 'applications_count', type: 'integer', required: false, default: 0 },
                { key: 'requirements', type: 'string[]', required: false },
            ];

            for (const attr of jobsAttributes) {
                try {
                    await databases.createStringAttribute(DATABASE_ID, 'jobs', attr.key, attr.size, attr.required, attr.default);
                    console.log(`   ✅ Added ${attr.key} to jobs collection`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`   ℹ️  ${attr.key} already exists in jobs collection`);
                    } else {
                        console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                    }
                }
            }

            // Add integer attributes
            const integerAttrs = [
                { key: 'salary_min', required: false, min: 0, max: 999999999 },
                { key: 'salary_max', required: false, min: 0, max: 999999999 },
                { key: 'views_count', required: false, min: 0, max: 999999999, default: 0 },
                { key: 'applications_count', required: false, min: 0, max: 999999999, default: 0 },
            ];

            for (const attr of integerAttrs) {
                try {
                    await databases.createIntegerAttribute(DATABASE_ID, 'jobs', attr.key, attr.required, attr.min, attr.max, attr.default);
                    console.log(`   ✅ Added ${attr.key} (integer) to jobs collection`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`   ℹ️  ${attr.key} already exists in jobs collection`);
                    } else {
                        console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                    }
                }
            }

            // Add boolean attributes
            const booleanAttrs = [
                { key: 'is_featured', required: false, default: false },
                { key: 'is_urgent', required: false, default: false },
            ];

            for (const attr of booleanAttrs) {
                try {
                    await databases.createBooleanAttribute(DATABASE_ID, 'jobs', attr.key, attr.required, attr.default);
                    console.log(`   ✅ Added ${attr.key} (boolean) to jobs collection`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`   ℹ️  ${attr.key} already exists in jobs collection`);
                    } else {
                        console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                    }
                }
            }

            // Add string array attributes
            const stringArrayAttrs = [
                { key: 'requirements', required: false },
            ];

            for (const attr of stringArrayAttrs) {
                try {
                    await databases.createStringAttribute(DATABASE_ID, 'jobs', attr.key, 256, attr.required, null, true);
                    console.log(`   ✅ Added ${attr.key} (string array) to jobs collection`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`   ℹ️  ${attr.key} already exists in jobs collection`);
                    } else {
                        console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                    }
                }
            }

        } catch (error) {
            console.error('❌ Error fixing jobs collection:', error.message);
        }

        // Fix Companies Collection
        console.log('\n🔧 Fixing Companies collection...');
        try {
            const companiesAttributes = [
                { key: 'employer_id', type: 'string', required: true, size: 36 },
                { key: 'description', type: 'string', required: false, size: 65536 },
                { key: 'industry', type: 'string', required: false, size: 256 },
                { key: 'size', type: 'string', required: false, size: 128 },
                { key: 'founded_year', type: 'integer', required: false },
                { key: 'location', type: 'string', required: false, size: 256 },
                { key: 'website_url', type: 'string', required: false, size: 512 },
                { key: 'logo_url', type: 'string', required: false, size: 512 },
            ];

            for (const attr of companiesAttributes) {
                try {
                    await databases.createStringAttribute(DATABASE_ID, 'companies', attr.key, attr.size, attr.required);
                    console.log(`   ✅ Added ${attr.key} to companies collection`);
                } catch (error) {
                    if (error.code === 409) {
                        console.log(`   ℹ️  ${attr.key} already exists in companies collection`);
                    } else {
                        console.log(`   ⚠️  Could not add ${attr.key}: ${error.message}`);
                    }
                }
            }

            // Add integer attributes for companies
            try {
                await databases.createIntegerAttribute(DATABASE_ID, 'companies', 'founded_year', false, 1900, 2100);
                console.log(`   ✅ Added founded_year (integer) to companies collection`);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ℹ️  founded_year already exists in companies collection`);
                } else {
                    console.log(`   ⚠️  Could not add founded_year: ${error.message}`);
                }
            }

        } catch (error) {
            console.error('❌ Error fixing companies collection:', error.message);
        }

        console.log('\n🎉 Collection fixes completed!');
        console.log('\n📝 Next steps:');
        console.log('1. Test the connection by visiting /test-permissions');
        console.log('2. Try posting a job at /post-job');
        console.log('3. Check your jobs at /jobs');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    }
}

fixCollections(); 