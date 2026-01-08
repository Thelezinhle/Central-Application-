import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

import University from './src/models/University.js';
import Course from './src/models/Course.js';

const expandedGlobalData = [
    // ========================================
    // SOUTH AFRICAN UNIVERSITIES (8)
    // ========================================
    {
        name: "University of Pretoria",
        country: "South Africa",
        alpha_two_code: "ZA",
        code: "UP",
        description: "Research-intensive university with strong engineering programs",
        address: { street: "Hatfield Campus", city: "Pretoria", province: "Gauteng", postalCode: "0028" },
        contact: { phone: "+27 12 420 3111", email: "info@up.ac.za", admissionsEmail: "admissions@up.ac.za" },
        web_pages: ["https://www.up.ac.za/"],
        domains: ["up.ac.za"],
        established: 1908,
        studentCount: 55000,
        staffCount: 5800,
        courses: [
            {
                code: "BE-MECH",
                name: "Bachelor of Engineering (Mechanical)",
                faculty: "Engineering, Built Environment and Information Technology",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 75,
                    minimumMathScore: 85,
                    requiredSubjects: ["Mathematics", "Physical Sciences"]
                },
                aps: { minimumAPS: 42 },
                tuitionFee: { amount: 36000, currency: "ZAR" },
                modules: [
                    {
                        code: "MEC101",
                        name: "Mechanics of Solids I",
                        description: "Fundamentals of statics and stress analysis",
                        credits: 14,
                        year: 1,
                        semester: 1,
                        prerequisites: ["Mathematics"],
                        learningOutcomes: ["Apply equilibrium equations", "Analyze stress and strain"],
                        assessmentMethod: "Exam 60%, Assignments 40%"
                    },
                    {
                        code: "MEC102",
                        name: "Mechanics of Solids II",
                        description: "Bending, torsion, and material properties",
                        credits: 14,
                        year: 1,
                        semester: 2,
                        prerequisites: ["MEC101"],
                        learningOutcomes: ["Calculate bending moments", "Design beams and shafts"],
                        assessmentMethod: "Exam 60%, Practical 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of KwaZulu-Natal",
        country: "South Africa",
        alpha_two_code: "ZA",
        code: "UKZN",
        description: "Multi-campus university with diverse academic programs",
        address: { street: "Durban Campus", city: "Durban", province: "KwaZulu-Natal", postalCode: "4041" },
        contact: { phone: "+27 31 260 7111", email: "info@ukzn.ac.za", admissionsEmail: "admissions@ukzn.ac.za" },
        web_pages: ["https://www.ukzn.ac.za/"],
        domains: ["ukzn.ac.za"],
        established: 1949,
        studentCount: 43000,
        staffCount: 4200,
        courses: [
            {
                code: "BS-BIOTECH",
                name: "Bachelor of Science (Biotechnology)",
                faculty: "Science",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: {
                    minimumMatricScore: 70,
                    requiredSubjects: ["Biology", "Chemistry", "Mathematics"]
                },
                aps: { minimumAPS: 38 },
                tuitionFee: { amount: 26000, currency: "ZAR" },
                modules: [
                    {
                        code: "BIO101",
                        name: "Cell Biology and Genetics",
                        description: "Cellular structures, DNA, and heredity",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Understand cell organelles", "Explain genetic inheritance"],
                        assessmentMethod: "Exam 60%, Lab 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Rhodes University",
        country: "South Africa",
        alpha_two_code: "ZA",
        code: "RHODES",
        description: "Residential university known for research and teaching excellence",
        address: { street: "Grahamstown", city: "Grahamstown", province: "Eastern Cape", postalCode: "6140" },
        contact: { phone: "+27 46 603 8111", email: "info@ru.ac.za", admissionsEmail: "admissions@ru.ac.za" },
        web_pages: ["https://www.ru.ac.za/"],
        domains: ["ru.ac.za"],
        established: 1904,
        studentCount: 8500,
        staffCount: 1200,
        courses: [
            {
                code: "BA-PSYCH",
                name: "Bachelor of Arts (Psychology)",
                faculty: "Humanities",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 65 },
                aps: { minimumAPS: 35 },
                tuitionFee: { amount: 22000, currency: "ZAR" },
                modules: [
                    {
                        code: "PSY101",
                        name: "Introduction to Psychology",
                        description: "Foundations of psychological science",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Understand psychological perspectives", "Research methods"],
                        assessmentMethod: "Essay 40%, Exam 60%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Tshwane University of Technology",
        country: "South Africa",
        alpha_two_code: "ZA",
        code: "TUT",
        description: "Technology-focused university with vocational emphasis",
        address: { street: "Pretoria Campus", city: "Pretoria", province: "Gauteng", postalCode: "0183" },
        contact: { phone: "+27 12 382 6000", email: "info@tut.ac.za", admissionsEmail: "admissions@tut.ac.za" },
        web_pages: ["https://www.tut.ac.za/"],
        domains: ["tut.ac.za"],
        established: 2004,
        studentCount: 65000,
        staffCount: 4500,
        courses: [
            {
                code: "ND-ELECT",
                name: "National Diploma (Electrical Engineering)",
                faculty: "Engineering",
                level: "Diploma",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 55 },
                aps: { minimumAPS: 25 },
                tuitionFee: { amount: 18000, currency: "ZAR" },
                modules: [
                    {
                        code: "ELE101",
                        name: "DC Circuit Analysis",
                        description: "Basic circuit theory and analysis",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Apply Ohm's law", "Solve circuit problems"],
                        assessmentMethod: "Exam 50%, Practical 50%"
                    }
                ],
                isActive: true
            }
        ]
    },

    // ========================================
    // AFRICAN UNIVERSITIES (8)
    // ========================================
    {
        name: "Makerere University",
        country: "Uganda",
        alpha_two_code: "UG",
        code: "MAK",
        description: "Leading university in East Africa with research focus",
        address: { street: "Kampala", city: "Kampala", province: "Central Region", postalCode: "256" },
        contact: { phone: "+256 414 307 000", email: "info@mak.ac.ug", admissionsEmail: "admissions@mak.ac.ug" },
        web_pages: ["https://www.mak.ac.ug/"],
        domains: ["mak.ac.ug"],
        established: 1922,
        studentCount: 42000,
        staffCount: 3500,
        courses: [
            {
                code: "BE-CHEM",
                name: "Bachelor of Engineering (Chemical)",
                faculty: "Engineering",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 70, requiredSubjects: ["Chemistry", "Physics", "Mathematics"] },
                aps: { minimumAPS: 38 },
                tuitionFee: { amount: 8000000, currency: "UGX" },
                modules: [
                    {
                        code: "CHE101",
                        name: "Chemical Engineering Thermodynamics",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Apply thermodynamic principles"],
                        assessmentMethod: "Exam 70%, Assignments 30%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Dar es Salaam",
        country: "Tanzania",
        alpha_two_code: "TZ",
        code: "UDSM",
        description: "Flagship university in Tanzania with diverse programs",
        address: { street: "Dar es Salaam", city: "Dar es Salaam", province: "Dar es Salaam", postalCode: "255" },
        contact: { phone: "+255 22 241 4178", email: "info@udsm.ac.tz", admissionsEmail: "admissions@udsm.ac.tz" },
        web_pages: ["https://www.udsm.ac.tz/"],
        domains: ["udsm.ac.tz"],
        established: 1961,
        studentCount: 31000,
        staffCount: 2800,
        courses: [
            {
                code: "BSC-IT",
                name: "Bachelor of Science (Information Technology)",
                faculty: "Science and Engineering",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 65 },
                aps: { minimumAPS: 35 },
                tuitionFee: { amount: 5000000, currency: "TZS" },
                modules: [
                    {
                        code: "IT101",
                        name: "Database Management Systems",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Design databases", "SQL queries"],
                        assessmentMethod: "Exam 60%, Project 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Rwanda",
        country: "Rwanda",
        alpha_two_code: "RW",
        code: "UR",
        description: "National research university with tech focus",
        address: { street: "Kigali", city: "Kigali", province: "Kigali City", postalCode: "250" },
        contact: { phone: "+250 788 123 456", email: "info@ur.ac.rw", admissionsEmail: "admissions@ur.ac.rw" },
        web_pages: ["https://www.ur.ac.rw/"],
        domains: ["ur.ac.rw"],
        established: 2013,
        studentCount: 28000,
        staffCount: 2500,
        courses: [
            {
                code: "BE-SOFT",
                name: "Bachelor of Engineering (Software)",
                faculty: "Engineering",
                level: "Bachelor",
                duration: { value: 4, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 70, requiredSubjects: ["Mathematics", "Physics"] },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 3000000, currency: "RWF" },
                modules: [
                    {
                        code: "SE101",
                        name: "Software Development Fundamentals",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        prerequisites: ["Programming basics"],
                        learningOutcomes: ["Write clean code", "Understand SDLC"],
                        assessmentMethod: "Project 60%, Exam 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Université Cheikh Anta Diop",
        country: "Senegal",
        alpha_two_code: "SN",
        code: "UCAD",
        description: "Leading university in West Africa",
        address: { street: "Dakar", city: "Dakar", province: "Dakar Region", postalCode: "221" },
        contact: { phone: "+221 33 824 9697", email: "info@ucad.sn", admissionsEmail: "admissions@ucad.sn" },
        web_pages: ["https://www.ucad.sn/"],
        domains: ["ucad.sn"],
        established: 1957,
        studentCount: 65000,
        staffCount: 4000,
        courses: [
            {
                code: "LIC-PHYSIQUE",
                name: "Licence en Physique",
                faculty: "Sciences",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 70 },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 250000, currency: "XOF" },
                modules: [
                    {
                        code: "PHY101",
                        name: "Mécanique Classique",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Appliquer les lois de Newton"],
                        assessmentMethod: "Examen 70%, TD 30%"
                    }
                ],
                isActive: true
            }
        ]
    },

    // ========================================
    // EUROPEAN UNIVERSITIES (10)
    // ========================================
    {
        name: "Technical University of Munich",
        country: "Germany",
        alpha_two_code: "DE",
        code: "TUM",
        description: "Top-ranked technical university in Europe",
        address: { street: "Arcisstrasse 21", city: "Munich", province: "Bavaria", postalCode: "80333" },
        contact: { phone: "+49 89 289 01", email: "info@tum.de", admissionsEmail: "admissions@tum.de" },
        web_pages: ["https://www.tum.de/"],
        domains: ["tum.de"],
        established: 1868,
        studentCount: 47000,
        staffCount: 4200,
        courses: [
            {
                code: "MS-CS",
                name: "Master of Science in Computer Science",
                faculty: "Engineering",
                level: "Masters",
                duration: { value: 2, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 85, requiredSubjects: ["Computer Science fundamentals"] },
                aps: { minimumAPS: 45 },
                tuitionFee: { amount: 0, currency: "EUR" },
                modules: [
                    {
                        code: "CS501",
                        name: "Advanced Algorithms",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        prerequisites: ["Algorithms, Data Structures"],
                        learningOutcomes: ["Analyze algorithm complexity", "Design efficient solutions"],
                        assessmentMethod: "Exam 60%, Project 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Amsterdam",
        country: "Netherlands",
        alpha_two_code: "NL",
        code: "UVA",
        description: "Research-intensive with international outlook",
        address: { street: "Spui 21", city: "Amsterdam", province: "North Holland", postalCode: "1012 WX" },
        contact: { phone: "+31 20 525 9111", email: "info@uva.nl", admissionsEmail: "admissions@uva.nl" },
        web_pages: ["https://www.uva.nl/"],
        domains: ["uva.nl"],
        established: 1877,
        studentCount: 42000,
        staffCount: 4200,
        courses: [
            {
                code: "BA-PHILO",
                name: "Bachelor of Arts in Philosophy",
                faculty: "Humanities",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 70 },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 2000, currency: "EUR" },
                modules: [
                    {
                        code: "PHIL101",
                        name: "History of Western Philosophy",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Understand philosophical traditions"],
                        assessmentMethod: "Essays 100%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Copenhagen",
        country: "Denmark",
        alpha_two_code: "DK",
        code: "UCPH",
        description: "Scandinavia's largest university with strong research",
        address: { street: "Nørregade 10", city: "Copenhagen", province: "Capital Region", postalCode: "1165" },
        contact: { phone: "+45 3532 1000", email: "info@ku.dk", admissionsEmail: "admissions@ku.dk" },
        web_pages: ["https://www.ku.dk/"],
        domains: ["ku.dk"],
        established: 1479,
        studentCount: 44000,
        staffCount: 3800,
        courses: [
            {
                code: "BSC-BIO",
                name: "Bachelor of Science in Biology",
                faculty: "Science",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 75, requiredSubjects: ["Biology", "Chemistry"] },
                aps: { minimumAPS: 42 },
                tuitionFee: { amount: 0, currency: "EUR" },
                modules: [
                    {
                        code: "BIO101",
                        name: "General Biology",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Understand cellular processes"],
                        assessmentMethod: "Exam 60%, Lab 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "KU Leuven",
        country: "Belgium",
        alpha_two_code: "BE",
        code: "KULEUVEN",
        description: "Belgium's leading research university",
        address: { street: "Oude Markt 13", city: "Leuven", province: "Flemish Brabant", postalCode: "3000" },
        contact: { phone: "+32 16 32 7111", email: "info@kuleuven.be", admissionsEmail: "admissions@kuleuven.be" },
        web_pages: ["https://www.kuleuven.be/"],
        domains: ["kuleuven.be"],
        established: 1425,
        studentCount: 55000,
        staffCount: 4500,
        courses: [
            {
                code: "ME-NANO",
                name: "Master of Engineering in Nanotechnology",
                faculty: "Engineering",
                level: "Masters",
                duration: { value: 2, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 85 },
                aps: { minimumAPS: 45 },
                tuitionFee: { amount: 5000, currency: "EUR" },
                modules: [
                    {
                        code: "NANO501",
                        name: "Nanomaterials and Characterization",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Characterize nanomaterials"],
                        assessmentMethod: "Lab 60%, Report 40%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Lisbon",
        country: "Portugal",
        alpha_two_code: "PT",
        code: "UL",
        description: "Portugal's largest university with comprehensive programs",
        address: { street: "Alameda da Universidade", city: "Lisbon", province: "Lisbon District", postalCode: "1649" },
        contact: { phone: "+351 21 759 7000", email: "info@ul.pt", admissionsEmail: "admissions@ul.pt" },
        web_pages: ["https://www.ul.pt/"],
        domains: ["ul.pt"],
        established: 1911,
        studentCount: 62000,
        staffCount: 5000,
        courses: [
            {
                code: "LIC-ENGENHARIA",
                name: "Licenciatura em Engenharia Informática",
                faculty: "Engineering",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 70, requiredSubjects: ["Mathematics", "Physics"] },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 1000, currency: "EUR" },
                modules: [
                    {
                        code: "ENG101",
                        name: "Programação I",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Dominar programação orientada a objetos"],
                        assessmentMethod: "Exame 50%, Projeto 50%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "Trinity College Dublin",
        country: "Ireland",
        alpha_two_code: "IE",
        code: "TCD",
        description: "Ireland's leading university with global recognition",
        address: { street: "College Green", city: "Dublin", province: "Dublin County", postalCode: "D02 ER8" },
        contact: { phone: "+353 1 896 1000", email: "info@tcd.ie", admissionsEmail: "admissions@tcd.ie" },
        web_pages: ["https://www.tcd.ie/"],
        domains: ["tcd.ie"],
        established: 1592,
        studentCount: 18000,
        staffCount: 2500,
        courses: [
            {
                code: "BA-HIST",
                name: "Bachelor of Arts in History",
                faculty: "Arts, Humanities and Social Sciences",
                level: "Bachelor",
                duration: { value: 3, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 70 },
                aps: { minimumAPS: 40 },
                tuitionFee: { amount: 9500, currency: "EUR" },
                modules: [
                    {
                        code: "HIST101",
                        name: "Medieval History",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Analyze historical sources"],
                        assessmentMethod: "Essays 70%, Seminar 30%"
                    }
                ],
                isActive: true
            }
        ]
    },
    {
        name: "University of Oslo",
        country: "Norway",
        alpha_two_code: "NO",
        code: "UIO",
        description: "Scandinavia's leading research university",
        address: { street: "Blindern Campus", city: "Oslo", province: "Akershus", postalCode: "0317" },
        contact: { phone: "+47 2285 5050", email: "info@uio.no", admissionsEmail: "admissions@uio.no" },
        web_pages: ["https://www.uio.no/"],
        domains: ["uio.no"],
        established: 1811,
        studentCount: 28000,
        staffCount: 3000,
        courses: [
            {
                code: "MSC-ENVIRO",
                name: "Master of Science in Environmental Sciences",
                faculty: "Science",
                level: "Masters",
                duration: { value: 2, unit: "years" },
                studyMode: "Full-time",
                entryRequirements: { minimumMatricScore: 80 },
                aps: { minimumAPS: 45 },
                tuitionFee: { amount: 0, currency: "EUR" },
                modules: [
                    {
                        code: "ENV501",
                        name: "Climate Change and Sustainability",
                        credits: 12,
                        year: 1,
                        semester: 1,
                        learningOutcomes: ["Understand climate impacts"],
                        assessmentMethod: "Exam 60%, Project 40%"
                    }
                ],
                isActive: true
            }
        ]
    }
];

const seedExtendedDatabase = async () => {
    try {
        console.log('\n🌍 Starting extended global university seeding...\n');

        let universitiesCreated = 0;
        let coursesCreated = 0;
        let totalErrors = 0;

        for (const universityData of expandedGlobalData) {
            try {
                const existingUniversity = await University.findOne({ name: universityData.name });

                if (existingUniversity) {
                    console.log(`⏭️  Already exists: ${universityData.name}`);
                    continue;
                }

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
                        console.log(`  📚 Added: ${courseData.name}`);
                    } catch (courseError) {
                        console.error(`  ❌ Course error: ${courseError.message}`);
                        totalErrors++;
                    }
                }

                console.log('');
            } catch (universityError) {
                console.error(`❌ University error: ${universityError.message}`);
                totalErrors++;
            }
        }

        console.log('\n✨ Extended seeding complete!');
        console.log(`📊 Results:`);
        console.log(`   ✅ Universities created: ${universitiesCreated}`);
        console.log(`   ✅ Courses created: ${coursesCreated}`);
        console.log(`   ❌ Errors: ${totalErrors}`);
        console.log(`   📈 Total new entries: ${universitiesCreated + coursesCreated}\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
};

seedExtendedDatabase();
