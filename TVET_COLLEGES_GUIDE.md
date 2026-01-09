# 📚 TVET & Colleges Integration Guide

## Overview

Your app now supports **three-tier institution management**:
- **Tier 1**: Public Universities (full info, CAO-based)
- **Tier 2**: CAO Partner Colleges (colleges in CAO handbook)
- **Tier 3**: TVET Colleges (50+ national TVET colleges)
- **Tier 4**: Private Colleges (Damelin, Boston, CTU, etc.)

All unified in one place at `/all-institutions`.

---

## Database Schema Updates

### Institution (University Model) - EXPANDED

```javascript
// New fields added to the University schema:

// 1. Institution Type Classification
type: {
    type: String,
    enum: ['public_university', 'tvet_college', 'private_college', 'cao_partner_college'],
    default: 'public_university'
}

// 2. Application System Type
applicationSystem: {
    type: String,
    enum: ['CAO', 'direct_college', 'direct_university'],
    default: 'CAO'
}

// 3. TVET-Specific Information
tvetInfo: {
    dhetRegistered: Boolean,
    campus_locations: [{
        name: String,
        city: String,
        province: String
    }],
    programmes: [{
        name: String,
        nqfLevel: String,  // N1-N6
        category: String   // Engineering, Business, etc.
    }]
}

// 4. College Accreditation Information
collegeInfo: {
    accreditationBodies: [String],  // CHE, DHET, SETA
    cheAccredited: Boolean,
    dhetAccredited: Boolean,
    setaAccredited: Boolean,
    accreditationNumber: String,
    registeredProgrammes: Number
}

// 5. Application URLs
applicationUrl: String,           // For non-CAO institutions
caoApplicationUrl: String        // Defaults to https://www.cao.ac.za/apply
```

### Course Model - EXPANDED

```javascript
// New fields added to the Course schema:

// 1. Application System Type
applicationSystem: {
    type: String,
    enum: ['CAO', 'direct_college', 'direct_university'],
    default: 'CAO'
}

// 2. TVET-Specific Fields
tvet: {
    nqfLevel: String,           // N1-N6
    subject: String,
    moduleCode: String,
    credits: Number,
    sectorEducationType: String // SETA-assigned
}

// 3. Direct Application Fields
directApplication: {
    applicationUrl: String,
    requiresAPS: Boolean,
    requiresMatric: Boolean,
    contactPerson: String,
    contactEmail: String
}
```

---

## Populating TVET Colleges Data

### Step 1: Get TVET College Data Source

The **DHET (Department of Higher Education and Training)** maintains the official list:
- **Primary Source**: [DHET TVET College Listing](https://www.dhet.gov.za/SitePages/TVETColleges.aspx)
- **Data Format**: Manual research (list of 50+ colleges per province)

### Step 2: Create TVET Seed Script

Create a new file: `backend/seed-tvet-colleges.js`

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import University from './src/models/University.js';

dotenv.config();

const TVET_COLLEGES = [
    {
        name: 'False Bay TVET College',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'FBAY',
        address: {
            city: 'Khayelitsha',
            province: 'Western Cape',
            street: 'Long Street, Khayelitsha'
        },
        contact: {
            phone: '021 787 0800',
            email: 'info@falsebaycollege.co.za',
            admissionsEmail: 'admissions@falsebaycollege.co.za'
        },
        web_pages: ['https://www.falsebaycollege.co.za'],
        applicationUrl: 'https://www.falsebaycollege.co.za/apply',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'Khayelitsha Campus', city: 'Khayelitsha', province: 'Western Cape' },
                { name: 'Fish Hoek Campus', city: 'Fish Hoek', province: 'Western Cape' },
                { name: 'Muizenberg Campus', city: 'Muizenberg', province: 'Western Cape' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering', nqfLevel: 'N3-N6', category: 'Engineering' },
                { name: 'National Certificate: Business Studies', nqfLevel: 'N1-N3', category: 'Business' },
                { name: 'National Certificate: Hospitality', nqfLevel: 'N1-N3', category: 'Hospitality' }
            ]
        }
    },
    {
        name: 'College of Cape Town',
        type: 'tvet_college',
        applicationSystem: 'direct_college',
        code: 'CCPT',
        address: {
            city: 'Cape Town',
            province: 'Western Cape'
        },
        contact: {
            phone: '021 921 2500',
            email: 'info@cct.edu.za',
            admissionsEmail: 'admissions@cct.edu.za'
        },
        web_pages: ['https://www.cct.edu.za'],
        applicationUrl: 'https://www.cct.edu.za/apply',
        tvetInfo: {
            dhetRegistered: true,
            campus_locations: [
                { name: 'City Campus', city: 'Cape Town', province: 'Western Cape' },
                { name: 'Bellville Campus', city: 'Bellville', province: 'Western Cape' }
            ],
            programmes: [
                { name: 'National Certificate: Engineering', nqfLevel: 'N1-N6', category: 'Engineering' },
                { name: 'National Certificate: IT', nqfLevel: 'N1-N4', category: 'Information Technology' }
            ]
        }
    },
    // Add more TVET colleges...
];

