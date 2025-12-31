import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {HeapLayout} from '../components/HeapLayout';
import {ObjBox} from '../components/ObjBox';
import {Arrow} from '../components/Arrow';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const MarkSweepScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const rootsProgress = Math.min(t / 2, 1);
  const markProgress = Math.min(Math.max((t - 2) / 3, 0), 1);
  const sweepProgress = Math.min(Math.max((t - 5) / 3, 0), 1);

  return (
    <FadeTransition>
      <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
        <TitleBar title="Mark & Sweep Algorithm" subtitle="GC roots → mark reachable → sweep unreachable" />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', top: 180, left: 360 + i * 260, width: 120, height: 60, borderRadius: 999, backgroundColor: COLORS.root, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f9fafb', fontWeight: 700, fontSize: 28, opacity: rootsProgress, boxShadow: `0 0 30px ${COLORS.root}`}}>Root {i + 1}</div>
        ))}
        <HeapLayout />
        <ObjBox x={1220} y={420} color={COLORS.markedObj} label="A" opacity={markProgress} glow={markProgress > 0.5} />
        <ObjBox x={1350} y={360} color={COLORS.markedObj} label="B" opacity={markProgress} glow={markProgress > 0.5} />
        <ObjBox x={1480} y={460} color={COLORS.markedObj} label="C" opacity={markProgress} glow={markProgress > 0.5} />
        <ObjBox x={1260} y={510} color={COLORS.deadObj} label="X" opacity={1 - sweepProgress} />
        <ObjBox x={1400} y={510} color={COLORS.deadObj} label="Y" opacity={1 - sweepProgress} />
        {markProgress > 0.3 && <Arrow fromX={420} fromY={240} toX={1240} toY={440} color={COLORS.root} opacity={interpolate(markProgress, [0.3, 0.6], [0, 1], {extrapolateRight: 'clamp'})} />}
        <ProgressBar progress={0.37} />
      </AbsoluteFill>
    </FadeTransition>
  );
};
