# Deploy to Render - FREE

Your StudyLink SA app will be live in 10 minutes!

---

## Prerequisites

1. **GitHub Account** - Sign up at https://github.com if you don't have one
2. **Render Account** - Sign up FREE at https://render.com (use GitHub login)

---

## Step 1: Push Code to GitHub

If your code isn't on GitHub yet:

```bash
# In VS Code terminal, run:
git init
git add .
git commit -m "Initial commit - StudyLink SA app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studylink-sa.git
git push -u origin main
```

If already on GitHub, just commit your latest changes:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

---

## Step 2: Deploy Backend on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `studylink-sa-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

5. Click **"Create Web Service"**
6. Wait 3-5 minutes for deployment
7. Copy your backend URL (e.g., `https://studylink-sa-backend.onrender.com`)

---

## Step 3: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name:** `studylink-sa-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. Add Environment Variable:
   - Click **"Advanced"**
   - Add: `VITE_API_URL` = `https://studylink-sa-backend.onrender.com` (your backend URL from Step 2)

5. Click **"Create Static Site"**
6. Wait 2-3 minutes

---

## Step 4: Test Your App

Your app is now live at: `https://studylink-sa-frontend.onrender.com`

Test these:
- Homepage loads
- Universities page shows 26 SA universities
- Province filter works
- Colleges page loads

---

## Troubleshooting

### Backend won't start?
- Check Render logs for errors
- Make sure `backend/package.json` has `"type": "module"`

### Frontend shows "Cannot connect to API"?
- Verify `VITE_API_URL` environment variable is set correctly
- Redeploy frontend after adding the variable

### App is slow on first load?
- Normal on free tier - app "sleeps" after 15 mins of inactivity
- First request wakes it up (~30 seconds)

---

## Your Live URLs

After deployment:
- **Frontend:** https://studylink-sa-frontend.onrender.com
- **Backend API:** https://studylink-sa-backend.onrender.com/api/health

---

## Cost: $0 Forever

Free tier includes:
- 750 hours/month (enough for 1 app 24/7)
- Auto-deploy from GitHub
- SSL/HTTPS included
- Custom domains (upgrade only)
