import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';
import { AnimatedBackground, GridBackground } from './components/AnimatedBackground';
import { FadeTransition } from './components/Transitions';

// Cache Layer Component
const CacheLayer = ({
  label,
  icon: Icon,
  description,
  delay = 0,
  position = 'left',
  color,
}: {
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  delay?: number;
  position?: 'left' | 'center' | 'right';
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    from: position === 'left' ? -200 : position === 'right' ? 200 : 0,
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        maxWidth: 700,
        transform: position === 'center' ? `scale(${spring({ frame: frame - delay, fps, from: 0, to: 1, config: { damping: 15 } })})` : `translateX(${slideIn}px)`,
        opacity,
      }}
    >
      <div
        style={{
          width: 560,
          padding: '25px',
          background: `${colors.neutral.medium}DD`,
          borderRadius: 30,
          border: `3px solid ${color}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
      >
        <Icon size={130} color={color} />
        <div style={{ ...fontPresets.heading, fontSize: 68, color, textAlign: 'center' }}>
          {label}
        </div>
        <div style={{ ...fontPresets.body, fontSize: 40, color: colors.neutral.white, opacity: 0.9, textAlign: 'center' }}>
          {description}
        </div>
      </div>
    </div>
  );
};

// Cache Strategy Card
const StrategyCard = ({
  strategy,
  description,
  steps,
  color,
  delay = 0,
}: {
  strategy: string;
  description: string;
  steps: string[];
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
        gap: 30,
        padding: '50px 60px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 30,
        border: `3px solid ${color}`,
        transform: `scale(${scale})`,
        maxWidth: 960,
      }}
    >
      <div style={{ ...fontPresets.heading, fontSize: 76, color }}>
        {strategy}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 44, color: colors.neutral.white, opacity: 0.9 }}>
        {description}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 5 }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              ...fontPresets.body,
              fontSize: 38,
              color: colors.neutral.white,
              opacity: spring({
                frame: frame - delay - 20 - i * 8,
                fps,
                config: { damping: 100 },
              }),
              paddingLeft: 10,
            }}
          >
            {i + 1}. {step}
          </div>
        ))}
      </div>
    </div>
  );
};

// Cache hit/miss visualization
const CacheVisualization = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        gap: 160,
        alignItems: 'center',
        opacity: spring({ frame: frame - delay, fps, config: { damping: 100 } }),
      }}
    >
      {/* Cache Hit - Fast */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <div
          style={{
            width: 400,
            height: 320,
            background: `${colors.accent.green}30`,
            border: `3px solid ${colors.accent.green}`,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            transform: `scale(${spring({ frame: frame - delay - 20, fps, from: 0, to: 1, config: { damping: 15 } })})`,
          }}
        >
          <div style={{ fontSize: 140, color: colors.accent.green }}>✓</div>
          <div style={{ ...fontPresets.heading, fontSize: 64, color: colors.accent.green }}>
            Cache Hit
          </div>
        </div>
        <div style={{ ...fontPresets.body, fontSize: 52, color: colors.neutral.white }}>
          ~1ms
        </div>
      </div>

      {/* Cache Miss - Slow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <div
          style={{
            width: 400,
            height: 320,
            background: `${colors.accent.orange}30`,
            border: `3px solid ${colors.accent.orange}`,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            transform: `scale(${spring({ frame: frame - delay - 40, fps, from: 0, to: 1, config: { damping: 15 } })})`,
          }}
        >
          <div style={{ fontSize: 140, color: colors.accent.orange }}>✗</div>
          <div style={{ ...fontPresets.heading, fontSize: 64, color: colors.accent.orange }}>
            Cache Miss
          </div>
        </div>
        <div style={{ ...fontPresets.body, fontSize: 52, color: colors.neutral.white }}>
          ~100ms
        </div>
      </div>
    </div>
  );
};

// Icons
const CDNIcon = ({ size = 65, color = colors.primary.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <line x1="12" y1="2" x2="12" y2="7" stroke={color} strokeWidth="2"/>
    <line x1="12" y1="17" x2="12" y2="22" stroke={color} strokeWidth="2"/>
    <line x1="2" y1="12" x2="6" y2="12" stroke={color} strokeWidth="2"/>
    <line x1="18" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2"/>
  </svg>
);

const AppCacheIcon = ({ size = 65, color = colors.accent.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
    <path d="M8 10h8M8 14h5" stroke={color} strokeWidth="2"/>
    <circle cx="17" cy="7" r="3" fill={color}/>
  </svg>
);

const DBCacheIcon = ({ size = 65, color = colors.primary.purple }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke={color} strokeWidth="2"/>
    <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" stroke={color} strokeWidth="2"/>
  </svg>
);

const Title = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: 140,
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

// Main Scene 7
export const Scene7_CachingStrategies: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      <AnimatedBackground speed={0.45} colorStart={colors.neutral.dark} colorEnd={`${colors.accent.orange}15`} />
      <GridBackground gridSize={55} gridColor={`${colors.neutral.light}09`} />

      {/* PART 1: What is Caching? (0-600 frames / 0-20 seconds) */}
      <Sequence from={0} durationInFrames={600}>
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
          <Title text="Caching" delay={0} />
          <div style={{ ...fontPresets.body, fontSize: 72, color: colors.neutral.white, textAlign: 'center', maxWidth: 900, opacity: 0.9 }}>
            Store frequently accessed data in fast storage to reduce latency and database load
          </div>
          <CacheVisualization delay={60} />
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 1 to Part 1.5 */}
      <Sequence from={570} durationInFrames={30}>
        <FadeTransition startFrame={570} duration={30} type="out" />
      </Sequence>

      {/* PART 1.5: Benefits (600-900 frames / 20-30 seconds) */}
      <Sequence from={600} durationInFrames={300}>
        <FadeTransition startFrame={600} duration={30} type="in" />
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
          <Title text="Why Cache?" delay={0} />
          <div style={{ display: 'flex', gap: 120, marginTop: 20 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 30,
                padding: '60px 80px',
                background: `${colors.accent.green}20`,
                border: `3px solid ${colors.accent.green}`,
                borderRadius: 30,
                transform: `scale(${spring({ frame: useCurrentFrame() - 30, fps: 30, from: 0, to: 1, config: { damping: 15 } })})`,
              }}
            >
              <div style={{ fontSize: 120 }}>⚡</div>
              <div style={{ ...fontPresets.heading, fontSize: 76, color: colors.accent.green }}>Faster</div>
              <div style={{ ...fontPresets.body, fontSize: 52, color: colors.neutral.white, opacity: 0.9 }}>100x speed boost</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 30,
                padding: '60px 80px',
                background: `${colors.primary.blue}20`,
                border: `3px solid ${colors.primary.blue}`,
                borderRadius: 30,
                transform: `scale(${spring({ frame: useCurrentFrame() - 60, fps: 30, from: 0, to: 1, config: { damping: 15 } })})`,
              }}
            >
              <div style={{ fontSize: 120 }}>💰</div>
              <div style={{ ...fontPresets.heading, fontSize: 76, color: colors.primary.blue }}>Cheaper</div>
              <div style={{ ...fontPresets.body, fontSize: 52, color: colors.neutral.white, opacity: 0.9 }}>Reduce DB load</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 30,
                padding: '60px 80px',
                background: `${colors.primary.purple}20`,
                border: `3px solid ${colors.primary.purple}`,
                borderRadius: 30,
                transform: `scale(${spring({ frame: useCurrentFrame() - 90, fps: 30, from: 0, to: 1, config: { damping: 15 } })})`,
              }}
            >
              <div style={{ fontSize: 120 }}>😊</div>
              <div style={{ ...fontPresets.heading, fontSize: 76, color: colors.primary.purple }}>Better UX</div>
              <div style={{ ...fontPresets.body, fontSize: 52, color: colors.neutral.white, opacity: 0.9 }}>Instant responses</div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 1.5 to Part 2 */}
      <Sequence from={870} durationInFrames={30}>
        <FadeTransition startFrame={870} duration={30} type="out" />
      </Sequence>

      {/* PART 2: Cache Layers (900-1650 frames / 30-55 seconds) */}
      <Sequence from={900} durationInFrames={750}>
        <FadeTransition startFrame={900} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '160px 120px',
            gap: 100,
          }}
        >
          <Title text="Cache Layers" delay={0} />

          <div style={{ display: 'flex', gap: 100, marginTop: 30 }}>
            <CacheLayer
              label="CDN Cache"
              icon={CDNIcon}
              description="Static assets at edge locations"
              delay={40}
              position="left"
              color={colors.primary.blue}
            />
            <CacheLayer
              label="Application Cache"
              icon={AppCacheIcon}
              description="In-memory data (Redis, Memcached)"
              delay={80}
              position="center"
              color={colors.accent.green}
            />
            <CacheLayer
              label="Database Cache"
              icon={DBCacheIcon}
              description="Query results cached in DB"
              delay={120}
              position="right"
              color={colors.primary.purple}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 2 to Part 3 */}
      <Sequence from={1620} durationInFrames={30}>
        <FadeTransition startFrame={1620} duration={30} type="out" />
      </Sequence>

      {/* PART 3: Cache Strategies (1650-2700 frames / 55-90 seconds) */}
      <Sequence from={1650} durationInFrames={1050}>
        <FadeTransition startFrame={1650} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '160px 120px',
            gap: 90,
          }}
        >
          <Title text="Cache Strategies" delay={0} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 80, justifyContent: 'center', marginTop: 20 }}>
            <StrategyCard
              strategy="Cache Aside"
              description="Read from cache, if miss read from DB"
              steps={['Check cache', 'If miss, read DB', 'Update cache']}
              color={colors.primary.blue}
              delay={40}
            />
            <StrategyCard
              strategy="Write Through"
              description="Write to cache and DB together"
              steps={['Write to cache', 'Write to DB', 'Return success']}
              color={colors.accent.green}
              delay={80}
            />
            <StrategyCard
              strategy="Write Behind"
              description="Write to cache first, DB later"
              steps={['Write to cache', 'Return success', 'Async write to DB']}
              color={colors.accent.orange}
              delay={120}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
