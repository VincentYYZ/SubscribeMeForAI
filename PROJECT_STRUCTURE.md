# 项目结构说明 / Project Structure

## 新增文件 / New Files

```
SubscribeMeForAI/
├── components/
│   └── docs/                          # 新增文档组件目录
│       ├── DocsLayout.tsx            # 三栏布局容器
│       ├── DocumentSidebar.tsx       # 左侧文档列表
│       ├── MarkdownRenderer.tsx      # 中间MD渲染器
│       └── TableOfContents.tsx       # 右侧目录结构
│
├── content/                           # 新增内容目录
│   ├── ai-coding/                    # AI编程文档
│   │   ├── introduction.md
│   │   ├── tools.md
│   │   └── best-practices.md
│   ├── ai-agent/                     # AI-Agent文档
│   │   ├── introduction.md
│   │   └── frameworks.md
│   └── robot-xiaoyou/                # 机器人小鼬文档
│       ├── introduction.md
│       └── features.md
│
├── lib/
│   └── docs.ts                       # 文档读取工具函数
│
├── DOCS_USAGE.md                     # 文档系统使用说明
└── PROJECT_STRUCTURE.md              # 本文件
```

## 修改的文件 / Modified Files

```
app/
├── ai-coding/page.tsx                # 更新为使用DocsLayout
├── ai-agent/page.tsx                 # 更新为使用DocsLayout
└── robot-xiaoyou/page.tsx            # 更新为使用DocsLayout

tailwind.config.ts                    # 添加typography插件

package.json                          # 添加新依赖
```

## 功能实现 / Features Implemented

### ✅ 三栏布局 / Three-Column Layout
- 左侧: 文档列表导航
- 中间: Markdown文档展示
- 右侧: 文档目录结构

### ✅ 文档管理 / Document Management
- 自动读取content目录下的MD文件
- 支持多个分类目录
- 文档标题自动提取

### ✅ Markdown渲染 / Markdown Rendering
- GitHub Flavored Markdown支持
- 代码语法高亮
- 自动生成标题锚点

### ✅ 交互功能 / Interactive Features
- 点击切换文档
- 点击目录跳转到对应章节
- 当前文档/章节高亮显示

## 技术栈 / Tech Stack

- **Next.js 16** - React框架
- **React Markdown** - MD渲染
- **Remark GFM** - GFM支持
- **React Syntax Highlighter** - 代码高亮
- **Tailwind CSS** - 样式框架
- **@tailwindcss/typography** - MD样式
- **Gray Matter** - Frontmatter解析
