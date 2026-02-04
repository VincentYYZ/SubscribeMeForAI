'use client'

import { Github, Twitter, Youtube, Sparkles } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/15 bg-white/5 text-slate-200">
            <div className="container flex flex-col gap-8 py-12 md:flex-row md:py-16 px-4 md:px-6">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h2 className="font-bold text-lg bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-transparent">
                            HappyAICoding
                        </h2>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        零基础也能用 AI 做出第一个能赚钱的项目。
                    </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">关于</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    课程介绍
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    学员案例
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">链接</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">法律</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    隐私政策
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    服务条款
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/15 bg-white/10">
                <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row px-4 md:px-6">
                    <p className="text-sm text-slate-300">
                        © 2024 HappyAICoding. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform">
                            <Youtube className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
