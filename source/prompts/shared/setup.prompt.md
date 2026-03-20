---
name: Test Setup
description: Initialize environment and collect variables for all tests
---

# Test Setup - Environment Variables and Report Directory

Step 1 – Collect Environment Variables
Follow: `source/skills/env-setting.md`

IMPORTANT:
- `tenant_name`, `username` and `password` are required inputs for all tests.
- If any value is missing, your next response must be only:
	- `Please provide the following information:`
	- `tenant_name=?`
	- `username=?`
	- `password=?`
- After sending that message, stop and wait for input.
- Do not continue to Step 2 until all values are available.

Step 2 – Initialize report_dir
Follow: `source/prompts/shared/report_init.prompt.md`
