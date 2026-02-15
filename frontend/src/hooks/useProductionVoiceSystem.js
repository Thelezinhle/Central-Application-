import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Production-Grade Voice System Hook
 * Uses Web Speech API with proper error handling and accessibility
 * Structured for clear, predictable voice commands
 */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VOICE_COMMANDS = {
  // Navigation Commands - Multiple variations for natural speech
  'navigate home': { action: 'navigate', target: '/', label: 'Go to Home' },
  'go home': { action: 'navigate', target: '/', label: 'Go to Home' },
  'open home': { action: 'navigate', target: '/', label: 'Go to Home' },
  'home': { action: 'navigate', target: '/', label: 'Go to Home' },
  'home page': { action: 'navigate', target: '/', label: 'Go to Home' },
  
  'navigate universities': { action: 'navigate', target: '/universities', label: 'Go to Universities' },
  'open universities': { action: 'navigate', target: '/universities', label: 'Go to Universities' },
  'show universities': { action: 'navigate', target: '/universities', label: 'Go to Universities' },
  'universities': { action: 'navigate', target: '/universities', label: 'Go to Universities' },
  'university': { action: 'navigate', target: '/universities', label: 'Go to Universities' },
  'go to universities': { action: 'navigate', target: '/universities', label: 'Go to Universities' },
  
  'navigate courses': { action: 'navigate', target: '/courses', label: 'Go to Courses' },
  'open courses': { action: 'navigate', target: '/courses', label: 'Go to Courses' },
  'show courses': { action: 'navigate', target: '/courses', label: 'Go to Courses' },
  'courses': { action: 'navigate', target: '/courses', label: 'Go to Courses' },
  'course': { action: 'navigate', target: '/courses', label: 'Go to Courses' },
  'go to courses': { action: 'navigate', target: '/courses', label: 'Go to Courses' },
  
  'navigate colleges': { action: 'navigate', target: '/colleges', label: 'Go to Colleges' },
  'open colleges': { action: 'navigate', target: '/colleges', label: 'Go to Colleges' },
  'colleges': { action: 'navigate', target: '/colleges', label: 'Go to Colleges' },
  'college': { action: 'navigate', target: '/colleges', label: 'Go to Colleges' },
  'go to colleges': { action: 'navigate', target: '/colleges', label: 'Go to Colleges' },
  
  'navigate recommendations': { action: 'navigate', target: '/recommendations', label: 'Go to Recommendations' },
  'open recommendations': { action: 'navigate', target: '/recommendations', label: 'Get Recommendations' },
  'recommendations': { action: 'navigate', target: '/recommendations', label: 'Go to Recommendations' },
  'recommend': { action: 'navigate', target: '/recommendations', label: 'Go to Recommendations' },
  'go to recommendations': { action: 'navigate', target: '/recommendations', label: 'Go to Recommendations' },
  
  'navigate applications': { action: 'navigate', target: '/dashboard', label: 'Go to Applications' },
  'check applications': { action: 'navigate', target: '/dashboard', label: 'Go to Applications' },
  'open dashboard': { action: 'navigate', target: '/dashboard', label: 'Go to Dashboard' },
  'dashboard': { action: 'navigate', target: '/dashboard', label: 'Go to Dashboard' },
  'applications': { action: 'navigate', target: '/dashboard', label: 'Go to Dashboard' },
  'go to dashboard': { action: 'navigate', target: '/dashboard', label: 'Go to Dashboard' },
  
  'navigate calculator': { action: 'navigate', target: '/aps-calculator', label: 'Go to APS Calculator' },
  'calculate aps': { action: 'navigate', target: '/aps-calculator', label: 'Go to APS Calculator' },
  'aps calculator': { action: 'navigate', target: '/aps-calculator', label: 'Go to APS Calculator' },
  'calculate points': { action: 'navigate', target: '/aps-calculator', label: 'Go to APS Calculator' },
  'aps': { action: 'navigate', target: '/aps-calculator', label: 'Go to APS Calculator' },
  
  'navigate bursaries': { action: 'navigate', target: '/bursaries', label: 'Go to Bursaries' },
  'open bursaries': { action: 'navigate', target: '/bursaries', label: 'Go to Bursaries' },
  'bursaries': { action: 'navigate', target: '/bursaries', label: 'Go to Bursaries' },
  'bursary': { action: 'navigate', target: '/bursaries', label: 'Go to Bursaries' },
  'funding': { action: 'navigate', target: '/bursaries', label: 'Go to Bursaries' },
  'go to bursaries': { action: 'navigate', target: '/bursaries', label: 'Go to Bursaries' },
  
  // Page Control Commands
  'scroll down': { action: 'scroll', direction: 'down', distance: 300, label: 'Scroll Down' },
  'scroll up': { action: 'scroll', direction: 'up', distance: 300, label: 'Scroll Up' },
  'scroll top': { action: 'scroll', direction: 'top', label: 'Scroll to Top' },
  'scroll bottom': { action: 'scroll', direction: 'bottom', label: 'Scroll to Bottom' },
  'go up': { action: 'scroll', direction: 'up', distance: 300, label: 'Scroll Up' },
  'go down': { action: 'scroll', direction: 'down', distance: 300, label: 'Scroll Down' },
  
  'go back': { action: 'navigate', target: 'back', label: 'Go Back' },
  'back': { action: 'navigate', target: 'back', label: 'Go Back' },
  
  // Utility Commands
  'help': { action: 'help', label: 'Show Help' },
  'what can you do': { action: 'help', label: 'Show Help' },
  'commands': { action: 'help', label: 'Show Help' },
  'what can i say': { action: 'help', label: 'Show Help' },
  
  'stop listening': { action: 'stop', label: 'Stop Listening' },
  'stop': { action: 'stop', label: 'Stop Listening' },
  'stop recording': { action: 'stop', label: 'Stop Listening' },
};

