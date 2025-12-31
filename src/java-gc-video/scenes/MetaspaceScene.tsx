import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {HeapLayout} from '../components/HeapLayout';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const MetaspaceScene: React.FC = () => (
  <FadeTransition>
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <TitleBar title="Metaspace" subtitle="Class metadata & method storage" />
      <HeapLayout showLabels={false} />
      <div style={{position: 'absolute', left: 160, top: 820, width: 1600, height: 180, borderRadius: 20, border: `4px solid ${COLORS.metaspace}`, background: 'rgba(139,92,246,0.15)', padding: '40px', color: COLORS.text, fontSize: 36, boxShadow: `0 0 40px ${COLORS.metaspace}40`}}>
        Stores class definitions, method bytecode, constant pool<br/>Grows dynamically (no fixed size like PermGen)<br/>Full GC when Metaspace fills up
      </div>
      <ProgressBar progress={0.45} />
    </AbsoluteFill>
  </FadeTransition>
);
