import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
} from 'remotion';

const Server: React.FC<{ scale: number; color: string }> = ({ scale, color }) => {
  return (
    <div
      style={{
        width: 400 * scale,
        height: 500 * scale,
        backgroundColor: color,
        border: `${8 * scale}px solid #333`,
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        boxShadow: `0 ${30 * scale}px ${60 * scale}px rgba(0,0,0,0.6)`,
        filter: 'contrast(1.1) saturate(1.2)',
      }}
    >
      {/* Server rack panels */}
      <div style={{ 
        width: '85%', 
        height: '15%', 
        backgroundColor: '#333', 
        margin: `${8 * scale}px`,
        borderRadius: '12px',
        border: '3px solid #555',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '30px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
      }}>
        {/* Small indicator lights */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#00ff00', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #00ff00'
          }} />
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#ffff00', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #ffff00'
          }} />
        </div>
      </div>
      
      <div style={{ 
        width: '85%', 
        height: '15%', 
        backgroundColor: '#333', 
        margin: `${8 * scale}px`,
        borderRadius: '12px',
        border: '3px solid #555',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '30px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#00ff00', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #00ff00'
          }} />
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#00ff00', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #00ff00'
          }} />
        </div>
      </div>
      
      <div style={{ 
        width: '85%', 
        height: '15%', 
        backgroundColor: '#333', 
        margin: `${8 * scale}px`,
        borderRadius: '12px',
        border: '3px solid #555',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '30px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#ff8800', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #ff8800'
          }} />
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#00ff00', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #00ff00'
          }} />
        </div>
      </div>
      
      <div style={{ 
        width: '85%', 
        height: '15%', 
        backgroundColor: '#333', 
        margin: `${8 * scale}px`,
        borderRadius: '12px',
        border: '3px solid #555',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '30px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#00ff00', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #00ff00'
          }} />
          <div style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#0080ff', 
            borderRadius: '50%',
            boxShadow: '0 0 8px #0080ff'
          }} />
        </div>
      </div>
      
      {/* Main status panel */}
      <div style={{
        width: '85%',
        height: '18%',
        backgroundColor: '#1a1a1a',
        margin: `${8 * scale}px`,
        borderRadius: '12px',
        border: '3px solid #666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${32 * scale}px`,
        fontWeight: 'bold',
        color: '#00ff00',
        fontFamily: 'Monaco, "Courier New", monospace',
        textShadow: '0 0 10px #00ff00',
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)',
      }}>
        SERVER ONLINE
      </div>
    </div>
  );
};

const CPUUpgrade: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{ 
      position: 'absolute',
      top: '15%',
      right: '-180px',
      transform: `scale(${progress})`,
      opacity: progress,
      zIndex: 10,
    }}>
      <div style={{
        width: '220px',
        height: '220px',
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#000',
        border: '6px solid #FF8C00',
        boxShadow: '0 15px 45px rgba(255, 215, 0, 0.8)',
        animation: progress === 1 ? 'pulse 2s infinite' : 'none',
        filter: 'contrast(1.2) saturate(1.3)',
      }}>
        <div style={{ fontSize: '60px', marginBottom: '15px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>⚡</div>
        <div style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>CPU BOOST</div>
        <div style={{ fontSize: '20px', marginTop: '8px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>+50% POWER</div>
      </div>
    </div>
  );
};

const RAMUpgrade: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{ 
      position: 'absolute',
      bottom: '15%',
      left: '-180px',
      transform: `scale(${progress})`,
      opacity: progress,
      zIndex: 10,
    }}>
      <div style={{
        width: '280px',
        height: '120px',
        background: 'linear-gradient(135deg, #00FF7F 0%, #32CD32 100%)',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',
        border: '6px solid #228B22',
        boxShadow: '0 15px 45px rgba(0, 255, 127, 0.8)',
        animation: progress === 1 ? 'pulse 2s infinite' : 'none',
        filter: 'contrast(1.2) saturate(1.3)',
      }}>
        <div style={{ fontSize: '50px', marginRight: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>🧠</div>
        <div>
          <div style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>RAM UPGRADE</div>
          <div style={{ fontSize: '18px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>+32GB MEMORY</div>
        </div>
      </div>
    </div>
  );
};

const WarningIcon: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '80px',
      right: '80px',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s',
      zIndex: 20,
    }}>
      <div style={{
        width: '180px',
        height: '180px',
        background: 'linear-gradient(135deg, #FF4444 0%, #CC0000 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '80px',
        color: 'white',
        border: '8px solid #990000',
        boxShadow: '0 15px 45px rgba(255, 68, 68, 0.9)',
        animation: visible ? 'pulse 1.5s infinite' : 'none',
        filter: 'contrast(1.2) saturate(1.3)',
        textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
      }}>
        ⚠️
      </div>
    </div>
  );
};

