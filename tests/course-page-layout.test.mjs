import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const coursePages = ['ai-coding', 'robot-xiaoyou', 'ai-agent', 'ai-model'];
const indexComponent = fs.readFileSync(
  path.join(root, 'components', 'docs', 'CourseIndexPage.tsx'),
  'utf8',
);

assert.doesNotMatch(
  indexComponent,
  /MarkdownRenderer|内容预览/,
  'CourseIndexPage should only render the directory list, not inline document previews',
);

for (const page of coursePages) {
  const filePath = path.join(root, 'app', page, 'page.tsx');
  const source = fs.readFileSync(filePath, 'utf8');
  const detailPath = path.join(root, 'app', page, '[slug]', 'page.tsx');

  assert.match(
    source,
    /CourseIndexPage/,
    `${page} should use the shared homepage-style course index layout`,
  );

  assert.doesNotMatch(
    source,
    /DocsLayout/,
    `${page} should not render the full-screen docs layout directly`,
  );

  assert.doesNotMatch(
    source,
    /MarkdownRenderer|内容预览/,
    `${page} index should not inline document content previews`,
  );

  assert.ok(
    fs.existsSync(detailPath),
    `${page} should have a dynamic detail page for directory items`,
  );
}
