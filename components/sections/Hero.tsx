import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section className="relative overflow-hidden gradient-bg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTJ2MmgydjJoMnYtMmgydi0yaC0ydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            
            <div className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 md:px-6 mx-auto">
                    <div className="animate-fade-in">
                        <a
                            href="#"
                            className="inline-flex items-center rounded-full bg-blue-600/10 border border-blue-600/20 px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-600/20 transition-colors"
                        >
                            <span className="mr-2">🎉</span>
                            2024 最新 AI 编程实战课程
                        </a>
                    </div>
                    
                    <h1 className="animate-slide-up font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        零基础也能用{" "}
                        <span className="gradient-text">AI</span>
                        <br />
                        做出第一个能赚钱的项目
                    </h1>
                    
                    <p className="animate-slide-up max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8" style={{ animationDelay: "0.1s" }}>
                        不需要深厚的编程功底，不需要复杂的算法知识。
                        只要你有一颗想创造的心，AI 就是你最强大的武器。
                        带你从零开始，一步步完成自己的 AI 产品。
                    </p>
                    
                    <div className="animate-scale-in flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.2s" }}>
                        <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                            开始学习
                        </Button>
                        <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
                            查看大纲
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
