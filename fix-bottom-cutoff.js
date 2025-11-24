const fs = require('fs');
const path = require('path');

// Even more conservative scaling (1.2x instead of 1.5x)
const SAFE_SCALE_FACTOR = 1.2;
const CURRENT_SCALE_FACTOR = 1.5;

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

// Focus on vertical spacing and height-related properties
const scalingPatterns = [
  // Heights and vertical spacing that cause bottom cutoff
  { pattern: /gap:\s*(\d+),?/g, scale: true, priority: 'high' },
  { pattern: /padding:\s*'(\d+)px\s+(\d+)px'/g, scale: true, twoValues: true, priority: 'high' },
  { pattern: /padding:\s*'(\d+)px'/g, scale: true, priority: 'high' },
  { pattern: /height:\s*(\d+),?/g, scale: true, priority: 'high' },
  { pattern: /minHeight:\s*(\d+),?/g, scale: true, priority: 'high' },
  { pattern: /maxHeight:\s*(\d+),?/g, scale: true, priority: 'high' },
  
  // Font sizes (moderate scaling)
  { pattern: /fontSize:\s*(\d+),?/g, scale: true, priority: 'medium' },
  
  // Icon sizes (keep reasonable)
  { pattern: /size\s*=\s*(\d+)/g, scale: true, priority: 'medium' },
  
  // Width and other properties (less critical)
  { pattern: /width:\s*(\d+),?/g, scale: true, priority: 'low' },
  { pattern: /minWidth:\s*(\d+),?/g, scale: true, priority: 'low' },
  { pattern: /maxWidth:\s*(\d+),?/g, scale: true, priority: 'low' },
  { pattern: /borderRadius:\s*(\d+),?/g, scale: true, priority: 'low' },
  { pattern: /letterSpacing:\s*(\d+),?/g, scale: true, priority: 'low' },
  { pattern: /strokeWidth="(\d+)"/g, scale: true, priority: 'low' },
  { pattern: /drop-shadow\(0\s+0\s+(\d+)px/g, scale: true, priority: 'low' },
  { pattern: /0\s+(\d+)px\s+(\d+)px/g, scale: true, twoValues: true, priority: 'low' },
  { pattern: /radius:\s*(\d+)/g, scale: true, priority: 'medium' },
];

function convertToSafeScale(value, priority = 'medium') {
  // Convert from 1.5x scale back to 1x, then apply safe 1.2x
  const original = Math.round(parseInt(value) / CURRENT_SCALE_FACTOR);
  
  // Apply different scaling based on priority
  switch(priority) {
    case 'high':
      // Vertical spacing gets most conservative scaling
      return Math.round(original * 1.1);
    case 'medium':
      return Math.round(original * SAFE_SCALE_FACTOR);
    case 'low':
      return Math.round(original * SAFE_SCALE_FACTOR);
    default:
      return Math.round(original * SAFE_SCALE_FACTOR);
  }
}

function updateFileForSafeScaling(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    console.log(`\n📝 Fixing ${path.basename(filePath)} for safe 4K scaling...`);
    
    for (const pattern of scalingPatterns) {
      const originalContent = content;
      
      if (pattern.twoValues) {
        content = content.replace(pattern.pattern, (match, val1, val2) => {
          if (pattern.scale) {
            const newVal1 = convertToSafeScale(val1, pattern.priority);
            const newVal2 = convertToSafeScale(val2, pattern.priority);
            const replacement = match.replace(val1, newVal1).replace(val2, newVal2);
            if (newVal1 !== parseInt(val1) || newVal2 !== parseInt(val2)) {
              console.log(`  ✓ ${match} → ${replacement} (${pattern.priority})`);
            }
            return replacement;
          }
          return match;
        });
      } else {
        content = content.replace(pattern.pattern, (match, value) => {
          if (pattern.scale) {
            const newValue = convertToSafeScale(value, pattern.priority);
            const replacement = match.replace(value, newValue);
            if (newValue !== parseInt(value)) {
              console.log(`  ✓ ${match} → ${replacement} (${pattern.priority})`);
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
      console.log(`✅ Fixed ${path.basename(filePath)} for safe scaling`);
    } else {
      console.log(`📋 No changes needed for ${path.basename(filePath)}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

function fixBottomCutoff() {
  console.log('🔧 Fixing bottom cutoff with conservative 1.2x scaling...\n');
  console.log('Prioritizing vertical spacing reduction to prevent overflow.\n');
  
  const srcDir = './src';
  let totalFixed = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      updateFileForSafeScaling(filePath);
      totalFixed++;
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 Bottom cutoff fix complete! Updated ${totalFixed} files.`);
  console.log('\n💡 Changes made:');
  console.log('  - Vertical spacing: 1.1x scaling (most conservative)');
  console.log('  - Font sizes & icons: 1.2x scaling');
  console.log('  - Widths & effects: 1.2x scaling');
  console.log('\nElements should now fit comfortably within 4K frame bounds.');
}

fixBottomCutoff();