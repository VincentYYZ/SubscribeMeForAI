import { CourseIndexPage } from '@/components/docs/CourseIndexPage';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export default function AIAgentPage() {
  const documents = getDocuments('ai-agent');

  return (
    <RequireLogin>
      <CourseIndexPage
        title="构建你的专属 AI Agent"
        description="深入理解 Agent 架构，从 Prompt Engineering 到完整工具链调用，逐步搭建可执行任务的智能代理。"
        eyebrow="课程目录"
        meta="进阶"
        basePath="/ai-agent"
        documents={documents}
      />
    </RequireLogin>
  );
}
