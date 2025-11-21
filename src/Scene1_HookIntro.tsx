import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, createGradient } from './utils/colors';
import { fontPresets } from './utils/fonts';

// Large system architecture icons
const ServerIcon = ({ size = 200, color = colors.primary.blue, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <rect x="2" y="4" width="20" height="4" rx="1" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <rect x="2" y="10" width="20" height="4" rx="1" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <rect x="2" y="16" width="20" height="4" rx="1" stroke={color} strokeWidth="2" fill={color} opacity="0.3"/>
    <circle cx="6" cy="6" r="1.5" fill={color}/>
    <circle cx="6" cy="12" r="1.5" fill={color}/>
    <circle cx="6" cy="18" r="1.5" fill={color}/>
  </svg>
);

const DatabaseIcon = ({ size = 200, color = colors.accent.green, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
    <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke={color} strokeWidth="2.5" fill={color} opacity="0.1"/>
    <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" stroke={color} strokeWidth="2.5" fill={color} opacity="0.1"/>
  </svg>
);

const CloudIcon = ({ size = 200, color = colors.primary.purple, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke={color} strokeWidth="2.5" fill={color} opacity="0.3"/>
  </svg>
);

const NetworkIcon = ({ size = 200, color = colors.accent.gold, opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <circle cx="12" cy="12" r="3" fill={color}/>
    <circle cx="6" cy="6" r="2.5" fill={color} opacity="0.8"/>
    <circle cx="18" cy="6" r="2.5" fill={color} opacity="0.8"/>
    <circle cx="6" cy="18" r="2.5" fill={color} opacity="0.8"/>
    <circle cx="18" cy="18" r="2.5" fill={color} opacity="0.8"/>
    <line x1="12" y1="12" x2="6" y2="6" stroke={color} strokeWidth="3" opacity="0.6"/>
    <line x1="12" y1="12" x2="18" y2="6" stroke={color} strokeWidth="3" opacity="0.6"/>
    <line x1="12" y1="12" x2="6" y2="18" stroke={color} strokeWidth="3" opacity="0.6"/>
    <line x1="12" y1="12" x2="18" y2="18" stroke={color} strokeWidth="3" opacity="0.6"/>
  </svg>
);

// User icon for statistics
const UserIcon = ({ size = 60, color = colors.neutral.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color} opacity="0.9"/>
    <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" fill={color} opacity="0.4"/>
  </svg>
);

// Animated number counter
const AnimatedNumber = ({
  targetNumber,
  suffix = '',
  delay = 0
}: {
  targetNumber: number;
  suffix?: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const number = interpolate(
    frame - delay,
    [0, 60],
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

  return (
    <div
      style={{
        ...fontPresets.heading,
        fontSize: 120,
        background: createGradient(colors.primary.blue, colors.accent.green),
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        opacity,
        filter: 'drop-shadow(0 0 40px rgba(78, 205, 196, 0.6))',
      }}
    >
      {Math.floor(number)}{suffix}
    </div>
  );
};

// Logo component with larger size
const TechLogo = ({ name, color, bgGradient }: { name: string; color?: string; bgGradient?: string }) => (
  <div
    style={{
      ...fontPresets.heading,
      fontSize: 80,
      color: color || colors.neutral.white,
      background: bgGradient,
      WebkitBackgroundClip: bgGradient ? 'text' : undefined,
      WebkitTextFillColor: bgGradient ? 'transparent' : undefined,
      padding: '20px 40px',
      borderRadius: 12,
      letterSpacing: 3,
      textShadow: !bgGradient ? `0 0 30px ${color}40` : undefined,
    }}
  >
    {name}
  </div>
);

const CompanySpotlight = ({
  logo,
  stat,
  caption,
  accent,
  delay = 0,
}: {
  logo: React.ReactNode;
  stat: string;
  caption: string;
  accent: string;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18 },
  });

  const translate = interpolate(appear, [0, 1], [30, 0]);

  return (
    <div
      style={{
        minWidth: 260,
        maxWidth: 320,
        padding: '26px 32px',
        borderRadius: 30,
        background: `linear-gradient(150deg, ${accent}25, rgba(4,10,24,0.95))`,
        border: `1px solid ${accent}70`,
        boxShadow: `0 30px 70px ${accent}33`,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity: appear,
        transform: `translateY(${translate}px) scale(${0.9 + appear * 0.1})`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>{logo}</div>
      <div
        style={{
          ...fontPresets.heading,
          fontSize: 68,
          color: accent,
          textAlign: 'center',
          lineHeight: 1,
        }}
      >
        {stat}
      </div>
      <div
        style={{
          ...fontPresets.body,
          fontSize: 26,
          color: colors.neutral.white,
          textAlign: 'center',
          opacity: 0.9,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

// Minimal text overlay
const MinimalText = ({ text, delay = 0, size = 50 }: { text: string; delay?: number; size?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const translateY = spring({
    frame: frame - delay,
    fps,
    from: 20,
    to: 0,
    config: { damping: 20 },
  });

  return (
    <div
      style={{
        ...fontPresets.body,
        fontSize: size,
        color: colors.neutral.white,
        textAlign: 'center',
        opacity: opacity * 0.9,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {text}
    </div>
  );
};

// Orbiting icons animation
const OrbitingIcons = () => {
  const frame = useCurrentFrame();
  const rotation = (frame / 2) % 360;

  const icons = [
    { Icon: ServerIcon, angle: 0, color: colors.primary.blue, radius: 300 },
    { Icon: DatabaseIcon, angle: 90, color: colors.accent.green, radius: 300 },
    { Icon: CloudIcon, angle: 180, color: colors.primary.purple, radius: 300 },
    { Icon: NetworkIcon, angle: 270, color: colors.accent.gold, radius: 300 },
  ];

  return (
    <>
      {icons.map(({ Icon, angle, color, radius }, i) => {
        const totalAngle = rotation + angle;
        const x = Math.cos((totalAngle * Math.PI) / 180) * radius;
        const y = Math.sin((totalAngle * Math.PI) / 180) * radius;

        const scale = spring({
          frame: frame - i * 10,
          fps: 30,
          from: 0,
          to: 1,
          config: { damping: 15 },
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
            }}
          >
            <Icon color={color} size={150} opacity={0.8} />
          </div>
        );
      })}
    </>
  );
};

// User grid for statistics visualization
const UserGrid = ({ count, delay = 0 }: { count: number; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows = 8;
  const cols = 15;
  const total = rows * cols;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 20,
        maxWidth: 1200,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const opacity = spring({
          frame: frame - delay - i * 0.5,
          fps,
          from: 0,
          to: 1,
          config: { damping: 100 },
        });

        return (
          <div key={i} style={{ opacity }}>
            <UserIcon size={50} />
          </div>
        );
      })}
    </div>
  );
};

// Main Scene component
export const Scene1_HookIntro: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral.dark,
        fontFamily: fontPresets.body.fontFamily,
      }}
    >
      {/* PART 1: Title with orbiting icons (0-150 frames / 0-5 seconds) */}
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill>
          <OrbitingIcons />

          <AbsoluteFill
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 30,
            }}
          >
            <h1
              style={{
                ...fontPresets.heading,
                fontSize: 140,
                margin: 0,
                background: createGradient(colors.primary.blue, colors.primary.purple),
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 50px rgba(78, 205, 196, 0.6))',
                opacity: spring({
                  frame,
                  fps,
                  config: { damping: 100 },
                }),
                transform: `scale(${spring({
                  frame,
                  fps,
                  from: 0.8,
                  to: 1,
                  config: { damping: 15 },
                })})`,
              }}
            >
              System Design
            </h1>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* PART 2: Netflix - Visual statistics (150-330 frames / 5-11 seconds) */}
      <Sequence from={150} durationInFrames={180}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
          }}
        >
          <TechLogo name="NETFLIX" color="#E50914" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <AnimatedNumber targetNumber={200} suffix="M" delay={20} />
            <MinimalText text="users" delay={40} size={60} />
          </div>

          <UserGrid count={120} delay={30} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 3: Instagram - Visual statistics (330-510 frames / 11-17 seconds) */}
      <Sequence from={330} durationInFrames={180}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
          }}
        >
          <TechLogo
            name="Instagram"
            bgGradient="linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <AnimatedNumber targetNumber={500} suffix="M" delay={20} />
            <MinimalText text="daily users" delay={40} size={60} />
          </div>

          <UserGrid count={120} delay={30} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 4: Tech proof points (510-660 frames / 17-22 seconds) */}
      <Sequence from={510} durationInFrames={150}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 50,
            padding: '0 120px',
          }}
        >
          <MinimalText text="The secret?" delay={0} size={68} />

          <div
            style={{
              ...fontPresets.heading,
              fontSize: 150,
              background: createGradient(colors.accent.green, colors.accent.gold),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 60px rgba(0, 255, 127, 0.6))',
              opacity: spring({
                frame: frame - 510,
                fps,
                from: 0,
                to: 1,
                config: { damping: 100 },
              }),
            }}
          >
            System Design
          </div>

          <div
            style={{
              ...fontPresets.body,
              fontSize: 42,
              color: colors.neutral.light,
              textAlign: 'center',
              opacity: spring({
                frame: frame - 520,
                fps,
                from: 0,
                to: 1,
                config: { damping: 80 },
              }) * 0.9,
            }}
          >
            Trusted by every product you open daily
          </div>

          <div
            style={{
              display: 'flex',
              gap: 35,
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 1400,
            }}
          >
            <CompanySpotlight
              delay={520}
              accent={colors.primary.blue}
              stat="5B+"
              caption="rides coordinated yearly"
              logo={
                <div
                  style={{
                    ...fontPresets.heading,
                    fontSize: 64,
                    letterSpacing: 6,
                    color: colors.neutral.white,
                  }}
                >
                  Uber
                </div>
              }
            />
            <CompanySpotlight
              delay={535}
              accent="#1DA1F2"
              stat="500M"
              caption="posts shared every day"
              logo={
                <div
                  style={{
                    ...fontPresets.heading,
                    fontSize: 72,
                    color: '#7cc8ff',
                    letterSpacing: 8,
                  }}
                >
                  𝕏
                </div>
              }
            />
            <CompanySpotlight
              delay={550}
              accent="#1DB954"
              stat="120M"
              caption="tracks playing simultaneously"
              logo={
                <div
                  style={{
                    ...fontPresets.heading,
                    fontSize: 60,
                    color: '#1DB954',
                    letterSpacing: 4,
                  }}
                >
                  Spotify
                </div>
              }
            />
          </div>

          <MinimalText text="System design keeps them all online." delay={560} size={56} />
        </AbsoluteFill>
      </Sequence>

      {/* PART 5: Final call to action with large icons (660-900 frames / 22-30 seconds) */}
      <Sequence from={660} durationInFrames={240}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 100,
          }}
        >
          <div style={{
            display: 'flex',
            gap: 100,
            opacity: spring({
              frame: frame - 660,
              fps,
              from: 0,
              to: 0.6,
              config: { damping: 100 },
            }),
          }}>
            <ServerIcon size={180} />
            <DatabaseIcon size={180} />
            <CloudIcon size={180} />
            <NetworkIcon size={180} />
          </div>

          <MinimalText text="Master scalable systems" delay={30} size={65} />

          <div
            style={{
              ...fontPresets.heading,
              fontSize: 90,
              color: colors.accent.green,
              opacity: spring({
                frame: frame - 720,
                fps,
                from: 0,
                to: 1,
                config: { damping: 100 },
              }),
              filter: 'drop-shadow(0 0 30px rgba(0, 255, 127, 0.6))',
            }}
          >
            Let's dive in
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
