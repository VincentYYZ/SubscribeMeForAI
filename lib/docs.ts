import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Document {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export function getDocuments(category: string): Document[] {
  const docsDirectory = path.join(process.cwd(), 'content', category);
  
  if (!fs.existsSync(docsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(docsDirectory);
  const documents = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const title = data.title || extractTitleFromContent(content) || slug;

      return {
        id: slug,
        title,
        slug,
        content,
      };
    });

  return documents;
}

function extractTitleFromContent(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}
