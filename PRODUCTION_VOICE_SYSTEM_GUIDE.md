# Production-Grade Voice System Documentation

## Overview

The production voice system integrates the **Web Speech API** for reliable speech recognition without building from scratch. It provides:

- ✅ Zero-dependency voice recognition using browser's native API
- ✅ Flat, structured command list (predictable for voice control)
- ✅ Full accessibility features (ARIA labels, keyboard shortcuts)
- ✅ Error handling and recovery
- ✅ Visual and audio feedback

## Architecture

### 1. Core Hook: `useProductionVoiceSystem`

**Location**: `frontend/src/hooks/useProductionVoiceSystem.js`

**Purpose**: 
- Manages Web Speech API lifecycle
- Processes voice commands
- Handles errors and timeouts

**Key Features**:
```javascript
const {
  isListening,        // Boolean: currently listening?
  isSupported,        // Boolean: browser supports speech recognition?
  transcript,         // String: final recognized speech
  interimTranscript,  // String: partial speech while speaking
  lastCommand,        // Object: last executed command
  commandHistory,     // Array: history of executed commands
  error,              // String: any error message
  startListening,     // Function: start listening
  stopListening,      // Function: stop listening
  toggleListening,    // Function: toggle listening state
  executeCommand,     // Function: execute command by text
  availableCommands,  // Object: all available voice commands
} = useProductionVoiceSystem({
  onNavigate: (target) => navigate(target),
  onCommandExecuted: (command) => console.log(command),
  onError: (errorMsg) => console.error(errorMsg),
  language: 'en-US'  // Default: 'en-US'
});
```

### 2. UI Component: `ProductionVoiceWidget`

**Location**: `frontend/src/components/ProductionVoiceWidget.jsx`

**Purpose**:
- Provides user interface for voice control
- Displays transcripts and feedback
- Shows available commands
- Handles keyboard shortcuts

**Features**:
- Fixed button in bottom-right corner
- Expandable control panel
- Real-time transcript display
- Command history
- Keyboard shortcuts (Ctrl+K to toggle, Esc to stop)
- Full ARIA accessibility

## Voice Commands Structure

All commands are organized in a **flat, predictable list** (see `VOICE_COMMANDS` in hook).

### Command Categories

#### Navigation Commands
```
"navigate home" → Go to home page
"open universities" → Go to universities page
"show courses" → Go to courses page
"navigate colleges" → Go to colleges page
"open recommendations" → Get course recommendations
"check applications" → View application status
"calculate aps" → Open APS calculator
"go back" → Navigate to previous page
```

#### Page Control Commands
```
"scroll down" → Scroll down 300px
"scroll up" → Scroll up 300px
"scroll top" → Scroll to top of page
"scroll bottom" → Scroll to bottom of page
```

#### Utility Commands
```
"help" → Show available commands
"commands" → Show available commands
"what can you do" → Show available commands
"stop listening" → Stop voice recognition
"stop" → Stop voice recognition
```

## Integration Guide

### Step 1: Add to Your App

In your main `App.jsx`:

```jsx
import ProductionVoiceWidget from './components/ProductionVoiceWidget';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ProductionVoiceWidget />
    </div>
  );
}
```

### Step 2: Use the Hook Directly (Optional)

For custom voice control in a specific page:

```jsx
import { useProductionVoiceSystem } from '../hooks/useProductionVoiceSystem';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();
  const { isListening, transcript, startListening } = useProductionVoiceSystem({
    onNavigate: (target) => navigate(target),
    onCommandExecuted: (command) => console.log(`Executed: ${command.label}`)
  });

  return (
    <div>
      <button onClick={startListening}>
        {isListening ? 'Listening...' : 'Start Voice'}
      </button>
      {transcript && <p>You said: {transcript}</p>}
    </div>
  );
}
```

## Keyboard Shortcuts

- **Ctrl+K** (or **Cmd+K** on Mac): Toggle listening on/off
- **Esc**: Stop listening immediately

## Error Handling

The system automatically handles:

| Error | Message |
|-------|---------|
| `no-speech` | "No speech detected. Please speak clearly." |
| `audio-capture` | "No microphone found. Please check your audio devices." |
| `not-allowed` | "Microphone access denied. Please allow access in browser settings." |
| `network` | "Network error. Please check your connection." |
| `aborted` | "Speech recognition was cancelled." |

## Browser Support

### Supported Browsers
- ✅ Chrome/Chromium (best support)
- ✅ Edge (Chromium-based)
- ✅ Safari (macOS 14.5+, iOS 14.5+)
- ✅ Firefox (requires flag: `dom.speech.synthesis.enabled`)

### Not Supported
- ❌ Internet Explorer
- ❌ Opera (older versions)

## Accessibility Features

1. **ARIA Labels**: All controls have descriptive `aria-label` attributes
2. **Role Attributes**: Panel has `role="region"` for screen readers
3. **Status Updates**: Announcements use `role="status"` with `aria-live="polite"`
4. **Keyboard Navigation**: Full keyboard control (no mouse required)
5. **Visual Feedback**: 
   - Listening state clearly indicated
   - Color changes (green ready, red listening)
   - Pulsing animation when listening

## Performance Optimizations

1. **Auto-stop after 15 seconds**: Prevents hung connections
2. **Interim Results**: Shows partial speech while speaking
3. **Command History**: Keeps last 10 commands (limited memory usage)
4. **Lazy Initialization**: Speech recognition only starts when needed

## Best Practices

### DO:
- ✅ Keep command names **short and memorable**
- ✅ Use **natural language** (e.g., "open universities" not "nav-univ")
- ✅ Test with **different accents and speaking styles**
- ✅ Provide **clear feedback** when command is executed
- ✅ List **all available commands** for users

### DON'T:
- ❌ Create commands that are **phonetically similar** ("search" vs "search for")
- ❌ Use commands that are **too long** (harder to pronounce consistently)
- ❌ Build complex **natural language understanding** yourself
- ❌ Require **perfect dictation** (use partial matching instead)

## Extending Commands

To add custom commands, edit `VOICE_COMMANDS` in `useProductionVoiceSystem.js`:

```javascript
const VOICE_COMMANDS = {
  // ... existing commands ...
  
  'my custom command': { 
    action: 'navigate',      // or 'scroll', 'stop', 'help'
    target: '/my-page',      // for navigate action
    label: 'Go to My Page'    // what to say in feedback
  },
};
```

## Testing Voice Commands

1. **Open DevTools Console** (F12)
2. **Click the voice button** in bottom-right
3. **Speak clearly** into your microphone
4. **Watch the transcript** appear in real-time
5. **Check the command history** in the panel

## Troubleshooting

### "Microphone access denied"
- Check browser permissions
- Open Settings → Privacy → Microphone
- Allow camera/microphone access for your site

### "No speech detected"
- Speak clearly and louder
- Check microphone is working
- Try again after a moment

### Commands not working
- Verify the exact command phrase
- Check browser console for errors
- Make sure you're using a **supported browser**

## Future Enhancements

Consider adding (but not required for MVP):
- Custom voice settings (speed, pitch)
- Command aliases (multiple ways to say same thing)
- Advanced NLP for partial matching
- Voice feedback playback

## Resources

- [Web Speech API MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [SpeechRecognition Interface](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Browser Support Table](https://caniuse.com/speech-recognition)
