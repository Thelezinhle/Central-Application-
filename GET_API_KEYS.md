# 🔑 API Keys Setup Guide

## STEP 1: RapidAPI - Open Universities API

This gives you access to **9,000+ universities worldwide** - completely FREE!

### Get Your Free API Key (5 minutes):

1. **Go to:** https://rapidapi.com/KeerthikaR/api/open-universities
2. **Click:** "Sign Up Free" (top right)
3. **Create Account:**
   - Email address
   - Password
   - Click "Create Account"
   - Verify email (check your inbox)
4. **Go Back to:** https://rapidapi.com/KeerthikaR/api/open-universities
5. **Click:** "Subscribe to Test" (free tier)
6. **Copy Your API Key:**
   - Go to: https://rapidapi.com/settings/apps
   - Find "open-universities" app
   - Copy the **API Key** (looks like: `abc123xyz...`)
7. **Add to your `.env` file:**
   ```
   RAPIDAPI_KEY=abc123xyz...
   RAPIDAPI_HOST=open-universities.p.rapidapi.com
   ```

### Testing the API (in browser):
```
https://open-universities.p.rapidapi.com/search?country=south%20africa
```

You'll see:
```json
[
  {
    "name": "University of Cape Town",
    "country": "South Africa",
    "websites": ["www.uct.ac.za"],
    "domains": ["uct.ac.za"]
  }
]
```

---

## STEP 2: Geonames (Optional - for country lookups)

This helps filter universities by country - completely FREE!

### Get Your Free Username (2 minutes):

1. **Go to:** https://www.geonames.org/login
2. **Click:** "Create new user" (bottom)
3. **Fill in:**
   - Username
   - Email
   - Password
   - Check "I have read the terms of service"
4. **Click:** "Create my account"
5. **Check your email** for activation link
6. **Click activation link**
7. **Log in** to https://www.geonames.org/login
8. **Enable API access:**
   - Click your username (top right)
   - Click "edit user"
   - Check the box: "Free web services"
   - Click "Save"
9. **Copy your username:**
   - Your username is displayed at the top
10. **Add to your `.env` file:**
    ```
    GEONAMES_USERNAME=your_username
    ```

---

## STEP 3: Add Keys to Your .env File

### In VSCode:

1. **Open** `backend/.env.example`
2. **Copy the entire file**
3. **Create new file** `backend/.env`
4. **Paste** the content
5. **Replace the placeholders:**
   ```env
   # Before:
   RAPIDAPI_KEY=your_rapidapi_key_here
   
   # After (use YOUR actual key):
   RAPIDAPI_KEY=abc123xyz789...
   ```
6. **Save** the file

### Your `.env` should look like:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cao-app
JWT_SECRET=your_jwt_secret_key_here

# Your actual RapidAPI key
RAPIDAPI_KEY=xxxxxxxxxxxxxx
RAPIDAPI_HOST=open-universities.p.rapidapi.com

# Your actual Geonames username
GEONAMES_USERNAME=your_username
```

---

## STEP 4: Test the Backend is Ready

```bash
# In terminal, go to backend folder
cd backend

# Install dependencies (if not done)
npm install

# Start the backend
npm start
```

You should see:
```
✅ Server running on http://localhost:5000
✅ MongoDB connected
```

---

## STEP 5: Check .env File Location

**Important:** The `.env` file should be **inside the backend folder**:

```
backend/
  ├─ .env          ← Your file with API keys (DO NOT commit to GitHub!)
  ├─ .env.example  ← Template for other developers
  ├─ package.json
  ├─ src/
  └─ ...
```

---

## What Happens Next

Once you have the API keys:

### Backend automatically gets access to:
- ✅ 9,000+ universities (RapidAPI)
- ✅ Country lookups (Geonames)
- ✅ University websites and domains
- ✅ Filter by country, state, region

### Frontend will be able to:
- ✅ Show all universities worldwide
- ✅ Search by country
- ✅ Filter by type (university, college, etc.)
- ✅ Show real course offerings
- ✅ Let users select from 9000+ institutions

---

## Security Reminder ⚠️

**DO NOT:**
- ❌ Share your `.env` file
- ❌ Commit `.env` to GitHub
- ❌ Post API keys in Slack/Discord
- ❌ Email API keys to anyone

**DO:**
- ✅ Keep `.env` file private
- ✅ Add `.env` to `.gitignore`
- ✅ Use `.env.example` as template
- ✅ Store sensitive keys securely

---

## Troubleshooting

### "API key not working"
- Check if you copied the FULL key (no spaces)
- Check if you restarted the backend server
- Check if the key is in the correct `.env` file

### "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### "API returns 401 Unauthorized"
- Your API key is wrong
- Your RapidAPI subscription expired
- Get a new key from https://rapidapi.com/settings/apps

### "Rate limit exceeded"
- You hit the 100 requests/day free limit
- Wait 24 hours OR upgrade to paid plan
- Or use Geonames API instead (unlimited)

---

## Next Steps After Getting Keys

1. ✅ Get RapidAPI key (this page)
2. ✅ Get Geonames username (this page)
3. ⏳ Create backend API endpoint (see QUICK_START_GLOBAL.md)
4. ⏳ Add universities to database
5. ⏳ Test in browser
6. ⏳ Add multi-language support
7. ⏳ Add accessibility features

**Estimated time:** 30 minutes to get both keys
**Cost:** FREE 🎉

---

## Questions?

- RapidAPI help: https://rapidapi.com/support
- Geonames help: https://www.geonames.org/
- Our guide: See QUICK_START_GLOBAL.md

**You're 5 minutes away from having real data! 🚀**
