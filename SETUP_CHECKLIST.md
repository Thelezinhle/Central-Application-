# ✅ QUICK SETUP CHECKLIST

## Everything is Ready! Follow These 7 Steps

---

## ☐ STEP 1: Get API Keys (5 Minutes)

### RapidAPI - Open Universities
- [ ] Go to: https://rapidapi.com/KeerthikaR/api/open-universities
- [ ] Click "Sign Up Free"
- [ ] Create account (email, password)
- [ ] Verify email
- [ ] Go back to API page
- [ ] Click "Subscribe to Test" (FREE tier)
- [ ] Copy API Key from: https://rapidapi.com/settings/apps
- [ ] **Save this key!** You'll need it soon

### Geonames (Optional - for country lookups)
- [ ] Go to: https://www.geonames.org/login
- [ ] Click "Create new user"
- [ ] Create account
- [ ] Check email and activate
- [ ] Log in
- [ ] Go to "edit user"
- [ ] Enable "Free web services"
- [ ] **Save your username!** You'll need it soon

---

## ☐ STEP 2: Install NPM Packages

### In Terminal (Backend Folder):
```bash
cd backend
npm install dotenv axios
```

### In Another Terminal (Frontend Folder):
```bash
cd frontend
npm install i18next react-i18next i18next-browser-languagedetector react-speech-kit
```

- [ ] Both commands completed successfully

---

## ☐ STEP 3: Create `.env` File

### In VSCode:

1. [ ] Open `backend` folder
2. [ ] Create new file called `.env` (in backend folder)
3. [ ] Copy content from `.env.example`
4. [ ] Replace `your_rapidapi_key_here` with your actual RapidAPI key
5. [ ] Replace `your_geonames_username_here` with your actual username
6. [ ] Save the file

### Your `.env` should have:
- [ ] `RAPIDAPI_KEY=your_actual_key`
- [ ] `RAPIDAPI_HOST=open-universities.p.rapidapi.com`
- [ ] `GEONAMES_USERNAME=your_actual_username`

---

## ☐ STEP 4: Update Backend Routes

### Open: `backend/src/index.js`

1. [ ] Add import at top:
```javascript
import globalUniversitiesRoutes from './routes/globalUniversities.js';
```

2. [ ] Add route (with other routes):
```javascript
app.use('/api/global-universities', globalUniversitiesRoutes);
```

3. [ ] Save file

---

## ☐ STEP 5: Update Frontend i18n

### Open: `frontend/src/main.jsx`

1. [ ] Add import at top:
```javascript
import i18n from './config/i18n.js'
```

2. [ ] Save file

---

## ☐ STEP 6: Start Servers

### Terminal 1 - Backend:
```bash
cd backend
npm start
```
- [ ] See: "Server running on http://localhost:5000"
- [ ] See: "MongoDB connected"

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
- [ ] See: "Local: http://localhost:3000"

---

## ☐ STEP 7: Test It Works

### Test API Endpoints in Browser:

1. [ ] **Countries list:**
   Visit: http://localhost:5000/api/global-universities/countries
   Should see: List of countries

2. [ ] **Get universities:**
   Visit: http://localhost:5000/api/global-universities/by-country/south%20africa
   Should see: South African universities

3. [ ] **Search universities:**
   Visit: http://localhost:5000/api/global-universities/search?query=harvard
   Should see: Harvard universities

### Test Frontend:
- [ ] Open: http://localhost:3000
- [ ] App loads without errors
- [ ] Can click buttons
- [ ] No red errors in console

---

## 🎉 YOU'RE DONE!

You now have:

✅ **Real University Data**
- 9000+ universities
- All countries
- Free API access

✅ **Multi-Language Support**
- English, Spanish, French installed
- Portuguese, Arabic, Chinese, Hindi ready
- Auto-detects user's language

✅ **Accessibility Ready**
- Text-to-speech installed
- Screen reader support structure
- Keyboard navigation ready

✅ **Zero Cost**
- All free APIs
- All free libraries

---

## What's Next?

### Phase 1 (This Week):
- Create UI for language selector (dropdown in navbar)
- Create UI for browsing universities
- Test with real API data

### Phase 2 (Next Week):
- Add text-to-speech button
- Add ARIA labels to all components
- Test with screen reader

### Phase 3:
- Add captions for videos
- Add high contrast mode
- Full accessibility testing

---

## Need Help?

**API Key issues?**
→ Read: `GET_API_KEYS.md`

**Installation issues?**
→ Read: `INSTALLATION_GUIDE.md`

**Want full details?**
→ Read: `QUICK_START_GLOBAL.md`

**Questions answered?**
→ Read: `ANSWER_YOUR_QUESTIONS.md`

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "Cannot find dotenv" | Run: `npm install dotenv` |
| "Cannot find i18next" | Run: `npm install i18next` |
| "API returns 401" | Check your API key is correct in `.env` |
| "localhost:3000 not loading" | Restart frontend: `npm run dev` |
| "localhost:5000 not loading" | Restart backend: `npm start` |
| "Module not found" | Make sure you're in correct folder when running npm |

---

## Final Verification

Before moving forward, verify:

```bash
# Backend is running?
curl http://localhost:5000/api/global-universities/countries

# Frontend is running?
# Open http://localhost:3000 in browser

# API key working?
# If you get university data, it works!
```

---

**Everything is set up and ready to go! 🚀**

**Follow the 7 steps above, and you'll have a working global university system in 30 minutes!**

**Cost: $0**
**Time: 30 minutes**
**Difficulty: Easy**

**Let's build it! 💪**
