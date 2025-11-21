import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from 'remotion';

// Single server that multiplies
const ServerMultiplication: React.FC<{ progress: number }> = ({ progress }) => {
  const serverCount = Math.floor(interpolate(progress, [0, 1], [1, 6]));
  
  return (
    <div style={{
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '80%',
    }}>
      {Array.from({ length: serverCount }, (_, i) => (
        <div
          key={i}
          style={{
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
            width: '120px',
            height: '150px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            border: '3px solid rgba(255,255,255,0.2)',
            transform: `scale(${interpolate(progress, [i * 0.15, (i + 1) * 0.15], [0, 1])})`,
            opacity: interpolate(progress, [i * 0.15, (i + 1) * 0.15], [0, 1]),
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🖥️</div>
          <div style={{
            background: '#1a1a1a',
            padding: '5px 10px',
            borderRadius: '8px',
            color: '#00FF00',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}>
            SERVER {i + 1}
          </div>
          
          {/* Load indicator */}
          <div style={{
            width: '80%',
            height: '8px',
            background: '#333',
            borderRadius: '4px',
            marginTop: '8px',
            position: 'relative',
          }}>
            <div style={{
              background: '#00FF00',
              height: '100%',
              width: `${30 + (i * 10)}%`,
              borderRadius: '4px',
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Team vs Superhero analogy
const TeamAnalogy: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '25%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '60px',
      opacity: interpolate(progress, [0, 0.3], [0, 1]),
    }}>
      {/* One Superhero */}
      <div style={{
        background: 'linear-gradient(135deg, #FF6B6B, #FF4757)',
        padding: '25px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 15px 35px rgba(255, 107, 107, 0.4)',
        border: '3px solid rgba(255,255,255,0.2)',
        transform: `scale(${interpolate(progress, [0, 0.3], [0.8, 1])})`,
      }}>
        <div style={{ fontSize: '64px', marginBottom: '10px' }}>🦸‍♂️</div>
        <div style={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        }}>
          One Superhero
        </div>
      </div>
      
      {/* VS */}
      <div style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        opacity: interpolate(progress, [0.3, 0.5], [0, 1]),
      }}>
        VS
      </div>
      
      {/* Team */}
      <div style={{
        background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
        padding: '25px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 15px 35px rgba(78, 205, 196, 0.4)',
        border: '3px solid rgba(255,255,255,0.2)',
        transform: `scale(${interpolate(progress, [0.5, 0.8], [0, 1])})`,
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '10px',
          justifyContent: 'center',
        }}>
          {['👨‍💻', '👩‍💻', '👨‍💻', '👩‍💻'].map((emoji, i) => (
            <div
              key={i}
              style={{
                fontSize: '32px',
                transform: `scale(${interpolate(progress, [0.5 + i * 0.1, 0.8 + i * 0.1], [0, 1])})`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <div style={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        }}>
          Team of Engineers
        </div>
      </div>
    </div>
  );
};

// Benefits visualization
const BenefitsList: React.FC<{ progress: number }> = ({ progress }) => {
  const benefits = [
    { icon: '📈', text: 'Unlimited Scaling' },
    { icon: '🛡️', text: 'Fault Tolerance' },
    { icon: '💰', text: 'Cheaper Machines' },
    { icon: '🔄', text: 'No Single Failure Point' },
  ];

  return (
    <div style={{
      position: 'absolute',
      right: '8%',
      top: '25%',
      opacity: interpolate(progress, [0, 0.2], [0, 1]),
    }}>
      {benefits.map((benefit, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px',
            transform: `translateX(${interpolate(progress, [i * 0.2, (i + 1) * 0.2], [100, 0])}px)`,
            opacity: interpolate(progress, [i * 0.2, (i + 1) * 0.2], [0, 1]),
          }}
        >
          {/* Checkmark circle */}
          <div style={{
            background: 'linear-gradient(135deg, #00FF7F, #32CD32)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 8px 20px rgba(0, 255, 127, 0.4)',
            border: '3px solid rgba(255,255,255,0.2)',
          }}>
            ✓
          </div>
          
          {/* Benefit card */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            padding: '15px 25px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)',
            minWidth: '200px',
          }}>
            <div style={{ fontSize: '24px' }}>{benefit.icon}</div>
            <div style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
            }}>
              {benefit.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Complexity warning
const ComplexityWarning: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.8s ease',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
        padding: '25px 40px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 15px 35px rgba(255, 165, 0, 0.5)',
        border: '3px solid rgba(255,255,255,0.2)',
        animation: visible ? 'pulse 3s infinite' : 'none',
      }}>
        <div style={{
          fontSize: '48px',
          animation: visible ? 'bounce 2s infinite' : 'none',
        }}>
          ⚠️
        </div>
        <div>
          <div style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px',
          }}>
            COMPLEXITY TRADEOFF
          </div>
          <div style={{
            color: '#FFF8DC',
            fontSize: '16px',
            fontWeight: '500',
          }}>
            Multiple machines need coordination
          </div>
        </div>
      </div>
    </div>
  );
};

// Connection lines between servers
const ServerConnections: React.FC<{ progress: number; serverCount: number }> = ({ 
  progress, 
  serverCount 
}) => {
  if (serverCount < 2) return null;

  return (
    <svg style={{
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '200px',
      opacity: interpolate(progress, [0.8, 1], [0, 1]),
    }}>
      {/* Draw connection lines between servers */}
      {Array.from({ length: serverCount - 1 }, (_, i) => (
        <line
          key={i}
          x1={`${(i + 1) * (100 / serverCount)}%`}
          y1="50%"
          x2={`${(i + 2) * (100 / serverCount)}%`}
          y2="50%"
          stroke="#4ECDC4"
          strokeWidth="3"
          strokeDasharray="10,5"
          opacity={0.6}
        />
      ))}
      
      {/* Central coordination point */}
      <circle
        cx="50%"
        cy="20%"
        r="15"
        fill="url(#coordinationGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      
      <defs>
        <radialGradient id="coordinationGradient">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const HorizontalScaling: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 50 seconds = 1500 frames at 30fps
  const multiplicationProgress = interpolate(frame, [0, 600], [0, 1], { 
    extrapolateRight: 'clamp' 
  });
  
  const teamAnalogyProgress = interpolate(frame, [300, 750], [0, 1]);
  const benefitsProgress = interpolate(frame, [750, 1050], [0, 1]);
  const complexityVisible = frame > 1200;
  
  const serverCount = Math.floor(interpolate(multiplicationProgress, [0, 1], [1, 6]));

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    }}>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>

      {/* Background effects */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.15) 0%, transparent 50%)',
      }} />

      {/* Chapter title */}
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
          background: 'linear-gradient(45deg, #4ECDC4, #44A08D)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Horizontal Scaling
        </h2>
      </div>

      {/* Server multiplication */}
      <ServerMultiplication progress={multiplicationProgress} />
      
      {/* Connection lines */}
      <ServerConnections 
        progress={multiplicationProgress} 
        serverCount={serverCount}
      />

      {/* Team vs Superhero analogy */}
      <TeamAnalogy progress={teamAnalogyProgress} />

      {/* Benefits list */}
      <BenefitsList progress={benefitsProgress} />

      {/* Complexity warning */}
      <ComplexityWarning visible={complexityVisible} />

      {/* Load balancing visualization */}
      <Sequence from={900} durationInFrames={300}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: interpolate(frame - 900, [i * 20, (i + 1) * 20], [0, 1]),
              }}
            >
              <div style={{ fontSize: '20px' }}>👤</div>
              <div style={{
                fontSize: '16px',
                color: '#4ECDC4',
              }}>
                →
              </div>
              <div style={{
                fontSize: '16px',
                color: 'white',
                fontFamily: 'monospace',
              }}>
                SERVER {((i % serverCount) + 1)}
              </div>
            </div>
          ))}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};