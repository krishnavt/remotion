const fs = require('fs');
const path = require('path');

// Files to fix
const sceneFiles = [
  'Scene1_HookIntro.tsx',
  'Scene2_BigPicture.tsx', 
  'Scene4_ScalePerformance.tsx',
  'Scene5_ArchitectureLayers.tsx',
  'Scene6_DatabaseStrategies.tsx',
  'Scene7_CachingStrategies.tsx',
  'Scene8_MessageQueues.tsx',
  'Scene9_PuttingItTogether.tsx',
  'Scene10_Outro.tsx',
  'components/BrandIntro.tsx'
];

function applyFullScreenFixes(content) {
  let modified = false;
  
  // Fix 1: Add height: '100vh' to main AbsoluteFill containers
  const absoluteFillPattern = /<AbsoluteFill\s+style=\{\{([^}]+)\}\}>/g;
  content = content.replace(absoluteFillPattern, (match, styleContent) => {
    if (styleContent.includes('display:') && styleContent.includes('flex') && 
        !styleContent.includes('height:') && !styleContent.includes('position: \'absolute\'')) {
      const newStyle = styleContent + ',\n        height: \'100vh\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  // Fix 2: Ensure containers use full width
  const containerPattern = /style=\{\{([^}]*display:\s*['"]flex['"][^}]*)\}\}/g;
  content = content.replace(containerPattern, (match, styleContent) => {
    if (!styleContent.includes('width:') && !styleContent.includes('position:')) {
      const newStyle = styleContent + ',\n        width: \'100%\'';
      modified = true;
      return match.replace(styleContent, newStyle);
    }
    return match;
  });
  
  // Fix 3: Update padding to use more screen space (reduce excessive padding)
  const paddingPattern = /padding:\s*['"][0-9]+px\s+[0-9]+px['"]/g;
  content = content.replace(paddingPattern, (match) => {
    const paddingValues = match.match(/[0-9]+/g);
    if (paddingValues && paddingValues.length >= 2) {
      const vertical = Math.min(parseInt(paddingValues[0]), 80);
      const horizontal = Math.min(parseInt(paddingValues[1]), 100);
      modified = true;
      return `padding: '${vertical}px ${horizontal}px'`;
    }
    return match;
  });
  
  // Fix 4: Ensure maxWidth uses percentage instead of fixed pixels for better responsiveness
  const maxWidthPattern = /maxWidth:\s*[0-9]+/g;
  content = content.replace(maxWidthPattern, (match) => {
    const width = match.match(/[0-9]+/)[0];
    if (parseInt(width) > 800) {
      modified = true;
      return "maxWidth: '90%'";
    }
    return match;
  });
  
  // Fix 5: Update justifyContent to center content better
  const justifyPattern = /justifyContent:\s*['"]space-between['"]/g;
  content = content.replace(justifyPattern, () => {
    modified = true;
    return "justifyContent: 'center'";
  });
  
  return { content, modified };
}

function fixFullScreenLayout() {
  console.log('🖥️  Applying full-screen layout optimizations...\n');
  
  const srcDir = './src';
  let totalFixed = 0;
  
  for (const fileName of sceneFiles) {
    const filePath = path.join(srcDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const { content: newContent, modified } = applyFullScreenFixes(originalContent);
        
        if (modified) {
          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Applied full-screen layout fixes to ${fileName}`);
          totalFixed++;
        } else {
          console.log(`📋 No layout fixes needed for ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error.message);
      }
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  }
  
  console.log(`\n🎉 Full-screen layout optimization complete! Updated ${totalFixed} files.`);
  console.log('\n💡 Applied optimizations:');
  console.log('  - height: 100vh for main containers');
  console.log('  - width: 100% for flex containers');
  console.log('  - Reduced excessive padding for better space usage');
  console.log('  - maxWidth as percentage for responsiveness');
  console.log('  - Centered content alignment');
  console.log('\nRefresh the browser to see the improved layouts!');
}

fixFullScreenLayout();