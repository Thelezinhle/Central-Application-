# 🎨 Visual Feature Guide - Icons & Examples

## Browse Courses Page Layout

```
┌─────────────────────────────────────────────────────┐
│  🎓 Browse Courses                                  │
│  View all available courses with entry requirements │
│                                                     │
│  Search: [Search courses....... 🔍]                │
│  Level: [All Levels ▼] Study Mode: [All Modes ▼]  │
│  
│  ┌───────────────────────────────────────────────┐
│  │ Selected: 3/10 courses      [Show Selected]  │
│  │ [Apply Now →]                                  │
│  └───────────────────────────────────────────────┘
│
│  COURSE GRID (2 columns):
│
│  ┌──────────────────────┐  ┌──────────────────────┐
│  │ Computer Science     │  │ Business Admin ✓     │
│  │ CS101                │  │ BA202         (GREEN) │
│  │ UCT                  │  │ Wits              ☑   │
│  │ 4 years | R45k/yr    │  │ 3 years | R38k/yr    │
│  │                      │  │                      │
│  │ 📊 APS Required:     │  │ 📊 APS Required:     │
│  │ Min: 30              │  │ Min: 25              │
│  │ Math: 3, Eng: 2      │  │ Math: 2, Eng: 2      │
│  │                      │  │                      │
│  │ [Select Course]      │  │ [✓ Selected (3/10)]  │
│  └──────────────────────┘  └──────────────────────┘
│
│  [Similar cards for more courses...]
│
└─────────────────────────────────────────────────────┘
```

---

## Smart Recommendations Page Flow

```
SCREEN 1: INPUT FORM
┌──────────────────────────────────┐
│ 🤖 Smart Recommendations        │
│ Get AI-powered recommendations  │
│                                 │
│ 📄 Upload Matric Results        │
│ [Choose file...] (PDF/JPG)      │
│                                 │
│        OR                        │
│                                 │
│ Total APS Score:                │
│ [45        ] / 100              │
│                                 │
│ Mathematics APS:                │
│ [5         ] / 7                │
│                                 │
│ English APS:                    │
│ [6         ] / 7                │
│                                 │
│ Province: [All Provinces ▼]     │
│                                 │
│ [Get Smart Recommendations]     │
└──────────────────────────────────┘

SCREEN 2: RESULTS
┌──────────────────────────────────┐
│ Your APS: 45 | Math 5 | Eng 6   │
│ [✏️ Change Scores]               │
│                                 │
│ Selected: 5/10                  │
│ [APPLY TO SELECTED RECS →]      │
│                                 │
│ 🎯 EXCELLENT MATCHES (3)        │
│ ┌─────────────────────────────┐ │
│ │ ✓ ELIGIBLE                  │ │
│ │ Computer Science            │ │
│ │ Code: CS101 | Level: Bach   │ │
│ │ UCT | 4 years, R45k/year   │ │
│ │                             │ │
│ │ Req: Min 25 | M:3 | E:2    │ │
│ │ You: 45 | M:5 | E:6        │ │
│ │ Gap: ✓ 20 points ABOVE ✓   │ │
│ │                             │ │
│ │ [☑ SELECT] [✓ Selected]   │ │
│ └─────────────────────────────┘ │
│ [More excellent matches...]     │
│                                 │
│ ✓ GOOD MATCHES (5)              │
│ [Similar cards...]              │
│                                 │
│ ⚠️ BORDERLINE (2)               │
│ [Similar cards...]              │
│                                 │
└──────────────────────────────────┘
```

---

## Track Status Dashboard

