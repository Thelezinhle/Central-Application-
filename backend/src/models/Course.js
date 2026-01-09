import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    // Application system type
    applicationSystem: {
        type: String,
        enum: ['CAO', 'direct_college', 'direct_university'],
        default: 'CAO',
        index: true
    },
    // CAO-specific fields
    cao: {
        programmeCode: {
            type: String,
            sparse: true,
            uppercase: true
        },
        institution: String,
        handbookPage: Number,
        source: {
            type: String,
            default: 'cao_handbook_2026'
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    // TVET-specific fields
    tvet: {
        nqfLevel: String, // N1-N6
        subject: String,
        moduleCode: String,
        credits: Number,
        sectorEducationType: String // SETA assigned
    },
    // Direct university/college fields
    directApplication: {
        applicationUrl: String,
        requiresAPS: Boolean,
        requiresMatric: Boolean,
        contactPerson: String,
        contactEmail: String
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
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
        englishAPS: Number,
        mathAPS: Number,
        subjects: [{
            name: String,
            minimumAPS: Number
        }]
    },
    capacity: Number,
    intakeDate: Date,
    applicationDeadline: Date,
    tuitionFee: {
        amount: Number,
        currency: {
            type: String,
            default: 'ZAR'
        }
    },
    eligibility: {
        domestic: Boolean,
        international: Boolean,
        age: {
            minimum: Number,
            maximum: Number
        }
    },
    specialization: [String],
    careerOutcomes: [String],
    modules: [{
        code: String,
        name: String,
        description: String,
        credits: Number,
        year: Number,
        semester: Number,
        prerequisites: [String],
        learningOutcomes: [String],
        assessmentMethod: String,
        recommendedReadings: [String]
    }],
    campus: String,
    isActive: {
        type: Boolean,
        default: true
    },
    applications: {
        type: Number,
        default: 0
    },
    acceptanceRate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster searches
courseSchema.index({ code: 1, university: 1 });
courseSchema.index({ name: 'text', description: 'text' });
courseSchema.index({ university: 1 });

export default mongoose.model('Course', courseSchema);
