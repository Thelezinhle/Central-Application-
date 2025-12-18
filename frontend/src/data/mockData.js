// Mock Data for Universities and Courses
export const mockUniversities = [
    {
        _id: '1',
        code: 'WITS',
        name: 'University of the Witwatersrand',
        city: 'Johannesburg',
        province: 'Gauteng',
        campuses: ['Main Campus', 'East Campus'],
        email: 'admissions@wits.ac.za',
        phone: '+27 11 717 1111',
        website: 'www.wits.ac.za'
    },
    {
        _id: '2',
        code: 'UCT',
        name: 'University of Cape Town',
        city: 'Cape Town',
        province: 'Western Cape',
        campuses: ['Upper Campus', 'Lower Campus'],
        email: 'admissions@uct.ac.za',
        phone: '+27 21 650 3000',
        website: 'www.uct.ac.za'
    },
    {
        _id: '3',
        code: 'STELLENBOSCH',
        name: 'Stellenbosch University',
        city: 'Stellenbosch',
        province: 'Western Cape',
        campuses: ['Main Campus', 'Tygerberg', 'Bellville'],
        email: 'admissions@sun.ac.za',
        phone: '+27 21 808 9111',
        website: 'www.sun.ac.za'
    },
    {
        _id: '4',
        code: 'UP',
        name: 'University of Pretoria',
        city: 'Pretoria',
        province: 'Gauteng',
        campuses: ['Main Campus', 'Mamelodi'],
        email: 'admissions@up.ac.za',
        phone: '+27 12 420 3111',
        website: 'www.up.ac.za'
    },
    {
        _id: '5',
        code: 'UKZN',
        name: 'University of KwaZulu-Natal',
        city: 'Durban',
        province: 'KwaZulu-Natal',
        campuses: ['Howard College', 'Westville', 'Pietermaritzburg'],
        email: 'admissions@ukzn.ac.za',
        phone: '+27 31 260 3000',
        website: 'www.ukzn.ac.za'
    },
    {
        _id: '6',
        code: 'UNISA',
        name: 'University of South Africa',
        city: 'Pretoria',
        province: 'Gauteng',
        campuses: ['Pretoria', 'Florida'],
        email: 'admissions@unisa.ac.za',
        phone: '+27 12 429 3111',
        website: 'www.unisa.ac.za'
    }
];

export const mockCourses = [
    {
        _id: '101',
        code: 'ENGB001',
        name: 'Bachelor of Engineering (Civil)',
        university: '1',
        level: 'Undergraduate',
        duration: '4 years',
        tuitionFee: 85000,
        aps: {
            minimumAPS: 25,
            englishAPS: 4,
            mathAPS: 4
        },
        entryRequirements: {
            minimumMatricScore: 60,
            requiredSubjects: ['Mathematics', 'Physical Science']
        }
    },
    {
        _id: '102',
        code: 'BUS001',
        name: 'Bachelor of Business Science',
        university: '1',
        level: 'Undergraduate',
        duration: '3 years',
        tuitionFee: 65000,
        aps: {
            minimumAPS: 20,
            englishAPS: 3,
            mathAPS: 3
        },
        entryRequirements: {
            minimumMatricScore: 50,
            requiredSubjects: ['English', 'Mathematics']
        }
    },
    {
        _id: '103',
        code: 'MED001',
        name: 'Bachelor of Medicine, Bachelor of Surgery (MBChB)',
        university: '2',
        level: 'Undergraduate',
        duration: '6 years',
        tuitionFee: 120000,
        aps: {
            minimumAPS: 30,
            englishAPS: 5,
            mathAPS: 5
        },
        entryRequirements: {
            minimumMatricScore: 75,
            requiredSubjects: ['Mathematics', 'Physical Science']
        }
    },
    {
        _id: '104',
        code: 'LAW001',
        name: 'Bachelor of Laws (LLB)',
        university: '2',
        level: 'Undergraduate',
        duration: '4 years',
        tuitionFee: 75000,
        aps: {
            minimumAPS: 24,
            englishAPS: 5,
            mathAPS: 3
        },
        entryRequirements: {
            minimumMatricScore: 65,
            requiredSubjects: ['English']
        }
    },
    {
        _id: '105',
        code: 'AGR001',
        name: 'Bachelor of Science in Agriculture',
        university: '3',
        level: 'Undergraduate',
        duration: '4 years',
        tuitionFee: 70000,
        aps: {
            minimumAPS: 18,
            englishAPS: 3,
            mathAPS: 3
        },
        entryRequirements: {
            minimumMatricScore: 55,
            requiredSubjects: ['Mathematics', 'Life Sciences']
        }
    },
    {
        _id: '106',
        code: 'CS001',
        name: 'Bachelor of Science in Computer Science',
        university: '3',
        level: 'Undergraduate',
        duration: '3 years',
        tuitionFee: 72000,
        aps: {
            minimumAPS: 22,
            englishAPS: 3,
            mathAPS: 5
        },
        entryRequirements: {
            minimumMatricScore: 60,
            requiredSubjects: ['Mathematics', 'Physical Science']
        }
    },
    {
        _id: '107',
        code: 'PSY001',
        name: 'Bachelor of Science in Psychology',
        university: '4',
        level: 'Undergraduate',
        duration: '3 years',
        tuitionFee: 68000,
        aps: {
            minimumAPS: 19,
            englishAPS: 4,
            mathAPS: 3
        },
        entryRequirements: {
            minimumMatricScore: 55,
            requiredSubjects: ['English']
        }
    },
    {
        _id: '108',
        code: 'TEACH001',
        name: 'Bachelor of Education (Secondary)',
        university: '4',
        level: 'Undergraduate',
        duration: '4 years',
        tuitionFee: 55000,
        aps: {
            minimumAPS: 17,
            englishAPS: 3,
            mathAPS: 3
        },
        entryRequirements: {
            minimumMatricScore: 50,
            requiredSubjects: ['English']
        }
    },
    {
        _id: '109',
        code: 'NURS001',
        name: 'Bachelor of Science in Nursing',
        university: '6',
        level: 'Undergraduate',
        duration: '4 years',
        tuitionFee: 78000,
        aps: {
            minimumAPS: 20,
            englishAPS: 4,
            mathAPS: 3
        },
        entryRequirements: {
            minimumMatricScore: 60,
            requiredSubjects: ['English', 'Life Sciences']
        }
    },
    {
        _id: '110',
        code: 'ACC001',
        name: 'Bachelor of Commerce in Accounting',
        university: '6',
        level: 'Undergraduate',
        duration: '3 years',
        tuitionFee: 66000,
        aps: {
            minimumAPS: 21,
            englishAPS: 3,
            mathAPS: 4
        },
        entryRequirements: {
            minimumMatricScore: 58,
            requiredSubjects: ['Mathematics', 'English']
        }
    },
    {
        _id: '111',
        code: 'ARCH001',
        name: 'Bachelor of Architecture',
        university: '5',
        level: 'Undergraduate',
        duration: '5 years',
        tuitionFee: 90000,
        aps: {
            minimumAPS: 26,
            englishAPS: 4,
            mathAPS: 4
        },
        entryRequirements: {
            minimumMatricScore: 65,
            requiredSubjects: ['Mathematics']
        }
    }
];
