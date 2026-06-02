import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-10 md:py-16 lg:py-28">
            <div className="relative space-y-6">
                <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center px-4 md:px-6 mx-auto">
                    <div className="animate-fade-in">
                        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted shadow-sm">
                            <Sparkles className="h-4 w-4 text-accent" />
                            2024 最新 AI 编程实战课程
                        </div>
                    </div>

                    <h1 className="animate-slide-up font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                        零基础也能用{" "}
                        <span className="text-accent">
                            AI
                        </span>
                        <br />
                        做出第一个能赚钱的项目
                    </h1>

                    <p
                        className="animate-slide-up max-w-[42rem] text-base leading-relaxed text-muted sm:text-xl"
                        style={{ animationDelay: "0.1s" }}
                    >
                        不需要深厚的编程功底，不需要复杂的算法知识。
                        只要你有一颗想创造的心，AI 就是你最强大的武器。
                        带你从零开始，一步步完成自己的 AI 产品。
                    </p>

                    <div
                        className="animate-scale-in flex flex-col sm:flex-row gap-4"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <Button 
                            size="lg" 
                            className="rounded-md px-8 shadow-sm"
                        >
                            开始学习
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-md border-border bg-card px-8 text-foreground hover:bg-secondary"
                        >
                            查看大纲
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

