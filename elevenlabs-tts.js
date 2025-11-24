
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
        url: `${this.baseURL}/text-to-speech/${voiceId}`,
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
