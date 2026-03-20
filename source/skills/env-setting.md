# Skill: Environment Variables Setup

## Step 1 – Resolve Variables

Before executing any browser action, resolve values in this order:

1. Existing shell environment variables (`tenant_name`, `username`, `password`)
2. Values loaded from `./.env` (if file exists)
3. Default values (if still missing)

Use this setup:

```bash
# Load ./.env if present
if [ -f ./.env ]; then
	set -a
	. ./.env
	set +a
fi

# Apply defaults only when values are not provided
if [ -z "$tenant_name" ]; then
	tenant_name="https://sta.in.qlikcloud.com"
fi

if [ -z "$username" ]; then
	username="harley@qlik.example"
fi

if [ -z "$password" ]; then
	password="Password1!"
fi

export tenant_name
export username
export password
```

Notes:

* `tenant_name` defaults to `https://sta.in.qlikcloud.com`
* `username` and `password` are first taken from `../env`; if not present there, default placeholders are used
* This step should not prompt the user when defaults are available

## Step 2 – Save Variables

Store the resolved values as variables for later use:

tenant_name={{tenant_name}}
username={{username}}
password={{password}}

## Usage

These variables can be referenced in subsequent prompts when executing tests.

Do not proceed to `start_browser` until `tenant_name` and `username` and `password` are set.
