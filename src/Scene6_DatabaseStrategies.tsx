import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';
import { ParticleBackground, GridBackground } from './components/AnimatedBackground';
import { FadeTransition } from './components/Transitions';

// Database comparison card
const DBCard = ({
  type,
  icon: Icon,
  pros,
  useCases,
  color,
  delay = 0,
}: {
  type: string;
  icon: React.ComponentType<any>;
  pros: string[];
  useCases: string;
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
        gap: 40,
        padding: 30,
        background: `${colors.neutral.medium}DD`,
        borderRadius: 30,
        border: `3px solid ${color}`,
        transform: `scale(${scale})`,
        maxWidth: 900,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <Icon size={140} color={color} />
        <div style={{ ...fontPresets.heading, fontSize: 84, color }}>
          {type}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {pros.map((pro, i) => (
          <div
            key={i}
            style={{
              ...fontPresets.body,
              fontSize: 52,
              color: colors.neutral.white,
              opacity: 0.9,
            }}
          >
            • {pro}
          </div>
        ))}
      </div>

      <div
        style={{
          ...fontPresets.body,
          fontSize: 48,
          color: colors.accent.green,
          marginTop: 10,
        }}
      >
        Use for: {useCases}
      </div>
    </div>
  );
};

// Sharding diagram
const ShardingDiagram = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shards = [
    { label: 'Shard 1', color: colors.primary.blue, data: 'A-H' },
    { label: 'Shard 2', color: colors.accent.green, data: 'I-P' },
    { label: 'Shard 3', color: colors.primary.purple, data: 'Q-Z' },
  ];

  return (
    <div style={{ display: 'flex', gap: 80, opacity: spring({ frame: frame - delay, fps, config: { damping: 100 } }) }}>
      {shards.map((shard, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 30,
            transform: `scale(${spring({ frame: frame - delay - i * 20, fps, from: 0, to: 1, config: { damping: 15 } })})`,
          }}
        >
          <div
            style={{
              width: 240,
              height: 300,
              background: `${shard.color}30`,
              border: `3px solid ${shard.color}`,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...fontPresets.heading,
              fontSize: 90,
              color: shard.color,
            }}
          >
            {shard.data}
          </div>
          <div style={{ ...fontPresets.body, fontSize: 56, color: colors.neutral.white }}>
            {shard.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Replication diagram
const ReplicationDiagram = ({ delay = 0 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 100,
        opacity: spring({ frame: frame - delay, fps, config: { damping: 100 } }),
      }}
    >
      {/* Master */}
      <div
        style={{
          padding: '50px 100px',
          background: `${colors.accent.green}30`,
          border: `3px solid ${colors.accent.green}`,
          borderRadius: 24,
          ...fontPresets.heading,
          fontSize: 80,
          color: colors.accent.green,
        }}
      >
        Master (Writes)
      </div>

      {/* Arrow down */}
      <div style={{ color: colors.neutral.gray, fontSize: 80 }}>↓</div>

      {/* Slaves */}
      <div style={{ display: 'flex', gap: 60 }}>
        {['Slave 1', 'Slave 2', 'Slave 3'].map((slave, i) => (
          <div
            key={i}
            style={{
              padding: '40px 70px',
              background: `${colors.primary.blue}30`,
              border: `3px solid ${colors.primary.blue}`,
              borderRadius: 24,
              ...fontPresets.body,
              fontSize: 64,
              color: colors.primary.blue,
              opacity: spring({ frame: frame - delay - 30 - i * 15, fps, config: { damping: 100 } }),
            }}
          >
            {slave}
            <div style={{ fontSize: 44, opacity: 0.8, marginTop: 5 }}>(Reads)</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Icons
const SQLIcon = ({ size = 70, color = colors.primary.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
    <path d="M3 8h18M3 12h18M3 16h18M8 3v18" stroke={color} strokeWidth="2"/>
  </svg>
);

const NoSQLIcon = ({ size = 70, color = colors.accent.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h16" stroke={color} strokeWidth="2"/>
    <circle cx="7" cy="7" r="1.5" fill={color}/>
    <circle cx="7" cy="12" r="1.5" fill={color}/>
    <circle cx="7" cy="17" r="1.5" fill={color}/>
  </svg>
);

const RedisIcon = ({ size = 70, color = colors.accent.orange }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l10 5-10 5L2 7z" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <path d="M12 12l10 5-10 5-10-5z" stroke={color} strokeWidth="2" fill={color} opacity="0.2"/>
    <circle cx="12" cy="7" r="2" fill={color}/>
    <circle cx="12" cy="17" r="2" fill={color}/>
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

// Main Scene 6
export const Scene6_DatabaseStrategies: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      <ParticleBackground particleCount={12} particleColor={`${colors.accent.gold}20`} />
      <GridBackground gridSize={65} gridColor={`${colors.neutral.light}08`} />

      {/* PART 1: SQL Database (0-720 frames / 0-24 seconds) */}
      <Sequence from={0} durationInFrames={720}>
        <FadeTransition startFrame={0} duration={30} type="in" />
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
          <Title text="SQL Databases" delay={0} />
          <DBCard
            type="PostgreSQL"
            icon={SQLIcon}
            pros={['ACID Compliant', 'Complex Relationships', 'Strong Consistency']}
            useCases="Transactions, Inventory"
            color={colors.primary.blue}
            delay={30}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 1 to Part 2 */}
      <Sequence from={690} durationInFrames={30}>
        <FadeTransition startFrame={690} duration={30} type="out" />
      </Sequence>

      {/* PART 2: NoSQL Database (720-1440 frames / 24-48 seconds) */}
      <Sequence from={720} durationInFrames={720}>
        <FadeTransition startFrame={720} duration={30} type="in" />
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
          <Title text="NoSQL Databases" delay={0} />
          <DBCard
            type="MongoDB"
            icon={NoSQLIcon}
            pros={['Horizontal Scaling', 'Flexible Schema', 'High Availability']}
            useCases="User Profiles, Analytics"
            color={colors.accent.green}
            delay={30}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 2 to Part 3 */}
      <Sequence from={1410} durationInFrames={30}>
        <FadeTransition startFrame={1410} duration={30} type="out" />
      </Sequence>

      {/* PART 3: In-Memory (1440-2160 frames / 48-72 seconds) */}
      <Sequence from={1440} durationInFrames={720}>
        <FadeTransition startFrame={1440} duration={30} type="in" />
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
          <Title text="In-Memory Databases" delay={0} />
          <DBCard
            type="Redis"
            icon={RedisIcon}
            pros={['Lightning Fast', 'RAM Operations', 'Real-time Data']}
            useCases="Caching, Sessions, Leaderboards"
            color={colors.accent.orange}
            delay={30}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 3 to Part 4 */}
      <Sequence from={2130} durationInFrames={30}>
        <FadeTransition startFrame={2130} duration={30} type="out" />
      </Sequence>

      {/* PART 4: Sharding (2160-2880 frames / 72-96 seconds) */}
      <Sequence from={2160} durationInFrames={720}>
        <FadeTransition startFrame={2160} duration={30} type="in" />
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
          <Title text="Sharding" delay={0} />
          <div style={{ ...fontPresets.body, fontSize: 72, color: colors.neutral.white, opacity: 0.9 }}>
            Split data across databases
          </div>
          <ShardingDiagram delay={30} />
        </AbsoluteFill>
      </Sequence>

      {/* Transition: Part 4 to Part 5 */}
      <Sequence from={2850} durationInFrames={30}>
        <FadeTransition startFrame={2850} duration={30} type="out" />
      </Sequence>

      {/* PART 5: Replication (2880-3600 frames / 96-120 seconds) */}
      <Sequence from={2880} durationInFrames={720}>
        <FadeTransition startFrame={2880} duration={30} type="in" />
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
          <Title text="Replication" delay={0} />
          <div style={{ ...fontPresets.body, fontSize: 72, color: colors.neutral.white, opacity: 0.9 }}>
            Master-Slave for read scaling
          </div>
          <ReplicationDiagram delay={30} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
