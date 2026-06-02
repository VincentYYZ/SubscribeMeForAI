'use client'

import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  title: string;
  slug: string;
}

interface DocumentSidebarProps {
  documents: Document[];
  currentDoc: string;
  onDocumentSelect: (slug: string) => void;
}

export function DocumentSidebar({ documents, currentDoc, onDocumentSelect }: DocumentSidebarProps) {
  return (
    <aside className="w-52 shrink-0 overflow-y-auto border-r border-border bg-card">
      <div className="p-4">
        <h2 className="mb-4 text-sm font-semibold text-foreground">文档列表</h2>
        <nav className="space-y-1">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc.slug)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                currentDoc === doc.slug
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted hover:bg-secondary hover:text-foreground"
              )}
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{doc.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
