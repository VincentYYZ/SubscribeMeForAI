# 部署和文档更新指南 / Deployment and Document Update Guide

## 目录 / Table of Contents
1. [部署方式选择](#部署方式选择)
2. [Git自动更新方案（推荐）](#git自动更新方案推荐)
3. [简单手动更新方案](#简单手动更新方案)
4. [在线编辑方案](#在线编辑方案)
5. [常见问题](#常见问题)

---

## 部署方式选择 / Deployment Options

### 方案对比表 / Comparison Table

| 方案 | 难度 | 成本 | 版本控制 | 推荐度 |
|------|------|------|----------|--------|
| Git + Webhook | ⭐⭐⭐ | 免费 | ✅ | ⭐⭐⭐⭐⭐ |
| Git + 手动拉取 | ⭐⭐ | 免费 | ✅ | ⭐⭐⭐⭐ |
| SFTP上传 | ⭐ | 免费 | ❌ | ⭐⭐ |
| 云存储同步 | ⭐⭐ | 付费 | ❌ | ⭐⭐⭐ |
| CMS后台 | ⭐⭐⭐⭐ | 免费 | 可选 | ⭐⭐⭐⭐ |

---

## Git自动更新方案（推荐）/ Git Auto-Update Solution (Recommended)

### 优势 / Advantages
- ✅ 版本控制，可回滚
- ✅ 支持团队协作
- ✅ 自动化部署
- ✅ 完全免费

### 步骤 / Steps

#### 1. 初始化Git仓库 / Initialize Git Repository

```bash
# 在项目根目录 / In project root directory
git init
git add .
git commit -m "Initial commit"

# 关联远程仓库 / Link remote repository
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 2. 服务器端配置 / Server Configuration

**方式A: 使用Webhook自动更新（最推荐）**

1. **设置更新脚本权限**
```bash
chmod +x scripts/update-docs.sh
```

2. **修改脚本中的路径**
编辑 `scripts/update-docs.sh`，修改项目路径：
```bash
cd /var/www/your-project || exit
```

3. **启动Webhook服务**
```bash
# 安装PM2（如果还没有）
npm install -g pm2

# 启动webhook服务器
pm2 start scripts/webhook-server.js --name webhook-server

# 设置开机自启
pm2 startup
pm2 save
```

4. **配置GitHub Webhook**
   - 进入GitHub仓库设置
   - 选择 Webhooks → Add webhook
   - Payload URL: `http://your-server.com:9000/webhook`
   - Content type: `application/json`
   - Secret: 设置一个密钥（与webhook-server.js中的SECRET一致）
   - 选择 `Just the push event`
   - 点击 Add webhook

**方式B: 定时自动拉取（简单方案）**

使用cron定时任务，每5分钟检查一次更新：
```bash
# 编辑crontab
crontab -e

# 添加以下行（每5分钟执行一次）
*/5 * * * * cd /var/www/your-project && git pull origin main && pm2 restart your-app
```

**方式C: 手动拉取更新**

```bash
# SSH登录服务器
ssh user@your-server.com

# 进入项目目录
cd /var/www/your-project

# 拉取最新代码
git pull origin main

# 重启应用
pm2 restart your-app
```

#### 3. 更新文档流程 / Document Update Workflow

```bash
# 本地修改文档
vim content/ai-coding/new-topic.md

# 查看修改
git status

# 提交更改
git add content/
git commit -m "添加新文档: AI编程新主题"

# 推送到远程仓库
git push origin main

# 服务器会自动更新（如果配置了Webhook或cron）
# Server will auto-update (if Webhook or cron is configured)
```

---

## 简单手动更新方案 / Simple Manual Update Solution

适合小型项目或个人使用 / Suitable for small projects or personal use

### 方式1: SFTP/SCP上传

**使用FileZilla或其他SFTP客户端：**
1. 连接到服务器
2. 导航到 `content/` 目录
3. 直接上传或编辑MD文件
4. 刷新网页查看效果

**使用SCP命令：**
```bash
# 上传单个文件
scp content/ai-coding/new-doc.md user@server:/var/www/project/content/ai-coding/

# 上传整个目录
scp -r content/ user@server:/var/www/project/
```

### 方式2: 服务器端直接编辑

```bash
# SSH登录服务器
ssh user@your-server.com

# 编辑文档
vim /var/www/project/content/ai-coding/new-doc.md

# 保存后自动生效（Next.js会自动检测文件变化）
```

---

## 在线编辑方案 / Online Editing Solution

### 方式1: GitHub在线编辑（最简单）

1. 打开GitHub仓库
2. 导航到 `content/` 目录
3. 点击文件 → 点击编辑按钮（铅笔图标）
4. 编辑内容
5. 提交更改（Commit changes）
6. 服务器自动更新（如果配置了Webhook）

### 方式2: 使用GitHub Codespaces

1. 在GitHub仓库页面点击 "Code" → "Codespaces"
2. 创建新的Codespace
3. 在线编辑文件
4. 提交并推送更改

### 方式3: 使用Gitee（国内访问更快）

如果GitHub访问慢，可以使用Gitee：
1. 在Gitee创建仓库
2. 同步GitHub仓库到Gitee
3. 使用Gitee的在线编辑功能

---

## 推荐工作流程 / Recommended Workflow

### 日常更新文档 / Daily Document Updates

**选项1: 本地编辑 + Git推送（推荐）**
```bash
# 1. 编辑文档
code content/ai-coding/new-doc.md

# 2. 提交
git add content/
git commit -m "更新文档"
git push

# 3. 自动部署（无需手动操作）
```

**选项2: GitHub在线编辑（最简单）**
1. 浏览器打开GitHub仓库
2. 找到要编辑的文件
3. 点击编辑按钮
4. 修改后提交
5. 自动部署

**选项3: SSH直接编辑（紧急修改）**
```bash
ssh user@server
vim /var/www/project/content/xxx.md
# 保存即生效
```

---

## 常见问题 / FAQ

### Q1: 更新文档后多久生效？
**A:** 
- Webhook方式: 几秒钟内生效
- Cron定时任务: 最多5分钟（取决于cron间隔）
- 手动更新: 立即生效

### Q2: 如何回滚到之前的版本？
**A:** 使用Git回滚
```bash
# 查看提交历史
git log

# 回滚到指定版本
git reset --hard <commit-id>
git push -f origin main
```

### Q3: 可以在手机上更新文档吗？
**A:** 可以！
- 使用GitHub移动应用
- 使用Working Copy（iOS）
- 使用MGit（Android）
- 直接用浏览器访问GitHub网页版

### Q4: 多人协作如何避免冲突？
**A:** 
- 不同人编辑不同文件
- 使用Git分支功能
- 及时拉取最新代码：`git pull`

### Q5: 文档中的图片如何管理？
**A:** 
```bash
# 图片放在public目录
public/
  images/
    ai-coding/
      screenshot1.png

# 在MD中引用
![描述](/images/ai-coding/screenshot1.png)
```

### Q6: 如何备份文档？
**A:** 
- Git本身就是备份（每次提交都是一个备份点）
- 定期导出到其他地方：`git clone --mirror`
- 使用GitHub的自动备份功能

---

## 安全建议 / Security Recommendations

1. **使用SSH密钥认证**
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到GitHub
cat ~/.ssh/id_ed25519.pub
```

2. **设置Webhook密钥**
在 `scripts/webhook-server.js` 中设置强密码

3. **限制服务器访问**
```bash
# 只允许特定IP访问webhook端口
sudo ufw allow from github-ip to any port 9000
```

4. **定期更新依赖**
```bash
npm audit
npm update
```

---

## 快速参考 / Quick Reference

### 常用命令 / Common Commands

```bash
# 查看文档列表
ls -la content/

# 创建新文档
touch content/ai-coding/new-topic.md

# 提交更改
git add . && git commit -m "更新" && git push

# 查看服务器日志
pm2 logs your-app

# 重启应用
pm2 restart your-app

# 查看webhook日志
pm2 logs webhook-server
```

---

## 总结 / Summary

**最推荐的方案：Git + Webhook自动部署**
The most recommended solution: Git + Webhook auto-deployment

**优点 / Advantages:**
- ✅ 完全自动化
- ✅ 支持版本控制
- ✅ 支持团队协作
- ✅ 可以回滚
- ✅ 免费

**工作流程 / Workflow:**
1. 本地或GitHub在线编辑文档
2. 提交到Git仓库
3. Webhook自动触发服务器更新
4. 文档立即生效

**备选方案：定时拉取（更简单）**
Alternative: Scheduled pull (simpler)
- 设置cron每5分钟自动拉取
- 无需配置Webhook
- 适合个人项目
