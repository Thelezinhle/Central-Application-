import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, idNumber, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { idNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            idNumber,
            password
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || '7d'
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || '7d'
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, resetToken } = req.body;

        const user = await User.findOne({
            email,
            passwordResetToken: resetToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, dateOfBirth, gender, address } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { firstName, lastName, phone, dateOfBirth, gender, address, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        res.json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
