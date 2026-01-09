import mongoose from 'mongoose';
import dotenv from 'dotenv';
import University from './src/models/University.js';

const __dirname = process.cwd();
dotenv.config();

// Sample TVET Colleges - Start with major ones
const TVET_COLLEGES = [
    {
        name: 'False Bay TVET College',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'FBAY',
        country: 'South Africa',
        address: {
            city: 'Khayelitsha',
            province: 'Western Cape',
            street: 'Long Street, Khayelitsha'
        },
        contact: {
            phone: '+27 21 787 0800',
            email: 'info@falsebaycollege.co.za',
            admissionsEmail: 'admissions@falsebaycollege.co.za'
        },
        web_pages: ['https://www.falsebaycollege.co.za'],
        domains: ['falsebaycollege.co.za'],
        applicationUrl: 'https://www.falsebaycollege.co.za/apply',
        description: 'False Bay TVET College offers technical and vocational education and training across three campuses in the Western Cape.',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'Khayelitsha Campus', city: 'Khayelitsha', province: 'Western Cape' },
                { name: 'Fish Hoek Campus', city: 'Fish Hoek', province: 'Western Cape' },
                { name: 'Muizenberg Campus', city: 'Muizenberg', province: 'Western Cape' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering and Related Design N3', nqfLevel: 'N3', category: 'Engineering' },
                { name: 'National Certificate: Engineering and Related Design N4-N6', nqfLevel: 'N4-N6', category: 'Engineering' },
                { name: 'National Certificate: Business Studies N3', nqfLevel: 'N3', category: 'Business' },
                { name: 'National Certificate: Hospitality N2-N3', nqfLevel: 'N2-N3', category: 'Hospitality' }
            ]
        },
        collegeInfo: {
            accreditationBodies: ['DHET'],
            dhetAccredited: true,
            cheAccredited: false,
            setaAccredited: false
        }
    },
    {
        name: 'College of Cape Town',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'CCT',
        country: 'South Africa',
        address: {
            city: 'Cape Town',
            province: 'Western Cape'
        },
        contact: {
            phone: '+27 21 921 2500',
            email: 'info@cct.edu.za',
            admissionsEmail: 'admissions@cct.edu.za'
        },
        web_pages: ['https://www.cct.edu.za'],
        domains: ['cct.edu.za'],
        applicationUrl: 'https://www.cct.edu.za/enrolment',
        description: 'College of Cape Town is a major TVET college providing technical qualifications across multiple sectors.',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'City Campus', city: 'Cape Town', province: 'Western Cape' },
                { name: 'Bellville Campus', city: 'Bellville', province: 'Western Cape' },
                { name: 'Westlake Campus', city: 'Westlake', province: 'Western Cape' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering N1-N3', nqfLevel: 'N1-N3', category: 'Engineering' },
                { name: 'National Certificate: IT N1-N4', nqfLevel: 'N1-N4', category: 'Information Technology' },
                { name: 'National Certificate: Electrical N4-N6', nqfLevel: 'N4-N6', category: 'Engineering' }
            ]
        },
        collegeInfo: {
            accreditationBodies: ['DHET'],
            dhetAccredited: true,
            cheAccredited: false,
            setaAccredited: false
        }
    },
    {
        name: 'Ekurhuleni West TVET College',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'EKWEST',
        country: 'South Africa',
        address: {
            city: 'Benoni',
            province: 'Gauteng'
        },
        contact: {
            phone: '+27 11 613 2314',
            email: 'info@ewcollege.edu.za',
            admissionsEmail: 'admissions@ewcollege.edu.za'
        },
        web_pages: ['https://www.ewcollege.edu.za'],
        domains: ['ewcollege.edu.za'],
        applicationUrl: 'https://www.ewcollege.edu.za/apply',
        description: 'Ekurhuleni West TVET College serves the Ekurhuleni metropolitan area with quality technical education.',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'Benoni Campus', city: 'Benoni', province: 'Gauteng' },
                { name: 'Brakpan Campus', city: 'Brakpan', province: 'Gauteng' },
                { name: 'Springs Campus', city: 'Springs', province: 'Gauteng' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering N1-N6', nqfLevel: 'N1-N6', category: 'Engineering' },
                { name: 'National Certificate: Business Studies N1-N3', nqfLevel: 'N1-N3', category: 'Business' },
                { name: 'National Certificate: Welding N1-N3', nqfLevel: 'N1-N3', category: 'Engineering' }
            ]
        },
        collegeInfo: {
            accreditationBodies: ['DHET'],
            dhetAccredited: true,
            cheAccredited: false,
            setaAccredited: false
        }
    },
    {
        name: 'Tshwane South TVET College',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'TSHSOUTH',
        country: 'South Africa',
        address: {
            city: 'Pretoria',
            province: 'Gauteng'
        },
        contact: {
            phone: '+27 12 320 3505',
            email: 'info@tshwane-south.co.za',
            admissionsEmail: 'admissions@tshwane-south.co.za'
        },
        web_pages: ['https://www.tshwane-south.co.za'],
        domains: ['tshwane-south.co.za'],
        applicationUrl: 'https://www.tshwane-south.co.za/admissions',
        description: 'Tshwane South TVET College is a leading technical education provider in the Pretoria area.',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'Atteridgeville Campus', city: 'Atteridgeville', province: 'Gauteng' },
                { name: 'Mamelodi Campus', city: 'Mamelodi', province: 'Gauteng' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering N1-N6', nqfLevel: 'N1-N6', category: 'Engineering' },
                { name: 'National Certificate: Civil Engineering N4-N6', nqfLevel: 'N4-N6', category: 'Engineering' },
                { name: 'National Certificate: Electrical N1-N6', nqfLevel: 'N1-N6', category: 'Engineering' }
            ]
        },
        collegeInfo: {
            accreditationBodies: ['DHET'],
            dhetAccredited: true,
            cheAccredited: false,
            setaAccredited: false
        }
    },
    {
        name: 'Durban University of Technology (TVET Campus)',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'DUT-TVET',
        country: 'South Africa',
        address: {
            city: 'Durban',
            province: 'KwaZulu-Natal'
        },
        contact: {
            phone: '+27 31 373 5623',
            email: 'tvet@dut.ac.za',
            admissionsEmail: 'tvet-admissions@dut.ac.za'
        },
        web_pages: ['https://www.dut.ac.za/tvet'],
        domains: ['dut.ac.za'],
        applicationUrl: 'https://www.dut.ac.za/tvet/apply',
        description: 'DUT TVET program offers accredited technical vocational training aligned with university standards.',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'Durban Campus', city: 'Durban', province: 'KwaZulu-Natal' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering Technology N1-N3', nqfLevel: 'N1-N3', category: 'Engineering' },
                { name: 'National Certificate: Mechanical Engineering N4-N6', nqfLevel: 'N4-N6', category: 'Engineering' }
            ]
        },
        collegeInfo: {
            accreditationBodies: ['DHET'],
            dhetAccredited: true,
            cheAccredited: false,
            setaAccredited: false
        }
    }
];

async function seedTVETColleges() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB\n');

        console.log('Seeding TVET Colleges...\n');
        let created = 0;
        let skipped = 0;

        for (const college of TVET_COLLEGES) {
            const exists = await University.findOne({ code: college.code });
            if (!exists) {
                await University.create(college);
                console.log(`✓ Created: ${college.name}`);
                created++;
            } else {
                console.log(`⊘ Skipped: ${college.name} (already exists)`);
                skipped++;
            }
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log('TVET COLLEGES SEEDING COMPLETE');
        console.log(`${'='.repeat(60)}`);
        console.log(`✓ Colleges created: ${created}`);
        console.log(`⊘ Colleges skipped: ${skipped}`);
        console.log(`\n✓ TVET colleges are now available in your app!`);
        console.log(`   Navigate to: /all-institutions`);
        console.log(`   Filter by: TVET College`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding TVET colleges:', error);
        process.exit(1);
    }
}

seedTVETColleges();
