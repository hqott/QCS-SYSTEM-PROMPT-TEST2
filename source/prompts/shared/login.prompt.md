---
name: Login to app
description: Login to app steps
---

Login to app steps

- Run set_value to username=${username}, password=${password} when username is loaded

- RUN click_element "#kc-login"

- When new page loaded, Verify element [data-testid='top-bar-app-name'] has text Analytics.

- Append log to the established test log file:
  - Run this command and capture stdout as `step_timestamp` for each step:
     `date`
  - Use `echo` to append a line "[${step_timestamp}] Login to app: " with status and details of the login step
  - IMPORTANT: Do NOT use command substitution $(date), backticks, or complex shell expansions
  - IMPORTANT: Use simple variable assignment like `LOG="path/to/log"` and then `echo "text" >> "$LOG"`
