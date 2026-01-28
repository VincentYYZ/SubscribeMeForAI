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
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <DocumentSidebar
        documents={documents}
        currentDoc={currentDoc}
        onDocumentSelect={setCurrentDoc}
      />
      
      <main className="flex-1 overflow-y-auto">
        {currentDocument ? (
          <MarkdownRenderer
            content={currentDocument.content}
            onHeadingsExtracted={handleHeadingsExtracted}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            请选择一个文档
          </div>
        )}
      </main>

      <TableOfContents
        headings={headings}
        activeId={activeHeading}
      />
    </div>
  );
}
