import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';
import { AnimatedBackground, GridBackground } from './components/AnimatedBackground';
import { FadeTransition, ZoomTransition } from './components/Transitions';

// Large icons for visual representation
const UserIconLarge = ({ size = 150, color = colors.primary.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="5" fill={color} opacity="0.3" stroke={color} strokeWidth="2"/>
    <path d="M3 20c0-5 4-8 9-8s9 3 9 8" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
  </svg>
);

const ServerIconLarge = ({ size = 150, color = colors.accent.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="5" rx="1" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <rect x="2" y="11" width="20" height="5" rx="1" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <rect x="2" y="18" width="20" height="2" rx="1" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <circle cx="6" cy="6.5" r="1.5" fill={color}/>
    <circle cx="6" cy="13.5" r="1.5" fill={color}/>
  </svg>
);

const DatabaseIconLarge = ({ size = 150, color = colors.primary.purple }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="9" ry="3" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <path d="M3 6v6c0 1.657 4.03 3 9 3s9-1.343 9-3V6" stroke={color} strokeWidth="2.5" fill={color} opacity="0.1"/>
    <path d="M3 12v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6" stroke={color} strokeWidth="2.5" fill={color} opacity="0.1"/>
  </svg>
);

// Simple clean arrow
const AnimatedArrow = ({ delay = 0, direction = 'right' }: { delay?: number; direction?: 'right' | 'down' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  // Animated dot traveling along arrow
  const dotProgress = ((frame - delay) % 60) / 60;

  if (direction === 'down') {
    return (
      <div style={{ opacity }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ overflow: 'visible' }}>
          <defs>
            <marker id={`arrowDown-${delay}`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill={colors.accent.gold} />
            </marker>
          </defs>
          <line
            x1="30"
            y1="5"
            x2="30"
            y2="55"
            stroke={colors.accent.gold}
            strokeWidth="3"
            markerEnd={`url(#arrowDown-${delay})`}
          />
          <circle
            cx="30"
            cy={5 + dotProgress * 50}
            r="3"
            fill={colors.accent.green}
          />
        </svg>
      </div>
    );
  }

  return (
    <div style={{ opacity }}>
      <svg width="100" height="40" viewBox="0 0 100 40" style={{ overflow: 'visible' }}>
        <defs>
          <marker id={`arrowRight-${delay}`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill={colors.accent.gold} />
          </marker>
        </defs>
        <line
          x1="5"
          y1="20"
          x2="95"
          y2="20"
          stroke={colors.accent.gold}
          strokeWidth="3"
          markerEnd={`url(#arrowRight-${delay})`}
        />
        <circle
          cx={5 + dotProgress * 90}
          cy="20"
          r="3"
          fill={colors.accent.green}
        />
      </svg>
    </div>
  );
};

// Operation icons with animated elements
const MovingDataIcon = ({ size = 160 }) => {
  const frame = useCurrentFrame();
  const offset = (frame % 40) / 40;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="3" fill={colors.primary.blue} opacity="0.8"/>
      <circle cx="18" cy="12" r="3" fill={colors.primary.blue} opacity="0.3"/>
      <path d="M9 12h6" stroke={colors.primary.blue} strokeWidth="3" strokeDasharray="2 2"/>
      <path d="M12 12l3-3M12 12l3 3" stroke={colors.primary.blue} strokeWidth="2.5"/>
      {/* Animated particle */}
      <circle cx={6 + offset * 12} cy="12" r="1.5" fill={colors.accent.gold} opacity={0.9}/>
    </svg>
  );
};

const StoringDataIcon = ({ size = 160 }) => {
  const frame = useCurrentFrame();
  const fillHeight = ((frame % 90) / 90) * 12;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke={colors.accent.green} strokeWidth="2.5" fill={colors.accent.green} opacity="0.2"/>
      <path d="M4 9h16M4 14h16" stroke={colors.accent.green} strokeWidth="2"/>
      <circle cx="8" cy="6.5" r="1" fill={colors.accent.green}/>
      <circle cx="8" cy="11.5" r="1" fill={colors.accent.green}/>
      <circle cx="8" cy="16.5" r="1" fill={colors.accent.green}/>
      {/* Animated fill */}
      <rect x="4" y={20 - fillHeight} width="16" height={fillHeight} fill={colors.accent.green} opacity="0.3"/>
    </svg>
  );
};

const TransformingDataIcon = ({ size = 160 }) => {
  const frame = useCurrentFrame();
  const rotation = (frame % 120) * 3;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="6" height="8" rx="1" fill={colors.primary.purple} opacity="0.3" stroke={colors.primary.purple} strokeWidth="2"/>
      <rect x="15" y="8" width="6" height="8" rx="1" fill={colors.accent.gold} opacity="0.3" stroke={colors.accent.gold} strokeWidth="2"/>
      <path d="M9 12h6" stroke={colors.neutral.white} strokeWidth="2.5"/>
      <g transform={`rotate(${rotation} 12 12)`}>
        <circle cx="12" cy="12" r="2.5" fill={colors.neutral.white}/>
        <path d="M12 9.5v5M9.5 12h5" stroke={colors.neutral.dark} strokeWidth="1.5"/>
      </g>
    </svg>
  );
};

// Example use case cards for operations
const UseCaseTag = ({ text, delay = 0, color }: { text: string; delay?: number; color: string }) => {
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
        transform: `scale(${scale})`,
        padding: '8px 16px',
        background: `${color}20`,
        border: `2px solid ${color}`,
        borderRadius: 8,
        ...fontPresets.body,
        fontSize: 18,
        color: colors.neutral.white,
      }}
    >
      {text}
    </div>
  );
};

