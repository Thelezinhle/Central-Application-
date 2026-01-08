# 🎓 CAO Voice Assistant - University Operations Guide

## Overview
Control all university-related operations using voice commands. Apply to universities, get information, compare, and manage universities entirely by voice.

---

## 🏫 University Commands

### View All Universities
**Get a complete list of all available universities**

```
✓ "show all universities"
✓ "list universities"
```

**Example:**
```
User: "show all universities"
Assistant: "Here are all universities: Trinity College Dublin, University College Dublin, University College Cork, ..."
```

---

### Apply to a University
**Submit an application to a specific university**

```
✓ "apply to [university name]"
✓ "apply to [university name] university"
```

**Examples:**
```
User: "apply to Trinity"
Assistant: "Applying to Trinity College Dublin. Opening application form."

User: "apply to University College Dublin"
Assistant: "Applying to University College Dublin. Opening application form."

User: "apply to Cork university"
Assistant: "Applying to University College Cork. Opening application form."
```

**What happens:**
1. The system finds the university in the database
2. Opens the application form with the university pre-selected
3. You can then fill in other details by voice

---

### Get University Information
**Learn about a specific university**

```
✓ "tell me about [university]"
✓ "tell me about [university] university"
```

**Examples:**
```
User: "tell me about Trinity"
Assistant: "Trinity College Dublin. Location details: Dublin. Email: info@tcd.ie. Phone: 0896 1000."

User: "tell me about UCD"
Assistant: "University College Dublin. Located in Dublin. Email: admissions@ucd.ie. Website: www.ucd.ie."
```

**Information provided:**
- University name
- Description
- Location/City
- Email address
- Phone number
- Website (if available)

---

### Show Detailed University Information
**Get comprehensive details about a university**

```
✓ "show university details for [university]"
```

**Examples:**
```
User: "show university details for Trinity"
Assistant: "Trinity College Dublin. Country: Ireland. City: Dublin. Website: www.tcd.ie. Contact: admissions@tcd.ie. About: Ireland's leading research university..."
```

**Details included:**
- Full name
- Country
- City/Location
- Website
- Contact email
- Description/About
- Full contact information

---

### Find Universities by Location
**Search for universities in a specific city or country**

```
✓ "universities in [location]"
✓ "show universities in [location]"
```

**Examples:**
```
User: "universities in Dublin"
Assistant: "Universities in Dublin: Trinity College Dublin, University College Dublin, Technological University Dublin, ..."

User: "universities in Limerick"
Assistant: "Universities in Limerick: University of Limerick, Limerick Institute of Technology, ..."

User: "universities in Ireland"
Assistant: "Universities in Ireland: Trinity College Dublin, University College Dublin, University College Cork, ..."
```

---

### Compare Universities
**Compare two universities side by side**

```
✓ "compare [university 1] and [university 2]"
✓ "compare [university 1] with [university 2]"
```

**Examples:**
```
User: "compare Trinity and UCD"
Assistant: "Comparing Trinity College Dublin and University College Dublin. Trinity is in Ireland. UCD is in Ireland. Trinity city: Dublin. UCD city: Dublin."

User: "compare Cork and Galway"
Assistant: "Comparing University College Cork and NUI Galway. Cork is in Ireland. Galway is in Ireland. Cork city: Cork. Galway city: Galway."
```

**Comparison includes:**
- University names
- Countries
- Cities/Locations
- Contact information
- Key differences

---

## 📋 Application Workflow by Voice

### Complete Application Process

**Step 1: Find and apply to university**
```
User: "show all universities"
Assistant: [Lists all universities]

User: "tell me about Trinity"
Assistant: [Provides Trinity details]

User: "apply to Trinity"
Assistant: "Applying to Trinity. Opening application form."
```

**Step 2: Fill application form**
```
User: "fill firstName with John"
Assistant: "Filled firstName with John"

User: "fill lastName with Doe"
Assistant: "Filled lastName with Doe"

User: "fill email with john@example.com"
Assistant: "Filled email with john@example.com"

User: "fill phoneNumber with 0891234567"
Assistant: "Filled phoneNumber with 0891234567"
```

**Step 3: Submit application**
```
User: "click submit"
Assistant: "Clicked on submit"

User: "submit form"
Assistant: "Submitting form"
```

---

## 🔍 University Search & Filter Examples

### Search Multiple Universities and Apply

```
User: "show all universities"
Assistant: [Lists 30+ universities]

User: "universities in Dublin"
Assistant: "Universities in Dublin: Trinity, UCD, TUD, ..."

User: "tell me about Trinity"
Assistant: "Trinity College Dublin details..."

User: "apply to Trinity"
Assistant: "Opening Trinity application form"

User: "scroll down" (to see more of form)
Assistant: "Scrolling down"

User: "fill programChoice with Computer Science"
Assistant: "Filled programChoice with Computer Science"

User: "click submit"
Assistant: "Submitting application"
```

### Compare Multiple Universities

```
User: "compare Trinity and UCD"
Assistant: "Comparing Trinity and UCD..."

User: "compare UCD and Cork"
Assistant: "Comparing UCD and Cork..."

User: "compare Galway and Limerick"
Assistant: "Comparing Galway and Limerick..."
```

---

## 👨‍💼 Admin: Manage Universities

### Add a New University
**Only admin users can add universities**

