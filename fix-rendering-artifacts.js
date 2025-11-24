const fs = require('fs');
const path = require('path');

// Files to fix
const sceneFiles = [
  'Scene1_HookIntro.tsx',
  'Scene2_BigPicture.tsx', 
  'Scene3_CAPTheorem.tsx',
  'Scene4_ScalePerformance.tsx',
  'Scene5_ArchitectureLayers.tsx',
  'Scene6_DatabaseStrategies.tsx',
  'Scene7_CachingStrategies.tsx',
  'Scene8_MessageQueues.tsx',
  'Scene9_PuttingItTogether.tsx',
  'Scene10_Outro.tsx',
  'components/BrandIntro.tsx'
];

function addAntiAliasing(content) {
  let modified = false;
  
  // Add anti-aliasing to main AbsoluteFill containers
  const absoluteFillPattern = /<AbsoluteFill\s+style=\{\{([^}]+)\}\}>/g;
  content = content.replace(absoluteFillPattern, (match, styleContent) => {
    if (!styleContent.includes('WebkitBackfaceVisibility')) {
      const newStyle = styleContent + ',\n        WebkitBackfaceVisibility: \'hidden\',\n        WebkitTransform: \'translateZ(0)\',\n        WebkitPerspective: 1000,\n        WebkitTransformStyle: \'preserve-3d\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  // Add text optimization to all text elements
  const textStylePattern = /style=\{\{([^}]*fontSize[^}]*)\}\}/g;
  content = content.replace(textStylePattern, (match, styleContent) => {
    if (!styleContent.includes('WebkitFontSmoothing')) {
      const newStyle = styleContent + ',\n        WebkitFontSmoothing: \'antialiased\',\n        MozOsxFontSmoothing: \'grayscale\',\n        textRendering: \'optimizeLegibility\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  // Optimize SVG rendering
  const svgPattern = /<svg([^>]*)>/g;
  content = content.replace(svgPattern, (match, attributes) => {
    if (!attributes.includes('style=')) {
      modified = true;
      return `<svg${attributes} style={{shapeRendering: 'geometricPrecision', textRendering: 'optimizeLegibility'}}>`;
    }
    return match;
  });
  
  return { content, modified };
}

function fixRenderingArtifacts() {
  console.log('🎨 Fixing rendering artifacts and adding anti-aliasing...\n');
  
  const srcDir = './src';
  let totalFixed = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const { content: newContent, modified } = addAntiAliasing(originalContent);
        
        if (modified) {
          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Applied anti-aliasing fixes to ${fileName}`);
          totalFixed++;
        } else {
          console.log(`📋 No anti-aliasing fixes needed for ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 Rendering artifact fixes complete! Updated ${totalFixed} files.`);
  console.log('\n💡 Applied anti-aliasing optimizations:');
  console.log('  - Hardware acceleration for containers');
  console.log('  - Font smoothing for all text');
  console.log('  - SVG rendering optimization');
  console.log('  - 3D transform optimizations');
  console.log('\nGlitches should now be eliminated!');
}

fixRenderingArtifacts();