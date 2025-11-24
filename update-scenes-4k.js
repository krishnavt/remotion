const fs = require('fs');
const path = require('path');

// 4K scaling factor (2x from 1080p to 4K)
const SCALE_FACTOR = 2;

// Files to update
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

// Patterns to scale up for 4K
const scalingPatterns = [
  // Font sizes
  { pattern: /fontSize:\s*(\d+),?/g, scale: true },
  { pattern: /fontSize:\s*(\d+)px/g, scale: true },
  
  // Sizes and dimensions
  { pattern: /size\s*=\s*(\d+)/g, scale: true },
  { pattern: /width:\s*(\d+),?/g, scale: true },
  { pattern: /height:\s*(\d+),?/g, scale: true },
  { pattern: /minWidth:\s*(\d+),?/g, scale: true },
  { pattern: /maxWidth:\s*(\d+),?/g, scale: true },
  { pattern: /minHeight:\s*(\d+),?/g, scale: true },
  { pattern: /maxHeight:\s*(\d+),?/g, scale: true },
  
  // Spacing and positioning
  { pattern: /gap:\s*(\d+),?/g, scale: true },
  { pattern: /padding:\s*'(\d+)px\s+(\d+)px'/g, scale: true, twoValues: true },
  { pattern: /padding:\s*'(\d+)px'/g, scale: true },
  { pattern: /margin:\s*(\d+),?/g, scale: true },
  { pattern: /borderRadius:\s*(\d+),?/g, scale: true },
  { pattern: /letterSpacing:\s*(\d+),?/g, scale: true },
  
  // SVG stroke widths
  { pattern: /strokeWidth="(\d+)"/g, scale: true },
  { pattern: /strokeWidth=\\"(\d+)\\"/g, scale: true },
  
  // Shadows and effects
  { pattern: /drop-shadow\(0\s+0\s+(\d+)px/g, scale: true },
  { pattern: /0\s+(\d+)px\s+(\d+)px/g, scale: true, twoValues: true },
  
  // Radius values
  { pattern: /radius:\s*(\d+)/g, scale: true },
];

function scaleValue(value) {
  return Math.round(parseInt(value) * SCALE_FACTOR);
}

function updateFileForScaling(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    console.log(`\n📝 Updating ${path.basename(filePath)}...`);
    
    for (const pattern of scalingPatterns) {
      const originalContent = content;
      
      if (pattern.twoValues) {
        content = content.replace(pattern.pattern, (match, val1, val2) => {
          if (pattern.scale) {
            const newVal1 = scaleValue(val1);
            const newVal2 = scaleValue(val2);
            const replacement = match.replace(val1, newVal1).replace(val2, newVal2);
            console.log(`  ✓ ${match} → ${replacement}`);
            return replacement;
          }
          return match;
        });
      } else {
        content = content.replace(pattern.pattern, (match, value) => {
          if (pattern.scale) {
            const newValue = scaleValue(value);
            const replacement = match.replace(value, newValue);
            console.log(`  ✓ ${match} → ${replacement}`);
            return replacement;
          }
          return match;
        });
      }
      
      if (content !== originalContent) {
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${path.basename(filePath)}`);
    } else {
      console.log(`📋 No changes needed for ${path.basename(filePath)}`);
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function updateAllScenes() {
  console.log('🚀 Starting 4K scaling update for all scenes...\n');
  
  const srcDir = './src';
  let totalUpdated = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      updateFileForScaling(filePath);
      totalUpdated++;
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 Scaling complete! Updated ${totalUpdated} files for 4K resolution.`);
  console.log('\n💡 Next steps:');
  console.log('  1. Check the preview in browser');
  console.log('  2. Run: npm run render-hq Scene1-HookIntro');
  console.log('  3. Verify 4K quality and adjust if needed');
}

updateAllScenes();