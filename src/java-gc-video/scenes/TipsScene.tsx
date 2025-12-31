import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {CodeBox} from '../components/CodeBox';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const TipsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = frame / (fps * 2);
  const line1 = interpolate(progress, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'});
  const line2 = interpolate(progress, [0.3, 0.6], [0, 1], {extrapolateRight: 'clamp'});
  const line3 = interpolate(progress, [0.6, 1], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <FadeTransition>
      <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
        <TitleBar title="GC Best Practices" />
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 1200, color: COLORS.text, fontSize: 42}}>
          <div style={{marginBottom: 40, opacity: line1, transform: `translateX(${(1 - line1) * -50}px)`}}>• Reuse objects, avoid millions in tight loops</div>
          <div style={{marginBottom: 40, opacity: line2, transform: `translateX(${(1 - line2) * -50}px)`}}>• Null out references in caches when done</div>
          <div style={{opacity: line3, transform: `translateX(${(1 - line3) * -50}px)`, display: 'flex', alignItems: 'center'}}>
            • Monitor with <CodeBox code="-XX:+PrintGC" x={450} y={0} opacity={line3} /> and profilers
          </div>
        </div>
        <ProgressBar progress={0.87} />
      </AbsoluteFill>
    </FadeTransition>
  );
};
