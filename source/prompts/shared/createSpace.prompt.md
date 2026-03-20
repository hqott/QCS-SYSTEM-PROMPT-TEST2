---
name: Create space
description: Navigate to Create Space by Menu
---

Navigate to Create Space steps:

- RUN click_element "[data-testid='platform-navigator-button']"

- RUN click_element "[data-testid='activity-center-item-nav-menu.top-level.analytics_creation']"

- RUN click_element "[data-testid='nav-menu.analytics_creation.create']"

- Wait for "[data-testid='create-page-title']" to display and verify the text is "Create"

- Wait for "[data-testid='Collaborate with others-add-new-menu-item-qda-create-space']" to exist

- RUN click_element "[data-testid='Collaborate with others-add-new-menu-item-qda-create-space']"

- Wait for "[data-testid='Dialog-Container']" to display

- Append log to the established test log file:
  - Run this command and capture stdout as `step_timestamp` for each step:
     `date`
  - Use `echo` to append a line "[${step_timestamp}] Create space:" with status and details of the create space step
  - IMPORTANT: Do NOT use command substitution $(date), backticks, or complex shell expansions
  - IMPORTANT: Use simple variable assignment like `LOG="path/to/log"` and then `echo "text" >> "$LOG"`
