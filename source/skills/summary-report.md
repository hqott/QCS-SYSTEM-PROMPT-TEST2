# Skill: Generate Summary Report from Test Logs

After all test log files have been written to `report_dir`, generate a single HTML summary report.

## Automatic Generation

To automatically generate the summary report from the most recent test directory:

```bash
node ./scripts/autoGenerateSummaryReport.js `<report_dir>`
```

- Where `<report_dir>` is the directory for current test session.
- Where `<report_dir>` is the path to a folder containing .log test files.

This script:
- Automatically finds the latest `Reports/tests_*` directory if no current test session.
- Generates a single `summary.html` file
- Prints the path to the generated report

## Manual Generation

If you need to generate a report for a specific directory:

```bash
node ./scripts/generateLogSummaryReport.js <report_dir>
```

Where `<report_dir>` is the path to a folder containing .log test files.

Example:
```bash
node ./scripts/generateLogSummaryReport.js Reports/tests_20260326_101253
```

## Report Contents

The generated `summary.html` contains:

* One section per test (named after the log filename stem)
* Test-level PASS/FAIL status badge (derived from the final log banner)
* `Test started` timestamp shown as metadata
* A table of all steps with timestamp, step name, status, and details
* Top-level summary counters (total / passed / failed)

The report can be opened directly in any browser.
