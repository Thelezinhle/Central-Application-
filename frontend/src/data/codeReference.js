// ============================================================================
// CAO COURSE CODE REFERENCE GUIDE - For First-Time Users
// ============================================================================
// This file helps first-time users understand how CAO course codes work
// Each code tells you important information about the course at a glance!

export const codeReferenceGuide = {
    // ========== HOW TO READ A CAO COURSE CODE ==========
    structure: {
        explanation: "Most CAO course codes follow this pattern:",
        pattern: "[UNIVERSITY PREFIX]-[LEVEL/TYPE]-[PROGRAM ABBREVIATION]",
        examples: [
            {
                code: "ZU-M-BAS",
                breakdown: {
                    part1: "ZU = Zululand University",
                    part2: "M = Master's/Management level",
                    part3: "BAS = Accounting Science"
                },
                meaning: "Zululand University Master's Degree in Accounting Science"
            },
            {
                code: "KN-P-BCN",
                breakdown: {
                    part1: "KN = Kwa-Zulu Natal University",
                    part2: "P = Postgraduate/Professional level",
                    part3: "BCN = Accounting"
                },
                meaning: "KZN University Postgraduate Degree in Accounting"
            },
            {
                code: "N3-ELEC",
                breakdown: {
                    part1: "N3 = TVET Level 3 Certificate",
                    part2: "ELEC = Electrical Trade",
                    part3: "N/A"
                },
                meaning: "TVET National Certificate Level 3 in Electrical Installation"
            }
        ]
    },

    // ========== UNIVERSITY/INSTITUTION PREFIXES ==========
    universityPrefixes: {
        // South African Universities
        "ZU": {
            fullName: "Zululand University",
            location: "KwaZulu-Natal, South Africa",
            type: "Public University"
        },
        "KN": {
            fullName: "Kwa-Zulu Natal University",
            location: "KwaZulu-Natal, South Africa",
            type: "Public University"
        },
        "WU": {
            fullName: "Witwatersrand University",
            location: "Gauteng, South Africa",
            type: "Public University"
        },
        "UP": {
            fullName: "University of Pretoria",
            location: "Gauteng, South Africa",
            type: "Public University"
        },
        "US": {
            fullName: "University of Stellenbosch",
            location: "Western Cape, South Africa",
            type: "Public University"
        },
        "UCT": {
            fullName: "University of Cape Town",
            location: "Western Cape, South Africa",
            type: "Public University"
        },
        // Private Colleges
        "DAMELIN": {
            fullName: "Damelin College",
            location: "South Africa (Multiple campuses)",
            type: "Private College"
        },
        "BOSTON": {
            fullName: "Boston College",
            location: "South Africa",
            type: "Private College"
        },
        "VARSITY": {
            fullName: "Varsity College (IIE)",
            location: "South Africa (Multiple campuses)",
            type: "Private Tertiary"
        },
        // TVET Codes
        "N1": {
            fullName: "TVET National Certificate Level 1",
            location: "South Africa",
            type: "TVET College"
        },
        "N2": {
            fullName: "TVET National Certificate Level 2",
            location: "South Africa",
            type: "TVET College"
        },
        "N3": {
            fullName: "TVET National Certificate Level 3",
            location: "South Africa",
            type: "TVET College"
        },
        "N4": {
            fullName: "TVET National Certificate Level 4",
            location: "South Africa",
            type: "TVET College"
        },
        "N5": {
            fullName: "TVET National Certificate Level 5",
            location: "South Africa",
            type: "TVET College"
        },
        "N6": {
            fullName: "TVET National Certificate Level 6",
            location: "South Africa",
            type: "TVET College"
        }
    },

    // ========== COURSE LEVEL CODES ==========
    courseLevels: {
        "B": {
            shortName: "Bachelor",
            fullName: "Bachelor's Degree",
            duration: "3-4 years",
            requirements: "Grade 12 with Bachelor endorsement",
            examples: ["B Com", "B Sc", "BA"]
        },
        "M": {
            shortName: "Master's",
            fullName: "Master's Degree",
            duration: "1-2 years",
            requirements: "Bachelor's Degree in related field",
            examples: ["M Com", "M Sc", "MBA"]
        },
        "D": {
            shortName: "Diploma",
            fullName: "Diploma",
            duration: "2-3 years",
            requirements: "Grade 12 with Diploma endorsement",
            examples: ["Dip IT", "Dip HRM"]
        },
        "H": {
            shortName: "Higher Certificate",
            fullName: "Higher Certificate",
            duration: "1 year",
            requirements: "Grade 12 or NSC",
            examples: ["HC Marketing", "HC Finance"]
        },
        "N": {
            shortName: "TVET Certificate",
            fullName: "National Certificate (TVET)",
            duration: "1-3 years",
            requirements: "Grade 9-12 depending on level",
            examples: ["N3 Welding", "N4 Hospitality"]
        },
        "P": {
            shortName: "Professional/Postgraduate",
            fullName: "Professional or Postgraduate",
            duration: "Varies",
            requirements: "Varies by program",
            examples: ["Professional Accounting", "Postgraduate Diploma"]
        }
    },

    // ========== PROGRAM ABBREVIATIONS ==========
    programAbbreviations: {
        // Accounting/Finance Programs
        "ACC": "Accounting",
        "ACC-TECH": "Accounting Technician",
        "BAS": "Business Accounting Science",
        "BCN": "B Com in Accounting",
        "BSF": "Bachelor of Business Science in Finance",
        "BSI": "Bachelor of Business Science in Investment",
        "FIN": "Finance",
        "FIN-ADMIN": "Financial Administration",

        // Information Technology
        "IT": "Information Technology",
        "ITSS": "IT Support Services",
        "CS": "Computer Science",
        "SOFT": "Software Development",
        "NET": "Networking",

        // Business/Management
        "BUS": "Business",
        "BUS-MGT": "Business Management",
        "HRM": "Human Resource Management",
        "OFFICE-ADMIN": "Office Administration",

        // Engineering Programs
        "ENG": "Engineering",
        "ELEC": "Electrical Installation",
        "MECH": "Mechanical Engineering",
        "CIVIL": "Civil Engineering",

        // Hospitality & Tourism
        "HOSP": "Hospitality Management",
        "TOUR": "Tourism",
        "CHEF": "Culinary/Chef Training",

        // Healthcare
        "HEALTH": "Health/Healthcare",
        "NURS": "Nursing",
        "NURS-ASST": "Nursing Assistant",
        "MED": "Medicine",

        // Teaching & Education
        "TEACH": "Teaching/Education",
        "ECD": "Early Childhood Development",

        // Marketing & Communications
        "MKT": "Marketing",
        "COMM": "Communications",
        "MEDIA": "Media",

        // General Programs
        "WELD": "Welding",
        "PLUMB": "Plumbing",
        "CONST": "Construction",
        "AUTO": "Automotive",
        "MAINT": "Maintenance"
    }
};

