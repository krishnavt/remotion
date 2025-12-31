import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const GcTypesScene: React.FC = () => (
  <FadeTransition>
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <TitleBar title="Modern GC Algorithms" subtitle="Java 17+ default collectors" />
      <div style={{position: 'absolute', left: 200, top: 300, width: 1520, color: COLORS.text, fontSize: 38}}>
        <div style={{marginBottom: 40, fontSize: 48, color: COLORS.g1gc}}>• G1GC (default)</div>
        <div style={{marginBottom: 32, paddingLeft: 60}}>Predictable pauses, good throughput</div>
        <div style={{marginBottom: 40, fontSize: 48, color: COLORS.accent}}>• ZGC / Shenandoah</div>
        <div style={{paddingLeft: 60}}>Sub-millisecond pauses (32GB+ heaps)</div>
      </div>
      <ProgressBar progress={0.65} />
    </AbsoluteFill>
  </FadeTransition>
);
