import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from 'remotion';

// Simple app icon component
const SimpleApp: React.FC<{ scale: number; position: { x: number; y: number } }> = ({ 
  scale, 
  position 
}) => {
  return (
    <div style={{
      position: 'absolute',
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
      width: '120px',
      height: '120px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      border: '3px solid rgba(255,255,255,0.2)',
    }}>
      📱
    </div>
  );
};

// Complex system component
const ComplexSystem: React.FC<{ progress: number }> = ({ progress }) => {
  const components = [
    { icon: '🛠️', label: 'APIs', color: '#667eea', delay: 0 },
    { icon: '📊', label: 'Analytics', color: '#f093fb', delay: 0.2 },
    { icon: '🔄', label: 'Cache', color: '#4ECDC4', delay: 0.4 },
    { icon: '⚡', label: 'Queue', color: '#FFD700', delay: 0.6 },
    { icon: '🗄️', label: 'Database', color: '#45B7D1', delay: 0.8 },
    { icon: '🌐', label: 'CDN', color: '#96CEB4', delay: 1.0 },
  ];

  return (
    <div style={{
      position: 'absolute',
      left: '75%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      opacity: interpolate(progress, [0.4, 0.6], [0, 1]),
    }}>
      {components.map((comp, i) => (
        <div
          key={i}
          style={{
            background: `linear-gradient(135deg, ${comp.color}, ${comp.color}dd)`,
            width: '80px',
            height: '80px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            transform: `scale(${interpolate(progress, [0.4 + comp.delay * 0.1, 0.7 + comp.delay * 0.1], [0, 1])})`,
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          <div>{comp.icon}</div>
          <div style={{
            fontSize: '8px',
            color: 'white',
            fontWeight: 'bold',
            marginTop: '2px',
          }}>
            {comp.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Growth arrow animation
const GrowthArrow: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '48px',
      opacity: interpolate(progress, [0.2, 0.4], [0, 1]),
      transform: `translate(-50%, -50%) scale(${interpolate(progress, [0.2, 0.4], [0.5, 1])})`,
    }}>
      <div style={{
        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      }}>
        ➡️
      </div>
    </div>
  );
};

// Neetcode.io branding
const NeetcodeBranding: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px 40px',
      borderRadius: '25px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
      border: '3px solid rgba(255,255,255,0.2)',
    }}>
      <div style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          background: 'white',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>
          💻
        </div>
        <div>neetcode.io</div>
      </div>
      <div style={{
        fontSize: '16px',
        color: '#E8E8E8',
        textAlign: 'center',
        marginTop: '8px',
        fontWeight: '500',
      }}>
        Deep dive into system design
      </div>
    </div>
  );
};

export const Introduction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 30 seconds = 900 frames at 30fps
  const progress = interpolate(frame, [0, 900], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    }}>
      {/* Background particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 30% 70%, rgba(79, 209, 197, 0.15) 0%, transparent 50%)',
        opacity: interpolate(progress, [0, 0.3], [0, 1]),
      }} />

      {/* Main title */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        opacity: interpolate(frame, [0, 60], [0, 1]),
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          background: 'linear-gradient(45deg, #ffffff, #4ECDC4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}>
          System Design Fundamentals
        </h1>
        <p style={{
          fontSize: '24px',
          margin: 0,
          opacity: 0.9,
          fontWeight: '500',
          color: '#E8E8E8',
        }}>
          From simple to complex, step by step
        </p>
      </div>

      {/* Simple app (starts immediately) */}
      <SimpleApp 
        scale={interpolate(frame, [60, 180], [0, 1])}
        position={{ x: 25, y: 50 }}
      />

      {/* Growth arrow (appears after simple app) */}
      <GrowthArrow progress={interpolate(frame, [120, 300], [0, 1])} />

      {/* Complex system (appears after arrow) */}
      <ComplexSystem progress={interpolate(frame, [180, 450], [0, 1])} />

    </AbsoluteFill>
  );
};