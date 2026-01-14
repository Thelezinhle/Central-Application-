// debug-routes.cjs - CommonJS version of debug-routes for import testing
const fs = require('fs');
const path = require('path');

console.log('\n🔍 DEBUGGING ROUTE IMPORTS...\n');

const routeFiles = [
  'auth.js',
  'browseCourses.js', 
  'courses.js',
  'universities.js',
  'applications.js',
  'payments.js',
  'documents.js',
  'admin.js',
  'colleges.js',
  'globalUniversities.js'
];

let crashedRoutes = [];
let workingRoutes = [];

routeFiles.forEach(file => {
  try {
    console.log(`📁 Testing: ${file}...`);
    
    const filePath = path.join(__dirname, 'src', 'routes', file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`   ⚠️  File doesn't exist\n`);
      return;
    }
    
    // Clear require cache to get fresh import
    delete require.cache[require.resolve(filePath)];
    const route = require(filePath);
    
    console.log(`   ✅ Loaded successfully\n`);
    workingRoutes.push(file);
    
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    console.log(`      Line: ${error.stack.split('\n')[1]}\n`);
    crashedRoutes.push({ file, error: error.message });
  }
});

console.log('\n========== DIAGNOSTIC RESULTS ==========');
console.log(`✅ Working routes: ${workingRoutes.length}`);
workingRoutes.forEach(r => console.log(`   - ${r}`));

console.log(`\n❌ Crashing routes: ${crashedRoutes.length}`);
crashedRoutes.forEach(r => {
  console.log(`   - ${r.file}: ${r.error}`);
});

console.log('\n========================================\n');

if (crashedRoutes.length === 0) {
  console.log('✅ All routes can be imported!\n');
} else {
  console.log(`⚠️  Fix these ${crashedRoutes.length} routes before enabling imports.\n`);
}
