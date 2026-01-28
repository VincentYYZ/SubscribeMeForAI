import { DocsLayout } from '@/components/docs/DocsLayout';
import { getDocuments } from '@/lib/docs';

export default function AIAgentPage() {
  const documents = getDocuments('ai-agent');

  return (
    <div className="min-h-screen bg-white">
      <DocsLayout documents={documents} />
    </div>
  );
}
