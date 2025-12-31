import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

export const FadeTransition: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  return <div style={{opacity}}>{children}</div>;
};
