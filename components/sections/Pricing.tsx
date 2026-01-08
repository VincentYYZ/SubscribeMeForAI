import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const pricingPlans = [
    {
        title: "基础版",
        description: "适合想尝试 AI 编程的初学者",
        price: "¥299",
        features: [
            "包含所有基础视频课程",
            "项目源码下载",
            "社区交流权限",
        ],
        highlighted: false,
        badge: null,
        gradient: "from-slate-50 to-slate-100",
    },
    {
        title: "实战版",
        description: "适合想深入学习并落地的开发者",
        price: "¥599",
        features: [
            "包含基础版所有内容",
            "高级实战项目源码",
            "1对1 答疑指导",
            "商业化落地咨询",
        ],
        highlighted: true,
        badge: "推荐",
        gradient: "from-blue-50 via-purple-50 to-pink-50",
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="container py-8 md:py-12 lg:py-24 px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold gradient-text">
                    简单透明的价格
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    一次付费，永久更新。投资自己，掌握未来。
                </p>
            </div>
            <div className="mx-auto grid max-w-screen-lg gap-6 py-8 md:grid-cols-2 lg:gap-8">
                {pricingPlans.map((plan, index) => (
                    <Card
                        key={plan.title}
                        className={cn(
                            "card-hover flex flex-col relative overflow-hidden border-2",
                            plan.highlighted 
                                ? "border-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" 
                                : "border-slate-200 bg-white"
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {plan.badge && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 text-sm font-bold rounded-bl-xl shadow-lg flex items-center gap-1">
                                <Sparkles className="h-4 w-4" />
                                {plan.badge}
                            </div>
                        )}
                        <CardHeader className="pb-4">
                            <CardTitle className={cn(
                                "text-2xl",
                                plan.highlighted && "gradient-text"
                            )}>{plan.title}</CardTitle>
                            <CardDescription className="text-base">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div>
                                <div className={cn(
                                    "text-5xl font-bold",
                                    plan.highlighted && "gradient-text"
                                )}>{plan.price}</div>
                                <div className="text-sm text-muted-foreground mt-1">一次性付费</div>
                            </div>
                            <div className="grid gap-3">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                                            plan.highlighted 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-slate-100 text-slate-600"
                                        )}>
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="mt-auto pt-6">
                            <Button 
                                className={cn(
                                    "w-full shadow-lg hover:shadow-xl transition-all",
                                    plan.highlighted 
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                                        : ""
                                )}
                                size="lg"
                            >
                                立即购买
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
