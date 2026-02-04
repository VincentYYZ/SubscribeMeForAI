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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-64 border-l border-white/10 bg-white/5 backdrop-blur-2xl overflow-y-auto">
      <div className="p-4 sticky top-0">
        <h2 className="text-sm font-semibold text-white mb-4">目录</h2>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "w-full text-left text-sm transition-colors py-1.5 px-2 rounded",
                activeId === heading.id
                  ? "text-white font-medium bg-white/15"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
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

