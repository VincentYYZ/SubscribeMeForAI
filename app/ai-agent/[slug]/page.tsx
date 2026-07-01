import { notFound } from 'next/navigation';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { CourseDocumentPage } from '@/components/docs/CourseDocumentPage';
import { getDocument } from '@/lib/docs';

export const dynamic = 'force-dynamic'

export default async function AIAgentDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = getDocument('ai-agent', slug);

  if (!document) {
    notFound();
  }

  return (
    <RequireLogin>
      <CourseDocumentPage
        document={document}
        parentHref="/ai-agent"
        parentTitle="AI-Agent"
        category="ai-agent"
      />
    </RequireLogin>
  );
}
