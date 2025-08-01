#!/usr/bin/env node

const { Client, Databases } = require('node-appwrite');

console.log('🔧 Fixing Status Attributes...\n');

// Initialize Appwrite client with API key
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('688c304b002078297555')
    .setKey('standard_4b8851c31d35433449d8997a335b619872248bc9e316bad4600263e4b3b9a5ea30901df71bb3d7877136cf425a0e7e104e53bdd381216161a06a3ed98247157997441bce482446243482ec65d9bc6c6ec3db8045ede15b4a46828e4d0cfc77a748c15328f3b373ff1c43ac8ecf8523df397d802ca670924fef025a7aa4770707');

const databases = new Databases(client);

const DATABASE_ID = 'kaamkhoj-production';

async function fixStatus() {
    try {
        console.log('📋 Adding status attributes...\n');

        // Add status to jobs collection
        try {
            await databases.createStringAttribute(
                DATABASE_ID, 
                'jobs', 
                'status', 
                32, 
                true // required
            );
            console.log('   ✅ Added status to jobs collection');
        } catch (error) {
            if (error.code === 409) {
                console.log('   ℹ️  status already exists in jobs collection');
            } else {
                console.log(`   ⚠️  Could not add status to jobs: ${error.message}`);
            }
        }

        // Add status to applications collection
        try {
            await databases.createStringAttribute(
                DATABASE_ID, 
                'applications', 
                'status', 
                32, 
                true // required
            );
            console.log('   ✅ Added status to applications collection');
        } catch (error) {
            if (error.code === 409) {
                console.log('   ℹ️  status already exists in applications collection');
            } else {
                console.log(`   ⚠️  Could not add status to applications: ${error.message}`);
            }
        }

        console.log('\n🎉 Status attributes fixed!');
        console.log('\n📝 Next steps:');
        console.log('1. Test the connection by visiting /test-permissions');
        console.log('2. Try posting a job at /post-job');
        console.log('3. Check your jobs at /jobs');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    }
}

fixStatus(); 