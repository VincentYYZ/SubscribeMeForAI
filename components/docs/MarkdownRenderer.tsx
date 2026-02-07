'use client'

import { useEffect, useMemo, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: { id: string; text: string; level: number }[]) => void;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function flattenText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(flattenText).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return flattenText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const extracted: { id: string; text: string; level: number }[] = [];
  const headingRegex = /^\s{0,3}(#{1,6})\s*(.+?)\s*#*\s*$/gm;
  const idCounts = new Map<string, number>();

  for (const match of content.matchAll(headingRegex)) {
    const level = match[1].length;
    const text = match[2].trim();
    if (!text) {
      continue;
    }

    // Generate unique ID for duplicate headings
    const baseId = slugifyHeading(text);
    const count = idCounts.get(baseId) || 0;
    idCounts.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    extracted.push({ id, text, level });
  }

  return extracted;
}

export function MarkdownRenderer({ content, onHeadingsExtracted }: MarkdownRendererProps) {
  const extractedHeadings = useMemo(() => extractHeadings(content), [content]);

  useEffect(() => {
    if (onHeadingsExtracted) {
      onHeadingsExtracted(extractedHeadings);
    }
  }, [extractedHeadings, onHeadingsExtracted]);

  // Track used IDs to prevent duplicates in rendering
  const usedIds = useMemo(() => new Map<string, number>(), [content]);

  const getUniqueId = (text: string): string => {
    const baseId = slugifyHeading(text);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);
    return count === 0 ? baseId : `${baseId}-${count}`;
  };

  return (
    <article className="prose prose-invert max-w-none rounded-3xl glass-surface p-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }: any) => {
            const text = flattenText(children);
            const id = getUniqueId(text);
            return <h1 id={id} {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }: any) => {
            const text = flattenText(children);
            const id = getUniqueId(text);
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }: any) => {
            const text = flattenText(children);
            const id = getUniqueId(text);
            return <h3 id={id} {...props}>{children}</h3>;
          },
          h4: ({ children, ...props }: any) => {
            const text = flattenText(children);
            const id = getUniqueId(text);
            return <h4 id={id} {...props}>{children}</h4>;
          },
          h5: ({ children, ...props }: any) => {
            const text = flattenText(children);
            const id = getUniqueId(text);
            return <h5 id={id} {...props}>{children}</h5>;
          },
          h6: ({ children, ...props }: any) => {
            const text = flattenText(children);
            const id = getUniqueId(text);
            return <h6 id={id} {...props}>{children}</h6>;
          },
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

