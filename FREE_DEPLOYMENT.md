# FREE Deployment Guide - Zero Cost

This guide deploys your Central Application Platform completely FREE using Vercel, Render, and MongoDB Atlas.

## Total Cost: $0 ✅

---

## Step 1: MongoDB Atlas Setup (Database) - FREE

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up with email
3. Create a free account
4. Click "Create a Cluster"
5. Choose **M0 Shared Cluster** (FREE)
6. Select region closest to you
7. Click "Create Cluster"
8. Wait 2-3 minutes for cluster to be ready
9. Click "Connect"
10. Choose "Drivers" connection method
11. Select Node.js driver
12. Copy the connection string
13. Replace `<password>` with your database password
14. Save this connection string - you'll need it!

**Your MongoDB Connection String will look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cao?retryWrites=true&w=majority
```

---

## Step 2: Build Frontend for Production

Run this command to create optimized build:

```bash
cd frontend
npm run build
```

This creates a `dist` folder ready for deployment.

---

## Step 3: Deploy Frontend to Vercel - FREE

1. Go to https://vercel.com
2. Sign up with GitHub (click "Continue with GitHub")
3. Authorize Vercel
4. Click "Import Project"
5. Paste your GitHub repo URL
6. Click "Import"
7. Leave settings as default
8. Click "Deploy"
9. Wait 2-3 minutes
10. You'll get a live URL like `https://your-project.vercel.app`

**Note:** You'll need to push your code to GitHub first!

---

## Step 4: Deploy Backend to Render - FREE

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repository
6. Fill in details:
   - **Name:** cao-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`

7. Click "Advanced"
8. Add Environment Variables:
   - **Key:** `MONGODB_URI`
     **Value:** (paste your MongoDB connection string from Step 1)
   - **Key:** `FRONTEND_URL`
     **Value:** (your Vercel frontend URL)
   - **Key:** `CORS_ORIGIN`
     **Value:** (your Vercel frontend URL)
   - **Key:** `JWT_SECRET`
     **Value:** `your-secret-key-12345` (any random string)

9. Click "Create Web Service"
10. Wait 5-10 minutes for deployment
11. You'll get a URL like `https://cao-backend.onrender.com`

---

## Step 5: Update Frontend Environment Variables

In your Vercel dashboard:
1. Go to your project settings
2. Click "Environment Variables"
3. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://cao-backend.onrender.com` (your Render backend URL)

---

## Step 6: Verify Everything Works

1. Visit your Vercel frontend URL
2. Test searching for institutions
3. Test voice commands
4. Check browser console for errors

---

## Cost Breakdown

| Service | Tier | Cost |
|---------|------|------|
| Vercel (Frontend) | Free | $0 |
| Render (Backend) | Free | $0 |
| MongoDB Atlas (Database) | M0 (512MB) | $0 |
| **TOTAL** | | **$0** |

---

## Important Notes

⚠️ **Free Tier Limitations:**
- Render will sleep after 15 min inactivity (first request takes 10-30 sec)
- MongoDB M0 has 512MB storage (enough for testing)
- Both services are suitable for portfolio/demo purposes

✅ **What works perfectly:**
- Full functionality for recruiters/demos
- Voice commands
- All search features
- Application tracking
- Database operations

---

## If You Need to Scale Later

For production with zero downtime:
- Render Pro: $10/month
- MongoDB M2+: $57+/month
- Still much cheaper than alternatives!

---

## Support & Troubleshooting

If backend sleeps:
- Any request will wake it up
- First request takes 10-30 seconds
- Subsequent requests are instant

If CORS errors occur:
- Check CORS_ORIGIN matches your frontend URL
- Verify no typos in environment variables

---

**Total Setup Time:** ~20-30 minutes
**Total Cost:** $0 ✅
**Status:** Production-ready for demos and recruitment!

Good luck! 🚀
