'use client'

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: { id: string; text: string; level: number }[]) => void;
}

export function MarkdownRenderer({ content, onHeadingsExtracted }: MarkdownRendererProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const extractedHeadings: { id: string; text: string; level: number }[] = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
    if (onHeadingsExtracted) {
      onHeadingsExtracted(extractedHeadings);
    }
  }, [content, onHeadingsExtracted]);

  return (
    <article className="prose prose-slate max-w-none px-8 py-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }: any) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h1 id={id} {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }: any) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }: any) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h3 id={id} {...props}>{children}</h3>;
          },
          h4: ({ children, ...props }: any) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h4 id={id} {...props}>{children}</h4>;
          },
          h5: ({ children, ...props }: any) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
            return <h5 id={id} {...props}>{children}</h5>;
          },
          h6: ({ children, ...props }: any) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
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
