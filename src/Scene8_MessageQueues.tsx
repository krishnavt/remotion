import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';

// Message Queue Flow Component
const QueueFlow = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const producerScale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  const queueScale = spring({
    frame: frame - delay - 30,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  const consumerScale = spring({
    frame: frame - delay - 60,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  const arrowOpacity1 = spring({
    frame: frame - delay - 40,
    fps,
    config: { damping: 100 },
  });

  const arrowOpacity2 = spring({
    frame: frame - delay - 70,
    fps,
    config: { damping: 100 },
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
      {/* Producer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${producerScale})`,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            background: `${colors.primary.blue}30`,
            border: `3px solid ${colors.primary.blue}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 60,
          }}
        >
          📤
        </div>
        <div style={{ ...fontPresets.heading, fontSize: 32, color: colors.primary.blue }}>
          Producer
        </div>
        <div style={{ ...fontPresets.body, fontSize: 20, color: colors.neutral.white, opacity: 0.8 }}>
          Sends Message
        </div>
      </div>

      {/* Arrow 1 */}
      <div style={{ fontSize: 50, color: colors.accent.green, opacity: arrowOpacity1 }}>→</div>

      {/* Queue */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${queueScale})`,
        }}
      >
        <div
          style={{
            width: 200,
            height: 150,
            background: `${colors.accent.green}30`,
            border: `3px solid ${colors.accent.green}`,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 15,
          }}
        >
          <div style={{ fontSize: 50 }}>📬</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  background: colors.accent.green,
                  borderRadius: 6,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ ...fontPresets.heading, fontSize: 32, color: colors.accent.green }}>
          Queue
        </div>
        <div style={{ ...fontPresets.body, fontSize: 20, color: colors.neutral.white, opacity: 0.8 }}>
          Stores Messages
        </div>
      </div>

      {/* Arrow 2 */}
      <div style={{ fontSize: 50, color: colors.accent.green, opacity: arrowOpacity2 }}>→</div>

      {/* Consumer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          transform: `scale(${consumerScale})`,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            background: `${colors.primary.purple}30`,
            border: `3px solid ${colors.primary.purple}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 60,
          }}
        >
          ⚙️
        </div>
        <div style={{ ...fontPresets.heading, fontSize: 32, color: colors.primary.purple }}>
          Consumer
        </div>
        <div style={{ ...fontPresets.body, fontSize: 20, color: colors.neutral.white, opacity: 0.8 }}>
          Processes Message
        </div>
      </div>
    </div>
  );
};

// Use Case Card
const UseCaseCard = ({
  icon,
  title,
  description,
  color,
  delay = 0,
}: {
  icon: string;
  title: string;
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
        gap: 15,
        padding: '30px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 15,
        border: `3px solid ${color}`,
        transform: `scale(${scale})`,
        maxWidth: 320,
        minHeight: 240,
      }}
    >
      <div style={{ fontSize: 70 }}>{icon}</div>
      <div style={{ ...fontPresets.heading, fontSize: 34, color, textAlign: 'center' }}>
        {title}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 22, color: colors.neutral.white, opacity: 0.9, textAlign: 'center' }}>
        {description}
      </div>
    </div>
  );
};

// Sync vs Async comparison
const SyncVsAsync = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', gap: 80, opacity: spring({ frame: frame - delay, fps, config: { damping: 100 } }) }}>
      {/* Synchronous - Slow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            padding: '25px 40px',
            background: `${colors.accent.orange}30`,
            border: `3px solid ${colors.accent.orange}`,
            borderRadius: 12,
            transform: `scale(${spring({ frame: frame - delay - 20, fps, from: 0, to: 1, config: { damping: 15 } })})`,
          }}
        >
          <div style={{ ...fontPresets.heading, fontSize: 38, color: colors.accent.orange, textAlign: 'center' }}>
            Synchronous
          </div>
          <div style={{ ...fontPresets.body, fontSize: 24, color: colors.neutral.white, marginTop: 15, textAlign: 'center' }}>
            Request → Wait → Response
          </div>
          <div style={{ ...fontPresets.body, fontSize: 28, color: colors.accent.orange, marginTop: 20, textAlign: 'center' }}>
            ⏱️ User waits
          </div>
        </div>
      </div>

      {/* Asynchronous - Fast */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            padding: '25px 40px',
            background: `${colors.accent.green}30`,
            border: `3px solid ${colors.accent.green}`,
            borderRadius: 12,
            transform: `scale(${spring({ frame: frame - delay - 40, fps, from: 0, to: 1, config: { damping: 15 } })})`,
          }}
        >
          <div style={{ ...fontPresets.heading, fontSize: 38, color: colors.accent.green, textAlign: 'center' }}>
            Asynchronous
          </div>
          <div style={{ ...fontPresets.body, fontSize: 24, color: colors.neutral.white, marginTop: 15, textAlign: 'center' }}>
            Request → Queue → Continue
          </div>
          <div style={{ ...fontPresets.body, fontSize: 28, color: colors.accent.green, marginTop: 20, textAlign: 'center' }}>
            ✓ Instant response
          </div>
        </div>
      </div>
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
        fontSize: 70,
        background: createGradient(colors.primary.purple, colors.accent.green),
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

// Main Scene 8
export const Scene8_MessageQueues: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* PART 1: Why Async? (0-750 frames / 0-25 seconds) */}
      <Sequence from={0} durationInFrames={750}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
            padding: '80px 60px',
          }}
        >
          <Title text="Asynchronous Processing" delay={0} />
          <SyncVsAsync delay={40} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: Message Queue Basics (750-1650 frames / 25-55 seconds) */}
      <Sequence from={750} durationInFrames={900}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
            padding: '80px 60px',
          }}
        >
          <Title text="Message Queue Flow" delay={0} />
          <QueueFlow delay={40} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 3: Use Cases (1650-2700 frames / 55-90 seconds) */}
      <Sequence from={1650} durationInFrames={1050}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '80px 60px',
            gap: 50,
          }}
        >
          <Title text="Common Use Cases" delay={0} />

          <div style={{ display: 'flex', gap: 40, marginTop: 30, justifyContent: 'center' }}>
            <UseCaseCard
              icon="✉️"
              title="Email Sending"
              description="Queue emails to send in background"
              color={colors.primary.blue}
              delay={40}
            />
            <UseCaseCard
              icon="🎥"
              title="Video Processing"
              description="Transcode videos asynchronously"
              color={colors.accent.green}
              delay={80}
            />
            <UseCaseCard
              icon="🛒"
              title="Order Processing"
              description="Handle orders without blocking"
              color={colors.accent.orange}
              delay={120}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
