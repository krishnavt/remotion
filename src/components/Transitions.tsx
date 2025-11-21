import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../utils/colors';

/**
 * Fade transition overlay
 */
export const FadeTransition: React.FC<{
  startFrame: number;
  duration: number;
  type?: 'in' | 'out';
}> = ({ startFrame, duration, type = 'in' }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > duration) {
    return null;
  }

  const opacity = interpolate(
    relativeFrame,
    [0, duration],
    type === 'in' ? [1, 0] : [0, 1],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

/**
 * Wipe transition (slides across screen)
 */
export const WipeTransition: React.FC<{
  startFrame: number;
  duration: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  color?: string;
}> = ({
  startFrame,
  duration,
  direction = 'right',
  color = colors.neutral.dark,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > duration) {
    return null;
  }

  const progress = interpolate(relativeFrame, [0, duration], [0, 1]);

  const getTransform = () => {
    switch (direction) {
      case 'right':
        return `translateX(${progress * 1920}px)`;
      case 'left':
        return `translateX(${-1920 + progress * 1920}px)`;
      case 'down':
        return `translateY(${progress * 1080}px)`;
      case 'up':
        return `translateY(${-1080 + progress * 1080}px)`;
    }
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        transform: getTransform(),
        pointerEvents: 'none',
      }}
    />
  );
};

/**
 * Zoom transition effect
 */
export const ZoomTransition: React.FC<{
  startFrame: number;
  duration: number;
  type?: 'in' | 'out';
  children?: React.ReactNode;
}> = ({ startFrame, duration, type = 'in', children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) {
    return null;
  }

  const scale = spring({
    frame: relativeFrame,
    fps,
    from: type === 'in' ? 0.8 : 1,
    to: type === 'in' ? 1 : 1.2,
    config: { damping: 15 },
  });

  const opacity = interpolate(
    relativeFrame,
    [0, duration],
    type === 'in' ? [0, 1] : [1, 0],
  );

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Circle reveal transition
 */
export const CircleReveal: React.FC<{
  startFrame: number;
  duration: number;
  type?: 'expand' | 'contract';
}> = ({ startFrame, duration, type = 'expand' }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0 || relativeFrame > duration) {
    return null;
  }

  const progress = interpolate(relativeFrame, [0, duration], [0, 1]);
  const maxRadius = Math.sqrt(1920 * 1920 + 1080 * 1080) / 2;
  const radius = type === 'expand'
    ? progress * maxRadius
    : maxRadius - progress * maxRadius;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
      }}
    >
      <svg width="1920" height="1080">
        <defs>
          <mask id="circleMask">
            <rect width="1920" height="1080" fill="white" />
            <circle cx="960" cy="540" r={radius} fill="black" />
          </mask>
        </defs>
        <rect
          width="1920"
          height="1080"
          fill={colors.neutral.dark}
          mask="url(#circleMask)"
        />
      </svg>
    </AbsoluteFill>
  );
};
