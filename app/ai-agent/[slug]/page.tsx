import { notFound } from 'next/navigation';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { CourseDocumentPage } from '@/components/docs/CourseDocumentPage';
import { getDocument, getDocuments } from '@/lib/docs';

export function generateStaticParams() {
  return getDocuments('ai-agent').map((document) => ({
    slug: document.slug,
  }));
}

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
      />
    </RequireLogin>
  );
}
