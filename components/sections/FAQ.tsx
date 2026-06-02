import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion"
import { HelpCircle } from "lucide-react"

export const faqItems = [
    {
        question: "课程适合零基础吗？",
        answer: "完全适合。我们的课程设计就是针对零基础学员的，会从最基本的概念讲起，配合 AI 工具，让你轻松上手。",
    },
    {
        question: "学习需要多长时间？",
        answer: "根据个人进度不同，通常建议每天投入 1-2 小时，大约 4-6 周可以完成所有核心内容的学习。",
    },
    {
        question: "遇到问题怎么办？",
        answer: "我们有专属的学员社区和答疑群，你可以随时提问，助教和老师会及时解答你的问题。",
    },
    {
        question: "购买后可以退款吗？",
        answer: "由于数字商品的特殊性，课程一旦购买不支持退款。建议先试看免费章节再做决定。",
    },
];

export function FAQ() {
    return (
        <section id="faq" className="container py-8 md:py-12 lg:py-24 px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-8 w-8 text-accent" />
                    <h2 className="font-heading text-3xl font-bold leading-[1.1] text-foreground sm:text-3xl md:text-6xl">
                        常见问题
                    </h2>
                </div>
                <p className="max-w-[85%] leading-normal text-muted sm:text-lg sm:leading-7">
                    关于课程的一些常见疑问解答。
                </p>
            </div>
            <div className="mx-auto max-w-[58rem] py-8">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-none"
                        >
                            <div
                                className="w-full rounded-md border border-border bg-card shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-md"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="px-6">
                                    <AccordionTrigger className="py-4 text-lg font-semibold text-foreground transition-colors hover:text-accent">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-4 text-base leading-relaxed text-muted">
                                        {faq.answer}
                                    </AccordionContent>
                                </div>
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