export const useProductionVoiceSystem = ({
  onNavigate = null,
  onCommandExecuted = null,
  onError = null,
  language = 'en-US'
} = {}) => {
  
  // State management
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [lastCommand, setLastCommand] = useState(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [error, setError] = useState(null);
  
  // References
  const recognitionRef = useRef(null);
  const listeningTimeoutRef = useRef(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.language = language;
      
      // Handle recognition results
      recognition.onresult = (event) => {
        let interim = '';
        let final = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            final += transcript + ' ';
          } else {
            interim += transcript;
          }
        }
        
        setInterimTranscript(interim);
        if (final) {
          setTranscript(final.trim());
        }
      };
      
      // Handle errors
      recognition.onerror = (event) => {
        const errorMessage = getErrorMessage(event.error);
        setError(errorMessage);
        if (onError) onError(errorMessage);
        setIsListening(false);
      };
      
      // Handle end of recognition
      recognition.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (listeningTimeoutRef.current) {
        clearTimeout(listeningTimeoutRef.current);
      }
    };
  }, [language, onError]);
  
  // Process voice command
  const executeCommand = useCallback((commandText) => {
    const normalizedInput = commandText.toLowerCase().trim();
    
    // Look for exact or partial match
    for (const [key, command] of Object.entries(VOICE_COMMANDS)) {
      if (normalizedInput === key || normalizedInput.includes(key) || key.includes(normalizedInput)) {
        setLastCommand(command);
        setCommandHistory(prev => [...prev.slice(-9), { ...command, timestamp: new Date() }]);
        
        // Execute the command
        if (command.action === 'navigate') {
          if (command.target === 'back') {
            window.history.back();
          } else {
            if (onNavigate) {
              onNavigate(command.target);
            } else {
              window.location.href = command.target;
            }
          }
        } else if (command.action === 'scroll') {
          if (command.direction === 'top') {
            window.scrollTo(0, 0);
          } else if (command.direction === 'bottom') {
            window.scrollTo(0, document.body.scrollHeight);
          } else if (command.direction === 'down') {
            window.scrollBy(0, command.distance);
          } else if (command.direction === 'up') {
            window.scrollBy(0, -command.distance);
          }
        } else if (command.action === 'stop') {
          stopListening();
        } else if (command.action === 'help') {
          if (onCommandExecuted) {
            onCommandExecuted({
              type: 'help',
              message: 'Available commands: ' + Object.keys(VOICE_COMMANDS).join(', ')
            });
          }
        }
        
        if (onCommandExecuted) {
          onCommandExecuted(command);
        }
        
        return true;
      }
    }
    
    // Command not recognized
    if (onCommandExecuted) {
      onCommandExecuted({
        type: 'unrecognized',
        message: `Command "${commandText}" not recognized. Say "help" for available commands.`
      });
    }
    
    return false;
  }, [onNavigate, onCommandExecuted]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) return;
    
    try {
      setTranscript('');
      setInterimTranscript('');
      setError(null);
      setIsListening(true);
      
      recognitionRef.current.start();
      
      // Auto-stop after 15 seconds of silence
      if (listeningTimeoutRef.current) {
        clearTimeout(listeningTimeoutRef.current);
      }
      
      listeningTimeoutRef.current = setTimeout(() => {
        stopListening();
      }, 15000);
      
    } catch (err) {
      // Recognition already started or other error
      console.warn('Error starting recognition:', err);
    }
  }, [isListening, isSupported]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.warn('Error stopping recognition:', err);
    }
    
    setIsListening(false);
    
    if (listeningTimeoutRef.current) {
      clearTimeout(listeningTimeoutRef.current);
    }
  }, []);
  
  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);
  
  // Process transcript when it becomes final
  useEffect(() => {
    if (transcript && !isListening) {
      executeCommand(transcript);
    }
  }, [transcript, isListening, executeCommand]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to toggle listening
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleListening();
      }
      
      // Escape to stop listening
      if (e.key === 'Escape' && isListening) {
        stopListening();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, stopListening, toggleListening]);
  
  return {
    // State
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    lastCommand,
    commandHistory,
    error,
    
    // Methods
    startListening,
    stopListening,
    toggleListening,
    executeCommand,
    
    // Available commands
    availableCommands: VOICE_COMMANDS,
  };
};

// Error message mapping
function getErrorMessage(error) {
  const messages = {
    'no-speech': 'No speech detected. Please speak clearly.',
    'audio-capture': 'No microphone found. Please check your audio devices.',
    'not-allowed': 'Microphone access denied. Please allow access in your browser settings.',
    'network': 'Network error. Please check your connection.',
    'aborted': 'Speech recognition was cancelled.',
    'service-not-allowed': 'Speech recognition service is not allowed.',
    'bad-grammar': 'Speech recognition error.',
  };
  
  return messages[error] || `Error: ${error}`;
}

export default useProductionVoiceSystem;
