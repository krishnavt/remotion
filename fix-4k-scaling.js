const fs = require('fs');
const path = require('path');

// Optimal 4K scaling factor (1.5x instead of 2x)
const OPTIMAL_SCALE_FACTOR = 1.5;
const CURRENT_SCALE_FACTOR = 2;

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

// Patterns that need to be scaled down from 2x to 1.5x
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

function convertToOptimalScale(value) {
  // Convert from 2x scale back to 1x, then apply 1.5x
  const original = Math.round(parseInt(value) / CURRENT_SCALE_FACTOR);
  return Math.round(original * OPTIMAL_SCALE_FACTOR);
}

function updateFileForOptimalScaling(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    console.log(`\n📝 Fixing ${path.basename(filePath)}...`);
    
    for (const pattern of scalingPatterns) {
      const originalContent = content;
      
      if (pattern.twoValues) {
        content = content.replace(pattern.pattern, (match, val1, val2) => {
          if (pattern.scale) {
            const newVal1 = convertToOptimalScale(val1);
            const newVal2 = convertToOptimalScale(val2);
            const replacement = match.replace(val1, newVal1).replace(val2, newVal2);
            if (newVal1 !== parseInt(val1) || newVal2 !== parseInt(val2)) {
              console.log(`  ✓ ${match} → ${replacement}`);
            }
            return replacement;
          }
          return match;
        });
      } else {
        content = content.replace(pattern.pattern, (match, value) => {
          if (pattern.scale) {
            const newValue = convertToOptimalScale(value);
            const replacement = match.replace(value, newValue);
            if (newValue !== parseInt(value)) {
              console.log(`  ✓ ${match} → ${replacement}`);
            }
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
      console.log(`✅ Fixed ${path.basename(filePath)}`);
    } else {
      console.log(`📋 No changes needed for ${path.basename(filePath)}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

function fixAllScenes() {
  console.log('🔧 Fixing 4K scaling to optimal 1.5x factor...\n');
  console.log('This will ensure elements fit properly within the 4K frame.\n');
  
  const srcDir = './src';
  let totalFixed = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      updateFileForOptimalScaling(filePath);
      totalFixed++;
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 Scaling fix complete! Updated ${totalFixed} files with optimal 4K scaling.`);
  console.log('\n💡 Elements should now fit properly in the 4K frame.');
  console.log('Check the preview and test render to verify the fix.');
}

fixAllScenes();