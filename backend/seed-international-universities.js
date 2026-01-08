import mongoose from 'mongoose';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import University from './src/models/University.js';
import Course from './src/models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Fetch international universities from the API
const fetchInternationalUniversities = async () => {
    try {
        console.log('🌍 Fetching international universities from API...');

        // Fetch from public universities API
        const response = await axios.get('http://universities.hipolabs.com/search?country=United%20States');
        const usUniversities = response.data;

        console.log(`✅ Retrieved ${usUniversities.length} universities from US`);

        // Also fetch from other countries for more diversity
        const countries = ['United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India'];
        const allUniversities = [...usUniversities];

        for (const country of countries) {
            try {
                const countryResponse = await axios.get(`http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`);
                allUniversities.push(...countryResponse.data);
                console.log(`✅ Retrieved ${countryResponse.data.length} universities from ${country}`);

                // Add delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.warn(`⚠️ Could not fetch universities from ${country}: ${error.message}`);
            }
        }

        return allUniversities;
    } catch (error) {
        console.error('Error fetching universities:', error.message);
        // Return mock data if API fails
        return getMockInternationalUniversities();
    }
};

// Mock international universities as fallback
const getMockInternationalUniversities = () => {
    return [
        {
            name: 'Harvard University',
            country: 'United States',
            alpha_two_code: 'US',
            web_pages: ['https://www.harvard.edu'],
            domains: ['harvard.edu'],
            description: 'Leading research university in Cambridge, Massachusetts',
            address: 'Cambridge, MA 02138, USA',
            contact: '+1-617-495-1000',
            established_year: 1636,
            accreditation: 'NECHE',
            rankings: { global: 5, national: 2 },
            specialties: ['Research', 'Medicine', 'Law', 'Business'],
        },
        {
            name: 'University of Oxford',
            country: 'United Kingdom',
            alpha_two_code: 'GB',
            web_pages: ['https://www.ox.ac.uk'],
            domains: ['ox.ac.uk'],
            description: 'Historic collegiate university in Oxford',
            address: 'Oxford, United Kingdom',
            contact: '+44-1865-270000',
            established_year: 1096,
            accreditation: 'QAA',
            rankings: { global: 2, national: 1 },
            specialties: ['Humanities', 'Sciences', 'Medicine', 'Law'],
        },
        {
            name: 'University of Toronto',
            country: 'Canada',
            alpha_two_code: 'CA',
            web_pages: ['https://www.utoronto.ca'],
            domains: ['utoronto.ca'],
            description: 'Leading research university in Toronto',
            address: 'Toronto, Ontario, Canada',
            contact: '+1-416-978-2011',
            established_year: 1827,
            accreditation: 'AAQC',
            rankings: { global: 25, national: 1 },
            specialties: ['Engineering', 'Medicine', 'Business', 'Research'],
        },
        {
            name: 'University of Melbourne',
            country: 'Australia',
            alpha_two_code: 'AU',
            web_pages: ['https://www.unimelb.edu.au'],
            domains: ['unimelb.edu.au'],
            description: 'Leading university in Melbourne, Australia',
            address: 'Parkville, VIC 3052, Australia',
            contact: '+61-3-9035-5555',
            established_year: 1853,
            accreditation: 'TEQSA',
            rankings: { global: 37, national: 1 },
            specialties: ['Medicine', 'Engineering', 'Law', 'Business'],
        },
        {
            name: 'University of Tokyo',
            country: 'Japan',
            alpha_two_code: 'JP',
            web_pages: ['https://www.u-tokyo.ac.jp'],
            domains: ['u-tokyo.ac.jp'],
            description: 'Japan\'s premier university',
            address: 'Tokyo, Japan',
            contact: '+81-3-3812-2111',
            established_year: 1877,
            accreditation: 'JUAA',
            rankings: { global: 42, national: 1 },
            specialties: ['Engineering', 'Science', 'Medicine', 'Law'],
        },
        {
            name: 'ETH Zurich',
            country: 'Switzerland',
            alpha_two_code: 'CH',
            web_pages: ['https://www.ethz.ch'],
            domains: ['ethz.ch'],
            description: 'Swiss Federal Institute of Technology',
            address: 'Zurich, Switzerland',
            contact: '+41-44-632-1111',
            established_year: 1855,
            accreditation: 'ASIIN',
            rankings: { global: 9, national: 1 },
            specialties: ['Engineering', 'Sciences', 'Architecture'],
        },
        {
            name: 'Indian Institute of Technology Delhi',
            country: 'India',
            alpha_two_code: 'IN',
            web_pages: ['https://home.iitd.ac.in'],
            domains: ['iitd.ac.in'],
            description: 'Premier engineering institute in India',
            address: 'New Delhi, India',
            contact: '+91-11-2659-1000',
            established_year: 1961,
            accreditation: 'AICTE',
            rankings: { global: 172, national: 1 },
            specialties: ['Engineering', 'Science', 'Technology'],
        },
        {
            name: 'Sorbonne University',
            country: 'France',
            alpha_two_code: 'FR',
            web_pages: ['https://www.sorbonne-universite.fr'],
            domains: ['sorbonne-universite.fr'],
            description: 'Historic university in Paris',
            address: 'Paris, France',
            contact: '+33-1-4427-6000',
            established_year: 1257,
            accreditation: 'HCERES',
            rankings: { global: 48, national: 1 },
            specialties: ['Medicine', 'Science', 'Humanities', 'Law'],
        },
        {
            name: 'National University of Singapore',
            country: 'Singapore',
            alpha_two_code: 'SG',
            web_pages: ['https://www.nus.edu.sg'],
            domains: ['nus.edu.sg'],
            description: 'Leading university in Asia',
            address: 'Singapore',
            contact: '+65-6516-1111',
            established_year: 1905,
            accreditation: 'AQAFI',
            rankings: { global: 11, national: 1 },
            specialties: ['Engineering', 'Medicine', 'Business', 'Law'],
        },
        {
            name: 'Tsinghua University',
            country: 'China',
            alpha_two_code: 'CN',
            web_pages: ['https://www.tsinghua.edu.cn'],
            domains: ['tsinghua.edu.cn'],
            description: 'Leading university in China',
            address: 'Beijing, China',
            contact: '+86-10-6279-6666',
            established_year: 1911,
            accreditation: 'CNPC',
            rankings: { global: 25, national: 2 },
            specialties: ['Engineering', 'Science', 'Management', 'Medicine'],
        },
    ];
};

