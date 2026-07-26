# IterSelf MVP Design

IterSelf is a local-first Windows desktop app for personal iteration: plan, record, review, and export structured life/work data without forcing a specific self-improvement doctrine.

## Product stance

- Local-first desktop app. User owns the data.
- Structure facts; leave interpretation to free documents and templates.
- The app is not a knowledge base, not an AI coach, not a generic todo clone.
- The core loop is: OKR direction → task pool → week commitment → day plan → actual time record → review document → iteration.

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
- Icons generated by dependency-free Node script (`npm run icons`): PNG-embedded multi-size ICO.
- Build targets: NSIS installer + portable exe via electron-builder.
- Data safety hardening: atomic writes (tmp + rename), `.bak` previous-version copy with quarantine-and-recover for a corrupt/missing data file, serialized store operations (concurrent mutations cannot drop writes), daily rotating auto-backups in `backups/auto/` (keep 14). Covered by `npm test`.
