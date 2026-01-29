'use client'

import { Button } from "@/components/ui/Button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
                <div className="mr-4 hidden md:flex">
                    <a href="/" className="mr-8 flex items-center space-x-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            HappyAICoding
                        </span>
                    </a>
                    <nav className="flex items-center space-x-8 text-sm font-medium">
                        <a
                            href="/robot-xiaoyou"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            机器人小鼬
                        </a>
                        <a
                            href="/ai-coding"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            AI编程
                        </a>
                        <a
                            href="/ai-agent"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            AI-Agent
                        </a>
                        <a
                            href="/contact"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            联系我
                        </a>
                    </nav>
                </div>
                <button
                    className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-10 py-2 mr-2 px-3 text-slate-600 md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    <span className="sr-only">Toggle Menu</span>
                </button>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search or other items here if needed */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                            登录
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                            onClick={() => setIsRegisterOpen(true)}
                        >
                            注册
                        </Button>
                    </nav>
                </div>
            </div>
            {isOpen && (
                <div className="container md:hidden border-t border-blue-100">
                    <div className="flex flex-col space-y-3 py-4">
                        <a
                            href="/robot-xiaoyou"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            机器人小鼬
                        </a>
                        <a
                            href="/ai-coding"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            AI编程
                        </a>
                        <a
                            href="/ai-agent"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            AI-Agent
                        </a>
                        <a
                            href="/contact"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            联系我
                        </a>
                    </div>
                </div>
            )}
            {isRegisterOpen && (
                <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">注册</h2>
                            <button
                                className="rounded-lg px-2 py-1 text-slate-500 hover:text-slate-700"
                                onClick={() => setIsRegisterOpen(false)}
                            >
                                关闭
                            </button>
                        </div>
                        <form className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">用户名</label>
                                <input
                                    type="text"
                                    placeholder="请输入用户名"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">密码</label>
                                <input
                                    type="password"
                                    placeholder="请输入密码"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">PIN码</label>
                                <input
                                    type="text"
                                    placeholder="请输入PIN码"
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <Button
                                type="button"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                提交注册
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
}
