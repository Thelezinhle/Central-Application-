/**
 * CORS Configuration
 * Handles Cross-Origin Resource Sharing for production environments
 */

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3002',      // Development
      'http://localhost:3000',      // Alternative dev
      'https://yourdomain.com',     // Production (update this)
      'https://www.yourdomain.com', // www variant
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 3600 // 1 hour
};

module.exports = corsOptions;