const AssetBadge = ({
  label,
  Icon,
  delay = 0,
  color,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
  delay?: number;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 80 },
  });

  const rise = spring({
    frame: frame - delay,
    fps,
    from: 20,
    to: 0,
    config: { damping: 14 },
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 22px',
        borderRadius: 16,
        border: `2px solid ${color}60`,
        background: `${color}12`,
        transform: `translateY(${rise}px)`,
        opacity,
      }}
    >
      <Icon size={58} />
      <div
        style={{
          ...fontPresets.body,
          fontSize: 26,
          color: colors.neutral.white,
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Title with enhanced animation
const Title = ({ text, delay = 0, size = 80 }: { text: string; delay?: number; size?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 12 },
  });

  const slideUp = spring({
    frame: frame - delay,
    fps,
    from: 30,
    to: 0,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: size,
        background: createGradient(colors.primary.blue, colors.accent.green),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity,
        transform: `scale(${scale}) translateY(${slideUp}px)`,
        filter: 'drop-shadow(0 0 30px rgba(78, 205, 196, 0.5))',
      }}
    >
      {text}
    </div>
  );
};

// Label text with bounce
const Label = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const bounce = spring({
    frame: frame - delay,
    fps,
    from: 20,
    to: 0,
    config: { damping: 10 },
  });

  return (
    <div
      style={{
        ...fontPresets.body,
        fontSize: 42,
        color: colors.neutral.white,
        opacity: opacity * 0.9,
        transform: `translateY(${bounce}px)`,
      }}
    >
      {text}
    </div>
  );
};

