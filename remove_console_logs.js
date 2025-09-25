const fs = require('fs');
const path = require('path');

// Directories to process
const directories = [
  path.join(__dirname, 'backend'),
  path.join(__dirname, 'frontend')
];

// File extensions to process
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Regular expression to match console statements
const consoleRegex = /^\s*console\.(log|error|warn|info|debug).*$/gm;

// Counter for statistics
let filesProcessed = 0;
let filesModified = 0;
let consoleStatementsRemoved = 0;

// Process a file
function processFile(filePath) {
  // Skip node_modules
  if (filePath.includes('node_modules')) {
    return;
  }
  
  // Check if file has a valid extension
  const ext = path.extname(filePath);
  if (!extensions.includes(ext)) {
    return;
  }
  
  filesProcessed++;
  
  try {
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Count console statements
    const matches = content.match(consoleRegex);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
      // Remove console statements
      const newContent = content.replace(consoleRegex, '');
      
      // Write back to file
      fs.writeFileSync(filePath, newContent, 'utf8');
      
      filesModified++;
      consoleStatementsRemoved += count;
      console.log(`Removed ${count} console statements from ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
}

// Process a directory recursively
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        // Skip node_modules
        if (item === 'node_modules') {
          continue;
        }
        processDirectory(itemPath);
      } else if (stats.isFile()) {
        processFile(itemPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Main execution
console.log('Starting to remove console logs...');

for (const dir of directories) {
  console.log(`Processing directory: ${dir}`);
  processDirectory(dir);
}

console.log('\nSummary:');
console.log(`Files processed: ${filesProcessed}`);
console.log(`Files modified: ${filesModified}`);
console.log(`Console statements removed: ${consoleStatementsRemoved}`);
console.log('Done!');