import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';
import { ParticleBackground, GridBackground } from './components/AnimatedBackground';
import { ZoomTransition, FadeTransition } from './components/Transitions';

// Simple CAP Property Card
const CAPProperty = ({
  letter,
  name,
  description,
  color,
  delay = 0,
  Visual,
}: {
  letter: string;
  name: string;
  description: string;
  color: string;
  delay?: number;
  Visual?: React.ComponentType;
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
        gap: 36,
        padding: '56px 64px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 30,
        border: `4px solid ${color}`,
        transform: `scale(${scale})`,
        minWidth: 680,
        maxWidth: 680,
        flex: '1 1 0',
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: `${color}30`,
          border: `4px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...fontPresets.heading,
          fontSize: 130,
          color,
        }}
      >
        {letter}
      </div>
      {Visual && (
        <div
          style={{
            width: '100%',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Visual />
        </div>
      )}
      <div style={{ ...fontPresets.heading, fontSize: 84, color }}>
        {name}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 52, color: colors.neutral.white, textAlign: 'center', opacity: 0.9 }}>
        {description}
      </div>
    </div>
  );
};

const ConsistencyVisualization = () => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(frame / 20));
  const activeIndex = Math.floor((frame / 30) % 4);

  return (
    <div style={{ display: 'flex', gap: 28 }}>
      {[0, 1, 2].map((col) => (
        <div
          key={col}
          style={{
            width: 160,
            height: 180,
            borderRadius: 36,
            border: `2px solid ${colors.primary.blue}`,
            background: `${colors.primary.blue}15`,
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: col === activeIndex ? `0 0 25px ${colors.primary.blue}60` : undefined,
          }}
        >
          {Array.from({ length: 4 }).map((_, row) => (
            <div
              key={row}
              style={{
                height: 10,
                borderRadius: 12,
                background: col === activeIndex ? `${colors.primary.blue}` : `${colors.primary.blue}40`,
                opacity: row === (frame / 10 + col) % 4 ? pulse : 0.4,
                transition: 'opacity 0.2s',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const AvailabilityVisualization = () => {
  const frame = useCurrentFrame();
  const wave = (offset: number) => 0.6 + 0.4 * Math.sin((frame + offset) / 15);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
      {[0, 1].map((idx) => (
        <div
          key={idx}
          style={{
            width: 140,
            height: 180,
            borderRadius: 32,
            border: `2px solid ${colors.accent.green}`,
            background: `${colors.accent.green}10`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 10,
              borderRadius: 20,
              border: `1px dashed ${colors.accent.green}60`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: `translateX(-50%) scale(${wave(idx * 20)})`,
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: `${colors.accent.green}30`,
              border: `2px solid ${colors.accent.green}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderBottom: `3px solid ${colors.accent.green}`,
                borderRight: `3px solid ${colors.accent.green}`,
                transform: 'rotate(45deg)',
              }}
            />
          </div>
        </div>
      ))}
      <div
        style={{
          width: 100,
          height: 4,
          background: `${colors.accent.green}`,
          opacity: 0.3 + 0.7 * Math.abs(Math.sin(frame / 25)),
          borderRadius: 8,
        }}
      />
    </div>
  );
};

const PartitionToleranceVisualization = () => {
  const frame = useCurrentFrame();
  const blink = 0.5 + 0.5 * Math.abs(Math.sin(frame / 12));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      {[colors.primary.purple, colors.primary.blue].map((accent, idx) => (
        <div
          key={idx}
          style={{
            width: 180,
            height: 120,
            borderRadius: 32,
            border: `2px solid ${accent}`,
            background: `${accent}18`,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            padding: 8,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accent,
                opacity: 0.5 + (i % 2 === 0 ? 0.4 : 0),
              }}
            />
          ))}
        </div>
      ))}
      <div
        style={{
          width: 80,
          height: 3,
          background: `linear-gradient(90deg, ${colors.primary.blue}, ${colors.primary.purple})`,
          opacity: blink,
          borderRadius: 3,
        }}
      />
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
        gap: 36,
        padding: '70px 90px',
        background: `${colors.neutral.medium}DD`,
        borderRadius: 30,
        border: `4px solid ${color}`,
        transform: `scale(${spring({ frame: frame - delay, fps, from: 0, to: 1, config: { damping: 15 } })})`,
        minWidth: 1100,
        maxWidth: 1100,
      }}
    >
      <div style={{ ...fontPresets.heading, fontSize: 96, color }}>
        {title}
      </div>
      <div style={{ ...fontPresets.heading, fontSize: 72, color: colors.accent.green }}>
        {picks}
      </div>
      <div style={{ ...fontPresets.body, fontSize: 56, color: colors.neutral.white, opacity: 0.9 }}>
        {example}
      </div>
    </div>
  );
};

