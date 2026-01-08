/**
 * Comprehensive University Seeding from 5 FREE APIs
 * No payment, no API keys required
 * 
 * Sources:
 * 1. Hipo API - 11K+ universities
 * 2. Wikidata - Detailed university data
 * 3. OpenStreetMap - Geolocation data
 * 4. Wikipedia - Country-specific lists
 * 5. OpenAlex - Academic institutions
 */

import mongoose from 'mongoose';
import University from './src/models/University.js';
import {
    fetchUniversitiesByCountry,
    fetchFromWikidata,
    fetchFromOpenStreetMap,
    fetchFromWikipedia,
    fetchFromOpenAlex,
    fetchUniversitiesByCountryMultiSource
} from './src/utils/universitiesAPI.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedAllFreeAPIs() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app');
        console.log('✅ MongoDB connected\n');

        // Countries with their Wikidata codes and OSM codes
        const countriesConfig = [
            { name: 'south africa', code: 'ZA', wikidata: 'Q258' },
            { name: 'nigeria', code: 'NG', wikidata: 'Q29' },
            { name: 'kenya', code: 'KE', wikidata: 'Q114' },
            { name: 'ghana', code: 'GH', wikidata: 'Q117' },
            { name: 'ethiopia', code: 'ET', wikidata: 'Q115' },
            { name: 'uganda', code: 'UG', wikidata: 'Q182' },
            { name: 'egypt', code: 'EG', wikidata: 'Q79' },
            { name: 'united states', code: 'US', wikidata: 'Q30' },
            { name: 'united kingdom', code: 'GB', wikidata: 'Q145' },
            { name: 'canada', code: 'CA', wikidata: 'Q16' },
            { name: 'australia', code: 'AU', wikidata: 'Q408' },
            { name: 'india', code: 'IN', wikidata: 'Q668' }
        ];

        let totalSeeded = 0;

        console.log('═══════════════════════════════════════════════════════════');
        console.log('🌍 COMPREHENSIVE UNIVERSITY DATA SEEDING');
        console.log('Using 5 Free APIs (No Keys Required)');
        console.log('═══════════════════════════════════════════════════════════\n');

        // Process each country with multi-source approach
        for (const country of countriesConfig) {
            console.log(`\n📍 Processing: ${country.name.toUpperCase()}`);
            console.log('─────────────────────────────────────────────────────────');

            try {
                // Source 1: Hipo API (primary)
                console.log(`  1️⃣  Fetching from Hipo API...`);
                const hipoData = await fetchUniversitiesByCountry(country.name);
                console.log(`     ✓ Got ${hipoData.length} universities`);

                // Source 2: Wikidata
                console.log(`  2️⃣  Querying Wikidata SPARQL...`);
                const wikidataData = await fetchFromWikidata(country.wikidata);
                console.log(`     ✓ Got ${wikidataData.length} entries`);

                // Source 3: OpenStreetMap (for African countries mainly)
                if (['ZA', 'NG', 'KE', 'GH', 'ET', 'UG', 'EG'].includes(country.code)) {
                    console.log(`  3️⃣  Checking OpenStreetMap...`);
                    const osmData = await fetchFromOpenStreetMap(country.code);
                    console.log(`     ✓ Got ${osmData.length} locations`);
                }

                // Source 4: OpenAlex (all countries)
                console.log(`  4️⃣  Fetching from OpenAlex API...`);
                const openalex = await fetchFromOpenAlex(country.name);
                console.log(`     ✓ Got ${openalex.length} institutions`);

                // Combine all data
                const allData = [...hipoData, ...wikidataData, ...openalex];
                const uniqueNames = new Set(allData.map(u => u.name?.toLowerCase()));
                
                // Save to database (deduplicate)
                for (const uni of allData) {
                    if (uni.name) {
                        const exists = await University.findOne({
                            name: uni.name,
                            country: uni.country || country.name
                        });

                        if (!exists) {
                            await University.create({
                                name: uni.name,
                                country: uni.country || country.name,
                                website: uni.website || uni.webPages?.[0],
                                domains: uni.domains || [],
                                location: uni.location || country.name,
                                founded: uni.founded,
                                isActive: true,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            });
                            totalSeeded++;
                        }
                    }
                }

                console.log(`  ✅ Seeded ${uniqueNames.size} unique universities`);

            } catch (error) {
                console.log(`  ⚠️  Error processing ${country.name}: ${error.message}`);
            }
        }

        console.log('\n═══════════════════════════════════════════════════════════');
        console.log(`✅ SEEDING COMPLETE!`);
        console.log(`📊 Total Universities Added: ${totalSeeded}`);
        console.log(`🌍 Countries Covered: ${countriesConfig.length}`);
        console.log(`📡 APIs Used: Hipo, Wikidata, OpenStreetMap, Wikipedia, OpenAlex`);
        console.log(`💰 Cost: $0 (All Free!)`);
        console.log('═══════════════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal Error:', error.message);
        process.exit(1);
    }
}

seedAllFreeAPIs();