```
┌──────────────────────────────────────────────────┐
│ 📊 Track Application Status                      │
│ Monitor your applications in real-time           │
│                                                  │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│ │ TOTAL  │ │ ACCEPT │ │ PENDING│ │REJECT  │    │
│ │   10   │ │   2    │ │   5    │ │   3    │    │
│ │        │ │   ✓    │ │   ⏳    │ │   ✗    │    │
│ │ (blue) │ │(green) │ │(yellow)│ │(red)   │    │
│ └────────┘ └────────┘ └────────┘ └────────┘    │
│                                                  │
│ FILTERS:                                         │
│ [All (10)] [✓ Accept(2)] [⏳ Pend(5)] [✗ Rej(3)]│
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ ✓ ACCEPTED                                   │ │
│ │ Computer Science                             │ │
│ │ University of Cape Town                      │ │
│ │                                              │ │
│ │ Code: CS101 | Level: Bachelor                │ │
│ │ Duration: 4 years | Fee: R45,000/year       │ │
│ │                                              │ │
│ │ Applied: 1 Dec 2025                          │ │
│ │ Response: 10 Dec 2025                        │ │
│ │                                              │ │
│ │ Status: Congratulations! Accepted ✓         │ │
│ │                                              │ │
│ │ NEXT STEPS:                                  │ │
│ │ 1. Confirm your acceptance by 31 Dec 2025  │ │
│ │ 2. Submit documents (ID + Matric cert)      │ │
│ │ 3. Complete online registration             │ │
│ │ 4. Pay registration fees                    │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ ⏳ PENDING                                    │ │
│ │ Business Administration                       │ │
│ │ Wits                                         │ │
│ │                                              │ │
│ │ Code: BA202 | Level: Bachelor                │ │
│ │ Duration: 3 years | Fee: R38,000/year       │ │
│ │                                              │ │
│ │ Applied: 5 Dec 2025                          │ │
│ │ Response: [Waiting...]                       │ │
│ │                                              │ │
│ │ Status: Under review                         │ │
│ │ Expected response: 2-3 weeks                 │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ ✗ REJECTED                                   │ │
│ │ Engineering (5-year)                         │ │
│ │ Stellenbosch                                 │ │
│ │                                              │ │
│ │ Code: ENG501 | Level: Bachelor               │ │
│ │ Duration: 5 years | Fee: R52,000/year       │ │
│ │                                              │ │
│ │ Applied: 2 Dec 2025                          │ │
│ │ Response: 8 Dec 2025                         │ │
│ │                                              │ │
│ │ Status: Application not successful ✗        │ │
│ │ Your APS (45) was below minimum (50)         │ │
│ │                                              │ │
│ │ WHAT TO DO:                                  │ │
│ │ - Explore alternative engineering programs  │ │
│ │ - Contact university for feedback            │ │
│ │ - Get smart recommendations for better match│ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ 💡 GET SMART RECOMMENDATIONS                 │ │
│ │ Some applications weren't successful.        │ │
│ │ Get AI recommendations for better-matched    │ │
│ │ courses based on your APS scores.            │ │
│ │ [GET RECOMMENDATIONS →]                      │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📚 APPLY TO MORE COURSES                     │ │
│ │ You can apply to up to 10 courses per batch. │ │
│ │ You've used 10. Apply to a new set.         │ │
│ │ [BROWSE MORE COURSES →]                      │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Selection System Visual

```
COURSE NOT SELECTED              COURSE SELECTED
┌──────────────────────┐        ┌──────────────────────┐
│                      │        │  (Green background)  │
│ Course Name          │ ☐      │ Course Name          │ ☑
│ Course Code          │        │ Course Code          │
│ University           │        │ University (Green)   │
│                      │        │                      │
│ Details...           │        │ Details...           │
│                      │        │                      │
│ [Select Course]      │        │ [✓ Selected (3/10)]  │
│                      │        │                      │
└──────────────────────┘        └──────────────────────┘

Button States:
DEFAULT               HOVER                 SELECTED
┌────────────────┐  ┌────────────────┐   ┌──────────────────┐
│ Select Course  │  │ Select Course  │   │ ✓ Selected (3/10)│
│ (Blue)         │  │ (Dark Blue)    │   │ (Green)          │
└────────────────┘  └────────────────┘   └──────────────────┘

Selection Counter:
NO SELECTION:              WITH SELECTION:
(Hidden or grayed out)     ┌──────────────────────────┐
                           │ Selected: 3/10 courses   │
                           │ [Show Selected Only] ☑   │
                           │ [Apply Now →] (Green)    │
                           └──────────────────────────┘
