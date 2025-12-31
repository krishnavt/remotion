import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate, Easing} from 'remotion';
import {COLORS} from '../constants';

export const TitleBar: React.FC<{title: string; subtitle?: string}> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const appear = spring({fps, frame, config: {damping: 200}});
  const slideIn = interpolate(frame, [0, 20], [-100, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

  return (
    <div style={{position: 'absolute', left: 0, top: slideIn, width: '100%', padding: '40px 80px 24px 80px', boxSizing: 'border-box', opacity: appear}}>
      <div style={{fontSize: 64, fontWeight: 800, color: COLORS.text, marginBottom: 12, textShadow: '0 2px 20px rgba(0,0,0,0.5)'}}>{title}</div>
      {subtitle && <div style={{fontSize: 32, color: 'rgba(229,231,235,0.85)', maxWidth: 1300, textShadow: '0 1px 10px rgba(0,0,0,0.3)'}}>{subtitle}</div>}
    </div>
  );
};
