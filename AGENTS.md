# Mizan development workflow

Every session starts by reading this file, `CODEX.md`, and `docs/progress/` before touching implementation work.

1. Work sequentially through the roadmap. A milestone is independently testable and includes objectives, tasks, deliverables, acceptance criteria, and tests.
2. Before each milestone, inspect the codebase and the previous progress records. Implement only its scoped work, then review it for correctness, accessibility, maintainability, security, and regressions.
3. Run every available lint, type, unit, integration, and end-to-end check that applies. Explicitly document tools that are not configured or checks that cannot run.
4. Update `ROADMAP.md`, `PROGRESS.md`, `CHANGELOG.md`, `BUGS.md`, and `NEXT_SESSION.md` after each milestone or when an external blocker changes its status.
5. Before committing, inspect the diff and Git status, verify no credentials or secrets are included, and use a Conventional Commit. Do not force-push or overwrite work.
6. Verify the remote and branch before pushing. Push each completed milestone to the configured GitHub remote, then verify the result. If no remote, credentials, or permissions are available, record the exact blocker and stop before claiming completion.
7. A milestone is complete only after its implementation, review, applicable tests, documentation, commit, successful push, and push verification all succeed.

Use `.agents/skills/progress-management/SKILL.md` for the reusable operating procedure.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
