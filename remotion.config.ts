import { Config } from '@remotion/cli/config';

// High quality settings for YouTube
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setJpegQuality(100);
Config.setCrf(15); // Lower = better quality (15 is very high quality)
Config.setCodec('h264');
// Don't set videoBitrate when using CRF

export default Config;