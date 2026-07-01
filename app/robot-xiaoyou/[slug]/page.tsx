import { notFound } from 'next/navigation';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { CourseDocumentPage } from '@/components/docs/CourseDocumentPage';
import { getDocument } from '@/lib/docs';

export const dynamic = 'force-dynamic'

export default async function RobotXiaoYouDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = getDocument('robot-xiaoyou', slug);

  if (!document) {
    notFound();
  }

  return (
    <RequireLogin>
      <CourseDocumentPage
        document={document}
        parentHref="/robot-xiaoyou"
        parentTitle="机器人小鼬"
        category="robot-xiaoyou"
      />
    </RequireLogin>
  );
}
