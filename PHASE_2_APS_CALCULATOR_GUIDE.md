# APS Calculator - Phase 2 Implementation Guide

## Overview
The APS Calculator is your "killer app" that transforms passive course browsing into **personalized course matching**. When a student enters their Grade 12 results, they instantly see ONLY courses they qualify for.

## Why This Matters
- **Current state**: Browse Courses shows all 19 courses equally
- **With APS Calculator**: Browse Courses becomes a personalized "You Can Study This!" tool
- **Student value**: One input (their marks), instant clarity (their options)

---

## Phase 2A: Build APS Calculator Page

### Step 1: Create APSCalculator Component (Improved)

**Location**: `frontend/src/pages/APSCalculator.jsx`

**Features**:
```
INPUT SECTION:
├── Subject Selection (Dropdown)
│   └── Drop-down of all 12 possible Grade 12 subjects
├── Percentage Entry (For Each Subject)
│   └── Input field: 0-100%
├── Subject Level Selection
│   └── Radio buttons: Home Language / First Additional / Other
└── Calculate Button

CALCULATION SECTION:
├── Live APS Score Display (Large, Green)
├── Subject Breakdown Table
│   ├── Subject Name
│   ├── Percentage
│   ├── APS Points (0-7 scale)
│   └── Running Total
└── Qualification Summary
    ├── "You qualify for X courses"
    ├── Button: "See My Matching Courses →"
    └── Optional: Download APS Certificate

MATCHING SECTION:
├── "Courses You Qualify For" (from Browse Courses data)
├── Filtered by: minAPS <= userAPS
├── Sorted by: Closeness to requirement
└── Call-to-Action: "Apply to Course"
```

### Step 2: Create Backend APS Calculation Service

**Location**: `backend/src/services/apsCalculator.js`

**Purpose**: Centralized APS calculation logic (reusable across app)

```javascript
// Example structure
export const calculateAPS = (subjects) => {
  // Input: [{subject: "Mathematics", percentage: 75, level: "HL"}, ...]
  // Output: {totalAPS: 42, breakdown: {...}, qualifyingCourses: [...]}
}

export const getAPSPointsForPercentage = (percentage, subjectType) => {
  // Convert raw percentage to APS points (0-7)
  // Different scales for different subjects (e.g., Languages vs Math)
}

export const getQualifyingCourses = (userAPS, courseList) => {
  // Filter courses where userAPS >= course.minAPS
}
```

---

## Phase 2B: Data Collection Strategy (FREE)

### Option A: Manual Research (Highest Quality)
**Time: 4-5 hours, Yields: 50 additional courses**

1. Visit each university's official prospectus PDF:
   - `uct.ac.za/apply/` → Download prospectus
   - `wits.ac.za/apply/` → Download prospectus
   - (Same for WITS, UP, UJ, Stellenbosch)

2. Extract top 10 most popular courses per university:
   - Bachelor of Commerce
   - Bachelor of Science
   - Bachelor of Engineering
   - Bachelor of Laws
   - Bachelor of Medicine (if available)
   - + 5 others by faculty

3. Copy from PDF to your `southAfricanCourses.js` file

**Advantage**: 100% accurate APS scores, real requirements
**Disadvantage**: Time-consuming, manual updates needed

### Option B: Use Web Scraping (Medium Effort, Scalable)
**Time: 2-3 hours setup, Yields: 100+ courses ongoing**

Create simple Python scraper scripts:

