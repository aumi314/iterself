# IterSelf MVP Design

IterSelf is a local-first Windows desktop app for personal iteration: plan, record, review, and export structured life/work data without forcing a specific self-improvement doctrine.

## Product stance

- Local-first desktop app. User owns the data.
- Structure facts; leave interpretation to free documents and templates.
- The app is not a knowledge base, not an AI coach, not a generic todo clone.
- The core loop is: 愿景/OKR define what winning means (ideal realm) → task library lands it as projects and tasks → week/day bindings commit it → schedule blocks plan the day and time entries record reality → review documents reconcile both ledgers → iteration.

## Conceptual model (定稿 2026-07-27)

Five pillars split across two realms. The ideal realm defines what winning means and never enters the schedule; the execution realm is the only place where doing happens, and its uniform unit is the task.

**Ideal realm (理想层)**

1. **md 文档** — one `documents` collection. 愿景 (open pool) is the prose ideal: who I want to become. 规划/复盘 documents (per day/week/month) are the rhythm layer where reconciliation gets written.
2. **OKR 系统** — 类似于文档: a document-like, quantified decomposition of the vision, sibling of the md documents, not an execution object. O = long-term direction (life areas such as 身心健康/学业有成/副业搞钱); KR = what counts as winning. It is written and revised the way a document is — read when planning, reconciled against reality when reviewing — and maintained by hand.

**Execution realm (落地层)**

3. **任务库** — managed as project folders: a node with children renders as a project (folder icon, derived progress, no completion circle); leaves are the only actionable unit — the only thing bindable as 周任务/日任务 and the only thing time can attach to. A node becomes a project the moment it gains its first child; there is no explicit type field.
4. **三维日记录** — 日计划 (schedule blocks), 时间记录 (time entries), 心得 (insights): the daily execution ledger.
5. **事件库** — the leaves of the eventCategories tree. Time record names are picked from it; it is the naming vocabulary for time plus the focus rules, not a goal system.

**How the realms meet.** Nothing automatic is canonized. The two realms meet in 复盘: the human reads both ledgers and reconciles them. A machine-assisted bridge — mounting task nodes to KRs with habit/cumulative/outcome scoring rules and derived KR progress — was explored in design discussion but is explicitly not ratified (2026-07-27); it stays on file as an open proposal, to be revisited only if hand reconciliation proves too costly in real use.

**复盘 = reconciliation.** The execution ledger answers "did I do what I said"; the ideal ledger answers "did the numbers move". The gap between the two ledgers — effort without results, or results without executed plans — is the core self-honesty signal the app exists to surface.

Implementation status: pillars 1, 2, and 4 are live (OKR as a hand-maintained scoreboard); pillar 3 has tree + bindings live with project-folder rendering pending; pillar 5 has the category tree live with the name picker pending. Agreed build order: 事件库 name picker → review template variable injection → project-folder rendering for the task library.

## MVP stack

- Electron desktop app.
- Vanilla HTML/CSS/JS renderer.
- Local JSON persistence in the app userData directory.
- Export Markdown, JSON, and CSV files to a user-selected folder.

Tauri was rejected for this environment because Rust is unavailable. SQLite was deferred to avoid native dependency packaging risk. JSON is sufficient for MVP scale and easier to audit/export.

## Core objects

### EventCategory
Tree of activity categories. Categories can be nested, and each category explicitly controls whether it counts as focus time.

Fields: id, parentId, name, focus, color, createdAt, updatedAt.

### Task
Independent task pool. Supports nested tasks. Weekly and daily tasks bind to Task rather than duplicating task bodies.

Fields: id, parentId, title, status, estimatedMinutes, priority, tags, note, createdAt, updatedAt.

### Objective / KeyResult
Objectives coexist independently in an OKR library. Each objective owns a date range and key results. There is no active/current objective selector.

Fields:
- Objective: id, title, startDate, endDate, description
- KeyResult: id, objectiveId, title, note

### MonthlyPlan
Monthly planning and review documents are Markdown strings stored by calendar month, independently from OKR data. The month page displays objectives whose date ranges overlap that month.

Fields: id, month, planDoc(markdown), reviewDoc(markdown)

