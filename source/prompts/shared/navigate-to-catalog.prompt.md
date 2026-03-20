---
name: Navigate to Catalog
description: Navigate to Catalog by Menu
---

Navigate to Catalog steps:

- RUN click_element "[data-testid='platform-navigator-button']"

- RUN click_element "[data-testid='activity-center-item-nav-menu.top-level.analytics_creation']"

- RUN click_element "[data-testid='nav-menu.analytics_creation.catalog']"

- Wait for "[data-testid='container-header-title']" to display

- Append log to the established test log file:
  - Run this command and capture stdout as `step_timestamp` for each step:
     `date`
  - Use `echo` to append a line "[${step_timestamp}] Navigate to Catalog: " with status and details of the Navigate to Catalog step
  - IMPORTANT: Do NOT use command substitution $(date), backticks, or complex shell expansions
  - IMPORTANT: Use simple variable assignment like `LOG="path/to/log"` and then `echo "text" >> "$LOG"`
