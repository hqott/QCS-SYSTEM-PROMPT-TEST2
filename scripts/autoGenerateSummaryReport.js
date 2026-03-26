import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

/**
 * Auto-generates summary report from the most recent test directory.
 * 
 * Usage: node autoGenerateSummaryReport.js [base-dir]
 * 
 * Args:
 *   base-dir (optional): Directory to search for test reports. Defaults to 'Reports/'
 * 
 * Returns:
 *   - Generates summary.html in the most recent Reports/tests_* directory
 *   - Prints the path to the generated report
 *   - Exits with 0 on success, 1 on error
 */

const baseDir = process.argv[2] || 'Reports';

function findLatestTestDir(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Base directory does not exist: ${dir}`);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith('tests_'))
    .sort((a, b) => {
      // Sort by timestamp in descending order (newest first)
      return b.name.localeCompare(a.name);
    });

  if (entries.length === 0) {
    throw new Error(`No test directories found in ${dir}`);
  }

  return path.join(dir, entries[0].name);
}

function hasLogFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.some(file => file.endsWith('.log'));
}

try {
  const testDir = findLatestTestDir(baseDir);
  
  if (!hasLogFiles(testDir)) {
    console.error(`No .log files found in ${testDir}`);
    process.exit(1);
  }

  console.log(`Generating summary report for: ${testDir}`);
  
  // Run the main summary report generator
  const cmd = `node ./scripts/generateLogSummaryReport.js "${testDir}"`;
  execSync(cmd, { stdio: 'inherit' });

  const reportPath = path.join(testDir, 'summary.html');
  console.log(`\n✓ Summary report generated: ${reportPath}`);
  process.exit(0);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
