import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
} from 'remotion';

// Component for animated diagram showing app growing complex
const GrowingAppDiagram: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: progress,
    }}>
      <div style={{
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
      }}>
        {/* Simple App */}
        <div style={{
          background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
          width: '120px',
          height: '120px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          transform: `scale(${interpolate(progress, [0, 0.3], [0, 1])})`,
        }}>
          📱
        </div>
        
        {/* Arrow */}
        <div style={{
          fontSize: '48px',
          color: '#fff',
          opacity: interpolate(progress, [0.3, 0.6], [0, 1]),
        }}>
          ➡️
        </div>
        
        {/* Complex System */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          transform: `scale(${interpolate(progress, [0.6, 1], [0, 1])})`,
        }}>
          {['🛠️', '📊', '🔄', '⚡'].map((emoji, i) => (
            <div
              key={i}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: '80px',
                height: '80px',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Server scaling animation
const ServerScalingAnimation: React.FC<{ type: 'vertical' | 'horizontal'; progress: number }> = ({ 
  type, 
  progress 
}) => {
  if (type === 'vertical') {
    return (
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: progress,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
          width: `${120 + (progress * 60)}px`,
          height: `${150 + (progress * 75)}px`,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🖥️</div>
          <div style={{ 
            fontSize: '14px', 
            color: 'white', 
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {progress > 0.5 ? 'UPGRADED!' : 'SERVER'}
          </div>
          
          {/* Upgrade indicators */}
          {progress > 0.3 && (
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              background: '#FFD700',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}>
              ⚡
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: '25%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '30px',
      opacity: progress,
    }}>
      {[1, 2, 3, 4].map((_, i) => (
        <div
          key={i}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100px',
            height: '120px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            transform: `scale(${interpolate(progress, [i * 0.2, (i + 1) * 0.2], [0, 1])})`,
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          }}
        >
          🖥️
          <div style={{ fontSize: '12px', color: 'white', marginTop: '5px' }}>
            Server {i + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

// Load balancer visualization
const LoadBalancerDemo: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: progress,
    }}>
      {/* Users */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '60px',
        justifyContent: 'center',
      }}>
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            style={{
              fontSize: '32px',
              transform: `scale(${interpolate(progress, [0, 0.3], [0, 1])})`,
            }}
          >
            👤
          </div>
        ))}
      </div>
      
      {/* Load Balancer */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        width: '160px',
        height: '80px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 60px auto',
        fontSize: '24px',
        color: 'white',
        fontWeight: 'bold',
        transform: `scale(${interpolate(progress, [0.3, 0.6], [0, 1])})`,
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      }}>
        ⚖️ Load Balancer
      </div>
      
      {/* Servers */}
      <div style={{
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
      }}>
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            style={{
              background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
              width: '100px',
              height: '100px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              transform: `scale(${interpolate(progress, [0.6 + i * 0.1, 0.9], [0, 1])})`,
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            }}
          >
            🖥️
          </div>
        ))}
      </div>
    </div>
  );
};

