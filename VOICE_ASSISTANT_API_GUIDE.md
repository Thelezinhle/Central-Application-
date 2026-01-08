# CAO Voice Assistant - Complete API Guide

## Overview
The CAO Voice Assistant allows users to control the entire application using voice commands. It supports navigation, form filling, searching, clicking buttons, and more.

## Voice Command Categories

### 1. Navigation Commands
Navigate to any page in the application.

```
✓ "go to home" → Navigate to home page
✓ "go to dashboard" → Navigate to user dashboard
✓ "go to courses" → View courses page
✓ "go to universities" → View universities page
✓ "go to recommendations" → View recommendations/points calculator
✓ "go to login" → Login page
✓ "go to register" → Register/signup page
✓ "go to track status" → Track applications page
✓ "go to admin" → Admin dashboard
✓ "go back" → Go back to previous page
```

### 2. University Commands (NEW!)
Explore and apply to universities using voice.

```
✓ "show all universities" → List all universities
✓ "list universities" → Display all universities
✓ "apply to [university]" → Apply to a specific university
✓ "apply to [university] university" → Apply with full name
✓ "tell me about [university]" → Get university information
✓ "show university details for [university]" → Get comprehensive details
✓ "universities in [location]" → Find universities in a city/country
✓ "compare [university] and [university]" → Compare two universities
✓ "add university [name]" → Add new university (admin only)
✓ "update university [name] with [info]" → Update university (admin only)
```

**University Examples:**
```
"apply to Trinity" → Apply to Trinity College Dublin
"tell me about UCD" → Get UCD information
"universities in Dublin" → Show Dublin universities
"compare Trinity and Cork" → Compare the two universities
```

### 3. Search & Filter Commands
Find courses and universities.

```
✓ "search for engineering" → Search for engineering courses
✓ "search for Dublin universities" → Search for universities in Dublin
✓ "filter by [filter-type]" → Apply filters to results
✓ "show computer science courses" → Show specific course type
```

### 4. Application Commands
Manage your applications.

```
✓ "apply for computer science" → Apply for a course
✓ "check my application status" → View your applications
✓ "track my application" → Track application status
✓ "submit application" → Submit current form
```

### 5. Form Commands
Fill out forms using voice.

```
✓ "fill email with myemail@example.com" → Fill email field
✓ "fill firstName with John" → Fill first name
✓ "fill password with mypassword123" → Fill password field
✓ "type hello in search" → Type text in search box
✓ "click submit" → Click any button
✓ "click login" → Click specific button by text
✓ "submit form" → Submit the form
```

### 6. Scrolling Commands
Navigate the page.

```
✓ "scroll down" → Scroll down 300px
✓ "scroll up" → Scroll up 300px
✓ "scroll to top" → Go to top of page
✓ "scroll to bottom" → Go to bottom of page
```

### 7. Reading Commands
Have content read to you.

```
✓ "read page" → Read entire page content
✓ "read heading" → Read all headings on the page
```

### 8. Information Commands
Get CAO information.

```
✓ "when is the deadline" → Check application deadline
✓ "what are the requirements for engineering" → Course requirements
✓ "calculate my points" → Open points calculator
✓ "compare computer science and engineering" → Compare courses
✓ "save course to my list" → Add to favorites
```

### 9. Help Commands
```
✓ "help" → Get quick help summary
✓ "show all commands" → Show complete list of available commands
```

---

## Common Use Cases

### Example 1: Register and Apply for a Course

```
1. User: "go to register"
   → Takes you to registration page

2. User: "fill email with student@example.com"
   → Fills email field

3. User: "fill password with secure123"
   → Fills password field

4. User: "click submit"
   → Submits registration form

5. User: "search for engineering courses"
   → Searches and shows engineering courses

6. User: "apply for computer science"
   → Applies for the course
```

### Example 2: Check Application Status

```
1. User: "go to dashboard"
   → Takes you to your applications

2. User: "read page"
   → Reads your application information

3. User: "scroll down"
   → Scroll to see more applications
```

### Example 3: Find and Apply to Universities (NEW!)

```
1. User: "show all universities"
   → See all available universities

2. User: "universities in Dublin"
   → Filter to show Dublin universities

3. User: "tell me about Trinity"
   → Get detailed information about Trinity

4. User: "apply to Trinity"
   → Open Trinity application form

5. User: "fill email with student@example.com"
   → Fill your email

6. User: "fill firstName with John"
   → Fill your first name

7. User: "submit form"
   → Submit the application
```

### Example 4: Compare Universities (NEW!)

```
1. User: "show all universities"
   → See all universities

2. User: "tell me about Trinity"
   → Get Trinity information

3. User: "tell me about UCD"
   → Get UCD information

4. User: "compare Trinity and UCD"
   → See comparison

5. User: "apply to Trinity"
   → Apply when ready
```

### Example 5: Find Universities by Location (NEW!)

```
1. User: "universities in Dublin"
   → See Dublin universities

2. User: "universities in Cork"
   → See Cork universities

3. User: "compare Trinity and Cork"
   → Compare across different cities

4. User: "apply to Trinity"
   → Apply to your choice
```

---

## How Voice Commands Work

### 1. **Exact Matches**
Commands with exact patterns are matched first:
- Pattern: `"go to [page]"` matches `"go to home"`
- Pattern: `"fill [field] with [value]"` matches `"fill email with test@example.com"`

