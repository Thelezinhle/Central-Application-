import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Import models
import University from './src/models/University.js';
import Course from './src/models/Course.js';

// Comprehensive global universities data with detailed courses and modules
const globalUniversitiesData = [
    // ========================================
    // SOUTH AFRICAN UNIVERSITIES
    // ========================================
    {
        name: "University of Cape Town",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["https://www.uct.ac.za/"],
        domains: ["uct.ac.za"],
        code: "UCT",
        description: "Leading research university in South Africa and Africa",
        address: {
            street: "Upper Campus, Rondebosch",
            city: "Cape Town",
            province: "Western Cape",
            postalCode: "7701"
        },
        contact: {
            phone: "+27 21 650 9111",
            email: "info@uct.ac.za",
            admissionsEmail: "admissions@uct.ac.za"
        },
        established: 1829,
        studentCount: 36000,
        staffCount: 4500,
        courses: [
            {
                code: "BCS",
                name: "Bachelor of Computer Science",
                faculty: "Engineering & Built Environment",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 70,
                    minimumMathScore: 80,
                    requiredSubjects: ["Mathematics", "Physical Sciences"],
                    englishProficiency: "Home Language or First Additional Language"
                },
                aps: { minimumAPS: 38 },
                tuitionFee: { amount: 28000, currency: "ZAR" },
                modules: [
                    { code: "CS101", name: "Programming Fundamentals", credits: 12, year: 1, semester: 1 },
                    { code: "CS102", name: "Computer Architecture", credits: 12, year: 1, semester: 1 },
                    { code: "CS103", name: "Discrete Mathematics", credits: 12, year: 1, semester: 2 },
                    { code: "CS104", name: "Database Systems", credits: 12, year: 1, semester: 2 },
                    { code: "CS201", name: "Object-Oriented Programming", credits: 12, year: 2, semester: 1 },
                    { code: "CS202", name: "Web Development", credits: 12, year: 2, semester: 1 },
                    { code: "CS203", name: "Software Engineering", credits: 12, year: 2, semester: 2 },
                    { code: "CS204", name: "Data Structures & Algorithms", credits: 12, year: 2, semester: 2 },
                    { code: "CS301", name: "Advanced Programming", credits: 12, year: 3, semester: 1 },
                    { code: "CS302", name: "AI & Machine Learning", credits: 12, year: 3, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of the Witwatersrand",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["https://www.wits.ac.za/"],
        domains: ["wits.ac.za"],
        code: "WITS",
        description: "Premier research university with strong engineering and commerce programs",
        address: {
            street: "1 Jan Smuts Avenue",
            city: "Johannesburg",
            province: "Gauteng",
            postalCode: "2050"
        },
        contact: {
            phone: "+27 11 717 1000",
            email: "info@wits.ac.za",
            admissionsEmail: "admissions@wits.ac.za"
        },
        established: 1922,
        studentCount: 40000,
        staffCount: 5200,
        courses: [
            {
                code: "BCH",
                name: "Bachelor of Commerce",
                faculty: "Commerce, Law and Management",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 65,
                    requiredSubjects: ["Mathematics or Mathematical Literacy"],
                    englishProficiency: "First Additional Language or Home Language"
                },
                aps: { minimumAPS: 32 },
                tuitionFee: { amount: 25000, currency: "ZAR" },
                modules: [
                    { code: "ACC101", name: "Financial Accounting I", credits: 12, year: 1, semester: 1 },
                    { code: "ECO101", name: "Microeconomics", credits: 12, year: 1, semester: 1 },
                    { code: "BUS101", name: "Business Management", credits: 12, year: 1, semester: 2 },
                    { code: "ACC102", name: "Management Accounting", credits: 12, year: 1, semester: 2 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Stellenbosch University",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["https://www.sun.ac.za/"],
        domains: ["sun.ac.za"],
        code: "SUN",
        description: "Leading research university with emphasis on innovation",
        address: {
            street: "Neethling Street",
            city: "Stellenbosch",
            province: "Western Cape",
            postalCode: "7600"
        },
        contact: {
            phone: "+27 21 808 9111",
            email: "info@sun.ac.za",
            admissionsEmail: "admissions@sun.ac.za"
        },
        established: 1918,
        studentCount: 32000,
        staffCount: 3800,
        courses: [
            {
                code: "BEng",
                name: "Bachelor of Engineering (Civil)",
                faculty: "Engineering",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 75,
                    minimumMathScore: 85,
                    requiredSubjects: ["Mathematics", "Physical Sciences"]
                },
                aps: { minimumAPS: 42 },
                tuitionFee: { amount: 35000, currency: "ZAR" },
                modules: [
                    { code: "ENG101", name: "Engineering Mathematics I", credits: 14, year: 1, semester: 1 },
                    { code: "ENG102", name: "Engineering Physics", credits: 14, year: 1, semester: 1 },
                    { code: "CIV101", name: "Civil Engineering Fundamentals", credits: 12, year: 1, semester: 2 }
                ],
                isActive: true
            }
        ]
    },

    // ========================================
    // OTHER AFRICAN UNIVERSITIES
    // ========================================
    {
        name: "University of Lagos",
        country: "Nigeria",
        alpha_two_code: "NG",
        web_pages: ["https://www.unilag.edu.ng/"],
        domains: ["unilag.edu.ng"],
        code: "UNILAG",
        description: "Premier university in West Africa",
        address: {
            street: "Akoka",
            city: "Lagos",
            province: "Lagos State",
            postalCode: "101001"
        },
        contact: {
            phone: "+234 1 123 4567",
            email: "info@unilag.edu.ng",
            admissionsEmail: "admissions@unilag.edu.ng"
        },
        established: 1962,
        studentCount: 45000,
        staffCount: 4800,
        courses: [
            {
                code: "BCS",
                name: "Bachelor of Computer Science",
                faculty: "Science",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 60,
                    requiredSubjects: ["Mathematics", "Physics", "Chemistry"]
                },
                aps: { minimumAPS: 30 },
                tuitionFee: { amount: 450000, currency: "NGN" },
                modules: [
                    { code: "CS101", name: "Programming I", credits: 10, year: 1, semester: 1 },
                    { code: "CS102", name: "Discrete Mathematics", credits: 10, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Ghana",
        country: "Ghana",
        alpha_two_code: "GH",
        web_pages: ["https://www.ug.edu.gh/"],
        domains: ["ug.edu.gh"],
        code: "UG",
        description: "Leading university in Ghana and West Africa",
        address: {
            street: "Legon",
            city: "Accra",
            province: "Greater Accra",
            postalCode: "00233"
        },
        contact: {
            phone: "+233 302 501 501",
            email: "info@ug.edu.gh",
            admissionsEmail: "admissions@ug.edu.gh"
        },
        established: 1948,
        studentCount: 38000,
        staffCount: 3600,
        courses: [
            {
                code: "BEng",
                name: "Bachelor of Engineering",
                faculty: "Engineering",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 65,
                    requiredSubjects: ["Mathematics", "Physics"]
                },
                aps: { minimumAPS: 35 },
                tuitionFee: { amount: 5000, currency: "GHS" },
                modules: [
                    { code: "ENG101", name: "Engineering Graphics", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Nairobi",
        country: "Kenya",
        alpha_two_code: "KE",
        web_pages: ["https://www.uonbi.ac.ke/"],
        domains: ["uonbi.ac.ke"],
        code: "UoN",
        description: "Premier university in East Africa",
        address: {
            street: "Karen Campus",
            city: "Nairobi",
            province: "Nairobi County",
            postalCode: "30197"
        },
        contact: {
            phone: "+254 20 318 262",
            email: "info@uonbi.ac.ke",
            admissionsEmail: "admissions@uonbi.ac.ke"
        },
        established: 1956,
        studentCount: 60000,
        staffCount: 5500,
        courses: [
            {
                code: "BIT",
                name: "Bachelor of Information Technology",
                faculty: "Computers and Informatics",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 60,
                    requiredSubjects: ["Mathematics", "English"]
                },
                aps: { minimumAPS: 32 },
                tuitionFee: { amount: 280000, currency: "KES" },
                modules: [
                    { code: "IT101", name: "Introduction to IT", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },

    // ========================================
    // EUROPEAN UNIVERSITIES
    // ========================================
    {
        name: "University of Oxford",
        country: "United Kingdom",
        alpha_two_code: "GB",
        web_pages: ["https://www.ox.ac.uk/"],
        domains: ["ox.ac.uk"],
        code: "OXF",
        description: "World's leading university with historic excellence",
        address: {
            street: "High Street",
            city: "Oxford",
            province: "England",
            postalCode: "OX1 2JD"
        },
        contact: {
            phone: "+44 1865 270 000",
            email: "info@ox.ac.uk",
            admissionsEmail: "admissions@ox.ac.uk"
        },
        established: 1096,
        studentCount: 24500,
        staffCount: 4200,
        courses: [
            {
                code: "BA-PHYS",
                name: "Bachelor of Arts in Physics",
                faculty: "Physics",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 90,
                    minimumMathScore: 95,
                    requiredSubjects: ["Mathematics A-Level", "Physics A-Level"]
                },
                aps: { minimumAPS: 50 },
                tuitionFee: { amount: 9250, currency: "GBP" },
                modules: [
                    { code: "PHS101", name: "Classical Mechanics", credits: 12, year: 1, semester: 1 },
                    { code: "PHS102", name: "Quantum Mechanics", credits: 12, year: 1, semester: 2 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Cambridge",
        country: "United Kingdom",
        alpha_two_code: "GB",
        web_pages: ["https://www.cam.ac.uk/"],
        domains: ["cam.ac.uk"],
        code: "CAM",
        description: "Ancient university with world-class research",
        address: {
            street: "The Old Schools",
            city: "Cambridge",
            province: "England",
            postalCode: "CB2 1TN"
        },
        contact: {
            phone: "+44 1223 337 733",
            email: "info@cam.ac.uk",
            admissionsEmail: "admissions@cam.ac.uk"
        },
        established: 1209,
        studentCount: 23000,
        staffCount: 3800,
        courses: [
            {
                code: "BA-MATH",
                name: "Bachelor of Arts in Mathematics",
                faculty: "Mathematics",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 92,
                    minimumMathScore: 98,
                    requiredSubjects: ["Mathematics A-Level", "Further Mathematics A-Level"]
                },
                aps: { minimumAPS: 52 },
                tuitionFee: { amount: 9250, currency: "GBP" },
                modules: [
                    { code: "MAT101", name: "Pure Mathematics IA", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Sorbonne University",
        country: "France",
        alpha_two_code: "FR",
        web_pages: ["https://www.sorbonne-universite.fr/"],
        domains: ["sorbonne-universite.fr"],
        code: "SORBONNE",
        description: "Elite university in Paris with global reputation",
        address: {
            street: "4 Place Jussieu",
            city: "Paris",
            province: "Île-de-France",
            postalCode: "75005"
        },
        contact: {
            phone: "+33 1 4427 2000",
            email: "info@sorbonne-universite.fr",
            admissionsEmail: "admissions@sorbonne-universite.fr"
        },
        established: 1257,
        studentCount: 55000,
        staffCount: 4500,
        courses: [
            {
                code: "LICENCE-INFO",
                name: "Licence Informatique (Computer Science)",
                faculty: "Science & Engineering",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 70,
                    requiredSubjects: ["Mathematics", "Physics"]
                },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 300, currency: "EUR" },
                modules: [
                    { code: "INF101", name: "Introduction à l'Informatique", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Heidelberg University",
        country: "Germany",
        alpha_two_code: "DE",
        web_pages: ["https://www.uni-heidelberg.de/"],
        domains: ["uni-heidelberg.de"],
        code: "HEIDELBERG",
        description: "Oldest German university with excellence in research",
        address: {
            street: "Grabengasse 1",
            city: "Heidelberg",
            province: "Baden-Württemberg",
            postalCode: "69117"
        },
        contact: {
            phone: "+49 6221 540",
            email: "info@uni-heidelberg.de",
            admissionsEmail: "admissions@uni-heidelberg.de"
        },
        established: 1386,
        studentCount: 29000,
        staffCount: 3400,
        courses: [
            {
                code: "DIPLOM-PHYSICS",
                name: "Diplom Physik (Physics)",
                faculty: "Faculty of Physics",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 80,
                    requiredSubjects: ["Mathematics", "Physics"]
                },
                aps: { minimumAPS: 45 },
                tuitionFee: { amount: 0, currency: "EUR" },
                modules: [
                    { code: "PHY101", name: "Experimentalphysik I", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "ETH Zurich",
        country: "Switzerland",
        alpha_two_code: "CH",
        web_pages: ["https://www.ethz.ch/"],
        domains: ["ethz.ch"],
        code: "ETH",
        description: "World's leading science and technology university",
        address: {
            street: "Rämistrasse 101",
            city: "Zurich",
            province: "Zurich",
            postalCode: "8092"
        },
        contact: {
            phone: "+41 44 632 11 11",
            email: "info@ethz.ch",
            admissionsEmail: "admissions@ethz.ch"
        },
        established: 1855,
        studentCount: 22500,
        staffCount: 3600,
        courses: [
            {
                code: "BSC-CS",
                name: "Bachelor of Science in Computer Science",
                faculty: "Computer Science",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 90,
                    requiredSubjects: ["Mathematics", "Physics"]
                },
                aps: { minimumAPS: 50 },
                tuitionFee: { amount: 730, currency: "CHF" },
                modules: [
                    { code: "CS101", name: "Algorithms and Data Structures", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Amsterdam",
        country: "Netherlands",
        alpha_two_code: "NL",
        web_pages: ["https://www.uva.nl/"],
        domains: ["uva.nl"],
        code: "UVA",
        description: "Leading research university in the Netherlands",
        address: {
            street: "Spui 21",
            city: "Amsterdam",
            province: "North Holland",
            postalCode: "1012 WX"
        },
        contact: {
            phone: "+31 20 525 9111",
            email: "info@uva.nl",
            admissionsEmail: "admissions@uva.nl"
        },
        established: 1877,
        studentCount: 42000,
        staffCount: 4200,
        courses: [
            {
                code: "BA-ECON",
                name: "Bachelor of Science in Economics",
                faculty: "Economics and Business",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 70,
                    requiredSubjects: ["Mathematics", "English"]
                },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 2000, currency: "EUR" },
                modules: [
                    { code: "ECO101", name: "Microeconomics", credits: 12, year: 1, semester: 1 }
                ],
                isActive: true
            }
        ]
    }
];

// Seed function
const seedDatabase = async () => {
    try {
        console.log('🌍 Starting global university seeding...\n');

        // Clear existing data (optional - comment out if you want to keep existing data)
        // await University.deleteMany({});
        // await Course.deleteMany({});
        // console.log('🗑️  Cleared existing data\n');

        let universitiesCreated = 0;
        let coursesCreated = 0;

        for (const universityData of globalUniversitiesData) {
            try {
                // Check if university already exists
                const existingUniversity = await University.findOne({ name: universityData.name });

                if (existingUniversity) {
                    console.log(`⏭️  University already exists: ${universityData.name}`);
                    continue;
                }

                // Create university
                const university = new University({
                    name: universityData.name,
                    country: universityData.country,
                    alpha_two_code: universityData.alpha_two_code,
                    web_pages: universityData.web_pages,
                    domains: universityData.domains,
                    code: universityData.code,
                    description: universityData.description,
                    address: universityData.address,
                    contact: universityData.contact,
                    established: universityData.established,
                    studentCount: universityData.studentCount,
                    staffCount: universityData.staffCount,
                    isActive: true
                });

                const savedUniversity = await university.save();
                universitiesCreated++;
                console.log(`✅ Created: ${universityData.name} (${universityData.country})`);

                // Create courses for this university
                for (const courseData of universityData.courses) {
                    try {
                        const course = new Course({
                            code: courseData.code,
                            name: courseData.name,
                            university: savedUniversity._id,
                            faculty: courseData.faculty,
                            level: courseData.level,
                            duration: courseData.duration,
                            studyMode: courseData.studyMode,
                            entryRequirements: courseData.entryRequirements,
                            aps: courseData.aps,
                            tuitionFee: courseData.tuitionFee,
                            modules: courseData.modules,
                            isActive: courseData.isActive
                        });

                        await course.save();
                        coursesCreated++;
                        console.log(`  📚 Added course: ${courseData.name}`);
                    } catch (courseError) {
                        console.error(`  ❌ Error creating course ${courseData.code}:`, courseError.message);
                    }
                }

                console.log('');
            } catch (universityError) {
                console.error(`❌ Error creating university ${universityData.name}:`, universityError.message);
            }
        }

        console.log('\n✨ Seeding complete!');
        console.log(`📊 Summary:`);
        console.log(`   • Universities created: ${universitiesCreated}`);
        console.log(`   • Courses created: ${coursesCreated}`);
        console.log(`   • Total entries: ${universitiesCreated + coursesCreated}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal error during seeding:', error);
        process.exit(1);
    }
};

// Run seeding
seedDatabase();
