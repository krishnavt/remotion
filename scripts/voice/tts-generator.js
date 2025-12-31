const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Script texts for each scene
const scripts = {
  '00-BrandIntro': `Welcome to System Design Fundamentals. In the next few minutes, we'll explore the core principles that power the world's largest applications.`,
  
  'Scene1-HookIntro': `Have you ever wondered how apps like Instagram handle millions of photos uploaded every minute? Or how Netflix streams videos to hundreds of millions of users simultaneously without buffering? The secret lies in scalable system design.`,
  
  'Scene2-BigPicture': `System design is the art and science of architecting large-scale distributed systems. It's about making intelligent trade-offs between consistency, availability, and partition tolerance. Every major tech company relies on these principles to serve billions of users reliably.`,
  
  'Scene3-CAPTheorem': `At the heart of distributed systems lies the CAP Theorem. You can only guarantee two out of three properties: Consistency, Availability, and Partition tolerance. Understanding this fundamental constraint shapes every architectural decision in large-scale systems.`,
  
  'Scene4-ScalePerformance': `Scaling systems involves two primary strategies: vertical scaling, where you add more power to existing machines, and horizontal scaling, where you add more machines to your resource pool. Modern applications favor horizontal scaling for its flexibility and cost-effectiveness.`,
  
  'Scene5-ArchitectureLayers': `Well-designed systems follow a layered architecture pattern. From the presentation layer that users interact with, through business logic layers, down to the data persistence layer. Each layer has specific responsibilities and communicates through well-defined interfaces.`,
  
  'Scene6-DatabaseStrategies': `Database design is crucial for performance. Strategies include database sharding to distribute data across multiple servers, read replicas to handle query load, and choosing between SQL databases for consistency or NoSQL for flexibility and scale.`,
  
  'Scene7-CachingStrategies': `Caching dramatically improves performance by storing frequently accessed data in fast storage. From browser caches and CDNs at the edge, to application-level caches and distributed cache systems like Redis, caching reduces latency and database load.`,
  
  'Scene8-MessageQueues': `Message queues enable asynchronous communication between services. They provide reliability through persistence, scalability through horizontal partitioning, and fault tolerance through replication. Popular solutions include Apache Kafka, RabbitMQ, and Amazon SQS.`,
  
  'Scene9-PuttingItTogether': `Successful system design combines all these concepts. Start with understanding requirements, identify bottlenecks, choose appropriate technologies, and design for failure. Remember that premature optimization is the root of all evil, but planning for scale is essential.`,
  
  'Scene10-Outro': `System design is both an art and engineering discipline. Keep learning, practice with real systems, and remember that the best architecture is one that serves your users reliably while being maintainable by your team. Thanks for watching!`
};

// High-quality voice options for macOS
const voices = [
  'Samantha',    // Natural female voice
  'Alex',        // Natural male voice  
  'Victoria',    // Premium female voice
  'Daniel',      // Premium male voice
  'Karen',       // Australian English
  'Moira',       // Irish English
  'Rishi',       // Indian English
];

async function generateTTS(text, outputPath, voiceName = 'Samantha') {
  // Create audio directory if it doesn't exist
  const audioDir = path.dirname(outputPath);
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  // Use macOS built-in high-quality TTS
  const command = `say -v "${voiceName}" -r 180 -o "${outputPath}" "${text.replace(/"/g, '\\"')}"`;
  
  try {
    await execAsync(command);
    console.log(`✅ Generated: ${path.basename(outputPath)} with voice ${voiceName}`);
  } catch (error) {
    console.error(`❌ Failed to generate ${outputPath}:`, error.message);
  }
}

async function generateAllAudio() {
  console.log('🎙️  Generating natural-sounding audio for all scenes...\n');

  // Create public/audio directory
  const audioDir = './public/audio';
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const voiceToUse = process.argv[2] || 'Samantha'; // Allow voice selection via command line

  for (const [sceneId, text] of Object.entries(scripts)) {
    const outputPath = path.join(audioDir, `${sceneId.toLowerCase()}.aiff`);
    await generateTTS(text, outputPath, voiceToUse);
  }

  console.log('\n🎉 All audio files generated successfully!');
  console.log(`📁 Audio files saved in: ${audioDir}`);
  console.log('\n💡 Tips:');
  console.log('- Use different voices: node tts-generator.js Alex');
  console.log('- Available voices:', voices.join(', '));
  console.log('- Import these audio files into your Remotion compositions');
}

// Show available voices
function listVoices() {
  console.log('🎤 Available high-quality voices:');
  voices.forEach(voice => {
    console.log(`  - ${voice}`);
  });
  console.log('\nUsage: node tts-generator.js [voiceName]');
  console.log('Example: node tts-generator.js Victoria');
}

if (process.argv.includes('--list-voices')) {
  listVoices();
} else {
  generateAllAudio().catch(console.error);
}