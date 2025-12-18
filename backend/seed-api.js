import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const universities = [
    {
        code: 'UKZN',
        name: 'University of KwaZulu-Natal',
        city: 'Durban',
        province: 'KwaZulu-Natal',
        campuses: ['Howard College', 'Westville', 'Pietermaritzburg'],
        accreditation: true,
        nationalRanking: 5,
        internationalRanking: 350,
        email: 'admissions@ukzn.ac.za',
        phone: '+27 31 260 3000',
        website: 'www.ukzn.ac.za'
    },
    {
        code: 'WITS',
        name: 'University of the Witwatersrand',
        city: 'Johannesburg',
        province: 'Gauteng',
        campuses: ['Main Campus', 'East Campus'],
        accreditation: true,
        nationalRanking: 1,
        internationalRanking: 380,
        email: 'admissions@wits.ac.za',
        phone: '+27 11 717 1111',
        website: 'www.wits.ac.za'
    },
    {
        code: 'UCT',
        name: 'University of Cape Town',
        city: 'Cape Town',
        province: 'Western Cape',
        campuses: ['Upper Campus', 'Lower Campus'],
        accreditation: true,
        nationalRanking: 2,
        internationalRanking: 193,
        email: 'admissions@uct.ac.za',
        phone: '+27 21 650 3000',
        website: 'www.uct.ac.za'
    },
    {
        code: 'UNISA',
        name: 'University of South Africa',
        city: 'Pretoria',
        province: 'Gauteng',
        campuses: ['Pretoria', 'Florida'],
        accreditation: true,
        nationalRanking: 8,
        internationalRanking: 450,
        email: 'admissions@unisa.ac.za',
        phone: '+27 12 429 3111',
        website: 'www.unisa.ac.za'
    },
    {
        code: 'STELLENBOSCH',
        name: 'Stellenbosch University',
        city: 'Stellenbosch',
        province: 'Western Cape',
        campuses: ['Main Campus', 'Tygerberg', 'Bellville'],
        accreditation: true,
        nationalRanking: 3,
        internationalRanking: 358,
        email: 'admissions@sun.ac.za',
        phone: '+27 21 808 9111',
        website: 'www.sun.ac.za'
    },
    {
        code: 'UP',
        name: 'University of Pretoria',
        city: 'Pretoria',
        province: 'Gauteng',
        campuses: ['Main Campus', 'Mamelodi'],
        accreditation: true,
        nationalRanking: 4,
        internationalRanking: 389,
        email: 'admissions@up.ac.za',
        phone: '+27 12 420 3111',
        website: 'www.up.ac.za'
    }
];

