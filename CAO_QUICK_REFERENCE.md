# 🚀 CAO Integration - Quick Start

## 30-Minute Setup

### Prerequisites ✅
- Python 3.8+
- Node.js & npm
- MongoDB running
- `.env` file with `MONGODB_URI`

---

## The 5-Step Process

### 1️⃣ Download PDF (2 min)
```bash
# Download from: https://www.cao.ac.za/Download/CAO%20Handbook%202026%20Entry%20.26.02.25%20Final.pdf
# Save as: CAO_Handbook_2026_Entry.pdf (in project root)
```

### 2️⃣ Install Python Packages (1 min)
```bash
pip install pdfplumber pandas
```

### 3️⃣ Extract CAO Data (5 min)
```bash
python extract_cao_data.py
```
✅ Creates: `backend/src/data/cao_programmes.json`

### 4️⃣ Seed Database (5 min)
```bash
cd backend && node seed-cao-programmes.js
```
✅ Creates: 1,070+ course records + 23 institutions

### 5️⃣ View in App (2 min)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Visit: http://localhost:5173/cao-programmes
```

---

## What's Included ✨

| Component | Location | Purpose |
|-----------|----------|---------|
| **Python Script** | `extract_cao_data.py` | Extracts PDF data |
| **Seed Script** | `backend/seed-cao-programmes.js` | Imports to MongoDB |
| **Frontend Component** | `frontend/src/pages/CAOCoursesPage.jsx` | Displays programmes |
| **Frontend Styles** | `frontend/src/styles/CAOCoursesPage.css` | Page styling |
| **Course Model Update** | `backend/src/models/Course.js` | CAO fields added |
| **Route** | App.jsx | `/cao-programmes` |

---

## 23 Institutions 🏫

**UKZN, DUT, MUT, UNIZULU** (KZN)  
**UP, UJ, WITS, UNISA, TUT, UV, SMU** (Gauteng)  
**UCT, SU, UWC** (Western Cape)  
**UFH, NMU, WSU** (Eastern Cape)  
**UNIVEN** (Limpopo) • **CUT** (Free State) • **NWUTSA** (North West) • **CIDP**

---

## Features 🎯

✅ Search programmes by code/name  
✅ Filter by institution  
✅ Select multiple programmes  
✅ Download as CSV or JSON  
✅ Expandable institution sections  
✅ Verification status badges  
✅ Handbook page references  

---

## Troubleshooting 🔧

| Issue | Solution |
|-------|----------|
| PDF not found | Check file is named `CAO_Handbook_2026_Entry.pdf` in root |
| pdfplumber error | Run `pip install pdfplumber pandas` |
| No programmes found | Run extraction script first, then seed script |
| DB connection error | Check MongoDB is running and `MONGODB_URI` is set |
| Frontend shows 0 items | Verify backend running on port 5000 |

---

## Files Created

After running extraction script:
```
backend/src/data/
├── cao_programmes.json (1,070+ records)
├── cao_programmes.csv (spreadsheet format)
└── cao_institution_summary.csv (statistics)
```

---

## API Endpoint

```bash
# Get CAO programmes
GET http://localhost:5000/api/courses?hasCAO=true&limit=5000

# Returns:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "code": "BCMM101",
      "name": "Bachelor of Commerce in Management",
      "cao": {
        "programmeCode": "BCMM101",
        "institution": "UKZN",
        "handbookPage": 45,
        "verified": false
      },
      ...
    }
  ],
  "total": 1070
}
```

---

## Frontend Route

```javascript
// Already added to App.jsx
<Route path="/cao-programmes" element={<CAOCoursesPage />} />
```

Visit: `http://localhost:5173/cao-programmes`

---

## Database Schema

```javascript
cao: {
    programmeCode: String,      // "BCMM101"
    institution: String,        // "UKZN"
    handbookPage: Number,      // 45
    source: String,            // "cao_handbook_2026"
    verified: Boolean          // false (for admin review)
}
```

---

## Next Steps 📋

1. **Add APS scores** to programmes
2. **Add entry requirements** for each programme
3. **Build admin panel** to verify/edit programmes
4. **Integrate with recommendations** system
5. **Add contact info** for each institution

---

## Commands Cheat Sheet

```bash
# Extract data
python extract_cao_data.py

# Seed database
cd backend && node seed-cao-programmes.js

# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Check extracted data
cat backend/src/data/cao_institution_summary.csv

# View in MongoDB
db.courses.find({"cao.programmeCode": {$exists: true}}).limit(5)
```

---

**⏱️ Total Time: ~30 minutes**  
**📊 Data Added: 1,070+ programmes from 23 institutions**  
**✨ Features: Search, filter, select, export**

---

For detailed instructions, see: **CAO_INTEGRATION_GUIDE.md**
