// Voice Cloning Setup Guide and Scripts
// This script helps you set up voice cloning using various methods

const fs = require('fs');
const path = require('path');

const setupGuide = {
  methods: [
    {
      name: "ElevenLabs Voice Cloning (Recommended)",
      description: "High-quality voice cloning with 1-5 minutes of sample audio",
      setup: [
        "1. Record 1-5 minutes of clear speech samples",
        "2. Sign up at elevenlabs.io",
        "3. Upload samples to create voice clone",
        "4. Use API to generate speech",
        "5. Cost: ~$5-22/month for quality voices"
      ],
      requirements: "Good microphone, quiet environment, API key"
    },
    {
      name: "OpenAI Voice Cloning",
      description: "Using OpenAI's advanced voice synthesis",
      setup: [
        "1. Record voice samples (10-30 minutes recommended)",
        "2. Use OpenAI's voice cloning API",
        "3. Generate speech from text",
        "4. Cost: Pay per use"
      ],
      requirements: "OpenAI API access, voice samples"
    },
    {
      name: "Coqui TTS (Free/Local)",
      description: "Open-source voice cloning you can run locally",
      setup: [
        "1. Install Coqui TTS: pip install coqui-tts",
        "2. Record voice samples (5-20 minutes)",
        "3. Train local model or use pre-trained",
        "4. Generate speech locally"
      ],
      requirements: "Python, good GPU (optional), voice samples"
    },
    {
      name: "Tortoise TTS (Free/Local)",
      description: "High-quality local voice cloning",
      setup: [
        "1. Clone tortoise-tts repository",
        "2. Record 2-10 minutes of voice samples",
        "3. Process samples and generate",
        "4. Takes longer but free and private"
      ],
      requirements: "Python, CUDA GPU recommended, time"
    }
  ],
  
  voiceRecordingTips: [
    "Record in a quiet room with minimal echo",
    "Use a good quality microphone (USB mic or headset)",
    "Speak clearly and at normal pace",
    "Include varied sentences, emotions, and tones",
    "Record multiple short clips rather than one long one",
    "Avoid background noise, clicks, or mouth sounds",
    "Keep consistent volume and distance from mic"
  ],
  
  sampleTexts: [
    "The quick brown fox jumps over the lazy dog.",
    "System design is crucial for building scalable applications.",
    "Hello everyone, welcome to my tutorial on distributed systems.",
    "In this video, we'll explore database scaling strategies.",
    "Caching improves performance by storing frequently accessed data.",
    "Thank you for watching, and don't forget to subscribe!",
    "Numbers: one, two, three, four, five, ten, hundred, thousand.",
    "Questions often arise about load balancing and fault tolerance."
  ]
};

// ElevenLabs Integration Script
const elevenLabsScript = `
// ElevenLabs Voice Cloning Integration
const axios = require('axios');
const fs = require('fs');

class ElevenLabsVoiceClone {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.elevenlabs.io/v1';
  }

  async generateSpeech(text, voiceId, outputPath) {
    try {
      const response = await axios({
        method: 'POST',
        url: \`\${this.baseURL}/text-to-speech/\${voiceId}\`,
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        data: {
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.5,
            use_speaker_boost: true
          }
        },
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Error generating speech:', error.message);
      throw error;
    }
  }
}

// Usage example:
// const tts = new ElevenLabsVoiceClone('your-api-key');
// await tts.generateSpeech('Hello world', 'your-voice-id', 'output.mp3');
`;

function createSetupFiles() {
  // Create voice samples directory
  const voiceDir = './voice-samples';
  if (!fs.existsSync(voiceDir)) {
    fs.mkdirSync(voiceDir, { recursive: true });
  }

  // Create sample recording script
  const recordingScript = `#!/bin/bash
# Voice Recording Script
echo "🎙️  Voice Recording for Cloning"
echo "Recording sample clips for voice cloning..."
echo "Press Enter to start recording each clip, Ctrl+C when done"

mkdir -p voice-samples

for i in {1..8}; do
  echo ""
  echo "📝 Sample $i: Please read this text clearly:"
  case $i in
    1) echo "   'The quick brown fox jumps over the lazy dog.'" ;;
    2) echo "   'System design is crucial for building scalable applications.'" ;;
    3) echo "   'Hello everyone, welcome to my tutorial on distributed systems.'" ;;
    4) echo "   'In this video, we'll explore database scaling strategies.'" ;;
    5) echo "   'Caching improves performance by storing frequently accessed data.'" ;;
    6) echo "   'Thank you for watching, and don't forget to subscribe!'" ;;
    7) echo "   'Numbers: one, two, three, four, five, ten, hundred, thousand.'" ;;
    8) echo "   'Questions often arise about load balancing and fault tolerance.'" ;;
  esac
  echo ""
  read -p "Press Enter to start recording (10 seconds)..."
  
  echo "🔴 Recording in 3... 2... 1..."
  sox -t coreaudio -d voice-samples/sample_$i.wav trim 0 10
  echo "✅ Sample $i recorded!"
done

echo ""
echo "🎉 All samples recorded! Files saved in voice-samples/"
echo "Next steps:"
echo "1. Upload samples to ElevenLabs or your chosen platform"
echo "2. Create your voice clone"
echo "3. Use the generated voice ID in the TTS script"
`;

  // Write files
  fs.writeFileSync('./record-voice-samples.sh', recordingScript);
  fs.chmodSync('./record-voice-samples.sh', 0o755);
  
  fs.writeFileSync('./elevenlabs-tts.js', elevenLabsScript);
  
  // Write README
  const readme = `# Voice Cloning Setup

## Quick Start (Recommended: ElevenLabs)

1. **Record Voice Samples**:
   \`\`\`bash
   ./record-voice-samples.sh
   \`\`\`

2. **Create ElevenLabs Account**:
   - Go to elevenlabs.io
   - Upload your voice samples
   - Create voice clone
   - Get your API key and voice ID

3. **Install dependencies**:
   \`\`\`bash
   npm install axios
   \`\`\`

4. **Generate Speech**:
   \`\`\`javascript
   const { ElevenLabsVoiceClone } = require('./elevenlabs-tts');
   const tts = new ElevenLabsVoiceClone('your-api-key');
   await tts.generateSpeech('Your text here', 'your-voice-id', 'output.mp3');
   \`\`\`

## Recording Tips
${setupGuide.voiceRecordingTips.map(tip => `- ${tip}`).join('\n')}

## Alternative Methods
${setupGuide.methods.map(method => `
### ${method.name}
${method.description}

Requirements: ${method.requirements}

Setup:
${method.setup.map(step => `- ${step}`).join('\n')}
`).join('\n')}
`;

  fs.writeFileSync('./VOICE-CLONING-GUIDE.md', readme);
}

createSetupFiles();

console.log('🎤 Voice Cloning Setup Complete!');
console.log('');
console.log('📁 Created files:');
console.log('  - record-voice-samples.sh (record your voice)');
console.log('  - elevenlabs-tts.js (ElevenLabs integration)');
console.log('  - VOICE-CLONING-GUIDE.md (detailed guide)');
console.log('');
console.log('🚀 Next steps:');
console.log('  1. Run: ./record-voice-samples.sh');
console.log('  2. Create account at elevenlabs.io');
console.log('  3. Upload samples and get API key');
console.log('  4. Update scripts with your credentials');
console.log('');
console.log('💡 ElevenLabs is recommended for best quality!');