### 2. **Natural Language Processing**
If no exact match is found, the system uses natural language processing:
- Understands intent from keywords
- Extracts relevant information
- Performs the appropriate action

### 3. **Fallback Behavior**
- If a command isn't recognized, you'll hear a helpful message
- You can always say "help" to get instructions
- The system provides feedback for every action

---

## Field Names for Form Filling

When filling forms, use these common field names:

```
• email, password, confirmPassword
• firstName, lastName, fullName
• phoneNumber, phone
• address, city, country
• university, course, program
• applicationDate, startDate
• comments, description, message
```

**Example:**
```
"fill firstName with John"
"fill email with john@example.com"
"fill phoneNumber with 0891234567"
```

---

## Button Names

Common button interactions:

```
• "click submit" → Submit a form
• "click login" → Login button
• "click register" → Register button
• "click apply" → Apply for a course
• "click search" → Search button
• "click save" → Save to favorites
• "click delete" → Delete item
• "click edit" → Edit information
• "click cancel" → Cancel action
```

---

## API Integration (For Developers)

### executeVoiceCommand()

```javascript
import { executeVoiceCommand } from '../utils/voiceCommands';

// Execute a voice command
executeVoiceCommand(
    "go to courses",
    (successMessage) => {
        console.log(successMessage); // "Taking you to courses"
    },
    (error) => {
        console.error(error);
    }
);
```

### fillFormField()

```javascript
import { fillFormField } from '../utils/voiceCommands';

// Programmatically fill a form field
fillFormField('email', 'user@example.com');
fillFormField('firstName', 'John');
```

### clickElement()

```javascript
import { clickElement } from '../utils/voiceCommands';

// Programmatically click an element
clickElement('submit');
clickElement('login');
```

### processVoiceCommand()

```javascript
import { processVoiceCommand } from '../utils/voiceCommands';

// Process natural language without matching exact patterns
const result = processVoiceCommand("hello, how are you?");
// Returns: { type: 'greeting', response: '...' }
```

---

## Available Backend APIs

The CAO application connects to these backend endpoints. Voice commands can trigger API calls:

### Authentication Endpoints
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/logout` - Logout user

### Course Endpoints
- **GET** `/api/courses` - Get all courses
- **GET** `/api/courses/:id` - Get specific course
- **POST** `/api/courses` - Create course (admin)

### University Endpoints
- **GET** `/api/universities` - Get all universities
- **GET** `/api/global-universities/countries` - Get all countries
- **GET** `/api/universities/:id` - Get specific university

### Application Endpoints
- **GET** `/api/applications` - Get user's applications
- **POST** `/api/applications` - Submit new application
- **PUT** `/api/applications/:id` - Update application
- **DELETE** `/api/applications/:id` - Delete application

### Payment Endpoints
- **POST** `/api/payments` - Process payment
- **GET** `/api/payments/:id` - Get payment details

---

## Getting API Keys (If Required)

### For RapidAPI Integration
If the application uses RapidAPI for additional data:

1. Go to [RapidAPI](https://rapidapi.com)
2. Sign up or login
3. Search for "CAO universities" or similar
4. Subscribe to the API
5. Copy your API key
6. Add to `.env` file:
   ```
   RAPIDAPI_KEY=your_key_here
   ```

### Environment Variables
Create/update `.env` file in the frontend:

```bash
VITE_API_URL=http://localhost:5000
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

---

## Testing Voice Commands

### 1. Enable Voice Mode
- Click "Listen" button in the voice controller widget
- Or say: "go to home" to trigger voice mode

### 2. Speak Clearly
- Use natural speech patterns
- Pause after each command (about 2 seconds)
- System will acknowledge each command

### 3. Check Browser Console
- Press F12 to open Developer Tools
- Check Console tab for any errors
- Speech recognition logs appear here

### 4. Test Examples
Try these to verify it's working:

```
1. "go to courses" (should navigate)
2. "read page" (should read content)
3. "search for engineering" (should search)
4. "help" (should show help)
```

---

## Troubleshooting

### Voice Not Recognizing Commands
- ✓ Check microphone permissions in browser
- ✓ Speak clearly and pause between commands
- ✓ Make sure JavaScript is enabled
- ✓ Try refreshing the page

### Command Not Executing
- ✓ Check browser console for errors (F12)
- ✓ Verify the page has fully loaded
- ✓ Make sure the element exists on the page
- ✓ Try a simpler command first

### Form Fields Not Filling
- ✓ Use exact field names when possible
- ✓ Wait for the page to fully load
- ✓ Try "read page" to see field names
- ✓ Check if field is visible and enabled

---

## Browser Compatibility

Voice Assistant requires:
- ✓ Chrome/Edge 25+
- ✓ Safari 14+ (with microphone permissions)
- ✓ Firefox (with speech recognition API)
- ✓ Mobile browsers (Chrome, Safari)

---

## Tips for Best Experience

1. **Use Natural Speech** - Don't memorize exact phrases
2. **Pause Between Commands** - Give the system time to process
3. **Speak Clearly** - Enunciate well for better recognition
4. **Start Simple** - Test basic navigation first
5. **Use Feedback** - Listen for confirmation of actions
6. **Say "Help"** - Anytime you're unsure of commands

---

## Support

For issues or feature requests:
1. Check the browser console for error messages
2. Try refreshing the page
3. Test with a different browser
4. Report issues to the development team

