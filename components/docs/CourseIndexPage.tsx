import Link from 'next/link';
import type { Document } from '@/lib/docs';

interface CourseIndexPageProps {
  title: string;
  description: string;
  documents: Document[];
  basePath: string;
  eyebrow?: string;
  meta?: string;
}

function extractSummary(content: string): string {
  const paragraph = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('- '));

  return paragraph || '继续阅读这一节的完整内容。';
}

export function CourseIndexPage({
  title,
  description,
  documents,
  basePath,
  eyebrow = '专题',
  meta = '更新中',
}: CourseIndexPageProps) {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <span className="text-xs text-muted whitespace-nowrap">{meta}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted max-w-[600px]">
          {description}
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-muted">{eyebrow}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <Link key={doc.id} href={`${basePath}/${doc.slug}`} className="block group">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium underline transition-colors group-hover:text-muted">
                  {doc.title}
                </h3>
                <span className="text-xs text-muted whitespace-nowrap">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{extractSummary(doc.content)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