// Mock international courses
const getMockInternationalCourses = () => {
    return [
        { code: 'CS101', name: 'Computer Science Fundamentals', duration: 4, level: 'Undergraduate', capacity: 500 },
        { code: 'CS201', name: 'Advanced Algorithms', duration: 2, level: 'Masters', capacity: 60 },
        { code: 'ENG101', name: 'English Literature', duration: 4, level: 'Undergraduate', capacity: 150 },
        { code: 'BUS101', name: 'Business Administration', duration: 4, level: 'Undergraduate', capacity: 300 },
        { code: 'MED101', name: 'Medicine & Surgery', duration: 6, level: 'Undergraduate', capacity: 100 },
        { code: 'ENG401', name: 'Engineering Management', duration: 2, level: 'Masters', capacity: 80 },
        { code: 'SCI101', name: 'Physics & Mathematics', duration: 4, level: 'Undergraduate', capacity: 200 },
        { code: 'LAW101', name: 'International Law', duration: 3, level: 'Masters', capacity: 75 },
        { code: 'MBA501', name: 'Master of Business Administration', duration: 2, level: 'Masters', capacity: 120 },
        { code: 'PHD601', name: 'Research Methods & Thesis', duration: 4, level: 'PhD', capacity: 40 },
    ];
};

// Seed universities
const seedUniversities = async (universities) => {
    try {
        console.log('\n📚 Seeding universities...');

        // Clear existing universities
        await University.deleteMany({});
        console.log('Cleared existing universities');

        const formattedUniversities = universities.map((uni, index) => ({
            name: uni.name || `International University ${index + 1}`,
            country: uni.country || 'International',
            alpha_two_code: uni.alpha_two_code || 'INT',
            web_pages: uni.web_pages || [],
            domains: uni.domains || [],
            description: uni.description || `World-class university offering diverse programs`,
            address: uni.address || 'International',
            contact: uni.contact || '+1-000-000-0000',
            established_year: uni.established_year || 2000,
            accreditation: uni.accreditation || 'Accredited',
            rankings: uni.rankings || { global: 100, national: 10 },
            specialties: uni.specialties || ['General Studies'],
            isActive: true,
            source: 'international-api',
        }));

        const inserted = await University.insertMany(formattedUniversities);
        console.log(`✅ Inserted ${inserted.length} universities`);

        return inserted;
    } catch (error) {
        console.error('Error seeding universities:', error.message);
        throw error;
    }
};

// Seed courses
const seedCourses = async (universities) => {
    try {
        console.log('\n📖 Seeding courses...');

        // Clear existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses');

        const mockCourses = getMockInternationalCourses();
        const courses = [];

        // Assign courses to universities randomly
        for (const course of mockCourses) {
            for (let i = 0; i < 8; i++) {
                const randomUniversity = universities[Math.floor(Math.random() * universities.length)];
                courses.push({
                    code: `${randomUniversity._id.toString().substring(0, 3).toUpperCase()}-${course.code}`,
                    name: course.name,
                    description: `${course.name} program at ${randomUniversity.name}`,
                    university: randomUniversity._id,
                    universityName: randomUniversity.name,
                    duration: course.duration,
                    level: course.level,
                    capacity: course.capacity,
                    availableSeats: course.capacity,
                    tuitionFee: Math.floor(Math.random() * 30000 + 5000),
                    startDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
                    requirements: {
                        gpa: 3.0 + Math.random() * 0.5,
                        englishTest: 'TOEFL/IELTS',
                        documents: ['Transcript', 'Statement of Purpose', 'Recommendation Letters'],
                    },
                    isActive: true,
                });
            }
        }

        const insertedCourses = await Course.insertMany(courses);
        console.log(`✅ Inserted ${insertedCourses.length} courses`);

        return insertedCourses;
    } catch (error) {
        console.error('Error seeding courses:', error.message);
        throw error;
    }
};

// Main execution
const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🚀 Starting international universities and courses seed...\n');

        // Fetch international universities
        const universities = await fetchInternationalUniversities();

        // Seed to database
        const insertedUniversities = await seedUniversities(universities);
        const insertedCourses = await seedCourses(insertedUniversities);

        console.log('\n✨ Database seeding completed successfully!');
        console.log(`📊 Summary: ${insertedUniversities.length} universities, ${insertedCourses.length} courses`);

        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

// Run the seed
seedDatabase();
