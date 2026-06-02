import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export const pricingPlans = [
    {
        title: "基础版",
        description: "适合想尝试 AI 编程的初学者",
        price: "￥299",
        features: [
            "包含所有基础视频课程",
            "项目源码下载",
            "社区交流权限",
        ],
        highlighted: false,
        badge: null,
    },
    {
        title: "实战版",
        description: "适合想深入学习并落地的开发者",
        price: "￥599",
        features: [
            "包含基础版所有内容",
            "高级实战项目源码",
            "1对1 答疑指导",
            "商业化落地咨询",
        ],
        highlighted: true,
        badge: "推荐",
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="container py-8 md:py-12 lg:py-24 px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl font-bold leading-[1.1] text-foreground sm:text-3xl md:text-6xl">
                    简单透明的价格
                </h2>
                <p className="max-w-[85%] leading-normal text-muted sm:text-lg sm:leading-7">
                    一次付费，永久更新。投资自己，掌握未来。
                </p>
            </div>
            <div className="mx-auto grid max-w-screen-lg gap-6 py-8 md:grid-cols-2 lg:gap-8">
                {pricingPlans.map((plan, index) => (
                    <div
                        key={plan.title}
                        className={cn(
                            "w-full rounded-md border border-border bg-card shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-md",
                            plan.highlighted && "border-accent ring-1 ring-accent/30"
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="relative flex h-full flex-col p-6">
                            {plan.badge && (
                                <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-md bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground shadow-sm">
                                    <Sparkles className="h-4 w-4" />
                                    {plan.badge}
                                </div>
                            )}
                            <div className="space-y-3">
                                <h3
                                    className={cn(
                                        "text-2xl text-foreground",
                                        plan.highlighted && "text-accent"
                                    )}
                                >
                                    {plan.title}
                                </h3>
                                <p className="text-base text-muted">{plan.description}</p>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div>
                                    <div
                                        className={cn(
                                            "text-5xl font-bold text-foreground",
                                            plan.highlighted && "text-accent"
                                        )}
                                    >
                                        {plan.price}
                                    </div>
                                    <div className="mt-1 text-sm text-muted">一次性付费</div>
                                </div>
                                <div className="grid gap-3">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                                                    plan.highlighted
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-secondary text-muted"
                                                )}
                                            >
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm text-muted">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-auto pt-8">
                                <Button
                                    className={cn(
                                        "w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
                                        plan.highlighted && "border-transparent font-semibold"
                                    )}
                                    size="lg"
                                >
                                    立即购买
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

