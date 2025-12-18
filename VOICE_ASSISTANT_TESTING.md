# Testing the Voice Assistant

## Quick Start Guide

### 1. Access the App
- Open http://localhost:3000 in your browser
- You should see the CAO application with a green microphone button in the bottom-right corner

### 2. Initial Greeting (Automatic)
- Listen for the voice assistant greeting
- You should hear: "Hello! I'm your CAO voice assistant. Can I help you navigate the application? Say 'yes' to continue or 'no' to dismiss me."
- The assistant will automatically start listening for your response

### 3. Test "Yes" Response
Say "yes" and watch:
- The panel expands to full size
- Assistant confirms: "Great! I'm here to help..."
- You can now use voice commands
- Try saying: "open courses"

### 4. Test "No" Response
Say "no" and watch:
- Assistant confirms: "Okay, I'll move to the side..."
- The panel minimizes to a small green button
- You can click the button to reactivate

### 5. Voice Commands to Try
Once voice mode is active, say these commands:

**Navigation Commands:**
- "open courses" → Go to courses page
- "open universities" → Go to universities page  
- "open dashboard" → Go to applications/dashboard
- "open home" → Return to home page
- "open recommendations" → Go to recommendations page

**Search & Filter:**
- "show science courses" → Filter by science
- "show engineering courses" → Filter by engineering
- "search for medicine" → Search medicine programs

**Information:**
- "check deadline" → Hear CAO deadline
- "what's the deadline" → Same as above
- "help" → List all available commands

**Control:**
- "stop" or "pause" → Stop listening temporarily
- Click mic icon to resume

### 6. Keyboard Shortcuts
- **Ctrl+K** (Windows) or **Cmd+K** (Mac) → Toggle voice listening on/off
- **Escape** → Stop listening
- **Alt+V** → Activate voice assistant (Alt key shortcut)

### 7. Visual Indicators
- **Green Mic Button**: Voice assistant minimized (clickable to expand)
- **White/Green Panel**: Voice assistant active
- **Green Pulse**: Listening (three dots pulsing)
- **Red Mic Button**: Actively recording/listening
- **Conversation History**: All interactions logged with timestamps

### 8. Conversation Log Features
- Shows all messages (user and assistant)
- Displays timestamps for each message
- Color-coded by speaker (Your messages vs Assistant responses)
- Click "Clear conversation" to reset history
- Auto-scrolls to latest message

### 9. Quick Command Buttons
Inside the panel, you'll see quick action buttons:
- "Open courses"
- "Show science courses"
- "Check deadline"
- "Help"
- "Stop"

Just click any button as an alternative to voice commands.

### 10. Browser Requirements
The voice assistant requires:
✅ Chrome, Edge, or Firefox (best support)
✅ Microphone access (grant permission when prompted)
✅ Modern browser with Web Speech API support
✅ Audio output enabled

---

## Expected Behavior Flow

```
Page Load (0s)
↓
Silent → Voice Assistant Loading
↓
0.5s → Greeting Spoken
↓
Panel Shows → Listening Indicated
↓
User Says "Yes" or "No"
↓
If Yes: Full Voice Mode Active ✅
If No: Panel Minimizes ✅
↓
Voice Commands Available
↓
User: "Open courses"
↓
Transcript Shows: "open courses"
↓
Assistant: "Navigating to courses..."
↓
Page Changes to /courses
↓
Auto-Resume Listening
```

---

## Troubleshooting During Testing

### Problem: No Sound Playing
**Solution:**
1. Check system volume (not muted)
2. Check browser settings → Allow sound
3. Refresh the page
4. Try Chrome or Edge browser
5. Check if speaker/headphone is plugged in

### Problem: Microphone Not Working
**Solution:**
1. Look for microphone permission prompt at top of browser
2. Click "Allow" to grant permission
3. Check Windows Sound Settings: Settings → Privacy → Microphone → Allow apps to access microphone
4. Restart the browser

### Problem: Voice Assistant Not Appearing
**Solution:**
1. Check bottom-right corner of screen
2. Scroll down if page is scrollable
3. Clear browser cache: Ctrl+Shift+Delete
4. Refresh page: F5 or Ctrl+R
5. Check browser console for errors: F12 → Console tab

### Problem: Commands Not Being Recognized
**Solution:**
1. Speak clearly and slowly
2. Speak closer to microphone
3. Check microphone levels in system settings
4. Try exact commands (e.g., "open courses" works better than "can i see courses")
5. Check if background noise is too loud

### Problem: Panel Stuck/Won't Minimize
**Solution:**
1. Click the X button (close button) in the top-right
2. Press Escape key
3. Refresh the page
4. Check browser developer tools (F12) for JavaScript errors

---

## Feature Testing Checklist

- [ ] **Greeting Plays**: Hear greeting on page load
- [ ] **Listening Indicator**: See green pulse animation while listening
- [ ] **Transcript Display**: See your speech text appear
- [ ] **Voice Commands**: Commands trigger navigation
- [ ] **Yes Response**: Panel expands and activates full mode
- [ ] **No Response**: Panel minimizes to button
- [ ] **Minimize/Expand**: Can toggle between states
- [ ] **Keyboard Shortcuts**: Ctrl+K toggles listening
- [ ] **Conversation History**: Messages logged with timestamps
- [ ] **Quick Buttons**: Click-based commands work
- [ ] **Mobile Responsive**: Works on phone/tablet
- [ ] **Accessibility**: Works with screen readers
- [ ] **Error Handling**: Graceful response if mic not available
- [ ] **Auto-Resume**: Continues listening after each command
- [ ] **Clear Conversation**: History can be cleared

---

## Voice Command Examples

### Exact Commands That Work Best

✅ **Best Format:**
- "open courses"
- "show science courses"
- "check deadline"
- "help"
- "open universities"

❌ **Variations That May Not Work:**
- "can i see courses" (too conversational)
- "go to the courses page" (too many words)
- "i want to see computers" (too complex)

💡 **Why?**
The speech recognition matches against specific command patterns. Short, clear commands work best.

---

## Performance Notes

- Voice processing happens in real-time
- No server calls required (local Speech API)
- Conversation history stored in browser memory
- Panel responsive and smooth animations
- Minimal impact on page performance

---

## Accessibility Features Demonstrated

✅ Full voice interface (no clicking required)
✅ All text is narrated by assistant
✅ High contrast color scheme (#228B22 green)
✅ Keyboard shortcuts for all functions
✅ ARIA labels for screen readers
✅ Clear visual indicators for listening state
✅ Auto-scrolling conversation log
✅ Readable font sizes (14px minimum)
✅ Color-independent information (not relying on color alone)

---

## Next Steps After Testing

1. **Test on Different Browsers**
   - Chrome (best)
   - Firefox (good)
   - Edge (good)
   - Safari (limited)

2. **Test on Mobile**
   - Open http://localhost:3000 on phone
   - Voice assistant adapts to screen size
   - Tap microphone button to start

3. **Test Different Commands**
   - Try all suggested commands
   - Experiment with variations
   - Note which work best

4. **Gather Feedback**
   - Is greeting appropriate?
   - Are commands intuitive?
   - Is voice quality good?
   - Any confusing interactions?

---

**Happy Testing!** 🎉
The voice assistant is now running and ready to help CAO applicants navigate the application.
