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

## Step 2: Capture Environment Variables: `tenant_name`, `username` and `password`

Follow `env-setting.md` to collect all required environment variables needed for test execution.

If any required variable is missing, the agent must first ask the user for the values and wait for the response before proceeding.

Store these variables for use in Step 3.

---

## Step 3: Execute Test Steps

Execute the test steps defined in the test prompt file(s) using the variables captured in Step 2 and the `report_dir` from setup.

### Example 1: Single Test Execution

**User request:** "Verify web workflows using `gotoCatalogTest.prompt.md`"

**Execution flow:**

* Execute the test steps from `gotoCatalogTest.prompt.md` with variables captured in Step 2.
* Log the test result to: `report_dir/gotoCatalogTest.log`

### Example 2: Multiple Test Execution

**User request:** "Verify web workflows using `gotoCatalogTest.prompt.md createSpaceTest.prompt.md`"

**Execution flow:**

* Execute the test steps from `gotoCatalogTest.prompt.md` with variables captured in Step 2.
* Log the result to: `report_dir/gotoCatalogTest.log`
* Execute the test steps from `createSpaceTest.prompt.md` with variables captured in Step 2.
* Log the result to: `report_dir/createSpaceTest.log`
