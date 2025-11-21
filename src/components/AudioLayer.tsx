import { Audio, staticFile } from 'remotion';

/**
 * Background music component
 * Place your audio file at: public/audio/background.mp3
 */
export const BackgroundMusic: React.FC<{
  volume?: number;
  startFrom?: number;
  endAt?: number;
}> = ({ volume = 0.3, startFrom = 0, endAt }) => {
  // Uncomment when you add audio file to public/audio/background.mp3
  /*
  return (
    <Audio
      src={staticFile('audio/background.mp3')}
      volume={volume}
      startFrom={startFrom}
      endAt={endAt}
    />
  );
  */
  return null;
};

/**
 * Sound effect component for transitions
 * Place your sound effect at: public/audio/effects/whoosh.mp3
 */
export const TransitionSound: React.FC<{
  startFrom: number;
  volume?: number;
}> = ({ startFrom, volume = 0.5 }) => {
  // Uncomment when you add sound effect to public/audio/effects/whoosh.mp3
  /*
  return (
    <Audio
      src={staticFile('audio/effects/whoosh.mp3')}
      volume={volume}
      startFrom={startFrom}
    />
  );
  */
  return null;
};

/**
 * Click/pop sound for element appearances
 * Place your sound effect at: public/audio/effects/pop.mp3
 */
export const PopSound: React.FC<{
  startFrom: number;
  volume?: number;
}> = ({ startFrom, volume = 0.4 }) => {
  // Uncomment when you add sound effect to public/audio/effects/pop.mp3
  /*
  return (
    <Audio
      src={staticFile('audio/effects/pop.mp3')}
      volume={volume}
      startFrom={startFrom}
    />
  );
  */
  return null;
};

/**
 * Ambient tech sounds
 * Place your audio file at: public/audio/effects/ambient.mp3
 */
export const AmbientSound: React.FC<{
  startFrom: number;
  endAt?: number;
  volume?: number;
}> = ({ startFrom, endAt, volume = 0.2 }) => {
  // Uncomment when you add sound effect to public/audio/effects/ambient.mp3
  /*
  return (
    <Audio
      src={staticFile('audio/effects/ambient.mp3')}
      volume={volume}
      startFrom={startFrom}
      endAt={endAt}
    />
  );
  */
  return null;
};
