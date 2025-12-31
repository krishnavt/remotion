import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {COLORS} from './constants';
import {TitleBar} from './components/TitleBar';
import {ProgressBar} from './components/ProgressBar';
import {FadeTransition} from './components/FadeTransition';
import {IntroScene} from './scenes/IntroScene';
import {HeapScene} from './scenes/HeapScene';
import {LifecycleScene} from './scenes/LifecycleScene';
import {MarkSweepScene} from './scenes/MarkSweepScene';
import {MetaspaceScene} from './scenes/MetaspaceScene';
import {GcPressureScene} from './scenes/GcPressureScene';
import {GcTypesScene} from './scenes/GcTypesScene';
import {PauseScene} from './scenes/PauseScene';
import {TipsScene} from './scenes/TipsScene';

export const JavaGcVideo: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      <Sequence from={0} durationInFrames={6 * fps}><IntroScene /></Sequence>
      <Sequence from={6 * fps} durationInFrames={10 * fps}><HeapScene /></Sequence>
      <Sequence from={16 * fps} durationInFrames={14 * fps}><LifecycleScene /></Sequence>
      <Sequence from={30 * fps} durationInFrames={14 * fps}><MarkSweepScene /></Sequence>
      <Sequence from={44 * fps} durationInFrames={10 * fps}><MetaspaceScene /></Sequence>
      <Sequence from={54 * fps} durationInFrames={12 * fps}><GcPressureScene /></Sequence>
      <Sequence from={66 * fps} durationInFrames={10 * fps}><GcTypesScene /></Sequence>
      <Sequence from={76 * fps} durationInFrames={10 * fps}><PauseScene /></Sequence>
      <Sequence from={86 * fps} durationInFrames={12 * fps}><TipsScene /></Sequence>
      <Sequence from={98 * fps} durationInFrames={22 * fps}>
        <FadeTransition>
          <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
            <TitleBar title="Thank You!" subtitle="Understand your GC, write better Java" />
            <div style={{position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%, -50%)', color: COLORS.text, fontSize: 48, textAlign: 'center', lineHeight: 1.6}}>
              Profile your application<br/>Tune if needed<br/>Let GC do its job ✨
            </div>
            <ProgressBar progress={1} />
          </AbsoluteFill>
        </FadeTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
