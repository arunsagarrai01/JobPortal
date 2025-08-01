#!/usr/bin/env node

const { Client, Databases } = require('node-appwrite');

console.log('🔍 Checking Appwrite Collections...\n');

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('688c304b002078297555');

const databases = new Databases(client);

const DATABASE_ID = 'kaamkhoj-production';

async function checkCollections() {
    try {
        console.log('📋 Checking collections...\n');

        // List all collections
        const collections = await databases.listCollections(DATABASE_ID);
        console.log('Found collections:', collections.collections.map(c => c.$id));

        // Check each collection
        for (const collection of collections.collections) {
            console.log(`\n📁 Collection: ${collection.$id}`);
            console.log(`   Name: ${collection.name}`);
            console.log(`   Permissions: ${JSON.stringify(collection.$permissions, null, 2)}`);
            
            // Get collection attributes
            try {
                const attributes = await databases.listAttributes(DATABASE_ID, collection.$id);
                console.log(`   Attributes: ${attributes.attributes.length}`);
                attributes.attributes.forEach(attr => {
                    console.log(`     - ${attr.key} (${attr.type}) ${attr.required ? '[required]' : '[optional]'}`);
                });
            } catch (error) {
                console.log(`   Error getting attributes: ${error.message}`);
            }
        }

    } catch (error) {
        console.error('❌ Error checking collections:', error.message);
    }
}

checkCollections(); 