import { DocsLayout } from '@/components/docs/DocsLayout';
import { getDocuments } from '@/lib/docs';

export default function RobotXiaoYouPage() {
  const documents = getDocuments('robot-xiaoyou');

  return (
    <div className="min-h-screen bg-white">
      <DocsLayout documents={documents} />
    </div>
  );
}
