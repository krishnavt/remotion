import React from 'react';
import {useCurrentFrame} from 'remotion';

export const ObjBox: React.FC<{x: number; y: number; color: string; label?: string; opacity?: number; glow?: boolean}> = ({x, y, color, label, opacity = 1, glow = false}) => {
  const frame = useCurrentFrame();
  const pulse = glow ? 1 + Math.sin(frame * 0.1) * 0.1 : 1;

  return (
    <div style={{position: 'absolute', left: x, top: y, width: 90, height: 60, borderRadius: 10, backgroundColor: color, opacity, transform: `scale(${pulse})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#020617', fontWeight: 700, fontSize: 26, boxShadow: glow ? `0 0 30px ${color}` : '0 0 20px rgba(15,23,42,0.6)', transition: 'transform 0.2s ease'}}>{label}</div>
  );
};
