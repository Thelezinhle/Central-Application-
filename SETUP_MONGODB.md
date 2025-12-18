# Complete Setup Guide for CAO Application

## 🎯 What's Outside VS Code That You Need

Your application needs **3 separate services running** outside of VS Code:

### 1️⃣ **MongoDB Database** (Required for backend)
### 2️⃣ **Node.js Backend Server** (API on port 5000)
### 3️⃣ **React Frontend Server** (UI on port 3000)

---

## 📦 MONGODB SETUP (Most Important!)

### What is MongoDB?
- A **database** that stores all your data (universities, courses, users, applications)
- It's like a digital filing cabinet for your application
- Required for registration, login, and storing/viewing universities and courses

### How to Install & Run MongoDB

#### **Option 1: MongoDB Atlas (Cloud - EASIEST FOR BEGINNERS)**

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up for FREE account**
3. **Create a Cluster:**
   - Click "Create" button
   - Choose "M0" (free tier)
   - Select AWS, region closest to you
   - Create cluster (takes 2-3 minutes)
4. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/cao-app?retryWrites=true&w=majority`
5. **Update Backend `.env` file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cao-app?retryWrites=true&w=majority
   ```

#### **Option 2: MongoDB Local Installation (More Advanced)**

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Download version for Windows
   - Run installer, follow setup wizard

2. **Start MongoDB Service:**
   - Windows: MongoDB starts automatically as service
   - Check if running: Open Services (Win+R → services.msc)
   - Look for "MongoDB Server"

3. **Update Backend `.env` file:**
   ```
   MONGODB_URI=mongodb://localhost:27017/cao-app
   ```

---

## ⚙️ BACKEND SETUP (Node.js API Server)

### What is the Backend?
- Handles all data (registration, login, university/course storage)
- API server that runs on `http://localhost:5000`
- Communicates with MongoDB

### Step-by-Step:

**Step 1: Configure Environment**
```bash
# In c:\Users\dell\OneDrive\Documents\CAO\backend\
# Open .env file and update:

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cao-app?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_12345_change_this
STRIPE_SECRET_KEY=sk_test_optional
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**Step 2: Install Dependencies**
```bash
cd c:\Users\dell\OneDrive\Documents\CAO\backend
npm install
```

**Step 3: Start Backend Server**
```bash
npm run dev
```

✅ You should see:
```
Server running on port 5000
Environment: development
```

---

## 🎨 FRONTEND SETUP (React UI)

### What is the Frontend?
- The website/app you see in your browser
- Runs on `http://localhost:3000`
- Communicates with backend API

### Step-by-Step:

**Step 1: Install Dependencies**
```bash
cd c:\Users\dell\OneDrive\Documents\CAO\frontend
npm install --force
```

**Step 2: Start Frontend Server**
```bash
npm run dev
```

✅ You should see:
```
VITE v5.4.21  ready in XXX ms
Local: http://localhost:3000/
```

---

## 🔗 HOW THEY CONNECT

```
┌─────────────────────────────────────────────────────┐
│                  YOUR BROWSER                       │
│  http://localhost:3000 (React Frontend)             │
│                                                     │
│  - You see the website                              │
│  - Click buttons, fill forms                        │
│  - Sends requests to backend                        │
└──────────────────────┬──────────────────────────────┘
                       │ (HTTP requests)
                       ↓
┌─────────────────────────────────────────────────────┐
│        NODE.JS BACKEND (Express Server)             │
│  http://localhost:5000                              │
│                                                     │
│  - Receives requests from frontend                  │
│  - Processes data (register, login, etc)            │
│  - Stores/retrieves data from MongoDB               │
└──────────────────────┬──────────────────────────────┘
                       │ (Database queries)
                       ↓
┌─────────────────────────────────────────────────────┐
│              MONGODB DATABASE                       │
│  (Cloud or Local)                                   │
│                                                     │
│  - Stores all data:                                 │
│    * Users (registration, login)                    │
│    * Universities                                   │
│    * Courses                                        │
│    * Applications                                   │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ COMPLETE STARTUP PROCESS (IN ORDER)

### **FIRST TIME SETUP:**

1. **Setup MongoDB** (choose one option above)
   - MongoDB Atlas (easiest) OR Local MongoDB
   - Get connection string
   - Update `.env` file in backend

2. **Start Backend**
   ```bash
   cd c:\Users\dell\OneDrive\Documents\CAO\backend
   npm run dev
   ```
   - Wait for: "Server running on port 5000"

3. **Start Frontend** (in a NEW terminal)
   ```bash
   cd c:\Users\dell\OneDrive\Documents\CAO\frontend
   npm run dev
   ```
   - Wait for: "Local: http://localhost:3000"

4. **Open Browser**
   - Go to: `http://localhost:3000`
   - You should see the Advanced CAO Application homepage

### **EVERY TIME YOU RUN THE APP:**

Just repeat steps 2-4 above (assuming MongoDB is running)

---

## 🐛 TROUBLESHOOTING

### Problem: "Cannot register or login"
**Cause:** MongoDB not connected
**Fix:** 
1. Check `.env` file has correct `MONGODB_URI`
2. If using Atlas, check connection string
3. Check backend terminal for errors
4. Look for: "Connected to MongoDB" message

### Problem: "Universities and courses don't appear"
**Cause:** MongoDB empty OR backend not running
**Fix:**
1. Make sure backend is running (port 5000)
2. Make sure MongoDB is connected
3. The app uses mock data if MongoDB fails, so you should see mock data
4. Check browser console (F12 → Console tab) for errors

### Problem: Backend won't start
**Cause:** Port 5000 already in use OR dependencies not installed
**Fix:**
```bash
cd c:\Users\dell\OneDrive\Documents\CAO\backend
npm install
npm run dev
```

### Problem: Frontend shows white screen
**Cause:** Backend not running OR API connection error
**Fix:**
1. Start backend first
2. Check browser console (F12)
3. Try hard refresh (Ctrl+Shift+R)

### Problem: "Port 3000 already in use"
**Cause:** Another process using port 3000
**Fix:**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

---

## 📋 CHECKLIST BEFORE STARTING

- [ ] MongoDB installed/configured (Atlas or Local)
- [ ] `.env` file updated with MONGODB_URI
- [ ] Backend `npm install` completed
- [ ] Frontend `npm install --force` completed
- [ ] Know how to open new terminal windows

---

## 🚀 QUICK START (After Setup)

**Terminal 1 (Backend):**
```bash
cd c:\Users\dell\OneDrive\Documents\CAO\backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd c:\Users\dell\OneDrive\Documents\CAO\frontend
npm run dev
```

**Browser:**
```
http://localhost:3000
```

---

## 📚 What Each Tool Does

| Tool | Purpose | Status |
|------|---------|--------|
| **MongoDB** | Stores data | ❌ NOT RUNNING (You need to setup) |
| **Node.js** | Backend API | ✅ Installed (Need to run) |
| **npm** | Package manager | ✅ Installed |
| **React** | Frontend UI | ✅ Installed (Need to run) |
| **Vite** | Frontend build tool | ✅ Installed |
| **Express** | Backend framework | ✅ Installed |

---

## 🔐 Security Note

For **production**, you MUST:
- Change `JWT_SECRET` to a strong random string
- Never commit `.env` file to git
- Use strong MongoDB password
- Enable HTTPS

---

**NEXT STEP:** Choose MongoDB setup option (Atlas is easiest!) and let me know when it's done. Then we'll start the servers!
