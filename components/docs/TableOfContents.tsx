'use client'

import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeId?: string;
}

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Find the scrollable container (main element with overflow-y-auto)
    const scrollContainer = element.closest('main');

    if (scrollContainer) {
      // Calculate the position relative to the scroll container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;

      // Scroll with offset for better visibility (80px offset for spacing)
      scrollContainer.scrollTo({
        top: relativeTop - 80,
        behavior: 'smooth'
      });
    } else {
      // Fallback to default behavior
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-52 shrink-0 overflow-y-auto border-l border-border bg-card">
      <div className="p-4 sticky top-0">
        <h2 className="mb-4 text-sm font-semibold text-foreground">目录</h2>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "w-full rounded px-2 py-1.5 text-left text-sm transition-colors",
                activeId === heading.id
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted hover:bg-secondary hover:text-foreground"
              )}
              style={{ paddingLeft: `${(heading.level - 1) * 0.75 + 0.5}rem` }}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
