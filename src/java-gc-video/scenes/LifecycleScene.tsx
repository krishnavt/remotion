import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS} from '../constants';
import {TitleBar} from '../components/TitleBar';
import {HeapLayout} from '../components/HeapLayout';
import {ObjBox} from '../components/ObjBox';
import {Arrow} from '../components/Arrow';
import {ProgressBar} from '../components/ProgressBar';
import {FadeTransition} from '../components/FadeTransition';

export const LifecycleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const createProgress = Math.min(t / 3, 1);
  const moveProgress = Math.min(Math.max((t - 3) / 4, 0), 1);
  const collectProgress = Math.min(Math.max((t - 7) / 3, 0), 1);

  const animateObj = (index: number) => {
    const offsetX = (index % 3) * 120;
    const offsetY = Math.floor(index / 3) * 90;
    let x = 220 + offsetX;
    let y = 420 + offsetY;
    let color = COLORS.liveObj;
    let opacity = createProgress;
    const glow = moveProgress > 0.1 && index <= 2;

    if (moveProgress > 0.1) {
      if (index <= 2) {
        const toSurvivor = Math.min(moveProgress * 2, 1);
        const toOld = Math.max(moveProgress * 2 - 1, 0);
        if (toOld < 0.001) {
          x = x + (760 + offsetX - x) * toSurvivor;
          y = y + (420 + offsetY - y) * toSurvivor;
        } else {
          x = 760 + offsetX + (1150 + offsetX - 760 - offsetX) * toOld;
          y = 420 + offsetY;
        }
      } else {
        color = COLORS.deadObj;
        opacity = 1 - collectProgress;
      }
    }
    return <ObjBox key={index} x={x} y={y} color={color} label={`O${index + 1}`} opacity={opacity} glow={glow} />;
  };

  return (
    <FadeTransition>
      <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
        <TitleBar title="Object Lifecycle" subtitle="90%+ of objects die young and never leave Eden" />
        <HeapLayout />
        {[0, 1, 2, 3, 4, 5].map((i) => animateObj(i))}
        {moveProgress > 0.2 && moveProgress < 0.8 && <Arrow fromX={550} fromY={480} toX={720} toY={480} opacity={interpolate(moveProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])} />}
        <ProgressBar progress={0.25} />
      </AbsoluteFill>
    </FadeTransition>
  );
};
