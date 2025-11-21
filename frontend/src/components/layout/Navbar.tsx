import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
                <div className="mr-4 hidden md:flex">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            HappyAICoding Clone
                        </span>
                    </a>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <a
                            href="#features"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            课程内容
                        </a>
                        <a
                            href="#faq"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            FAQ
                        </a>
                        <a
                            href="#pricing"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            价格
                        </a>
                    </nav>
                </div>
                <button
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </button>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search or other items here if needed */}
                    </div>
                    <nav className="flex items-center">
                        <Button variant="default" size="sm">
                            开始学习
                        </Button>
                    </nav>
                </div>
            </div>
            {isOpen && (
                <div className="container md:hidden">
                    <div className="flex flex-col space-y-2 pb-4">
                        <a
                            href="#features"
                            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                            onClick={() => setIsOpen(false)}
                        >
                            课程内容
                        </a>
                        <a
                            href="#faq"
                            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                            onClick={() => setIsOpen(false)}
                        >
                            FAQ
                        </a>
                        <a
                            href="#pricing"
                            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                            onClick={() => setIsOpen(false)}
                        >
                            价格
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
