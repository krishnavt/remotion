import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {HeapLayout} from '../components/HeapLayout';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const HeapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const highlightEden = frame > 60 && frame < 120;
  const highlightSurvivor = frame > 120 && frame < 180;
  const highlightOld = frame > 180;
  const currentHighlight = highlightEden ? 'eden' : highlightSurvivor ? 'survivor' : highlightOld ? 'old' : undefined;

  return (
    <FadeTransition>
      <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
        <TitleBar title="The Java Heap" subtitle="Split into young and old generations for efficient collection" />
        <HeapLayout highlight={currentHighlight} />
        <div style={{position: 'absolute', left: 200, top: 820, width: 1520, color: COLORS.text, fontSize: 34}}>
          New objects go to <span style={{color: COLORS.eden, fontWeight: 700}}>Eden</span>. Short-lived objects are collected quickly. Survivors move to <span style={{color: COLORS.survivor, fontWeight: 700}}>Survivor</span> spaces, then the <span style={{color: COLORS.old, fontWeight: 700}}>Old generation</span>.
        </div>
        <ProgressBar progress={0.13} />
      </AbsoluteFill>
    </FadeTransition>
  );
};
