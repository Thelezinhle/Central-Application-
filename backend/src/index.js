import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== MONGODB CONNECTION =====
let mongoConnected = false;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cao-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000
})
.then(() => {
  mongoConnected = true;
  console.log('✅ MongoDB Connected');
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.log('⚠️  Starting server without database...');
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CAO API is running',
    database: mongoConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// ===== UNIVERSITIES ENDPOINT =====
app.get('/api/universities', async (req, res) => {
  try {
    if (!mongoConnected) {
      return res.json({
        success: true,
        count: 4,
        universities: [
          { _id: 'ukzn', name: 'University of KwaZulu-Natal', code: 'UKZN' },
          { _id: 'dut', name: 'Durban University of Technology', code: 'DUT' },
          { _id: 'mut', name: 'Mangosuthu University of Technology', code: 'MUT' },
          { _id: 'unizulu', name: 'University of Zululand', code: 'UNIZULU' }
        ]
      });
    }
    
    const University = mongoose.model('University');
    const universities = await University.find().select('name code description').limit(50);
    
    res.json({
      success: true,
      count: universities.length,
      universities
    });
  } catch (error) {
    console.error('Universities error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== COLLEGES ENDPOINT =====
app.get('/api/colleges', (req, res) => {
  res.json({
    success: true,
    count: 4,
    colleges: [
      { _id: 'eduvos', name: 'Eduvos', code: 'EDUVOS' },
      { _id: 'mancosa', name: 'MANCOSA', code: 'MANCOSA' },
      { _id: 'stadio', name: 'STADIO', code: 'STADIO' },
      { _id: 'aaa', name: 'AAA School of Advertising', code: 'AAA' }
    ]
  });
});

// ===== COURSES ENDPOINT =====
app.get('/api/courses', async (req, res) => {
  try {
    if (!mongoConnected) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }

    const Course = mongoose.model('Course');
    const { limit = 20, page = 1, hasCAO } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    let filter = {};
    if (hasCAO === 'true') {
      filter.applicationSystem = 'CAO';
    }
    
    const [courses, total] = await Promise.all([
      Course.find(filter)
        .populate('university', 'name code')
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Course.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Courses error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== APPLICATIONS ENDPOINT (Placeholder) =====
app.get('/api/applications', (req, res) => {
  res.json({
    success: true,
    message: 'Applications endpoint - placeholder',
    data: []
  });
});

// ===== PAYMENTS ENDPOINT (Placeholder) =====
app.get('/api/payments', (req, res) => {
  res.json({
    success: true,
    message: 'Payments endpoint - placeholder',
    data: []
  });
});

// ===== BROWSE COURSES ENDPOINT =====
app.get('/api/browse-courses', async (req, res) => {
  try {
    if (!mongoConnected) {
      return res.json({ success: true, courses: [] });
    }
    
    const Course = mongoose.model('Course');
    const courses = await Course.find().populate('university', 'name code').limit(100).lean();
    
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      '/api/health',
      '/api/universities',
      '/api/colleges',
      '/api/courses',
      '/api/applications',
      '/api/payments',
      '/api/browse-courses'
    ]
  });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// ===== START SERVER =====
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('✅ Server running on port ' + PORT);
  console.log('📍 Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('🔗 Health: http://localhost:' + PORT + '/api/health');
  console.log('🎓 Universities: http://localhost:' + PORT + '/api/universities');
  console.log('📚 Courses: http://localhost:' + PORT + '/api/courses?hasCAO=true&limit=5');
  console.log('📖 Browse: http://localhost:' + PORT + '/api/browse-courses');
  console.log('');
});

export default app;