### WeeklyPlan and WeeklyTaskBinding
A week plan has free Markdown planning and review documents. Weekly task bindings are pure references to task-pool tasks. They do not maintain task fields.

Fields:
- WeeklyPlan: id, weekStart, planDoc(markdown), reviewDoc(markdown)
- WeeklyTaskBinding: id, weekStart, taskId

### DailyPlan, DailyTaskBinding, ScheduleBlock
Daily plan has free Markdown plan and review documents. Daily task bindings are pure references to task-pool tasks. They do not maintain task fields. Schedule blocks arrange planned time against task-pool tasks.

Fields:
- DailyPlan: date, planDoc(markdown), reviewDoc(markdown)
- DailyTaskBinding: id, date, taskId
- ScheduleBlock: id, date, start, end, taskId, title, note

### TimeEntry
Actual objective record.

Fields: id, date, start, end, title, categoryId, taskId, note

### Insight
Tiny notes captured during the day. Displayed as review context. Not a knowledge base.

Fields: id, timestamp, date, time, content, taskId, timeEntryId, note

### VisionDocument
Long-term Markdown document pool.

Fields: id, title, content(markdown), createdAt, updatedAt

## UX principles

- Dashboard first: today, current week, focus time, plan vs actual, insights.
- Fast capture: time entry and insight should take seconds.
- Trees are powerful but UI should not encourage overplanning.
- Reviews are Markdown documents with injected context panels rather than rigid forms.
- Export is a first-class feature: produce AI-readable cycle data packages.

## MVP screens

1. Dashboard
2. Schedule (week/day timeline; week view shows weekly tasks plus each day's tasks, records, and insights; day view shows daily tasks, plus-modal creation for schedule blocks/time entries/insights, switchable arranged plan-vs-record lists, proportional plan-vs-record timeline blocks, insights, and day documents)
3. Month
4. OKR
5. Task Pool (left nested overview, right single-item editor)
6. Vision
7. Settings (event categories, focus rules, timezone, language, theme, export, backup, app version)

## Release-readiness target

MVP is publishable when:

- App launches locally on Windows via `npm start`.
- App builds an unpacked Windows Electron app.
- User can create categories, tasks, OKRs, weekly bindings, daily bindings, schedule blocks, time entries, insights, and documents.
- Current day/week summaries calculate focus time using category rules.
- Exports produce JSON, Markdown, and CSV.
- Data persists after reload/restart.

## Implementation log

- v0.1.0 MVP complete: all 7 screens (Dashboard/Schedule/Month/OKR/Task Pool/Vision/Settings).
- Data layer: JSON store with referential-integrity delete guards (tasks, categories, OKR chain, bindings).
- Timezone correctness: active date, current time, and timestamp display follow the configured IANA timezone or the operating system.
- Insights carry an explicit `date` field bound to the active date; legacy entries fall back to local timestamp date.
- One-tap timer on Schedule day view: start timer → do work → submit form pre-filled with start time.
- Automated tests: `npm test` covers store lifecycle, delete guards, settings persistence, export bundle content, minutes-across-midnight, focus calculation, and week-start mapping.
- Icons: north-star design (growth/introspection/hope direction) rasterized from an in-script SVG source of truth via Electron offscreen rendering (`npm run icons`); PNG-embedded multi-size ICO.
- Build targets: NSIS installer + portable exe via electron-builder.
- Data safety hardening: atomic writes (tmp + rename), `.bak` previous-version copy with quarantine-and-recover for a corrupt/missing data file, serialized store operations (concurrent mutations cannot drop writes), daily rotating auto-backups in `backups/auto/` (keep 14). Covered by `npm test`.
- Unified document storage (data v3): every markdown document lives in one `documents` collection `{scope: vision|day|week|month, key, type: free|plan|review, title, content}`. Cycle docs are singletons per (scope, key, type); vision docs are an open pool; row existence replaces the old created-flags. Legacy dailyPlans/weeklyPlans/monthlyPlans/visionDocuments migrate idempotently (old backups re-import cleanly). UI naming convention: 计划 is reserved for the concrete daily schedule (blocks keep 日计划); documents are 规划/复盘 named per cycle (日规划/日复盘, 周规划/周复盘, 月规划/月复盘).
