import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-10 md:py-16 lg:py-28">
            {/* Clean white background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />

            <div className="relative space-y-6">
                <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center px-4 md:px-6 mx-auto">
                    {/* Badge with Konsta styling */}
                    <div className="animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-md">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            2024 最新 AI 编程实战课程
                        </div>
                    </div>

                    {/* Main heading */}
                    <h1 className="animate-slide-up font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900">
                        零基础也能用{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
                            AI
                        </span>
                        <br />
                        做出第一个能赚钱的项目
                    </h1>

                    {/* Description */}
                    <p
                        className="animate-slide-up max-w-[42rem] text-base leading-relaxed text-slate-600 sm:text-xl"
                        style={{ animationDelay: "0.1s" }}
                    >
                        不需要深厚的编程功底，不需要复杂的算法知识。
                        只要你有一颗想创造的心，AI 就是你最强大的武器。
                        带你从零开始，一步步完成自己的 AI 产品。
                    </p>

                    {/* CTA Buttons with Konsta styling */}
                    <div
                        className="animate-scale-in flex flex-col sm:flex-row gap-4"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-8"
                        >
                            开始学习
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-slate-300 bg-white text-slate-900 hover:bg-slate-50 rounded-xl px-8"
                        >
                            查看大纲
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}


