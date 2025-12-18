import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    race: String,
    nationality: String,
    address: {
        street: String,
        city: String,
        province: String,
        postalCode: String,
        country: String
    },
    qualifications: [{
        type: {
            type: String,
            enum: ['Matric', 'IEB', 'IGCSE', 'Other']
        },
        year: Number,
        subjects: [String],
        marks: {
            language: Number,
            mathematics: Number,
            scienceSubjects: [{ subject: String, mark: Number }],
            otherSubjects: [{ subject: String, mark: Number }]
        }
    }],
    role: {
        type: String,
        enum: ['student', 'admin', 'institution'],
        default: 'student'
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
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

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
