export default function HomePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-xl font-bold text-foreground">HappyAICoding</h1>
        <p className="text-muted text-sm leading-relaxed max-w-[600px]">
          我只做一件事：帮你用 AI 做出第一个能赚钱的项目。这里我会分享 AI 编程的实战经验、
          Prompt 技巧以及行业观察。无论是零基础的小白，还是有经验的开发者，AI 都是你最强大的武器。
          很高兴认识你。
        </p>
        
        <div className="flex items-center gap-2 text-sm">
          <a href="#" className="flex items-center gap-1 hover:text-foreground text-muted transition-colors">
            <span className="font-medium underline">Twitter</span>
          </a>
          <span className="text-muted">·</span>
          <a href="#" className="flex items-center gap-1 hover:text-foreground text-muted transition-colors">
            <span className="font-medium underline">Github</span>
          </a>
          <span className="text-muted">·</span>
          <a href="#" className="flex items-center gap-1 hover:text-foreground text-muted transition-colors">
            <span className="font-medium underline">Bilibili</span>
          </a>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-muted">项目与课程</h2>
          <div className="h-px bg-border flex-1"></div>
        </div>
        
        <div className="space-y-4">
          <a href="/ai-coding" className="block group">
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="font-medium underline group-hover:text-muted transition-colors">AI 编程实战：从零到一</h3>
              <span className="text-xs text-muted whitespace-nowrap">2024 最新</span>
            </div>
            <p className="text-sm text-muted mt-1">不需要深厚的编程功底，不需要复杂的算法知识，带你完成自己的 AI 产品。</p>
          </a>
          
          <a href="/ai-agent" className="block group">
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="font-medium underline group-hover:text-muted transition-colors">构建你的专属 AI Agent</h3>
              <span className="text-xs text-muted whitespace-nowrap">进阶</span>
            </div>
            <p className="text-sm text-muted mt-1">深入理解 Agent 架构，从 Prompt Engineering 到完整工具链调用。</p>
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-muted">文章与思考</h2>
          <div className="h-px bg-border flex-1"></div>
        </div>
        
        <div className="space-y-4">
          <a href="#" className="block group">
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="font-medium underline group-hover:text-muted transition-colors">为什么普通人更需要学习 AI 编程？</h3>
              <span className="text-xs text-muted whitespace-nowrap">2024.05.01</span>
            </div>
          </a>
          
          <a href="#" className="block group">
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="font-medium underline group-hover:text-muted transition-colors">Claude 3.5 Sonnet 实战测评</h3>
              <span className="text-xs text-muted whitespace-nowrap">2024.04.15</span>
            </div>
          </a>
          
          <a href="#" className="block group">
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="font-medium underline group-hover:text-muted transition-colors">Cursor 核心使用技巧：如何成为 10x 程序员</h3>
              <span className="text-xs text-muted whitespace-nowrap">2024.03.20</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
