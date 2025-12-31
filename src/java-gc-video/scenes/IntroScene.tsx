import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {ProgressBar} from '../components/ProgressBar';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const textAppear = interpolate(frame, [30, 60], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <TitleBar title="Garbage Collection in Java" subtitle="Automatic memory management in the JVM" />
      <div style={{position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%, -50%)', color: COLORS.text, fontSize: 40, maxWidth: 1100, lineHeight: 1.5, textAlign: 'center', opacity: textAppear}}>
        Java creates objects on the heap. The garbage collector automatically reclaims memory from objects that are no longer reachable.
      </div>
      <ProgressBar progress={0.05} />
    </AbsoluteFill>
  );
};
