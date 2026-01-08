# 🎓 Browse Courses - Quick Start Guide

## What's New?

Your Central Application system now has a fully functional **Browse Courses** feature! Users can explore, filter, and apply to 25 courses from South Africa's top universities.

## 🚀 Getting Started

### 1. Start the Servers
```bash
# Terminal 1: Start Backend (port 5000)
cd backend
npm run dev

# Terminal 2: Start Frontend (port 3001)  
cd frontend
npm run dev
```

### 2. Access the Feature
- Navigate to **http://localhost:3001/courses**
- Or click "Browse Courses" in the navbar

## 📚 What You Can Do

### Browse All Courses
- View 25 courses from 5 universities
- See course details at a glance:
  - Faculty/Department
  - Duration (3-6 years)
  - Minimum APS score
  - Estimated annual fees
  - Course description

### Filter Courses
Use the filter panel to narrow down courses:
- **Search** - Find courses by name, code, or career path
- **University** - Choose specific university (UCT, WITS, UP, UJ, Stellenbosch)
- **Faculty** - Filter by field (Commerce, Law, Science, Engineering, etc.)
- **Min/Max APS** - Set APS score range
- **Duration** - Filter by years (3, 4, or 6 years)
- **Sort** - Reorder by Name, APS Score, or Duration
- **Clear Filters** - Reset all filters

### View Course Details
1. Click "Details" button on any course card
2. See:
   - Entry requirements
   - Career paths for graduates
   - Application deadline
3. Click "Details" again to collapse

### Select Courses
1. Click "Select" button to add courses (up to 10)
2. Selected courses appear in the blue summary box
3. See count: "X of 10 courses selected"
4. Click "Apply to X Courses" to proceed

### Apply to Courses
**Two ways to apply:**
- Click "Apply" on individual course card → Single application
- Select multiple courses → Click "Apply to X Courses" → Batch application

> **Note:** You must be logged in to apply for courses

## 🏫 Universities & Courses

### Courses by University

**University of Cape Town (UCT)**
- Bachelor of Commerce
- Bachelor of Laws (LLB)
- Bachelor of Science in Computer Science
- Bachelor of Science in Engineering
- Bachelor of Science in Medicine (MBChB)

**University of Witwatersrand (WITS)**
- Bachelor of Commerce
- Bachelor of Pharmacy
- Bachelor of Science in Engineering
- Bachelor of Science in Medicine (MBChB)

**University of Pretoria (UP)**
- Bachelor of Commerce
- Bachelor of Laws (LLB)
- Bachelor of Science in Computer Science
- Bachelor of Science in Engineering

**University of Johannesburg (UJ)**
- Bachelor of Commerce
- Bachelor of Science in Engineering
- Bachelor of Technology in Information Technology

**Stellenbosch University (SU)**
- Bachelor of Commerce
- Bachelor of Science in Agriculture
- Bachelor of Science in Engineering

## 📊 Example Filtering Scenarios

### Scenario 1: Find Law Courses
1. Click "Faculty" dropdown
2. Select "Law"
3. See 2 law courses (UCT LLB, UP LLB)
4. Click Details to see requirements

### Scenario 2: Find Affordable 3-Year Degrees
1. Set "Min/Max APS": 30-40
2. Set "Duration": 3 years
3. See courses like Commerce and Computer Science
4. Check estimated fees

### Scenario 3: Find Engineering Courses
1. Search: "Engineering" in search box
2. Or filter by Faculty: "Engineering"
3. See 5 engineering programs
4. Sort by APS Score to see easiest entry

### Scenario 4: Apply to Multiple Commerce Courses
1. Search: "Commerce"
2. See 5 commerce courses from different universities
3. Select all 5 using checkboxes
4. Click "Apply to 5 Courses"
5. Proceed through application flow

## 🔍 Smart Features

### Real-Time Filtering
- Results update instantly as you adjust filters
- No page reload needed
- Count updates automatically

### Responsive Design
- **Mobile** (1 column) - Perfect for phones
- **Tablet** (2 columns) - Great for iPads
- **Desktop** (3 columns) - Best for computers

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- ARIA labels on all inputs
- Voice command compatible

### Empty State Handling
- If no courses match filters
- Shows helpful message
- Suggests trying different criteria

## 💡 Tips & Tricks

**1. Use Voice Commands**
- Press Ctrl+K to activate voice system
- Say "Show courses" or "Browse courses"
- Say filter names like "Filter by faculty"

**2. Clear Filters Quickly**
- Click "Clear Filters" button to reset everything
- Start fresh search

**3. Compare Courses**
- Select multiple similar courses
- View details for each
- Notice differences in fees, APS scores, deadlines

**4. Save Progress**
- Selected courses are stored in browser
- Won't lose selection if you navigate away
- Can come back and apply later

**5. Mobile Friendly**
- Works great on phones
- Touch-friendly buttons
- Swipe to scroll course list

## 📱 Testing Checklist

- [ ] Load /courses page
- [ ] See 25 courses displayed
- [ ] Search for "Finance" - see finance courses
- [ ] Filter by university - see only that university's courses
- [ ] Filter by faculty - see only that faculty's courses
- [ ] Adjust APS score range - see results update
- [ ] Change sort order - see courses reorder
- [ ] Click Details on a course - see full information
- [ ] Select a course - see checkbox mark and count increase
- [ ] Click Apply on selected courses - redirect to application
- [ ] Clear filters - see all 25 courses again

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| No courses showing | Refresh page, check backend running on 5000 |
| Filters not working | Check network tab, verify query parameters |
| Styling looks broken | Clear browser cache, restart Vite |
| Apply button disabled | Make sure you're logged in first |
| Details not expanding | Click Details button again, check browser console |

## 📞 Support

**Questions or Issues?**
- Check browser console for errors (F12)
- Verify both servers are running
- Test API directly: http://localhost:5000/api/browse-courses

## 🎯 What's Next?

**Phase 2 Improvements Coming Soon:**
- ✨ More universities and courses
- 🎓 Course ratings and reviews
- 💾 Favorite courses (save for later)
- 📊 Course comparison tool
- 🔗 University website links

## 📖 Full Documentation

See [BROWSE_COURSES_IMPLEMENTATION.md](./BROWSE_COURSES_IMPLEMENTATION.md) for:
- Complete API endpoints
- Technical architecture
- Data structure details
- Advanced customization

---

**Happy course browsing! 🎓**

For more information about the CAO system, see [START_HERE.md](./START_HERE.md)
