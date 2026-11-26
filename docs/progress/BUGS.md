# Bugs and blockers

| ID | Type | Description | Status | Resolution / next action |
| --- | --- | --- | --- | --- |
| BLK-001 | Delivery | `git push` failed because the repository has no configured GitHub remote, so the milestone commit cannot be pushed or verified. | Open | Provide or configure the intended GitHub remote, then push and verify the local commits. |
| BUG-001 | Test | The initial branding test selected both the hidden dashboard brand and sign-in brand. | Resolved | Scoped the assertion to the sign-in brand; the complete suite now passes. |
| ENV-001 | Test environment | Playwright's bundled Chromium is unavailable to the sandboxed runner. | Workaround | Run the suite with `PLAYWRIGHT_CHROME_PATH` set to the installed Chrome executable. |
| DEBT-001 | Maintainability | `index.html` combines markup, styles, authentication, state, views, and event handling in one large file. | Planned | Address incrementally in roadmap milestone 003; keep full regression coverage during extraction. |

No application defects have been identified during milestone 001 so far.
