export const REAL_COURSES = {
    // UNIVERSITY OF SOUTH AFRICA (UNISA)
    "unisa": [
        {
            id: "unisa-bcom",
            name: "Bachelor of Commerce",
            code: "98306",
            faculty: "College of Economic and Management Sciences",
            duration: "3 years",
            durationYears: 3,
            minAPS: 21,
            requirements: ["NSC with degree endorsement", "Mathematics: Level 4 (50-59%)", "English: Level 4 (50-59%)"],
            specialization: ["Accounting", "Economics", "Management", "Marketing"],
            careerPaths: ["Accountant", "Financial Manager", "Business Analyst"],
            notes: "Distance learning only. No campus attendance required.",
            fees: "R25,000 - R35,000 per year"
        },
        {
            id: "unisa-bsc-cs",
            name: "Bachelor of Science in Computing",
            code: "98801",
            faculty: "College of Science, Engineering and Technology",
            duration: "3 years",
            durationYears: 3,
            minAPS: 23,
            requirements: ["Mathematics: Level 4", "Physical Science: Level 4"],
            specialization: ["Computer Science", "Information Systems"],
            careerPaths: ["Software Developer", "Systems Analyst"],
            fees: "R30,000 - R40,000 per year"
        }
    ],
    
    // SEFAKO MAKGATHO HEALTH SCIENCES UNIVERSITY
    "smuhs": [
        {
            id: "smu-mbchb",
            name: "Bachelor of Medicine and Bachelor of Surgery",
            code: "MBChB",
            faculty: "School of Medicine",
            duration: "6 years",
            durationYears: 6,
            minAPS: 40,
            requirements: ["Mathematics: 70%", "Physical Science: 70%", "Life Sciences: 70%", "Interview required"],
            careerPaths: ["Medical Doctor", "Surgeon", "Specialist"],
            notes: "Highly competitive. Limited spaces available.",
            fees: "R60,000 - R80,000 per year"
        },
        {
            id: "smu-bpharm",
            name: "Bachelor of Pharmacy",
            code: "BPharm",
            faculty: "School of Pharmacy",
            duration: "4 years",
            durationYears: 4,
            minAPS: 36,
            requirements: ["Mathematics: 60%", "Physical Science: 60%", "Life Sciences: 60%"],
            careerPaths: ["Pharmacist", "Pharmaceutical Researcher"],
            fees: "R45,000 - R60,000 per year"
        }
    ],
    
    // UNIVERSITY OF CAPE TOWN
    "uct": [
        {
            id: "uct-bcom-acc",
            name: "Bachelor of Commerce in Accounting",
            code: "CB011",
            faculty: "Commerce",
            duration: "3 years",
            durationYears: 3,
            minAPS: 42,
            requirements: ["Mathematics: 70%", "English: 60%"],
            careerPaths: ["Chartered Accountant", "Auditor", "Tax Consultant"],
            notes: "SAICA-accredited. Direct entry into CA programme.",
            fees: "R75,000 - R90,000 per year"
        },
        {
            id: "uct-bsc-eng",
            name: "Bachelor of Science in Engineering",
            code: "CB008",
            faculty: "Engineering & Built Environment",
            duration: "4 years",
            durationYears: 4,
            minAPS: 45,
            requirements: ["Mathematics: 80%", "Physical Science: 70%"],
            specialization: ["Civil", "Electrical", "Mechanical", "Chemical"],
            careerPaths: ["Professional Engineer", "Project Manager"],
            fees: "R85,000 - R100,000 per year"
        },
        {
            id: "uct-llb",
            name: "Bachelor of Laws",
            code: "LLB",
            faculty: "Law",
            duration: "4 years",
            durationYears: 4,
            minAPS: 40,
            requirements: ["English: 70%", "APS 40+"],
            careerPaths: ["Attorney", "Advocate", "Judge"],
            fees: "R70,000 - R85,000 per year"
        }
    ],
    
    // UNIVERSITY OF THE WITWATERSRAND
    "wits": [
        {
            id: "wits-bsc-eng",
            name: "Bachelor of Science in Engineering",
            code: "CB008",
            faculty: "Engineering",
            duration: "4 years",
            durationYears: 4,
            minAPS: 42,
            requirements: ["Mathematics: 75%", "Physical Science: 65%"],
            specialization: ["Civil", "Mechanical", "Electrical", "Industrial"],
            careerPaths: ["Professional Engineer", "Design Engineer"],
            fees: "R80,000 - R95,000 per year"
        },
        {
            id: "wits-barch",
            name: "Bachelor of Architectural Studies",
            code: "BAS",
            faculty: "Architecture",
            duration: "3 years",
            durationYears: 3,
            minAPS: 38,
            requirements: ["Mathematics: 60%", "Portfolio required"],
            careerPaths: ["Architect", "Urban Designer"],
            fees: "R75,000 - R90,000 per year"
        }
    ],
    
    // UNIVERSITY OF PRETORIA
    "up": [
        {
            id: "up-bcom-law",
            name: "Bachelor of Commerce in Law",
            code: "BCom(Law)",
            faculty: "Economic and Management Sciences",
            duration: "3 years",
            durationYears: 3,
            minAPS: 36,
            requirements: ["Mathematics: 60%", "English: 50%"],
            careerPaths: ["Corporate Lawyer", "Compliance Officer"],
            fees: "R65,000 - R80,000 per year"
        },
        {
            id: "up-bsc-vet",
            name: "Bachelor of Veterinary Science",
            code: "BVSc",
            faculty: "Veterinary Science",
            duration: "6 years",
            durationYears: 6,
            minAPS: 44,
            requirements: ["Mathematics: 70%", "Physical Science: 70%", "Life Sciences: 70%"],
            careerPaths: ["Veterinarian", "Veterinary Surgeon"],
            notes: "Only veterinary school in South Africa",
            fees: "R90,000 - R110,000 per year"
        }
    ],
    
    // UNIVERSITY OF JOHANNESBURG
    "uj": [
        {
            id: "uj-btech-eng",
            name: "Bachelor of Engineering Technology",
            code: "BEngTech",
            faculty: "Engineering",
            duration: "3 years",
            durationYears: 3,
            minAPS: 30,
            requirements: ["Mathematics: 60%", "Physical Science: 50%"],
            specialization: ["Civil", "Electrical", "Mechanical"],
            careerPaths: ["Engineering Technologist", "Technician"],
            fees: "R50,000 - R65,000 per year"
        },
        {
            id: "uj-bcom-fin",
            name: "Bachelor of Commerce in Finance",
            code: "BCom(Fin)",
            faculty: "Business",
            duration: "3 years",
            durationYears: 3,
            minAPS: 34,
            requirements: ["Mathematics: 50%", "English: 50%"],
            careerPaths: ["Financial Analyst", "Investment Banker"],
            fees: "R55,000 - R70,000 per year"
        }
    ],
    
    // TSHWANE UNIVERSITY OF TECHNOLOGY
    "tut": [
        {
            id: "tut-ndip-eng",
            name: "National Diploma: Engineering",
            code: "NDEng",
            faculty: "Engineering",
            duration: "3 years",
            durationYears: 3,
            minAPS: 26,
            requirements: ["Mathematics: 50%", "Physical Science: 40%"],
            specialization: ["Civil", "Electrical", "Mechanical"],
            careerPaths: ["Engineering Technician", "Quality Controller"],
            notes: "Includes Work Integrated Learning (WIL)",
            fees: "R35,000 - R45,000 per year"
        },
        {
            id: "tut-ndip-it",
            name: "National Diploma: Information Technology",
            code: "NDIT",
            faculty: "Information Technology",
            duration: "3 years",
            durationYears: 3,
            minAPS: 24,
            requirements: ["Mathematics: 40%", "English: 40%"],
            careerPaths: ["IT Support", "Network Technician"],
            fees: "R30,000 - R40,000 per year"
        }
    ]
};

export default REAL_COURSES;
