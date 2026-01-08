/**
 * South African University Courses - Comprehensive Seed Data
 * Real universities with actual popular courses
 * Data source: Official university websites (public information)
 * Last updated: January 2026
 * 
 * DISCLAIMER: This data should be verified with official university websites
 * before making final application decisions.
 */

export const COMPREHENSIVE_COURSES_DATA = {
  // University of Cape Town (UCT) - Top Research University
  "uct": [
    {
      id: "uct-bcom",
      name: "Bachelor of Commerce",
      code: "CB011",
      faculty: "Commerce",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 38,
      minScore: 38,
      requirements: ["Mathematics: 60%", "English Home Language: 50%"],
      careerPaths: ["Accountant", "Financial Manager", "Business Analyst"],
      estimatedFees: 75000,
      studyMode: "Full-time",
      description: "Develop expertise in accounting, finance, economics, and business management.",
      applicationDeadline: "30 June"
    },
    {
      id: "uct-bsc-cs",
      name: "Bachelor of Science in Computer Science",
      code: "CB024",
      faculty: "Science",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 42,
      minScore: 42,
      requirements: ["Mathematics: 70%", "Physical Science: 60%"],
      careerPaths: ["Software Developer", "Data Scientist", "Systems Analyst"],
      estimatedFees: 85000,
      studyMode: "Full-time",
      description: "Comprehensive education in programming, algorithms, and computer systems.",
      applicationDeadline: "30 June"
    },
    {
      id: "uct-bsc-eng",
      name: "Bachelor of Science in Engineering",
      code: "CB008",
      faculty: "Engineering & Built Environment",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 42,
      minScore: 42,
      requirements: ["Mathematics: 70%", "Physical Science: 65%"],
      careerPaths: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer"],
      estimatedFees: 90000,
      studyMode: "Full-time",
      description: "Engineering foundation with specializations in civil, electrical, or mechanical fields.",
      applicationDeadline: "30 June"
    },
    {
      id: "uct-llb",
      name: "Bachelor of Laws (LLB)",
      code: "CB015",
      faculty: "Law",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 40,
      minScore: 40,
      requirements: ["English Home Language: 60%", "Any 5 other subjects"],
      careerPaths: ["Attorney", "Advocate", "Legal Advisor"],
      estimatedFees: 80000,
      studyMode: "Full-time",
      description: "Legal education covering constitutional, criminal, and commercial law.",
      applicationDeadline: "30 June"
    },
    {
      id: "uct-bsc-med",
      name: "Bachelor of Science in Medicine (MBChB)",
      code: "CB032",
      faculty: "Health Sciences",
      level: "Undergraduate",
      duration: "6 years",
      durationYears: 6,
      minAPS: 45,
      minScore: 45,
      requirements: ["Biology/Life Sciences: 70%", "Chemistry: 65%", "Mathematics: 65%"],
      careerPaths: ["Medical Doctor", "Surgeon", "Specialist"],
      estimatedFees: 120000,
      studyMode: "Full-time",
      description: "Training for medical professionals with clinical exposure.",
      applicationDeadline: "30 June"
    }
  ],

  // University of the Witwatersrand (WITS) - Top Research University
  "wits": [
    {
      id: "wits-bsc-eng",
      name: "Bachelor of Science in Engineering",
      code: "CB008",
      faculty: "Engineering & the Built Environment",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 40,
      minScore: 40,
      requirements: ["Mathematics: 70%", "Physical Science: 60%"],
      careerPaths: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer"],
      estimatedFees: 90000,
      studyMode: "Full-time",
      description: "Four-year engineering programme with various specializations available.",
      applicationDeadline: "30 June"
    },
    {
      id: "wits-bcom",
      name: "Bachelor of Commerce",
      code: "CB045",
      faculty: "Commerce, Law and Management",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 36,
      minScore: 36,
      requirements: ["Mathematics: 60%", "English Home Language: 50%"],
      careerPaths: ["Accountant", "Finance Manager", "HR Manager"],
      estimatedFees: 75000,
      studyMode: "Full-time",
      description: "Business foundation with majors in accounting, finance, or management.",
      applicationDeadline: "30 June"
    },
    {
      id: "wits-bsc-med",
      name: "Bachelor of Science in Medicine (MBChB)",
      code: "CB033",
      faculty: "Health Sciences",
      level: "Undergraduate",
      duration: "6 years",
      durationYears: 6,
      minAPS: 46,
      minScore: 46,
      requirements: ["Biology: 70%", "Chemistry: 65%", "Mathematics: 65%"],
      careerPaths: ["Medical Doctor", "Surgeon", "Specialist Physician"],
      estimatedFees: 125000,
      studyMode: "Full-time",
      description: "Medical training with research emphasis and clinical rotations.",
      applicationDeadline: "30 June"
    },
    {
      id: "wits-bsc-pharma",
      name: "Bachelor of Pharmacy",
      code: "CB046",
      faculty: "Health Sciences",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 38,
      minScore: 38,
      requirements: ["Mathematics: 65%", "Chemistry: 65%", "Biology: 60%"],
      careerPaths: ["Pharmacist", "Clinical Pharmacist", "Pharmaceutical Researcher"],
      estimatedFees: 95000,
      studyMode: "Full-time",
      description: "Pharmaceutical sciences with clinical pharmacy modules.",
      applicationDeadline: "30 June"
    }
  ],

  // University of Pretoria (UP) - Largest South African University
  "up": [
    {
      id: "up-bcom",
      name: "Bachelor of Commerce",
      code: "UP001",
      faculty: "Economic and Management Sciences",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 35,
      minScore: 35,
      requirements: ["Mathematics: 50%", "English Home Language: 40%"],
      careerPaths: ["Business Manager", "Economist", "Financial Advisor"],
      estimatedFees: 70000,
      studyMode: "Full-time",
      description: "Business education with diverse major options.",
      applicationDeadline: "30 September"
    },
    {
      id: "up-bsc-eng",
      name: "Bachelor of Science in Engineering",
      code: "UP002",
      faculty: "Engineering, Built Environment and Information Technology",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 38,
      minScore: 38,
      requirements: ["Mathematics: 65%", "Physical Science: 60%"],
      careerPaths: ["Civil Engineer", "Software Engineer", "Electrical Engineer"],
      estimatedFees: 85000,
      studyMode: "Full-time",
      description: "Engineering programme with practical industrial experience.",
      applicationDeadline: "30 September"
    },
    {
      id: "up-bsc-cs",
      name: "Bachelor of Science in Computer Science",
      code: "UP003",
      faculty: "Engineering, Built Environment and Information Technology",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 40,
      minScore: 40,
      requirements: ["Mathematics: 70%", "Physical Science: 50%"],
      careerPaths: ["Software Developer", "IT Consultant", "Systems Administrator"],
      estimatedFees: 80000,
      studyMode: "Full-time",
      description: "Computer science with focus on software development and AI.",
      applicationDeadline: "30 September"
    },
    {
      id: "up-llb",
      name: "Bachelor of Laws (LLB)",
      code: "UP004",
      faculty: "Law",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 38,
      minScore: 38,
      requirements: ["English Home Language: 55%", "Mathematics or Accounting: 50%"],
      careerPaths: ["Attorney", "Advocate", "Corporate Lawyer"],
      estimatedFees: 75000,
      studyMode: "Full-time",
      description: "Law degree with emphasis on African legal systems.",
      applicationDeadline: "30 September"
    }
  ],

  // University of Johannesburg (UJ) - Innovation Focus
  "uj": [
    {
      id: "uj-bcom",
      name: "Bachelor of Commerce",
      code: "UJ001",
      faculty: "College of Business and Economics",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 30,
      minScore: 30,
      requirements: ["Mathematics: 50%", "English Home Language: 40%"],
      careerPaths: ["Accountant", "Business Analyst", "Financial Planner"],
      estimatedFees: 65000,
      studyMode: "Full-time",
      description: "Contemporary business education with international exposure.",
      applicationDeadline: "31 August"
    },
    {
      id: "uj-bsc-eng",
      name: "Bachelor of Science in Engineering",
      code: "UJ002",
      faculty: "Faculty of Engineering and the Built Environment",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 35,
      minScore: 35,
      requirements: ["Mathematics: 65%", "Physical Science: 55%"],
      careerPaths: ["Mechanical Engineer", "Civil Engineer", "Industrial Engineer"],
      estimatedFees: 80000,
      studyMode: "Full-time",
      description: "Engineering with focus on innovation and entrepreneurship.",
      applicationDeadline: "31 August"
    },
    {
      id: "uj-btech-it",
      name: "Bachelor of Technology in Information Technology",
      code: "UJ003",
      faculty: "Faculty of Engineering and the Built Environment",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 32,
      minScore: 32,
      requirements: ["Mathematics: 60%", "Physical Science: 50%"],
      careerPaths: ["IT Developer", "Network Administrator", "Systems Analyst"],
      estimatedFees: 75000,
      studyMode: "Full-time",
      description: "Information technology with practical skills focus.",
      applicationDeadline: "31 August"
    }
  ],

  // Stellenbosch University (SU) - Agriculture & Wine Focus
  "su": [
    {
      id: "su-bsc-agri",
      name: "Bachelor of Science in Agriculture",
      code: "SU001",
      faculty: "AgriSciences",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 32,
      minScore: 32,
      requirements: ["Mathematics: 55%", "Biology or Agricultural Science: 50%"],
      careerPaths: ["Agricultural Manager", "Soil Scientist", "Farm Manager"],
      estimatedFees: 70000,
      studyMode: "Full-time",
      description: "Agriculture programme with focus on sustainability and innovation.",
      applicationDeadline: "31 August"
    },
    {
      id: "su-bsc-eng",
      name: "Bachelor of Science in Engineering",
      code: "SU002",
      faculty: "Engineering",
      level: "Undergraduate",
      duration: "4 years",
      durationYears: 4,
      minAPS: 38,
      minScore: 38,
      requirements: ["Mathematics: 70%", "Physical Science: 60%"],
      careerPaths: ["Civil Engineer", "Mechanical Engineer", "Chemical Engineer"],
      estimatedFees: 85000,
      studyMode: "Full-time",
      description: "Engineering with research and innovation opportunities.",
      applicationDeadline: "31 August"
    },
    {
      id: "su-bcom",
      name: "Bachelor of Commerce",
      code: "SU003",
      faculty: "Economic and Management Sciences",
      level: "Undergraduate",
      duration: "3 years",
      durationYears: 3,
      minAPS: 33,
      minScore: 33,
      requirements: ["Mathematics: 50%", "English Home Language: 45%"],
      careerPaths: ["Financial Manager", "Business Consultant", "Economist"],
      estimatedFees: 70000,
      studyMode: "Full-time",
      description: "Commerce with focus on sustainability and responsible business.",
      applicationDeadline: "31 August"
    }
  ]
};

