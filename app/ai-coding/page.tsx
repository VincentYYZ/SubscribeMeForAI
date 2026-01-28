import { DocsLayout } from '@/components/docs/DocsLayout';
import { getDocuments } from '@/lib/docs';

export default function AICodingPage() {
  const documents = getDocuments('ai-coding');

  return (
    <div className="min-h-screen bg-white">
      <DocsLayout documents={documents} />
    </div>
  );
}
