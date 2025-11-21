import { Button } from "../ui/Button";

export function Hero() {
    return (
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 md:px-6 mx-auto">
                <a
                    href="#"
                    className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                >
                    🎉 2024 最新 AI 编程实战课程
                </a>
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                    零基础也能用 AI <br />
                    做出第一个能赚钱的项目
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    不需要深厚的编程功底，不需要复杂的算法知识。
                    只要你有一颗想创造的心，AI 就是你最强大的武器。
                    带你从零开始，一步步完成自己的 AI 产品。
                </p>
                <div className="space-x-4">
                    <Button size="lg">开始学习</Button>
                    <Button size="lg" variant="outline">
                        查看大纲
                    </Button>
                </div>
            </div>
        </section>
    );
}
