const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition, getCompositions } = require('@remotion/renderer');
const path = require('path');

const start = async () => {
  const bundleLocation = await bundle({
    entryPoint: path.resolve('./src/index.ts'),
  });

  const compositions = await getCompositions(bundleLocation);
  
  console.log(`Found ${compositions.length} compositions to render in 4K...`);

  for (const composition of compositions) {
    console.log(`\n🎬 Rendering ${composition.id} in 4K...`);
    
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: `out/${composition.id.toLowerCase()}-4k.mp4`,
      inputProps: {},
      // 4K High quality settings
      crf: 12,
      pixelFormat: 'yuv420p',
      imageFormat: 'png',
      jpegQuality: 100,
      x264Preset: 'slower',
      enforceAudioTrack: false,
      muted: true,
      verbose: false, // Less verbose for batch rendering
      overwrite: true,
      scale: 1,
    });

    console.log(`✅ Completed: ${composition.id}`);
  }

  console.log('\n🎉 All 4K renders completed!');
};

start().catch((err) => {
  console.error('❌ Render failed:', err);
  process.exit(1);
});