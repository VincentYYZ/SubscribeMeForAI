#!/bin/bash

# MD文档更新脚本 / MD Document Update Script
# 用于服务器上自动拉取最新文档 / For automatically pulling latest documents on server

echo "🚀 开始更新文档... / Starting document update..."

# 进入项目目录 / Enter project directory
cd /path/to/your/project || exit

# 拉取最新代码 / Pull latest code
echo "📥 拉取最新代码... / Pulling latest code..."
git pull origin main

# 只更新content目录 / Only update content directory
# git pull origin main -- content/

# 检查是否有更新 / Check if there are updates
if [ $? -eq 0 ]; then
    echo "✅ 代码拉取成功 / Code pulled successfully"
    
    # 安装依赖（如果package.json有变化）/ Install dependencies if package.json changed
    if git diff HEAD@{1} HEAD --name-only | grep -q "package.json"; then
        echo "📦 检测到依赖变化，安装依赖... / Dependencies changed, installing..."
        npm install
    fi
    
    # 重启应用（根据你的部署方式选择）/ Restart application (choose based on your deployment)
    # 方式1: PM2
    # pm2 restart subscribe-me-for-ai
    
    # 方式2: Docker
    # docker-compose restart
    
    # 方式3: Systemd
    # systemctl restart subscribe-me-for-ai
    
    echo "🎉 文档更新完成！/ Document update completed!"
else
    echo "❌ 更新失败 / Update failed"
    exit 1
fi
