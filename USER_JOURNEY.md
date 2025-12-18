# 🎯 CAO Application - User Journey Map

## Complete Feature Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎓 CAO ADMISSIONS PORTAL                      │
└─────────────────────────────────────────────────────────────────┘

                            START HERE
                                │
                    ┌───────────┴───────────┐
                    │                       │
              ┌─────▼──────┐         ┌──────▼─────┐
              │ No Account │         │   Have     │
              │  Yet?      │         │  Account?  │
              └─────┬──────┘         └──────┬─────┘
                    │                       │
          ┌─────────▼─────────┐    ┌────────▼────────┐
          │ Register Account  │    │ Login with      │
          │ • Email           │    │ • Email         │
          │ • Phone           │    │ • Password      │
          │ • ID Number       │    └────────┬────────┘
          │ • Password        │             │
          └─────────┬─────────┘             │
                    │                       │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼────────────┐
                    │   AUTHENTICATED USER   │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        │                       │                       │
    ┌───▼────────┐     ┌────────▼────────┐  ┌──────────▼──────┐
    │   BROWSE   │     │   GET SMART     │  │   TRACK YOUR    │
    │  COURSES   │     │ RECOMMENDATIONS │  │ APPLICATIONS    │
    └───┬────────┘     └────────┬────────┘  └──────────┬──────┘
        │                       │                       │
        │                       │              ┌────────▼────────┐
        │        ┌──────────────┼──────────┐   │ See Status of   │
        │        │              │          │   │ • Accepted ✓    │
        │        │              │          │   │ • Pending ⏳     │
        │        │              │          │   │ • Rejected ✗    │
        │        │              │          │   │                 │
        │    ┌───▼──────────────▼──────┐  │   │ For each:      │
        │    │  SELECT COURSES         │  │   │ • View details  │
        │    │  (Up to 10 max)         │  │   │ • Next steps    │
        │    │                         │  │   │ • Contact info  │
        │    │ Examples:               │  │   └────────┬────────┘
        │    │ • Course A @ Uni 1      │  │            │
        │    │ • Course B @ Uni 1      │  │            │
        │    │ • Course C @ Uni 2      │  │            │
        │    │ • ... up to 10          │  │      ┌─────▼────────┐
        │    │                         │  │      │   IF ANY    │
        │    │ Selected: 3/10          │  │      │  REJECTED   │
        │    └───┬──────────────────┬──┘  │      │             │
        │        │                  │     │      │ CLICK:      │
        │        │                  │     │      │ "GET SMART  │
        │        │                  │     │      │  RECS"      │
        │        │                  │     │      └─────┬────────┘
        │        │                  │     │            │
        │        │  ┌───────────────┼─────┘            │
        │        │  │               │                  │
        │        │  │     ┌─────────▼────────┐         │
        │        │  │     │   ENTER APS      │         │
        │        │  │     │   SCORES OR      │         │
        │        │  │     │   UPLOAD MATRIC  │         │
        │        │  │     │                  │         │
        │        │  │     │ • Total APS      │         │
        │        │  │     │ • Math APS       │         │
        │        │  │     │ • English APS    │         │
        │        │  │     │ • Province (opt) │         │
        │        │  │     └─────────┬────────┘         │
        │        │  │               │                  │
        │        │  │     ┌─────────▼────────────────┐ │
        │        │  │     │  GET RECOMMENDATIONS    │ │
        │        │  │     │                         │ │
        │        │  │     │ 🎯 Excellent Matches   │ │
        │        │  │     │    (You exceed 5+)     │ │
        │        │  │     │                         │ │
        │        │  │     │ ✓ Good Matches         │ │
        │        │  │     │    (You meet exactly)  │ │
        │        │  │     │                         │ │
        │        │  │     │ ⚠️ Borderline Options  │ │
        │        │  │     │    (0-3 below)         │ │
        │        │  │     │                         │ │
        │        │  │     │ For each course:        │ │
        │        │  │     │ • Gap analysis          │ │
        │        │  │     │ • Your score vs required│ │
        │        │  │     │ • Checkbox to select    │ │
        │        │  │     └─────────┬───────────────┘ │
        │        │  │               │                  │
        │        │  └───────────────┘                  │
        │        │                                     │
        │        └──────┬──────────┬────────┬──────────┘
        │               │          │        │
        │               │    ┌─────▼────────▼──┐
        │               │    │  APPLY BUTTON   │
        │               │    │                 │
        │               │    │ "APPLY NOW"  ▶  │
        │               │    │ (X/10 Selected) │
        │               │    └─────┬───────────┘
        │               │          │
        │               │    ┌─────▼──────────────┐
        │               │    │  SUBMIT ALL 10    │
        │               │    │  COURSES AT ONCE  │
        │               │    │                   │
        │               │    │ Confirm:          │
        │               │    │ ✓ Applying to:    │
        │               │    │   • Course A      │
        │               │    │   • Course B      │
        │               │    │   • Course C      │
        │               │    │   • ... (10 max)  │
        │               │    │                   │
        │               │    │ SUBMIT ▶          │
        │               │    └─────┬──────────────┘
        │               │          │
        │               └──────────┼──────────────┐
        │                          │              │
        │                   ┌──────▼──────┐       │
        │                   │ REDIRECT TO │       │
        │                   │ TRACK PAGE  │       │
        │                   │ WITH NEW    │       │
        │                   │ APPS SHOWN  │       │
        │                   └──────┬──────┘       │
        │                          │              │
        └──────────────────────────┼──────────────┘
                                   │
                        ┌──────────▼──────────┐
                        │   DASHBOARD VIEW   │
                        │                    │
                        │ Summary Stats:     │
                        │ • Total: 10        │
                        │ • Accepted: 2      │
                        │ • Pending: 5       │
                        │ • Rejected: 3      │
                        │                    │
                        │ Filter by Status   │
                        │ [All][✓][⏳][✗]    │
                        │                    │
                        │ Each Application:  │
                        │ • Course name      │
                        │ • University       │
                        │ • Status + reason  │
                        │ • Dates            │
                        │ • Next steps       │
                        │                    │
                        │ [Get More Recs] OR │
                        │ [Apply to More]    │
                        └────────────────────┘
