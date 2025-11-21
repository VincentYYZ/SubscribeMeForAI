import { Github, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12 px-4 md:px-6">
                <div className="flex-1 space-y-4">
                    <h2 className="font-bold">HappyAICoding Clone</h2>
                    <p className="text-sm text-muted-foreground">
                        零基础也能用 AI 做出第一个能赚钱的项目。
                    </p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">关于</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:underline">
                                    课程介绍
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    学员案例
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">链接</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:underline">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">法律</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:underline">
                                    隐私政策
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    服务条款
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t py-6">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
                    <p className="text-sm text-muted-foreground">
                        © 2024 HappyAICoding Clone. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-foreground">
                            <Youtube className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
