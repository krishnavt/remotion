// Layout utilities for ensuring content stays within frame bounds

// Safe area margins (in pixels)
export const SAFE_AREA = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};

// Video dimensions
export const VIDEO_DIMENSIONS = {
  width: 1920,
  height: 1080,
};

// Calculate safe area dimensions
export const SAFE_DIMENSIONS = {
  width: VIDEO_DIMENSIONS.width - SAFE_AREA.left - SAFE_AREA.right,
  height: VIDEO_DIMENSIONS.height - SAFE_AREA.top - SAFE_AREA.bottom,
};

// Safe area container style
export const safeAreaStyle: React.CSSProperties = {
  position: 'absolute',
  top: SAFE_AREA.top,
  left: SAFE_AREA.left,
  right: SAFE_AREA.right,
  bottom: SAFE_AREA.bottom,
  width: SAFE_DIMENSIONS.width,
  height: SAFE_DIMENSIONS.height,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden', // Prevent overflow
};

// Constrain size to safe area
export const constrainSize = (requestedSize: number, maxPercentage = 0.8): number => {
  const maxWidth = SAFE_DIMENSIONS.width * maxPercentage;
  const maxHeight = SAFE_DIMENSIONS.height * maxPercentage;
  const maxSize = Math.min(maxWidth, maxHeight);
  return Math.min(requestedSize, maxSize);
};

// Get centered position within safe area
export const getCenteredPosition = (elementWidth: number, elementHeight: number) => {
  return {
    x: SAFE_AREA.left + (SAFE_DIMENSIONS.width - elementWidth) / 2,
    y: SAFE_AREA.top + (SAFE_DIMENSIONS.height - elementHeight) / 2,
  };
};

// Maximum icon size that will fit safely
export const MAX_ICON_SIZE = 160;
export const MAX_TITLE_SIZE = 100;
export const MAX_TEXT_SIZE = 60;
