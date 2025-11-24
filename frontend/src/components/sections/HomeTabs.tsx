import { useState } from "react";
import { cn } from "../../lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Check } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/Accordion";
import { courseFeatures } from "./Features";
import { faqItems } from "./FAQ";
import { pricingPlans } from "./Pricing";

const tabs = [
    { id: "content", label: "课程内容" },
    { id: "faq", label: "FAQ" },
    { id: "pricing", label: "价格" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function HomeTabs() {
    const [activeTab, setActiveTab] = useState<TabId>("content");

    // 根据当前 tab 切换不同内容 (switch tab content based on active id).
    const renderTabContent = () => {
        switch (activeTab) {
            case "faq":
                return (
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((faq, index) => (
                            <AccordionItem key={faq.question} value={`tab-faq-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                );
            case "pricing":
                return (
                    <div className="grid gap-4 md:grid-cols-2">
                        {pricingPlans.map((plan) => (
                            <Card
                                key={plan.title}
                                className={cn(
                                    "flex flex-col relative overflow-hidden",
                                    plan.highlighted && "border-primary shadow-lg"
                                )}
                            >
                                {plan.badge && (
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                                        {plan.badge}
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="text-4xl font-bold">{plan.price}</div>
                                    <div className="grid gap-2">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-primary" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardContent className="mt-auto p-6 pt-0">
                                    <Button className="w-full">立即购买</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            default:
                return (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {courseFeatures.map((feature) => (
                            <Card key={feature.title} className="bg-secondary/10">
                                <CardHeader className="space-y-2">
                                    <feature.icon className="h-10 w-10 text-primary" />
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                );
        }
    };

    return (
        <section className="bg-background/80 border-y border-white/5 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <span className="font-semibold tracking-[0.2em] uppercase">实战课程</span>
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs">一键切换关键信息</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                                    activeTab === tab.id
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg"
                                        : "border-white/10 text-muted-foreground hover:text-foreground"
                                )}
                                aria-pressed={activeTab === tab.id}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-card/40 p-6 shadow-lg backdrop-blur">
                    {renderTabContent()}
                </div>
            </div>
        </section>
    );
}