```python
# scripts/scrape_universities.py
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def scrape_university_programmes(university_name, url, selectors):
    """
    Generic scraper for university programmes
    """
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        programmes = []
        
        # Find all programme containers
        for item in soup.select(selectors['programme_container']):
            programme = {
                'name': extract_text(item, selectors['name']),
                'code': extract_text(item, selectors['code']),
                'faculty': extract_text(item, selectors['faculty']),
                'aps': extract_aps(extract_text(item, selectors['requirements'])),
                'duration': extract_duration(extract_text(item, selectors['duration'])),
                'url': extract_url(item, selectors['url']),
                'scrapedAt': datetime.now().isoformat(),
                'university': university_name
            }
            programmes.append(programme)
        
        return programmes
    
    except Exception as e:
        print(f"Error scraping {university_name}: {e}")
        return []

def extract_aps(text):
    """Extract APS minimum requirement from text"""
    # Look for patterns like "APS 35", "Minimum APS: 40", etc.
    import re
    match = re.search(r'APS\s*:?\s*(\d+)', text, re.IGNORECASE)
    return int(match.group(1)) if match else None

# Configuration for each university
SCRAPE_CONFIG = {
    'UCT': {
        'url': 'https://www.students.uct.ac.za/apply/degree-programmes',
        'selectors': {
            'programme_container': '.programme-item',
            'name': 'h3.programme-name',
            'code': '.programme-code',
            'faculty': '.faculty-name',
            'requirements': '.requirements',
            'duration': '.duration',
            'url': 'a'
        }
    },
    'WITS': {
        'url': 'https://www.wits.ac.za/admissions/undergraduate-programmes/',
        'selectors': {
            'programme_container': '.programme-row',
            'name': '.programme-title',
            'code': '.programme-code',
            'faculty': '.faculty',
            'requirements': '.requirements-text',
            'duration': '.years',
            'url': 'a'
        }
    },
    # Add similar configs for UP, UJ, Stellenbosch
}

if __name__ == '__main__':
    all_programmes = {}
    
    for university, config in SCRAPE_CONFIG.items():
        print(f"Scraping {university}...")
        programmes = scrape_university_programmes(
            university,
            config['url'],
            config['selectors']
        )
        all_programmes[university] = programmes
        print(f"  Found {len(programmes)} programmes")
    
    # Save to JSON
    with open('scraped_programmes.json', 'w') as f:
        json.dump(all_programmes, f, indent=2)
    
    print("\nDone! Check scraped_programmes.json")
```

**Usage**:
```bash
# Install dependencies
pip install requests beautifulsoup4

# Run scraper
python scripts/scrape_universities.py

# Check output
cat scraped_programmes.json

# Convert and merge into your seed data
```

**Advantages**: 
- Automated, repeatable
- Can run weekly/monthly for updates
- Scales to many universities

**Disadvantages**: 
- Requires HTML inspection for each site
- Universities may change layouts
- Need to handle errors gracefully

### Option C: Community Contributions (Long-term)
**Time: 2 hours setup, Yields: Ongoing updates**

Add a "Report Error" feature to every course:

```jsx
// In CoursesPageV2.jsx - Add to course card
<button 
  onClick={() => setShowReportModal(true)}
  className="text-xs text-gray-500 hover:text-red-500"
  title="Help us verify this course's information"
>
  🚩 Report Issue
</button>

// Simple report form
const ReportModal = ({ course, onSubmit }) => (
  <form onSubmit={handleSubmit}>
    <textarea 
      placeholder="What's wrong with this course's information?"
      name="issue"
    />
    <select name="issueType">
      <option>Wrong APS requirement</option>
      <option>Missing career path</option>
      <option>Incorrect fees</option>
      <option>Outdated information</option>
    </select>
    <input type="email" placeholder="Your email (optional)" />
    <button>Submit Report</button>
  </form>
)
```

---

## Phase 2C: Recommended Data Growth Timeline

### Week 1-2: Manual Curation (50 courses)
- Manually research top 50 courses from all 5 universities
- Focus on most popular programs (Commerce, Science, Engineering)
- Update your `southAfricanCourses.js`

### Week 3-4: Build APS Calculator
- Create calculator component
- Connect to course filtering
- Test with your 69 courses (19 + 50)

### Week 5+: Automated Scraping
- Set up Python scrapers for each university
- Run monthly to find new/updated courses
- Let community reports fill gaps

### Expected Timeline:
- **Week 1**: 19 courses (current)
- **Week 2**: 69 courses (manual + current)
- **Month 2**: 150-200 courses (with scraping + community)
- **Month 3**: 300+ courses (with contributions)

---