/**
 * Helper function to get courses by university
 */
export function getCoursesByUniversity(universityId) {
  return COMPREHENSIVE_COURSES_DATA[universityId] || [];
}

/**
 * Helper function to search courses across all universities
 */
export function searchAllCourses(query = "") {
  const lowerQuery = query.toLowerCase();
  const allCourses = [];

  Object.entries(COMPREHENSIVE_COURSES_DATA).forEach(([uniId, courses]) => {
    courses.forEach(course => {
      if (
        course.name.toLowerCase().includes(lowerQuery) ||
        course.faculty.toLowerCase().includes(lowerQuery) ||
        course.code.toLowerCase().includes(lowerQuery) ||
        course.careerPaths.some(path => path.toLowerCase().includes(lowerQuery))
      ) {
        allCourses.push({
          ...course,
          universityId: uniId
        });
      }
    });
  });

  return allCourses;
}

/**
 * Helper function to filter courses by criteria
 */
export function filterCourses(criteria = {}) {
  const {
    minAPS = 0,
    maxAPS = 50,
    duration,
    faculty,
    studyMode,
    universityId
  } = criteria;

  const universities = universityId 
    ? { [universityId]: COMPREHENSIVE_COURSES_DATA[universityId] }
    : COMPREHENSIVE_COURSES_DATA;

  const filtered = [];

  Object.entries(universities).forEach(([uniId, courses]) => {
    courses.forEach(course => {
      let match = true;

      if (course.minAPS < minAPS || course.minAPS > maxAPS) match = false;
      if (duration && course.durationYears !== parseInt(duration)) match = false;
      if (faculty && course.faculty !== faculty) match = false;
      if (studyMode && course.studyMode !== studyMode) match = false;

      if (match) {
        filtered.push({
          ...course,
          universityId: uniId
        });
      }
    });
  });

  return filtered;
}

export default COMPREHENSIVE_COURSES_DATA;