async function seedTVETColleges() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const college of TVET_COLLEGES) {
            const exists = await University.findOne({ code: college.code });
            if (!exists) {
                await University.create(college);
                console.log(`✓ Created: ${college.name}`);
            }
        }

        console.log('\n✓ TVET colleges seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding TVET colleges:', error);
        process.exit(1);
    }
}

seedTVETColleges();
```

### Step 3: Run the Seed Script

```bash
cd backend
node seed-tvet-colleges.js
```

---

## Adding CAO Partner Colleges

When you ran the CAO Handbook extraction, colleges like **Eduvos, MANCOSA, AAA School** were extracted.

To properly mark them as CAO Partner Colleges:

```javascript
// Update extracted CAO programmes to mark college type
db.universities.updateMany(
    { code: { $in: ['EDUVOS', 'MANCOSA', 'AAA'] } },
    { 
        $set: { 
            type: 'cao_partner_college',
            applicationSystem: 'CAO'
        }
    }
);
```

---

## Frontend Integration: `/all-institutions`

The new unified page at `/all-institutions` displays:

### Features:
✅ **Search** by institution name or code  
✅ **Filter by Type**: University, TVET, CAO Partner, Private College  
✅ **Filter by Province**: Gauteng, Western Cape, etc.  
✅ **Live Results Counter**: Shows matched institutions  
✅ **Color-Coded Cards**: Blue (University), Orange (TVET), Green (CAO), Purple (Private)  
✅ **Accreditation Display**: Shows CHE, DHET, SETA status for colleges  
✅ **Direct Application Links**: 
  - CAO institutions → Direct to CAO portal
  - Direct-apply institutions → Direct to college's application page  

### Navigation:
- Desktop: Click "CAO Handbook" in navbar (now prominent and green)
- Mobile: Same, in dropdown menu
- Direct URL: `http://localhost:3001/all-institutions`

---

## Database Seeding Strategy

### Immediate (This Week):
1. ✅ CAO Universities & Partner Colleges (already extracted from PDF)
2. ⏳ Add top 10 TVET Colleges (False Bay, Cape Town, Ekurhuleni West, etc.)

### Next Week:
3. Add remaining 40+ TVET Colleges
4. Add 10-15 popular private colleges (Damelin, Boston, etc.)

### Ongoing:
5. Verify accreditation status (CHE/DHET)
6. Update application URLs quarterly

---

## Key Differences by Institution Type

| Type | System | Application | Data Source |
|------|--------|-------------|-------------|
| **Public University** | CAO | via cao.ac.za | Official CAO Handbook |
| **CAO Partner College** | CAO | via cao.ac.za | CAO Handbook extraction |
| **TVET College** | Direct | Direct to college | DHET register + college websites |
| **Private College** | Direct | Direct to college | College websites + CHE register |

---

## Testing the Integration

### Test CAO Universities (already working):
```bash
# Search in All Institutions page
# Filter by: Public University
# Result: UKZN, DUT, MUT, UNIZULU
```

### Test CAO Partner Colleges:
```bash
# Search: "Eduvos" or "MANCOSA"
# Filter by: CAO Partner College
# Result: Shows college with "Apply via CAO" button
```

### Test TVET Colleges (after seeding):
```bash
# Search: "False Bay"
# Filter by: TVET College, Province: Western Cape
# Result: Shows False Bay with campuses and "Apply Now" to college
```

---

## Next Actions

1. **Run TVET seed script** with 10 major colleges
2. **Test `/all-institutions` page** in browser
3. **Verify search and filters** work correctly
4. **Check application links** redirect properly
5. **Add more colleges** over the coming weeks

---

## Important Notes

- **CAO Handbook** (green link in navbar) now shows ALL programmes from all types
- **All Institutions** (`/all-institutions`) is the central hub
- Individual **Universities** and **Colleges** pages still exist for deeper views
- **No design changes** — just data structure expansion
- **Backward compatible** — existing code still works

---

## Support

For questions about:
- **TVET Colleges data**: Check DHET website
- **CAO Handbook**: Reference PDF extraction at `cao_programmes.json`
- **College accreditation**: Visit CHE (Higher Education) register
- **Database schema**: See University.js and Course.js models

