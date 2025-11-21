import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';

// Simple CAP Property Card
const CAPProperty = ({
  letter,
  name,
  description,
  color,
  delay = 0,
}: {
  letter: string;
  name: string;
  description: string;
  color: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        padding: '35px 45px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 15,
        border: `4px solid ${color}`,
        transform: `scale(${scale})`,
        minWidth: 420,
        maxWidth: 420,
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: `${color}30`,
          border: `4px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...fontPresets.heading,
          fontSize: 65,
          color,
        }}
      >
        {letter}
      </div>
      <div style={{ ...fontPresets.heading, fontSize: 42, color }}>
        {name}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 26, color: colors.neutral.white, textAlign: 'center', opacity: 0.9 }}>
        {description}
      </div>
    </div>
  );
};

// Example Card
const ExampleCard = ({
  title,
  picks,
  example,
  color,
  delay = 0,
}: {
  title: string;
  picks: string;
  example: string;
  color: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        padding: '35px 45px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 15,
        border: `4px solid ${color}`,
        transform: `scale(${spring({ frame: frame - delay, fps, from: 0, to: 1, config: { damping: 15 } })})`,
        minWidth: 550,
        maxWidth: 550,
      }}
    >
      <div style={{ ...fontPresets.heading, fontSize: 48, color }}>
        {title}
      </div>
      <div style={{ ...fontPresets.heading, fontSize: 36, color: colors.accent.green }}>
        {picks}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 28, color: colors.neutral.white, opacity: 0.9 }}>
        {example}
      </div>
    </div>
  );
};

const Title = ({ text, delay = 0, size = 75 }: { text: string; delay?: number; size?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: size,
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

export const Scene3_CAPTheorem: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* PART 1: Introduction (0-450 frames / 0-15 seconds) */}
      <Sequence from={0} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 50,
            padding: '100px 80px',
          }}
        >
          <Title text="CAP Theorem" delay={0} size={90} />
          <div style={{ ...fontPresets.body, fontSize: 38, color: colors.neutral.white, textAlign: 'center', maxWidth: 900, opacity: 0.9 }}>
            In distributed systems, you can only guarantee 2 out of 3 properties
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: The Three Properties (450-1350 frames / 15-45 seconds) */}
      <Sequence from={450} durationInFrames={900}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px 100px 80px 100px',
          }}
        >
          {/* Header - Always at top */}
          <div style={{ marginBottom: 80 }}>
            <Title text="The 3 Properties" delay={0} size={75} />
          </div>

          {/* Content - Uses remaining vertical space */}
          <div style={{ display: 'flex', gap: 50, justifyContent: 'center', alignItems: 'flex-start', flex: 1 }}>
            <CAPProperty
              letter="C"
              name="Consistency"
              description="All nodes see the same data at the same time"
              color={colors.primary.blue}
              delay={40}
            />
            <CAPProperty
              letter="A"
              name="Availability"
              description="Every request gets a response (success or failure)"
              color={colors.accent.green}
              delay={80}
            />
            <CAPProperty
              letter="P"
              name="Partition Tolerance"
              description="System works despite network failures"
              color={colors.primary.purple}
              delay={120}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 3: The Trade-off (1350-1800 frames / 45-60 seconds) */}
      <Sequence from={1350} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
            padding: '100px 80px',
          }}
        >
          <Title text="Pick Any 2" delay={0} size={85} />
          <div style={{ ...fontPresets.body, fontSize: 36, color: colors.neutral.white, textAlign: 'center', maxWidth: 1000, opacity: 0.9 }}>
            With network partitions (P is required), you must choose between Consistency (C) or Availability (A)
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 4: Real Examples (1800-2700 frames / 60-90 seconds) */}
      <Sequence from={1800} durationInFrames={900}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px 100px 80px 100px',
          }}
        >
          {/* Header - Always at top */}
          <div style={{ marginBottom: 80 }}>
            <Title text="Real-World Examples" delay={0} size={75} />
          </div>

          {/* Content - Uses remaining vertical space */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60, justifyContent: 'center', flex: 1 }}>
            <ExampleCard
              title="CP System"
              picks="Consistency + Partition Tolerance"
              example="Banking (PostgreSQL, MongoDB) - Sacrifices availability during network partitions to ensure data consistency"
              color={colors.primary.blue}
              delay={40}
            />
            <ExampleCard
              title="AP System"
              picks="Availability + Partition Tolerance"
              example="Social Media (Cassandra, DynamoDB) - Always available but data may be temporarily inconsistent"
              color={colors.accent.green}
              delay={100}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
