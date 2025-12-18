# 🚀 QUICK START - Advanced CAO Application

## In 5 Minutes: Get Everything Running

### Step 1: Backend Setup (2 minutes)
```bash
cd backend

# Copy environment file
copy .env.example .env

# Edit .env and add:
# MONGODB_URI=mongodb://localhost:27017/cao-app
# JWT_SECRET=your_secret_key_here

# Start server
npm run dev
```
✅ Backend running on `http://localhost:5000`

---

### Step 2: Frontend Setup (2 minutes)
```bash
cd ../frontend

# Start development server
npm run dev
```
✅ Frontend running on `http://localhost:3000`

---

### Step 3: Test It Out (1 minute)
1. Open `http://localhost:3000` in browser
2. Click "Register" 
3. Create a student account
4. Browse courses and universities
5. Create an application

---

## 📱 What You Can Do Now

### Student Features
- ✅ Register and create profile
- ✅ Browse all universities
- ✅ Search courses with filters
- ✅ See entry requirements (APS, subjects)
- ✅ Create applications (up to 10 selections)
- ✅ Get AI course recommendations
- ✅ Track application status
- ✅ Upload documents
- ✅ Manage account

### Admin Features
- ✅ View dashboard stats
- ✅ Manage universities
- ✅ Manage courses
- ✅ View analytics
- ✅ Generate reports

---

## 🔐 Test Account

### Student Login
```
Email: student@example.com
Password: Test@123
```

### Create Your Own
1. Click "Register"
2. Fill in details with your qualifications
3. Login with created account

---

## 🛠️ Key Features Ready to Use

### Universities Module
```
GET  /api/universities           - View all universities
GET  /api/universities/:id       - University details
```

### Courses Module (With APS & Entry Requirements!)
```
GET  /api/courses                        - All courses
GET  /api/courses/search?keyword=...     - Search courses
GET  /api/courses/recommendations        - Get suggestions
GET  /api/courses/university/:id         - By university
```

### Applications Module
```
POST /api/applications           - Create new
GET  /api/applications           - My applications
PUT  /api/applications/:id       - Update selections
POST /api/applications/:id/submit - Submit
```

### Authentication
```
POST /api/auth/register          - Sign up
POST /api/auth/login             - Sign in
PUT  /api/auth/profile           - Update profile
```

---

## 📊 Test Data to Add

### Add a University
```bash
curl -X POST http://localhost:5000/api/universities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "name": "University of Cape Town",
    "code": "UCT",
    "description": "Leading research university",
    "contact": { "email": "admissions@uct.ac.za" },
    "address": { "city": "Cape Town" }
  }'
```

### Add a Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "code": "CS101",
    "name": "Computer Science",
    "university": "<university_id>",
    "level": "Bachelor",
    "aps": { "minimumAPS": 24, "mathAPS": 5 },
    "entryRequirements": { "minimumMathScore": 60 },
    "tuitionFee": { "amount": 25000 }
  }'
```

---

## ❌ Common Issues & Fixes

### "Cannot find module" error
```bash
cd frontend
npm install
# or
cd backend
npm install
```

### Port 5000 or 3000 already in use
```bash
# Kill process using port
# Windows: Use Task Manager or:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB connection error
- Install MongoDB locally: https://www.mongodb.com/try/download/community
- Or use cloud: https://www.mongodb.com/cloud/atlas

### Styles not loading
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npm run dev
```

---

## 📖 Need More Help?

### Read These Files
1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview
2. **[README.md](README.md)** - Full documentation
3. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup
4. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Development tips

---

## 🎯 Next Steps After Testing

1. **Setup Database** - Connect to real MongoDB
2. **Add Universities** - Load real university data
3. **Add Courses** - Load real course data with APS requirements
4. **Test Payments** - Setup Stripe account
5. **Deploy** - Push to cloud (Heroku, AWS, Vercel)

---

## 📞 Quick Reference

| Action | Command |
|--------|---------|
| Start Backend | `cd backend && npm run dev` |
| Start Frontend | `cd frontend && npm run dev` |
| Install Packages | `npm install` |
| View Backend API | `http://localhost:5000/api/health` |
| View Frontend | `http://localhost:3000` |
| Stop Server | `CTRL + C` |

---

## 🎉 You're All Set!

Everything is ready to use. Start the servers and enjoy building! 🚀

For detailed API documentation, check [README.md](README.md)
