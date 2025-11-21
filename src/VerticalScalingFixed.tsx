import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from 'remotion';

// Fixed server component - no CSS transitions, purely frame-based
const ScalingServer: React.FC<{ 
  frame: number; // Pass frame directly for deterministic rendering
  scale: number; 
  color: string; 
  showUpgrades: boolean;
  showWarning: boolean;
}> = ({ frame, scale, color, showUpgrades, showWarning }) => {
  const baseWidth = 200;
  const baseHeight = 250;
  
  // Deterministic bar widths based on frame
  const cpuWidth = interpolate(frame, [0, 480], [60, 95], { extrapolateRight: 'clamp' });
  const ramWidth = interpolate(frame, [0, 480], [45, 90], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{
      position: 'relative',
      transform: `scale(${scale.toFixed(3)})`,
      transformOrigin: 'center center',
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
        
        {/* Server status - no transitions */}
        <div style={{
          background: '#1a1a1a',
          padding: '10px 15px',
          borderRadius: '10px',
          color: showWarning ? '#FF4444' : '#00FF00',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
          border: '2px solid #444',
        }}>
          {showWarning ? 'OVERLOADED!' : 'RUNNING'}
        </div>
        
        {/* Load indicator bars - frame-based, no transitions */}
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
              width: `${cpuWidth.toFixed(1)}%`,
              borderRadius: '6px',
              // NO transitions - purely frame-based
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
              width: `${ramWidth.toFixed(1)}%`,
              borderRadius: '6px',
              // NO transitions - purely frame-based
            }} />
          </div>
        </div>
      </div>
      
      {/* CPU Upgrade indicator - frame-based visibility */}
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
          // Remove CSS animation, use frame-based scaling instead
          transform: `scale(${1 + Math.sin(frame * 0.1) * 0.1})`,
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
          // Frame-based pulsing
          transform: `scale(${1 + Math.sin((frame + 15) * 0.1) * 0.1})`,
        }}>
          🧠
        </div>
      )}
      
      {/* Warning icon - frame-based animation */}
      {showWarning && (
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: `translateX(-50%) scale(${1 + Math.sin(frame * 0.2) * 0.15})`,
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
        }}>
          ⚠️
        </div>
      )}
    </div>
  );
};

// Car analogy - purely frame-based
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
        opacity: interpolate(progress, [0.3, 0.6], [0, 1], { extrapolateRight: 'clamp' }),
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

// Problems - frame-based, no CSS transitions
const ProblemsVisualization: React.FC<{ frame: number; visible: boolean }> = ({ frame, visible }) => {
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
    }}>
      {problems.map((problem, i) => {
        const delay = i * 15; // frames delay
        const progress = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });
        
        return (
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
              transform: `translateX(${(1 - progress) * 100}px)`,
              opacity: progress,
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
        );
      })}
    </div>
  );
};

export const VerticalScalingFixed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // All animations purely based on frame number
  const serverScale = interpolate(frame, [0, 300], [1, 1.3], { 
    extrapolateRight: 'clamp',
    easing: (t) => t * t * (3 - 2 * t)
  });
  
  const showUpgrades = frame > 180;
  const carAnalogyProgress = interpolate(frame, [240, 450], [0, 1], { extrapolateRight: 'clamp' });
  const showWarning = frame > 480;
  const showProblems = frame > 540;
  
  const serverColor = showWarning ? '#FF6B6B' : '#4ECDC4';

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    }}>
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
          frame={frame}
          scale={serverScale}
          color={serverColor}
          showUpgrades={showUpgrades}
          showWarning={showWarning}
        />
      </div>

      {/* Car analogy */}
      <CarAnalogy progress={carAnalogyProgress} />

      {/* Problems visualization */}
      <ProblemsVisualization frame={frame - 540} visible={showProblems} />

      {/* Users load indicator - frame-based */}
      <Sequence from={0} durationInFrames={300}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          display: 'flex',
          gap: '10px',
        }}>
          {[1, 2, 3, 4, 5].map((_, i) => {
            const userProgress = interpolate(frame, [i * 20, (i + 1) * 20], [0, 1], { extrapolateRight: 'clamp' });
            return (
              <div
                key={i}
                style={{
                  fontSize: '24px',
                  opacity: userProgress,
                  transform: `scale(${userProgress.toFixed(3)})`,
                  transformOrigin: 'center center',
                }}
              >
                👤
              </div>
            );
          })}
        </div>
      </Sequence>

      {/* Load arrows */}
      <Sequence from={300} durationInFrames={200}>
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '22%',
          fontSize: '32px',
          opacity: interpolate(frame - 300, [0, 200], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          ↘️
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};