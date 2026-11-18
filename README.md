# 河图悬疑推演

> 组织作者真相、证词、线索和揭示阶段，区分读者可推导结论与作者已知答案。

## 简介

悬疑推演是独立TypeScript／React河图插件。外部Agent通过河图稳定CLI/MCP发现并调用，作者在工作面阅读、比较、反馈；作品正文和正式决定由宿主管理。

## 快速上手

安装河图插件中心提供的固定运行包，再向当前Agent说明本次作品与目标。先发现当前安装版能力，再读取包内`hetu-mystery-lab`方法和已有工程。

读取固定原文与规划→登记命题、证词和线索→明确各阶段揭示→只用当时可见线索评估假说→对照作者真相查缺口→形成局部返工候选→沿新稿复核。

## 开发

Node.js 25，固定依赖见`package-lock.json`。

```bash
npm ci
npm run build
npm run check
npm run test:unit
npm run test:machine
npm run test:ui
npm run package
```

机器与界面验收使用`acceptance-lock.json`固定的正式宿主；完整步骤见[开发与发布](docs/07-开发发布与维护.md)。

## 边界

作者真相是专业设定候选，不自动成为宿主正典。confirmed仅表示本工程声明的线索可靠度；结构一致不证明诡计公平、读者一定猜出或现实案件结论。复用小说规划的时序与人物知情，不建立第二份正式时间线。

## 文档

[功能清单](CAPABILITIES.md) · [产品与开发文档](docs/README.md) · [验收记录](docs/08-实施计划与验收记录.md)。
