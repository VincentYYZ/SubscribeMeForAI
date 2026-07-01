'use client'

export function Footer() {
    return (
        <footer className="mt-16 border-t border-border pt-8 pb-4 text-xs text-muted">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p>
                    © 2024 HappyAICoding. 零基础也能用 AI 做出第一个能赚钱的项目。
                </p>
                <p className="text-center">
                    <a
                        href="https://beian.miit.gov.cn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors hover:underline"
                    >
                        鄂ICP备2025139950号-1
                    </a>
                    <span className="mx-2">|</span>
                    信息产业部备案管理系统：
                    <a
                        href="https://beian.miit.gov.cn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors hover:underline"
                    >
                        https://beian.miit.gov.cn
                    </a>
                </p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-foreground transition-colors hover:underline">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors hover:underline">
                        GitHub
                    </a>
                    <a href="#" className="hover:text-foreground transition-colors hover:underline">
                        Youtube
                    </a>
                </div>
            </div>
        </footer>
    );
}
