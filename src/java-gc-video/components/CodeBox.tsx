import React from 'react';
import {COLORS} from '../constants';

export const CodeBox: React.FC<{code: string; x: number; y: number; opacity?: number}> = ({code, x, y, opacity = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, padding: '12px 20px', background: 'rgba(30,41,59,0.9)', borderRadius: 8, border: '2px solid rgba(100,116,139,0.5)', fontFamily: 'monospace', fontSize: 32, color: COLORS.g1gc, opacity, boxShadow: '0 4px 20px rgba(0,0,0,0.4)'}}>{code}</div>
);
