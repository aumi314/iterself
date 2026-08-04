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

```bash
npm install
npm start              # Launch dev version
npm test               # Run automated tests
npm run build          # Build NSIS installer + portable exe
npm run build:mac      # Build macOS DMG + ZIP (run on macOS)
npm run verify         # Verify build artifacts
```

## Product Philosophy

- Local-first: user owns the data
- Structure facts; leave interpretation to free documents
- The core loop: OKR direction → task pool → week commitment → day plan → actual time record → review document → iteration

## License

MIT
