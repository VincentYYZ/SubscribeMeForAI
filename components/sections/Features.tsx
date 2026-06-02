import { Code, Terminal, Cpu, Globe, Database, Rocket } from "lucide-react";

export const courseFeatures = [
    {
        title: "AI 编程基础",
        description: "从零开始学习 AI 编程的基础概念，掌握 Prompt Engineering 核心技巧。",
        icon: Terminal,
        color: "tone-clay",
    },
    {
        title: "全栈开发实战",
        description: "结合 React 和 Python，构建完整的全栈应用，掌握前后端交互。",
        icon: Globe,
        color: "tone-paper",
    },
    {
        title: "AI 工具链整合",
        description: "学习使用 Cursor, GitHub Copilot 等 AI 辅助编程工具，提升开发效率。",
        icon: Cpu,
        color: "tone-paper",
    },
    {
        title: "数据库与部署",
        description: "掌握数据库设计与云端部署，让你的应用真正上线运行。",
        icon: Database,
        color: "tone-paper",
    },
    {
        title: "实战项目演练",
        description: "通过多个真实案例（如 AI 客服、SaaS 平台）进行实战演练。",
        icon: Code,
        color: "tone-paper",
    },
    {
        title: "商业化落地",
        description: "探讨独立开发者的商业化路径，如何将技术转化为收益。",
        icon: Rocket,
        color: "tone-paper",
    },
];

export function Features() {
    return (
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24 px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl font-bold leading-[1.1] text-foreground sm:text-3xl md:text-6xl">
                    课程核心内容
                </h2>
                <p className="max-w-[85%] leading-normal text-muted sm:text-lg sm:leading-7">
                    系统化的课程设计，带你从入门到精通，掌握 AI 时代的编程技能。
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {courseFeatures.map((feature, index) => (
                    <div
                        key={feature.title}
                        className="w-full rounded-md border border-border bg-card shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-md"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex h-full flex-col gap-3 p-6">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary text-foreground shadow-sm">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-base text-muted">{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