// Operation card with rotation effect
const OperationCard = ({
  Icon,
  title,
  delay = 0,
}: {
  Icon: React.ComponentType<any>;
  title: string;
  delay?: number;
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

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const rotateY = spring({
    frame: frame - delay,
    fps,
    from: 90,
    to: 0,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 25,
        padding: '45px 55px',
        background: `${colors.neutral.medium}CC`,
        borderRadius: 20,
        border: `3px solid ${colors.neutral.light}`,
        transform: `scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        minWidth: 320,
      }}
    >
      <Icon size={160} />
      <div
        style={{
          ...fontPresets.heading,
          fontSize: 48,
          color: colors.neutral.white,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Stat card with counter animation
const StatCard = ({
  value,
  label,
  color,
  delay = 0,
}: {
  value: string;
  label: string;
  color: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.8,
    to: 1,
    config: { damping: 12 },
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div
      style={{
        textAlign: 'center',
        transform: `scale(${scale})`,
        opacity,
        padding: '20px 30px',
        background: `${color}15`,
        borderRadius: 12,
        border: `2px solid ${color}40`,
      }}
    >
      <div style={{ ...fontPresets.heading, fontSize: 54, color }}>
        {value}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 26, color: colors.neutral.white, opacity: 0.85, marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
};

// Performance indicator
const PerformanceBar = ({ value, label, delay = 0, color }: { value: number; label: string; delay?: number; color: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: value,
    config: { damping: 20 },
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div style={{ opacity, display: 'flex', alignItems: 'center', gap: 15, minWidth: 200 }}>
      <div style={{ ...fontPresets.body, fontSize: 20, color: colors.neutral.white, minWidth: 90 }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 8, background: `${colors.neutral.light}20`, borderRadius: 4, overflow: 'hidden' }}>
        <div
          style={{
            width: `${width}%`,
            height: '100%',
            background: color,
            borderRadius: 4,
          }}
        />
      </div>
      <div style={{ ...fontPresets.body, fontSize: 18, color, minWidth: 40 }}>
        {Math.round(width)}%
      </div>
    </div>
  );
};

// Architecture layer with improved spacing
const ArchitectureLayer = ({
  label,
  icon: Icon,
  delay = 0,
  metrics,
  compact = false,
  style = {},
}: {
  label: string;
  icon: React.ComponentType<any>;
  delay?: number;
  metrics?: { label: string; value: number; color: string }[];
  compact?: boolean;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    from: -300,
    to: 0,
    config: { damping: 18 },
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div
      style={{
        transform: `translateX(${slideIn}px)`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 24 : 30,
        background: `${colors.neutral.medium}DD`,
        padding: compact ? '18px 40px' : '22px 45px',
        borderRadius: 15,
        border: `3px solid ${colors.primary.blue}`,
        minWidth: compact ? 260 : 700,
        flex: compact ? 1 : undefined,
        width: compact ? '100%' : undefined,
        maxWidth: compact ? 400 : undefined,
        ...style,
      }}
    >
      <Icon size={compact ? 65 : 75} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            ...fontPresets.body,
            fontSize: compact ? 32 : 36,
            color: colors.neutral.white,
            marginBottom: metrics ? 12 : 0,
          }}
        >
          {label}
        </div>
        {metrics && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {metrics.map((metric, i) => (
              <PerformanceBar
                key={i}
                label={metric.label}
                value={metric.value}
                color={metric.color}
                delay={delay + 40 + i * 15}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Additional icons for architecture layers
const NetworkIconLarge = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="6" r="3" fill={colors.accent.gold} opacity="0.8"/>
    <circle cx="6" cy="18" r="2.5" fill={colors.accent.gold} opacity="0.6"/>
    <circle cx="12" cy="18" r="2.5" fill={colors.accent.gold} opacity="0.6"/>
    <circle cx="18" cy="18" r="2.5" fill={colors.accent.gold} opacity="0.6"/>
    <line x1="12" y1="9" x2="6" y2="15.5" stroke={colors.accent.gold} strokeWidth="2"/>
    <line x1="12" y1="9" x2="12" y2="15.5" stroke={colors.accent.gold} strokeWidth="2"/>
    <line x1="12" y1="9" x2="18" y2="15.5" stroke={colors.accent.gold} strokeWidth="2"/>
  </svg>
);

const StorageIcon = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="6" width="16" height="12" rx="2" stroke={colors.primary.blue} strokeWidth="2.5" fill={colors.primary.blue} opacity="0.3"/>
    <path d="M4 10h16M4 14h16" stroke={colors.primary.blue} strokeWidth="2"/>
    <circle cx="7" cy="8" r="1" fill={colors.primary.blue}/>
    <circle cx="7" cy="12" r="1" fill={colors.primary.blue}/>
    <circle cx="7" cy="16" r="1" fill={colors.primary.blue}/>
  </svg>
);

// Main Scene 2 component
export const Scene2_BigPicture: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* Animated backgrounds */}
      <AnimatedBackground speed={0.3} />
      <GridBackground gridSize={60} gridColor={`${colors.neutral.light}08`} />

      {/* PART 1: User → Server → Database flow (0-450 frames / 0-15 seconds) */}
      <Sequence from={0} durationInFrames={450}>
        <ZoomTransition startFrame={0} duration={35} type="in">
          <AbsoluteFill
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '90px 120px',
            }}
          >
            <Title text="The Data Journey" delay={0} size={85} />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 50,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <UserIconLarge size={145} />
                <Label text="User" delay={25} />
              </div>

              <AnimatedArrow delay={35} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <ServerIconLarge size={145} />
                <Label text="Server" delay={55} />
              </div>

              <AnimatedArrow delay={75} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <DatabaseIconLarge size={145} />
                <Label text="Database" delay={95} />
              </div>
            </div>

            {/* Stats row with enhanced spacing */}
            <div
              style={{
                display: 'flex',
                gap: 70,
              }}
            >
              <StatCard value="~100ms" label="Typical Round Trip" color={colors.accent.green} delay={180} />
              <StatCard value="3 Hops" label="User to Data" color={colors.primary.blue} delay={200} />
              <StatCard value="Billions" label="Requests Daily" color={colors.primary.purple} delay={220} />
            </div>
          </AbsoluteFill>
        </ZoomTransition>
      </Sequence>

      {/* Transition: Part 1 to Part 2 */}
      <Sequence from={420} durationInFrames={30}>
        <FadeTransition startFrame={420} duration={30} type="out" />
      </Sequence>

      {/* PART 2: Three fundamental operations (450-1200 frames / 15-40 seconds) */}
      <Sequence from={450} durationInFrames={750}>
        <FadeTransition startFrame={450} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '80px 100px',
          }}
        >
          <Title text="Three Core Operations" delay={0} size={80} />

          {/* Operation cards with examples */}
          <div
            style={{
              display: 'flex',
              gap: 50,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <OperationCard Icon={MovingDataIcon} title="Moving" delay={35} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                <UseCaseTag text="HTTP/REST" delay={120} color={colors.primary.blue} />
                <UseCaseTag text="WebSockets" delay={140} color={colors.primary.blue} />
                <UseCaseTag text="Message Queues" delay={160} color={colors.primary.blue} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <OperationCard Icon={StoringDataIcon} title="Storing" delay={65} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                <UseCaseTag text="Databases" delay={150} color={colors.accent.green} />
                <UseCaseTag text="File Systems" delay={170} color={colors.accent.green} />
                <UseCaseTag text="Caches" delay={190} color={colors.accent.green} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <OperationCard Icon={TransformingDataIcon} title="Transforming" delay={95} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                <UseCaseTag text="Data Processing" delay={180} color={colors.primary.purple} />
                <UseCaseTag text="Encryption" delay={200} color={colors.primary.purple} />
                <UseCaseTag text="Compression" delay={220} color={colors.primary.purple} />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 30,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 24,
              width: '100%',
            }}
          >
            <AssetBadge label="Streaming Pipelines" Icon={TransformingDataIcon} delay={240} color={colors.primary.purple} />
            <AssetBadge label="Realtime Dashboards" Icon={MovingDataIcon} delay={255} color={colors.primary.blue} />
            <AssetBadge label="Data Lakes" Icon={StoringDataIcon} delay={270} color={colors.accent.green} />
            <AssetBadge label="ML Feature Stores" Icon={DatabaseIconLarge} delay={285} color={colors.accent.gold} />
          </div>

          {/* Bottom text with better spacing */}
          <div
            style={{
              ...fontPresets.body,
              fontSize: 29,
              color: colors.neutral.white,
              textAlign: 'center',
              maxWidth: 1150,
              lineHeight: 1.5,
              opacity: spring({
                frame: useCurrentFrame() - 250,
                fps,
                config: { damping: 100 },
              }) * 0.88,
            }}
          >
            Every system design challenge revolves around optimizing these three fundamental operations
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 2 to Part 3 */}
      <Sequence from={1170} durationInFrames={30}>
        <FadeTransition startFrame={1170} duration={30} type="out" />
      </Sequence>

      {/* PART 3: Layer-by-layer architecture (1200-1800 frames / 40-60 seconds) */}
      <Sequence from={1200} durationInFrames={600}>
        <FadeTransition startFrame={1200} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px 100px',
          }}
        >
          <Title text="At Scale" delay={0} size={80} />

          {/* Architecture stack with metrics */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'stretch',
              justifyContent: 'center',
              flexWrap: 'nowrap',
              width: '100%',
              maxWidth: 1400,
            }}
          >
            <ArchitectureLayer
              label="Users (Millions)"
              icon={UserIconLarge}
              delay={50}
              compact
              metrics={[
                { label: 'Online', value: 85, color: colors.accent.green },
                { label: 'Active', value: 62, color: colors.primary.blue },
              ]}
            />

            <ArchitectureLayer
              label="Load Balancer"
              icon={NetworkIconLarge}
              delay={140}
              compact
              metrics={[
                { label: 'CPU', value: 45, color: colors.accent.gold },
                { label: 'Requests/s', value: 78, color: colors.primary.purple },
              ]}
            />

            <ArchitectureLayer
              label="Application Servers"
              icon={ServerIconLarge}
              delay={230}
              compact
              metrics={[
                { label: 'Load', value: 68, color: colors.accent.orange },
                { label: 'Memory', value: 55, color: colors.primary.blue },
              ]}
            />

            <ArchitectureLayer
              label="Cache + Database"
              icon={DatabaseIconLarge}
              delay={320}
              compact
              metrics={[
                { label: 'Hit Rate', value: 92, color: colors.accent.green },
                { label: 'Throughput', value: 88, color: colors.primary.purple },
              ]}
            />
          </div>

          {/* Bottom text with safe spacing */}
          <div
            style={{
              ...fontPresets.body,
              fontSize: 24,
              color: colors.neutral.white,
              textAlign: 'center',
              maxWidth: 1050,
              lineHeight: 1.35,
              opacity: spring({
                frame: useCurrentFrame() - 450,
                fps,
                config: { damping: 100 },
              }) * 0.88,
            }}
          >
            Each layer handles specific responsibilities with real-time performance monitoring
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
