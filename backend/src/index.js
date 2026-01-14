import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { REAL_UNIVERSITIES } from './data/expandedUniversities.js';
import collegesData from './data/colleges.js';
import globalUniversitiesRouter from './routes/globalUniversities.js';

// Load environment variables
dotenv.config();

// Debug: Log imported data
console.log('✅ REAL_UNIVERSITIES loaded:', REAL_UNIVERSITIES ? REAL_UNIVERSITIES.length + ' universities' : 'FAILED');
console.log('✅ collegesData loaded:', collegesData ? collegesData.length + ' colleges' : 'FAILED');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== ERROR HANDLERS =====
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    console.error('   Stack:', error.stack);
    // Don't exit, just log
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection:', reason);
    if (reason instanceof Error) {
        console.error('   Stack:', reason.stack);
    }
    // Don't exit, just log
});

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// ===== UNIVERSITIES ENDPOINT =====
app.get('/api/universities', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        
        const universities = REAL_UNIVERSITIES.slice(skip, skip + limit);
        const total = REAL_UNIVERSITIES.length;
        
        res.json({
            success: true,
            universities,
            count: universities.length,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Universities error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== COLLEGES ENDPOINT =====
app.get('/api/colleges', (req, res) => {
    try {
        const { country, category } = req.query;
        
        let filtered = [...collegesData];
        
        if (country) {
            filtered = filtered.filter(college => 
                college.country?.toLowerCase().includes(country.toLowerCase()) ||
                college.location?.toLowerCase().includes(country.toLowerCase())
            );
        }
        
        if (category) {
            filtered = filtered.filter(college => college.category === category);
        }
        
        res.json({
            success: true,
            colleges: filtered.sort((a, b) => a.name.localeCompare(b.name)),
            count: filtered.length
        });
    } catch (error) {
        console.error('Colleges error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== GET COLLEGES BY COUNTRY =====
app.get('/api/colleges/country/:country', (req, res) => {
    try {
        const country = req.params.country.toLowerCase();
        
        const countryColleges = collegesData.filter(college => {
            const collegeCountry = college.country?.toLowerCase() || '';
            const collegeLocation = college.location?.toLowerCase() || '';
            return collegeCountry.includes(country) || collegeLocation.includes(country);
        });
        
        res.json({
            success: true,
            country: country,
            colleges: countryColleges,
            count: countryColleges.length
        });
    } catch (error) {
        console.error('Country colleges error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== GLOBAL UNIVERSITIES API ROUTES =====
app.use('/api/global-universities', globalUniversitiesRouter);

// ===== 404 HANDLER =====
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path,
        availableEndpoints: [
            'GET /api/health',
            'GET /api/universities',
            'GET /api/colleges',
            'GET /api/colleges/country/:country',
            'GET /api/global-universities',
            'GET /api/global-universities/regions',
            'GET /api/global-universities/by-region/:region',
            'GET /api/global-universities/by-country/:country',
            'GET /api/global-universities/search?q=query',
            'GET /api/global-universities/:id'
        ]
    });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal server error'
    });
});

// ===== START SERVER =====
try {
    console.log('⏳ Attempting to start server...');
    const server = app.listen(PORT, () => {
        console.log('');
        console.log('✅ Server running on port ' + PORT);
        console.log('📍 Environment: ' + (process.env.NODE_ENV || 'development'));
        console.log('🔗 Health: http://localhost:' + PORT + '/api/health');
        console.log('🎓 Universities: http://localhost:' + PORT + '/api/universities');
        console.log('🏫 Colleges: http://localhost:' + PORT + '/api/colleges');
        console.log('');
    });
    console.log('✅ Server.listen() called successfully');

    server.on('error', (error) => {
        console.error('❌ Server ERROR EVENT:', error.message);
        console.error('   Code:', error.code);
        console.error('   Stack:', error.stack);
        if (error.code === 'EADDRINUSE') {
            console.error('   -> Port ' + PORT + ' is already in use');
        }
        // Don't exit - let the server continue
    });
    
    // Keep server alive
    server.on('connection', (conn) => {
        console.log('   📡 New connection from', conn.remoteAddress);
    });
} catch (e) {
    console.error('❌ CRITICAL ERROR during server startup:');
    console.error('   Message:', e.message);
    console.error('   Stack:', e.stack);
    // Try to continue anyway
}

export default app;
