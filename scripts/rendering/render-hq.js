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
    outputLocation: `out/${compositionId.toLowerCase()}-4k.mp4`,
    inputProps: {},
    // 4K High quality settings
    crf: 12,            // Even higher quality for 4K (12 is extremely high quality)
    pixelFormat: 'yuv420p',
    imageFormat: 'png', // Best quality frames
    jpegQuality: 100,   
    // 4K optimized settings
    x264Preset: 'slower', // Better compression for 4K
    enforceAudioTrack: false,
    muted: true,
    verbose: true,
    // Force 4K resolution override
    overwrite: true,
    scale: 1, // No scaling, use full 4K resolution
  });

  console.log('Render done!');
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});