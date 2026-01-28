# 文档更新方法总结 / Document Update Methods Summary

## 🎯 推荐方案对比 / Recommended Solutions Comparison

| 方案 | 适用场景 | 难度 | 特点 |
|------|----------|------|------|
| **Web管理后台** | 非技术人员 | ⭐ | 最简单，浏览器直接编辑 |
| **GitHub在线编辑** | 个人使用 | ⭐⭐ | 免费，支持版本控制 |
| **Git + Webhook** | 团队协作 | ⭐⭐⭐ | 全自动，专业方案 |
| **SSH直接编辑** | 紧急修改 | ⭐⭐ | 最快速 |

---

## 方案1: Web管理后台（最简单）⭐⭐⭐⭐⭐

### 特点 / Features
- ✅ 无需任何技术背景
- ✅ 浏览器直接访问
- ✅ 可视化界面
- ✅ 实时保存

### 使用步骤 / Steps

1. **访问管理后台**
   ```
   https://your-domain.com/admin/docs
   ```

2. **选择分类**
   - 点击左侧的分类（ai-coding, ai-agent, robot-xiaoyou）

3. **编辑文档**
   - 选择已有文档进行编辑  d  
   - 或点击 "+" 创建新文档

4. **保存**
   - 点击"保存"按钮
   - 文档立即生效

### 界面说明 / Interface Guide
```
┌─────────────────────────────────────────────┐
│  文档管理后台                                │
├──────────┬──────────────────────────────────┤
│ 分类列表  │  编辑器                          │
│          │                                  │
│ □ ai-coding   ┌─────────────────┐          │
│ ■ ai-agent    │ # 文档标题      │          │
│ □ robot-xiaoyou│                 │          │
│          │ ## 章节1            │          │
│ 文档列表  │ 内容...             │          │
│ • intro  │                     │          │
│ • tools  │ [编辑] [保存] [删除] │          │
│ + 新建   │                     │          │
└──────────┴─────────────────────────────────┘
```

---

## 方案2: GitHub在线编辑（推荐个人使用）⭐⭐⭐⭐

### 特点 / Features
- ✅ 完全免费
- ✅ 支持版本控制
- ✅ 可以回滚
- ✅ 手机也能用

### 使用步骤 / Steps

1. **打开GitHub仓库**
   ```
   https://github.com/your-username/your-repo
   ```

2. **导航到文档**
   ```
   content/ai-coding/introduction.md
   ```

3. **点击编辑按钮**（铅笔图标）

4. **修改内容**

5. **提交更改**
   - 填写提交信息
   - 点击 "Commit changes"

6. **自动部署**
   - 如果配置了Webhook，几秒钟后生效
   - 如果配置了定时任务，最多5分钟生效

### 手机端使用 / Mobile Usage
- 下载GitHub移动应用
- 或直接用浏览器访问GitHub网页版
- 操作方式相同

---

## 方案3: Git命令行（适合开发者）⭐⭐⭐⭐

### 特点 / Features
- ✅ 专业工作流
- ✅ 支持批量操作
- ✅ 本地编辑器
- ✅ 完整版本控制

### 使用步骤 / Steps

```bash
# 1. 克隆仓库（首次）
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. 编辑文档（使用你喜欢的编辑器）
vim content/ai-coding/new-topic.md
# 或
code content/ai-coding/new-topic.md

# 3. 查看修改
git status
git diff

# 4. 提交更改
git add content/
git commit -m "添加新文档: AI编程新主题"

# 5. 推送到远程
git push origin main

# 6. 自动部署（如果配置了Webhook）
```

### 常用命令 / Common Commands

```bash
# 拉取最新代码
git pull

# 创建新分支
git checkout -b feature/new-docs

# 合并分支
git merge feature/new-docs

# 查看历史
git log --oneline

# 回滚到指定版本
git reset --hard <commit-id>
```

---

## 方案4: SSH直接编辑（紧急修改）⭐⭐⭐

### 特点 / Features
- ✅ 最快速
- ✅ 立即生效
- ⚠️ 无版本控制
- ⚠️ 需要服务器访问权限

### 使用步骤 / Steps

```bash
# 1. SSH登录服务器
ssh user@your-server.com

# 2. 进入项目目录
cd /var/www/your-project

# 3. 编辑文档
vim content/ai-coding/introduction.md

# 或使用nano（更简单）
nano content/ai-coding/introduction.md

# 4. 保存退出
# vim: 按 ESC，输入 :wq
# nano: 按 Ctrl+X，然后 Y，然后 Enter

# 5. 立即生效（Next.js自动检测文件变化）
```

