export default {
    // ========== SOUTH AFRICAN COLLEGE COURSES ==========
    "damelin": [
        {
            id: "damelin-finance",
            name: "Higher Certificate in Finance",
            code: "HCERT-FIN",
            duration: "1 year",
            durationYears: 1,
            minAPS: 18,
            requirements: [
                "National Senior Certificate (NSC)",
                "Mathematical Literacy: 40%",
                "English: 40%"
            ],
            careerPaths: ["Financial Assistant", "Bank Teller", "Accounts Clerk"],
            fees: "R25,000 - R35,000",
            notes: "NQF Level 5"
        },
        {
            id: "damelin-it",
            name: "Diploma in Information Technology",
            code: "DIP-IT",
            duration: "2 years",
            durationYears: 2,
            minAPS: 20,
            requirements: [
                "NSC with diploma endorsement",
                "Mathematics: 40%",
                "English: 40%"
            ],
            careerPaths: ["IT Support", "Network Technician", "Help Desk"],
            fees: "R35,000 - R45,000 per year",
            notes: "NQF Level 6"
        }
    ],
    
    "boston": [
        {
            id: "boston-marketing",
            name: "Higher Certificate in Marketing",
            code: "HC-MKT",
            duration: "1 year",
            durationYears: 1,
            minAPS: 17,
            requirements: [
                "NSC",
                "English: 40%"
            ],
            careerPaths: ["Marketing Assistant", "Sales Representative", "Social Media Coordinator"],
            fees: "R22,000 - R30,000",
            notes: "Distance learning options available"
        },
        {
            id: "boston-hrm",
            name: "Diploma in Human Resource Management",
            code: "DIP-HRM",
            duration: "2 years",
            durationYears: 2,
            minAPS: 19,
            requirements: [
                "NSC with diploma endorsement",
                "English: 40%"
            ],
            careerPaths: ["HR Assistant", "Recruitment Officer", "Training Coordinator"],
            fees: "R30,000 - R40,000 per year"
        }
    ],
    
    "varsity": [
        {
            id: "varsity-bcom",
            name: "Bachelor of Commerce",
            code: "BCom",
            duration: "3 years",
            durationYears: 3,
            minAPS: 28,
            requirements: [
                "NSC with degree endorsement",
                "Mathematics: 50%",
                "English: 50%"
            ],
            specialization: ["Accounting", "Management", "Marketing"],
            careerPaths: ["Accountant", "Business Manager", "Marketing Executive"],
            fees: "R50,000 - R65,000 per year",
            notes: "IIE accredited degree"
        }
    ],
    
    "afda": [
        {
            id: "afda-film",
            name: "Bachelor of Arts in Motion Picture Medium",
            code: "BA(MPM)",
            duration: "3 years",
            durationYears: 3,
            minAPS: 24,
            requirements: [
                "NSC with diploma endorsement",
                "English: 50%",
                "Creative portfolio",
                "Interview"
            ],
            specialization: ["Film", "Television", "Performance"],
            careerPaths: ["Filmmaker", "Director", "Producer", "Screenwriter"],
            fees: "R70,000 - R90,000 per year"
        }
    ],
    
    // ========== TVET COLLEGE COURSES ==========
    "collège-de-france": [
        {
            id: "cct-electrical",
            name: "National Certificate: Electrical Engineering",
            code: "NC(V): Electrical",
            duration: "3 years",
            durationYears: 3,
            minAPS: 16,
            requirements: [
                "Grade 9 certificate",
                "Mathematics: 30%",
                "Physical Science: 30%"
            ],
            careerPaths: ["Electrician", "Electrical Technician", "Maintenance Electrician"],
            fees: "R5,000 - R10,000 per year",
            notes: "NQF Level 2-4, includes practical training"
        },
        {
            id: "cct-hospitality",
            name: "National Certificate: Hospitality",
            code: "NC(V): Hospitality",
            duration: "3 years",
            durationYears: 3,
            minAPS: 15,
            requirements: ["Grade 9 certificate"],
            careerPaths: ["Chef", "Hotel Manager", "Restaurant Manager", "Catering"],
            fees: "R5,000 - R12,000 per year"
        }
    ],
    
    "falsebay": [
        {
            id: "falsebay-engineering",
            name: "Report 191: Engineering Studies",
            code: "N4-N6 Engineering",
            duration: "18 months",
            durationYears: 1.5,
            minAPS: 18,
            requirements: [
                "Grade 12 with Mathematics and Science",
                "N3 Certificate for N4 entry"
            ],
            careerPaths: ["Engineering Technician", "Draughtsperson", "Technician"],
            fees: "R8,000 - R15,000 per year",
            notes: "N4-N6 levels, includes 18 months in-service training"
        }
    ],
    
    // ========== INTERNATIONAL COLLEGE COURSES ==========
    "harvard-college": [
        {
            id: "harvard-economics",
            name: "Bachelor of Arts in Economics",
            duration: "4 years",
            durationYears: 4,
            requirements: [
                "SAT Score: 1500+",
                "GPA: 4.0+",
                "Advanced Placement courses",
                "Extracurricular leadership"
            ],
            careerPaths: ["Economist", "Financial Analyst", "Policy Advisor", "Consultant"],
            fees: "$54,000 per year",
            notes: "Need-blind admission for all applicants"
        }
    ],
    
    "mit": [
        {
            id: "mit-cs",
            name: "Bachelor of Science in Computer Science",
            duration: "4 years",
            durationYears: 4,
            requirements: [
                "SAT Math: 780+",
                "Strong STEM background",
                "Programming experience",
                "Research projects"
            ],
            careerPaths: ["Software Engineer", "AI Researcher", "Data Scientist", "Tech Entrepreneur"],
            fees: "$55,000 per year",
            notes: "World's top computer science program"
        }
    ],
    
    "university-nairobi": [
        {
            id: "uon-medicine",
            name: "Bachelor of Medicine and Bachelor of Surgery",
            duration: "6 years",
            durationYears: 6,
            minAPS: 42,
            requirements: [
                "KCSE Mean Grade: A-",
                "Biology: B+",
                "Chemistry: B+",
                "Physics/Mathematics: B+",
                "English: B+"
            ],
            careerPaths: ["Medical Doctor", "Surgeon", "General Practitioner"],
            fees: "KES 500,000 per year"
        }
    ],
    
    "university-ghana": [
        {
            id: "ug-law",
            name: "Bachelor of Laws (LLB)",
            duration: "4 years",
            durationYears: 4,
            requirements: [
                "WASSCE: Six credits including English",
                "Mathematics: C6",
                "Social Studies: C6"
            ],
            careerPaths: ["Lawyer", "Judge", "Legal Advisor", "Corporate Counsel"],
            fees: "GHS 15,000 per year"
        }
    ],

    // ========== KZN COLLEGE COURSES ==========
    "umfolozi-college": [
        {
            id: "umfolozi-welding",
            name: "N3 Welding & Fabrication",
            code: "N3-WELD",
            duration: "1 year",
            durationYears: 1,
            minAPS: 20,
            requirements: ["NSC", "Mathematics: 40%", "Physical Science: 40%"],
            careerPaths: ["Welder", "Fabrication Technician", "Metal Worker"],
            fees: "R8,000 - R12,000"
        },
        {
            id: "umfolozi-mechanical",
            name: "N3 Mechanical Engineering",
            code: "N3-MECH",
            duration: "1 year",
            durationYears: 1,
            minAPS: 22,
            requirements: ["NSC", "Mathematics: 50%", "Physical Science: 50%"],
            careerPaths: ["Mechanical Technician", "Plant Operator", "Maintenance Supervisor"],
            fees: "R9,000 - R13,000"
        }
    ],

    "ilembe-college": [
        {
            id: "ilembe-hospitality",
            name: "N4 Hospitality Management",
            code: "N4-HOSP",
            duration: "1 year",
            durationYears: 1,
            minAPS: 18,
            requirements: ["NSC", "English: 40%"],
            careerPaths: ["Hotel Manager", "Front Desk Supervisor", "Food & Beverage Manager"],
            fees: "R7,500 - R11,000"
        },
        {
            id: "ilembe-business",
            name: "N4 Business Management",
            code: "N4-BUS",
            duration: "1 year",
            durationYears: 1,
            minAPS: 17,
            requirements: ["NSC", "English: 40%"],
            careerPaths: ["Business Administrator", "Office Manager", "HR Administrator"],
            fees: "R7,000 - R10,500"
        }
    ],

    "ethekwini-college": [
        {
            id: "ethekwini-nursing",
            name: "Nursing Assistant Programme",
            code: "NA-PROG",
            duration: "2 years",
            durationYears: 2,
            minAPS: 20,
            requirements: ["NSC", "Biology: 40%", "English: 40%", "Grade 12"],
            careerPaths: ["Nursing Assistant", "Care Worker", "Hospital Attendant"],
            fees: "R10,000 - R14,000 per year"
        },
        {
            id: "ethekwini-electrical",
            name: "N3 Electrical Installation",
            code: "N3-ELEC",
            duration: "1 year",
            durationYears: 1,
            minAPS: 22,
            requirements: ["NSC", "Physical Science: 50%", "Mathematics: 50%"],
            careerPaths: ["Electrician", "Electrical Technician", "Installation Specialist"],
            fees: "R9,500 - R13,500"
        }
    ],

    "majuba-college": [
        {
            id: "majuba-plumbing",
            name: "N3 Plumbing",
            code: "N3-PLUMB",
            duration: "1 year",
            durationYears: 1,
            minAPS: 18,
            requirements: ["NSC", "Mathematics: 40%"],
            careerPaths: ["Plumber", "Pipe Fitter", "Maintenance Plumber"],
            fees: "R7,500 - R11,000"
        },
        {
            id: "majuba-construction",
            name: "N3 Building & Civil Construction",
            code: "N3-CONST",
            duration: "1 year",
            durationYears: 1,
            minAPS: 20,
            requirements: ["NSC", "Mathematics: 40%", "Physical Science: 40%"],
            careerPaths: ["Construction Supervisor", "Foreman", "Site Manager"],
            fees: "R8,500 - R12,000"
        }
    ],

    "meccatraining": [
        {
            id: "mecca-automotive",
            name: "Automotive Mechanics Diploma",
            code: "AUTO-DIP",
            duration: "2 years",
            durationYears: 2,
            minAPS: 19,
            requirements: ["NSC", "Physical Science: 40%", "Mathematics: 40%"],
            careerPaths: ["Motor Mechanic", "Automotive Technician", "Workshop Supervisor"],
            fees: "R18,000 - R25,000 per year"
        }
    ],

    "umlazi-institute": [
        {
            id: "umlazi-it",
            name: "IT Support Services Course",
            code: "ITSS-CERT",
            duration: "6 months",
            durationYears: 0.5,
            minAPS: 16,
            requirements: ["Grade 12 or equivalent", "English: 30%"],
            careerPaths: ["IT Support Technician", "Help Desk Agent", "Network Support"],
            fees: "R8,000 - R12,000"
        }
    ],

    "durban-college-commerce": [
        {
            id: "dcc-accounting",
            name: "Accounting Technician Certificate",
            code: "ACC-TECH",
            duration: "18 months",
            durationYears: 1.5,
            minAPS: 21,
            requirements: ["NSC", "Mathematics: 40%", "English: 40%"],
            careerPaths: ["Accounting Clerk", "Finance Administrator", "Bookkeeper"],
            fees: "R15,000 - R20,000 per year"
        },
        {
            id: "dcc-office",
            name: "Office Administration & Management",
            code: "OFFICE-ADMIN",
            duration: "1 year",
            durationYears: 1,
            minAPS: 17,
            requirements: ["NSC", "English: 40%"],
            careerPaths: ["Office Administrator", "Executive Secretary", "PA"],
            fees: "R12,000 - R16,000"
        }
    ],

    "pietermaritzburg-college": [
        {
            id: "pmb-early-child",
            name: "Early Childhood Development Diploma",
            code: "ECD-DIP",
            duration: "2 years",
            durationYears: 2,
            minAPS: 16,
            requirements: ["NSC", "English: 40%"],
            careerPaths: ["Preschool Teacher", "Crèche Manager", "ECD Facilitator"],
            fees: "R11,000 - R15,000 per year"
        },
        {
            id: "pmb-teaching",
            name: "Foundation Phase Teaching",
            code: "TEACH-FOUND",
            duration: "2 years",
            durationYears: 2,
            minAPS: 22,
            requirements: ["NSC", "Mathematics: 50%", "English: 50%"],
            careerPaths: ["Primary Teacher", "Foundation Phase Educator", "School Principal"],
            fees: "R13,000 - R18,000 per year"
        }
    ]
};
