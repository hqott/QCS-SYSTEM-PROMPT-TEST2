import fs from 'node:fs';
import path from 'node:path';

if (!process.argv[2]) {
  console.error('Usage: node generateLogSummaryReport.js <report-dir> [output-filename]');
  console.error('  <report-dir>        Path to a folder containing .log test files (required)');
  console.error('  [output-filename]   HTML filename to write (default: summary.html)');
  process.exit(1);
}

const inputDir = path.resolve(process.argv[2]);
const outputFileName = process.argv[3] || 'summary.html';
const outputPath = path.join(inputDir, outputFileName);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeStatus(raw = '') {
  const s = raw.trim().toUpperCase();
  if (['PASS', 'PASSED', 'SUCCESS', 'OK'].includes(s)) {
    return 'PASS';
  }
  if (['FAIL', 'FAILED', 'ERROR'].includes(s)) {
    return 'FAIL';
  }
  return s || 'UNKNOWN';
}

function parseLogFile(filePath) {
  const fileName = path.basename(filePath);
  const testName = path.basename(filePath, path.extname(filePath));
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  const result = {
    fileName,
    testName,
    startedAt: '',
    finalStatus: 'UNKNOWN',
    steps: [],
  };

  const bannerRegex = /^===\s+(.+?)\s+(PASSED|FAILED)\s+===$/i;
  const stepRegex = /^\[(.+?)\]\s+([^:]+):\s+([^-]+?)(?:\s+-\s+(.*))?$/;
  const startedRegex = /^\[(.+?)\]\s+Test started(?:\s*:\s*(.+))?$/i;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    const bannerMatch = line.match(bannerRegex);
    if (bannerMatch) {
      result.finalStatus = normalizeStatus(bannerMatch[2]);
      continue;
    }

    if (/^===\s+.*\s+===$/.test(line)) {
      continue;
    }

    const startedMatch = line.match(startedRegex);
    if (startedMatch) {
      result.startedAt = startedMatch[1];
      continue;
    }

    const stepMatch = line.match(stepRegex);
    if (stepMatch) {
      const [, timestamp, stepName, statusRaw, detailRaw] = stepMatch;
      result.steps.push({
        timestamp: timestamp.trim(),
        stepName: stepName.trim(),
        status: normalizeStatus(statusRaw),
        detail: (detailRaw || '').trim(),
      });
    }
  }

  if (result.finalStatus === 'UNKNOWN') {
    const hasFail = result.steps.some((s) => s.status === 'FAIL');
    const hasPass = result.steps.length > 0 && result.steps.every((s) => s.status === 'PASS');
    result.finalStatus = hasFail ? 'FAIL' : hasPass ? 'PASS' : 'UNKNOWN';
  }

  return result;
}

function renderHtml(testResults, reportDir) {
  const generatedAt = new Date().toLocaleString();

  const cards = testResults
    .map((test) => {
      const badgeClass = test.finalStatus === 'PASS' ? 'pass' : test.finalStatus === 'FAIL' ? 'fail' : 'unknown';
      const stepRows = test.steps
        .map((step, index) => `
          <tr>
            <td>${index + 1}</td>
            <td><code>${escapeHtml(step.timestamp)}</code></td>
            <td>${escapeHtml(step.stepName)}</td>
            <td><span class="step-status ${step.status === 'PASS' ? 'pass' : step.status === 'FAIL' ? 'fail' : 'unknown'}">${escapeHtml(step.status)}</span></td>
            <td>${escapeHtml(step.detail || '-')}</td>
          </tr>
        `)
        .join('');

      return `
        <section class="test-card">
          <div class="test-header">
            <h2>${escapeHtml(test.testName)}</h2>
            <span class="status ${badgeClass}">${escapeHtml(test.finalStatus)}</span>
          </div>
          <div class="meta">
            <div><strong>Log file:</strong> ${escapeHtml(test.fileName)}</div>
            <div><strong>Started:</strong> ${escapeHtml(test.startedAt || '-')}</div>
            <div><strong>Steps:</strong> ${test.steps.length}</div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Timestamp</th>
                  <th>Step</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                ${stepRows || '<tr><td colspan="5">No step lines found.</td></tr>'}
              </tbody>
            </table>
          </div>
        </section>
      `;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Log Summary</title>
    <style>
      :root {
        --bg: #0b1020;
        --panel: #131a2e;
        --muted: #9fb0d1;
        --text: #e8eeff;
        --border: #2a365c;
        --pass: #1fa971;
        --fail: #d9485f;
        --unknown: #7f8ba3;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(160deg, #070b16 0%, var(--bg) 100%);
        color: var(--text);
        padding: 24px;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 28px;
      }
      .subtitle {
        color: var(--muted);
        margin-bottom: 20px;
      }
      .summary {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      .pill {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 8px 12px;
        color: var(--muted);
        font-size: 13px;
      }
      .test-card {
        background: rgba(19, 26, 46, 0.9);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
      }
      .test-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }
      .test-header h2 {
        margin: 0;
        font-size: 20px;
      }
      .status, .step-status {
        display: inline-block;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.3px;
      }
      .pass { background: rgba(31, 169, 113, 0.2); color: #75f3bf; border: 1px solid rgba(31, 169, 113, 0.5); }
      .fail { background: rgba(217, 72, 95, 0.2); color: #ff9aad; border: 1px solid rgba(217, 72, 95, 0.5); }
      .unknown { background: rgba(127, 139, 163, 0.2); color: #c0cbde; border: 1px solid rgba(127, 139, 163, 0.5); }
      .meta {
        margin-top: 10px;
        color: var(--muted);
        font-size: 14px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 6px 10px;
      }
      .table-wrap {
        overflow-x: auto;
        margin-top: 14px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
      }
      thead {
        background: #18213d;
      }
      th, td {
        text-align: left;
        padding: 10px 12px;
        border-bottom: 1px solid var(--border);
        vertical-align: top;
      }
      tbody tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
      }
      code {
        color: #bcd3ff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Test Log Summary</h1>
      <div class="subtitle">Source directory: <code>${escapeHtml(reportDir)}</code> · Generated: ${escapeHtml(generatedAt)}</div>
      <div class="summary">
        <div class="pill">Total tests: ${testResults.length}</div>
        <div class="pill">Passed: ${testResults.filter((t) => t.finalStatus === 'PASS').length}</div>
        <div class="pill">Failed: ${testResults.filter((t) => t.finalStatus === 'FAIL').length}</div>
      </div>
      ${cards}
    </div>
  </body>
</html>`;
}

if (!fs.existsSync(inputDir)) {
  console.error(`Input directory not found: ${inputDir}`);
  process.exit(1);
}

const logFiles = fs
  .readdirSync(inputDir)
  .filter((name) => name.toLowerCase().endsWith('.log'))
  .sort((a, b) => a.localeCompare(b));

if (logFiles.length === 0) {
  console.error(`No .log files found in: ${inputDir}`);
  process.exit(1);
}

const testResults = logFiles.map((name) => parseLogFile(path.join(inputDir, name)));
const html = renderHtml(testResults, inputDir);
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`Summary report generated: ${outputPath}`);
console.log(`Tests included: ${testResults.length}`);