```

---

## APS Matching Visualization

```
STUDENT'S APS:
┌─────────────────────────────────────────┐
│ Total APS: 45                           │
│ Math APS: 5                             │
│ English APS: 6                          │
│                                         │
│ Combined Score Diagram:                 │
│ [████████████████████████ 45/100] 45%   │
│                                         │
│ Component Breakdown:                    │
│ Math:    [█████████████ 5/7]      71%   │
│ English: [████████████████ 6/7]   86%   │
└─────────────────────────────────────────┘

COURSE REQUIREMENTS COMPARISON:
┌──────────────────────────────────────────────┐
│ Course A: Computer Science                   │
│                                              │
│ Requirement vs Your Score:                   │
│                                              │
│ Total APS:                                   │
│ Required: [████████ 30]     You: [████████████░ 45]
│ Status:   ✓ 15 points ABOVE MINIMUM ✓       │
│                                              │
│ Math APS:                                    │
│ Required: [███ 3]           You: [██████ 5]  │
│ Status:   ✓ EXCEEDS ✓                       │
│                                              │
│ English APS:                                 │
│ Required: [███ 2]           You: [██████ 6]  │
│ Status:   ✓ EXCEEDS ✓                       │
│                                              │
│ CATEGORIZATION: 🎯 EXCELLENT MATCH ✓       │
└──────────────────────────────────────────────┘

COURSE B: Engineering (Advanced)
┌──────────────────────────────────────────────┐
│ Requirement vs Your Score:                   │
│                                              │
│ Total APS:                                   │
│ Required: [████████████████ 50]   You: [████░ 45]
│ Status:   ⚠ 5 points BELOW MINIMUM ⚠        │
│                                              │
│ Math APS:                                    │
│ Required: [████████ 5]       You: [█████░ 5] │
│ Status:   ✓ MEETS MINIMUM ✓                 │
│                                              │
│ English APS:                                 │
│ Required: [███ 3]            You: [██████ 6] │
│ Status:   ✓ EXCEEDS ✓                       │
│                                              │
│ CATEGORIZATION: ⚠️ BORDERLINE (High Risk)  │
└──────────────────────────────────────────────┘

