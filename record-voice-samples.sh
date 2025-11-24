#!/bin/bash
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
