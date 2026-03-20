---
name: Start browser
description: Start browser as chrome
argument-hint: tenantInformation
---

Start browser steps

- Pre-check before starting browser:
  - Verify `tenant_name` is set and not empty.
  - If `tenant_name` is missing, ask the user exactly:
    - `tenant_name=?`
  - If value is a placeholder or unresolved host (for example `elastic.example`), ask for the real tenant URL and wait.
  - Do not run `start_browser` until a valid tenant URL is provided.

- Run start_browser {
  "browser": "chrome",
  "navigationUrl": ${tenant_name},
  "headless": false
}

- Append log to the established test log file:
  - Run this command and capture stdout as `step_timestamp` for each step:
     `date`
  - Use `echo` to append a line "[${step_timestamp}] Start browser: " with status and details of the start browser step
  - IMPORTANT: Do NOT use command substitution $(date), backticks, or complex shell expansions
  - IMPORTANT: Use simple variable assignment like `LOG="path/to/log"` and then `echo "text" >> "$LOG"`
