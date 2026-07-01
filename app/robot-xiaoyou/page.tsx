import { CourseIndexPage } from '@/components/docs/CourseIndexPage';
import { RequireLogin } from '@/components/auth/RequireLogin';
import { getDocuments } from '@/lib/docs';

export const dynamic = 'force-dynamic'

export default function RobotXiaoYouPage() {
  const documents = getDocuments('robot-xiaoyou');

  return (
    <RequireLogin>
      <CourseIndexPage
        title="机器人小鼬"
        description="一个智能 AI 助手机器人的专题内容，覆盖产品介绍、核心能力和实际使用方式。"
        eyebrow="项目目录"
        meta="内测"
        basePath="/robot-xiaoyou"
        documents={documents}
      />
    </RequireLogin>
  );
}
