import { DocsLayout } from '@/components/docs/DocsLayout';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export default function AICodingPage() {
  const documents = getDocuments('ai-coding');

  return (
    <RequireLogin>
      <div className="min-h-screen bg-white">
        <DocsLayout documents={documents} />
      </div>
    </RequireLogin>
  );
}
