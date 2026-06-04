import Link from 'next/link';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { Document } from '@/lib/docs';

interface CourseDocumentPageProps {
  document: Document;
  parentHref: string;
  parentTitle: string;
}

export function CourseDocumentPage({
  document,
  parentHref,
  parentTitle,
}: CourseDocumentPageProps) {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <Link
          href={parentHref}
          className="text-sm text-muted underline transition-colors hover:text-foreground"
        >
          返回{parentTitle}
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">{document.title}</h1>
          <div className="h-px flex-1 bg-border" />
        </div>
      </header>

      <MarkdownRenderer content={document.content} surface="plain" />
    </div>
  );
}
