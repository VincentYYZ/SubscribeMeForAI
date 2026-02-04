import { DocsLayout } from '@/components/docs/DocsLayout';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export default function RobotXiaoYouPage() {
  const documents = getDocuments('robot-xiaoyou');

  return (
    <RequireLogin>
      <div className="min-h-screen">
        <DocsLayout documents={documents} />
      </div>
    </RequireLogin>
  );
}


