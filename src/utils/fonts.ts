import { loadFont } from '@remotion/google-fonts/Inter';
import { loadFont as loadRoboto } from '@remotion/google-fonts/Roboto';
import { loadFont as loadPoppins } from '@remotion/google-fonts/Poppins';

// Load professional fonts with optimized weights and subsets
export const { fontFamily: InterFont } = loadFont('normal', {
  weights: ['400', '600'],
  subsets: ['latin'],
});

export const { fontFamily: RobotoFont } = loadRoboto('normal', {
  weights: ['400', '500', '700'],
  subsets: ['latin'],
});

export const { fontFamily: PoppinsFont } = loadPoppins('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
});

// Font presets for different text types - optimized for 4K rendering
export const fontPresets = {
  heading: {
    fontFamily: PoppinsFont,
    fontWeight: '700',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  body: {
    fontFamily: InterFont,
    fontWeight: '400',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  mono: {
    fontFamily: RobotoFont,
    fontWeight: '500',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
};