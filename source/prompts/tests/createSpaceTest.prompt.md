---
name: Create space test
description: Verify the navigation from login to Create Space view
---

You are executing a multi-step: full 3-step prompt chain (`Setup Environment` → `Create a new test log file` → `start_browser` → `login` → `create_space` → `close_browser`) to verify the navigation from login to Create Space view.

Before executing any step, if `tenant_name`, `username`, or `password` is missing, ask the user for the missing values and wait for the reply.

Step 1 – Setup Environment
Follow: `source/prompts/shared/setup.prompt.md`

Step 2 - Create a new test log file.
The test log file is named as `<report_dir>/createSpaceTest.log`, where `<report_dir>` is the directory for current test session.

Step 3 – start_browser
Follow the instructions in:
`source/prompts/shared/start_browser.prompt.md`

Step 4 – login
After completing step 3, follow:
`source/prompts/shared/login.prompt.md`

Step 5 – create_space 
After completing step 4, follow:
`source/prompts/shared/createSpace.prompt.md`

Step 6 – close_browser
After completing step 5, follow:
`source/prompts/shared/close_browser.prompt.md`