const courses = [
    {
        code: 'ENGB001',
        name: 'Bachelor of Engineering (Civil)',
        universityCode: 'WITS',
        level: 'Undergraduate',
        duration: '4 years',
        studyMode: 'Full-time',
        capacity: 150,
        tuitionFee: 85000,
        aps: {
            minimumAPS: 25,
            englishAPS: 4,
            mathAPS: 4,
            subjects: [
                { name: 'Mathematics', minimumAPS: 4 },
                { name: 'Physical Science', minimumAPS: 4 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 60,
            minimumLanguageScore: 5,
            minimumMathScore: 60,
            requiredSubjects: ['Mathematics', 'Physical Science'],
            englishProficiency: 'NSC Level 4 or equivalent',
            additionalRequirements: 'Strong foundation in Mathematics'
        },
        modules: ['Engineering Design', 'Structural Analysis', 'Fluid Mechanics', 'Construction Management'],
        careerOutcomes: ['Civil Engineer', 'Structural Engineer', 'Project Manager']
    },
    {
        code: 'BUS001',
        name: 'Bachelor of Business Science',
        universityCode: 'WITS',
        level: 'Undergraduate',
        duration: '3 years',
        studyMode: 'Full-time',
        capacity: 300,
        tuitionFee: 65000,
        aps: {
            minimumAPS: 20,
            englishAPS: 3,
            mathAPS: 3,
            subjects: [
                { name: 'Mathematics', minimumAPS: 3 },
                { name: 'English', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 50,
            minimumLanguageScore: 4,
            minimumMathScore: 50,
            requiredSubjects: ['English', 'Mathematics'],
            englishProficiency: 'NSC Level 3 or equivalent',
            additionalRequirements: 'None'
        },
        modules: ['Accounting', 'Economics', 'Management', 'Business Law'],
        careerOutcomes: ['Management Consultant', 'Financial Analyst', 'Business Manager']
    },
    {
        code: 'MED001',
        name: 'Bachelor of Medicine, Bachelor of Surgery (MBChB)',
        universityCode: 'UCT',
        level: 'Undergraduate',
        duration: '6 years',
        studyMode: 'Full-time',
        capacity: 90,
        tuitionFee: 120000,
        aps: {
            minimumAPS: 30,
            englishAPS: 5,
            mathAPS: 5,
            subjects: [
                { name: 'Mathematics', minimumAPS: 5 },
                { name: 'Physical Science', minimumAPS: 5 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 75,
            minimumLanguageScore: 6,
            minimumMathScore: 75,
            requiredSubjects: ['Mathematics', 'Physical Science'],
            englishProficiency: 'NSC Level 5 or equivalent',
            additionalRequirements: 'ADMISSIONS TEST (UCAT/GAMSAT), Strong academic record'
        },
        modules: ['Anatomy', 'Physiology', 'Biochemistry', 'Clinical Practice'],
        careerOutcomes: ['Medical Doctor', 'Surgeon', 'Medical Specialist']
    },
    {
        code: 'LAW001',
        name: 'Bachelor of Laws (LLB)',
        universityCode: 'UCT',
        level: 'Undergraduate',
        duration: '4 years',
        studyMode: 'Full-time',
        capacity: 200,
        tuitionFee: 75000,
        aps: {
            minimumAPS: 24,
            englishAPS: 5,
            mathAPS: 3,
            subjects: [
                { name: 'English', minimumAPS: 5 },
                { name: 'Mathematics', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 65,
            minimumLanguageScore: 6,
            minimumMathScore: 50,
            requiredSubjects: ['English'],
            englishProficiency: 'NSC Level 5 or equivalent',
            additionalRequirements: 'Strong writing and analytical skills'
        },
        modules: ['Constitutional Law', 'Criminal Law', 'Commercial Law', 'Legal Practice'],
        careerOutcomes: ['Lawyer', 'Legal Advisor', 'Prosecutor']
    },
    {
        code: 'AGR001',
        name: 'Bachelor of Science in Agriculture',
        universityCode: 'STELLENBOSCH',
        level: 'Undergraduate',
        duration: '4 years',
        studyMode: 'Full-time',
        capacity: 120,
        tuitionFee: 70000,
        aps: {
            minimumAPS: 18,
            englishAPS: 3,
            mathAPS: 3,
            subjects: [
                { name: 'Mathematics', minimumAPS: 3 },
                { name: 'Life Sciences', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 55,
            minimumLanguageScore: 4,
            minimumMathScore: 55,
            requiredSubjects: ['Mathematics', 'Life Sciences'],
            englishProficiency: 'NSC Level 3 or equivalent',
            additionalRequirements: 'Interest in agriculture and farm management'
        },
        modules: ['Crop Science', 'Animal Science', 'Soil Science', 'Farm Management'],
        careerOutcomes: ['Farmer', 'Agricultural Scientist', 'Agribusiness Manager']
    },
    {
        code: 'CS001',
        name: 'Bachelor of Science in Computer Science',
        universityCode: 'STELLENBOSCH',
        level: 'Undergraduate',
        duration: '3 years',
        studyMode: 'Full-time',
        capacity: 250,
        tuitionFee: 72000,
        aps: {
            minimumAPS: 22,
            englishAPS: 3,
            mathAPS: 5,
            subjects: [
                { name: 'Mathematics', minimumAPS: 5 },
                { name: 'Physical Science', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 60,
            minimumLanguageScore: 4,
            minimumMathScore: 70,
            requiredSubjects: ['Mathematics', 'Physical Science'],
            englishProficiency: 'NSC Level 3 or equivalent',
            additionalRequirements: 'Strong Mathematical ability'
        },
        modules: ['Programming', 'Database Design', 'Web Development', 'Artificial Intelligence'],
        careerOutcomes: ['Software Developer', 'Data Scientist', 'IT Manager']
    },
    {
        code: 'PSY001',
        name: 'Bachelor of Science in Psychology',
        universityCode: 'UP',
        level: 'Undergraduate',
        duration: '3 years',
        studyMode: 'Full-time',
        capacity: 200,
        tuitionFee: 68000,
        aps: {
            minimumAPS: 19,
            englishAPS: 4,
            mathAPS: 3,
            subjects: [
                { name: 'English', minimumAPS: 4 },
                { name: 'Mathematics', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 55,
            minimumLanguageScore: 4,
            minimumMathScore: 50,
            requiredSubjects: ['English'],
            englishProficiency: 'NSC Level 4 or equivalent',
            additionalRequirements: 'Interest in human behavior'
        },
        modules: ['Developmental Psychology', 'Clinical Psychology', 'Research Methods', 'Cognitive Psychology'],
        careerOutcomes: ['Clinical Psychologist', 'Counselor', 'Human Resources Specialist']
    },
    {
        code: 'TEACH001',
        name: 'Bachelor of Education (Secondary)',
        universityCode: 'UP',
        level: 'Undergraduate',
        duration: '4 years',
        studyMode: 'Full-time',
        capacity: 180,
        tuitionFee: 55000,
        aps: {
            minimumAPS: 17,
            englishAPS: 3,
            mathAPS: 3,
            subjects: [
                { name: 'English', minimumAPS: 3 },
                { name: 'Any subject', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 50,
            minimumLanguageScore: 3,
            minimumMathScore: 50,
            requiredSubjects: ['English'],
            englishProficiency: 'NSC Level 3 or equivalent',
            additionalRequirements: 'Teaching aptitude'
        },
        modules: ['Pedagogy', 'Curriculum Development', 'Subject Specialization', 'Educational Psychology'],
        careerOutcomes: ['Secondary Teacher', 'School Administrator', 'Educational Consultant']
    },
    {
        code: 'NURS001',
        name: 'Bachelor of Science in Nursing',
        universityCode: 'UNISA',
        level: 'Undergraduate',
        duration: '4 years',
        studyMode: 'Full-time',
        capacity: 160,
        tuitionFee: 78000,
        aps: {
            minimumAPS: 20,
            englishAPS: 4,
            mathAPS: 3,
            subjects: [
                { name: 'English', minimumAPS: 4 },
                { name: 'Life Sciences', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 60,
            minimumLanguageScore: 4,
            minimumMathScore: 50,
            requiredSubjects: ['English', 'Life Sciences'],
            englishProficiency: 'NSC Level 4 or equivalent',
            additionalRequirements: 'Interest in healthcare, compassion for patients'
        },
        modules: ['Nursing Science', 'Pharmacology', 'Clinical Practice', 'Healthcare Management'],
        careerOutcomes: ['Registered Nurse', 'Nurse Manager', 'Healthcare Administrator']
    },
    {
        code: 'ACC001',
        name: 'Bachelor of Commerce in Accounting',
        universityCode: 'UNISA',
        level: 'Undergraduate',
        duration: '3 years',
        studyMode: 'Full-time',
        capacity: 220,
        tuitionFee: 66000,
        aps: {
            minimumAPS: 21,
            englishAPS: 3,
            mathAPS: 4,
            subjects: [
                { name: 'Mathematics', minimumAPS: 4 },
                { name: 'English', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 58,
            minimumLanguageScore: 4,
            minimumMathScore: 60,
            requiredSubjects: ['Mathematics', 'English'],
            englishProficiency: 'NSC Level 3 or equivalent',
            additionalRequirements: 'Strong numerical skills'
        },
        modules: ['Financial Accounting', 'Cost Accounting', 'Auditing', 'Taxation'],
        careerOutcomes: ['Chartered Accountant', 'Auditor', 'Financial Analyst']
    },
    {
        code: 'ARCH001',
        name: 'Bachelor of Architecture',
        universityCode: 'UKZN',
        level: 'Undergraduate',
        duration: '5 years',
        studyMode: 'Full-time',
        capacity: 100,
        tuitionFee: 90000,
        aps: {
            minimumAPS: 26,
            englishAPS: 4,
            mathAPS: 4,
            subjects: [
                { name: 'Mathematics', minimumAPS: 4 },
                { name: 'Physical Science', minimumAPS: 3 }
            ]
        },
        entryRequirements: {
            minimumMatricScore: 65,
            minimumLanguageScore: 4,
            minimumMathScore: 65,
            requiredSubjects: ['Mathematics'],
            englishProficiency: 'NSC Level 4 or equivalent',
            additionalRequirements: 'Portfolio of artwork, strong design skills'
        },
        modules: ['Architectural Design', 'Building Technology', 'Professional Practice', 'Environmental Design'],
        careerOutcomes: ['Architect', 'Urban Planner', 'Architectural Technologist']
    }
];

async function seedData() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Add universities
        console.log('📚 Adding Universities...');
        for (const uni of universities) {
            try {
                await axios.post(`${API_URL}/universities`, uni);
                console.log(`   ✅ ${uni.code}: ${uni.name}`);
            } catch (err) {
                if (err.response?.status === 409) {
                    console.log(`   ⏭️  ${uni.code}: Already exists`);
                } else {
                    console.log(`   ❌ ${uni.code}: ${err.message}`);
                }
            }
        }

        console.log('\n📖 Adding Courses...');
        for (const course of courses) {
            try {
                await axios.post(`${API_URL}/courses`, course);
                console.log(`   ✅ ${course.code}: ${course.name}`);
            } catch (err) {
                if (err.response?.status === 409) {
                    console.log(`   ⏭️  ${course.code}: Already exists`);
                } else {
                    console.log(`   ❌ ${course.code}: ${err.message}`);
                }
            }
        }

        console.log('\n✅ Database seeding completed!');
        console.log(`\n📊 Summary:`);
        console.log(`   Universities: ${universities.length}`);
        console.log(`   Courses: ${courses.length}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
}

seedData();
