import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import University from './src/models/University.js';
import Course from './src/models/Course.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
const CAO_CODE_MAP = {
    'ZU': 'UKZN',          // University of KwaZulu-Natal (Zululand campus)
    'KN': 'UKZN',          // University of KwaZulu-Natal
    'DC': 'DUT',           // Durban University of Technology
    'MP': 'MUT',           // Mangosuthu University of Technology
    'ZN': 'UNIZULU',       // University of Zululand
    'WS': 'WSU',           // Walter Sisulu University
    'FH': 'UFH',           // University of Fort Hare
    'NM': 'NMU',           // Nelson Mandela University
    'VD': 'UNIVEN',        // University of Venda
    'PT': 'TUT',           // Tshwane University of Technology
    'JB': 'UJ',            // University of Johannesburg
    'WH': 'WITS',          // Witwatersrand
    'UP': 'UP',            // University of Pretoria
    'US': 'UNISA',         // University of South Africa
    'SB': 'SU',            // Stellenbosch
    'CT': 'UCT',           // University of Cape Town
    'WC': 'UWC',           // University of Western Cape
    'CEN': 'CUT',          // Central University of Technology
    'NW': 'NWUTSA',        // Northwest University
    'VA': 'UV',            // Vaal University
    'SMU': 'SMU',          // Sefako Makgatho
    'NCV': 'CIDP'          // Construct IT (or other colleges)
};

