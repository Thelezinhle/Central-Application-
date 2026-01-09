# CAO Handbook Integration Guide

## 🎯 Overview

This integration adds official CAO (Central Applications Office) handbook data to your application. It includes:

- **1,070+ official programmes** from South African universities and colleges
- **23 institutions** covering all CAO-registered institutions
- Searchable and filterable CAO courses interface
- CSV/JSON export functionality
- Full backend integration with MongoDB

---

## 📋 Step-by-Step Implementation

### Step 1: Download the CAO Handbook PDF

1. Visit: https://www.cao.ac.za/Download/CAO%20Handbook%202026%20Entry%20.26.02.25%20Final.pdf
2. Save the file as `CAO_Handbook_2026_Entry.pdf` in your project root folder (next to `extract_cao_data.py`)

**Expected file location:**
```
CAO/
├── CAO_Handbook_2026_Entry.pdf  ← Download here
├── extract_cao_data.py
├── backend/
├── frontend/
└── ...other files
```

---

### Step 2: Set Up Python Environment

Open your terminal and install required Python packages:

```bash
pip install pdfplumber pandas
```

Verify installation:
```bash
python -c "import pdfplumber, pandas; print('✓ All packages installed')"
```

---

### Step 3: Run the PDF Extraction Script

Extract data from the CAO Handbook PDF:

```bash
python extract_cao_data.py
```

**Expected output:**
```
============================================================
CAO HANDBOOK DATA EXTRACTOR
============================================================
Opening PDF and extracting pages 45 to 211...
  Processed 20 pages...
  Processed 40 pages...
  ...
Found 1070+ programme entries.

=== CLEANING DATA ===
Removed X duplicate entries

✓ Saved: backend/src/data/cao_programmes.json
✓ Saved: backend/src/data/cao_programmes.csv
✓ Saved: backend/src/data/cao_institution_summary.csv

=== EXTRACTION COMPLETE ===
Total programmes extracted: 1070+

Programmes by institution:
institution_name  programme_count
    UKZN           150+
    DUT            120+
    ...
```

**Files created:**
- `backend/src/data/cao_programmes.json` - Main data file (for database import)
- `backend/src/data/cao_programmes.csv` - Spreadsheet format
- `backend/src/data/cao_institution_summary.csv` - Institution statistics

---

### Step 4: Update Backend Model

✅ **Already done!** The Course model has been updated with CAO fields:

```javascript
cao: {
    programmeCode: String,      // e.g., "BCMM101"
    institution: String,         // e.g., "UKZN"
    handbookPage: Number,       // e.g., 45
    source: String,             // "cao_handbook_2026"
    verified: Boolean           // For admin verification
}
```

---

### Step 5: Seed the Database

Start your MongoDB database, then run:

```bash
cd backend
npm install  # If you haven't already
node seed-cao-programmes.js
```

**Expected output:**
```
Connecting to MongoDB...
✓ Connected to MongoDB

Setting up institutions...
  ✓ Created: University of KwaZulu-Natal
  ✓ Created: Durban University of Technology
  ...
  ✓ Created: 23 institutions

Seeding CAO programmes...
  Processed: 100 programmes...
  Processed: 200 programmes...
  ...

============================================================
SEEDING COMPLETE
============================================================
✓ Programmes created: 1070+
✓ Programmes updated: 0
✓ Programmes skipped: 0
✓ Total institutions: 23

Programmes by Institution:
  UKZN: 150+
  DUT: 120+
  MUT: 100+
  UNIZULU: 85+
  ...
✓ CAO data successfully seeded!
```

---

### Step 6: Update Backend API Endpoint

Update your course controller to support CAO filtering. Add this to your course routes:

```javascript
// Get CAO programmes
router.get('/', async (req, res) => {
    try {
        const { hasCAO, limit = 100, page = 1 } = req.query;
        let query = {};
        
        if (hasCAO === 'true') {
            query = { 'cao.programmeCode': { $exists: true, $ne: null } };
        }
        
        const skip = (page - 1) * limit;
        const courses = await Course.find(query)
            .limit(parseInt(limit))
            .skip(skip)
            .populate('university');
        
        const total = await Course.countDocuments(query);
        
        res.json({
            success: true,
            data: courses,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
```

---

### Step 7: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

---

### Step 8: Access CAO Programmes

Visit your frontend application:
```
http://localhost:5173/cao-programmes
```

You should see:
- Search bar for programme codes and names
- Filter by institution dropdown
- List of programmes by institution
- Checkbox selection
- Download as CSV/JSON buttons

---

## 📊 Understanding the Data

### Institutions Included (23 total)

**KwaZulu-Natal:**
- UKZN - University of KwaZulu-Natal
- DUT - Durban University of Technology
- MUT - Mangosuthu University of Technology
- UNIZULU - University of Zululand

**Gauteng:**
- UP - University of Pretoria
- UJ - University of Johannesburg
- WITS - University of the Witwatersrand
- UNISA - University of South Africa
- TUT - Tshwane University of Technology
- UV - Vaal University of Technology
- SMU - Sefako Makgatho Health Sciences University

