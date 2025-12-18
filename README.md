# Advanced CAO Application

A modern, comprehensive university admissions platform built with Node.js, Express, and React.

## Features

### Core Features
- **University Listings** - Browse all partner universities with details
- **Course Browsing** - View all available courses with clear entry requirements
- **Entry Requirements** - APS scores, subject requirements, and qualifications clearly displayed
- **Application Management** - Submit applications to multiple institutions (up to 10)
- **Change of Mind** - Modify programme selections before final submission
- **Document Upload** - Upload supporting documents (transcripts, ID, certificates)
- **Application Status Tracking** - Real-time updates on application progress
- **Payment Integration** - Secure online payment for application fees

### Advanced Features
- **AI-Powered Recommendations** - Smart programme suggestions based on student qualifications
- **Multi-Language Support** - English, Afrikaans, and more
- **Mobile-First Design** - Full responsive experience
- **Admin Analytics** - Comprehensive dashboards and reports
- **Email Notifications** - Automated alerts for application updates
- **API Documentation** - RESTful API for institution integrations
- **Accessibility** - WCAG compliant interface

## Project Structure

```
cao-application/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, upload, etc.
│   │   ├── utils/           # Helper functions
│   │   └── index.js         # Server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── context/        # State management
    │   ├── styles/         # CSS/Tailwind
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Stripe/Paypal** - Payment processing
- **Nodemailer** - Email service

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Recharts** - Data visualization

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration

5. Start server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Application will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `PUT /api/auth/profile` - Update user profile

### Universities
- `GET /api/universities` - List all universities
- `GET /api/universities/:id` - Get university details

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/search` - Search courses
- `GET /api/courses/university/:universityId` - Get university courses
- `GET /api/courses/recommendations` - Get AI recommendations

### Applications
- `POST /api/applications` - Create new application
- `GET /api/applications` - Get user applications
- `PUT /api/applications/:id` - Update application
- `POST /api/applications/:id/submit` - Submit application
- `POST /api/applications/:id/change-of-mind` - Change selections
- `GET /api/applications/:id/status` - Get application status

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/:applicationId` - Get documents
- `DELETE /api/documents/:documentId` - Delete document

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics/applications` - Application analytics
- `GET /api/admin/analytics/universities` - University analytics

## Environment Variables

### Backend
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cao-app
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:3000
```

### Frontend
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Models

### User
- Basic info (name, email, phone, ID)
- Qualifications and marks
- Addresses
- Authentication details

### University
- Name, code, description
- Contact information
- Campuses
- Rankings
- Accreditation details

### Course
- Code, name, description
- Entry requirements (APS, subjects)
- Duration, study mode
- Faculty, department
- Tuition fees
- Modules

### Application
- Student reference
- Course selections (up to 10)
- Application status
- Documents
- Payment information
- Applicant demographics

## Future Enhancements

- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Virtual campus tours
- [ ] Live chat support
- [ ] Document verification automation
- [ ] Advanced analytics for institutions
- [ ] Integration with SADC universities
- [ ] Scholarship information
- [ ] Student testimonials/reviews
- [ ] Multi-language support

## Support

For issues and feature requests, please contact: support@cao-advanced.edu.za

## License

MIT License - See LICENSE file for details
