import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';

// Takeaway Card
const TakeawayCard = ({
  text,
  delay = 0,
  index,
}: {
  text: string;
  delay?: number;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    from: -200,
    to: 0,
    config: { damping: 18 },
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const gradients = [
    createGradient(colors.primary.blue, colors.accent.green),
    createGradient(colors.accent.green, colors.primary.purple),
    createGradient(colors.primary.purple, colors.accent.orange),
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        padding: '40px 70px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 24,
        border: `3px solid ${colors.accent.green}`,
        transform: `translateX(${slideIn}px)`,
        opacity,
        minWidth: 1400,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          background: gradients[index % 3],
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...fontPresets.heading,
          fontSize: 56,
          color: colors.neutral.white,
        }}
      >
        {index + 1}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 56, color: colors.neutral.white }}>
        {text}
      </div>
    </div>
  );
};

// CTA Button
const CTAButton = ({
  icon,
  text,
  color,
  delay = 0,
  position = 'center',
}: {
  icon: string;
  text: string;
  color: string;
  delay?: number;
  position?: 'left' | 'center' | 'right';
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const pulse = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.05, 1]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        transform: `scale(${scale * (frame > delay + 60 ? pulse : 1)})`,
      }}
    >
      <div
        style={{
          padding: '50px 90px',
          background: `${color}30`,
          border: `4px solid ${color}`,
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: 100 }}>{icon}</div>
        <div style={{ ...fontPresets.heading, fontSize: 72, color }}>
          {text}
        </div>
      </div>
    </div>
  );
};

// Animated Thank You
const ThankYou = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const rotation = interpolate(
    frame,
    [delay, delay + 30],
    [0, 5],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: 180,
        background: createGradient(colors.primary.blue, colors.accent.green, colors.primary.purple),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        textAlign: 'center',
      }}
    >
      Thank You!
    </div>
  );
};

const Title = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: 140,
        background: createGradient(colors.primary.blue, colors.primary.purple),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity: spring({ frame: frame - delay, fps, config: { damping: 100 } }),
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};

// Main Scene 10
export const Scene10_Outro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* PART 1: Key Takeaways (0-450 frames / 0-15 seconds) */}
      <Sequence from={0} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 100,
            padding: '160px 120px',
          }}
        >
          <Title text="Key Takeaways" delay={0} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 20 }}>
            <TakeawayCard
              text="Design for scale, performance, and reliability"
              delay={30}
              index={0}
            />
            <TakeawayCard
              text="Choose the right database and caching strategy"
              delay={50}
              index={1}
            />
            <TakeawayCard
              text="Use async processing for better user experience"
              delay={70}
              index={2}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: Call to Action (450-900 frames / 15-30 seconds) */}
      <Sequence from={450} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 120,
            padding: '160px 120px',
          }}
        >
          <ThankYou delay={0} />

          <div style={{ display: 'flex', gap: 100, marginTop: 20 }}>
            <CTAButton
              icon="👍"
              text="Like"
              color={colors.primary.blue}
              delay={40}
            />
            <CTAButton
              icon="🔔"
              text="Subscribe"
              color={colors.accent.green}
              delay={60}
            />
            <CTAButton
              icon="💬"
              text="Comment"
              color={colors.primary.purple}
              delay={80}
            />
          </div>

          <div
            style={{
              ...fontPresets.body,
              fontSize: 64,
              color: colors.neutral.white,
              textAlign: 'center',
              marginTop: 30,
              opacity: spring({ frame: useCurrentFrame() - 120, fps: 30, config: { damping: 100 } }),
            }}
          >
            More system design content coming soon!
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
