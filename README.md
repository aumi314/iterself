# IterSelf

Local-first personal iteration desktop app for planning, recording, reviewing, and exporting life/work cycles.

本地优先的 Windows / macOS 桌面应用：统筹规划 · 客观记录 · 复盘迭代。

## Features

- **Day/Week/Month/Vision planning cycles**
- **Task pool** with unlimited nesting
- **OKR library** with date-ranged objectives and key results
- **Time tracking** with category-based focus rules
- **Insights capture** for quick notes during the day
- **Markdown documents** for planning and review
- **Export bundles** (Markdown, JSON, CSV) for AI-assisted analysis

## Tech Stack

- Electron desktop app
- Vanilla HTML/CSS/JS renderer
- Local JSON persistence in app userData directory
- No cloud, no telemetry

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm start              # Launch dev version
npm test               # Run automated tests
npm run build          # Build NSIS installer + portable exe
npm run build:mac      # Build macOS DMG + ZIP (run on macOS)
npm run verify         # Verify build artifacts
```

## Releases

Prebuilt installers are published on the [Releases](https://github.com/aumi314/iterself/releases) page: an NSIS `Setup` and a single-file `Portable` build for Windows x64, plus `DMG` and `ZIP` for macOS x64 and arm64. There is no auto-update channel, so upgrading is a manual download. User data stays in the OS user-data directory (`%APPDATA%\iterself` on Windows).

Release procedure and known gotchas: [docs/release-runbook.md](docs/release-runbook.md).

## Product Philosophy

- Local-first: user owns the data
- Structure facts; leave interpretation to free documents
- The core loop: OKR direction → task pool → week commitment → day plan → actual time record → review document → iteration

## License

MIT
