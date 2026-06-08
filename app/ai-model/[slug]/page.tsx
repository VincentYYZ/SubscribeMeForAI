import { notFound } from 'next/navigation';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { CourseDocumentPage } from '@/components/docs/CourseDocumentPage';
import { getDocument, getDocuments } from '@/lib/docs';

export function generateStaticParams() {
  return getDocuments('ai-model').map((document) => ({
    slug: document.slug,
  }));
}

export default async function AIModelDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = getDocument('ai-model', slug);

  if (!document) {
    notFound();
  }

  return (
    <RequireLogin>
      <CourseDocumentPage
        document={document}
        parentHref="/ai-model"
        parentTitle="AI 模型"
        category="ai-model"
      />
    </RequireLogin>
  );
}
