const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const path = require('path');

const start = async () => {
  const bundleLocation = await bundle({
    entryPoint: path.resolve('./src/index.ts'),
    // If you have a Webpack override, make sure to add it here
  });

  const compositionId = process.argv[2] || 'SystemDesignHook';
  
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
  });

  console.log(`Rendering ${compositionId} with high quality settings...`);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: `out/${compositionId.toLowerCase()}-hq.mp4`,
    inputProps: {},
    // High quality settings - use either CRF OR videoBitrate, not both
    crf: 15,            // Lower = better quality (15 is very high quality)
    pixelFormat: 'yuv420p',
    imageFormat: 'png', // Best quality frames
    jpegQuality: 100,   // Renamed from 'quality'
    // YouTube optimized settings
    x264Preset: 'slower', // Better compression
    enforceAudioTrack: false,
    muted: true,
    verbose: true,
  });

  console.log('Render done!');
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});