// ============================================================================
// QUICK CODE DECODER - User Tool
// ============================================================================

export function decodeCode(courseCode) {
    /**
     * Example usage:
     * decodeCode("ZU-M-BAS") returns:
     * {
     *   university: "Zululand University",
     *   level: "Master's Degree",
     *   program: "Business Accounting Science",
     *   explanation: "A Master's Degree in Business Accounting Science from Zululand University"
     * }
     */

    const parts = courseCode.split('-');
    
    if (parts.length < 2) {
        return { error: "Invalid code format" };
    }

    const prefixPart = parts[0];
    const levelPart = parts[1] ? parts[1].charAt(0) : '';
    const programPart = parts.slice(1).join('-');

    const universityData = codeReferenceGuide.universityPrefixes[prefixPart] || {
        fullName: prefixPart,
        type: "Unknown Institution"
    };

    const levelData = codeReferenceGuide.courseLevels[levelPart] || {
        fullName: "Program Level"
    };

    const programData = codeReferenceGuide.programAbbreviations[programPart] || programPart;

    return {
        originalCode: courseCode,
        university: universityData.fullName,
        universityType: universityData.type,
        universityLocation: universityData.location,
        level: levelData.fullName,
        program: programData,
        duration: levelData.duration,
        explanation: `${levelData.fullName} in ${programData} from ${universityData.fullName}`
    };
}

// ============================================================================
// ORGANIZED CODE DIRECTORY BY UNIVERSITY
// ============================================================================

