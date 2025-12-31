import React from 'react';
import {COLORS} from '../constants';

export const HeapLayout: React.FC<{showLabels?: boolean; highlight?: 'eden'|'survivor'|'old'}> = ({showLabels = true, highlight}) => (
  <div style={{position: 'absolute', left: 160, top: 260, width: 1600, height: 520, borderRadius: 30, border: `4px solid ${COLORS.heapBorder}`, display: 'flex', overflow: 'hidden', background: 'rgba(15,23,42,0.8)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)'}}>
    <div style={{flex: 2, background: highlight === 'eden' ? 'rgba(34,197,94,0.25)' : 'rgba(34,197,94,0.10)', borderRight: `3px solid ${COLORS.heapBorder}`, position: 'relative', transition: 'background 0.5s ease'}}>
      {showLabels && <div style={{position: 'absolute', top: 16, left: 24, color: COLORS.eden, fontSize: 30, fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>Eden (Young)</div>}
    </div>
    <div style={{flex: 1, background: highlight === 'survivor' ? 'rgba(250,204,21,0.25)' : 'rgba(250,204,21,0.10)', borderRight: `3px solid ${COLORS.heapBorder}`, position: 'relative', transition: 'background 0.5s ease'}}>
      {showLabels && <div style={{position: 'absolute', top: 16, left: 24, color: COLORS.survivor, fontSize: 30, fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>Survivor</div>}
    </div>
    <div style={{flex: 3, background: highlight === 'old' ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.10)', position: 'relative', transition: 'background 0.5s ease'}}>
      {showLabels && <div style={{position: 'absolute', top: 16, left: 24, color: COLORS.old, fontSize: 30, fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>Old Generation</div>}
    </div>
  </div>
);
