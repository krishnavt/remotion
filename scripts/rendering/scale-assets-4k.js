const fs = require('fs');
const path = require('path');

// Files to scale
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

function scale4K(content) {
  let modified = false;
  
  // Scale font sizes by 2x for 4K (common sizes: 12-200px)
  const fontSizePattern = /fontSize:\s*(\d+)/g;
  content = content.replace(fontSizePattern, (match, size) => {
    const originalSize = parseInt(size);
    if (originalSize >= 12 && originalSize <= 300) {
      const newSize = Math.round(originalSize * 2);
      modified = true;
      return `fontSize: ${newSize}`;
    }
    return match;
  });
  
  // Scale icon sizes by 2x (size prop)
  const iconSizePattern = /size=\{?(\d+)\}?/g;
  content = content.replace(iconSizePattern, (match, size) => {
    const originalSize = parseInt(size);
    if (originalSize >= 16 && originalSize <= 400) {
      const newSize = Math.round(originalSize * 2);
      modified = true;
      return `size={${newSize}}`;
    }
    return match;
  });
  
  // Scale SVG width and height attributes by 2x
  const svgDimensionPattern = /(width|height)=\{?(\d+)\}?/g;
  content = content.replace(svgDimensionPattern, (match, prop, size) => {
    const originalSize = parseInt(size);
    if (originalSize >= 16 && originalSize <= 400) {
      const newSize = Math.round(originalSize * 2);
      modified = true;
      return `${prop}={${newSize}}`;
    }
    return match;
  });
  
  // Scale CSS width and height values by 2x
  const cssSize = /(width|height|minWidth|maxWidth|minHeight|maxHeight):\s*(\d+)/g;
  content = content.replace(cssSize, (match, property, size) => {
    const originalSize = parseInt(size);
    if (originalSize >= 16 && originalSize <= 800) {
      const newSize = Math.round(originalSize * 2);
      modified = true;
      return `${property}: ${newSize}`;
    }
    return match;
  });
  
  // Scale gap values by 2x
  const gapPattern = /gap:\s*(\d+)/g;
  content = content.replace(gapPattern, (match, gap) => {
    const originalGap = parseInt(gap);
    if (originalGap >= 4 && originalGap <= 200) {
      const newGap = Math.round(originalGap * 2);
      modified = true;
      return `gap: ${newGap}`;
    }
    return match;
  });
  
  // Scale padding values by 2x
  const paddingPattern = /padding:\s*['"](\d+)px\s+(\d+)px['"]/g;
  content = content.replace(paddingPattern, (match, vertical, horizontal) => {
    const newVertical = Math.round(parseInt(vertical) * 2);
    const newHorizontal = Math.round(parseInt(horizontal) * 2);
    modified = true;
    return `padding: '${newVertical}px ${newHorizontal}px'`;
  });
  
  // Scale border radius by 2x
  const borderRadiusPattern = /borderRadius:\s*(\d+)/g;
  content = content.replace(borderRadiusPattern, (match, radius) => {
    const originalRadius = parseInt(radius);
    if (originalRadius >= 4 && originalRadius <= 100) {
      const newRadius = Math.round(originalRadius * 2);
      modified = true;
      return `borderRadius: ${newRadius}`;
    }
    return match;
  });
  
  return { content, modified };
}

function scaleAssetsFor4K() {
  console.log('🎬 Scaling all assets for 4K resolution (2x scale factor)...\n');
  
  const srcDir = './src';
  let totalScaled = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const { content: newContent, modified } = scale4K(originalContent);
        
        if (modified) {
          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Scaled assets for 4K in ${fileName}`);
          totalScaled++;
        } else {
          console.log(`📋 No scaling needed for ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 4K asset scaling complete! Scaled ${totalScaled} files.`);
  console.log('\n💡 Applied 2x scaling to:');
  console.log('  - Font sizes (12px-300px range)');
  console.log('  - Icon sizes and SVG dimensions');
  console.log('  - CSS width/height properties');
  console.log('  - Gap and padding values');
  console.log('  - Border radius values');
  console.log('\nAssets should now properly fill the 4K canvas!');
}

scaleAssetsFor4K();