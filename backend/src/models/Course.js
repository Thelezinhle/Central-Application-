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
        credits: Number,
        year: Number,
        semester: Number
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
