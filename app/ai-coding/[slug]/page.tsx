import { notFound } from 'next/navigation';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { CourseDocumentPage } from '@/components/docs/CourseDocumentPage';
import { getDocument, getDocuments } from '@/lib/docs';

export function generateStaticParams() {
  return getDocuments('ai-coding').map((document) => ({
    slug: document.slug,
  }));
}

export default async function AICodingDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = getDocument('ai-coding', slug);

  if (!document) {
    notFound();
  }

  return (
    <RequireLogin>
      <CourseDocumentPage
        document={document}
        parentHref="/ai-coding"
        parentTitle="AI 编程"
      />
    </RequireLogin>
  );
}
