import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { Code, Terminal, Cpu, Globe, Database, Rocket } from "lucide-react";

export const courseFeatures = [
    {
        title: "AI 编程基础",
        description: "从零开始学习 AI 编程的基础概念，掌握 Prompt Engineering 核心技巧。",
        icon: Terminal,
    },
    {
        title: "全栈开发实战",
        description: "结合 React 和 Python，构建完整的全栈应用，掌握前后端交互。",
        icon: Globe,
    },
    {
        title: "AI 工具链整合",
        description: "学习使用 Cursor, GitHub Copilot 等 AI 辅助编程工具，提升开发效率。",
        icon: Cpu,
    },
    {
        title: "数据库与部署",
        description: "掌握数据库设计与云端部署，让你的应用真正上线运行。",
        icon: Database,
    },
    {
        title: "实战项目演练",
        description: "通过多个真实案例（如 AI 客服、SaaS 平台）进行实战演练。",
        icon: Code,
    },
    {
        title: "商业化落地",
        description: "探讨独立开发者的商业化路径，如何将技术转化为收益。",
        icon: Rocket,
    },
];

export function Features() {
    return (
        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    课程核心内容
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    系统化的课程设计，带你从入门到精通，掌握 AI 时代的编程技能。
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {courseFeatures.map((feature) => (
                    <Card key={feature.title} className="flex flex-col justify-between overflow-hidden">
                        <CardHeader className="grid gap-1 p-6">
                            <feature.icon className="h-10 w-10 text-primary" />
                            <CardTitle className="mt-2">{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
}
