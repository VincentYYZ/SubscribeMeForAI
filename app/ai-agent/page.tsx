import { DocsLayout } from '@/components/docs/DocsLayout';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export default function AIAgentPage() {
  const documents = getDocuments('ai-agent');

  return (
    <RequireLogin>
      <div className="min-h-screen bg-white">
        <DocsLayout documents={documents} />
      </div>
    </RequireLogin>
  );
}
