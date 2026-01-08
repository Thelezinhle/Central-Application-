/**
 * Seed Universities from Free API
 * Uses hipolabs.com API to fetch real universities globally
 * No API key required!
 */

import mongoose from 'mongoose';
import University from './src/models/University.js';
import { seedUniversitiesFromAPI } from './src/utils/universitiesAPI.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedUniversitiesAPI() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app');
        console.log('✅ MongoDB connected');

        // Countries to seed (add more as needed)
        const countries = [
            'south africa',
            'united states',
            'united kingdom',
            'canada',
            'australia',
            'germany',
            'france',
            'netherlands',
            'ireland',
            'india',
            'china',
            'japan'
        ];

        // Seed universities
        const count = await seedUniversitiesFromAPI(countries, University);
        
        console.log(`\n✅ Successfully seeded ${count} unique universities from API!`);
        console.log('🌍 Database now contains real universities from multiple countries');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seedUniversitiesAPI();
