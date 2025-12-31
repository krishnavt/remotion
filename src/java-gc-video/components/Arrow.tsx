import React from 'react';
import {COLORS} from '../constants';

export const Arrow: React.FC<{fromX: number; fromY: number; toX: number; toY: number; color?: string; opacity?: number}> = ({fromX, fromY, toX, toY, color = COLORS.accent, opacity = 1}) => {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  const length = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);

  return (
    <div style={{position: 'absolute', left: fromX, top: fromY, width: length, height: 4, background: color, transformOrigin: 'left', transform: `rotate(${angle}rad)`, opacity}}>
      <div style={{position: 'absolute', right: -10, top: -8, width: 0, height: 0, borderLeft: `12px solid ${color}`, borderTop: '10px solid transparent', borderBottom: '10px solid transparent'}} />
    </div>
  );
};