export const codesByUniversity = {
    // ZULULAND UNIVERSITY
    "Zululand University": {
        prefix: "ZU",
        codes: [
            { code: "ZU-M-BAS", program: "Master's in Business Accounting Science" },
            { code: "ZU-M-BCN", program: "Master's in Accounting" }
        ]
    },

    // KWA-ZULU NATAL UNIVERSITY
    "KwaZulu-Natal University": {
        prefix: "KN",
        codes: [
            { code: "KN-P-BCN", program: "Postgraduate Bachelor of Commerce in Accounting" },
            { code: "KN-W-BSF", program: "Bachelor of Business Science in Finance" },
            { code: "KN-W-BSI", program: "Bachelor of Business Science in Investment Science" }
        ]
    },

    // DAMELIN COLLEGE
    "Damelin College": {
        prefix: "DAMELIN",
        codes: [
            { code: "HCERT-FIN", program: "Higher Certificate in Finance" },
            { code: "DIP-IT", program: "Diploma in Information Technology" }
        ]
    },

    // BOSTON COLLEGE
    "Boston College": {
        prefix: "BOSTON",
        codes: [
            { code: "HC-MKT", program: "Higher Certificate in Marketing" },
            { code: "DIP-HRM", program: "Diploma in Human Resource Management" }
        ]
    },

    // UMFOLOZI TVET COLLEGE
    "Umfolozi TVET College": {
        prefix: "UMFOLOZI",
        codes: [
            { code: "N3-WELD", program: "N3 Welding & Fabrication" },
            { code: "N3-MECH", program: "N3 Mechanical Engineering" }
        ]
    },

    // ILEMBE TVET COLLEGE
    "Ilembe TVET College": {
        prefix: "ILEMBE",
        codes: [
            { code: "N4-HOSP", program: "N4 Hospitality Management" },
            { code: "N4-BUS", program: "N4 Business Management" }
        ]
    },

    // ETHEKWINI TVET COLLEGE
    "Ethekwini TVET College": {
        prefix: "ETHEKWINI",
        codes: [
            { code: "NA-PROG", program: "Nursing Assistant Programme" },
            { code: "N3-ELEC", program: "N3 Electrical Installation" }
        ]
    },

    // MAJUBA TVET COLLEGE
    "Majuba TVET College": {
        prefix: "MAJUBA",
        codes: [
            { code: "N3-PLUMB", program: "N3 Plumbing" },
            { code: "N3-CONST", program: "N3 Building & Civil Construction" }
        ]
    }
};

// ============================================================================
// BEGINNER-FRIENDLY CODE CATEGORIES
// ============================================================================

export const codesByCategory = {
    "Accounting & Finance": [
        { code: "ZU-M-BAS", university: "Zululand University", level: "Master's" },
        { code: "KN-P-BCN", university: "KwaZulu-Natal University", level: "Postgraduate" },
        { code: "KN-W-BSF", university: "KwaZulu-Natal University", level: "Bachelor's" },
        { code: "KN-W-BSI", university: "KwaZulu-Natal University", level: "Bachelor's" },
        { code: "HCERT-FIN", university: "Damelin College", level: "Higher Certificate" },
        { code: "ACC-TECH", university: "Durban College", level: "Technician" }
    ],

    "Information Technology": [
        { code: "DIP-IT", university: "Damelin College", level: "Diploma" },
        { code: "ITSS-CERT", university: "Umlazi Institute", level: "Certificate" }
    ],

    "Business & Management": [
        { code: "HC-MKT", university: "Boston College", level: "Higher Certificate" },
        { code: "DIP-HRM", university: "Boston College", level: "Diploma" },
        { code: "N4-BUS", university: "Ilembe College", level: "N4 Certificate" },
        { code: "N4-HOSP", university: "Ilembe College", level: "N4 Certificate" }
    ],

    "Engineering & Trades": [
        { code: "N3-WELD", university: "Umfolozi College", level: "N3 Certificate" },
        { code: "N3-MECH", university: "Umfolozi College", level: "N3 Certificate" },
        { code: "N3-ELEC", university: "Ethekwini College", level: "N3 Certificate" },
        { code: "N3-PLUMB", university: "Majuba College", level: "N3 Certificate" },
        { code: "N3-CONST", university: "Majuba College", level: "N3 Certificate" }
    ],

    "Healthcare": [
        { code: "NA-PROG", university: "Ethekwini College", level: "Nursing Assistant" }
    ]
};

// ============================================================================
// COMPLETE UNIVERSITY CODES REFERENCE - For Data Operations
// ============================================================================

