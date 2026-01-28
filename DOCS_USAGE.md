# 文档系统使用说明 / Documentation System Usage Guide

## 概述 / Overview

本项目已实现三栏布局的文档展示系统，类似于你提供的参考图片。
This project has implemented a three-column layout documentation display system, similar to the reference image you provided.

## 目录结构 / Directory Structure

```
content/
├── ai-coding/          # AI编程相关文档
│   ├── introduction.md
│   ├── tools.md
│   └── best-practices.md
├── ai-agent/           # AI-Agent相关文档
│   ├── introduction.md
│   └── frameworks.md
└── robot-xiaoyou/      # 机器人小鼬相关文档
    ├── introduction.md
    └── features.md
```

## 组件说明 / Component Description

### 1. DocumentSidebar (左侧文档列表)
- 位置: `components/docs/DocumentSidebar.tsx`
- 功能: 显示当前分类下的所有MD文档列表
- 特性: 点击切换文档，高亮当前选中文档

### 2. MarkdownRenderer (中间文档展示)
- 位置: `components/docs/MarkdownRenderer.tsx`
- 功能: 渲染Markdown文档内容
- 特性: 
  - 支持GFM (GitHub Flavored Markdown)
  - 代码高亮显示
  - 自动提取标题生成锚点

### 3. TableOfContents (右侧目录)
- 位置: `components/docs/TableOfContents.tsx`
- 功能: 显示文档的标题结构
- 特性: 点击标题平滑滚动到对应位置

### 4. DocsLayout (三栏布局容器)
- 位置: `components/docs/DocsLayout.tsx`
- 功能: 整合三个组件，管理状态

## 如何添加新文档 / How to Add New Documents

### 步骤 / Steps:

1. 在对应分类目录下创建MD文件
   Create MD file in the corresponding category directory:
   ```bash
   # 例如 / For example:
   touch content/ai-coding/new-topic.md
   ```

2. 编写Markdown内容
   Write Markdown content:
   ```markdown
   # 文档标题
   
   ## 章节1
   内容...
   
   ## 章节2
   内容...
   ```

3. 文档会自动被系统读取并显示
   The document will be automatically read and displayed by the system

## 页面配置 / Page Configuration

每个tab页面都已配置使用文档系统:
Each tab page has been configured to use the documentation system:

- `/ai-coding` - AI编程文档
- `/ai-agent` - AI-Agent文档
- `/robot-xiaoyou` - 机器人小鼬文档

## 依赖包 / Dependencies

已安装的相关依赖:
Installed related dependencies:

- `react-markdown` - Markdown渲染
- `remark-gfm` - GitHub Flavored Markdown支持
- `react-syntax-highlighter` - 代码高亮
- `gray-matter` - 解析frontmatter
- `@tailwindcss/typography` - Markdown样式

## 自定义样式 / Custom Styling

文档内容使用Tailwind的typography插件进行样式化:
Document content is styled using Tailwind's typography plugin:

```tsx
<article className="prose prose-slate max-w-none px-8 py-6">
  {/* Markdown content */}
</article>
```

## 扩展功能建议 / Extension Suggestions

1. **搜索功能** - 添加文档搜索
   Search functionality - Add document search

2. **标签分类** - 为文档添加标签
   Tag categorization - Add tags to documents

3. **版本控制** - 文档版本管理
   Version control - Document version management

4. **评论系统** - 允许用户评论
   Comment system - Allow user comments

5. **导出功能** - 导出为PDF等格式
   Export functionality - Export to PDF and other formats

## 注意事项 / Notes

1. 确保Node.js版本 >= 20.9.0
   Ensure Node.js version >= 20.9.0

2. MD文件使用UTF-8编码
   MD files should use UTF-8 encoding

3. 图片资源放在 `public/images/` 目录
   Image resources should be placed in `public/images/` directory

4. 代码块需要指定语言以获得正确的高亮
   Code blocks need to specify language for proper highlighting
