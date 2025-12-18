# 📋 Dependencies Installation Reference

## Backend Dependencies to Install

```bash
cd backend
npm install dotenv axios
```

### What Each Does:

| Package | Purpose | Version |
|---------|---------|---------|
| `dotenv` | Loads environment variables from `.env` file | ^16.0.0 |
| `axios` | Makes HTTP requests to RapidAPI | ^1.4.0 |

### Why You Need Them:

**dotenv:**
- Keeps your API keys safe
- Loads from `.env` file (not in code)
- Prevents accidentally sharing keys on GitHub

**axios:**
- Makes clean requests to RapidAPI
- Handles errors gracefully
- Built-in retry logic

---

## Frontend Dependencies to Install

```bash
cd frontend
npm install i18next react-i18next i18next-browser-languagedetector react-speech-kit
```

### What Each Does:

| Package | Purpose | Version |
|---------|---------|---------|
| `i18next` | Multi-language support framework | ^23.0.0 |
| `react-i18next` | React integration for i18next | ^13.0.0 |
| `i18next-browser-languagedetector` | Auto-detects user's language | ^7.1.0 |
| `react-speech-kit` | Text-to-speech for accessibility | ^3.0.5 |

### Why You Need Them:

**i18next:**
- Industry standard for multi-language apps
- Supports 100+ languages
- Very fast and lightweight

**react-i18next:**
- React component integration
- Easy to use with hooks
- Minimal boilerplate

**i18next-browser-languagedetector:**
- Auto-detects user's browser language
- Remembers user's choice
- Falls back to English if needed

**react-speech-kit:**
- Text-to-speech for blind/visually impaired users
- Works in all browsers
- Simple API to use

---

## Full Installation Commands

### Copy-Paste Ready:

```bash
# Install backend dependencies
cd backend
npm install dotenv axios

# Install frontend dependencies  
cd frontend
npm install i18next react-i18next i18next-browser-languagedetector react-speech-kit

# Done!
```

---

## Verify Installation

### Backend:
```bash
cd backend
npm list dotenv axios
```

Should show:
```
dotenv@16.0.3
axios@1.4.0
```

### Frontend:
```bash
cd frontend
npm list i18next react-i18next i18next-browser-languagedetector react-speech-kit
```

Should show:
```
i18next@23.x.x
react-i18next@13.x.x
i18next-browser-languagedetector@7.x.x
react-speech-kit@3.x.x
```

---

## If Installation Fails

### Common Issues & Solutions:

#### "npm ERR! code ERESOLVE"
```bash
# Use this command instead:
npm install --legacy-peer-deps
```

#### "npm ERR! 404 Not Found"
```bash
# Update npm first:
npm install -g npm@latest

# Then try again:
npm install dotenv axios
```

#### "Module not found"
```bash
# Delete node_modules and try again:
rm -r node_modules
npm install
```

---

## Check Everything is Ready

### Backend Check:
```bash
cd backend
npm list
```

You should see both:
- ✅ dotenv
- ✅ axios

### Frontend Check:
```bash
cd frontend
npm list
```

You should see all four:
- ✅ i18next
- ✅ react-i18next
- ✅ i18next-browser-languagedetector
- ✅ react-speech-kit

---

## Total Installation Time

```
npm install (backend):  2-3 minutes
npm install (frontend): 3-5 minutes
Total:                  5-8 minutes
```

---

## Next After Installation

Once everything is installed:

1. [ ] Get API keys (see `GET_API_KEYS.md`)
2. [ ] Create `.env` file with your keys
3. [ ] Start backend server
4. [ ] Start frontend server
5. [ ] Test everything works

---

## Optional: Additional Packages (For Later)

These are NOT needed right now, but helpful later:

```bash
# For better accessibility (screen reader testing)
npm install --save-dev axe-core

# For API testing
npm install --save-dev jest supertest

# For better styling (already have Tailwind)
# npm install headlessui @headlessui/react

# For forms
# npm install react-hook-form zod
```

---

## Summary

**Required installations:**
```bash
Backend:  npm install dotenv axios
Frontend: npm install i18next react-i18next i18next-browser-languagedetector react-speech-kit
```

**Time:** 5-8 minutes
**Cost:** FREE
**Difficulty:** Very Easy (just run the commands!)

**That's it! All dependencies are set up!**
