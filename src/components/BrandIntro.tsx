import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from '../utils/colors';
import { fontPresets } from '../utils/fonts';

/**
 * Animated logo component - simple geometric design
 */
const AnimatedLogo = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const rotate = interpolate(
    frame - delay,
    [0, 60],
    [0, 360],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'relative',
        width: 200,
        height: 200,
        transform: `scale(${scale})`,
      }}
    >
      {/* Outer ring */}
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={colors.primary.blue}
          strokeWidth="4"
          opacity={spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          })}
        />

        {/* Inner geometric shape */}
        <g transform={`rotate(${rotate} 100 100)`}>
          <path
            d="M 100 40 L 140 80 L 140 120 L 100 160 L 60 120 L 60 80 Z"
            fill={`${colors.primary.purple}40`}
            stroke={colors.primary.purple}
            strokeWidth="3"
            opacity={spring({
              frame: frame - delay - 15,
              fps,
              config: { damping: 100 },
            })}
          />
        </g>

        {/* Center dot */}
        <circle
          cx="100"
          cy="100"
          r="12"
          fill={colors.accent.green}
          opacity={spring({
            frame: frame - delay - 30,
            fps,
            config: { damping: 100 },
          })}
        />
      </svg>
    </div>
  );
};

/**
 * Brand name with gradient effect
 */
const BrandName = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const slideUp = spring({
    frame: frame - delay,
    fps,
    from: 50,
    to: 0,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: 85,
        background: createGradient(colors.primary.blue, colors.accent.green),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity,
        transform: `translateY(${slideUp}px)`,
        filter: 'drop-shadow(0 0 40px rgba(78, 205, 196, 0.6))',
        letterSpacing: '2px',
      }}
    >
      System Design
    </div>
  );
};

/**
 * Tagline with fade-in effect
 */
const Tagline = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div
      style={{
        ...fontPresets.body,
        fontSize: 32,
        color: colors.neutral.white,
        opacity: opacity * 0.9,
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}
    >
      Building Scalable Systems
    </div>
  );
};

/**
 * Floating particles for visual interest
 */
const BrandParticles = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 300 + (i % 3) * 50;
    const x = 960 + Math.cos(angle) * distance;
    const y = 540 + Math.sin(angle) * distance;
    const size = 3 + (i % 3);

    const particleScale = spring({
      frame: frame - delay - i * 3,
      fps,
      from: 0,
      to: 1,
      config: { damping: 15 },
    });

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={size * particleScale}
        fill={i % 2 === 0 ? colors.primary.blue : colors.primary.purple}
        opacity={opacity * 0.6}
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
 * Main BrandIntro component
 * Duration: 150 frames (5 seconds at 30fps)
 */
export const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [120, 150],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        background: `linear-gradient(135deg, ${colors.neutral.dark} 0%, ${colors.neutral.medium} 100%)`,
        fontFamily: fontPresets.body.fontFamily,
        opacity: fadeOut,
      }}
    >
      {/* Floating particles */}
      <BrandParticles delay={20} />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <AnimatedLogo delay={10} />
        <BrandName delay={45} />
        <Tagline delay={75} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
