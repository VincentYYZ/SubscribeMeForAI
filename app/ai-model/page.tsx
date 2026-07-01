import { CourseIndexPage } from '@/components/docs/CourseIndexPage';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export const dynamic = 'force-dynamic'

export default function AIModelPage() {
  const documents = getDocuments('ai-model');

  return (
    <RequireLogin>
      <CourseIndexPage
        title="AI 模型"
        description="了解语言模型、多模态模型和视觉模型的基本概念，以及它们在产品和自动化流程中的应用。"
        eyebrow="学习目录"
        meta="基础"
        basePath="/ai-model"
        documents={documents}
      />
    </RequireLogin>
  );
}
