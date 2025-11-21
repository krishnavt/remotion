import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../utils/colors';

/**
 * Animated gradient background that slowly shifts colors
 */
export const AnimatedBackground: React.FC<{
  colorStart?: string;
  colorEnd?: string;
  speed?: number;
}> = ({
  colorStart = colors.neutral.dark,
  colorEnd = colors.neutral.medium,
  speed = 0.5,
}) => {
  const frame = useCurrentFrame();

  // Slowly animate gradient position
  const gradientPosition = interpolate(
    frame,
    [0, 300],
    [0, 100],
    {
      extrapolateRight: 'wrap',
    }
  ) * speed;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientPosition}deg, ${colorStart} 0%, ${colorEnd} 100%)`,
      }}
    />
  );
};

/**
 * Floating particles background effect
 */
export const ParticleBackground: React.FC<{
  particleCount?: number;
  particleColor?: string;
}> = ({
  particleCount = 20,
  particleColor = `${colors.primary.blue}20`,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const offset = i * 123; // Different offset for each particle
    const x = interpolate(
      (frame + offset) % 600,
      [0, 600],
      [0, 1920],
    );
    const y = interpolate(
      (frame + offset * 2) % 800,
      [0, 800],
      [0, 1080],
    );
    const size = 2 + (i % 5);

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size}
        fill={particleColor}
        opacity={0.6}
      />
    );
  });

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080">
        {particles}
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Subtle grid background
 */
export const GridBackground: React.FC<{
  gridColor?: string;
  gridSize?: number;
}> = ({
  gridColor = `${colors.neutral.light}10`,
  gridSize = 50,
}) => {
  return (
    <AbsoluteFill>
      <svg width="1920" height="1080">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </AbsoluteFill>
  );
};