export const universityCodesReference = {
    // ========== SOUTH AFRICAN PUBLIC UNIVERSITIES ==========
    
    // UNIVERSITY OF JOHANNESBURG
    "UNIVERSITY OF JOHANNESBURG": {
        institution: "University of Johannesburg",
        institutionCode: "UJ",
        region: "Gauteng, South Africa",
        type: "Public University",
        courses: [
            {
                code: "UJ-B-COM",
                name: "Bachelor of Commerce",
                id: "uj-bcom",
                duration: "3 years",
                durationYears: 3,
                minAPS: 28,
                requirements: ["NSC with degree endorsement", "Mathematics: 50%", "English: 50%"],
                specialization: ["Accounting", "Management", "Economics"],
                careerPaths: ["Accountant", "Business Manager", "Economist"],
                fees: "R35,000 - R45,000 per year"
            },
            {
                code: "UJ-B-ENG",
                name: "Bachelor of Science in Engineering",
                id: "uj-beng",
                duration: "4 years",
                durationYears: 4,
                minAPS: 32,
                requirements: ["NSC with degree endorsement", "Mathematics: 60%", "Physical Science: 60%"],
                specialization: ["Civil", "Mechanical", "Electrical", "Chemical"],
                careerPaths: ["Engineer", "Project Manager", "Technical Specialist"],
                fees: "R40,000 - R50,000 per year"
            }
        ]
    },

    // UNIVERSITY OF WITWATERSRAND
    "UNIVERSITY OF WITWATERSRAND": {
        institution: "University of the Witwatersrand",
        institutionCode: "WITS",
        region: "Gauteng, South Africa",
        type: "Public University",
        courses: [
            {
                code: "WITS-B-MED",
                name: "Bachelor of Medicine, Bachelor of Surgery",
                id: "wits-medicine",
                duration: "6 years",
                durationYears: 6,
                minAPS: 42,
                requirements: ["NSC with degree endorsement", "Biology: 70%", "Chemistry: 70%", "Mathematics: 70%"],
                careerPaths: ["Medical Doctor", "Surgeon", "General Practitioner"],
                fees: "R55,000 - R70,000 per year"
            },
            {
                code: "WITS-B-LAW",
                name: "Bachelor of Laws",
                id: "wits-law",
                duration: "4 years",
                durationYears: 4,
                minAPS: 35,
                requirements: ["NSC with degree endorsement", "English: 70%"],
                careerPaths: ["Lawyer", "Judge", "Legal Advisor"],
                fees: "R40,000 - R50,000 per year"
            }
        ]
    },

    // UNIVERSITY OF CAPE TOWN
    "UNIVERSITY OF CAPE TOWN": {
        institution: "University of Cape Town",
        institutionCode: "UCT",
        region: "Western Cape, South Africa",
        type: "Public University",
        courses: [
            {
                code: "UCT-B-COMM",
                name: "Bachelor of Commerce",
                id: "uct-bcomm",
                duration: "3 years",
                durationYears: 3,
                minAPS: 30,
                requirements: ["NSC with degree endorsement", "Mathematics: 55%", "English: 55%"],
                careerPaths: ["Accountant", "Financial Advisor", "Business Analyst"],
                fees: "R38,000 - R48,000 per year"
            },
            {
                code: "UCT-B-SCIENCE",
                name: "Bachelor of Science",
                id: "uct-science",
                duration: "3 years",
                durationYears: 3,
                minAPS: 32,
                requirements: ["NSC with degree endorsement", "Mathematics: 60%", "Physical Science: 60%"],
                careerPaths: ["Scientist", "Researcher", "Analyst"],
                fees: "R40,000 - R50,000 per year"
            }
        ]
    },

    // UNIVERSITY OF KWAZULU-NATAL
    "UNIVERSITY OF KWAZULU-NATAL": {
        institution: "University of KwaZulu-Natal",
        institutionCode: "UKZN",
        region: "KwaZulu-Natal, South Africa",
        type: "Public University",
        courses: [
            {
                code: "UKZN-B-AGRIC",
                name: "Bachelor of Agricultural Sciences",
                id: "ukzn-agric",
                duration: "4 years",
                durationYears: 4,
                minAPS: 26,
                requirements: ["NSC with degree endorsement", "Biology: 50%", "Mathematics: 50%"],
                careerPaths: ["Agricultural Engineer", "Farm Manager", "Researcher"],
                fees: "R32,000 - R42,000 per year"
            },
            {
                code: "UKZN-B-COMMERCE",
                name: "Bachelor of Commerce",
                id: "ukzn-commerce",
                duration: "3 years",
                durationYears: 3,
                minAPS: 27,
                requirements: ["NSC with degree endorsement", "Mathematics: 50%"],
                careerPaths: ["Accountant", "Business Manager"],
                fees: "R30,000 - R40,000 per year"
            }
        ]
    },

    // UNIVERSITY OF PRETORIA
    "UNIVERSITY OF PRETORIA": {
        institution: "University of Pretoria",
        institutionCode: "UP",
        region: "Gauteng, South Africa",
        type: "Public University",
        courses: [
            {
                code: "UP-B-ENG",
                name: "Bachelor of Engineering",
                id: "up-eng",
                duration: "4 years",
                durationYears: 4,
                minAPS: 35,
                requirements: ["NSC with degree endorsement", "Mathematics: 65%", "Physical Science: 65%"],
                careerPaths: ["Engineer", "Technical Director", "Project Manager"],
                fees: "R42,000 - R55,000 per year"
            },
            {
                code: "UP-B-MED",
                name: "Bachelor of Medicine",
                id: "up-med",
                duration: "6 years",
                durationYears: 6,
                minAPS: 44,
                requirements: ["NSC with degree endorsement", "Biology: 75%", "Chemistry: 75%"],
                careerPaths: ["Medical Doctor", "Specialist", "Researcher"],
                fees: "R60,000 - R75,000 per year"
            }
        ]
    },

    // NORTH-WEST UNIVERSITY
    "NORTH-WEST UNIVERSITY": {
        institution: "North-West University",
        institutionCode: "NWU",
        region: "North West, South Africa",
        type: "Public University",
        courses: [
            {
                code: "NWU-B-TECH",
                name: "Bachelor of Technology",
                id: "nwu-btech",
                duration: "3 years",
                durationYears: 3,
                minAPS: 24,
                requirements: ["NSC with diploma endorsement", "Mathematics: 45%"],
                careerPaths: ["Technician", "Technologist", "Technical Manager"],
                fees: "R28,000 - R38,000 per year"
            }
        ]
    },

    // RHODES UNIVERSITY
    "RHODES UNIVERSITY": {
        institution: "Rhodes University",
        institutionCode: "RHODES",
        region: "Eastern Cape, South Africa",
        type: "Public University",
        courses: [
            {
                code: "RHODES-B-ARTS",
                name: "Bachelor of Arts",
                id: "rhodes-arts",
                duration: "3 years",
                durationYears: 3,
                minAPS: 22,
                requirements: ["NSC with degree endorsement", "English: 50%"],
                careerPaths: ["Teacher", "Journalist", "Social Worker"],
                fees: "R26,000 - R35,000 per year"
            }
        ]
    },

    // UNIVERSITY OF ZULULAND
    "UNIVERSITY OF ZULULAND": {
        institution: "University of Zululand",
        institutionCode: "UNIZULU",
        region: "KwaZulu-Natal, South Africa",
        type: "Public University",
        courses: [
            {
                code: "UNIZULU-B-ADMIN",
                name: "Bachelor of Administration",
                id: "unizulu-admin",
                duration: "3 years",
                durationYears: 3,
                minAPS: 20,
                requirements: ["NSC with degree endorsement", "English: 40%"],
                careerPaths: ["Administrator", "Officer", "Manager"],
                fees: "R24,000 - R32,000 per year"
            }
        ]
    },

    // ========== SOUTH AFRICAN PRIVATE COLLEGES ==========
    
    // DAMELIN
    "DAMELIN COLLEGE": {
        institution: "Damelin",
        institutionCode: "DAMELIN",
        region: "South Africa",
        type: "Private College",
        courses: [
            {
                code: "HCERT-FIN",
                name: "Higher Certificate in Finance",
                id: "damelin-finance",
                duration: "1 year",
                durationYears: 1,
                minAPS: 18,
                requirements: ["National Senior Certificate (NSC)", "Mathematical Literacy: 40%", "English: 40%"],
                careerPaths: ["Financial Assistant", "Bank Teller", "Accounts Clerk"],
                fees: "R25,000 - R35,000",
                notes: "NQF Level 5"
            },
            {
                code: "DIP-IT",
                name: "Diploma in Information Technology",
                id: "damelin-it",
                duration: "2 years",
                durationYears: 2,
                minAPS: 20,
                requirements: ["NSC with diploma endorsement", "Mathematics: 40%", "English: 40%"],
                careerPaths: ["IT Support", "Network Technician", "Help Desk"],
                fees: "R35,000 - R45,000 per year",
                notes: "NQF Level 6"
            }
        ]
    },

    // BOSTON COLLEGE
    "BOSTON COLLEGE": {
        institution: "Boston College",
        institutionCode: "BOSTON",
        region: "South Africa",
        type: "Private College",
        courses: [
            {
                code: "HC-MKT",
                name: "Higher Certificate in Marketing",
                id: "boston-marketing",
                duration: "1 year",
                durationYears: 1,
                minAPS: 17,
                requirements: ["NSC", "English: 40%"],
                careerPaths: ["Marketing Assistant", "Sales Representative", "Social Media Coordinator"],
                fees: "R22,000 - R30,000",
                notes: "Distance learning options available"
            },
            {
                code: "DIP-HRM",
                name: "Diploma in Human Resource Management",
                id: "boston-hrm",
                duration: "2 years",
                durationYears: 2,
                minAPS: 19,
                requirements: ["NSC with diploma endorsement", "English: 40%"],
                careerPaths: ["HR Assistant", "Recruitment Officer", "Training Coordinator"],
                fees: "R30,000 - R40,000 per year"
            }
        ]
    },

    // VARSITY COLLEGE
    "VARSITY COLLEGE": {
        institution: "Varsity College (IIE)",
        institutionCode: "VARSITY",
        region: "South Africa",
        type: "Private Tertiary",
        courses: [
            {
                code: "BCom",
                name: "Bachelor of Commerce",
                id: "varsity-bcom",
                duration: "3 years",
                durationYears: 3,
                minAPS: 28,
                requirements: ["NSC with degree endorsement", "Mathematics: 50%", "English: 50%"],
                specialization: ["Accounting", "Management", "Marketing"],
                careerPaths: ["Accountant", "Business Manager", "Marketing Executive"],
                fees: "R50,000 - R65,000 per year",
                notes: "IIE accredited degree"
            }
        ]
    },

    // AFDA - ACADEMY OF FILM, DRAMA & ANIMATION
    "AFDA": {
        institution: "Academy of Film, Drama & Animation",
        institutionCode: "AFDA",
        region: "South Africa",
        type: "Specialist Arts College",
        courses: [
            {
                code: "BA(MPM)",
                name: "Bachelor of Arts in Motion Picture Medium",
                id: "afda-film",
                duration: "3 years",
                durationYears: 3,
                minAPS: 24,
                requirements: ["NSC with diploma endorsement", "English: 50%", "Creative portfolio", "Interview"],
                specialization: ["Film", "Television", "Performance"],
                careerPaths: ["Filmmaker", "Director", "Producer", "Screenwriter"],
                fees: "R70,000 - R90,000 per year"
            }
        ]
    },

    // ========== TVET COLLEGES (SOUTH AFRICA) ==========
    
    // COLLÈGE DE FRANCE TVET
    "COLLÈGE DE FRANCE TVET": {
        institution: "Collège de France TVET College",
        institutionCode: "COLLÈGE-DE-FRANCE",
        region: "South Africa",
        type: "TVET College",
        courses: [
            {
                code: "NC(V): Electrical",
                name: "National Certificate: Electrical Engineering",
                id: "cct-electrical",
                duration: "3 years",
                durationYears: 3,
                minAPS: 16,
                requirements: ["Grade 9 certificate", "Mathematics: 30%", "Physical Science: 30%"],
                careerPaths: ["Electrician", "Electrical Technician", "Maintenance Electrician"],
                fees: "R5,000 - R10,000 per year",
                notes: "NQF Level 2-4, includes practical training"
            },
            {
                code: "NC(V): Hospitality",
                name: "National Certificate: Hospitality",
                id: "cct-hospitality",
                duration: "3 years",
                durationYears: 3,
                minAPS: 15,
                requirements: ["Grade 9 certificate"],
                careerPaths: ["Chef", "Hotel Manager", "Restaurant Manager", "Catering"],
                fees: "R5,000 - R12,000 per year"
            }
        ]
    },

    // FALSE BAY TVET COLLEGE
    "FALSE BAY TVET COLLEGE": {
        institution: "False Bay TVET College",
        institutionCode: "FALSEBAY",
        region: "South Africa",
        type: "TVET College",
        courses: [
            {
                code: "N4-N6 Engineering",
                name: "Report 191: Engineering Studies",
                id: "falsebay-engineering",
                duration: "18 months",
                durationYears: 1.5,
                minAPS: 18,
                requirements: ["Grade 12 with Mathematics and Science", "N3 Certificate for N4 entry"],
                careerPaths: ["Engineering Technician", "Draughtsperson", "Technician"],
                fees: "R8,000 - R15,000 per year",
                notes: "N4-N6 levels, includes 18 months in-service training"
            }
        ]
    },

    // ========== INTERNATIONAL UNIVERSITIES ==========
    
    // HARVARD COLLEGE
    "HARVARD COLLEGE": {
        institution: "Harvard College",
        institutionCode: "HARVARD-COLLEGE",
        region: "United States",
        type: "International University",
        courses: [
            {
                code: "HARVARD-ECON",
                name: "Bachelor of Arts in Economics",
                id: "harvard-economics",
                duration: "4 years",
                durationYears: 4,
                requirements: ["SAT Score: 1500+", "GPA: 4.0+", "Advanced Placement courses", "Extracurricular leadership"],
                careerPaths: ["Economist", "Financial Analyst", "Policy Advisor", "Consultant"],
                fees: "$54,000 per year",
                notes: "Need-blind admission for all applicants"
            }
        ]
    },

    // MIT - MASSACHUSETTS INSTITUTE OF TECHNOLOGY
    "MIT": {
        institution: "Massachusetts Institute of Technology",
        institutionCode: "MIT",
        region: "United States",
        type: "International University",
        courses: [
            {
                code: "MIT-CS",
                name: "Bachelor of Science in Computer Science",
                id: "mit-cs",
                duration: "4 years",
                durationYears: 4,
                requirements: ["SAT Math: 780+", "Strong STEM background", "Programming experience", "Research projects"],
                careerPaths: ["Software Engineer", "AI Researcher", "Data Scientist", "Tech Entrepreneur"],
                fees: "$55,000 per year",
                notes: "World's top computer science program"
            }
        ]
    },

    // UNIVERSITY OF NAIROBI
    "UNIVERSITY OF NAIROBI": {
        institution: "University of Nairobi",
        institutionCode: "UNAIROBI",
        region: "Kenya",
        type: "International University",
        courses: [
            {
                code: "UON-MEDICINE",
                name: "Bachelor of Medicine and Bachelor of Surgery",
                id: "uon-medicine",
                duration: "6 years",
                durationYears: 6,
                minAPS: 42,
                requirements: ["KCSE Mean Grade: A-", "Biology: B+", "Chemistry: B+", "Physics/Mathematics: B+", "English: B+"],
                careerPaths: ["Medical Doctor", "Surgeon", "General Practitioner"],
                fees: "KES 500,000 per year"
            }
        ]
    },

    // UNIVERSITY OF GHANA
    "UNIVERSITY OF GHANA": {
        institution: "University of Ghana",
        institutionCode: "UGHANA",
        region: "Ghana",
        type: "International University",
        courses: [
            {
                code: "UG-LAW",
                name: "Bachelor of Laws (LLB)",
                id: "ug-law",
                duration: "4 years",
                durationYears: 4,
                requirements: ["WASSCE: Six credits including English", "Mathematics: C6", "Social Studies: C6"],
                careerPaths: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"],
                fees: "GHS 15,000 per year"
            }
        ]
    },

    // ========== KZN (KWAZULU-NATAL) COLLEGES ==========
    
    // UMFOLOZI COLLEGE
    "UMFOLOZI COLLEGE": {
        institution: "Umfolozi TVET College",
        institutionCode: "UMFOLOZI",
        region: "KwaZulu-Natal, South Africa",
        type: "TVET College",
        courses: [
            {
                code: "N3-WELD",
                name: "N3 Welding & Fabrication",
                id: "umfolozi-welding",
                duration: "1 year",
                durationYears: 1,
                minAPS: 20,
                requirements: ["NSC", "Mathematics: 40%", "Physical Science: 40%"],
                careerPaths: ["Welder", "Fabrication Technician", "Metal Worker"],
                fees: "R8,000 - R12,000"
            },
            {
                code: "N3-MECH",
                name: "N3 Mechanical Engineering",
                id: "umfolozi-mechanical",
                duration: "1 year",
                durationYears: 1,
                minAPS: 22,
                requirements: ["NSC", "Mathematics: 50%", "Physical Science: 50%"],
                careerPaths: ["Mechanical Technician", "Plant Operator", "Maintenance Supervisor"],
                fees: "R9,000 - R13,000"
            }
        ]
    },

    // ILEMBE COLLEGE
    "ILEMBE COLLEGE": {
        institution: "Ilembe TVET College",
        institutionCode: "ILEMBE",
        region: "KwaZulu-Natal, South Africa",
        type: "TVET College",
        courses: [
            {
                code: "N4-HOSP",
                name: "N4 Hospitality Management",
                id: "ilembe-hospitality",
                duration: "1 year",
                durationYears: 1,
                minAPS: 18,
                requirements: ["NSC", "English: 40%"],
                careerPaths: ["Hotel Manager", "Front Desk Supervisor", "Food & Beverage Manager"],
                fees: "R7,500 - R11,000"
            },
            {
                code: "N4-BUS",
                name: "N4 Business Management",
                id: "ilembe-business",
                duration: "1 year",
                durationYears: 1,
                minAPS: 17,
                requirements: ["NSC", "English: 40%"],
                careerPaths: ["Business Administrator", "Office Manager", "HR Administrator"],
                fees: "R7,000 - R10,500"
            }
        ]
    },

    // ETHEKWINI COLLEGE
    "ETHEKWINI COLLEGE": {
        institution: "Ethekwini TVET College",
        institutionCode: "ETHEKWINI",
        region: "KwaZulu-Natal, South Africa",
        type: "TVET College",
        courses: [
            {
                code: "NA-PROG",
                name: "Nursing Assistant Programme",
                id: "ethekwini-nursing",
                duration: "2 years",
                durationYears: 2,
                minAPS: 20,
                requirements: ["NSC", "Biology: 40%", "English: 40%", "Grade 12"],
                careerPaths: ["Nursing Assistant", "Care Worker", "Hospital Attendant"],
                fees: "R10,000 - R14,000 per year"
            },
            {
                code: "N3-ELEC",
                name: "N3 Electrical Installation",
                id: "ethekwini-electrical",
                duration: "1 year",
                durationYears: 1,
                minAPS: 22,
                requirements: ["NSC", "Physical Science: 50%", "Mathematics: 50%"],
                careerPaths: ["Electrician", "Electrical Technician", "Installation Specialist"],
                fees: "R9,500 - R13,500"
            }
        ]
    },

    // MAJUBA COLLEGE
    "MAJUBA COLLEGE": {
        institution: "Majuba TVET College",
        institutionCode: "MAJUBA",
        region: "KwaZulu-Natal, South Africa",
        type: "TVET College",
        courses: [
            {
                code: "N3-PLUMB",
                name: "N3 Plumbing",
                id: "majuba-plumbing",
                duration: "1 year",
                durationYears: 1,
                minAPS: 18,
                requirements: ["NSC", "Mathematics: 40%"],
                careerPaths: ["Plumber", "Pipe Fitter", "Maintenance Plumber"],
                fees: "R7,500 - R11,000"
            },
            {
                code: "N3-CONST",
                name: "N3 Building & Civil Construction",
                id: "majuba-construction",
                duration: "1 year",
                durationYears: 1,
                minAPS: 20,
                requirements: ["NSC", "Mathematics: 40%", "Physical Science: 40%"],
                careerPaths: ["Construction Supervisor", "Foreman", "Site Manager"],
                fees: "R8,500 - R12,000"
            }
        ]
    },

    // MECCA TRAINING INSTITUTE
    "MECCA TRAINING INSTITUTE": {
        institution: "Mecca Training Institute",
        institutionCode: "MECCA",
        region: "KwaZulu-Natal, South Africa",
        type: "Private Training Institute",
        courses: [
            {
                code: "AUTO-DIP",
                name: "Automotive Mechanics Diploma",
                id: "mecca-automotive",
                duration: "2 years",
                durationYears: 2,
                minAPS: 19,
                requirements: ["NSC", "Physical Science: 40%", "Mathematics: 40%"],
                careerPaths: ["Motor Mechanic", "Automotive Technician", "Workshop Supervisor"],
                fees: "R18,000 - R25,000 per year"
            }
        ]
    },

    // UMLAZI INSTITUTE
    "UMLAZI INSTITUTE": {
        institution: "Umlazi Institute",
        institutionCode: "UMLAZI",
        region: "KwaZulu-Natal, South Africa",
        type: "Private Training Institute",
        courses: [
            {
                code: "ITSS-CERT",
                name: "IT Support Services Course",
                id: "umlazi-it",
                duration: "6 months",
                durationYears: 0.5,
                minAPS: 16,
                requirements: ["Grade 12 or equivalent", "English: 30%"],
                careerPaths: ["IT Support Technician", "Help Desk Agent", "Network Support"],
                fees: "R8,000 - R12,000"
            }
        ]
    },

    // DURBAN COLLEGE OF COMMERCE
    "DURBAN COLLEGE OF COMMERCE": {
        institution: "Durban College of Commerce",
        institutionCode: "DCC",
        region: "KwaZulu-Natal, South Africa",
        type: "TVET College",
        courses: [
            {
                code: "ACC-TECH",
                name: "Accounting Technician Certificate",
                id: "dcc-accounting",
                duration: "18 months",
                durationYears: 1.5,
                minAPS: 21,
                requirements: ["NSC", "Mathematics: 40%", "English: 40%"],
                careerPaths: ["Accounting Clerk", "Finance Administrator", "Bookkeeper"],
                fees: "R15,000 - R20,000 per year"
            },
            {
                code: "OFFICE-ADMIN",
                name: "Office Administration & Management",
                id: "dcc-office",
                duration: "1 year",
                durationYears: 1,
                minAPS: 17,
                requirements: ["NSC", "English: 40%"],
                careerPaths: ["Office Administrator", "Executive Secretary", "PA"],
                fees: "R12,000 - R16,000"
            }
        ]
    },

    // PIETERMARITZBURG COLLEGE
    "PIETERMARITZBURG COLLEGE": {
        institution: "Pietermaritzburg College",
        institutionCode: "PMB",
        region: "KwaZulu-Natal, South Africa",
        type: "TVET College",
        courses: [
            {
                code: "ECD-DIP",
                name: "Early Childhood Development Diploma",
                id: "pmb-early-child",
                duration: "2 years",
                durationYears: 2,
                minAPS: 16,
                requirements: ["NSC", "English: 40%"],
                careerPaths: ["Preschool Teacher", "Crèche Manager", "ECD Facilitator"],
                fees: "R11,000 - R15,000 per year"
            },
            {
                code: "TEACH-FOUND",
                name: "Foundation Phase Teaching",
                id: "pmb-teaching",
                duration: "2 years",
                durationYears: 2,
                minAPS: 22,
                requirements: ["NSC", "Mathematics: 50%", "English: 50%"],
                careerPaths: ["Primary Teacher", "Foundation Phase Educator", "School Principal"],
                fees: "R13,000 - R18,000 per year"
            }
        ]
    }
};

export default {
    codeReferenceGuide,
    decodeCode,
    codesByUniversity,
    codesByCategory,
    universityCodesReference
};
