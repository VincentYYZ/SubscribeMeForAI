'use client'

export function Footer() {
    return (
        <footer className="mt-16 border-t border-border pt-8 pb-4 text-xs text-muted">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p>
                    © 2024 HappyAICoding. 零基础也能用 AI 做出第一个能赚钱的项目。
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
