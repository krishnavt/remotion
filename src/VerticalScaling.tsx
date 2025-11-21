import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from 'remotion';

// Single server component that grows
const ScalingServer: React.FC<{ 
  scale: number; 
  color: string; 
  showUpgrades: boolean;
  showWarning: boolean;
}> = ({ scale, color, showUpgrades, showWarning }) => {
  const baseWidth = 200;
  const baseHeight = 250;
  
  return (
    <div style={{
      position: 'relative',
      transform: `scale(${scale.toFixed(3)})`, // Round to prevent sub-pixel issues
      transformOrigin: 'center center',
      willChange: 'transform', // Optimize for animations
    }}>
      {/* Main server */}
      <div style={{
        width: baseWidth,
        height: baseHeight,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        border: '4px solid #333',
        boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
        position: 'relative',
      }}>
        {/* Server icon */}
        <div style={{
          fontSize: '64px',
          marginTop: '20px',
        }}>
          🖥️
        </div>
        
        {/* Server status */}
        <div style={{
          background: '#1a1a1a',
          padding: '10px 15px',
          borderRadius: '10px',
          color: showWarning ? '#FF4444' : '#00FF00',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          border: '2px solid #444',
        }}>
          {showWarning ? 'OVERLOADED!' : 'RUNNING'}
        </div>
        
        {/* Load indicator bars */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '80%',
        }}>
          {/* CPU bar */}
          <div style={{
            background: '#333',
            height: '12px',
            borderRadius: '6px',
            position: 'relative',
            border: '1px solid #555',
          }}>
            <div style={{
              background: showWarning ? '#FF4444' : '#00FF00',
              height: '100%',
              width: showWarning ? '95%' : '60%',
              borderRadius: '6px',
              transition: 'width 0.8s ease-out, background-color 0.8s ease-out',
            }} />
          </div>
          
          {/* RAM bar */}
          <div style={{
            background: '#333',
            height: '12px',
            borderRadius: '6px',
            position: 'relative',
            border: '1px solid #555',
          }}>
            <div style={{
              background: showWarning ? '#FF4444' : '#4ECDC4',
              height: '100%',
              width: showWarning ? '90%' : '45%',
              borderRadius: '6px',
              transition: 'width 0.8s ease-out, background-color 0.8s ease-out',
            }} />
          </div>
        </div>
      </div>
      
      {/* CPU Upgrade indicator */}
      {showUpgrades && (
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: '0 10px 25px rgba(255, 215, 0, 0.6)',
          border: '3px solid #FF8C00',
          animation: 'pulse 2s infinite',
        }}>
          ⚡
        </div>
      )}
      
      {/* RAM Upgrade indicator */}
      {showUpgrades && (
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          background: 'linear-gradient(135deg, #00FF7F, #32CD32)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: '0 10px 25px rgba(0, 255, 127, 0.6)',
          border: '3px solid #228B22',
          animation: 'pulse 2s infinite',
        }}>
          🧠
        </div>
      )}
      
      {/* Warning icon */}
      {showWarning && (
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #FF4444, #CC0000)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: '0 10px 25px rgba(255, 68, 68, 0.8)',
          border: '3px solid #990000',
          animation: 'pulse 1.5s infinite',
        }}>
          ⚠️
        </div>
      )}
    </div>
  );
};

// Car analogy visualization
const CarAnalogy: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '40px',
      opacity: interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
      willChange: 'opacity',
    }}>
      {/* Small car */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '20px',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      }}>
        <div style={{ fontSize: '40px' }}>🚗</div>
        <div style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
        }}>
          Regular Engine
        </div>
      </div>
      
      {/* Arrow */}
      <div style={{
        fontSize: '32px',
        opacity: interpolate(progress, [0.3, 0.6], [0, 1]),
      }}>
        ➡️
      </div>
      
      {/* Powerful car */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
        padding: '20px',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        transform: `scale(${interpolate(progress, [0.6, 1], [0, 1], { extrapolateRight: 'clamp' }).toFixed(3)})`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}>
        <div style={{ fontSize: '40px' }}>🏎️</div>
        <div style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
        }}>
          Bigger Engine
        </div>
      </div>
    </div>
  );
};

// Problems visualization
const ProblemsVisualization: React.FC<{ visible: boolean }> = ({ visible }) => {
  const problems = [
    { icon: '💰', text: 'Expensive' },
    { icon: '📈', text: 'Limited' },
    { icon: '💥', text: 'Single Point of Failure' },
  ];

  return (
    <div style={{
      position: 'absolute',
      right: '10%',
      top: '30%',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.8s ease',
    }}>
      {problems.map((problem, i) => (
        <div
          key={i}
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FF4757)',
            padding: '15px 25px',
            borderRadius: '15px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 10px 20px rgba(255, 107, 107, 0.4)',
            transform: `translateX(${visible ? 0 : 100}px)`,
            transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s`,
            willChange: 'transform',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ fontSize: '24px' }}>{problem.icon}</div>
          <div style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
          }}>
            {problem.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export const VerticalScaling: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 25 seconds = 750 frames at 30fps (0:45-1:10 in script)
  const serverScale = interpolate(frame, [0, 300], [1, 1.3], { 
    extrapolateRight: 'clamp',
    easing: (t) => t * t * (3 - 2 * t) // Smooth hermite interpolation
  });
  
  const showUpgrades = frame > 180; // Show upgrades after 6 seconds
  const carAnalogyProgress = interpolate(frame, [240, 450], [0, 1]); // 8-15 seconds
  const showWarning = frame > 480; // Show problems after 16 seconds
  const showProblems = frame > 540; // Show problem list after 18 seconds
  
  const serverColor = showWarning ? '#FF6B6B' : '#4ECDC4';

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    }}>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>

      {/* Background effects */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 80%, rgba(79, 209, 197, 0.1) 0%, transparent 50%)',
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
          Vertical Scaling
        </h2>
      </div>

      {/* Main server animation */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
      }}>
        <ScalingServer 
          scale={serverScale}
          color={serverColor}
          showUpgrades={showUpgrades}
          showWarning={showWarning}
        />
      </div>

      {/* Car analogy */}
      <CarAnalogy progress={carAnalogyProgress} />

      {/* Problems visualization */}
      <ProblemsVisualization visible={showProblems} />

      {/* Users load indicator */}
      <Sequence from={0} durationInFrames={300}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          display: 'flex',
          gap: '10px',
        }}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              style={{
                fontSize: '24px',
                opacity: interpolate(frame, [i * 20, (i + 1) * 20], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${interpolate(frame, [i * 20, (i + 1) * 20], [0, 1], { extrapolateRight: 'clamp' }).toFixed(3)})`,
                transformOrigin: 'center center',
                willChange: 'opacity, transform',
              }}
            >
              👤
            </div>
          ))}
        </div>
      </Sequence>

      {/* Load arrows */}
      <Sequence from={300} durationInFrames={200}>
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '22%',
          fontSize: '32px',
          opacity: interpolate(frame - 300, [0, 200], [0, 1]),
        }}>
          ↘️
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};