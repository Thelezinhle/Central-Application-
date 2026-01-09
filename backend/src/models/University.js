import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
    // Data from Colleges and Universities API
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    country: {
        type: String,
        index: true
    },
    alpha_two_code: String,
    web_pages: [String],
    domains: [String],

    // Institution type classification
    type: {
        type: String,
        required: true,
        enum: ['public_university', 'tvet_college', 'private_college', 'cao_partner_college'],
        default: 'public_university',
        index: true
    },
    // Application system classification
    applicationSystem: {
        type: String,
        required: true,
        enum: ['CAO', 'direct_college', 'direct_university'],
        default: 'CAO',
        index: true
    },

    // Additional fields for CAO
    code: {
        type: String,
        uppercase: true
    },
    description: String,
    logo: String,
    address: {
        street: String,
        city: String,
        province: String,
        postalCode: String
    },
    contact: {
        phone: String,
        email: String,
        admissionsEmail: String
    },
    campuses: [{
        name: String,
        city: String,
        address: String
    }],
    // TVET-specific fields
    tvetInfo: {
        dhetRegistered: Boolean,
        campus_locations: [{
            name: String,
            city: String,
            province: String
        }],
        programmes: [{
            name: String,
            nqfLevel: String, // N1-N6 for TVET
            category: String // Engineering, Business, etc.
        }]
    },
    // College-specific fields
    collegeInfo: {
        accreditationBodies: [String], // CHE, DHET, SETA
        cheAccredited: Boolean,
        dhetAccredited: Boolean,
        setaAccredited: Boolean,
        accreditationNumber: String,
        registeredProgrammes: Number
    },
    // Direct application link (for non-CAO institutions)
    applicationUrl: String,
    // CAO-specific link (for CAO universities/colleges)
    caoApplicationUrl: {
        type: String,
        default: 'https://www.cao.ac.za/apply'
    },
    accreditation: {
        body: String,
        status: String,
        validUntil: Date
    },
    rankings: {
        national: Number,
        international: Number,
        year: Number
    },
    studentCount: Number,
    staffCount: Number,
    established: Number,
    courses: [{
        code: {
            type: String,
            uppercase: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: String,
        faculty: String,
        department: String,
        level: {
            type: String,
            enum: ['Diploma', 'Bachelor', 'Honors', 'Masters', 'PhD'],
            required: true
        },
        duration: {
            value: Number,
            unit: {
                type: String,
                enum: ['years', 'months'],
                default: 'years'
            }
        },
        studyMode: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Distance', 'Hybrid'],
            default: 'Full-time'
        },
        entryRequirements: {
            minimumMatricScore: Number,
            minimumLanguageScore: Number,
            minimumMathScore: Number,
            requiredSubjects: [String],
            englishProficiency: String,
            additionalRequirements: [String]
        },
        aps: {
            minimumAPS: Number,
            maximumAPS: Number
        },
        tuitionFee: {
            local: Number,
            international: Number,
            currency: {
                type: String,
                default: 'ZAR'
            },
            currency_symbol: {
                type: String,
                default: 'R'
            }
        },
        application: {
            deadline: Date,
            processingTime: String,
            selectionProcess: String
        },
        outcomes: {
            employmentRate: Number,
            graduationRate: Number,
            salaryRange: {
                min: Number,
                max: Number
            },
            topEmployers: [String]
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('University', universitySchema);
