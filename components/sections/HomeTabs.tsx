'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, CreditCard, HelpCircle, Layers, Sparkles } from "lucide-react";
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
    { id: "content", label: "课程内容", icon: Layers },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "pricing", label: "价格", icon: CreditCard },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Block({
    children,
    strong = false,
    inset = false,
    className = "",
}: {
    children: React.ReactNode;
    strong?: boolean;
    inset?: boolean;
    className?: string;
}) {
    return (
        <div
            className={`
        ${strong ? "bg-white border border-slate-200 shadow-md" : ""}
        ${inset ? "mx-4 rounded-xl" : ""}
        ${strong && inset ? "shadow-lg" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

function BlockTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="px-4 pt-6 pb-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
            {children}
        </h2>
    );
}

function List({
    children,
    strong = false,
    inset = false,
}: {
    children: React.ReactNode;
    strong?: boolean;
    inset?: boolean;
}) {
    return (
        <div
            className={`${strong ? "bg-white" : ""} ${
                inset ? "mx-4 rounded-xl overflow-hidden border border-slate-200" : ""
            }`}
        >
            {children}
        </div>
    );
}

function ListItem({
    title,
    subtitle,
    media,
}: {
    title: string;
    subtitle?: string;
    media?: React.ReactNode;
}) {
    return (
        <div className="flex items-center px-4 py-3 border-b border-slate-100 last:border-b-0">
            {media && <div className="mr-4 flex-shrink-0">{media}</div>}
            <div className="flex-1 min-w-0">
                <div className="text-base font-medium text-slate-900 truncate">{title}</div>
                {subtitle && <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>}
            </div>
        </div>
    );
}

export function HomeTabs() {
    const [activeTab, setActiveTab] = useState<TabId>("content");

    const renderTabContent = () => {
        switch (activeTab) {
            case "faq":
                return (
                    <Block strong inset className="mx-4">
                        <div className="px-2">
                            <Accordion type="single" collapsible className="w-full">
                                {faqItems.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.question}
                                        value={`tab-faq-${index}`}
                                        className="border-b border-slate-100 last:border-b-0"
                                    >
                                        <AccordionTrigger className="py-3 text-sm font-semibold text-slate-900 hover:text-cyan-600">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-sm text-slate-600">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </Block>
                );
            case "pricing":
                return (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {pricingPlans.map((plan) => (
                            <Block
                                key={plan.title}
                                strong
                                inset
                                className={cn("mx-0", plan.highlighted && "ring-1 ring-cyan-400/40")}
                            >
                                <div className="relative flex h-full flex-col p-5">
                                    {plan.badge && (
                                        <div className="absolute top-0 right-0 bg-cyan-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1 shadow-sm">
                                            <Sparkles className="h-3 w-3" />
                                            {plan.badge}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <h3 className="text-xl text-slate-900">{plan.title}</h3>
                                        <p className="text-sm text-slate-500">{plan.description}</p>
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                        <div className="text-3xl font-bold text-slate-900">{plan.price}</div>
                                        <div className="grid gap-2">
                                            {plan.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2">
                                                    <Check className="h-4 w-4 text-cyan-300" />
                                                    <span className="text-xs text-slate-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-4">
                                        <button className="w-full text-sm rounded-full bg-slate-900 hover:bg-slate-800 text-white py-2 shadow-sm">
                                            立即购买
                                        </button>
                                    </div>
                                </div>
                            </Block>
                        ))}
                    </div>
                );
            default:
                return (
                    <List strong inset>
                        {courseFeatures.map((feature) => (
                            <ListItem
                                key={feature.title}
                                title={feature.title}
                                subtitle={feature.description}
                                media={
                                    <div
                                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white`}
                                    >
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                }
                            />
                        ))}
                    </List>
                );
        }
    };

    return (
        <section className="relative py-8">
            <div className="space-y-4">
                <div className="px-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <span className="font-semibold tracking-[0.2em] uppercase text-cyan-600">快速浏览</span>
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            一键切换
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 px-4">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all border flex items-center gap-2",
                                    activeTab === tab.id
                                        ? "bg-cyan-500 text-white border-transparent"
                                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 bg-white"
                                )}
                                aria-pressed={activeTab === tab.id}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
                <div className="px-4">
                    <div className="animate-fade-in">{renderTabContent()}</div>
                </div>
            </div>
        </section>
    );
}