```

---

## Feature Deep Dive: Selection System

```
BROWSE COURSES PAGE
├─ Search Bar (keyword search)
├─ Filters
│  ├─ Level: Diploma / Bachelor / Honors
│  └─ Mode: Full-time / Part-time / Distance
│
└─ Course Cards (2 column grid)
   ├─ For each course:
   │  ├─ Title, Code, University
   │  ├─ Level Badge | Duration Badge
   │  ├─ APS Requirements Box (blue)
   │  │  ├─ Min APS: 25-45 (usually)
   │  │  ├─ Math APS: 2-5
   │  │  └─ English APS: 2-5
   │  ├─ Entry Requirements
   │  │  ├─ Matric score needed
   │  │  ├─ Required subjects
   │  │  └─ Language proficiency
   │  ├─ Tuition Fee (R/year)
   │  └─ [CHECKBOX] ☐ Select Course
   │
   ├─ Selection Counter (sticky at top)
   │  ├─ Selected: 3/10 courses
   │  ├─ [Show Selected Only] Toggle
   │  └─ [APPLY NOW →] Button (green when items selected)
   │
   └─ When Clicked:
      └─ Navigate to Application Form
         └─ Submit all 10 to apply at once


SMART RECOMMENDATIONS PAGE
├─ Input Section
│  ├─ File Upload (Matric Results)
│  │  └─ Accepts: PDF, JPG, PNG
│  │     (AI would extract APS, currently shows placeholder)
│  │
│  └─ Manual Entry
│     ├─ Total APS Score: [____] / 100
│     ├─ Math APS: [__] / 7
│     ├─ English APS: [__] / 7
│     └─ Province (Optional): [Dropdown]
│
├─ Results Section (categorized)
│  │
│  ├─ 🎯 EXCELLENT MATCHES
│  │  └─ For each course:
│  │     ├─ ✓ Badge "ELIGIBLE"
│  │     ├─ Course: Name, Code, Level
│  │     ├─ University: Name
│  │     ├─ Your APS vs Required (comparison box)
│  │     │  ├─ Required: Min 25 | Math 2 | English 2
│  │     │  ├─ Your APS: 45 | 5 | 6
│  │     │  └─ Gap: ✓ 20 points ABOVE requirement
│  │     ├─ Duration & Fee
│  │     ├─ [☐] Checkbox
│  │     └─ [✓ SELECT COURSE] Button
│  │
│  ├─ ✓ GOOD MATCHES
│  │  └─ (Same structure as Excellent)
│  │
│  ├─ ⚠️ BORDERLINE OPTIONS
│  │  └─ (Same structure, yellow colors)
│  │
│  └─ Selection Counter
│     ├─ Selected: 5/10 from Recommendations
│     └─ [APPLY TO SELECTED RECS →] Button
│
└─ Actions
   ├─ [✏️ CHANGE SCORES] - Go back and edit
   └─ [🏠 BROWSE ALL COURSES] - See all options


