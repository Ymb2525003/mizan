---
name: progress-management
description: Manage Mizan in small, verified milestones with persistent progress records, review, testing, commits, and GitHub synchronization.
---

# Progress management

## Before starting

1. Read `AGENTS.md`, `CODEX.md`, and all files in `docs/progress/`.
2. Inspect `git status`, current branch, remotes, and recent commits.
3. Select the first roadmap milestone that is not complete. Do not repeat completed work.

## Per-milestone procedure

1. Define or confirm the milestone objective, requirements, scoped tasks, deliverables, acceptance criteria, and checks in `ROADMAP.md`.
2. Implement only the scoped work.
3. Review the diff for functionality, regressions, accessibility, security, maintainability, and secret exposure.
4. Run relevant lint, type, unit, integration, and end-to-end checks. Record non-applicable or unconfigured checks explicitly.
5. Resolve discovered defects, retest affected behavior, and record defects in `BUGS.md`.
6. Update all progress records: roadmap status, current/upcoming work, changelog, bugs, and concise handoff notes.
7. Inspect `git diff` and `git status`, commit with a Conventional Commit, and verify the commit.
8. Verify remote and branch, push without force, and verify the remote contains the commit.

## Completion rule

Mark a milestone complete only after implementation, review, applicable checks, records, commit, successful push, and push verification. If GitHub remote configuration, authorization, or another external dependency blocks pushing, record it in `PROGRESS.md`, `BUGS.md`, and `NEXT_SESSION.md`; mark the milestone blocked rather than complete and request the missing action.

## Reporting

After each milestone, report its number and title, implementation, changed files, test outcomes, bugs, remaining issues, commit hash, push status, roadmap-derived completion percentage, and next milestone.
