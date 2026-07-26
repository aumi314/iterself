# IterSelf 项目规范

- 产品目标：用日、周、月、长期四个维度完成规划、记录和复盘迭代。
- 技术栈：Electron + 原生 HTML/CSS/JS + 本地 JSON；MVP 阶段不引入框架或原生数据库。
- 数据属于用户：功能变更必须兼容已有 `iterself-data.json`，不得静默删除或改写历史记录。
- 修改范围：只改当前需求涉及的文件，不顺手重构相邻代码。
- 界面要求：默认中文可用；关键操作给出明确结果；设置修改应即时生效并持久化。
- 验证要求：至少运行 `npm test`、`npm run smoke`、`npm run verify`。
- 发布前：核对 README、DESIGN、RELEASE 与代码现状，文档不得声称尚未实现的功能。
