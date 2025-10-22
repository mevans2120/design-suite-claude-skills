---
description: Hybrid memory bank commands for managing session state and documentation
---

Execute the hybrid memory bank command.

The user has requested to run a memory bank command with the following arguments: {{prompt}}

Available commands:
- `show` - Display current session state
- `note <text>` - Add a context note
- `patterns [type]` - Show learned code patterns (api-patterns, error-handling, ui-patterns, database-patterns)
- `tech-stack` - Display project tech stack
- `archive` - Manually archive current session
- `clean` - Clean up expired sessions
- `list-archives` - List all archived sessions
- `end-session` - End session with documentation reminders
- `checklist` - Show documentation checklist template

Call the appropriate command handler from the hybrid-memory-bank-plugin by running:
```bash
node hybrid-memory-bank-plugin/src/index.js {{prompt}}
```

Parse the arguments and execute the corresponding command function. Display the results to the user in a clear, formatted manner.
