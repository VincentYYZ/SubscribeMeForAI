'use client'

import { useState, useCallback, useEffect, useRef } from 'react';
import { DocumentSidebar } from './DocumentSidebar';
import { MarkdownRenderer } from './MarkdownRenderer';
import { TableOfContents } from './TableOfContents';

interface Document {
  id: string;
  title: string;
  slug: string;
  content: string;
}

interface DocsLayoutProps {
  documents: Document[];
  initialDoc?: string;
}

export function DocsLayout({ documents, initialDoc }: DocsLayoutProps) {
  const [currentDoc, setCurrentDoc] = useState(initialDoc || documents[0]?.slug || '');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const mainRef = useRef<HTMLElement>(null);

  const currentDocument = documents.find(doc => doc.slug === currentDoc);

  const handleHeadingsExtracted = useCallback((extractedHeadings: { id: string; text: string; level: number }[]) => {
    setHeadings(extractedHeadings);
  }, []);

  // Detect which heading is currently visible
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement || headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = mainElement.scrollTop + 100; // Offset for better detection

      // Find the current heading based on scroll position
      let currentId = headings[0]?.id || '';

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (elementTop <= scrollPosition) {
            currentId = heading.id;
          } else {
            break;
          }
        }
      }

      setActiveHeading(currentId);
    };

    mainElement.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, [headings]);

  return (
    <div className="relative flex h-[calc(100vh-4rem)] overflow-hidden rounded-md border border-border bg-background text-foreground">
      <div className="relative flex h-full w-full min-w-0">
        <DocumentSidebar
          documents={documents}
          currentDoc={currentDoc}
          onDocumentSelect={setCurrentDoc}
        />

        <main ref={mainRef} className="min-w-0 flex-1 overflow-y-auto px-5 py-6">
          {currentDocument ? (
            <MarkdownRenderer
              content={currentDocument.content}
              onHeadingsExtracted={handleHeadingsExtracted}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              请选择一个文档
            </div>
          )}
        </main>

        <TableOfContents
          headings={headings}
          activeId={activeHeading}
        />
      </div>
    </div>
  );
}
