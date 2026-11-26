# Changelog

## Unreleased

### Added

- Persistent milestone workflow, progress records, and reusable progress-management skill.
- Mizan balance-mark SVG logo.
- Began milestone 002 by adding ESLint and TypeScript development dependencies; checks are not configured yet.
- Revised the roadmap for the requested Next.js, Node.js, and MongoDB stack and a staged migration.
- Added an initial Next.js shell, build, lint, and TypeScript scripts; the legacy app remains separate while migration is in progress.
- Verified the Next.js 16, React 19, and TypeScript 6 foundation with lint, type checks, and a production build.

### Changed

- Renamed the user-facing application brand from LifePulse to Mizan.
- Preserved existing `lifepulse.*` browser-storage keys and provider hook names to avoid losing existing local data or breaking integrations during the rebrand.
- Added Mizan branding coverage to the sign-in and dashboard end-to-end test.
- Expanded roadmap entries with explicit requirements and implementation tasks.
- Added modular-architecture work to the roadmap after code review identified the single-file application as maintainability debt.

### Delivery

- Created local commit `ebec7a58b5d7a497275d3eb63902181960dc5b75` (`feat: establish Mizan identity and progress workflow`).
- Configured the supplied GitHub origin and verified milestone 001 commits on `origin/master` at `415d61b`.
- Completed local verification for milestone 002: the legacy Playwright suite passes 9 of 9 tests using the installed Chrome executable.
