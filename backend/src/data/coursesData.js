// Course data for top 10-15 South African universities
export const COURSES_DATA = {
    // University of Cape Town
    "uct": [
        {
            "id": "uct-bcom",
            "name": "Bachelor of Commerce",
            "code": "CB011",
            "faculty": "Commerce",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 38,
            "requirements": [
                "Mathematics: 60%",
                "English Home Language: 50%",
                "Any other 4 subjects"
            ],
            "careerPaths": ["Accountant", "Financial Manager", "Business Analyst"],
            "estimatedFees": 75000,
            "notes": "Direct entry into CA(SA) programme"
        },
        {
            "id": "uct-bsc-cs",
            "name": "Bachelor of Science in Computer Science",
            "code": "CB024",
            "faculty": "Science",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 42,
            "requirements": [
                "Mathematics: 70%",
                "Physical Science: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Software Developer", "Data Scientist", "Systems Analyst"],
            "estimatedFees": 85000
        },
        {
            "id": "uct-llb",
            "name": "Bachelor of Laws (LLB)",
            "code": "CB015",
            "faculty": "Law",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 40,
            "requirements": [
                "English Home Language: 60%",
                "Mathematics or Accounting: 50%"
            ],
            "careerPaths": ["Attorney", "Advocate", "Legal Advisor"],
            "estimatedFees": 80000
        }
    ],

    // University of the Witwatersrand
    "wits": [
        {
            "id": "wits-bsc-eng",
            "name": "Bachelor of Science in Engineering",
            "code": "CB008",
            "faculty": "Engineering",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 40,
            "requirements": [
                "Mathematics: 70%",
                "Physical Science: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer"],
            "estimatedFees": 90000
        },
        {
            "id": "wits-bsc-med",
            "name": "Bachelor of Medical Science",
            "code": "CB032",
            "faculty": "Health Sciences",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 38,
            "requirements": [
                "Biology/Life Sciences: 65%",
                "Chemistry or Physical Science: 60%",
                "Mathematics: 60%"
            ],
            "careerPaths": ["Medical Doctor", "Surgeon", "Research Scientist"],
            "estimatedFees": 95000
        },
        {
            "id": "wits-bcom-fin",
            "name": "Bachelor of Commerce in Finance",
            "code": "CB045",
            "faculty": "Commerce",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 36,
            "requirements": [
                "Mathematics: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Financial Analyst", "Investment Manager", "Banker"],
            "estimatedFees": 72000
        }
    ],

    // University of Pretoria
    "up": [
        {
            "id": "up-bmed",
            "name": "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
            "code": "MBChB",
            "faculty": "Health Sciences",
            "duration": "6 years",
            "durationYears": 6,
            "minAPS": 45,
            "requirements": [
                "Mathematics: 70%",
                "Physical Science: 70%",
                "Life Sciences: 70%",
                "English Home Language: 60%",
                "NBT Tests required"
            ],
            "careerPaths": ["Medical Doctor", "Surgeon", "General Practitioner"],
            "estimatedFees": 120000
        },
        {
            "id": "up-bsc-eng",
            "name": "Bachelor of Science in Engineering",
            "code": "BS-ENG",
            "faculty": "Engineering",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 39,
            "requirements": [
                "Mathematics: 70%",
                "Physical Science: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Software Engineer", "Systems Engineer", "Technical Manager"],
            "estimatedFees": 88000
        },
        {
            "id": "up-bcom-acc",
            "name": "Bachelor of Commerce in Accounting",
            "code": "BCom-Acc",
            "faculty": "Commerce",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 37,
            "requirements": [
                "Mathematics: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Chartered Accountant", "Auditor", "Tax Consultant"],
            "estimatedFees": 74000
        }
    ],

    // University of Johannesburg
    "uj": [
        {
            "id": "uj-bcom-acc",
            "name": "Bachelor of Commerce in Accounting",
            "code": "BCom(Acc)",
            "faculty": "Commerce",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 36,
            "requirements": [
                "Mathematics: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Chartered Accountant", "Auditor", "Tax Consultant"],
            "estimatedFees": 72000
        },
        {
            "id": "uj-bsc-it",
            "name": "Bachelor of Science in Information Technology",
            "code": "BSc-IT",
            "faculty": "Science",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 38,
            "requirements": [
                "Mathematics: 65%",
                "Physical Science: 55%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["IT Manager", "Systems Administrator", "Database Administrator"],
            "estimatedFees": 80000
        },
        {
            "id": "uj-beng-civil",
            "name": "Bachelor of Engineering in Civil Engineering",
            "code": "BE-Civil",
            "faculty": "Engineering",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 40,
            "requirements": [
                "Mathematics: 70%",
                "Physical Science: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Civil Engineer", "Project Manager", "Construction Manager"],
            "estimatedFees": 92000
        }
    ],

    // Stellenbosch University
    "sun": [
        {
            "id": "sun-llb",
            "name": "Bachelor of Laws (LLB)",
            "code": "LLB",
            "faculty": "Law",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 38,
            "requirements": [
                "English Home Language: 60%",
                "Another language: 50%"
            ],
            "careerPaths": ["Attorney", "Advocate", "Legal Advisor"],
            "estimatedFees": 79000
        },
        {
            "id": "sun-bsc-agri",
            "name": "Bachelor of Science in Agriculture",
            "code": "BSc-Agri",
            "faculty": "AgriSciences",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 35,
            "requirements": [
                "Mathematics: 60%",
                "Life Sciences: 60%",
                "Physical Science: 50%"
            ],
            "careerPaths": ["Agricultural Scientist", "Farm Manager", "Agronomist"],
            "estimatedFees": 70000
        },
        {
            "id": "sun-beng-mech",
            "name": "Bachelor of Engineering in Mechanical Engineering",
            "code": "BE-Mech",
            "faculty": "Engineering",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 41,
            "requirements": [
                "Mathematics: 70%",
                "Physical Science: 65%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Mechanical Engineer", "Design Engineer", "Production Manager"],
            "estimatedFees": 91000
        }
    ],

    // University of KwaZulu-Natal
    "ukzn": [
        {
            "id": "ukzn-bsc-med",
            "name": "Bachelor of Medical Science",
            "code": "BMedSci",
            "faculty": "Health Sciences",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 40,
            "requirements": [
                "Mathematics: 65%",
                "Life Sciences: 65%",
                "Physical Science: 60%"
            ],
            "careerPaths": ["Medical Doctor", "Research Scientist", "Clinical Technologist"],
            "estimatedFees": 85000
        },
        {
            "id": "ukzn-bsc-nurs",
            "name": "Bachelor of Science in Nursing",
            "code": "BSc-Nurs",
            "faculty": "Health Sciences",
            "duration": "4 years",
            "durationYears": 4,
            "minAPS": 34,
            "requirements": [
                "Life Sciences: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Registered Nurse", "Midwife", "Nursing Manager"],
            "estimatedFees": 68000
        },
        {
            "id": "ukzn-bcom-mgmt",
            "name": "Bachelor of Commerce in Management",
            "code": "BCom-Mgmt",
            "faculty": "Commerce",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 36,
            "requirements": [
                "Mathematics: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Business Manager", "HR Manager", "Operations Manager"],
            "estimatedFees": 71000
        }
    ],

    // Rhodes University
    "rhodes": [
        {
            "id": "rhodes-ba-econ",
            "name": "Bachelor of Arts in Economics",
            "code": "BA-Econ",
            "faculty": "Humanities",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 32,
            "requirements": [
                "English Home Language: 55%",
                "Mathematics: 50%"
            ],
            "careerPaths": ["Economist", "Policy Analyst", "Business Analyst"],
            "estimatedFees": 65000
        },
        {
            "id": "rhodes-bsc-bio",
            "name": "Bachelor of Science in Biological Sciences",
            "code": "BSc-Bio",
            "faculty": "Science",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 35,
            "requirements": [
                "Life Sciences: 65%",
                "Physical Science: 55%",
                "Mathematics: 50%"
            ],
            "careerPaths": ["Biologist", "Environmental Scientist", "Research Scientist"],
            "estimatedFees": 72000
        }
    ],

    // University of the Free State
    "ufs": [
        {
            "id": "ufs-bcom-fin",
            "name": "Bachelor of Commerce in Finance",
            "code": "BCom-Fin",
            "faculty": "Commerce",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 35,
            "requirements": [
                "Mathematics: 60%",
                "English Home Language: 50%"
            ],
            "careerPaths": ["Financial Analyst", "Investment Manager", "Banker"],
            "estimatedFees": 70000
        },
        {
            "id": "ufs-bsc-chem",
            "name": "Bachelor of Science in Chemistry",
            "code": "BSc-Chem",
            "faculty": "Science",
            "duration": "3 years",
            "durationYears": 3,
            "minAPS": 36,
            "requirements": [
                "Physical Science/Chemistry: 65%",
                "Mathematics: 60%"
            ],
            "careerPaths": ["Chemist", "Research Scientist", "Quality Control Specialist"],
            "estimatedFees": 73000
        }
    ]
};

// Function to get courses by university
export function getCoursesByUniversity(universityId) {
    return COURSES_DATA[universityId] || [];
}

// Function to search courses
export function searchCourses(query, filters = {}) {
    let results = [];

    for (const [uniId, courses] of Object.entries(COURSES_DATA)) {
        const universityName = getUniversityName(uniId);

        courses.forEach(course => {
            // Apply filters
            if (filters.minAPS && course.minAPS < filters.minAPS) return;
            if (filters.maxAPS && course.minAPS > filters.maxAPS) return;
            if (filters.faculty && course.faculty !== filters.faculty) return;

            // Search query
            const matchesQuery =
                !query ||
                course.name.toLowerCase().includes(query.toLowerCase()) ||
                course.faculty.toLowerCase().includes(query.toLowerCase()) ||
                course.careerPaths.some(path =>
                    path.toLowerCase().includes(query.toLowerCase())
                );

            if (matchesQuery) {
                results.push({
                    ...course,
                    universityId: uniId,
                    university: universityName
                });
            }
        });
    }

    return results;
}

// Helper function
export function getUniversityName(id) {
    const universities = {
        uct: "University of Cape Town",
        wits: "University of the Witwatersrand",
        up: "University of Pretoria",
        uj: "University of Johannesburg",
        ukzn: "University of KwaZulu-Natal",
        sun: "Stellenbosch University",
        rhodes: "Rhodes University",
        ufs: "University of the Free State"
    };
    return universities[id] || id;
}

// Function to get all universities with courses
export function getAllUniversitiesWithCourses() {
    const universities = [];
    for (const [id, courses] of Object.entries(COURSES_DATA)) {
        universities.push({
            id,
            name: getUniversityName(id),
            courseCount: courses.length,
            courses
        });
    }
    return universities;
}