TRACK STATUS PAGE
├─ Must be logged in
│
├─ Summary Cards (4 column grid)
│  ├─ Total Applications: 10
│  ├─ Accepted: 2 ✓ (green card)
│  ├─ Pending: 5 ⏳ (yellow card)
│  └─ Rejected: 3 ✗ (red card)
│
├─ Filter Buttons
│  ├─ [All (10)]
│  ├─ [✓ Accepted (2)]
│  ├─ [⏳ Pending (5)]
│  └─ [✗ Rejected (3)]
│
├─ Application Cards (status-colored)
│  ├─ For each application:
│  │  ├─ Status Icon & Badge
│  │  ├─ Course Name & Code
│  │  ├─ University Name
│  │  ├─ Applied Date
│  │  ├─ Response Date (if applicable)
│  │  ├─ Duration & Tuition Fee
│  │  ├─ Status Reason (explanation)
│  │  │
│  │  └─ Status-specific next steps:
│  │     ├─ ACCEPTED:
│  │     │  ├─ Confirm acceptance by deadline
│  │     │  ├─ Submit documents (ID, matric cert)
│  │     │  ├─ Complete online registration
│  │     │  └─ Pay registration fees
│  │     │
│  │     ├─ PENDING:
│  │     │  └─ Expected response in 2-3 weeks
│  │     │
│  │     └─ REJECTED:
│  │        ├─ Explore alternative courses
│  │        ├─ Contact university for feedback
│  │        └─ Reapply next year with better scores
│  │
│  └─ Quick Actions
│     ├─ If Rejected: [💡 GET SMART RECS] Button
│     │  └─ Takes to Recommendations page
│     │
│     └─ Always Available: [📚 APPLY TO MORE] Button
│        └─ Takes to Browse Courses
│
└─ Info Cards (blue/purple)
   ├─ [💡 GET SMART RECOMMENDATIONS]
   │  └─ "Some apps rejected. Get recommendations for better matches."
   │
   └─ [📚 APPLY TO MORE COURSES]
      └─ "You have 10 slots. You've used 10. Browse more to replace."
```

---

## APS Matching Algorithm

```
INPUT:
  userAPS = { total: 45, math: 5, english: 6 }
  course = { minimumAPS: 25, mathAPS: 2, englishAPS: 2 }

ELIGIBILITY CHECK:
  IF (userAPS.total >= course.minimumAPS)
     AND (userAPS.math >= course.mathAPS)
     AND (userAPS.english >= course.englishAPS)
  THEN -> ELIGIBLE

