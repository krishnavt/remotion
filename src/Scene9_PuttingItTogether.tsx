import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';

// Concept Badge
const ConceptBadge = ({
  label,
  icon,
  color,
  delay = 0,
  position,
}: {
  label: string;
  icon: string;
  color: string;
  delay?: number;
  position: { x: number; y: number };
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
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          padding: '15px 25px',
          background: `${color}30`,
          border: `2px solid ${color}`,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 35 }}>{icon}</div>
        <div style={{ ...fontPresets.heading, fontSize: 26, color }}>
          {label}
        </div>
      </div>
    </div>
  );
};

// Architecture Stack Visualization
const ArchitectureStack = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layers = [
    { label: 'Users', icon: '👥', color: colors.primary.blue, items: ['Mobile', 'Web'] },
    { label: 'CDN + LB', icon: '🌐', color: colors.accent.green, items: ['CloudFlare', 'AWS ELB'] },
    { label: 'App Servers', icon: '⚙️', color: colors.primary.purple, items: ['Node.js', 'Redis Cache'] },
    { label: 'Message Queue', icon: '📬', color: colors.accent.orange, items: ['RabbitMQ', 'Kafka'] },
    { label: 'Database', icon: '💾', color: colors.accent.gold, items: ['PostgreSQL', 'MongoDB'] },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
        opacity: spring({ frame: frame - delay, fps, config: { damping: 100 } }),
      }}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '18px 30px',
            background: `${colors.neutral.medium}DD`,
            borderRadius: 12,
            border: `3px solid ${layer.color}`,
            minWidth: 700,
            transform: `translateX(${spring({
              frame: frame - delay - i * 15,
              fps,
              from: -200,
              to: 0,
              config: { damping: 18 },
            })}px)`,
          }}
        >
          <div style={{ fontSize: 50 }}>{layer.icon}</div>
          <div style={{ ...fontPresets.heading, fontSize: 32, color: layer.color, minWidth: 180 }}>
            {layer.label}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {layer.items.map((item, j) => (
              <div
                key={j}
                style={{
                  ...fontPresets.body,
                  fontSize: 20,
                  color: colors.neutral.white,
                  background: `${layer.color}30`,
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: `2px solid ${layer.color}`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Example App Flow
const ExampleFlow = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { text: 'User uploads photo', icon: '📸', color: colors.primary.blue },
    { text: 'CDN serves static assets', icon: '⚡', color: colors.accent.green },
    { text: 'App checks cache first', icon: '🔍', color: colors.primary.purple },
    { text: 'Queue processes image', icon: '📬', color: colors.accent.orange },
    { text: 'Store in database', icon: '💾', color: colors.accent.gold },
    { text: 'Real-time notification', icon: '🔔', color: colors.primary.blue },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        maxWidth: 800,
      }}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '16px 25px',
            background: `${colors.neutral.medium}DD`,
            borderRadius: 10,
            border: `2px solid ${step.color}`,
            opacity: spring({
              frame: frame - delay - i * 15,
              fps,
              config: { damping: 100 },
            }),
            transform: `translateX(${spring({
              frame: frame - delay - i * 15,
              fps,
              from: -150,
              to: 0,
              config: { damping: 18 },
            })}px)`,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              background: `${step.color}40`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
            }}
          >
            {step.icon}
          </div>
          <div style={{ ...fontPresets.body, fontSize: 26, color: colors.neutral.white }}>
            {step.text}
          </div>
        </div>
      ))}
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

// Main Scene 9
export const Scene9_PuttingItTogether: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* PART 1: Recap (0-900 frames / 0-30 seconds) */}
      <Sequence from={0} durationInFrames={900}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 60px',
          }}
        >
          <Title text="What We Covered" delay={0} />

          {/* Concept badges in a grid */}
          <div style={{ position: 'relative', width: 1000, height: 600, marginTop: 40 }}>
            <ConceptBadge label="CAP Theorem" icon="△" color={colors.primary.blue} delay={30} position={{ x: 100, y: 50 }} />
            <ConceptBadge label="Scaling" icon="📈" color={colors.accent.green} delay={50} position={{ x: 520, y: 50 }} />
            <ConceptBadge label="Architecture" icon="🏗️" color={colors.primary.purple} delay={70} position={{ x: 100, y: 180 }} />
            <ConceptBadge label="Databases" icon="💾" color={colors.accent.gold} delay={90} position={{ x: 520, y: 180 }} />
            <ConceptBadge label="Caching" icon="⚡" color={colors.accent.orange} delay={110} position={{ x: 100, y: 310 }} />
            <ConceptBadge label="Message Queues" icon="📬" color={colors.primary.blue} delay={130} position={{ x: 520, y: 310 }} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: Real Example - Architecture (900-1350 frames / 30-45 seconds) */}
      <Sequence from={900} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '80px 60px',
            gap: 40,
          }}
        >
          <Title text="Instagram-like App" delay={0} />
          <ArchitectureStack delay={30} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 3: Real Example - Flow (1350-1800 frames / 45-60 seconds) */}
      <Sequence from={1350} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '100px 120px',
          }}
        >
          <Title text="Photo Upload Flow" delay={0} />
          <ExampleFlow delay={30} />
          <div
            style={{
              ...fontPresets.body,
              fontSize: 30,
              color: colors.neutral.white,
              textAlign: 'center',
              maxWidth: 1000,
              opacity: spring({
                frame: useCurrentFrame() - 1380,
                fps: useVideoConfig().fps,
                config: { damping: 100 },
              }) * 0.85,
            }}
          >
            Combining these concepts creates robust, scalable systems that handle millions of users
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
