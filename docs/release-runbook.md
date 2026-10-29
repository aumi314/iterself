# IterSelf 发布运行手册

从「代码 → 版本 → tag → Release → 下载产物 → 文档」的完整操作记录。
版本叙事在 RELEASE.md，这里只写怎么发版和踩过的坑。

## 现役状态（核对于 2026-10-30）

| 环节 | 状态 | 证据 |
|---|---|---|
| main | `47086f7`，即 v0.3.16，与 origin/main 零差异 | `git branch -vv` |
| 最新公开 Release | v0.3.16，2026-08-21 发布，6 个附件 state=uploaded | `gh release view v0.3.16` |
| Windows 附件完整性 | Setup `087b6551…`、Portable `de1f9d75…`，与本地 `dist/` 逐字节一致 | `sha256sum` 对比 asset digest |
| macOS 附件 | x64/arm64 的 DMG+ZIP 由 Release macOS 工作流挂上 | run 32484813315 conclusion=success |
| 本机安装版 | `D:\Apps\Work\IterSelf\IterSelf.exe` = 0.3.16 | `VersionInfo.FileVersion` |
| 用户数据 | `C:\Users\aumif\AppData\Roaming\iterself`，70 文件 / 7.4 MB | 目录实测 |
| v0.3.17 | Draft PR #1：OPEN / CLEAN / MERGEABLE，CI 全绿；未合并、未发布、本地无构建产物 | `gh pr view 1` |

## 发版步骤

前置：Node.js ≥ 22.12（`package.json` engines）。Windows 侧用 `D:\Apps\DevTools\NodeJS`（v24.11.1）；
WSL 默认是 node v18.19.1 / npm 9.2.0，低于 engines 要求，`npm ci` 会刷一片 EBADENGINE 告警。
实测边界：`npm test` 和 `npm run smoke` 在 node 18 下仍然通过；但打 Electron 43 的包要切到 ≥ 22.12，
别拿 node 18 的构建结果当验收。`~/.nvm` 目录存在，非交互 bash 不会自动加载，需要显式 source。

```bash
# 1. 工作树干净后改版本号，提交
git status --porcelain                      # 验证：无输出
git commit -am "chore: bump to vX.Y.Z"

# 2. 本地三验                              # 验证：三条都 exit 0
npm test && npm run smoke && npm run verify

# 3. 打 tag 并推送                          # 验证：git ls-remote --tags origin
git tag vX.Y.Z && git push origin main vX.Y.Z

# 4. 创建 Release 并带上 Windows 产物
gh release create vX.Y.Z --title "IterSelf vX.Y.Z" \
  --notes "$(sed -n '/## vX.Y.Z/,/^## /p' RELEASE.md)" \
  dist/IterSelf-Setup-X.Y.Z-x64.exe dist/IterSelf-Portable-X.Y.Z-x64.exe

# 5. 触发 macOS 构建（tag 必填，漏传即失败）
gh workflow run "Release macOS.yml" -f tag=vX.Y.Z

# 6. 等构建                                # 验证：conclusion=success
gh run list --workflow "Release macOS" --limit 1

# 7. 核对附件                              # 验证：6 个附件、state 全 uploaded
gh release view vX.Y.Z --json assets --jq .assets[].name

# 8. 抽查摘要，和本地 sha256sum 对比
gh release view vX.Y.Z --json assets --jq .assets[].digest
```

## 踩过的坑

- 版本号进了 main 不等于发布。v0.3.16 代码 2026-08-14 就进了 main，Release 拖到 08-21，
  这期间 GitHub 上「最新可下载」仍是 0.3.15，装到旧版的人不会知道自己落后。
- macOS 工作流早期 checkout 的是 `main` 这条移动分支而不是选定 tag，会出现「tag 是 0.3.15、
  二进制里含 0.3.16 代码」。PR #1 已改为 `ref: ${{ inputs.tag }}`。
- 同一工作流的 tag 输入原本带 `default: v0.3.15`，忘记改就把新包传到旧 Release 上。
  现在改成必填、无默认，漏传直接失败——这是好事，别改回去。
- `gh release view --json` 没有 `isLatest` 字段，写了会整条命令报错；看 latest 用 `gh release list`。
- `dist/` 累积了全部历史版本的安装包（2026-10-30 实测 5.7 GB / 94 文件），已 gitignore，
  但会吃磁盘。IterSelf.exe 运行时 `dist/win-unpacked` 被锁，构建会自动落到 `dist-*/`，
  关掉应用后用 `npm run consolidate` 归并。
- 无自动更新：Release 不上传 `latest.yml`，也没有 electron-updater 依赖，`dist/latest.yml`
  只是本地产物。发新版本要用户自己去 Releases 页下载安装。
- 无代码签名：Windows 首次运行触发 SmartScreen，macOS 未 Developer ID 签名与公证，
  要在系统设置里手动允许。

## CI

`.github/workflows/ci.yml` 在 push main 与 pull_request 上各跑两个 job：Linux 测试、
Windows 打包校验（`npm ci` → `npm test` → `npm run build:renderer` → `npm run smoke`
→ `npm run pack` → `npm run verify`）。Actions 运行时当前为 checkout@v7、setup-node@v7、
upload-artifact@v7、download-artifact@v8。

发布产物只在 macOS 工作流里上传，不自动创建 Release——建 Release 仍是手动一步。
