// SIMPLE WORKING SERVER - no complex imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cao-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Get Courses Endpoint
app.get('/api/courses', async (req, res) => {
    try {
        // Import models dynamically
        const { default: Course } = await import('./src/models/Course.js');
        const { default: University } = await import('./src/models/University.js');

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const hasCAO = req.query.hasCAO === 'true';

        let filter = {};
        if (hasCAO) {
            const caoUnis = await University.find({ applicationSystem: 'CAO' }).select('_id').lean();
            filter.university = { $in: caoUnis.map(u => u._id) };
        }

        const courses = await Course.find(filter)
            .populate('university', 'name code')
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Course.countDocuments(filter);

        res.json({
            success: true,
            data: courses,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n✅ Server running on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/api/health`);
    console.log(`📚 Courses: http://localhost:${PORT}/api/courses?hasCAO=true\n`);
});

export default app;
