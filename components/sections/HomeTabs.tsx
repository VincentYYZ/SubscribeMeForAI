'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion";
import { courseFeatures } from "./Features";
import { faqItems } from "./FAQ";
import { pricingPlans } from "./Pricing";

const tabs = [
    { id: "content", label: "课程内容", icon: "📚" },
    { id: "faq", label: "FAQ", icon: "❓" },
    { id: "pricing", label: "价格", icon: "💰" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function HomeTabs() {
    const [activeTab, setActiveTab] = useState<TabId>("content");

    const renderTabContent = () => {
        switch (activeTab) {
            case "faq":
                return (
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {faqItems.map((faq, index) => (
                            <AccordionItem 
                                key={faq.question} 
                                value={`tab-faq-${index}`}
                                className="border-2 rounded-xl px-5 bg-white"
                            >
                                <AccordionTrigger className="text-base font-semibold hover:text-blue-600">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm text-slate-600">
                                    {faq.answer}
                                </AccordionContent>
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
                                    "flex flex-col relative overflow-hidden border-2",
                                    plan.highlighted 
                                        ? "border-blue-500 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" 
                                        : "border-slate-200 bg-white"
                                )}
                            >
                                {plan.badge && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                                        <Sparkles className="h-3 w-3" />
                                        {plan.badge}
                                    </div>
                                )}
                                <CardHeader className="pb-3">
                                    <CardTitle className={cn(
                                        "text-xl",
                                        plan.highlighted && "gradient-text"
                                    )}>{plan.title}</CardTitle>
                                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-3">
                                    <div className="text-3xl font-bold">{plan.price}</div>
                                    <div className="grid gap-2">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-blue-600" />
                                                <span className="text-xs text-slate-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardContent className="mt-auto p-5 pt-0">
                                    <Button className="w-full text-sm" size="sm">
                                        立即购买
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            default:
                return (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {courseFeatures.map((feature) => (
                            <Card key={feature.title} className="border-2 bg-white hover:shadow-lg transition-shadow">
                                <CardHeader className="space-y-2 p-4">
                                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-base">{feature.title}</CardTitle>
                                    <CardDescription className="text-xs">{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                );
        }
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <span className="font-semibold tracking-[0.2em] uppercase text-blue-600">实战课程</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent" />
                        <span className="text-xs flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            一键切换关键信息
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all border-2 flex items-center gap-2",
                                    activeTab === tab.id
                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg hover:shadow-xl"
                                        : "border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 bg-white"
                                )}
                                aria-pressed={activeTab === tab.id}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 p-6 shadow-xl backdrop-blur-sm">
                    <div className="animate-fade-in">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </section>
    );
}
