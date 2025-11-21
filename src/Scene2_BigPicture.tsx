import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';

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

// Data packet animation
const DataPacket = ({ size = 40, color = colors.accent.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" fill={color} opacity="0.4"/>
    <path d="M8 12h8M12 8v8" stroke={color} strokeWidth="2"/>
  </svg>
);

// Animated arrow
const AnimatedArrow = ({ delay = 0, direction = 'right' }: { delay?: number; direction?: 'right' | 'down' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const pulse = Math.sin(frame / 10) * 0.2 + 1;

  return (
    <div style={{ opacity, transform: `scale(${pulse})` }}>
      {direction === 'right' ? (
        <svg width="120" height="60" viewBox="0 0 120 60">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill={colors.accent.gold} />
            </marker>
          </defs>
          <line
            x1="10"
            y1="30"
            x2="110"
            y2="30"
            stroke={colors.accent.gold}
            strokeWidth="4"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      ) : (
        <svg width="60" height="120" viewBox="0 0 60 120">
          <defs>
            <marker id="arrowheadDown" markerWidth="10" markerHeight="10" refX="3" refY="9" orient="auto">
              <polygon points="0 0, 6 0, 3 10" fill={colors.accent.gold} />
            </marker>
          </defs>
          <line
            x1="30"
            y1="10"
            x2="30"
            y2="110"
            stroke={colors.accent.gold}
            strokeWidth="4"
            markerEnd="url(#arrowheadDown)"
          />
        </svg>
      )}
    </div>
  );
};

// Moving data icon
const MovingDataIcon = ({ size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="12" r="3" fill={colors.primary.blue} opacity="0.8"/>
    <circle cx="18" cy="12" r="3" fill={colors.primary.blue} opacity="0.3"/>
    <path d="M9 12h6" stroke={colors.primary.blue} strokeWidth="3" strokeDasharray="2 2"/>
    <path d="M12 12l3-3M12 12l3 3" stroke={colors.primary.blue} strokeWidth="2.5"/>
  </svg>
);

// Storing data icon
const StoringDataIcon = ({ size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke={colors.accent.green} strokeWidth="2.5" fill={colors.accent.green} opacity="0.2"/>
    <path d="M4 9h16M4 14h16" stroke={colors.accent.green} strokeWidth="2"/>
    <circle cx="8" cy="6.5" r="1" fill={colors.accent.green}/>
    <circle cx="8" cy="11.5" r="1" fill={colors.accent.green}/>
    <circle cx="8" cy="16.5" r="1" fill={colors.accent.green}/>
  </svg>
);

// Transforming data icon
const TransformingDataIcon = ({ size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="6" height="8" rx="1" fill={colors.primary.purple} opacity="0.3" stroke={colors.primary.purple} strokeWidth="2"/>
    <rect x="15" y="8" width="6" height="8" rx="1" fill={colors.accent.gold} opacity="0.3" stroke={colors.accent.gold} strokeWidth="2"/>
    <path d="M9 12h6" stroke={colors.neutral.white} strokeWidth="2.5"/>
    <circle cx="12" cy="12" r="2.5" fill={colors.neutral.white}/>
    <path d="M12 9.5v5M9.5 12h5" stroke={colors.neutral.dark} strokeWidth="1.5"/>
  </svg>
);

// Minimal title
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
    from: 0.9,
    to: 1,
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
        transform: `scale(${scale})`,
        filter: 'drop-shadow(0 0 30px rgba(78, 205, 196, 0.5))',
      }}
    >
      {text}
    </div>
  );
};

// Label text
const Label = ({ text, delay = 0 }: { text: string; delay?: number }) => {
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
        fontSize: 45,
        color: colors.neutral.white,
        opacity: opacity * 0.9,
      }}
    >
      {text}
    </div>
  );
};

// Operation card
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
    config: { damping: 15 },
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
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        padding: 50,
        background: `${colors.neutral.medium}CC`,
        borderRadius: 20,
        border: `3px solid ${colors.neutral.light}`,
        transform: `scale(${scale})`,
        opacity,
        minWidth: 350,
      }}
    >
      <Icon size={180} />
      <div
        style={{
          ...fontPresets.heading,
          fontSize: 50,
          color: colors.neutral.white,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Architecture layer
const ArchitectureLayer = ({
  label,
  icon: Icon,
  delay = 0,
  yPosition,
}: {
  label: string;
  icon: React.ComponentType<any>;
  delay?: number;
  yPosition: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    from: -200,
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
        position: 'absolute',
        top: yPosition,
        left: '50%',
        transform: `translateX(calc(-50% + ${slideIn}px))`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        background: `${colors.neutral.medium}DD`,
        padding: '30px 60px',
        borderRadius: 15,
        border: `3px solid ${colors.primary.blue}`,
      }}
    >
      <Icon size={100} />
      <div
        style={{
          ...fontPresets.body,
          fontSize: 45,
          color: colors.neutral.white,
        }}
      >
        {label}
      </div>
    </div>
  );
};

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
      {/* PART 1: User → Server → Database flow (0-450 frames / 0-15 seconds) */}
      <Sequence from={0} durationInFrames={450}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          <Title text="The Data Journey" delay={0} size={90} />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 60,
              marginTop: 60,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <UserIconLarge size={160} />
              <Label text="User" delay={20} />
            </div>

            <AnimatedArrow delay={30} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <ServerIconLarge size={160} />
              <Label text="Server" delay={50} />
            </div>

            <AnimatedArrow delay={70} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <DatabaseIconLarge size={160} />
              <Label text="Database" delay={90} />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: Three fundamental operations (450-1200 frames / 15-40 seconds) */}
      <Sequence from={450} durationInFrames={750}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
          }}
        >
          <Title text="Three Core Operations" delay={0} size={85} />

          <div
            style={{
              display: 'flex',
              gap: 60,
              marginTop: 40,
            }}
          >
            <OperationCard Icon={MovingDataIcon} title="Moving" delay={30} />
            <OperationCard Icon={StoringDataIcon} title="Storing" delay={60} />
            <OperationCard Icon={TransformingDataIcon} title="Transforming" delay={90} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 3: Layer-by-layer architecture (1200-1800 frames / 40-60 seconds) */}
      <Sequence from={1200} durationInFrames={600}>
        <AbsoluteFill>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 80,
            }}
          >
            <Title text="At Scale" delay={0} size={100} />
          </div>

          <ArchitectureLayer label="Users (Millions)" icon={UserIconLarge} delay={60} yPosition={200} />
          <ArchitectureLayer label="Load Balancer" icon={NetworkIconLarge} delay={120} yPosition={360} />
          <ArchitectureLayer label="Application Servers" icon={ServerIconLarge} delay={180} yPosition={520} />
          <ArchitectureLayer label="Cache Layer" icon={StorageIcon} delay={240} yPosition={680} />
          <ArchitectureLayer label="Database Cluster" icon={DatabaseIconLarge} delay={300} yPosition={840} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
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
