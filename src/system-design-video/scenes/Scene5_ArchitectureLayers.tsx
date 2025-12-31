import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';
import { AnimatedBackground, GridBackground } from './components/AnimatedBackground';
import { FadeTransition } from './components/Transitions';

// Layer Component - Redesigned for better spacing
const Layer = ({
  number,
  title,
  icon: Icon,
  examples,
  color,
  delay = 0,
}: {
  number: number;
  title: string;
  icon: React.ComponentType<any>;
  examples: string[];
  color: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    from: 100,
    to: 0,
    config: { damping: 20 },
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: 60,
        alignItems: 'center',
        opacity,
        transform: `translateY(${slideIn}px)`,
      }}
    >
      {/* Layer Box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 60,
          padding: '50px 90px',
          background: `${colors.neutral.medium}DD`,
          borderRadius: 30,
          border: `4px solid ${color}`,
          minWidth: 900,
        }}
      >
        <Icon size={140} color={color} />
        <div>
          <div style={{ ...fontPresets.body, fontSize: 44, color: colors.neutral.gray, marginBottom: 5 }}>
            Layer {number}
          </div>
          <div style={{ ...fontPresets.heading, fontSize: 84, color: colors.neutral.white }}>
            {title}
          </div>
        </div>
      </div>

      {/* Examples */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 30 }}>
        {examples.map((example, i) => (
          <div
            key={i}
            style={{
              ...fontPresets.body,
              fontSize: 48,
              color: colors.neutral.white,
              background: `${color}25`,
              padding: '24px 48px',
              borderRadius: 16,
              border: `2px solid ${color}`,
              opacity: spring({
                frame: frame - delay - 25 - i * 10,
                fps,
                config: { damping: 100 },
              }),
            }}
          >
            {example}
          </div>
        ))}
      </div>
    </div>
  );
};

// Flow Layer - For request flow animation
const FlowLayer = ({
  title,
  icon: Icon,
  color,
  delay = 0,
  showArrow = true,
}: {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  delay?: number;
  showArrow?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, opacity }}>
      {/* Layer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 50,
          padding: '40px 120px',
          background: `${colors.neutral.medium}DD`,
          borderRadius: 24,
          border: `4px solid ${color}`,
          minWidth: 1000,
        }}
      >
        <Icon size={120} color={color} />
        <div style={{ ...fontPresets.heading, fontSize: 80, color: colors.neutral.white }}>
          {title}
        </div>
      </div>

      {/* Arrow */}
      {showArrow && (
        <div
          style={{
            fontSize: 140,
            color: colors.accent.green,
            opacity: spring({
              frame: frame - delay - 20,
              fps,
              config: { damping: 100 },
            }),
          }}
        >
          ↓
        </div>
      )}
    </div>
  );
};

// Icons
const ClientIcon = ({ size = 70, color = colors.primary.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="2.5" fill={color} opacity="0.2"/>
    <path d="M2 7h20" stroke={color} strokeWidth="2.5"/>
    <rect x="6" y="10" width="12" height="5" rx="1" stroke={color} strokeWidth="2"/>
  </svg>
);

const CDNIcon = ({ size = 70, color = colors.accent.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" fill={color} opacity="0.2"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2.5"/>
    <circle cx="12" cy="12" r="2.5" fill={color}/>
    <line x1="12" y1="2" x2="12" y2="7" stroke={color} strokeWidth="2.5"/>
    <line x1="12" y1="17" x2="12" y2="22" stroke={color} strokeWidth="2.5"/>
  </svg>
);

const ServiceIcon = ({ size = 70, color = colors.primary.purple }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
  </svg>
);

const DataIcon = ({ size = 70, color = colors.accent.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="9" ry="3" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <path d="M3 6v6c0 1.657 4.03 3 9 3s9-1.343 9-3V6" stroke={color} strokeWidth="2.5"/>
    <path d="M3 12v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6" stroke={color} strokeWidth="2.5"/>
  </svg>
);

const Title = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: 170,
        background: createGradient(colors.primary.blue, colors.accent.green),
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

export const Scene5_ArchitectureLayers: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      <AnimatedBackground speed={0.35} colorStart={colors.neutral.dark} colorEnd={`${colors.accent.green}12`} />
      <GridBackground gridSize={80} gridColor={`${colors.neutral.light}06`} />

      {/* PART 1: Introduction (0-450 frames / 0-15 seconds) */}
      <Sequence from={0} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title text="Layered Architecture" delay={0} />
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 1 to Part 2 */}
      <Sequence from={420} durationInFrames={30}>
        <FadeTransition startFrame={420} duration={30} type="out" />
      </Sequence>

      {/* PART 2: Build layers (450-2700 frames / 15-90 seconds) */}
      <Sequence from={450} durationInFrames={2250}>
        <FadeTransition startFrame={450} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '160px 240px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Title text="4 Layers" delay={0} />
          </div>

          {/* All 4 Layers - evenly distributed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 130, flex: 1, justifyContent: 'center' }}>
            <Layer
              number={1}
              title="Client"
              icon={ClientIcon}
              examples={['Mobile', 'Web', 'IoT']}
              color={colors.primary.blue}
              delay={50}
            />
            <Layer
              number={2}
              title="Gateway"
              icon={CDNIcon}
              examples={['CDN', 'Load Balancer', 'API Gateway']}
              color={colors.accent.green}
              delay={200}
            />
            <Layer
              number={3}
              title="Service"
              icon={ServiceIcon}
              examples={['User Service', 'Product Service', 'Order Service']}
              color={colors.primary.purple}
              delay={350}
            />
            <Layer
              number={4}
              title="Data"
              icon={DataIcon}
              examples={['Database', 'Cache', 'Queue']}
              color={colors.accent.gold}
              delay={500}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 2 to Part 3 */}
      <Sequence from={2670} durationInFrames={30}>
        <FadeTransition startFrame={2670} duration={30} type="out" />
      </Sequence>

      {/* PART 3: Request flow (2700-3600 frames / 90-120 seconds) */}
      <Sequence from={2700} durationInFrames={900}>
        <FadeTransition startFrame={2700} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '160px 240px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Title text="Request Flow" delay={0} />
          </div>

          {/* Flow - evenly distributed */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
            <FlowLayer title="Client" icon={ClientIcon} color={colors.primary.blue} delay={30} />
            <FlowLayer title="Gateway" icon={CDNIcon} color={colors.accent.green} delay={60} />
            <FlowLayer title="Service" icon={ServiceIcon} color={colors.primary.purple} delay={90} />
            <FlowLayer title="Data" icon={DataIcon} color={colors.accent.gold} delay={120} showArrow={false} />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
