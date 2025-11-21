import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';
import { constrainSize } from './utils/layout';

// Animated counter component
const AnimatedCounter = ({
  targetNumber,
  suffix = '',
  label,
  delay = 0,
  color = colors.primary.blue,
}: {
  targetNumber: number;
  suffix?: string;
  label: string;
  delay?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const number = interpolate(
    frame - delay,
    [0, 90],
    [0, targetNumber],
    {
      extrapolateRight: 'clamp',
    }
  );

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0.8,
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
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          ...fontPresets.heading,
          fontSize: 85,
          color,
          filter: `drop-shadow(0 0 20px ${color}40)`,
        }}
      >
        {Math.floor(number)}{suffix}
      </div>
      <div
        style={{
          ...fontPresets.body,
          fontSize: 36,
          color: colors.neutral.white,
          opacity: 0.9,
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Metric card
const MetricCard = ({
  icon: Icon,
  title,
  value,
  unit,
  color,
  delay = 0,
}: {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  unit: string;
  color: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({
    frame: frame - delay,
    fps,
    from: 50,
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
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        padding: 35,
        background: `${colors.neutral.medium}DD`,
        borderRadius: 15,
        border: `3px solid ${color}`,
        transform: `translateY(${slideUp}px)`,
        opacity,
        minWidth: 280,
        maxWidth: 320,
      }}
    >
      <Icon size={100} color={color} />
      <div
        style={{
          ...fontPresets.heading,
          fontSize: 70,
          color,
        }}
      >
        {value}
        <span style={{ fontSize: 45 }}>{unit}</span>
      </div>
      <div
        style={{
          ...fontPresets.body,
          fontSize: 32,
          color: colors.neutral.white,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Racing car icon
const CarIcon = ({ size = 100, color = colors.primary.blue, position = 0 }) => (
  <div style={{ transform: `translateX(${position}px)` }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M18 16h1a2 2 0 0 0 2-2v-3l-4-4H8L4 11v3a2 2 0 0 0 2 2h1"
        stroke={color}
        strokeWidth="2"
        fill={color}
        opacity="0.3"
      />
      <circle cx="7" cy="16" r="2" stroke={color} strokeWidth="2" fill={color} opacity="0.8"/>
      <circle cx="17" cy="16" r="2" stroke={color} strokeWidth="2" fill={color} opacity="0.8"/>
      <path d="M8 11h8" stroke={color} strokeWidth="2"/>
    </svg>
  </div>
);

// See-saw component
const SeeSaw = ({ tiltLeft = false, delay = 0 }: { tiltLeft?: boolean; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: tiltLeft ? -15 : 15,
    config: { damping: 20 },
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div style={{ opacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
      <svg width="400" height="250" viewBox="0 0 400 250">
        {/* Fulcrum */}
        <polygon
          points="180,180 220,180 200,220"
          fill={colors.neutral.gray}
          opacity="0.8"
        />

        {/* Plank */}
        <g transform={`rotate(${rotation}, 200, 180)`}>
          <rect
            x="50"
            y="170"
            width="300"
            height="20"
            rx="5"
            fill={colors.primary.blue}
            opacity="0.8"
          />

          {/* Left side - Throughput */}
          <circle cx="100" cy="140" r="35" fill={colors.accent.green} opacity="0.8"/>
          <text
            x="100"
            y="150"
            textAnchor="middle"
            fill={colors.neutral.white}
            fontSize="20"
            fontWeight="bold"
          >
            ↑
          </text>

          {/* Right side - Latency */}
          <circle cx="300" cy="140" r="35" fill={colors.accent.orange} opacity="0.8"/>
          <text
            x="300"
            y="150"
            textAnchor="middle"
            fill={colors.neutral.white}
            fontSize="20"
            fontWeight="bold"
          >
            ↑
          </text>
        </g>
      </svg>

      <div style={{ display: 'flex', gap: 100 }}>
        <div style={{ ...fontPresets.heading, fontSize: 40, color: colors.accent.green }}>
          Throughput
        </div>
        <div style={{ ...fontPresets.heading, fontSize: 40, color: colors.accent.orange }}>
          Latency
        </div>
      </div>
    </div>
  );
};

// Availability chart
const AvailabilityChart = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nines = [
    { level: '99.9%', downtime: '8.76 hours/year', height: 50, color: colors.accent.orange },
    { level: '99.99%', downtime: '52 min/year', height: 80, color: colors.accent.green },
  ];

  return (
    <div
      style={{
        display: 'flex',
        gap: 60,
        alignItems: 'flex-end',
        opacity: spring({
          frame: frame - delay,
          fps,
          config: { damping: 100 },
        }),
      }}
    >
      {nines.map((nine, i) => {
        const barHeight = spring({
          frame: frame - delay - i * 30,
          fps,
          from: 0,
          to: nine.height,
          config: { damping: 20 },
        });

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 140,
                height: barHeight * 3,
                background: createGradient(nine.color, colors.neutral.dark, 180),
                borderRadius: 8,
                border: `3px solid ${nine.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  ...fontPresets.heading,
                  fontSize: 45,
                  color: colors.neutral.white,
                }}
              >
                {nine.level}
              </div>
            </div>
            <div
              style={{
                ...fontPresets.body,
                fontSize: 28,
                color: colors.neutral.white,
                textAlign: 'center',
                opacity: 0.8,
              }}
            >
              {nine.downtime}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Icons for metrics
const UsersIcon = ({ size = 100, color = colors.primary.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <circle cx="15" cy="9" r="3" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" stroke={color} strokeWidth="2"/>
    <path d="M13 20c0-2.5 2-4 4-4s4 1.5 4 4" stroke={color} strokeWidth="2"/>
  </svg>
);

const RequestsIcon = ({ size = 100, color = colors.accent.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={color} strokeWidth="2.5"/>
    <circle cx="12" cy="12" r="3" fill={color} opacity="0.8"/>
  </svg>
);

const DataIcon = ({ size = 100, color = colors.primary.purple }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
    <path d="M3 10h18M3 15h18" stroke={color} strokeWidth="2"/>
    <circle cx="7" cy="7" r="1" fill={color}/>
    <circle cx="7" cy="12.5" r="1" fill={color}/>
    <circle cx="7" cy="17.5" r="1" fill={color}/>
  </svg>
);

// Title component
const Title = ({ text, delay = 0, size = 75 }: { text: string; delay?: number; size?: number }) => {
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
        ...fontPresets.heading,
        fontSize: size,
        background: createGradient(colors.primary.blue, colors.accent.green),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity,
        filter: 'drop-shadow(0 0 30px rgba(78, 205, 196, 0.5))',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  );
};

// Main Scene 4 component
export const Scene4_ScalePerformance: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* PART 1: Growing numbers (0-360 frames / 0-12 seconds) */}
      <Sequence from={0} durationInFrames={360}>
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
          <Title text="What is Scale?" delay={0} />

          <div style={{ display: 'flex', gap: 80 }}>
            <AnimatedCounter
              targetNumber={1000000}
              suffix="+"
              label="Users"
              delay={30}
              color={colors.primary.blue}
            />
            <AnimatedCounter
              targetNumber={10000}
              suffix="/s"
              label="Requests"
              delay={60}
              color={colors.accent.green}
            />
            <AnimatedCounter
              targetNumber={500}
              suffix="TB"
              label="Data"
              delay={90}
              color={colors.primary.purple}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: Scale metric cards (360-900 frames / 12-30 seconds) */}
      <Sequence from={360} durationInFrames={540}>
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
          <Title text="Scale Metrics" delay={0} size={70} />

          <div style={{ display: 'flex', gap: 50 }}>
            <MetricCard
              icon={UsersIcon}
              title="Daily Active Users"
              value="10M"
              unit="+"
              color={colors.primary.blue}
              delay={30}
            />
            <MetricCard
              icon={RequestsIcon}
              title="Requests/Second"
              value="50K"
              unit="/s"
              color={colors.accent.green}
              delay={60}
            />
            <MetricCard
              icon={DataIcon}
              title="Data Volume"
              value="2"
              unit="PB"
              color={colors.primary.purple}
              delay={90}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 3: Throughput vs Latency racing cars (900-1500 frames / 30-50 seconds) */}
      <Sequence from={900} durationInFrames={600}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
            padding: '80px 60px',
          }}
        >
          <Title text="Performance Metrics" delay={0} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 60, alignItems: 'center' }}>
            {/* Throughput */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <CarIcon
                size={120}
                color={colors.accent.green}
                position={interpolate(
                  useCurrentFrame() - 900,
                  [0, 300],
                  [0, 600],
                  { extrapolateRight: 'clamp' }
                )}
              />
              <div style={{ ...fontPresets.heading, fontSize: 50, color: colors.accent.green }}>
                Throughput: Cars/Hour
              </div>
            </div>

            {/* Latency */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <CarIcon
                size={120}
                color={colors.accent.orange}
                position={interpolate(
                  useCurrentFrame() - 900,
                  [0, 200],
                  [0, 400],
                  { extrapolateRight: 'clamp' }
                )}
              />
              <div style={{ ...fontPresets.heading, fontSize: 50, color: colors.accent.orange }}>
                Latency: Time/Request
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* PART 4: Trade-off see-saw (1500-2100 frames / 50-70 seconds) */}
      <Sequence from={1500} durationInFrames={600}>
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
          <Title text="The Trade-off" delay={0} />
          <SeeSaw tiltLeft={useCurrentFrame() - 1500 > 150} delay={30} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 5: Availability nines (2100-2700 frames / 70-90 seconds) */}
      <Sequence from={2100} durationInFrames={600}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
            padding: '80px 60px',
          }}
        >
          <Title text="Availability Nines" delay={0} />

          <AvailabilityChart delay={30} />

          <div
            style={{
              ...fontPresets.body,
              fontSize: 38,
              color: colors.neutral.white,
              textAlign: 'center',
              opacity: spring({
                frame: useCurrentFrame() - 2160,
                fps: 30,
                config: { damping: 100 },
              }),
            }}
          >
            Every nine counts
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
