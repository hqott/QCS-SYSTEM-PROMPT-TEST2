---
name: Execute Test(s) Flow
description: Describes the test(s) execution flow
---

# Test Execution Workflow Steps

Detailed test(s) execution flow for running automated UI tests with proper setup and logging.

---

## Step 1: Review `wdio-test-setting-structure.md` to Understand Project Architecture

Read `wdio-test-setting-structure.md` to understand the project structure, file locations, and workspace configuration.

---

## Step 2: Create Reports Directory with Timestamp

When the user asks to execute test(s), create the reports directory using two separate commands:

1. Run `date +%Y%m%d_%H%M%S` and capture the timestamp output.
2. `timestamp` holds captured output value from above step of timestamp.
2. Run `mkdir -p "Reports/tests_<timestamp>"` using the captured timestamp value.

The resolved `report_dir` is `Reports/tests_<timestamp>` and will be used globally for all test(s) execution in the current session.

**Important:** The generated report directory path must be a literal string without:
* `$()`
* Backticks
* `${...}`
* Unresolved `<timestamp>` placeholders

**Rules:**

* Always use two separate commands for report directory creation.
* Reuse the exact stdout value from the `date +%Y%m%d_%H%M%S` command for all report log paths created during the current test run.
* Do not use shell expansion or substitution patterns (`$()`, backticks, `${...}`) in generated commands.
* Do not generate one-line commands such as `mkdir -p "Reports/tests_$(date +%Y%m%d_%H%M%S)"`.

**Example:**
```
Command 1: date +%Y%m%d_%H%M%S
Output: 20260313_145230

Command 2: mkdir -p "Reports/tests_20260313_145230"
Result: Directory created at Reports/tests_20260313_145230/
```

---

## Step 3: Capture Environment Variables: `tenant_name`, `username`, and `password`

Follow `env-setting.md` to collect all required environment variables needed for test execution.

Store these variables for use in Step 4.

---

## Step 4: Execute Test Steps

Execute the test steps defined in the test prompt file(s) using the variables captured in Step 3 and the `report_dir` from Step 2.

### Example 1: Single Test Execution

**User request:** "Verify web workflows using `gotoCatalogTest.prompt.md`"

**Execution flow:**

* Execute the test steps from `gotoCatalogTest.prompt.md` with variables captured in Step 3.
* Log the test result to: `report_dir/gotoCatalogTest.log`

### Example 2: Multiple Test Execution

**User request:** "Verify web workflows using `gotoCatalogTest.prompt.md createSpaceTest.prompt.md`"

**Execution flow:**

* Execute the test steps from `gotoCatalogTest.prompt.md` with variables captured in Step 3.
* Log the result to: `report_dir/gotoCatalogTest.log`
* Execute the test steps from `createSpaceTest.prompt.md` with variables captured in Step 3.
* Log the result to: `report_dir/createSpaceTest.log`
