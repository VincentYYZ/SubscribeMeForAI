'use client'

import { Button } from "@/components/ui/Button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                            href="#features"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            课程内容
                        </a>
                        <a
                            href="#faq"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            FAQ
                        </a>
                        <a
                            href="#pricing"
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            价格
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
                    <nav className="flex items-center">
                        <Button 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                            size="sm"
                        >
                            开始学习
                        </Button>
                    </nav>
                </div>
            </div>
            {isOpen && (
                <div className="container md:hidden border-t border-blue-100">
                    <div className="flex flex-col space-y-3 py-4">
                        <a
                            href="#features"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            课程内容
                        </a>
                        <a
                            href="#faq"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            FAQ
                        </a>
                        <a
                            href="#pricing"
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            价格
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
