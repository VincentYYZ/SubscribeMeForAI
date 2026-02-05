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
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold text-slate-900">
                    简单透明的价格
                </h2>
                <p className="max-w-[85%] leading-normal text-slate-600 sm:text-lg sm:leading-7">
                    一次付费，永久更新。投资自己，掌握未来。
                </p>
            </div>
            <div className="mx-auto grid max-w-screen-lg gap-6 py-8 md:grid-cols-2 lg:gap-8">
                {pricingPlans.map((plan, index) => (
                    <div
                        key={plan.title}
                        className={cn(
                            "w-full rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300",
                            plan.highlighted && "ring-2 ring-cyan-400/40 border-cyan-400/20"
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="relative flex h-full flex-col p-6">
                            {plan.badge && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 text-sm font-bold rounded-bl-xl shadow-md flex items-center gap-1">
                                    <Sparkles className="h-4 w-4" />
                                    {plan.badge}
                                </div>
                            )}
                            <div className="space-y-3">
                                <h3
                                    className={cn(
                                        "text-2xl text-white",
                                        plan.highlighted && "bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-transparent"
                                    )}
                                >
                                    {plan.title}
                                </h3>
                                <p className="text-base text-slate-500">{plan.description}</p>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div>
                                    <div
                                        className={cn(
                                            "text-5xl font-bold text-white",
                                            plan.highlighted && "bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-transparent"
                                        )}
                                    >
                                        {plan.price}
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">一次性付费</div>
                                </div>
                                <div className="grid gap-3">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                                                    plan.highlighted
                                                        ? "bg-cyan-500 text-white"
                                                        : "bg-slate-100 text-slate-600"
                                                )}
                                            >
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm text-slate-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-auto pt-8">
                                <Button
                                    className={cn(
                                        "w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl",
                                        plan.highlighted && "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-transparent font-semibold"
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


