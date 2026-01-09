import mongoose from 'mongoose';
import dotenv from 'dotenv';
import University from './src/models/University.js';

dotenv.config();

const CAO_INSTITUTIONS = [
    {
        name: 'University of KwaZulu-Natal',
        code: 'UKZN',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Durban', province: 'KwaZulu-Natal' },
        contact: { email: 'admissions@ukzn.ac.za' },
        courses: [
            { code: 'BAS', name: 'Bachelor of Accounting Sciences', level: 'Bachelor', faculty: 'Commerce', department: 'Accounting', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 24 }, isActive: true },
            { code: 'BCM', name: 'Bachelor of Commerce', level: 'Bachelor', faculty: 'Commerce', department: 'Business Administration', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 20 }, isActive: true },
            { code: 'BSC', name: 'Bachelor of Science', level: 'Bachelor', faculty: 'Science', department: 'Physics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 26 }, isActive: true },
        ]
    },
    {
        name: 'Durban University of Technology',
        code: 'DUT',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Durban', province: 'KwaZulu-Natal' },
        contact: { email: 'admissions@dut.ac.za' },
        courses: [
            { code: 'ENG', name: 'Bachelor of Engineering: Civil', level: 'Bachelor', faculty: 'Engineering', department: 'Civil Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 28 }, isActive: true },
            { code: 'BIT', name: 'Bachelor of Information Technology', level: 'Bachelor', faculty: 'IT', department: 'Software Development', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 24 }, isActive: true },
        ]
    },
    {
        name: 'University of Johannesburg',
        code: 'UJ',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Johannesburg', province: 'Gauteng' },
        contact: { email: 'admissions@uj.ac.za' },
        courses: [
            { code: 'LAW', name: 'Bachelor of Laws', level: 'Bachelor', faculty: 'Law', department: 'Law', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 30 }, isActive: true },
            { code: 'MED', name: 'Bachelor of Medicine', level: 'Bachelor', faculty: 'Health Sciences', department: 'Medicine', studyMode: 'Full-time', duration: { value: 6, unit: 'years' }, aps: { minimumAPS: 32 }, isActive: true },
            { code: 'NUR', name: 'Bachelor of Nursing', level: 'Bachelor', faculty: 'Health Sciences', department: 'Nursing', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 22 }, isActive: true },
        ]
    },
    {
        name: 'University of Cape Town',
        code: 'UCT',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Cape Town', province: 'Western Cape' },
        contact: { email: 'admissions@uct.ac.za' },
        courses: [
            { code: 'ENG', name: 'Bachelor of Engineering: Mechanical', level: 'Bachelor', faculty: 'Engineering', department: 'Mechanical Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 29 }, isActive: true },
            { code: 'COM', name: 'Bachelor of Commerce', level: 'Bachelor', faculty: 'Commerce', department: 'Economics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 21 }, isActive: true },
        ]
    },
    {
        name: 'Stellenbosch University',
        code: 'SUN',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Stellenbosch', province: 'Western Cape' },
        contact: { email: 'admissions@sun.ac.za' },
        courses: [
            { code: 'AGR', name: 'Bachelor of Agricultural Sciences', level: 'Bachelor', faculty: 'Agriculture', department: 'Agronomy', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 23 }, isActive: true },
            { code: 'VET', name: 'Bachelor of Veterinary Science', level: 'Bachelor', faculty: 'Agriculture', department: 'Veterinary Science', studyMode: 'Full-time', duration: { value: 5, unit: 'years' }, aps: { minimumAPS: 31 }, isActive: true },
        ]
    },
    {
        name: 'University of Pretoria',
        code: 'UP',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Pretoria', province: 'Gauteng' },
        contact: { email: 'admissions@up.ac.za' },
        courses: [
            { code: 'ENG', name: 'Bachelor of Engineering: Electrical', level: 'Bachelor', faculty: 'Engineering', department: 'Electrical Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 30 }, isActive: true },
            { code: 'PSY', name: 'Bachelor of Psychology', level: 'Bachelor', faculty: 'Humanities', department: 'Psychology', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 19 }, isActive: true },
        ]
    },
    {
        name: 'Wits University',
        code: 'WITS',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Johannesburg', province: 'Gauteng' },
        contact: { email: 'admissions@wits.ac.za' },
        courses: [
            { code: 'MUS', name: 'Bachelor of Music', level: 'Bachelor', faculty: 'Humanities', department: 'Music', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 18 }, isActive: true },
            { code: 'PHI', name: 'Bachelor of Philosophy', level: 'Bachelor', faculty: 'Humanities', department: 'Philosophy', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 17 }, isActive: true },
        ]
    },
    {
        name: 'Rhodes University',
        code: 'RU',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Grahamstown', province: 'Eastern Cape' },
        contact: { email: 'admissions@ru.ac.za' },
        courses: [
            { code: 'ENG', name: 'Bachelor of English', level: 'Bachelor', faculty: 'Humanities', department: 'English', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 16 }, isActive: true },
            { code: 'JOU', name: 'Bachelor of Journalism', level: 'Bachelor', faculty: 'Humanities', department: 'Journalism', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 18 }, isActive: true },
        ]
    },
    {
        name: 'University of the Free State',
        code: 'UFS',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Bloemfontein', province: 'Free State' },
        contact: { email: 'admissions@ufs.ac.za' },
        courses: [
            { code: 'BIO', name: 'Bachelor of Biological Sciences', level: 'Bachelor', faculty: 'Science', department: 'Biology', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 25 }, isActive: true },
            { code: 'CHM', name: 'Bachelor of Chemistry', level: 'Bachelor', faculty: 'Science', department: 'Chemistry', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 24 }, isActive: true },
        ]
    },
    {
        name: 'North-West University',
        code: 'NWU',
        country: 'South Africa',
        type: 'public_university',
        applicationSystem: 'CAO',
        address: { city: 'Potchefstroom', province: 'North West' },
        contact: { email: 'admissions@nwu.ac.za' },
        courses: [
            { code: 'MAT', name: 'Bachelor of Mathematics', level: 'Bachelor', faculty: 'Science', department: 'Mathematics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 27 }, isActive: true },
            { code: 'PHY', name: 'Bachelor of Physics', level: 'Bachelor', faculty: 'Science', department: 'Physics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 26 }, isActive: true },
        ]
    },
];

async function seedCAOInstitutions() {
    try {
        console.log('🌱 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cao-handbook');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing universities...');
        await University.deleteMany({});

        // Insert new data
        console.log('📥 Inserting CAO institutions with courses...');
        const result = await University.insertMany(CAO_INSTITUTIONS);
        console.log(`✅ Successfully seeded ${result.length} CAO institutions`);

        // Verify the data
        const count = await University.countDocuments({ applicationSystem: 'CAO' });
        const totalCourses = await University.aggregate([
            { $match: { applicationSystem: 'CAO' } },
            { $unwind: '$courses' },
            { $count: 'total' }
        ]);

        console.log(`\n📊 Data Summary:`);
        console.log(`   - CAO Universities: ${count}`);
        console.log(`   - Total Courses: ${totalCourses[0]?.total || 0}`);
        console.log(`\n✨ Seeding complete! Your CAO page should now show all programmes.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
}

seedCAOInstitutions();