COURSE C: Law
┌──────────────────────────────────────────────┐
│ Requirement vs Your Score:                   │
│                                              │
│ Total APS:                                   │
│ Required: [████████████████ 55]   You: [████░ 45]
│ Status:   ✗ 10 points BELOW MINIMUM ✗       │
│                                              │
│ Math APS:                                    │
│ Required: [████ 4]           You: [█████░ 5] │
│ Status:   ✓ MEETS MINIMUM ✓                 │
│                                              │
│ English APS:                                 │
│ Required: [█████ 5]          You: [██████ 6] │
│ Status:   ✓ MEETS MINIMUM ✓                 │
│                                              │
│ CATEGORIZATION: ✗ NOT ELIGIBLE (Don't Apply)│
└──────────────────────────────────────────────┘
```

---

## Status Colors & Icons

```
✓ ACCEPTED (Green)
┌─────────────────────────────┐
│ ✓ ACCEPTED                  │
│ ═════════════════════════   │
│ Status: Successfully accepted│
│ Your application meets all  │
│ requirements. Next steps... │
│ Background: #ecfdf5 (light) │
│ Border: #22c55e (green)     │
│ Icon: ✓ Checkmark           │
└─────────────────────────────┘

⏳ PENDING (Yellow)
┌─────────────────────────────┐
│ ⏳ PENDING                    │
│ ═════════════════════════   │
│ Status: Under review         │
│ Your application is being    │
│ evaluated. Wait 2-3 weeks... │
│ Background: #fefce8 (light) │
│ Border: #eab308 (yellow)    │
│ Icon: ⏳ Clock               │
└─────────────────────────────┘

✗ REJECTED (Red)
┌─────────────────────────────┐
│ ✗ REJECTED                  │
│ ═════════════════════════   │
│ Status: Not accepted         │
│ Unfortunately, your          │
│ application did not qualify. │
│ Background: #fee2e2 (light) │
│ Border: #ef4444 (red)       │
│ Icon: ✗ X mark              │
└─────────────────────────────┘
```

---

## Complete User Journey Timeline

```
DAY 1: DISCOVERY
┌──────────────────────────────────────┐
│ User visits CAO portal               │
│ Sees feature overview                │
│ No login needed yet                  │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Choice 1: Browse Courses             │
│ OR Choice 2: Get Recommendations     │
└──────────────────────────────────────┘
          ↓
DAY 2-3: SELECTION
┌──────────────────────────────────────┐
│ Selects 1-10 courses                 │
│ Sees selections highlighted          │
│ Counter shows: X/10                  │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Reviews selected courses             │
│ Checks all APS requirements          │
│ Confirms diverse portfolio           │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Registers account (if new)           │
│ Email + Password setup               │
└──────────────────────────────────────┘
          ↓
DAY 4: APPLICATION
┌──────────────────────────────────────┐
│ Clicks "Apply Now"                   │
│ Goes to application form              │
│ All 10 courses pre-filled            │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Completes application form           │
│ • Personal info                       │
│ • Qualifications                      │
│ • Essay/motivation                    │
│ • Documents (if needed)               │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Reviews application                  │
│ Confirms all 10 courses              │
│ Submits                              │
└──────────────────────────────────────┘
          ↓
DAY 5-21: WAITING
┌──────────────────────────────────────┐
│ Goes to Track Status page            │
│ Sees applications as "Pending"       │
│ Checks daily for updates             │
│ Expected: 2-3 weeks response time    │
└──────────────────────────────────────┘
          ↓
DAY 22: DECISIONS ARRIVE
┌──────────────────────────────────────┐
│ Refreshes Track Status               │
│ Sees decisions:                      │
│ • 2 Accepted ✓                       │
│ • 5 Pending ⏳                        │
│ • 3 Rejected ✗                       │
└──────────────────────────────────────┘
          ↓
DAY 23: ACTION REQUIRED
┌──────────────────────────────────────┐
│ For Accepted applications:           │
│ • Confirm acceptance                 │
│ • Submit documents                   │
│ • Complete registration              │
│ • Pay fees                           │
│                                      │
│ For Pending applications:            │
│ • Check back later                   │
│ • No action yet                      │
│                                      │
│ For Rejected applications:           │
│ • Click "Get Smart Recommendations" │
│ • System recommends better courses  │
│ • Select and apply to new batch     │
│ • Restart application cycle         │
└──────────────────────────────────────┘
```

---

## Mobile Experience

```
SMALL SCREEN (375px width):

┌─────────────────────────┐
│ 🎓 Browse Courses       │
├─────────────────────────┤
│ Search: [....search...] │
│ Level: [Filter ▼]       │
│ Mode: [Filter ▼]        │
│                         │
│ Selected: 3/10          │
│ [Show Selected Only]    │
│ [Apply Now →]          │
│                         │
│ ┌───────────────────┐   │
│ │ CS101             │ ☐ │
│ │ Computer Science  │   │
│ │ UCT, 4 yrs        │   │
│ │ R45k/year         │   │
│ │                   │   │
│ │ Min APS: 30       │   │
│ │ Math:3 Eng:2      │   │
│ │                   │   │
│ │ [Select Course]   │   │
│ └───────────────────┘   │
│                         │
│ [More courses...]       │
│                         │
└─────────────────────────┘

All elements:
✓ Stack vertically
✓ Full width
✓ Touch-friendly buttons
✓ Large readable text
✓ Clear visual hierarchy
```

---

## Key Takeaways - Visual Summary

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  BROWSE        RECOMMEND        SELECT        TRACK│
│     📚            🤖              🔀            📊 │
│                                                     │
│  View all      Get smart      Apply to         Monitor
│  courses       matches        10 at once       status
│                                                     │
│  Search       Enter APS      Checkboxes       Filters
│  Filter       Get instant     Counter          Cards
│  Details      results         One form        Next steps
│                                                     │
│  1000+        Excellent       Save time        Accept ✓
│  courses      Good            Batch apply      Pending ⏳
│  Data         Borderline      Data saved       Reject ✗
│                                                     │
│         All Working Together! 🚀                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**All 4 features fully implemented, integrated, and production-ready!** ✅
