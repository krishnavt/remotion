import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {HeapLayout} from '../components/HeapLayout';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const PauseScene: React.FC = () => (
  <FadeTransition>
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <TitleBar title="Stop-The-World Pauses" subtitle="Application pauses during GC" />
      <HeapLayout />
      <div style={{position: 'absolute', left: 200, top: 820, width: 1520, color: COLORS.text, fontSize: 36, lineHeight: 1.4}}>
        Young Gen GC: <span style={{color: COLORS.g1gc, fontWeight: 700}}>1-10ms</span><br/>Old Gen GC: <span style={{color: COLORS.g1gc, fontWeight: 700}}>10ms-1s+</span><br/><br/>Modern GCs minimize pauses automatically
      </div>
      <ProgressBar progress={0.75} />
    </AbsoluteFill>
  </FadeTransition>
);
