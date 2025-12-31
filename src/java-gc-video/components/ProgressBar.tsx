import React from 'react';
import {COLORS} from '../constants';

export const ProgressBar: React.FC<{progress: number}> = ({progress}) => (
  <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: 8, background: 'rgba(75,85,99,0.3)'}}>
    <div style={{height: '100%', width: `${progress * 100}%`, background: `linear-gradient(90deg, ${COLORS.g1gc}, ${COLORS.accent})`, transition: 'width 0.3s ease'}} />
  </div>
);
