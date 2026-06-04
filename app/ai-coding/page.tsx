import { CourseIndexPage } from '@/components/docs/CourseIndexPage';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export default function AICodingPage() {
  const documents = getDocuments('ai-coding');

  return (
    <RequireLogin>
      <CourseIndexPage
        title="AI 编程实战：从零到一"
        description="不需要深厚的编程功底，不需要复杂的算法知识，从工具、方法到实践流程，带你完成自己的 AI 产品。"
        eyebrow="课程目录"
        meta="2024 最新"
        basePath="/ai-coding"
        documents={documents}
      />
    </RequireLogin>
  );
}
