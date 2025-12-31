import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {HeapLayout} from '../components/HeapLayout';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const GcPressureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const fillProgress = Math.sin(t * Math.PI * 2) * 0.5 + 0.5;
  const gcTrigger = Math.min(Math.max((t - 2) / 2, 0), 1);

  return (
    <FadeTransition>
      <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
        <TitleBar title="GC Pressure" subtitle="Heap usage triggers collections" />
        <HeapLayout />
        <div style={{position: 'absolute', left: 160, top: 820, width: 1600, height: 180, borderRadius: 20, background: `linear-gradient(90deg, ${COLORS.liveObj} ${fillProgress * 100}%, ${COLORS.deadObj} ${fillProgress * 100}%)`, padding: '40px', color: COLORS.text, fontSize: 36, boxShadow: '0 4px 30px rgba(0,0,0,0.5)'}}>
          Heap {Math.round(fillProgress * 100)}% full
        </div>
        <div style={{position: 'absolute', right: 200, top: 300, width: 200, height: 100, backgroundColor: COLORS.g1gc, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 32, fontWeight: 700, opacity: gcTrigger, transform: `scale(${1 + gcTrigger * 0.2})`, boxShadow: `0 0 40px ${COLORS.g1gc}`}}>GC!</div>
        <ProgressBar progress={0.55} />
      </AbsoluteFill>
    </FadeTransition>
  );
};
