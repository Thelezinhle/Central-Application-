# 🔑 RapidAPI Key - Step-by-Step Visual Guide

## Where You Are Now
You're at: `rapidapi.com/hub` ✅

---

## STEP 1: Go to the Open Universities API

### Click Here:
In your browser address bar, **paste this exact URL:**
```
https://rapidapi.com/KeerthikaR/api/open-universities
```

Then press **Enter** on keyboard.

**What you'll see:**
- Page showing "Open Universities API"
- Blue button saying "Subscribe to Test"
- Pricing showing FREE option

---

## STEP 2: Click "Subscribe to Test"

### Location:
Look for the **large blue button** that says:
```
Subscribe to Test
```

**Click it!** (Right side of page, middle area)

---

## STEP 3: Choose FREE Plan

### What appears:
- Popup or page showing pricing
- You'll see options: FREE, BASIC, PREMIUM

### Click Here:
Select the **FREE** option (usually on the left)

Then click the button that says:
```
Subscribe
```

**Cost:** $0.00/month ✅

---

## STEP 4: View Your API Key

### After subscribing, you should see:
A page with your API credentials

### Look for section called:
```
X-RapidAPI-Key
```

### What you'll see:
Something like:
```
abc123def456ghi789jkl012mno345pqr678stu901
```

This is your **API KEY** - it's unique to you!

---

## STEP 5: COPY Your API Key

### How to copy:

**Option 1 (Easiest):**
- Hover over the key value
- Click the **copy icon** (looks like 📋)
- Key is now copied to clipboard

**Option 2:**
- Triple-click the key to select all
- Press **Ctrl+C** on keyboard
- Key is now copied

**Option 3:**
- Select the text with mouse
- Right-click
- Click "Copy"

---

## STEP 6: Also Get This Value

### Look for:
```
X-RapidAPI-Host
```

### Value should be:
```
open-universities.p.rapidapi.com
```

**Copy this too!** (Usually can copy directly)

---

## Where to Find These If You Already Subscribed

### If page closed, go here:

1. **Click your profile** (top right, green circle with letter)
2. **Click "Apps"** in menu
3. **Find "open-universities"** in list
4. **Click it**
5. **You'll see your API Key and Host**

---

## What You'll Copy

You need TWO things:

### #1: API Key
```
RAPIDAPI_KEY=<paste your key here>
```

Example (fake):
```
RAPIDAPI_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx
```

### #2: Host
```
RAPIDAPI_HOST=open-universities.p.rapidapi.com
```

This one is always the same - just copy as shown.

---

## STEP 7: Add to Your .env File

### In VSCode:

1. **Open folder:** `backend`
2. **Create new file:** `.env`
3. **Paste this:**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cao-app
JWT_SECRET=your_jwt_secret_key_here

RAPIDAPI_KEY=<paste your key here>
RAPIDAPI_HOST=open-universities.p.rapidapi.com
```

4. **Replace:** `<paste your key here>` with your actual key
5. **Save file:** Ctrl+S

---

## Visual: Where to Click on RapidAPI

```
┌─────────────────────────────────────────────────────┐
│ RapidAPI Hub                                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Open Universities API]                            │
│                                                     │
│  ┌─────────────────────────────────────┐           │
│  │  [Subscribe to Test] ← CLICK HERE   │           │
│  │  (Large Blue Button)                │           │
│  └─────────────────────────────────────┘           │
│                                                     │
│  Pricing:                                           │
│  ┌──────────┬──────────┬──────────┐               │
│  │  FREE ← │ BASIC    │ PREMIUM  │               │
│  │ $0/mo   │          │          │               │
│  └──────────┴──────────┴──────────┘               │
│                                                     │
│  After Subscribe:                                   │
│  ┌─────────────────────────────────┐              │
│  │ X-RapidAPI-Key:                 │              │
│  │ abc123def456... [Copy] ← CLICK   │              │
│  │                                 │              │
│  │ X-RapidAPI-Host:                │              │
│  │ open-universities.p.rapidapi... │              │
│  └─────────────────────────────────┘              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Keyboard Shortcuts

| Action | Keys |
|--------|------|
| Copy API Key | Ctrl+C (after selecting) |
| Paste in VSCode | Ctrl+V |
| Save file | Ctrl+S |
| Go to line | Ctrl+G |

---

## Troubleshooting

### "I don't see Subscribe to Test"
- Make sure you're at the right API page
- URL should contain: `open-universities`
- Refresh page (Ctrl+R or F5)

### "I don't see my API Key"
- Click "Apps" in your profile menu
- Find "open-universities"
- Click the app name
- Scroll down to find keys

### "Can't find the copy button"
- Look for icon that looks like: 📋 or ⧗
- Usually next to the key value
- Hover over it to see "Copy" text

### "Where do I paste this?"
- File: `backend/.env`
- Find line: `RAPIDAPI_KEY=your_rapidapi_key_here`
- Replace the text after `=` with your actual key

---

## What NOT to Do

❌ **DON'T:**
- Share your API key with anyone
- Post it in Slack/Discord
- Commit `.env` file to GitHub
- Email it to people
- Put it in frontend code

✅ **DO:**
- Keep it in `.env` file only
- Use environment variables
- Add `.env` to `.gitignore`
- Treat it like a password

---

## Verify It Works

### After adding key to .env:

1. **Save file:** Ctrl+S
2. **Restart backend:** `npm start`
3. **Check console for:** "Server running on http://localhost:5000"
4. **Test in browser:** 
   ```
   http://localhost:5000/api/global-universities/countries
   ```
5. **Should see:** List of countries (no error)

If you see countries = **SUCCESS!** ✅

---

## Next Steps

1. ✅ Get API key (you are here)
2. ✅ Add to .env file
3. ⏳ Install npm packages
4. ⏳ Start servers
5. ⏳ Test in browser

---

## Quick Reference

**RapidAPI Open Universities:**
- URL: https://rapidapi.com/KeerthikaR/api/open-universities
- Cost: FREE
- Rate limit: 100 requests/day (free tier)
- No credit card needed
- Immediate access

**What you'll get:**
- 9000+ universities
- All countries
- Website URLs
- Domain information

---

## Still Stuck?

### Can't find Subscribe button?
→ Make sure you're logged in (green circle top right)

### Can't find your keys?
→ Go to: Profile → Apps → Click "open-universities"

### Keys not working?
→ Make sure you have BOTH:
- RAPIDAPI_KEY (your unique key)
- RAPIDAPI_HOST=open-universities.p.rapidapi.com

---

**You're doing great! Getting the API key is the hardest part - and you're almost done! 💪**

**Once you paste the key in `.env` file, move on to the next step!**
