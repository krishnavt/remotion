import { loadFont } from '@remotion/google-fonts/Inter';
import { loadFont as loadRoboto } from '@remotion/google-fonts/Roboto';
import { loadFont as loadPoppins } from '@remotion/google-fonts/Poppins';

// Load professional fonts
export const { fontFamily: InterFont } = loadFont();
export const { fontFamily: RobotoFont } = loadRoboto();
export const { fontFamily: PoppinsFont } = loadPoppins();

// Font presets for different text types
export const fontPresets = {
  heading: {
    fontFamily: PoppinsFont,
    fontWeight: '700',
  },
  body: {
    fontFamily: InterFont,
    fontWeight: '400',
  },
  mono: {
    fontFamily: RobotoFont,
    fontWeight: '500',
  },
};