// All South African Universities and Colleges in CAO
const INSTITUTIONS = {
    'UKZN': {
        name: 'University of KwaZulu-Natal',
        shortName: 'UKZN',
        country: 'South Africa',
        province: 'KwaZulu-Natal'
    },
    'DUT': {
        name: 'Durban University of Technology',
        shortName: 'DUT',
        country: 'South Africa',
        province: 'KwaZulu-Natal'
    },
    'MUT': {
        name: 'Mangosuthu University of Technology',
        shortName: 'MUT',
        country: 'South Africa',
        province: 'KwaZulu-Natal'
    },
    'UNIZULU': {
        name: 'University of Zululand',
        shortName: 'UNIZULU',
        country: 'South Africa',
        province: 'KwaZulu-Natal'
    },
    'WSU': {
        name: 'Walter Sisulu University',
        shortName: 'WSU',
        country: 'South Africa',
        province: 'Eastern Cape'
    },
    'UFH': {
        name: 'University of Fort Hare',
        shortName: 'UFH',
        country: 'South Africa',
        province: 'Eastern Cape'
    },
    'NMU': {
        name: 'Nelson Mandela University',
        shortName: 'NMU',
        country: 'South Africa',
        province: 'Eastern Cape'
    },
    'UNIVEN': {
        name: 'University of Venda',
        shortName: 'UNIVEN',
        country: 'South Africa',
        province: 'Limpopo'
    },
    'TUT': {
        name: 'Tshwane University of Technology',
        shortName: 'TUT',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'UJ': {
        name: 'University of Johannesburg',
        shortName: 'UJ',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'WITS': {
        name: 'University of the Witwatersrand',
        shortName: 'WITS',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'UP': {
        name: 'University of Pretoria',
        shortName: 'UP',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'UNISA': {
        name: 'University of South Africa',
        shortName: 'UNISA',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'SU': {
        name: 'Stellenbosch University',
        shortName: 'SU',
        country: 'South Africa',
        province: 'Western Cape'
    },
    'UCT': {
        name: 'University of Cape Town',
        shortName: 'UCT',
        country: 'South Africa',
        province: 'Western Cape'
    },
    'UWC': {
        name: 'University of the Western Cape',
        shortName: 'UWC',
        country: 'South Africa',
        province: 'Western Cape'
    },
    'CUT': {
        name: 'Central University of Technology',
        shortName: 'CUT',
        country: 'South Africa',
        province: 'Free State'
    },
    'NWUTSA': {
        name: 'Northwest University',
        shortName: 'NWUTSA',
        country: 'South Africa',
        province: 'North West'
    },
    'UV': {
        name: 'Vaal University of Technology',
        shortName: 'UV',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'SMU': {
        name: 'Sefako Makgatho Health Sciences University',
        shortName: 'SMU',
        country: 'South Africa',
        province: 'Gauteng'
    },
    'CIDP': {
        name: 'Construct IT Development Partnership',
        shortName: 'CIDP',
        country: 'South Africa',
        province: 'Various'
    }
};

async function seedCAOProgrammes() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB');

        // Read the extracted CAO data
        const dataPath = path.join(__dirname, 'src/data/cao_programmes.json');
        
        if (!fs.existsSync(dataPath)) {
            console.log('\n⚠️  CAO programmes file not found.');
            console.log('Please run the extraction script first:');
            console.log('python extract_cao_data.py');
            console.log('\nThis will download and extract data from the CAO Handbook PDF.');
            process.exit(1);
        }

        const caoProgrammesRaw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        console.log(`\n✓ Loaded ${caoProgrammesRaw.length} programmes from CAO data`);

        // Ensure all institutions exist in database
        console.log('\nSetting up institutions...');
        const universityMap = {};

        for (const [code, institutionData] of Object.entries(INSTITUTIONS)) {
            let university = await University.findOne({ name: institutionData.name });
            
            if (!university) {
                university = await University.create({
                    code: code,
                    name: institutionData.name,
                    shortName: institutionData.shortName,
                    country: institutionData.country,
                    province: institutionData.province,
                    isCAOInstitution: true
                });
                console.log(`  ✓ Created: ${institutionData.name}`);
            } else {
                // Update to mark as CAO institution
                await University.updateOne(
                    { _id: university._id },
                    { isCAOInstitution: true }
                );
            }
            
            universityMap[code] = university._id;
        }

        // Create a mapping from institution name to short code
        const institutionNameToCode = {};
        for (const [code, data] of Object.entries(INSTITUTIONS)) {
            institutionNameToCode[data.name] = code;
        }

        // Process and seed CAO programmes
        console.log('\nSeeding CAO programmes...');
        let created = 0;
        let updated = 0;
        let skipped = 0;

        for (const programme of caoProgrammesRaw) {
            try {
                // Extract institution code from programme code (first part before first hyphen)
                const codeParts = programme.code.split('-');
                let codePrefix = codeParts[0];
                
                // Look up the institution code using CAO code map
                let fullCode = CAO_CODE_MAP[codePrefix];
                if (!fullCode) {
                    fullCode = codePrefix; // Fall back to the prefix itself
                }
                
                const universityId = universityMap[fullCode];

                if (!universityId) {
                    skipped++;
                    continue;
                }

                // Create course code (CAO code from programme)
                const courseCode = programme.code;
                
                // Check if course already exists
                let course = await Course.findOne({ code: courseCode });

                if (course) {
                    // Update existing course
                    course = await Course.findByIdAndUpdate(
                        course._id,
                        {
                            name: programme.name,
                            university: universityId,
                            'cao.programmeCode': programme.code,
                            'cao.institution': programme.institution,
                            'cao.handbookPage': programme.page,
                            'cao.verified': false,
                            description: `${programme.name} at ${programme.institution}. CAO Programme Code: ${programme.code}`
                        },
                        { new: true }
                    );
                    updated++;
                } else {
                    // Create new course
                    course = await Course.create({
                        code: courseCode,
                        name: programme.name,
                        university: universityId,
                        cao: {
                            programmeCode: programme.code,
                            institution: programme.institution,
                            handbookPage: programme.page,
                            source: 'cao_handbook_2026',
                            verified: false
                        },
                        description: `${programme.name} at ${programme.institution}. CAO Programme Code: ${programme.code}`,
                        level: 'Bachelor', // Default, can be updated manually
                        isActive: true
                    });
                    created++;
                }

                // Progress indicator
                const total = created + updated;
                if (total % 100 === 0) {
                    console.log(`  Processed: ${total} programmes...`);
                }
            } catch (error) {
                // Silently skip on error (usually duplicate key)
                skipped++;
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('SEEDING COMPLETE');
        console.log('='.repeat(60));
        console.log(`✓ Programmes created: ${created}`);
        console.log(`✓ Programmes updated: ${updated}`);
        console.log(`⊘ Programmes skipped: ${skipped}`);
        console.log(`✓ Total institutions: ${Object.keys(INSTITUTIONS).length}`);
        
        // Show summary by institution
        console.log('\nProgrammes by Institution:');
        const summary = await Course.aggregate([
            {
                $lookup: {
                    from: 'universities',
                    localField: 'university',
                    foreignField: '_id',
                    as: 'universityData'
                }
            },
            {
                $match: {
                    'cao.programmeCode': { $exists: true, $ne: null }
                }
            },
            {
                $group: {
                    _id: '$cao.institution',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        summary.forEach(item => {
            console.log(`  ${item._id}: ${item.count} programmes`);
        });

        console.log('\n✓ CAO data successfully seeded!');
        
    } catch (error) {
        console.error('❌ Error seeding CAO programmes:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

seedCAOProgrammes();