// CDN world map visualization
const CDNVisualization: React.FC<{ progress: number }> = ({ progress }) => {
  const locations = [
    { x: '20%', y: '30%', delay: 0 },
    { x: '50%', y: '40%', delay: 0.2 },
    { x: '80%', y: '35%', delay: 0.4 },
    { x: '15%', y: '60%', delay: 0.6 },
    { x: '75%', y: '70%', delay: 0.8 },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: '60%',
      opacity: progress,
    }}>
      {/* World outline */}
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        borderRadius: '20px',
        position: 'relative',
        border: '3px solid rgba(255,255,255,0.2)',
      }}>
        {/* CDN Nodes */}
        {locations.map((location, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: location.x,
              top: location.y,
              width: '40px',
              height: '40px',
              background: '#00FF7F',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              transform: `scale(${interpolate(progress, [location.delay, location.delay + 0.3], [0, 1])})`,
              boxShadow: '0 0 20px #00FF7F',
            }}
          >
            📡
          </div>
        ))}
        
        {/* Connection lines */}
        <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {locations.map((location, i) => (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={location.x}
              y2={location.y}
              stroke="#00FF7F"
              strokeWidth="2"
              opacity={interpolate(progress, [0.8, 1], [0, 0.6])}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

// Cache hierarchy visualization
const CacheHierarchy: React.FC<{ progress: number }> = ({ progress }) => {
  const levels = [
    { name: 'Browser Cache', icon: '🌐', color: '#FF6B6B', delay: 0 },
    { name: 'RAM Cache', icon: '🧠', color: '#4ECDC4', delay: 0.3 },
    { name: 'CPU Cache', icon: '⚡', color: '#45B7D1', delay: 0.6 },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '25%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: progress,
    }}>
      {levels.map((level, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '40px',
            transform: `translateX(${interpolate(progress, [level.delay, level.delay + 0.3], [-100, 0])}px)`,
          }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${level.color}, ${level.color}dd)`,
            width: `${120 + i * 40}px`,
            height: '80px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          }}>
            {level.icon}
          </div>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}>
            {level.name}
          </div>
          <div style={{
            color: '#FFD700',
            fontSize: '18px',
          }}>
            {i === 0 ? 'Slowest' : i === 1 ? 'Faster' : 'Fastest'}
          </div>
        </div>
      ))}
    </div>
  );
};

export const SystemDesignFundamentals: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate durations in frames (13 minutes = 780 seconds = 23400 frames at 30fps)
  const hookEnd = 450; // 15 seconds
  const introEnd = hookEnd + 900; // +30 seconds
  const chapter1End = introEnd + 2250; // +75 seconds
  const chapter2End = chapter1End + 2700; // +90 seconds
  const chapter3End = chapter2End + 1350; // +45 seconds

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    }}>
      {/* HOOK SECTION (0:00-0:15) - Use existing SystemDesignHook component */}
      <Sequence from={0} durationInFrames={hookEnd}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          // Hook content would go here - could import SystemDesignHook
        }} />
      </Sequence>

      {/* INTRODUCTION (0:15-0:45) */}
      <Sequence from={hookEnd} durationInFrames={900}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
          maxWidth: '90%',
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 0 30px 0',
            background: 'linear-gradient(45deg, #ffffff, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            System Design: From Simple to Complex
          </h2>
        </div>
        
        <GrowingAppDiagram 
          progress={interpolate(frame - hookEnd, [0, 900], [0, 1])} 
        />
        
        <Sequence from={600} durationInFrames={300}>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white',
          }}>
            <p style={{
              fontSize: '28px',
              margin: 0,
              padding: '20px 40px',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '15px',
              fontWeight: '500',
            }}>
              Let's start simple and build up complexity
            </p>
          </div>
        </Sequence>
      </Sequence>

      {/* CHAPTER 1: SCALING BASICS (0:45-2:00) */}
      <Sequence from={introEnd} durationInFrames={2250}>
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Chapter 1: Scaling Basics
          </h2>
        </div>

        {/* Vertical Scaling (first 25 seconds) */}
        <Sequence from={0} durationInFrames={750}>
          <ServerScalingAnimation 
            type="vertical" 
            progress={interpolate(frame - introEnd, [0, 750], [0, 1])} 
          />
          <Sequence from={300} durationInFrames={450}>
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white',
              maxWidth: '80%',
            }}>
              <p style={{
                fontSize: '24px',
                margin: 0,
                padding: '15px 30px',
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '12px',
              }}>
                Vertical Scaling: Make your server more powerful
              </p>
            </div>
          </Sequence>
        </Sequence>

        {/* Horizontal Scaling (next 50 seconds) */}
        <Sequence from={750} durationInFrames={1500}>
          <ServerScalingAnimation 
            type="horizontal" 
            progress={interpolate(frame - introEnd - 750, [0, 1500], [0, 1])} 
          />
          <Sequence from={600} durationInFrames={900}>
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              color: 'white',
              maxWidth: '80%',
            }}>
              <p style={{
                fontSize: '24px',
                margin: 0,
                padding: '15px 30px',
                background: 'rgba(0,0,0,0.6)',
                borderRadius: '12px',
              }}>
                Horizontal Scaling: Use multiple servers working together
              </p>
            </div>
          </Sequence>
        </Sequence>
      </Sequence>

      {/* CHAPTER 2: TRAFFIC MANAGEMENT (2:00-3:30) */}
      <Sequence from={chapter1End} durationInFrames={2700}>
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(45deg, #f093fb, #f5576c)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Chapter 2: Traffic Management
          </h2>
        </div>

        {/* Load Balancers */}
        <Sequence from={0} durationInFrames={1350}>
          <LoadBalancerDemo 
            progress={interpolate(frame - chapter1End, [0, 1350], [0, 1])} 
          />
        </Sequence>

        {/* CDN Section */}
        <Sequence from={1350} durationInFrames={1350}>
          <CDNVisualization 
            progress={interpolate(frame - chapter1End - 1350, [0, 1350], [0, 1])} 
          />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white',
          }}>
            <h3 style={{
              fontSize: '32px',
              margin: '0 0 15px 0',
              color: '#00FF7F',
            }}>
              Content Delivery Networks
            </h3>
            <p style={{
              fontSize: '20px',
              margin: 0,
              opacity: 0.9,
            }}>
              Global distribution for lightning-fast content delivery
            </p>
          </div>
        </Sequence>
      </Sequence>

      {/* CHAPTER 3: THE POWER OF CACHING (3:30-4:15) */}
      <Sequence from={chapter2End} durationInFrames={1350}>
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Chapter 3: The Power of Caching
          </h2>
        </div>

        <CacheHierarchy 
          progress={interpolate(frame - chapter2End, [0, 1350], [0, 1])} 
        />
      </Sequence>

      {/* Add more chapters... */}
    </AbsoluteFill>
  );
};