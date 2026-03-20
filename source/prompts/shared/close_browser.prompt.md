---
name: Close browser
description: Close browser of chrome
---

Close browser steps

  - Run close_session

  - Append log to the established test log file:
    - Run this command and capture stdout as `step_timestamp` for each step:
     `date`
    - Use `echo` to append a line "[${step_timestamp}] Close browser: " with status and details of the close browser step
    - IMPORTANT: Do NOT use command substitution $(date), backticks, or complex shell expansions
    - IMPORTANT: Use simple variable assignment like `LOG="path/to/log"` and then `echo "text" >> "$LOG"`
