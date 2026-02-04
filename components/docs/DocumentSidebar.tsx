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
    <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-2xl overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-white mb-4">文档列表</h2>
        <nav className="space-y-1">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc.slug)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left",
                currentDoc === doc.slug
                  ? "bg-white/15 text-white font-medium"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
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

