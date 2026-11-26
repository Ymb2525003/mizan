# Changelog

## Unreleased

### Added

- Persistent milestone workflow, progress records, and reusable progress-management skill.
- Mizan balance-mark SVG logo.

### Changed

- Renamed the user-facing application brand from LifePulse to Mizan.
- Preserved existing `lifepulse.*` browser-storage keys and provider hook names to avoid losing existing local data or breaking integrations during the rebrand.
- Added Mizan branding coverage to the sign-in and dashboard end-to-end test.
- Expanded roadmap entries with explicit requirements and implementation tasks.
- Added modular-architecture work to the roadmap after code review identified the single-file application as maintainability debt.

### Delivery

- Created local commit `ebec7a58b5d7a497275d3eb63902181960dc5b75` (`feat: establish Mizan identity and progress workflow`).
- Configured the supplied GitHub origin and verified milestone 001 commits on `origin/master` at `415d61b`.