### Vim基础操作 / Vim Basics
```
i     - 进入编辑模式
ESC   - 退出编辑模式
:w    - 保存
:q    - 退出
:wq   - 保存并退出
:q!   - 强制退出不保存
```

---

## 方案5: SFTP上传（可视化）⭐⭐

### 特点 / Features
- ✅ 图形界面
- ✅ 拖拽上传
- ⚠️ 需要SFTP客户端

### 推荐工具 / Recommended Tools
- **FileZilla** (免费，跨平台)
- **Cyberduck** (Mac)
- **WinSCP** (Windows)

### 使用步骤 / Steps

1. **打开SFTP客户端**

2. **连接服务器**
   - 主机: your-server.com
   - 端口: 22
   - 用户名: your-username
   - 密码: your-password

3. **导航到目录**
   ```
   /var/www/your-project/content/
   ```

4. **上传或编辑文件**
   - 拖拽文件上传
   - 或右键编辑

5. **保存后自动生效**

---

## 自动部署配置 / Auto-Deployment Configuration

### 选项A: Webhook自动部署（推荐）

**优点：** 提交后几秒钟自动部署
**Advantages:** Auto-deploy within seconds after commit

**配置步骤：**
1. 启动webhook服务器
   ```bash
   pm2 start scripts/webhook-server.js --name webhook
   ```

2. 在GitHub设置Webhook
   - URL: `http://your-server.com:9000/webhook`
   - Secret: 设置密钥

3. 完成！每次push自动部署

### 选项B: 定时任务（简单）

**优点：** 配置简单，无需webhook
**Advantages:** Simple configuration, no webhook needed

**配置步骤：**
```bash
# 编辑crontab
crontab -e

# 添加定时任务（每5分钟检查一次）
*/5 * * * * cd /var/www/your-project && git pull origin main
```

---

## 快速参考表 / Quick Reference

### 我应该用哪个方案？/ Which solution should I use?

| 你的情况 | 推荐方案 |
|---------|---------|
| 我不懂技术 | Web管理后台 |
| 我会用GitHub | GitHub在线编辑 |
| 我是开发者 | Git命令行 |
| 需要紧急修改 | SSH直接编辑 |
| 团队协作 | Git + Webhook |

### 更新速度对比 / Update Speed Comparison

| 方案 | 生效时间 |
|------|---------|
| Web管理后台 | 立即 |
| SSH直接编辑 | 立即 |
| Git + Webhook | 5-10秒 |
| Git + 定时任务 | 0-5分钟 |
| GitHub在线编辑 | 5秒-5分钟 |

---

## 常见问题 / FAQ

### Q: 我可以在手机上更新文档吗？
**A:** 可以！
- 使用Web管理后台（浏览器访问）
- 使用GitHub移动应用
- 使用SSH客户端（如Termius）

### Q: 多人同时编辑会冲突吗？
**A:** 
- Web管理后台：后保存的会覆盖先保存的
- Git方式：会提示冲突，需要手动解决

### Q: 如何备份文档？
**A:** 
- Git方式自动备份（每次提交都是备份）
- Web管理后台建议定期导出
- 可以设置自动备份脚本

### Q: 文档中的图片怎么上传？
**A:** 
- 放在 `public/images/` 目录
- 在MD中引用: `![描述](/images/xxx.png)`
- 可以用SFTP上传图片

---

## 总结建议 / Summary & Recommendations

### 🥇 最推荐：Web管理后台 + Git备份
- 日常使用Web管理后台（简单方便）
- 定期用Git备份（安全可靠）

### 🥈 次推荐：GitHub在线编辑
- 完全免费
- 支持版本控制
- 适合个人项目

### 🥉 专业方案：Git + Webhook
- 适合团队协作
- 完整的CI/CD流程
- 需要一定技术能力

---

## 需要帮助？/ Need Help?

如果遇到问题，可以：
If you encounter problems, you can:

1. 查看详细文档：`DEPLOYMENT_GUIDE.md`
2. 检查服务器日志：`pm2 logs`
3. 测试webhook：访问 `http://your-server.com:9000/webhook`
4. 查看Git状态：`git status`

---

**记住：选择最适合你的方案，不一定要用最复杂的！**
**Remember: Choose the solution that suits you best, not necessarily the most complex one!**
