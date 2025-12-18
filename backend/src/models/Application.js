import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicationNumber: {
        type: String,
        required: true,
        unique: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    selections: [{
        choice: Number,
        university: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'University'
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        applicationDate: Date,
        status: {
            type: String,
            enum: ['Pending', 'Submitted', 'Under Review', 'Accepted', 'Rejected', 'Waitlisted', 'Withdrawn'],
            default: 'Pending'
        },
        decision: {
            date: Date,
            letter: String
        }
    }],
    overallStatus: {
        type: String,
        enum: ['Incomplete', 'Submitted', 'In Progress', 'Finalized'],
        default: 'Incomplete'
    },
    documents: [{
        type: {
            type: String,
            enum: ['Transcript', 'ID Document', 'Matric Certificate', 'Birth Certificate', 'Medical Report', 'Proof of Payment', 'Other'],
            required: true
        },
        fileUrl: String,
        uploadDate: Date,
        verified: {
            type: Boolean,
            default: false
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        verificationDate: Date
    }],
    applicantInfo: {
        age: Number,
        race: String,
        disability: Boolean,
        firstGeneration: Boolean,
        province: String
    },
    payment: {
        status: {
            type: String,
            enum: ['Not Paid', 'Pending', 'Completed', 'Failed'],
            default: 'Not Paid'
        },
        amount: Number,
        transactionId: String,
        paidAt: Date
    },
    notes: String,
    submission: {
        submittedAt: Date,
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
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

// Generate unique application number
applicationSchema.pre('save', async function (next) {
    if (!this.applicationNumber) {
        const count = await mongoose.model('Application').countDocuments();
        const year = new Date().getFullYear();
        this.applicationNumber = `CAO-${year}-${String(count + 1).padStart(6, '0')}`;
    }
    next();
});

export default mongoose.model('Application', applicationSchema);
