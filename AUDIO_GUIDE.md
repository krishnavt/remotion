# Audio Setup Guide

## Directory Structure Created

```
public/
└── audio/
    ├── background.mp3      (Place main background music here)
    └── effects/
        ├── whoosh.mp3      (Scene transition sound)
        ├── pop.mp3         (Element appearance sound)
        └── ambient.mp3     (Ambient tech sounds)
```

## Finding Free Audio Files

### Background Music Sources:
1. **YouTube Audio Library** - https://studio.youtube.com/channel/UC.../music
   - Free, no attribution required
   - Filter by "Tech", "Corporate", "Ambient"
   - Recommended tracks: Epic, Uplifting, Corporate Tech

2. **Free Music Archive** - https://freemusicarchive.org/
   - Search for: "electronic ambient", "tech background"
   - Look for CC0 or CC-BY licenses

3. **Incompetech** - https://incompetech.com/music/
   - Free with attribution
   - Categories: "Electronic" or "Corporate"

4. **Pixabay Music** - https://pixabay.com/music/
   - Free, no attribution required
   - Search: "technology", "corporate", "inspiring"

### Sound Effects Sources:
1. **Freesound** - https://freesound.org/
   - Search terms:
     - "whoosh" - for transitions
     - "pop" or "click" - for elements
     - "ambient tech" - for background ambience

2. **Zapsplat** - https://www.zapsplat.com/
   - Free with attribution
   - Categories: UI Sounds, Tech, Whooshes

3. **Mixkit** - https://mixkit.co/free-sound-effects/
   - Free, no attribution required
   - "Interface" and "Technology" sections

## Recommended Audio Specs

- **Format**: MP3 or WAV
- **Background Music**:
  - Duration: 3-5 minutes (loopable)
  - Bitrate: 128-192 kbps
  - BPM: 100-130 (upbeat but not rushed)
  - Style: Electronic, Ambient, Corporate

- **Sound Effects**:
  - Duration: 0.5-2 seconds
  - Bitrate: 128 kbps is sufficient
  - Format: MP3 (smaller file size)

## How to Add Audio to Your Scenes

### Step 1: Download and Add Audio Files

1. Download your chosen audio files
2. Place them in the `public/audio/` directory:
   ```
   public/audio/background.mp3
   public/audio/effects/whoosh.mp3
   public/audio/effects/pop.mp3
   public/audio/effects/ambient.mp3
   ```

### Step 2: Uncomment Audio Components

Open `src/components/AudioLayer.tsx` and uncomment the return statements in each component.

**Before:**
```typescript
export const BackgroundMusic: React.FC<{...}> = ({...}) => {
  // Uncomment when you add audio file
  /*
  return (
    <Audio src={staticFile('audio/background.mp3')} ... />
  );
  */
  return null;
};
```

**After:**
```typescript
export const BackgroundMusic: React.FC<{...}> = ({...}) => {
  return (
    <Audio
      src={staticFile('audio/background.mp3')}
      volume={volume}
      startFrom={startFrom}
      endAt={endAt}
    />
  );
};
```

### Step 3: Add Audio to Scenes

**Example - Adding background music to Scene2:**

```typescript
import { BackgroundMusic } from './components/AudioLayer';

export const Scene2_BigPicture: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Add background music */}
      <BackgroundMusic volume={0.3} startFrom={0} />

      {/* Your existing content */}
    </AbsoluteFill>
  );
};
```

**Example - Adding transition sounds:**

```typescript
import { TransitionSound } from './components/AudioLayer';

// Add at transition points
<Sequence from={420} durationInFrames={30}>
  <TransitionSound startFrom={420} volume={0.5} />
  <FadeTransition startFrame={420} duration={30} type="out" />
</Sequence>
```

**Example - Adding pop sounds for elements:**

```typescript
import { PopSound } from './components/AudioLayer';

// Play sound when element appears
<Sequence from={30} durationInFrames={300}>
  <PopSound startFrom={30} volume={0.4} />
  {/* Your animated element */}
</Sequence>
```

## Volume Recommendations

- **Background Music**: 0.2 - 0.4 (should not overpower voice-over)
- **Transition Sounds**: 0.4 - 0.6 (noticeable but not jarring)
- **Pop/Click Sounds**: 0.3 - 0.5 (subtle accent)
- **Ambient Sounds**: 0.1 - 0.3 (very subtle background layer)

## Audio Mixing Tips

1. **Layering**: Use 2-3 audio layers maximum
   - Layer 1: Background music (continuous)
   - Layer 2: Sound effects (at key moments)
   - Layer 3: Ambient sounds (optional, subtle)

2. **Timing**:
   - Sync transition sounds with fade transitions
   - Add pop sounds at frame when elements scale/appear
   - Keep consistent timing (every 30-60 frames)

3. **Volume Balancing**:
   - Start with low volumes (0.2-0.3)
   - Increase gradually until you find the sweet spot
   - Background music should never compete with narration

4. **Testing**:
   - Render a test clip with audio
   - Listen on different devices (headphones, speakers)
   - Adjust volumes based on listening experience

## Quick Start Example

Want to add audio quickly? Here's a minimal setup:

1. Download one background music track (3-5 min, 128kbps MP3)
2. Download one whoosh sound effect
3. Place them in `public/audio/` directory
4. Uncomment `BackgroundMusic` and `TransitionSound` in `AudioLayer.tsx`
5. Add to Scene2:

```typescript
import { BackgroundMusic, TransitionSound } from './components/AudioLayer';

export const Scene2_BigPicture: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundMusic volume={0.3} />

      {/* Existing backgrounds and content */}

      {/* Add transition sounds */}
      <Sequence from={420} durationInFrames={30}>
        <TransitionSound startFrom={420} />
        <FadeTransition startFrame={420} duration={30} type="out" />
      </Sequence>
    </AbsoluteFill>
  );
};
```

## Troubleshooting

**Issue**: Audio not playing
- Verify file exists at `public/audio/[filename]`
- Check file format (MP3 or WAV)
- Ensure `staticFile()` path is correct

**Issue**: Audio is too loud/quiet
- Adjust `volume` prop (0.0 to 1.0)
- Default values are conservative, feel free to increase

**Issue**: Audio cuts off
- Check `endAt` prop isn't set too early
- Ensure audio file duration is long enough

**Issue**: Audio out of sync
- Verify `startFrom` frame numbers match your sequences
- Use same frame numbers as your transitions

## Resources

- Remotion Audio Docs: https://www.remotion.dev/docs/using-audio
- Audio API Reference: https://www.remotion.dev/docs/audio
- Volume Visualization: https://www.remotion.dev/docs/visualize-audio

---

**Next Steps:**
1. Choose and download audio files from recommended sources
2. Place them in `public/audio/` directory
3. Uncomment audio components in `AudioLayer.tsx`
4. Add audio components to 2-3 key scenes first
5. Test render and adjust volumes
6. Expand to all scenes once satisfied
