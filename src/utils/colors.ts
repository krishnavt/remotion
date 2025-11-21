import chroma from 'chroma-js';

// Professional color palette
export const colors = {
  primary: {
    blue: '#4ECDC4',
    darkBlue: '#44A08D',
    purple: '#667eea',
    darkPurple: '#764ba2',
  },
  accent: {
    green: '#00FF7F',
    gold: '#FFD700',
    orange: '#FFA500',
    red: '#FF6B6B',
  },
  neutral: {
    dark: '#0f0f23',
    medium: '#1a1a2e',
    light: '#16213e',
    white: '#ffffff',
    gray: '#8A8A8A',
  }
};

// Generate smooth gradients
export const createGradient = (color1: string, color2: string, angle = 135) => {
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};

// Generate color scales
export const createColorScale = (baseColor: string, steps = 5) => {
  return chroma.scale([chroma(baseColor).brighten(2), baseColor, chroma(baseColor).darken(2)])
    .mode('lch')
    .colors(steps);
};

// Ensure good contrast
export const ensureContrast = (backgroundColor: string, textColor: string, ratio = 4.5) => {
  const contrast = chroma.contrast(backgroundColor, textColor);
  if (contrast < ratio) {
    return chroma(backgroundColor).luminance() > 0.5 
      ? chroma(textColor).darken() 
      : chroma(textColor).brighten();
  }
  return textColor;
};