import React, { useState, useEffect } from 'react';
import { useProductionVoiceSystem } from '../hooks/useProductionVoiceSystem';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * Production-Grade Voice Widget
 * Accessible, keyboard-controlled voice interface
 * Features:
 * - Web Speech API integration
 * - Full keyboard support (Ctrl+K to toggle, Esc to stop)
 * - ARIA labels and announcements
 * - Visual and audio feedback
 * - Error handling and recovery
 */

export function ProductionVoiceWidget() {
  const navigate = useNavigate();
  const [showPanel, setShowPanel] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const { speak, directSpeak } = useAccessibility();
  
  // Helper to speak feedback
  const speakFeedback = (message) => {
    if (directSpeak) {
      directSpeak(message);
    } else if (speak) {
      speak(message);
    }
  };
  
  const {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    lastCommand,
    error,
    availableCommands,
    startListening,
    stopListening,
    toggleListening,
  } = useProductionVoiceSystem({
    onNavigate: (target) => {
      speakFeedback(`Taking you to ${target.replace('/', '') || 'home'}`);
      setTimeout(() => navigate(target), 500);
    },
    onCommandExecuted: (command) => {
      if (command.type === 'help') {
        setAnnouncement(command.message);
        speakFeedback('Say: universities, courses, colleges, bursaries, recommendations, dashboard, or scroll commands');
      } else if (command.type === 'unrecognized') {
        setAnnouncement(command.message);
        speakFeedback(command.message);
      } else {
        const msg = `${command.label || 'Command executed'}`;
        setAnnouncement(msg);
        // Don't speak navigation commands since onNavigate already speaks
        if (command.action !== 'navigate') {
          speakFeedback(msg);
        }
      }
    },
    onError: (errorMsg) => {
      setAnnouncement(`Error: ${errorMsg}`);
      speakFeedback(errorMsg);
    }
  });
  
  // Speak when listening starts/stops
  useEffect(() => {
    if (isListening) {
      speakFeedback('Listening. Say a command like universities, courses, or help.');
    }
  }, [isListening]);

  if (!isSupported) {
    return (
      <div 
        className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded"
        role="alert"
      >
        <p className="font-semibold text-yellow-800">Speech recognition not supported</p>
        <p className="text-sm text-yellow-700">Your browser doesn't support voice commands.</p>
      </div>
    );
  }

  return (
    <>
      {/* Voice Status Button */}
      <button
        onClick={() => {
          toggleListening();
          setShowPanel(!showPanel);
        }}
        aria-pressed={isListening}
        aria-label={isListening ? 'Stop listening to voice commands' : 'Start listening to voice commands'}
        className={`fixed bottom-4 right-4 rounded-full p-4 shadow-lg transition-all z-40 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-[#228B22] hover:bg-[#1a6b1a]'
        } text-white`}
        title="Ctrl+K: Toggle | Esc: Stop"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-2c.4 0 .7.3.7.7v1.5c0 2.7-1.7 5-4 5.9V19c0 .6-.4 1-1 1s-1-.4-1-1v-1.8c-2.3-.9-4-3.2-4-5.9v-1.5c0-.4.3-.7.7-.7s.7.3.7.7v1.5c0 2 1.3 3.7 3 4.3V5c0-1.1.9-2 2-2s2 .9 2 2v10.3c1.7-.6 3-2.3 3-4.3v-1.5c0-.4.3-.7.7-.7z" />
        </svg>
      </button>

      {/* Voice Control Panel */}
      {showPanel && (
        <div
          className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-4 max-w-xs z-40 border-2 border-[#228B22]"
          role="region"
          aria-label="Voice control panel"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#228B22]">Voice Control</h2>
            <button
              onClick={() => setShowPanel(false)}
              aria-label="Close panel"
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Status */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-[#228B22]'
                }`}
                aria-hidden="true"
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {isListening ? 'Listening...' : 'Ready to listen'}
              </span>
            </div>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="mb-4 p-2 bg-blue-50 rounded border-l-2 border-blue-500">
              <p className="text-xs font-semibold text-blue-700 mb-1">You said:</p>
              <p className="text-sm text-gray-800">{transcript}</p>
            </div>
          )}

          {interimTranscript && (
            <div className="mb-4 p-2 bg-gray-50 rounded border-l-2 border-gray-400">
              <p className="text-xs font-semibold text-gray-600 mb-1">Interim:</p>
              <p className="text-sm text-gray-600 italic">{interimTranscript}</p>
            </div>
          )}

          {/* Last Command */}
          {lastCommand && (
            <div className="mb-4 p-2 bg-green-50 rounded border-l-2 border-green-500">
              <p className="text-xs font-semibold text-green-700 mb-1">Last Command:</p>
              <p className="text-sm text-gray-800">{lastCommand.label}</p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-2 bg-red-50 rounded border-l-2 border-red-500">
              <p className="text-xs font-semibold text-red-700 mb-1">Error:</p>
              <p className="text-sm text-gray-800">{error}</p>
            </div>
          )}

          {/* Announcement Display */}
          {announcement && (
            <div 
              className="mb-4 p-2 bg-yellow-50 rounded border-l-2 border-yellow-500"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm text-gray-800">{announcement}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={startListening}
              disabled={isListening}
              className="flex-1 px-3 py-2 bg-[#228B22] text-white rounded text-sm font-medium hover:bg-[#1a6b1a] disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Start listening"
            >
              Start
            </button>
            <button
              onClick={stopListening}
              disabled={!isListening}
              className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Stop listening"
            >
              Stop
            </button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-4">
            <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
            <ul className="space-y-1">
              <li>
                <code className="bg-gray-200 px-1 rounded">Ctrl+K</code> - Toggle listening
              </li>
              <li>
                <code className="bg-gray-200 px-1 rounded">Esc</code> - Stop listening
              </li>
            </ul>
          </div>

          {/* Available Commands */}
          <details className="text-sm">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-[#228B22]">
              Available Commands ({Object.keys(availableCommands).length})
            </summary>
            <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
              {Object.entries(availableCommands).map(([command, config]) => (
                <div key={command} className="p-2 bg-gray-50 rounded text-xs">
                  <p className="font-mono text-blue-600">"{command}"</p>
                  <p className="text-gray-600">{config.label}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}

export default ProductionVoiceWidget;