const PartitionVisualizer = () => {
  const frame = useCurrentFrame();
  const connectionOpacity = 0.4 + 0.6 * Math.abs(Math.sin(frame / 25));

  const clusters = [
    { x: 0, label: 'Cluster A', accent: colors.primary.blue },
    { x: 1, label: 'Cluster B', accent: colors.accent.green },
  ];

  const renderNodes = (accent: string) =>
    Array.from({ length: 6 }).map((_, i) => {
      const spin = 4 * Math.sin((frame + i * 12) / 18);
      return (
        <div
          key={i}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: accent,
            opacity: 0.9,
            transform: `translate(${Math.sin(i * 40) * 8}px, ${Math.cos(i * 20) * 8}px) rotate(${spin}deg)`,
          }}
        />
      );
    });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 60,
        padding: '60px 80px',
        borderRadius: 60,
        background: `${colors.neutral.medium}80`,
        border: `1px solid ${colors.neutral.light}30`,
        boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
      }}
    >
      {clusters.map((cluster, idx) => (
        <div
          key={cluster.label}
          style={{
            width: 360,
            height: 240,
            borderRadius: 48,
            border: `2px solid ${cluster.accent}`,
            background: `${cluster.accent}15`,
            padding: 18,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          {renderNodes(cluster.accent)}
          <div style={{ width: '100%', textAlign: 'center', ...fontPresets.body, fontSize: 36, color: colors.neutral.white, marginTop: 6 }}>
            {cluster.label}
          </div>
        </div>
      ))}
      <div
        style={{
          width: 260,
          height: 4,
          background: `linear-gradient(90deg, ${colors.primary.blue}, ${colors.primary.purple})`,
          opacity: connectionOpacity,
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        }}
      />
      <div
        style={{
          border: '2px dashed rgba(255,255,255,0.5)',
          borderRadius: 40,
          padding: '20px 36px',
          color: colors.neutral.white,
          ...fontPresets.body,
          fontSize: 36,
          opacity: 0.8,
        }}
      >
        Network Partition
      </div>
    </div>
  );
};

