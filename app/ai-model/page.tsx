import { DocsLayout } from '@/components/docs/DocsLayout';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export default function AIModelPage() {
  const documents = getDocuments('ai-model');

  return (
    <RequireLogin>
      <div className="min-h-screen">
        <DocsLayout documents={documents} />
      </div>
    </RequireLogin>
  );
}


