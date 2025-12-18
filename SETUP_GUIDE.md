# Advanced CAO Application - Setup Guide

## Quick Start

### Prerequisites
- Node.js v16 or higher
- MongoDB (local or cloud like MongoDB Atlas)
- npm or yarn

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` and update:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string
- `STRIPE_SECRET_KEY` - Your Stripe API key
- `EMAIL_USER` & `EMAIL_PASS` - Email credentials for notifications

### 4. Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## Key Features Implemented

### ✅ Core Features
- **University Directory** - Complete listings with contact info
- **Course Catalog** - All courses with entry requirements clearly displayed
- **APS Calculation** - Automatic APS score display for each course
- **Entry Requirements** - Subject requirements, minimum scores, prerequisites
- **Multiple Selections** - Apply to up to 10 universities/programmes
- **Change of Mind** - Modify selections before final submission
- **Document Management** - Upload and manage application documents
- **Real-time Status** - Track application progress

### ✅ Advanced Features
- **Smart Recommendations** - AI-powered course suggestions based on grades
- **Payment Integration** - Secure online payments (Stripe-ready)
- **Admin Dashboard** - Analytics and reporting
- **Email Notifications** - Automated updates
- **Responsive Design** - Mobile, tablet, and desktop
- **Authentication** - Secure JWT-based login
- **User Profiles** - Student qualification tracking

### ✅ Database Schema
Complete MongoDB schemas for:
- Users with qualification tracking
- Universities with accreditation details
- Courses with entry requirements and APS info
- Applications with multi-selection support
- Documents with verification workflow

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require:
```
Authorization: Bearer <token>
```

### Main Endpoints

#### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - User login
- `PUT /auth/profile` - Update profile

#### Universities
- `GET /universities` - List all
- `GET /universities/:id` - Get details

#### Courses
- `GET /courses` - List with pagination
- `GET /courses/search?keyword=...&level=...` - Search
- `GET /courses/recommendations` - AI suggestions
- `GET /courses/university/:universityId` - By university

#### Applications
- `POST /applications` - Create new
- `GET /applications` - List user's
- `PUT /applications/:id` - Update selections
- `POST /applications/:id/submit` - Final submission
- `POST /applications/:id/change-of-mind` - Modify
- `GET /applications/:id/status` - Check status

#### Payments
- `POST /payments/initialize` - Start payment
- `POST /payments/verify` - Verify transaction

---

## Project Structure

```
cao-application/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   │   ├── authController.js
│   │   │   ├── universityController.js
│   │   │   ├── courseController.js
│   │   │   ├── applicationController.js
│   │   │   ├── paymentController.js
│   │   │   └── adminController.js
│   │   ├── models/           # Database schemas
│   │   │   ├── User.js
│   │   │   ├── University.js
│   │   │   ├── Course.js
│   │   │   └── Application.js
│   │   ├── routes/           # API endpoints
│   │   │   ├── auth.js
│   │   │   ├── universities.js
│   │   │   ├── courses.js
│   │   │   ├── applications.js
│   │   │   └── admin.js
│   │   ├── middleware/       # Auth, validation, uploads
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   └── index.js          # Server entry
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       # Reusable React components
    │   │   └── Navbar.jsx
    │   ├── pages/           # Page components
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── CoursesPage.jsx
    │   │   ├── UniversitiesPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/        # API integration
    │   │   └── api.js
    │   ├── context/         # State management
    │   │   └── authStore.js
    │   ├── styles/          # CSS/Tailwind
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## Database Models Overview

### User Model
```javascript
{
  firstName, lastName, email, phone, idNumber,
  password (hashed),
  dateOfBirth, gender, race, nationality,
  address: { street, city, province, postalCode, country },
  qualifications: [{
    type, year,
    subjects,
    marks: { language, mathematics, scienceSubjects, otherSubjects }
  }],
  role: 'student' | 'admin' | 'institution',
  isEmailVerified, lastLogin, isActive
}
```

### Course Model
```javascript
{
  code, name, description,
  university (reference),
  faculty, department,
  level: 'Diploma' | 'Bachelor' | 'Honors' | 'Masters' | 'PhD',
  duration, studyMode,
  entryRequirements: {
    minimumMatricScore, minimumLanguageScore, minimumMathScore,
    requiredSubjects, englishProficiency, additionalRequirements
  },
  aps: {
    minimumAPS, englishAPS, mathAPS,
    subjects: [{ name, minimumAPS }]
  },
  capacity, intakeDate, applicationDeadline,
  tuitionFee: { amount, currency },
  eligibility: { domestic, international, age },
  modules, campus, isActive
}
```

### Application Model
```javascript
{
  applicationNumber,
  student (reference),
  selections: [{
    choice (1-10),
    university (reference),
    course (reference),
    applicationDate, status, decision
  }],
  overallStatus,
  documents: [{
    type, fileUrl, uploadDate, verified
  }],
  applicantInfo,
  payment: { status, amount, transactionId, paidAt },
  submission: { submittedAt, submittedBy }
}
```

---

## Common Tasks

### Add a New University
```bash
POST /api/universities
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "name": "University Name",
  "code": "UNICODE",
  "description": "...",
  "contact": { "email": "..." },
  "address": { "city": "..." }
}
```

### Add a Course
```bash
POST /api/courses
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "code": "CS101",
  "name": "Computer Science",
  "university": "university_id",
  "level": "Bachelor",
  "aps": { "minimumAPS": 24 },
  "entryRequirements": { "minimumMathScore": 60 }
}
```

### Get Course Recommendations
```bash
GET /api/courses/recommendations
Authorization: Bearer <student_token>
```

---

## Troubleshooting

### MongoDB Connection Failed
- Check MongoDB is running locally or cloud connection string is correct
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. **Database Setup** - Connect to MongoDB (local or Atlas)
2. **Environment Variables** - Update `.env` files with your keys
3. **Test APIs** - Use Postman to test endpoints
4. **Frontend Integration** - Connect React components to backend
5. **Payment Gateway** - Setup Stripe integration
6. **Deployment** - Deploy to Heroku, AWS, or similar

---

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev

---

## License
MIT License
