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

export default {
    codeReferenceGuide,
    decodeCode,
    codesByUniversity,
    codesByCategory
};
