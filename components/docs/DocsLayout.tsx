'use client'

import { useState, useCallback } from 'react';
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

  const currentDocument = documents.find(doc => doc.slug === currentDoc);

  const handleHeadingsExtracted = useCallback((extractedHeadings: { id: string; text: string; level: number }[]) => {
    setHeadings(extractedHeadings);
  }, []);

  return (
    <div className="relative flex h-[calc(100vh-4rem)] text-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/50 to-slate-950/80" />
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative flex h-full w-full min-w-0">
        <DocumentSidebar
          documents={documents}
          currentDoc={currentDoc}
          onDocumentSelect={setCurrentDoc}
        />

        <main className="flex-1 overflow-y-auto px-6 py-8 min-w-0">
          {currentDocument ? (
            <MarkdownRenderer
              content={currentDocument.content}
              onHeadingsExtracted={handleHeadingsExtracted}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-300">
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