const TextOverlay: React.FC<{ text: string; visible: boolean; subtitle?: string }> = ({ 
  text, 
  visible, 
  subtitle 
}) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s',
      maxWidth: '95%',
      zIndex: 15,
    }}>
      <h2 style={{
        fontSize: '64px',
        color: 'white',
        margin: '0 0 30px 0',
        textShadow: '4px 4px 8px rgba(0,0,0,0.9)',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'contrast(1.1)',
      }}>
        {text}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '36px',
          color: '#F0F0F0',
          margin: '0',
          textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
          fontFamily: '"Segoe UI", Arial, sans-serif',
          lineHeight: '1.6',
          padding: '0 60px',
          filter: 'contrast(1.1)',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const ScalingBasics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation sequences
  const introProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
  const serverScale = interpolate(frame, [120, 300], [0.8, 1.6], { 
    extrapolateRight: 'clamp',
    easing: (t) => t * t * (3 - 2 * t) // Smooth ease-in-out
  });
  const cpuUpgradeProgress = interpolate(frame, [180, 240], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3) // Ease out cubic
  });
  const ramUpgradeProgress = interpolate(frame, [210, 270], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3) // Ease out cubic
  });
  const warningVisible = frame > 360;
  const problemTextVisible = frame > 390;
  const serverColor = frame > 360 ? '#FF6B6B' : '#4ECDC4';

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', position: 'relative' }}>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.8); }
        }
      `}</style>

      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
      }} />

      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 20%, rgba(79, 209, 197, 0.1) 0%, transparent 50%)',
        animation: frame > 0 ? 'glow 4s infinite alternate' : 'none',
      }} />

      {/* Main server */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${introProgress})`,
        transition: 'all 0.5s ease-in-out',
      }}>
        <Server scale={serverScale} color={serverColor} />
        
        {/* Upgrades */}
        <CPUUpgrade progress={cpuUpgradeProgress} />
        <RAMUpgrade progress={ramUpgradeProgress} />
      </div>

      {/* Warning icon */}
      <WarningIcon visible={warningVisible} />

      {/* Text sequences */}
      <Sequence from={0} durationInFrames={150}>
        <TextOverlay 
          text="CHAPTER 1: SCALING BASICS"
          visible={true}
          subtitle="Picture this: You've built an awesome app, and it's running on a single server."
        />
      </Sequence>

      <Sequence from={120} durationInFrames={150}>
        <TextOverlay 
          text="Vertical Scaling"
          visible={true}
          subtitle="The simplest solution? Make your server beefier. Add more RAM, upgrade the CPU."
        />
      </Sequence>

      <Sequence from={270} durationInFrames={120}>
        <TextOverlay 
          text="It's like giving your car a bigger engine"
          visible={true}
        />
      </Sequence>

      <Sequence from={390} durationInFrames={150}>
        <TextOverlay 
          text="But here's the problem..."
          visible={problemTextVisible}
          subtitle="There's a ceiling. You can only make one machine so powerful, and it's expensive."
        />
      </Sequence>

      <Sequence from={540} durationInFrames={150}>
        <TextOverlay 
          text="Single Point of Failure"
          visible={true}
          subtitle="Plus, if that one server crashes? Your entire app goes down."
        />
      </Sequence>

      {/* Additional visual effects */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '40px',
        color: 'white',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.8,
        fontWeight: '500',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        background: 'linear-gradient(45deg, #ffffff, #4ECDC4)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        System Design Fundamentals
      </div>
    </AbsoluteFill>
  );
};