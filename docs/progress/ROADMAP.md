# Mizan roadmap

Target stack: Next.js with React and TypeScript on Node.js, with MongoDB for server-side persistence. The existing browser app and its local data remain available until features and a safe data migration are verified. Next.js route handlers are the initial Node.js backend; a separate server is not assumed.

| # | Milestone | Objectives and deliverables | Requirements and implementation tasks | Acceptance criteria and tests | Status |
| --- | --- | --- | --- | --- | --- |
| 001 | Governance and Mizan identity | Establish persistent milestone workflow; rename all user-facing branding to Mizan; add a scalable balance-mark logo; preserve existing local data keys for migration safety. | Create persistent instructions, skill, and five progress records; update title, sign-in, sidebar, copy, and test coverage; retain legacy storage keys. | Progress records and reusable skill exist; sign-in and sidebar display Mizan and logo; existing Playwright suite passes. | Complete |
| 002 | Next.js foundation and quality toolchain | Establish a buildable Next.js, Node.js and TypeScript foundation alongside the existing app. | Configure Next.js, lint, type checks, build and tests; preserve the legacy app during migration. | Development and production builds, lint, type checks, and relevant tests pass. | Complete |
| 003 | Incremental feature migration | Port the existing interface and planner features to modular Next.js components. | Migrate one feature at a time; preserve behavior and add regression coverage. | Migrated flows match the legacy app and pass responsive and functional tests. | Planned |
| 004 | Production authentication | Establish secure server-side identity and authorization. | Select and integrate an authentication provider; implement session and access controls and test failures. | Authentication and authorization flows pass security and integration tests. | Planned |
| 005 | MongoDB persistence and migration | Store user data in MongoDB and safely migrate legacy browser data. | Define per-user schemas and server-side data access; validate imports and provide recovery. | Persistence, isolation, migration and recovery tests pass against a test database. | Planned |
| 006 | Accessibility and responsive quality | Audit keyboard, screen-reader, color-contrast, reduced-motion, and phone/tablet behavior. | Audit all flows, remediate findings, add accessibility assertions, and test target viewports. | Audit findings resolved or documented; accessibility and responsive E2E checks pass. | Planned |
| 007 | Release readiness | Prepare production documentation, security review, deployment guidance, and release checklist. | Write deployment and operational documentation, scan for secrets/security gaps, and complete release verification. | Release checklist and deployment verification are complete. | Planned |

Completion percentage is based only on milestones marked **Complete**: 2 of 7 (28.6%).