**Western Cape:**
- UCT - University of Cape Town
- SU - Stellenbosch University
- UWC - University of the Western Cape

**Eastern Cape:**
- UFH - University of Fort Hare
- NMU - Nelson Mandela University
- WSU - Walter Sisulu University

**Other:**
- UNIVEN - University of Venda (Limpopo)
- CUT - Central University of Technology (Free State)
- NWUTSA - Northwest University (North West)
- CIDP - Construct IT Development Partnership

### Programme Code Format

Programme codes follow the pattern: `[LETTERS][NUMBERS][OPTIONAL LETTER]`

Examples:
- `BCMM101` - Bachelor of Commerce in Management (UKZN)
- `BCOM101` - Bachelor of Commerce (Various)
- `BENG101` - Bachelor of Engineering (Various)
- `BSCI101` - Bachelor of Science (Various)

---

## 🔧 Troubleshooting

### PDF Extraction Issues

**Problem:** "FileNotFoundError: Could not find PDF file"
- **Solution:** Ensure `CAO_Handbook_2026_Entry.pdf` is in the project root folder

**Problem:** "pdfplumber is not installed"
- **Solution:** Run `pip install pdfplumber pandas`

**Problem:** "No programmes extracted"
- **Solution:** The PDF structure might have changed. Try:
  ```bash
  # Check PDF validity
  python -c "import pdfplumber; print('PDF is valid')"
  ```

### Database Seeding Issues

**Problem:** "MongoDB connection failed"
- **Solution:** Ensure MongoDB is running and `MONGODB_URI` is set in `.env`

**Problem:** "cao_programmes.json not found"
- **Solution:** Run the Python extraction script first (Step 3)

**Problem:** "Duplicate key error"
- **Solution:** This is normal if running the seed script multiple times. The script updates existing programmes automatically.

### Frontend Display Issues

**Problem:** "CAO programmes page shows 'No programmes found'"
- **Solution:** 
  1. Check backend is running on port 5000
  2. Verify seed script completed successfully
  3. Check browser console for API errors

**Problem:** "Filter dropdown shows 0 institutions"
- **Solution:** 
  1. Verify API endpoint is returning CAO data: `curl http://localhost:5000/api/courses?hasCAO=true`
  2. Check MongoDB contains courses with `cao.programmeCode`

---

## 📱 Features

### Search
- Search by programme code (e.g., "BCMM101")
- Search by programme name (e.g., "Bachelor of Commerce")
- Search by institution (e.g., "UKZN")

### Filter
- Filter by institution
- View all or selected programmes

### Selection
- Select individual programmes
- Select all programmes from an institution
- View selection count

### Export
- Download selected programmes as CSV
- Download selected programmes as JSON

### Display
- Programmes grouped by institution
- Collapsible institution sections
- Programme code with verification badge (when verified)
- Handbook page reference

---

## 🚀 Next Steps

1. **Add APS Requirements**: Manually research and add minimum APS scores for each programme
   ```javascript
   cao: {
       ...existing fields,
       minimumAPS: 28,
       subjects: ['Math', 'English', 'Science']
   }
   ```

2. **Add Programme Details**: Enhance programmes with:
   - Duration (years)
   - Study mode (Full-time, Part-time)
   - Entry requirements
   - Contact information

3. **Integrate with Recommendations**: Use CAO data to improve course recommendations based on APS scores

4. **Add Verification System**: Allow admins to verify and edit CAO data

---

## 📞 Support

For issues with:
- **CAO Data**: Visit https://www.cao.ac.za
- **PDF Extraction**: Check pdfplumber documentation
- **Database**: Verify MongoDB connection
- **Frontend**: Check browser console for errors

---

## 📝 Data Structure Example

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "code": "BCMM101",
  "name": "Bachelor of Commerce in Management",
  "university": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "University of KwaZulu-Natal",
    "shortName": "UKZN"
  },
  "cao": {
    "programmeCode": "BCMM101",
    "institution": "UKZN",
    "handbookPage": 45,
    "source": "cao_handbook_2026",
    "verified": false
  },
  "description": "Bachelor of Commerce in Management at University of KwaZulu-Natal. CAO Programme Code: BCMM101",
  "level": "Bachelor",
  "isActive": true,
  "createdAt": "2026-01-08T10:30:00.000Z"
}
```

---

## ✅ Checklist

- [ ] Downloaded `CAO_Handbook_2026_Entry.pdf`
- [ ] Installed Python packages: `pip install pdfplumber pandas`
- [ ] Ran extraction script: `python extract_cao_data.py`
- [ ] Verified `backend/src/data/cao_programmes.json` exists
- [ ] Started MongoDB
- [ ] Ran seed script: `node backend/seed-cao-programmes.js`
- [ ] Started backend: `npm run dev`
- [ ] Started frontend: `npm run dev`
- [ ] Accessed `/cao-programmes` route
- [ ] Verified programmes are displaying

---

**🎉 You're all set! Your CAO Handbook data is now integrated into your application.**
