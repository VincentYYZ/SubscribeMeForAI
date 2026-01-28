/**
 * Webhook服务器 / Webhook Server
 * 监听GitHub/GitLab的push事件，自动更新文档
 * Listens to GitHub/GitLab push events and automatically updates documents
 */

const http = require('http');
const { exec } = require('child_process');
const crypto = require('crypto');

// 配置 / Configuration
const PORT = 9000;
const SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key';
const UPDATE_SCRIPT = '/path/to/your/project/scripts/update-docs.sh';

// 验证GitHub签名 / Verify GitHub signature
function verifyGitHubSignature(payload, signature) {
  const hmac = crypto.createHmac('sha256', SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// 创建服务器 / Create server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // 验证签名（GitHub）/ Verify signature (GitHub)
        const signature = req.headers['x-hub-signature-256'];
        if (signature && !verifyGitHubSignature(body, signature)) {
          res.writeHead(401);
          res.end('Invalid signature');
          return;
        }

        const payload = JSON.parse(body);
        
        // 检查是否是push事件 / Check if it's a push event
        if (payload.ref === 'refs/heads/main' || payload.ref === 'refs/heads/master') {
          console.log('📥 收到push事件，开始更新... / Received push event, starting update...');
          
          // 执行更新脚本 / Execute update script
          exec(`bash ${UPDATE_SCRIPT}`, (error, stdout, stderr) => {
            if (error) {
              console.error('❌ 更新失败: / Update failed:', error);
              return;
            }
            console.log('✅ 更新成功: / Update successful:', stdout);
          });

          res.writeHead(200);
          res.end('Webhook received and processing');
        } else {
          res.writeHead(200);
          res.end('Ignored: not main branch');
        }
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.writeHead(500);
        res.end('Internal server error');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`🎯 Webhook服务器运行在端口 ${PORT} / Webhook server running on port ${PORT}`);
});
