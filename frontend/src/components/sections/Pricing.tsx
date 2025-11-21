import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Check } from "lucide-react";

export function Pricing() {
    return (
        <section id="pricing" className="container py-8 md:py-12 lg:py-24 px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    简单透明的价格
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    一次付费，永久更新。投资自己，掌握未来。
                </p>
            </div>
            <div className="mx-auto grid max-w-screen-lg gap-4 py-8 md:grid-cols-2 lg:gap-8">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl">基础版</CardTitle>
                        <CardDescription>适合想尝试 AI 编程的初学者</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">¥299</div>
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">包含所有基础视频课程</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">项目源码下载</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">社区交流权限</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button className="w-full">立即购买</Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                        推荐
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">实战版</CardTitle>
                        <CardDescription>适合想深入学习并落地的开发者</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-4xl font-bold">¥599</div>
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">包含基础版所有内容</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">高级实战项目源码</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">1对1 答疑指导</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">商业化落地咨询</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button className="w-full" variant="default">立即购买</Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
}
