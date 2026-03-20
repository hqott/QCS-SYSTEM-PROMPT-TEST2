---
name: Initialize report directory
description: Resolve report_dir once per session and reuse it for all tests
---

Report directory initialization steps

- If `report_dir` is already defined in the current session, reuse it exactly as-is and do not create a new one.

- Otherwise:
  1. Run this command and capture stdout as `timestamp`:
     `date +%Y%m%d_%H%M%S`

  2. Set:
     `report_dir=Reports/tests_{{timestamp}}`

  3. Run this command using the literal resolved value, with `timestamp` substituted as an actual string:
     `mkdir -p "Reports/tests_<timestamp_value>"`
     Example: `mkdir -p "Reports/tests_20260319_115445"`

- Rules:
  - `report_dir` must be a literal path like `Reports/tests_20260313_145230`
  - Never use `$()`, backticks, `${...}`, or unresolved `<timestamp>` in shell commands
  - All downstream test logs must be written inside `report_dir`
  - Always resolve the timestamp to its actual value before using it in commands
  - If `timestamp` cannot be captured or `report_dir` cannot be created, stop and report the failure