## Phase 2D: Data Quality Assurance

### Track Data Source for Each Course

Update your course schema:

```javascript
// In southAfricanCourses.js
const COURSE_TEMPLATE = {
  id: "uct-bcom",
  name: "Bachelor of Commerce",
  // ... existing fields
  
  // NEW: Data quality tracking
  dataSource: {
    origin: "manual-research", // "manual-research" | "scraped" | "user-reported"
    lastVerified: "2025-01-08",
    verifiedBy: "admin", // "admin" | "user"
    confidence: 5, // 1-5 scale (5 = official source)
    notes: "Confirmed from UCT 2025 prospectus PDF"
  }
};
```

### Admin Dashboard Feature
Create simple admin panel to review:
- Which courses need re-verification
- Which user reports are pending
- Data quality metrics

---

## Phase 2E: Legal Considerations

### Web Scraping Ethics
- ✅ DO: Scrape course listings, APS requirements (factual data)
- ❌ DON'T: Scrape personal data, student reviews, copyrighted content
- Always add: `robots.txt` check, rate limiting, clear attribution

### Add Disclaimer
```jsx
<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
  <p className="font-bold">Data Accuracy Note</p>
  <p>Course information is compiled from official university sources, 
  community reports, and web research. Always verify current requirements 
  directly with universities before applying.</p>
</div>
```

---

## Recommended Implementation Order

```
PRIORITY 1 (This Week):
├── Improve APSCalculator.jsx with better UI
├── Add subject percentage inputs
├── Calculate live APS score
└── Show matching courses

PRIORITY 2 (Next Week):
├── Manually add 30-50 more courses
├── Create simple admin panel
└── Add "Report Issue" feature

PRIORITY 3 (Following Week):
├── Create Python scraping scripts
├── Set up automated data updates
└── Build data quality dashboard

PRIORITY 4 (Ongoing):
├── Monitor community reports
├── Update data monthly
└── Add features based on user feedback
```

---

## Expected User Journey After Implementation

```
Student visits your app
    ↓
"Let me calculate my APS" → APSCalculator page
    ↓
Enters 12 subjects + percentages
    ↓
Sees: "Your APS: 42" + "You qualify for 47 courses"
    ↓
Clicks: "See My Matching Courses"
    ↓
Sees filtered Browse Courses (only courses they qualify for)
    ↓
Sorts by: University, Faculty, Duration
    ↓
Clicks: "Apply to Course" → University's official application
    ↓
✅ Student applies to real courses!
```

---

## Why This Path Wins

✅ **No expensive APIs needed** - Free manual research + scraping
✅ **Immediate value** - Students get personalized results TODAY
✅ **Scalable data** - Grows organically with community
✅ **Clear business model** - Universities pay for qualified applicants
✅ **Proven concept** - MyGrades.co.za, EduConnect use this exact model
✅ **Defensible moat** - Your APS calculation + course matching is hard to replicate

---

## Resources You'll Need

```bash
# Python scraping (if you go that route)
pip install requests beautifulsoup4 lxml

# Frontend - you already have React + Axios

# No expensive APIs needed:
❌ Not needed: RapidAPI keys
❌ Not needed: University APIs (they don't exist)
✅ Needed: Manual research + scraping + user feedback
```

---

## Questions to Answer Now

1. **Do you prefer manual or automated data collection?**
   - Manual = slower but higher quality (start here)
   - Automated = faster but needs setup (add later)

2. **What's your target launch for APS Calculator?**
   - Next week? → Focus on manual data collection
   - Next month? → Build scraping infrastructure

3. **Do you want to eventually partner with universities?**
   - If yes → Focus on data quality (they'll trust you more)
   - If no → Focus on community (Wikipedia model)

---

## Next Immediate Action

**RECOMMENDATION**: Start building APS Calculator THIS WEEK with your current 19 courses. Don't wait for more data. As soon as it works, manually add 30 more courses in parallel.

The calculator + 50 courses will be MUCH more impressive than 200 courses with no calculator.

Ready to build? Let me know! 🚀