```
✓ "add university [university name]"
```

**Example:**
```
User: "add university New Dublin College"
Assistant: "Added New Dublin College successfully."
```

### Update University Information
**Only admin users can update university details**

```
✓ "update university [name] with [information]"
```

**Example:**
```
User: "update university Trinity with description leading research institution"
Assistant: "Updated Trinity successfully."
```

---

## 🎯 Complete Use Cases

### Scenario 1: First-Time Student Finding Universities

```
1. User: "show all universities"
   → See all available universities

2. User: "universities in Dublin"
   → Find Dublin universities

3. User: "tell me about Trinity"
   → Get Trinity information

4. User: "tell me about UCD"
   → Get UCD information

5. User: "compare Trinity and UCD"
   → Compare the two

6. User: "apply to Trinity"
   → Open Trinity application

7. User: "fill email with student@example.com"
   → Fill your email

8. User: "submit form"
   → Submit application
```

### Scenario 2: Comparing Multiple Universities

```
1. User: "universities in Cork"
   → See Cork universities

2. User: "compare Trinity and Cork"
   → See differences

3. User: "compare UCD and Galway"
   → See other comparisons

4. User: "show university details for Cork"
   → Get full details

5. User: "apply to Cork"
   → Apply when ready
```

### Scenario 3: Managing Multiple Applications

```
1. User: "go to dashboard"
   → View your applications

2. User: "read page"
   → Hear your applications

3. User: "scroll down"
   → See more applications

4. User: "apply to Trinity"
   → Add another application

5. User: "apply to UCD"
   → Add another application
```

---

## 💡 Pro Tips

### University Name Shortcuts
You can use short names:
```
"Trinity" → Trinity College Dublin
"UCD" → University College Dublin
"Cork" → University College Cork
"Galway" → NUI Galway
"Limerick" → University of Limerick
```

### Partial Matching
The system finds universities even with partial names:
```
"apply to Trinity" (works for Trinity College Dublin)
"apply to Dublin" (finds University College Dublin)
"apply to Cork" (finds University College Cork)
```

### Combine Commands
Chain commands together:
```
1. "apply to Trinity"
2. "fill firstName with John"
3. "fill email with john@example.com"
4. "submit form"
```

### Get Info Before Applying
Always get information first:
```
1. "tell me about Trinity"
2. "show university details for Trinity"
3. "compare Trinity and UCD"
4. Then: "apply to Trinity"
```

---

## 📊 Available Information

When you ask about a university, you get:

| Information | Available |
|-------------|-----------|
| University Name | ✅ Yes |
| Country | ✅ Yes |
| City/Location | ✅ Yes |
| Website | ✅ Yes (if available) |
| Email Address | ✅ Yes |
| Phone Number | ✅ Yes |
| Description | ✅ Yes |
| Campuses | ✅ Yes (if multiple) |

---

## 🔄 Integration with Other Commands

### Navigate to Universities Page
```
User: "go to universities"
Assistant: "Taking you to universities page"
```

### Search for University Courses
```
User: "go to courses"
Assistant: "Taking you to courses page"

User: "search for Trinity courses"
Assistant: "Searching for Trinity courses"
```

### Track Applications
```
User: "go to dashboard"
Assistant: "Taking you to your dashboard"

User: "track my application"
Assistant: "Tracking your applications"
```

### View All Commands
```
User: "help"
Assistant: "Shows help with all voice commands"

User: "show all commands"
Assistant: "Lists all 60+ available commands"
```

---

## ⚠️ Troubleshooting

### University Not Found
**Problem:** "Could not find [university name]"

**Solution:**
1. Say "show all universities" to see exact names
2. Use shorter names (e.g., "Trinity" instead of full name)
3. Check spelling
4. Try different variations

### Application Won't Submit
**Problem:** Form submit fails

**Solution:**
1. Check all required fields are filled
2. Say "read page" to hear validation errors
3. Fill missing fields and try again
4. Refresh and retry

### Can't Hear University Details
**Problem:** Missing information

**Solution:**
1. Try "show university details for [name]"
2. Navigate to universities page manually
3. Check if university is in database
4. Ask administrator to update information

---

## 📝 API Endpoints Used

These voice commands use these backend endpoints:

```
GET  /api/universities           - List all universities
GET  /api/universities/:id       - Get university details
POST /api/universities           - Add university (admin)
PUT  /api/universities/:id       - Update university (admin)
```

---

## 🎓 Best Practices

1. **Always get info first** - Use "tell me about" before applying
2. **Compare universities** - Use compare command to decide
3. **Check details** - Use "show university details for" for full info
4. **Filter by location** - Use "universities in" to narrow down
5. **Fill carefully** - Take time to fill forms correctly
6. **Confirm before submit** - Review before submitting

---

## 🔐 Privacy & Security

- Your applications are private to your account
- Only authenticated users can apply
- Only admins can update universities
- All data is encrypted in transit
- Passwords are securely hashed

---

## 📞 Getting Help

For issues with university commands:

1. Try "show all universities" to verify database
2. Use "tell me about [name]" to test information retrieval
3. Check browser console for errors (F12)
4. Refresh page and try again
5. Contact system administrator if needed

---

**Last Updated:** January 7, 2026
**Version:** 2.0 - University Operations Enhanced
**Status:** ✅ Production Ready

