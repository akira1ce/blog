# 更新日志

本文档记录项目的所有重要更改。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.1.0]

1. 添加代码块（`figure`/`figcaption`）的自定义样式支持
2. 支持通过 `title` 属性为代码块添加标题显示
3. 添加 `--bg-card` CSS 变量，用于卡片背景色
4. 优化 Tabs 组件样式，使用新的卡片样式和边框设计
5. 优化代码块样式，统一使用卡片背景和边框
6. 优化行内代码样式，使用卡片背景和边框替代灰色背景
7. 改进 Tabs 组件动画性能，添加 `key` 和 `duration` 优化
8. 修复 Tabs 内代码块 title 重复显示的问题
9. 通过 CSS 选择器 `[data-tabs-container] figcaption[data-rehype-pretty-code-title]` 隐藏 Tabs 内的代码块标题
10. 避免与 Tab 标签重复显示文件名
11. 移除 Tabs 组件的 Context API 实现，简化组件结构
12. 更新代码块容器样式，使用 `figure` 元素包裹代码块
13. 更新主题变量，添加卡片背景色变量