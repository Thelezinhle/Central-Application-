/**
 * Voice Recognition Utility
 * Provides speech-to-text functionality for blind users
 * Uses Web Speech API (SpeechRecognition)
 */

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export class VoiceRecognitionManager {
    constructor(onResult, onError) {
        // Check if SpeechRecognition is available
        if (!SpeechRecognition) {
            console.warn('Speech recognition is not supported in this browser');
            this.isListening = false;
            this.onResult = onResult;
            this.onError = onError;
            this.recognition = null;
            return;
        }

        this.recognition = new SpeechRecognition();
        this.isListening = false;
        this.onResult = onResult;
        this.onError = onError;

        // Configure speech recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        // Handle results
        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            if (finalTranscript) {
                this.onResult({
                    transcript: finalTranscript.trim(),
                    isFinal: true,
                    confidence: event.results[event.results.length - 1][0].confidence
                });
            }
        };

        // Handle errors
        this.recognition.onerror = (event) => {
            this.onError({
                error: event.error,
                message: this.getErrorMessage(event.error)
            });
        };

        // Auto stop on end
        this.recognition.onend = () => {
            this.isListening = false;
        };
    }

    start() {
        if (!this.recognition) {
            this.onError({ error: 'not-supported', message: 'Speech recognition is not supported in this browser' });
            return;
        }
        this.isListening = true;
        this.recognition.start();
    }

    stop() {
        if (!this.recognition) return;
        this.isListening = false;
        this.recognition.stop();
    }

    abort() {
        if (!this.recognition) return;
        this.isListening = false;
        this.recognition.abort();
    }

    getErrorMessage(error) {
        const messages = {
            'no-speech': 'I did not hear anything. Please speak again.',
            'network': 'Network error. Please check your connection.',
            'audio-capture': 'No microphone found. Please check your audio devices.',
            'not-allowed': 'Microphone access denied. Please allow access in your browser.',
            'service-not-allowed': 'Speech recognition service is not allowed.',
            'bad-grammar': 'Grammar error in speech recognition.',
            'aborted': 'Speech recognition was cancelled.'
        };
        return messages[error] || `Error: ${error}`;
    }

    isAvailable() {
        return !!this.recognition;
    }
}

export default VoiceRecognitionManager;
