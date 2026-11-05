# dsh-nasdaq-signal-guide

> 纳指三信号决策仪 · DeepSeek Harness 面板插件

把 [nasdaq-signal-guide](https://github.com/Bingmang) 的三信号决策面板接进 DeepSeek Harness：
左侧栏多一个「纳指三信号」入口，点开后在中部查看当天信号、月度执行决策与历史曲线。
行情与月度策略数据由插件自己每天同步，不再需要手动执行 `npm run data:update`。

## 功能

- **左侧入口 + 完整面板**：当天信号、低位共振计数、三张信号卡、月度历史曲线、本月动作顺序、口径说明、数据来源。
- **任意日期回看**：支持 2000-01-03 以来的日期；休市日自动落到最近交易日。
- **自动同步**：
  - 每天 09:10（Asia/Shanghai）运行应用自带的两个生成脚本；
  - Harness 启动时，如果上次成功同步超过 18 小时，自动补跑；
  - 面板顶部还有「立即同步」和「刷新」；同步完成后数据自动更新，无需重启。
- **跟随 Harness**：使用主题 token，明暗主题一致；界面文案支持中文 / English。
- **无额外服务**：不启动 Next/Vite 服务器、不使用 iframe；Host 只依赖 Node 内置模块。

## 依赖

这个插件是 `nasdaq-signal-guide` Web 应用的伴侣，需要本地有一份该应用的 checkout：

- 读取 `app/data/market-data.json`、`app/data/monthly-signals.json`
- 运行 `scripts/generate-market-data.mjs`、`scripts/generate-monthly-signals.mjs`

如果找不到应用目录，面板会显示错误并提示设置 `NASDAQ_SIGNAL_GUIDE_DIR`。

## 安装

### 通过 Harness 插件管理器（推荐）

把下面的 spec 交给 `plugin_manager` 的 `install_bundle`：

```text
github:Bingmang/dsh-nasdaq-signal-guide#v0.1.0
```

本地开发时可以直接安装目录：

```text
/absolute/path/to/dsh-nasdaq-signal-guide
```

安装完成后刷新一次 Web 页面，左侧栏会出现带上升曲线的图标，名称「纳指三信号」。

### 指定应用目录

查找顺序：

1. 行配置 `projectDir`
2. 环境变量 `NASDAQ_SIGNAL_GUIDE_DIR`
3. 插件目录上两级（适合放在应用仓库的 `harness-plugin/` 里）
4. `~/Workspace/nasdaq-signal-guide`
5. `~/nasdaq-signal-guide`

行配置示例（profile 的 `cordis.patch.yml`）：

```yaml
- id: nasdaq-signal-guide
  config:
    projectDir: /Users/you/code/nasdaq-signal-guide
```

可选环境变量：

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `NASDAQ_SIGNAL_GUIDE_DIR` | 自动探测 | Web 应用目录 |
| `NASDAQ_SIGNAL_UPDATE_TIME` | `09:10` | 每日同步时间（上海时区，`HH:mm`） |
| `NASDAQ_SIGNAL_NODE` | 自动探测 | 运行生成脚本的 Node 路径 |

## 自动同步

Host 半按顺序执行：

```bash
node scripts/generate-market-data.mjs
node scripts/generate-monthly-signals.mjs
```

- 每个脚本最多 3 分钟；失败原因写入 `.sites-runtime/nasdaq-signal-guide-state.json`，并在面板顶部提示。
- 同一次同步不会并发执行；`/nasdaq-signal-guide/update` 只触发一次。
- 数据文件变化后无需重启：Host 路由按 mtime/size 缓存，下一次请求自动读取新 JSON。
- 当月视图会像原站一样尝试合并上游实时数据（2.5 秒超时、单源失败回退快照），并缓存 5 分钟。

## 从源码构建

```bash
npm install
npm run build:client   # client-src/ -> client.js
npm run check          # 语法检查
```

`client.js` 已提交在仓库中，安装时直接读取；修改 `client-src/` 后需要重新构建。

## 目录

```text
index.js              Host 入口：HTTP 路由 + 自动同步生命周期
host/signals.js       /api/signals 的移植（快照 + 当月实时合并）
host/store.js         按 mtime 缓存的 JSON 读取
host/updater.js       每日调度、启动补跑、并发保护、状态持久化
client-src/           Client 源码（JSX + CSS + 文案）
client.js             Client 构建产物（window.__ModuleLoader__ 工厂）
build-client.mjs      esbuild 打包脚本
locale/               插件管理页显示的名称与描述
icon.svg              侧栏与插件列表图标
```

## 数据与免责声明

行情数据来自 FRED、Multpl / Robert Shiller 与 Yahoo Finance；策略口径见面板中的「口径与规则」。
本项目是研究工具，不构成投资建议。杠杆 ETF 可能出现超过 50% 的深度回撤。

## License

[MIT](./LICENSE)
