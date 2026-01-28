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
    <aside className="w-64 border-r border-slate-200 bg-slate-50 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">文档列表</h2>
        <nav className="space-y-1">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onDocumentSelect(doc.slug)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left",
                currentDoc === doc.slug
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-slate-700 hover:bg-slate-200"
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
