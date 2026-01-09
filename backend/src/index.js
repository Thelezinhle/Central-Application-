import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database Connection with retry logic
let mongoConnected = false;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cao-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000
        });
        mongoConnected = true;
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        mongoConnected = false;
    }
};

connectDB();

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running', 
        mongodb: mongoConnected ? 'Connected' : 'Disconnected',
        timestamp: new Date() 
    });
});

// Get Courses Endpoint
app.get('/api/courses', async (req, res) => {
    try {
        if (!mongoConnected) {
            return res.status(503).json({ success: false, message: 'Database not connected' });
        }

        const Course = mongoose.model('Course');
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const hasCAO = req.query.hasCAO === 'true';

        let filter = {};
        if (hasCAO) {
            filter.applicationSystem = 'CAO';
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
        console.error('Courses endpoint error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

// Start Server
const startServer = () => {
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log('\n✅ Server running on port ' + PORT);
        console.log('📍 Environment: ' + (process.env.NODE_ENV || 'development'));
        console.log('🔗 Health: http://localhost:' + PORT + '/api/health');
        console.log('📚 Courses: http://localhost:' + PORT + '/api/courses?hasCAO=true\n');
    });

    server.on('error', (err) => {
        console.error('❌ Server error:', err.message);
        if (err.code === 'EADDRINUSE') {
            console.error('Port ' + PORT + ' is already in use!');
        }
    });

    return server;
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection:', reason);
});

// Start the server
startServer();

export default app;