const TradeoffDial = () => {
  const frame = useCurrentFrame();
  const cycle = (frame % 240) / 240;
  const highlightCP = cycle < 0.5;
  const pointerAngle = highlightCP ? -35 + Math.sin(frame / 10) * 4 : 35 + Math.sin(frame / 10) * 4;

  const activeColor = highlightCP ? colors.primary.blue : colors.accent.green;
  const activeLabel = highlightCP ? 'Consistency + Partition' : 'Availability + Partition';

  const nodes = [
    { label: 'C', color: colors.primary.blue, angle: -90 },
    { label: 'A', color: colors.accent.green, angle: 30 },
    { label: 'P', color: colors.primary.purple, angle: 150 },
  ];

  const nodePosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: 150 + Math.cos(radians) * 95,
      y: 150 + Math.sin(radians) * 95,
    };
  };

  return (
    <div
      style={{
        padding: 30,
        borderRadius: 80,
        background: `${colors.neutral.medium}AA`,
        border: `1px solid ${colors.neutral.light}30`,
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
      }}
    >
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="110" stroke={`${colors.neutral.light}30`} strokeWidth="3" fill="none" />
        <circle cx="150" cy="150" r="50" stroke={`${colors.neutral.light}30`} strokeWidth="2" fill="none" />
        <line
          x1="150"
          y1="150"
          x2={150 + Math.cos((pointerAngle * Math.PI) / 180) * 100}
          y2={150 + Math.sin((pointerAngle * Math.PI) / 180) * 100}
          stroke={activeColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="150" cy="150" r="9" fill={activeColor} />
        {nodes.map((node) => {
          const pos = nodePosition(node.angle);
          const isActive =
            (highlightCP && (node.label === 'C' || node.label === 'P')) ||
            (!highlightCP && (node.label === 'A' || node.label === 'P'));
          return (
            <g key={node.label}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 20 : 16}
                fill={`${node.color}${isActive ? '50' : '25'}`}
                stroke={node.color}
                strokeWidth={isActive ? 4 : 2}
              />
              <text
                x={pos.x}
                y={pos.y + 6}
                textAnchor="middle"
                fontSize="18"
                fill={colors.neutral.white}
                style={{ fontFamily: fontPresets.heading.fontFamily }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ ...fontPresets.body, fontSize: 48, color: colors.neutral.white, textAlign: 'center' }}>{activeLabel}</div>
      <div
        style={{
          ...fontPresets.body,
          fontSize: 36,
          color: colors.neutral.light,
          textAlign: 'center',
          opacity: 0.9,
        }}
      >
        Systems oscillate between priorities as partitions occur
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
      {/* Animated backgrounds */}
      <ParticleBackground particleCount={15} particleColor={`${colors.primary.purple}25`} />
      <GridBackground gridSize={50} gridColor={`${colors.neutral.light}06`} />

      {/* PART 1: Introduction (0-450 frames / 0-15 seconds) */}
      <Sequence from={0} durationInFrames={450}>
        <ZoomTransition startFrame={0} duration={30} type="in">
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 100,
            padding: '200px 160px',
          }}
        >
          <Title text="CAP Theorem" delay={0} size={180} />
          <div style={{ ...fontPresets.body, fontSize: 76, color: colors.neutral.white, textAlign: 'center', maxWidth: 900, opacity: 0.9 }}>
            In distributed systems, you can only guarantee 2 out of 3 properties
          </div>
        </AbsoluteFill>
        </ZoomTransition>
      </Sequence>

      {/* Transition: Part 1 to Part 2 */}
      <Sequence from={420} durationInFrames={30}>
        <FadeTransition startFrame={420} duration={30} type="out" />
      </Sequence>

      {/* PART 2: The Three Properties (450-1350 frames / 15-45 seconds) */}
      <Sequence from={450} durationInFrames={900}>
        <FadeTransition startFrame={450} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '160px 200px',
          }}
        >
          {/* Header - Always at top */}
          <div style={{ marginBottom: 60 }}>
            <Title text="The 3 Properties" delay={0} size={150} />
          </div>

          {/* Content - Uses remaining vertical space */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              justifyContent: 'center',
              alignItems: 'stretch',
              flex: 1,
              flexWrap: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', alignItems: 'stretch', flex: 1, flexWrap: 'nowrap' }}>
              <CAPProperty
                letter="C"
                name="Consistency"
                description="All nodes see the same data at the same time"
                color={colors.primary.blue}
                delay={40}
                Visual={ConsistencyVisualization}
              />
              <CAPProperty
                letter="A"
                name="Availability"
                description="Every request gets a response (success or failure)"
                color={colors.accent.green}
                delay={80}
                Visual={AvailabilityVisualization}
              />
              <CAPProperty
                letter="P"
                name="Partition Tolerance"
                description="System works despite network failures"
                color={colors.primary.purple}
                delay={120}
                Visual={PartitionToleranceVisualization}
              />
            </div>
          </div>

          {/* Bottom insight */}
          <div
            style={{
              ...fontPresets.body,
              fontSize: 64,
              color: colors.neutral.white,
              textAlign: 'center',
              marginTop: 50,
              opacity: spring({
                frame: useCurrentFrame() - 200,
                fps: useVideoConfig().fps,
                config: { damping: 100 },
              }) * 0.85,
            }}
          >
            These properties define the fundamental limits of distributed systems
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 2 to Part 3 */}
      <Sequence from={1320} durationInFrames={30}>
        <FadeTransition startFrame={1320} duration={30} type="out" />
      </Sequence>

      {/* PART 3: The Trade-off (1350-1800 frames / 45-60 seconds) */}
      <Sequence from={1350} durationInFrames={450}>
        <FadeTransition startFrame={1350} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '200px 240px',
          }}
        >
          <Title text="Pick Any 2" delay={0} size={170} />

          <div
            style={{
              display: 'flex',
              gap: 80,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PartitionVisualizer />
            <TradeoffDial />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 200,
              alignItems: 'center',
            }}
          >
            {/* Left side - C+P */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 60,
                opacity: spring({
                  frame: useCurrentFrame() - 60,
                  fps: useVideoConfig().fps,
                  config: { damping: 100 },
                }),
              }}
            >
              <div style={{ display: 'flex', gap: 40 }}>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: `${colors.primary.blue}30`,
                    border: `4px solid ${colors.primary.blue}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...fontPresets.heading,
                    fontSize: 96,
                    color: colors.primary.blue,
                  }}
                >
                  C
                </div>
                <div style={{ ...fontPresets.heading, fontSize: 112, color: colors.neutral.white, lineHeight: '80px' }}>
                  +
                </div>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: `${colors.primary.purple}30`,
                    border: `4px solid ${colors.primary.purple}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...fontPresets.heading,
                    fontSize: 96,
                    color: colors.primary.purple,
                  }}
                >
                  P
                </div>
              </div>
              <div style={{ ...fontPresets.body, fontSize: 56, color: colors.neutral.white }}>
                Consistency + Partition
              </div>
            </div>

            {/* VS */}
            <div
              style={{
                ...fontPresets.heading,
                fontSize: 130,
                color: colors.accent.gold,
                opacity: spring({
                  frame: useCurrentFrame() - 90,
                  fps: useVideoConfig().fps,
                  config: { damping: 100 },
                }),
              }}
            >
              VS
            </div>

            {/* Right side - A+P */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 60,
                opacity: spring({
                  frame: useCurrentFrame() - 120,
                  fps: useVideoConfig().fps,
                  config: { damping: 100 },
                }),
              }}
            >
              <div style={{ display: 'flex', gap: 40 }}>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: `${colors.accent.green}30`,
                    border: `4px solid ${colors.accent.green}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...fontPresets.heading,
                    fontSize: 96,
                    color: colors.accent.green,
                  }}
                >
                  A
                </div>
                <div style={{ ...fontPresets.heading, fontSize: 112, color: colors.neutral.white, lineHeight: '80px' }}>
                  +
                </div>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: `${colors.primary.purple}30`,
                    border: `4px solid ${colors.primary.purple}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...fontPresets.heading,
                    fontSize: 96,
                    color: colors.primary.purple,
                  }}
                >
                  P
                </div>
              </div>
              <div style={{ ...fontPresets.body, fontSize: 56, color: colors.neutral.white }}>
                Availability + Partition
              </div>
            </div>
          </div>

          <div
            style={{
              ...fontPresets.body,
              fontSize: 68,
              color: colors.neutral.white,
              textAlign: 'center',
              maxWidth: 1100,
              opacity: spring({
                frame: useCurrentFrame() - 180,
                fps: useVideoConfig().fps,
                config: { damping: 100 },
              }) * 0.9,
            }}
          >
            Network partitions are inevitable, so you must choose between Consistency or Availability
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 3 to Part 4 */}
      <Sequence from={1770} durationInFrames={30}>
        <FadeTransition startFrame={1770} duration={30} type="out" />
      </Sequence>

      {/* PART 4: Real Examples (1800-2700 frames / 60-90 seconds) */}
      <Sequence from={1800} durationInFrames={900}>
        <FadeTransition startFrame={1800} duration={30} type="in" />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '160px 200px',
          }}
        >
          {/* Header - Always at top */}
          <div style={{ marginBottom: 60 }}>
            <Title text="Real-World Examples" delay={0} size={150} />
          </div>

          {/* Content - Uses remaining vertical space */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 120, justifyContent: 'center', flex: 1 }}>
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

          {/* Bottom insight */}
          <div
            style={{
              ...fontPresets.body,
              fontSize: 60,
              color: colors.neutral.white,
              textAlign: 'center',
              marginTop: 50,
              opacity: spring({
                frame: useCurrentFrame() - 200,
                fps: useVideoConfig().fps,
                config: { damping: 100 },
              }) * 0.85,
            }}
          >
            Choose your system type based on your application's requirements and trade-offs
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
