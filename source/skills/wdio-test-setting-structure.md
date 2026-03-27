---
name: wdio-test-setting-structure
description: How to execute UI tests using the WDIO MCP server through prompts. This skill outlines the project structure.
---

# Test Prompt Skill

This skill helps run browser-based automated UI tests using the WDIO (WebdriverIO) MCP server.

The `<***Test.prompt.md>` files are located at `source/prompts/tests/`. The corresponding test report folder will be created at `report_dir` which is detailed in section `##Report_dir and Test Reports` of this skill.

## Use Cases

Use this skill when the user asks to:

- **Execute** `<***Test.prompt.md>` → Following `source/skills/workflow.md`, execute `<***Test.prompt.md>`
- **Run** `<***Test.prompt.md>` → Following `source/skills/workflow.md`, execute `<***Test.prompt.md>`
- **Verify web workflows** using `<***Test.prompt.md>` → Following `source/skills/workflow.md`, verify web workflows using `<***Test.prompt.md>`
- **Reproduce UI bugs** using `<***Test.prompt.md>` → Following `source/skills/workflow.md`, reproduce UI bugs using `<***Test.prompt.md>`
- **Validate frontend behavior** using `<***Test.prompt.md>` → Following `source/skills/workflow.md`, validate frontend behavior using `<***Test.prompt.md>`
- **Execute** `<summaryReport.prompt.md>` → Following `source/skills/summary-report.md`, execute `<summaryReport.prompt.md>`

## Running Multiple Tests

Use a space as the separator between test files.

**Examples:**

- `execute <***Test1.prompt.md> <***Test2.prompt.md> <***Test3.prompt.md>`
- `run <***Test1.prompt.md> <***Test2.prompt.md> <***Test3.prompt.md>`
- `verify web workflows using <***Test1.prompt.md> <***Test2.prompt.md> <***Test3.prompt.md>`
- `reproduce UI bugs using <***Test1.prompt.md> <***Test2.prompt.md> <***Test3.prompt.md>`
- `validate frontend behavior using <***Test1.prompt.md> <***Test2.prompt.md> <***Test3.prompt.md>`

---

# Workspace Configuration

## Default Working Directory

The working directory is the **project root directory**.

**Rules:**

* Always treat the repository root as the working directory.
* All file paths are relative to the project root unless explicitly specified.
* Do not assume subdirectories as the working directory.
* When executing commands, start from the project root.

---

# Prompts Configuration

## Shared Prompts

Located at `source/prompts/shared/`

## Test Prompts

Located at `source/prompts/tests/`

# Test Report Creation
Test log reports and summary.html report are located at `report_dir`.

## Test report log
Each test has its own log file under `report_dir`, named after the test file. For example, the test `gotoCatalogTest.prompt.md` will create a report log file at `report_dir/gotoCatalogTest.log`.

## Post All Tests Execution: Generate Summary Report

Following `summary-report.md`, after all test log files have been written to `report_dir`, generate a single HTML summary report. The summary report will be generated at `report_dir/summary.html`.

## Test Report Structure

```
Reports/
└── tests_20260309_142530/
    ├── test1.log
    ├── test2.log
    ├── ....
    └── summary.html
```

---

# CLI Execution

**Example:**

```bash
copilot --additional-mcp-config @mcp.cli.json --allow-all-tools --prompt "execute createSpaceTest.prompt.md gotoCatalogTest.prompt.md summaryReport.prompt.md"
```
