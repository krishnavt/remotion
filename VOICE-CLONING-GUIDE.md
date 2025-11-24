# Voice Cloning Setup

## Quick Start (Recommended: ElevenLabs)

1. **Record Voice Samples**:
   ```bash
   ./record-voice-samples.sh
   ```

2. **Create ElevenLabs Account**:
   - Go to elevenlabs.io
   - Upload your voice samples
   - Create voice clone
   - Get your API key and voice ID

3. **Install dependencies**:
   ```bash
   npm install axios
   ```

4. **Generate Speech**:
   ```javascript
   const { ElevenLabsVoiceClone } = require('./elevenlabs-tts');
   const tts = new ElevenLabsVoiceClone('your-api-key');
   await tts.generateSpeech('Your text here', 'your-voice-id', 'output.mp3');
   ```

## Recording Tips
- Record in a quiet room with minimal echo
- Use a good quality microphone (USB mic or headset)
- Speak clearly and at normal pace
- Include varied sentences, emotions, and tones
- Record multiple short clips rather than one long one
- Avoid background noise, clicks, or mouth sounds
- Keep consistent volume and distance from mic

## Alternative Methods

### ElevenLabs Voice Cloning (Recommended)
High-quality voice cloning with 1-5 minutes of sample audio

Requirements: Good microphone, quiet environment, API key

Setup:
- 1. Record 1-5 minutes of clear speech samples
- 2. Sign up at elevenlabs.io
- 3. Upload samples to create voice clone
- 4. Use API to generate speech
- 5. Cost: ~$5-22/month for quality voices


### OpenAI Voice Cloning
Using OpenAI's advanced voice synthesis

Requirements: OpenAI API access, voice samples

Setup:
- 1. Record voice samples (10-30 minutes recommended)
- 2. Use OpenAI's voice cloning API
- 3. Generate speech from text
- 4. Cost: Pay per use


### Coqui TTS (Free/Local)
Open-source voice cloning you can run locally

Requirements: Python, good GPU (optional), voice samples

Setup:
- 1. Install Coqui TTS: pip install coqui-tts
- 2. Record voice samples (5-20 minutes)
- 3. Train local model or use pre-trained
- 4. Generate speech locally


### Tortoise TTS (Free/Local)
High-quality local voice cloning

Requirements: Python, CUDA GPU recommended, time

Setup:
- 1. Clone tortoise-tts repository
- 2. Record 2-10 minutes of voice samples
- 3. Process samples and generate
- 4. Takes longer but free and private

