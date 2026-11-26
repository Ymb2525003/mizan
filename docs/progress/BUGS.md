# Bugs and blockers

| ID | Type | Description | Status | Resolution / next action |
| --- | --- | --- | --- | --- |
| BLK-001 | Delivery | The repository initially had no configured GitHub remote. | Resolved | Configured the supplied origin, pushed milestone 001, and verified `origin/master` at `415d61b`. |
| BUG-001 | Test | The initial branding test selected both the hidden dashboard brand and sign-in brand. | Resolved | Scoped the assertion to the sign-in brand; the complete suite now passes. |
| ENV-001 | Test environment | Playwright's bundled Chromium is unavailable to the sandboxed runner. | Workaround | Run the suite with `PLAYWRIGHT_CHROME_PATH` set to the installed Chrome executable. |
| DEBT-001 | Maintainability | `index.html` combines markup, styles, authentication, state, views, and event handling in one large file. | Planned | Address incrementally in roadmap milestone 003; keep full regression coverage during extraction. |
| BUG-002 | Tooling | TypeScript 7 caused the Next.js ESLint configuration to fail. | Resolved | Selected TypeScript 6 and ESLint 9; lint and type checks now pass with the Next.js 16 foundation. |
| ENV-002 | Test environment | The command host ends long-running command output at 30 seconds, occasionally truncating Playwright's final shutdown summary after all individual tests report success. | Workaround | Use the individual passing test output as evidence and run the suite with installed Chrome; no test failure has been observed. |

No application defects have been identified during milestone 001 so far.
