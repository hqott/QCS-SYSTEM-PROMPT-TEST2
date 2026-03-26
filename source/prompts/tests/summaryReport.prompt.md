---
name: Generate Summary Report from Test Logs
description: Generate Summary Report from Test Logs
---

# Generate Summary Report from Test Logs

Follow `summary-report.md` to generate `summary.html`, after all test log files have been written to `report_dir`, generate a single HTML summary report.

To automatically generate the summary report from the most recent test directory:

```bash
node ./scripts/autoGenerateSummaryReport.js <report_dir>
```

Where `report_dir` is the directory for current test session.

This script:
- Automatically finds the latest `Reports/tests_*` directory if no current test session.
- Generates a single `summary.html` file
- Prints the path to the generated report
