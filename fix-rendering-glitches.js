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

function addRenderingFixes(content) {
  let modified = false;
  
  // Fix 1: Add overflow hidden to AbsoluteFill containers
  const absoluteFillPattern = /<AbsoluteFill\s+style=\{\{([^}]+)\}\}/g;
  content = content.replace(absoluteFillPattern, (match, styleContent) => {
    if (!styleContent.includes('overflow:') && !styleContent.includes('transform:')) {
      const newStyle = styleContent + ',\n        overflow: \'hidden\',\n        transform: \'translateZ(0)\',\n        backfaceVisibility: \'hidden\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  // Fix 2: Add will-change to animated elements
  const animatedDivPattern = /style=\{\{([^}]*opacity[^}]*)\}\}/g;
  content = content.replace(animatedDivPattern, (match, styleContent) => {
    if (!styleContent.includes('willChange')) {
      const newStyle = styleContent + ',\n        willChange: \'opacity, transform\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  // Fix 3: Add containment to prevent layout shifts
  const containerDivPattern = /style=\{\{([^}]*display:\s*['"']flex['"'][^}]*)\}\}/g;
  content = content.replace(containerDivPattern, (match, styleContent) => {
    if (!styleContent.includes('contain:')) {
      const newStyle = styleContent + ',\n        contain: \'layout style paint\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  return { content, modified };
}

function fixRenderingGlitches() {
  console.log('🔧 Fixing rendering glitches and artifacts...\n');
  
  const srcDir = './src';
  let totalFixed = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const { content: newContent, modified } = addRenderingFixes(originalContent);
        
        if (modified) {
          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Fixed rendering issues in ${fileName}`);
          totalFixed++;
        } else {
          console.log(`📋 No rendering fixes needed for ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 Rendering fixes complete! Updated ${totalFixed} files.`);
  console.log('\n💡 Applied fixes:');
  console.log('  - overflow: hidden on containers');
  console.log('  - transform: translateZ(0) for hardware acceleration');
  console.log('  - backfaceVisibility: hidden to prevent artifacts');
  console.log('  - willChange for animated elements');
  console.log('  - CSS containment for layout stability');
  console.log('\nReload the browser to see the fixes applied.');
}

fixRenderingGlitches();