CATEGORIZATION:
  IF (userAPS.total >= course.minimumAPS + 5)
    → "EXCELLENT" (Green - safe choice)
  
  ELSE IF (userAPS.total >= course.minimumAPS)
    → "GOOD" (Blue - strong option)
  
  ELSE IF (userAPS.total >= course.minimumAPS - 3)
    → "BORDERLINE" (Yellow - challenging)
  
  ELSE
    → "NOT ELIGIBLE" (Red - can't apply)

GAP ANALYSIS:
  gap = userAPS.total - course.minimumAPS
  
  IF gap >= 5:      "✓ 20 points ABOVE requirement"
  IF gap >= 0:      "✓ Meets requirement exactly"
  IF gap > -3:      "⚠ 2 points BELOW requirement"
  IF gap <= -3:     "✗ 5 points BELOW requirement"
```

---

## Selection System Logic

```
STATE:
  selectedCourses = [101, 103, 105, 112, 115]  // IDs of selected courses
  MAX_SELECTION = 10

ACTION: User clicks checkbox on course ID 101
  IF 101 in selectedCourses:
    selectedCourses.remove(101)
  ELSE IF selectedCourses.length < 10:
    selectedCourses.add(101)
  ELSE:
    Alert: "Maximum 10 courses selected"

DISPLAY:
  Counter: "Selected: 5/10 courses"
  
  For each course:
    IF course.id in selectedCourses:
      Card Background: Green (#ecfdf5)
      Card Border: Green (#22c55e)
      Checkbox: ✓ Checked
      Button: Green "✓ Selected (5/10)"
    ELSE:
      Card Background: White
      Card Border: Gray
      Checkbox: ☐ Unchecked
      Button: Blue "Select Course"

SUBMIT ACTION: User clicks "Apply Now"
  IF selectedCourses.length == 0:
    Alert: "Please select at least one course"
  ELSE:
    localStorage['selectedCourses'] = JSON.stringify(selectedCourses)
    navigate('/application/multi')
    /* Pass 10 selected course objects to application form */
```

---

## Status Colors & Icons

```
✓ ACCEPTED
  Icon: FaCheckCircle
  Color: Green (#10b981)
  Badge: "Accepted ✓"
  Card BG: Light green (#ecfdf5)
  Border: Green

⏳ PENDING
  Icon: FaClock
  Color: Yellow (#eab308)
  Badge: "Pending"
  Card BG: Light yellow (#fefce8)
  Border: Yellow

✗ REJECTED
  Icon: FaTimesCircle
  Color: Red (#ef4444)
  Badge: "Rejected ✗"
  Card BG: Light red (#fee2e2)
  Border: Red
```

---

## User Decision Tree

```
START
  │
  ├─ "Do I know my APS scores?"
  │  ├─ YES → Go to Smart Recommendations
  │  │        Enter scores
  │  │        See matched courses
  │  │        Select from recommendations
  │  │
  │  └─ NO  → Go to Browse Courses
  │           Explore by university
  │           Filter by level/mode
  │           Check each course's requirements
  │
  ├─ "How many courses should I apply to?"
  │  ├─ 1 course → Just select and apply
  │  ├─ 2-5 courses → Select diverse options
  │  └─ 6-10 courses → Max selection, go broad
  │
  ├─ "I got rejected, what now?"
  │  ├─ Click "GET SMART RECS"
  │  ├─ Enter scores again
  │  ├─ See better-matched courses
  │  ├─ Apply to new set
  │  └─ Track new applications
  │
  └─ "How do I apply?"
     ├─ Select 1-10 courses
     ├─ Click "APPLY NOW"
     ├─ Complete application form (once)
     ├─ Submit all 10 courses
     └─ Monitor on Track Status page
```

---

## Performance Notes

✅ **Fast Loading**: No database calls, all mock data in memory
✅ **Smooth Filtering**: Real-time search/filter with no lag
✅ **Quick Selection**: Instant feedback on checkbox clicks
✅ **Smart Matching**: Instant categorization on score entry
✅ **Mobile Optimized**: Touch-friendly checkboxes and buttons
✅ **Responsive**: Works on all screen sizes

---

**This diagram shows the complete user journey through all 4 features!** 🎯
