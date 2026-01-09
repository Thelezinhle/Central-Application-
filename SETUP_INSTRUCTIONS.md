# 🚀 HOW TO START YOUR CAO APPLICATION

## Step 1: Open First PowerShell Window - START BACKEND

```powershell
cd C:\Users\dell\OneDrive\Documents\CAO\backend
node seed-cao-programmes.js
npm run dev
```

Wait for message: "Server running on http://localhost:5000"

## Step 2: Open Second PowerShell Window - START FRONTEND

```powershell
cd C:\Users\dell\OneDrive\Documents\CAO\frontend
npm run dev
```

Wait for message: "Local: http://localhost:3002" (or 3001)

## Step 3: Open Browser

Go to: http://localhost:3002/cao-programmes

OR: http://localhost:3001/cao-programmes

---

## If Something Goes Wrong

### Port 5000 is Already in Use
```powershell
taskkill /F /IM node.exe
```
Then try Step 1 again.

### No Data Showing
Make sure to run the seed command FIRST:
```powershell
cd C:\Users\dell\OneDrive\Documents\CAO\backend
node seed-cao-programmes.js
```

### Check Backend is Working
Open browser: http://localhost:5000/api/courses?hasCAO=true&limit=5
Should see JSON data

### Check Frontend is Working
Open browser: http://localhost:3002/ or http://localhost:3001/
Should see the ICA Global homepage

---

## Expected Output

Backend terminal should show:
```
Server running on http://localhost:5000
```

Frontend terminal should show:
```
VITE v5.x.x  ready in XXX ms
  ➜  Local: http://localhost:3002/
```

CAO page should show:
- Green header "📚 CAO Handbook 2026"
- 719 programmes card
- 21 institutions card  
- Search box
- Institution filter
- Download buttons
